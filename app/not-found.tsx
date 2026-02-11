import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="rounded-2xl border border-[var(--border-muted)] bg-[var(--surface-0)] p-8 text-center shadow-[var(--shadow-soft)]">
      <h1 className="text-3xl font-semibold">Entry not found</h1>
      <p className="mt-2 text-[var(--text-muted)]">
        The requested item does not exist in the current dataset.
      </p>
      <Link
        href="/catalog"
        className="mt-4 inline-flex rounded-full bg-[var(--accent-700)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--accent-800)]"
      >
        Back to catalog
      </Link>
    </div>
  );
}
