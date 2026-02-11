import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  categoriesSchema,
  compatibilityRulesSchema,
  entriesSchema,
} from "../lib/schemas";
import type {
  Category,
  CompatibilityRule,
  Entry,
  EvidenceLevel,
  StimulationProfile,
} from "../lib/types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const SOURCE_FILE = path.join(projectRoot, "data.md");
const OUTPUT_ENTRIES = path.join(projectRoot, "data", "entries.json");
const OUTPUT_CATEGORIES = path.join(projectRoot, "data", "categories.json");
const OUTPUT_RULES = path.join(projectRoot, "data", "compatibility-rules.json");

function stripMarkdown(input: string): string {
  return input
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/`(.*?)`/g, "$1")
    .replace(/\[(.*?)\]\((.*?)\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(input: string): string {
  return stripMarkdown(input)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseTableLine(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => stripMarkdown(cell));
}

function splitList(input: string): string[] {
  const cleaned = stripMarkdown(input);
  if (!cleaned) {
    return [];
  }

  const primarySplit = cleaned.split(/\s*;\s*/g).filter(Boolean);
  if (primarySplit.length > 1) {
    return primarySplit.map((value) => value.trim()).filter(Boolean);
  }

  return cleaned
    .split(/\s*,\s*/g)
    .map((value) => value.trim())
    .filter(Boolean);
}

function splitWarnings(input: string): string[] {
  const cleaned = stripMarkdown(input);
  if (!cleaned) {
    return [];
  }

  const segments = cleaned
    .split(/\s*;\s*/g)
    .map((segment) => segment.trim())
    .filter(Boolean);

  if (segments.length >= 2) {
    return segments.slice(0, 10);
  }

  return cleaned
    .split(/\.\s+/g)
    .map((segment) => segment.trim())
    .filter(Boolean)
    .slice(0, 10);
}

function parseStars(effectiveness: string): 1 | 2 | 3 | 4 | 5 {
  const count = [...effectiveness].filter((char) => char === "★").length;

  if (count <= 1) return 1;
  if (count === 2) return 2;
  if (count === 3) return 3;
  if (count === 4) return 4;
  return 5;
}

function toEvidenceLevel(stars: 1 | 2 | 3 | 4 | 5): EvidenceLevel {
  if (stars >= 4) return "strong";
  if (stars === 3) return "moderate";
  return "limited";
}

function inferTags(text: string, categoryTitle: string): string[] {
  const lower = `${text} ${categoryTitle}`.toLowerCase();
  const tags = new Set<string>();

  if (
    /(stimulant|stimulating|wakefulness|alertness|energizing|psychostimulation|eugeroic|dopamine surge|adrenaline|caffeine|modafinil|cold exposure)/.test(
      lower,
    )
  ) {
    tags.add("stimulatory");
  }

  if (
    /(calm|calming|anxiolytic|anxiety reduction|sleep|sedat|drows|bedtime|relaxation)/.test(
      lower,
    )
  ) {
    tags.add("calming");
    tags.add("sedating");
  }

  if (
    /(serotonin|5-ht|ssri|snri|triptan|fluoxetine|serotonergic|5-ht2a)/.test(
      lower,
    )
  ) {
    tags.add("serotonergic");
  }

  if (/(mao-a|mao-b|maoi|monoamine oxidase)/.test(lower)) {
    tags.add("mao_inhibitor");
  }

  if (/(anticoagulant|blood thinner|blood-thinning|platelet|before surgery)/.test(lower)) {
    tags.add("blood_thinner_risk");
  }

  if (/(acetylcholine|choline|ache inhibitor|acetylcholinesterase|aChE)/i.test(text)) {
    tags.add("cholinergic");
  }

  if (/(gaba|gabaergic|benzodiazepine|phenibut)/.test(lower)) {
    tags.add("gabaergic");
  }

  if (/(psilocybin|lsd|ketamine|psychedelic)/.test(lower)) {
    tags.add("psychedelic");
  }

  if (/(thyroid)/.test(lower)) {
    tags.add("thyroid_sensitive");
  }

  if (/(hypertension|blood pressure)/.test(lower)) {
    tags.add("blood_pressure_sensitive");
  }

  if (/(pregnan|breastfeeding|minors)/.test(lower)) {
    tags.add("special_population_caution");
  }

  return [...tags].sort();
}

function inferStimulationProfile(tags: string[]): StimulationProfile {
  const stimulating = tags.includes("stimulatory");
  const calming = tags.includes("calming") || tags.includes("sedating");

  if (stimulating && calming) return "balanced";
  if (stimulating) return "stimulating";
  if (calming) return "calming";
  return "unknown";
}

function parseCycling(value: string): { required: boolean; guidance: string } {
  const guidance = stripMarkdown(value) || "Not specified in source data.";
  const required = /(yes|mandatory|non-negotiable|required)/i.test(guidance);
  return { required, guidance };
}

function normalizeNameToken(input: string): string {
  return stripMarkdown(input)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function aliasesFromName(name: string): string[] {
  const aliases = new Set<string>();
  const cleanName = stripMarkdown(name);
  aliases.add(normalizeNameToken(cleanName));

  const withoutParentheses = cleanName.replace(/\([^)]*\)/g, " ").trim();
  if (withoutParentheses) {
    aliases.add(normalizeNameToken(withoutParentheses));
  }

  for (const match of cleanName.matchAll(/\(([^)]+)\)/g)) {
    aliases.add(normalizeNameToken(match[1]));
  }

  for (const chunk of cleanName.split(/\s*\/\s*|\s+or\s+/i)) {
    const normalized = normalizeNameToken(chunk);
    if (normalized) {
      aliases.add(normalized);
    }
  }

  return [...aliases].filter((alias) => alias.length > 1);
}

function splitSynergyTerms(synergies: string[]): string[] {
  const terms = new Set<string>();

  for (const synergy of synergies) {
    const clean = stripMarkdown(synergy);
    if (!clean) continue;
    terms.add(clean);

    for (const fragment of clean.split(/\s*(?:\+|,|\bor\b)\s*/i)) {
      const trimmed = fragment.trim();
      if (trimmed) {
        terms.add(trimmed);
      }
    }
  }

  return [...terms];
}

function matchSynergyTermToEntry(
  term: string,
  sourceEntryId: string,
  entries: Entry[],
  aliasesByEntryId: Map<string, string[]>,
): Entry | undefined {
  const normalizedTerm = normalizeNameToken(term);
  if (!normalizedTerm || normalizedTerm.length < 2) {
    return undefined;
  }

  let bestMatch: { entry: Entry; score: number } | undefined;

  for (const candidate of entries) {
    if (candidate.id === sourceEntryId) continue;
    const aliases = aliasesByEntryId.get(candidate.id) ?? [];

    for (const alias of aliases) {
      if (alias.length < 3) continue;

      const isMatch =
        normalizedTerm.includes(alias) || alias.includes(normalizedTerm);
      if (!isMatch) continue;

      const score = alias.length;
      if (!bestMatch || score > bestMatch.score) {
        bestMatch = { entry: candidate, score };
      }
    }
  }

  return bestMatch?.entry;
}

function buildCompatibilityRules(
  entries: Entry[],
  categories: Category[],
): CompatibilityRule[] {
  const rules: CompatibilityRule[] = [];
  const pairSeen = new Set<string>();
  const aliasesByEntryId = new Map(
    entries.map((entry) => [entry.id, aliasesFromName(entry.name)]),
  );

  for (const entry of entries) {
    const terms = splitSynergyTerms(entry.synergies);

    for (const term of terms) {
      const match = matchSynergyTermToEntry(
        term,
        entry.id,
        entries,
        aliasesByEntryId,
      );
      if (!match) continue;

      const pair = [entry.id, match.id].sort();
      const pairKey = pair.join("::");
      if (pairSeen.has(pairKey)) continue;
      pairSeen.add(pairKey);

      rules.push({
        id: `synergy-${pair[0]}-${pair[1]}`,
        appliesTo: {
          entryIds: pair,
        },
        result: "synergy",
        reason: `Source data lists these entries as a potentially complementary stack (${entry.name} references ${match.name}).`,
        severity: "low",
        evidence: entry.evidenceLevel,
      });
    }
  }

  rules.push(
    {
      id: "rule-tag-serotonergic-maoi",
      appliesTo: { tagPairs: ["serotonergic", "mao_inhibitor"] },
      result: "avoid",
      reason:
        "Potential serotonin overload risk when serotonergic compounds are combined with MAO-inhibiting compounds.",
      severity: "high",
      evidence: "moderate",
    },
    {
      id: "rule-tag-stimulant-stimulant",
      appliesTo: { tagPairs: ["stimulatory", "stimulatory"] },
      result: "caution",
      reason:
        "Stacking multiple stimulating compounds can increase anxiety, blood pressure, sleep disruption, and tolerance pressure.",
      severity: "medium",
      evidence: "moderate",
    },
    {
      id: "rule-tag-blood-thinner-blood-thinner",
      appliesTo: { tagPairs: ["blood_thinner_risk", "blood_thinner_risk"] },
      result: "caution",
      reason:
        "Combining agents with blood-thinner interaction warnings can increase bleeding risk.",
      severity: "high",
      evidence: "moderate",
    },
    {
      id: "rule-tag-cholinergic-cholinergic",
      appliesTo: { tagPairs: ["cholinergic", "cholinergic"] },
      result: "caution",
      reason:
        "Concurrent high-cholinergic compounds may increase headaches, mood changes, and cholinergic side effects.",
      severity: "medium",
      evidence: "limited",
    },
    {
      id: "rule-tag-gabaergic-gabaergic",
      appliesTo: { tagPairs: ["gabaergic", "gabaergic"] },
      result: "caution",
      reason:
        "Combining multiple GABAergic compounds can increase sedation and cognitive dulling in sensitive users.",
      severity: "medium",
      evidence: "limited",
    },
    {
      id: "rule-tag-psychedelic-psychedelic",
      appliesTo: { tagPairs: ["psychedelic", "psychedelic"] },
      result: "caution",
      reason:
        "Psychedelic combinations have elevated unpredictability and should not be combined without specialist clinical oversight.",
      severity: "high",
      evidence: "limited",
    },
  );

  const stimulantCategory = categories.find((category) =>
    category.title.toLowerCase().includes("stimulants"),
  );
  if (stimulantCategory) {
    rules.push({
      id: "rule-category-stimulants-within-category",
      appliesTo: { categoryIds: [stimulantCategory.id] },
      result: "caution",
      reason:
        "Combining multiple entries from the stimulant/eugeroic category increases overstimulation risk.",
      severity: "medium",
      evidence: "moderate",
    });
  }

  return rules;
}

function parseDataFile(markdown: string): {
  categories: Category[];
  entries: Entry[];
} {
  const categoryMatches = [...markdown.matchAll(/^## CATEGORY (\d+): (.+)$/gm)];
  if (categoryMatches.length === 0) {
    throw new Error("No category headers found in data.md");
  }

  const categories: Category[] = [];
  const entries: Entry[] = [];

  for (let index = 0; index < categoryMatches.length; index += 1) {
    const currentMatch = categoryMatches[index];
    const nextMatch = categoryMatches[index + 1];

    const categoryNumber = Number(currentMatch[1]);
    const categoryTitle = stripMarkdown(currentMatch[2]);
    const categoryId = `category-${categoryNumber}-${slugify(categoryTitle)}`;

    categories.push({
      id: categoryId,
      title: categoryTitle,
      displayOrder: categoryNumber,
    });

    const sectionStart = (currentMatch.index ?? 0) + currentMatch[0].length;
    const sectionEnd = nextMatch?.index ?? markdown.length;
    const section = markdown.slice(sectionStart, sectionEnd);
    const lines = section.split(/\r?\n/).map((line) => line.trim());

    const headerRowIndex = lines.findIndex((line) => line.startsWith("| # |"));
    if (headerRowIndex < 0) {
      continue;
    }

    const headers = parseTableLine(lines[headerRowIndex]);
    const isInterventionTable = headers.includes("Intervention");

    for (let rowIndex = headerRowIndex + 1; rowIndex < lines.length; rowIndex += 1) {
      const line = lines[rowIndex];
      if (!line.startsWith("|")) {
        if (line.startsWith("---")) {
          break;
        }

        if (!line) {
          continue;
        }
      }

      if (line.startsWith("|---")) {
        continue;
      }

      const cells = parseTableLine(line);

      let headersForRow = headers;
      if (isInterventionTable && cells.length === headers.length + 1) {
        headersForRow = [
          ...headers.slice(0, -1),
          "Cycling Required?",
          headers[headers.length - 1],
        ];
      }

      if (cells.length !== headersForRow.length) {
        continue;
      }

      const raw = Object.fromEntries(
        headersForRow.map((header, cellIndex) => [header, cells[cellIndex] ?? ""]),
      ) as Record<string, string>;

      const indexNumber = Number(raw["#"]);
      const name = raw["Substance"] ?? raw["Intervention"] ?? "";
      const mechanism = raw["Mechanism of Action"] ?? "Not specified in source data.";
      const benefits = splitList(raw["Primary Benefits"] ?? "");
      const dosageOrProtocol =
        raw["Standard Dosage"] ??
        raw["Protocol"] ??
        "Not specified in source data.";
      const timingAdministration =
        raw["Timing & Administration"] ??
        raw["Timing & Frequency"] ??
        "Not specified in source data.";
      const onset = raw["Onset"] ?? "Not specified in source data.";
      const duration =
        raw["Duration"] ??
        (isInterventionTable ? "Protocol dependent." : "Not specified in source data.");
      const effectivenessStars = parseStars(raw["Effectiveness"] ?? "★★★");
      const synergies = splitList(raw["Best Synergies"] ?? raw["Best Combinations"] ?? "");
      const cycling = parseCycling(
        raw["Cycling Required?"] ?? "Not specified in source data.",
      );
      const rawNotes = raw["Notes & Warnings"] ?? raw["Notes"] ?? "Not specified in source data.";
      const warnings = splitWarnings(rawNotes);
      const fullTextForInference = [
        mechanism,
        benefits.join(" "),
        dosageOrProtocol,
        timingAdministration,
        rawNotes,
        synergies.join(" "),
      ].join(" ");
      const tags = inferTags(fullTextForInference, categoryTitle);
      const evidenceLevel = toEvidenceLevel(effectivenessStars);
      const stimulationProfile = inferStimulationProfile(tags);

      entries.push({
        id: `${indexNumber}-${slugify(name)}`,
        indexNumber,
        name,
        kind: isInterventionTable ? "intervention" : "substance",
        categoryId,
        mechanism,
        benefits,
        dosageOrProtocol,
        timingAdministration,
        onset,
        duration,
        effectivenessStars,
        evidenceLevel,
        stimulationProfile,
        synergies,
        cycling,
        warnings,
        tags,
        rawNotes: stripMarkdown(rawNotes),
      });
    }
  }

  return { categories, entries };
}

function assertUniqueness(entries: Entry[]) {
  const idSet = new Set<string>();
  const indexSet = new Set<number>();

  for (const entry of entries) {
    if (idSet.has(entry.id)) {
      throw new Error(`Duplicate entry id detected: ${entry.id}`);
    }
    if (indexSet.has(entry.indexNumber)) {
      throw new Error(`Duplicate entry index detected: ${entry.indexNumber}`);
    }
    idSet.add(entry.id);
    indexSet.add(entry.indexNumber);
  }
}

function writeJson(filePath: string, value: unknown) {
  writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

function main() {
  const markdown = readFileSync(SOURCE_FILE, "utf8");
  const { categories, entries } = parseDataFile(markdown);
  const compatibilityRules = buildCompatibilityRules(entries, categories);

  assertUniqueness(entries);

  const parsedCategories = categoriesSchema.parse(
    categories.sort((a, b) => a.displayOrder - b.displayOrder),
  );
  const parsedEntries = entriesSchema.parse(
    entries.sort((a, b) => a.indexNumber - b.indexNumber),
  );
  const parsedRules = compatibilityRulesSchema.parse(compatibilityRules);

  writeJson(OUTPUT_CATEGORIES, parsedCategories);
  writeJson(OUTPUT_ENTRIES, parsedEntries);
  writeJson(OUTPUT_RULES, parsedRules);

  console.log(
    `Generated data files: ${parsedCategories.length} categories, ${parsedEntries.length} entries, ${parsedRules.length} compatibility rules.`,
  );
}

main();
