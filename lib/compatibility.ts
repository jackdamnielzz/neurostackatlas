import { compatibilitySafetyReminder } from "@/lib/disclaimers";
import { getEntriesByIds, getRules } from "@/lib/data";
import type {
  CompatibilityOutcome,
  CompatibilityResult,
  CompatibilityRule,
  PairCompatibilityResult,
  SeverityLevel,
} from "@/lib/types";

const resultPriority: Record<CompatibilityResult, number> = {
  avoid: 4,
  caution: 3,
  synergy: 2,
  unknown: 1,
};

const severityPriority: Record<SeverityLevel, number> = {
  high: 3,
  medium: 2,
  low: 1,
};

function createPairKey(a: string, b: string): string {
  return [a, b].sort().join("::");
}

function pairCombinations(ids: string[]): [string, string][] {
  const pairs: [string, string][] = [];

  for (let i = 0; i < ids.length; i += 1) {
    for (let j = i + 1; j < ids.length; j += 1) {
      pairs.push([ids[i], ids[j]]);
    }
  }

  return pairs;
}

function matchRuleForPair(
  rule: CompatibilityRule,
  a: {
    id: string;
    categoryId: string;
    tags: string[];
  },
  b: {
    id: string;
    categoryId: string;
    tags: string[];
  },
): boolean {
  const entryIds = rule.appliesTo.entryIds ?? [];
  const categoryIds = rule.appliesTo.categoryIds ?? [];
  const tagPairs = rule.appliesTo.tagPairs ?? [];

  if (entryIds.length > 0) {
    const ids = new Set([a.id, b.id]);
    return entryIds.every((id) => ids.has(id));
  }

  if (categoryIds.length > 0) {
    if (categoryIds.length === 1) {
      return a.categoryId === categoryIds[0] && b.categoryId === categoryIds[0];
    }

    const pairCategories = new Set([a.categoryId, b.categoryId]);
    return categoryIds.every((categoryId) => pairCategories.has(categoryId));
  }

  if (tagPairs.length === 2) {
    const [tagA, tagB] = tagPairs;
    const aTags = new Set(a.tags);
    const bTags = new Set(b.tags);

    if (tagA === tagB) {
      return aTags.has(tagA) && bTags.has(tagA);
    }

    const forward = aTags.has(tagA) && bTags.has(tagB);
    const reverse = aTags.has(tagB) && bTags.has(tagA);
    return forward || reverse;
  }

  return false;
}

function chooseTopRule(rules: CompatibilityRule[]): CompatibilityRule | undefined {
  return rules.sort((left, right) => {
    const resultDelta = resultPriority[right.result] - resultPriority[left.result];
    if (resultDelta !== 0) {
      return resultDelta;
    }

    const severityDelta =
      severityPriority[right.severity] - severityPriority[left.severity];
    if (severityDelta !== 0) {
      return severityDelta;
    }

    const evidenceRank = {
      strong: 3,
      moderate: 2,
      limited: 1,
    } as const;

    return evidenceRank[right.evidence] - evidenceRank[left.evidence];
  })[0];
}

function defaultUnknownPairResult(pair: [string, string]): PairCompatibilityResult {
  return {
    pair,
    verdict: "unknown",
    severity: "low",
    evidence: "limited",
    reason:
      "No direct compatibility rule found for this pair. Treat as caution and consult your clinician.",
    matchedRules: [],
  };
}

export function evaluateCompatibilityByIds(ids: string[]): CompatibilityOutcome {
  const uniqueIds = [...new Set(ids)].filter(Boolean);
  const selectedEntries = getEntriesByIds(uniqueIds);
  const selectedEntryIds = selectedEntries.map((entry) => entry.id);
  const rules = getRules();

  if (selectedEntries.length < 2) {
    return {
      selectedIds: selectedEntryIds,
      selectedEntries,
      verdict: "unknown",
      severity: "low",
      evidence: "limited",
      summary:
        "Select at least two entries to evaluate educational compatibility.",
      pairResults: [],
      safetyReminder: compatibilitySafetyReminder,
    };
  }

  const pairResults = pairCombinations(selectedEntryIds).map(([leftId, rightId]) => {
    const left = selectedEntries.find((entry) => entry.id === leftId);
    const right = selectedEntries.find((entry) => entry.id === rightId);

    if (!left || !right) {
      return defaultUnknownPairResult([leftId, rightId]);
    }

    const matchedRules = rules.filter((rule) =>
      matchRuleForPair(rule, left, right),
    );

    const topRule = chooseTopRule(matchedRules);
    if (!topRule) {
      return defaultUnknownPairResult([left.id, right.id]);
    }

    return {
      pair: [left.id, right.id],
      verdict: topRule.result,
      severity: topRule.severity,
      evidence: topRule.evidence,
      reason: topRule.reason,
      matchedRules,
    } satisfies PairCompatibilityResult;
  });

  const overall = pairResults.reduce<PairCompatibilityResult>(
    (best, current) => {
      const resultDelta =
        resultPriority[current.verdict] - resultPriority[best.verdict];
      if (resultDelta !== 0) {
        return resultDelta > 0 ? current : best;
      }

      const severityDelta =
        severityPriority[current.severity] - severityPriority[best.severity];
      if (severityDelta !== 0) {
        return severityDelta > 0 ? current : best;
      }

      return best;
    },
    defaultUnknownPairResult([selectedEntryIds[0], selectedEntryIds[1]]),
  );

  const summary =
    pairResults.length === 1
      ? overall.reason
      : `Highest-priority signal across ${pairResults.length} checked pairs: ${overall.reason}`;

  return {
    selectedIds: selectedEntryIds,
    selectedEntries,
    verdict: overall.verdict,
    severity: overall.severity,
    evidence: overall.evidence,
    summary,
    pairResults,
    safetyReminder: compatibilitySafetyReminder,
  };
}

export function createPairLookupKey(a: string, b: string): string {
  return createPairKey(a, b);
}
