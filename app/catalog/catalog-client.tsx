"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpDown, Filter, Scale, Search } from "lucide-react";
import { RatingStars } from "@/components/rating-stars";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import type { Category, Entry } from "@/lib/types";

type SortMode = "effectiveness-desc" | "category-asc" | "name-asc";

interface CatalogClientProps {
  entries: Entry[];
  categories: Category[];
  initialQuery: string;
  initialCategory: string;
}

const evidenceLabels: Record<Entry["evidenceLevel"], string> = {
  strong: "Strong",
  moderate: "Moderate",
  limited: "Limited",
};

export function CatalogClient({
  entries,
  categories,
  initialQuery,
  initialCategory,
}: CatalogClientProps) {
  const [query, setQuery] = useState(initialQuery);
  const [categoryId, setCategoryId] = useState(initialCategory);
  const [minEffectiveness, setMinEffectiveness] = useState<number>(1);
  const [cyclingOnly, setCyclingOnly] = useState(false);
  const [stimulationProfile, setStimulationProfile] = useState<string>("all");
  const [evidenceLevel, setEvidenceLevel] = useState<string>("all");
  const [sortMode, setSortMode] = useState<SortMode>("effectiveness-desc");
  const [selectedCompareIds, setSelectedCompareIds] = useState<string[]>([]);

  const filteredEntries = useMemo(() => {
    const q = query.trim().toLowerCase();

    const filtered = entries.filter((entry) => {
      if (categoryId !== "all" && entry.categoryId !== categoryId) {
        return false;
      }

      if (entry.effectivenessStars < minEffectiveness) {
        return false;
      }

      if (cyclingOnly && !entry.cycling.required) {
        return false;
      }

      if (
        stimulationProfile !== "all" &&
        entry.stimulationProfile !== stimulationProfile
      ) {
        return false;
      }

      if (evidenceLevel !== "all" && entry.evidenceLevel !== evidenceLevel) {
        return false;
      }

      if (!q) {
        return true;
      }

      const corpus = [
        entry.name,
        entry.mechanism,
        entry.benefits.join(" "),
        entry.synergies.join(" "),
        entry.warnings.join(" "),
        entry.rawNotes,
      ]
        .join(" ")
        .toLowerCase();

      return corpus.includes(q);
    });

    filtered.sort((left, right) => {
      if (sortMode === "effectiveness-desc") {
        return right.effectivenessStars - left.effectivenessStars;
      }
      if (sortMode === "category-asc") {
        if (left.categoryId === right.categoryId) {
          return left.name.localeCompare(right.name);
        }
        return left.categoryId.localeCompare(right.categoryId);
      }
      return left.name.localeCompare(right.name);
    });

    return filtered;
  }, [
    categoryId,
    cyclingOnly,
    entries,
    evidenceLevel,
    minEffectiveness,
    query,
    sortMode,
    stimulationProfile,
  ]);

  const compareEntries = useMemo(
    () => entries.filter((entry) => selectedCompareIds.includes(entry.id)),
    [entries, selectedCompareIds],
  );

  function toggleCompare(entryId: string) {
    setSelectedCompareIds((current) => {
      if (current.includes(entryId)) {
        return current.filter((id) => id !== entryId);
      }
      if (current.length >= 3) {
        return current;
      }
      return [...current, entryId];
    });
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-[var(--border-muted)] bg-[var(--surface-0)] p-5 shadow-[var(--shadow-soft)] sm:p-6">
        <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[var(--text-muted)]">
          <Filter className="h-4 w-4" />
          Discovery Filters
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <label className="space-y-1 text-sm">
            <span className="text-[var(--text-muted)]">Search</span>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-[var(--text-soft)]" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Name, benefit, warning..."
                className="pl-9"
              />
            </div>
          </label>

          <label className="space-y-1 text-sm">
            <span className="text-[var(--text-muted)]">Category</span>
            <Select
              value={categoryId}
              onChange={(event) => setCategoryId(event.target.value)}
            >
              <option value="all">All categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </Select>
          </label>

          <label className="space-y-1 text-sm">
            <span className="text-[var(--text-muted)]">Minimum effectiveness</span>
            <Select
              value={String(minEffectiveness)}
              onChange={(event) => setMinEffectiveness(Number(event.target.value))}
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <option key={value} value={value}>
                  {value} star{value > 1 ? "s" : ""} or higher
                </option>
              ))}
            </Select>
          </label>

          <label className="space-y-1 text-sm">
            <span className="text-[var(--text-muted)]">Sort</span>
            <Select
              value={sortMode}
              onChange={(event) => setSortMode(event.target.value as SortMode)}
            >
              <option value="effectiveness-desc">Effectiveness (high to low)</option>
              <option value="category-asc">Category</option>
              <option value="name-asc">Name (A-Z)</option>
            </Select>
          </label>

          <label className="space-y-1 text-sm">
            <span className="text-[var(--text-muted)]">Stimulation profile</span>
            <Select
              value={stimulationProfile}
              onChange={(event) => setStimulationProfile(event.target.value)}
            >
              <option value="all">All profiles</option>
              <option value="stimulating">Stimulating</option>
              <option value="calming">Calming</option>
              <option value="balanced">Balanced</option>
              <option value="unknown">Unknown</option>
            </Select>
          </label>

          <label className="space-y-1 text-sm">
            <span className="text-[var(--text-muted)]">Evidence level</span>
            <Select
              value={evidenceLevel}
              onChange={(event) => setEvidenceLevel(event.target.value)}
            >
              <option value="all">All evidence levels</option>
              <option value="strong">Strong</option>
              <option value="moderate">Moderate</option>
              <option value="limited">Limited</option>
            </Select>
          </label>

          <label className="mt-5 flex items-center gap-2 text-sm text-[var(--text-muted)]">
            <input
              type="checkbox"
              checked={cyclingOnly}
              onChange={(event) => setCyclingOnly(event.target.checked)}
              className="h-4 w-4 rounded border-[var(--border-strong)] text-[var(--accent-700)] focus-visible:ring-[var(--accent-500)]"
            />
            Cycling required only
          </label>
        </div>
      </section>

      <section className="flex items-center justify-between">
        <p className="text-sm text-[var(--text-muted)]">
          Showing <span className="font-semibold">{filteredEntries.length}</span>{" "}
          of {entries.length} entries
        </p>
        <p className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)]">
          <Scale className="h-4 w-4" />
          Select up to 3 entries for quick compare
        </p>
      </section>

      <section className="grid gap-3">
        {filteredEntries.map((entry) => (
          <Card key={entry.id} className="p-4">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="space-y-2">
                <CardTitle className="text-base">
                  <Link
                    href={`/entries/${entry.id}`}
                    className="underline-offset-4 hover:underline"
                  >
                    {entry.name}
                  </Link>
                </CardTitle>
                <CardDescription>{entry.mechanism}</CardDescription>
                <div className="flex flex-wrap items-center gap-2">
                  <RatingStars value={entry.effectivenessStars} />
                  <Badge variant="neutral">{evidenceLabels[entry.evidenceLevel]}</Badge>
                  <Badge variant="neutral">{entry.stimulationProfile}</Badge>
                  {entry.cycling.required ? (
                    <Badge variant="caution">Cycling required</Badge>
                  ) : null}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <label className="inline-flex items-center gap-2 rounded-full border border-[var(--border-muted)] px-3 py-1.5 text-xs font-semibold text-[var(--text-muted)]">
                  <input
                    type="checkbox"
                    checked={selectedCompareIds.includes(entry.id)}
                    onChange={() => toggleCompare(entry.id)}
                    disabled={
                      !selectedCompareIds.includes(entry.id) &&
                      selectedCompareIds.length >= 3
                    }
                    className="h-4 w-4 rounded border-[var(--border-strong)]"
                  />
                  Compare
                </label>
                <Link
                  href={`/entries/${entry.id}`}
                  className="inline-flex h-9 items-center rounded-full border border-[var(--border-strong)] px-3 text-xs font-semibold text-[var(--text-strong)] hover:bg-[var(--surface-2)]"
                >
                  Details
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </section>

      {compareEntries.length >= 2 ? (
        <section className="rounded-3xl border border-[var(--border-muted)] bg-[var(--surface-0)] p-5 shadow-[var(--shadow-soft)]">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[var(--text-muted)]">
            <ArrowUpDown className="h-4 w-4" />
            Quick Compare ({compareEntries.length}/3)
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className="w-44 border-b border-[var(--border-muted)] py-2 pr-3 text-left text-[var(--text-muted)]">
                    Field
                  </th>
                  {compareEntries.map((entry) => (
                    <th
                      key={entry.id}
                      className="border-b border-[var(--border-muted)] py-2 pr-4 text-left font-semibold text-[var(--text-strong)]"
                    >
                      {entry.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 pr-3 font-medium text-[var(--text-muted)]">
                    Category
                  </td>
                  {compareEntries.map((entry) => {
                    const category = categories.find((item) => item.id === entry.categoryId);
                    return <td key={entry.id} className="py-2 pr-4">{category?.title}</td>;
                  })}
                </tr>
                <tr>
                  <td className="py-2 pr-3 font-medium text-[var(--text-muted)]">
                    Effectiveness
                  </td>
                  {compareEntries.map((entry) => (
                    <td key={entry.id} className="py-2 pr-4">
                      <RatingStars value={entry.effectivenessStars} />
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-2 pr-3 font-medium text-[var(--text-muted)]">
                    Dosage / Protocol
                  </td>
                  {compareEntries.map((entry) => (
                    <td key={entry.id} className="py-2 pr-4 text-xs leading-relaxed">
                      {entry.dosageOrProtocol}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="py-2 pr-3 font-medium text-[var(--text-muted)]">
                    Cycling
                  </td>
                  {compareEntries.map((entry) => (
                    <td key={entry.id} className="py-2 pr-4 text-xs leading-relaxed">
                      {entry.cycling.guidance}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      ) : null}
    </div>
  );
}
