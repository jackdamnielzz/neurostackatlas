import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowLeft, Stethoscope } from "lucide-react";
import { RatingStars } from "@/components/rating-stars";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { disclaimerClaims } from "@/lib/disclaimers";
import { getCategories, getEntryById } from "@/lib/data";

interface EntryDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EntryDetailPage({ params }: EntryDetailPageProps) {
  const { id } = await params;
  const entry = getEntryById(id);
  if (!entry) {
    notFound();
  }

  const category = getCategories().find((item) => item.id === entry.categoryId);

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/catalog"
          className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent-800)] underline-offset-4 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to catalog
        </Link>
      </div>

      <section className="rounded-3xl border border-[var(--border-muted)] bg-[var(--surface-0)] p-6 shadow-[var(--shadow-soft)]">
        <p className="text-sm text-[var(--text-muted)]">{category?.title}</p>
        <h1 className="mt-1 text-3xl font-semibold">{entry.name}</h1>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <RatingStars value={entry.effectivenessStars} />
          <Badge variant="neutral">{entry.kind}</Badge>
          <Badge variant="neutral">{entry.evidenceLevel}</Badge>
          <Badge variant="neutral">{entry.stimulationProfile}</Badge>
          {entry.cycling.required ? (
            <Badge variant="caution">Cycling required</Badge>
          ) : null}
        </div>
      </section>

      <Card className="border-amber-300 bg-amber-50/80">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-700" />
          <div>
            <CardTitle className="text-amber-900">
              Safety warning before use
            </CardTitle>
            <CardDescription className="mt-1 text-amber-900">
              {disclaimerClaims[0]} {disclaimerClaims[2]}
            </CardDescription>
          </div>
        </div>
      </Card>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardTitle>Mechanism of Action</CardTitle>
          <CardDescription className="mt-2">{entry.mechanism}</CardDescription>
        </Card>
        <Card>
          <CardTitle>Primary Benefits</CardTitle>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--text-muted)]">
            {entry.benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
        </Card>
        <Card>
          <CardTitle>Dosage / Protocol</CardTitle>
          <CardDescription className="mt-2">{entry.dosageOrProtocol}</CardDescription>
        </Card>
        <Card>
          <CardTitle>Timing and Administration</CardTitle>
          <CardDescription className="mt-2">
            {entry.timingAdministration}
          </CardDescription>
        </Card>
        <Card>
          <CardTitle>Onset and Duration</CardTitle>
          <CardDescription className="mt-2">
            Onset: {entry.onset}
            <br />
            Duration: {entry.duration}
          </CardDescription>
        </Card>
        <Card>
          <CardTitle>Cycling Guidance</CardTitle>
          <CardDescription className="mt-2">{entry.cycling.guidance}</CardDescription>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardTitle>Best Synergies</CardTitle>
          <div className="mt-3 flex flex-wrap gap-2">
            {entry.synergies.map((synergy) => (
              <Badge key={synergy} variant="synergy">
                {synergy}
              </Badge>
            ))}
          </div>
        </Card>
        <Card>
          <CardTitle>Warnings and Contraindications</CardTitle>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--text-muted)]">
            {entry.warnings.map((warning) => (
              <li key={warning}>{warning}</li>
            ))}
          </ul>
        </Card>
      </section>

      <Card className="border-[var(--accent-500)] bg-[var(--surface-2)]">
        <div className="flex items-start gap-3">
          <Stethoscope className="mt-0.5 h-5 w-5 text-[var(--accent-800)]" />
          <div className="space-y-1">
            <CardTitle>Discuss with your physician</CardTitle>
            <CardDescription>
              Always review this entry with your physician or pharmacist before
              starting, combining, or changing any protocol.
            </CardDescription>
          </div>
        </div>
      </Card>
    </div>
  );
}
