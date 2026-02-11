"use client";

import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, ShieldAlert } from "lucide-react";
import { CompatibilityBadge } from "@/components/compatibility-badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { disclaimerClaims } from "@/lib/disclaimers";
import type { CompatibilityOutcome, Entry } from "@/lib/types";

interface CompatibilityClientProps {
  entries: Entry[];
}

const GUARDRAIL_STORAGE_KEY = "compatibility-guardrail-acknowledged-v1";

export function CompatibilityClient({ entries }: CompatibilityClientProps) {
  const [query, setQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [acknowledged, setAcknowledged] = useState(false);
  const [result, setResult] = useState<CompatibilityOutcome | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(GUARDRAIL_STORAGE_KEY);
    setAcknowledged(stored === "true");
  }, []);

  useEffect(() => {
    if (!acknowledged || selectedIds.length < 2) {
      setResult(null);
      return;
    }

    const controller = new AbortController();
    const idsParam = selectedIds.join(",");

    async function run() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/compatibility?ids=${idsParam}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          const payload = (await response.json()) as { error?: string };
          throw new Error(payload.error ?? "Compatibility request failed.");
        }

        const payload = (await response.json()) as CompatibilityOutcome;
        setResult(payload);
      } catch (requestError) {
        if (controller.signal.aborted) {
          return;
        }

        setError(
          requestError instanceof Error
            ? requestError.message
            : "Compatibility request failed.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    run();
    return () => controller.abort();
  }, [acknowledged, selectedIds]);

  const filteredEntries = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entries;
    return entries.filter((entry) => {
      const corpus = `${entry.name} ${entry.benefits.join(" ")} ${entry.categoryId}`.toLowerCase();
      return corpus.includes(q);
    });
  }, [entries, query]);

  const entryNameMap = useMemo(
    () => new Map(entries.map((entry) => [entry.id, entry.name])),
    [entries],
  );

  function toggleSelected(id: string) {
    setSelectedIds((current) => {
      if (current.includes(id)) {
        return current.filter((item) => item !== id);
      }
      if (current.length >= 3) {
        return current;
      }
      return [...current, id];
    });
  }

  function acknowledgeGuardrail() {
    setAcknowledged(true);
    window.localStorage.setItem(GUARDRAIL_STORAGE_KEY, "true");
  }

  return (
    <div className="relative space-y-5">
      {!acknowledged ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
          <Card className="max-w-2xl border-amber-300 bg-amber-50">
            <div className="flex items-start gap-3">
              <ShieldAlert className="mt-0.5 h-5 w-5 text-amber-700" />
              <div className="space-y-2">
                <CardTitle className="text-amber-900">
                  Medical safety acknowledgement required
                </CardTitle>
                <ul className="list-disc space-y-1 pl-5 text-sm text-amber-900">
                  {disclaimerClaims.slice(0, 4).map((claim) => (
                    <li key={claim}>{claim}</li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={acknowledgeGuardrail}
                  className="rounded-full bg-amber-700 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-800"
                >
                  I understand, continue
                </button>
              </div>
            </div>
          </Card>
        </div>
      ) : null}

      <section className="rounded-3xl border border-[var(--border-muted)] bg-[var(--surface-0)] p-5 shadow-[var(--shadow-soft)]">
        <h1 className="text-2xl font-semibold">Compatibility Checker</h1>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          Select 2-3 entries for rule-based educational compatibility signals.
        </p>

        <div className="mt-4">
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search entries..."
          />
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-2">
        {filteredEntries.map((entry) => (
          <label
            key={entry.id}
            className="flex cursor-pointer items-start gap-3 rounded-2xl border border-[var(--border-muted)] bg-[var(--surface-0)] p-4 shadow-[var(--shadow-soft)]"
          >
            <input
              type="checkbox"
              checked={selectedIds.includes(entry.id)}
              onChange={() => toggleSelected(entry.id)}
              disabled={!selectedIds.includes(entry.id) && selectedIds.length >= 3}
              className="mt-1 h-4 w-4 rounded border-[var(--border-strong)]"
            />
            <div className="space-y-1">
              <p className="font-semibold text-[var(--text-strong)]">{entry.name}</p>
              <p className="text-xs text-[var(--text-muted)]">
                {entry.benefits.slice(0, 2).join(", ")}
              </p>
            </div>
          </label>
        ))}
      </section>

      <section className="rounded-3xl border border-[var(--border-muted)] bg-[var(--surface-0)] p-5 shadow-[var(--shadow-soft)]">
        {selectedIds.length < 2 ? (
          <CardDescription>
            Select at least two entries to evaluate compatibility.
          </CardDescription>
        ) : null}
        {loading ? (
          <CardDescription>Evaluating compatibility rules...</CardDescription>
        ) : null}
        {error ? (
          <p className="text-sm font-semibold text-rose-700">{error}</p>
        ) : null}
        {result ? (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <CompatibilityBadge verdict={result.verdict} />
              <span className="rounded-full bg-[var(--surface-2)] px-2.5 py-1 text-xs font-semibold text-[var(--text-muted)]">
                Severity: {result.severity}
              </span>
              <span className="rounded-full bg-[var(--surface-2)] px-2.5 py-1 text-xs font-semibold text-[var(--text-muted)]">
                Evidence: {result.evidence}
              </span>
            </div>
            <p className="text-sm text-[var(--text-muted)]">{result.summary}</p>

            <div className="space-y-2">
              {result.pairResults.map((pairResult) => (
                <Card key={`${pairResult.pair[0]}-${pairResult.pair[1]}`} className="p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <CompatibilityBadge verdict={pairResult.verdict} />
                    <span className="text-sm font-semibold text-[var(--text-strong)]">
                      {entryNameMap.get(pairResult.pair[0])} +{" "}
                      {entryNameMap.get(pairResult.pair[1])}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-[var(--text-muted)]">
                    {pairResult.reason}
                  </p>
                </Card>
              ))}
            </div>

            <div className="rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
              <div className="flex items-start gap-2">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                <p>{result.safetyReminder}</p>
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}
