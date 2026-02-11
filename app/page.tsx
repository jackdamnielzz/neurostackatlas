import Link from "next/link";
import { ArrowRight, ShieldAlert } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { disclaimerClaims } from "@/lib/disclaimers";
import { getCategories, getEntries } from "@/lib/data";

export default function HomePage() {
  const categories = getCategories();
  const entries = getEntries();

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-[var(--border-muted)] bg-gradient-to-r from-[var(--surface-0)] via-[var(--surface-1)] to-[var(--surface-2)] p-6 shadow-[var(--shadow-soft)] sm:p-8">
        <p className="mb-3 inline-flex rounded-full border border-[var(--border-strong)] bg-[var(--surface-0)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
          Educational knowledge hub
        </p>
        <h1 className="max-w-3xl text-3xl font-semibold leading-tight text-[var(--text-strong)] sm:text-4xl">
          Explore cognitive biohacking data with clear categories, safety
          guardrails, and evidence-weighted context.
        </h1>
        <p className="mt-4 max-w-2xl text-base text-[var(--text-muted)]">
          Browse substances and interventions, inspect dosage/protocol notes,
          compare options, and review compatibility heuristics. Always discuss
          decisions with your physician or pharmacist.
        </p>

        <form action="/catalog" className="mt-6 flex flex-col gap-3 sm:flex-row">
          <input
            name="q"
            type="search"
            placeholder="Search by name, benefit, mechanism, warning, or synergy..."
            className="h-11 w-full rounded-xl border border-[var(--border-strong)] bg-[var(--surface-0)] px-3 text-sm shadow-[var(--shadow-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-500)]"
          />
          <button
            type="submit"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[var(--accent-700)] px-4 text-sm font-semibold text-white hover:bg-[var(--accent-800)]"
          >
            Open Catalog
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </section>

      <section>
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-2xl font-semibold">Category Map</h2>
          <p className="text-sm text-[var(--text-muted)]">
            {entries.length} entries across {categories.length} categories
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const count = entries.filter((entry) => entry.categoryId === category.id).length;
            return (
              <Link
                key={category.id}
                href={`/catalog?category=${encodeURIComponent(category.id)}`}
              >
                <Card className="h-full transition hover:-translate-y-0.5 hover:border-[var(--border-strong)]">
                  <CardTitle className="text-base">{category.title}</CardTitle>
                  <CardDescription className="mt-2">
                    {count} tracked entries
                  </CardDescription>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <Card className="border-amber-300 bg-amber-50/70">
          <div className="flex items-start gap-3">
            <ShieldAlert className="mt-0.5 h-5 w-5 text-amber-700" />
            <div className="space-y-2">
              <CardTitle className="text-amber-900">Start Safely</CardTitle>
              <ul className="list-disc space-y-1 pl-5 text-sm text-amber-900">
                {disclaimerClaims.slice(0, 3).map((claim) => (
                  <li key={claim}>{claim}</li>
                ))}
              </ul>
              <Link
                href="/safety"
                className="inline-flex items-center text-sm font-semibold text-amber-900 underline-offset-4 hover:underline"
              >
                Read complete safety and legal notice
              </Link>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
