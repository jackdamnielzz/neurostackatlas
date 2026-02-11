import Link from "next/link";
import { disclaimerSummary } from "@/lib/disclaimers";

export function SiteFooter() {
  return (
    <footer className="sticky bottom-0 z-20 border-t border-[var(--border-muted)] bg-[var(--surface-1)]/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-4 py-3 text-xs text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>{disclaimerSummary}</p>
        <Link
          href="/safety"
          className="font-semibold text-[var(--accent-800)] underline-offset-4 hover:underline"
        >
          Read full medical and legal notice
        </Link>
      </div>
    </footer>
  );
}
