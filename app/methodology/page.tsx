import { Card, CardDescription, CardTitle } from "@/components/ui/card";

const scale = [
  {
    rating: "★★★★★",
    meaning: "Rock-solid clinical evidence, multiple RCTs, well-established",
  },
  {
    rating: "★★★★",
    meaning: "Good evidence, several human studies, strong anecdotal consensus",
  },
  {
    rating: "★★★",
    meaning: "Moderate evidence, some human trials, promising preclinical",
  },
  {
    rating: "★★",
    meaning:
      "Limited evidence, mostly animal/preclinical or small pilot studies",
  },
  {
    rating: "★",
    meaning: "Experimental, very early research, largely anecdotal",
  },
];

export default function MethodologyPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-[var(--border-muted)] bg-[var(--surface-0)] p-6 shadow-[var(--shadow-soft)]">
        <h1 className="text-3xl font-semibold">Methodology and Data Transparency</h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[var(--text-muted)]">
          This hub converts local source data (`data.md`) into structured JSON
          with schema validation. Compatibility outcomes are educational
          heuristics based on listed synergies, warning language, and category/tag
          rules. They are not clinical interaction clearance.
        </p>
      </section>

      <Card>
        <CardTitle>Effectiveness Scale</CardTitle>
        <div className="mt-3 overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="border-b border-[var(--border-muted)] py-2 pr-3 text-left">
                  Rating
                </th>
                <th className="border-b border-[var(--border-muted)] py-2 text-left">
                  Meaning
                </th>
              </tr>
            </thead>
            <tbody>
              {scale.map((row) => (
                <tr key={row.rating}>
                  <td className="border-b border-[var(--border-muted)] py-2 pr-3 font-mono">
                    {row.rating}
                  </td>
                  <td className="border-b border-[var(--border-muted)] py-2 text-[var(--text-muted)]">
                    {row.meaning}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <section className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardTitle>Data Pipeline</CardTitle>
          <CardDescription className="mt-2">
            Markdown tables are parsed by category, normalized to typed entries,
            validated with Zod, and emitted into:
            `data/categories.json`, `data/entries.json`, and
            `data/compatibility-rules.json`.
          </CardDescription>
        </Card>

        <Card>
          <CardTitle>Compatibility Logic</CardTitle>
          <CardDescription className="mt-2">
            Rule priority is `avoid` {">"} `caution` {">"} `synergy` {">"}{" "}
            `unknown`. Sources include explicit source synergies, warning-derived
            tags, and category-level cautions.
          </CardDescription>
        </Card>
      </section>
    </div>
  );
}
