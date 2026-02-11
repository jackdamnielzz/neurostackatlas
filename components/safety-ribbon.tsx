import { AlertTriangle } from "lucide-react";
import { disclaimerSummary, disclaimerTitle } from "@/lib/disclaimers";

export function SafetyRibbon() {
  return (
    <div className="border-b border-amber-200 bg-amber-50">
      <div className="mx-auto flex w-full max-w-7xl items-start gap-2 px-4 py-2 text-sm text-amber-900 sm:px-6">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
        <p>
          <span className="font-semibold">{disclaimerTitle}:</span>{" "}
          {disclaimerSummary}
        </p>
      </div>
    </div>
  );
}
