import { stars } from "@/lib/format";

export function RatingStars({ value }: { value: number }) {
  return (
    <span
      className="font-mono text-sm tracking-wide text-[var(--accent-800)]"
      aria-label={`${value} out of 5`}
      title={`${value} out of 5`}
    >
      {stars(value)}
    </span>
  );
}
