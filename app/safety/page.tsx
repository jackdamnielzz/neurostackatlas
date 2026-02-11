import { AlertTriangle, ShieldAlert, Siren } from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import {
  disclaimerClaims,
  disclaimerSummary,
  disclaimerTitle,
  emergencyGuidance,
} from "@/lib/disclaimers";

export default function SafetyPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-amber-300 bg-amber-50 p-6 shadow-[var(--shadow-soft)]">
        <div className="flex items-start gap-3">
          <ShieldAlert className="mt-0.5 h-6 w-6 text-amber-700" />
          <div>
            <h1 className="text-3xl font-semibold text-amber-900">{disclaimerTitle}</h1>
            <p className="mt-2 text-sm text-amber-900">{disclaimerSummary}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-4">
        {disclaimerClaims.map((claim) => (
          <Card key={claim} className="border-[var(--border-muted)] bg-[var(--surface-0)]">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 text-[var(--accent-700)]" />
              <CardDescription>{claim}</CardDescription>
            </div>
          </Card>
        ))}
      </section>

      <Card className="border-rose-300 bg-rose-50">
        <div className="flex items-start gap-3">
          <Siren className="mt-0.5 h-5 w-5 text-rose-700" />
          <div>
            <CardTitle className="text-rose-900">Emergency Guidance</CardTitle>
            <CardDescription className="mt-1 text-rose-900">
              {emergencyGuidance}
            </CardDescription>
          </div>
        </div>
      </Card>
    </div>
  );
}
