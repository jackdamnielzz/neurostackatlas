import type { CompatibilityResult, SeverityLevel } from "@/lib/types";

export function stars(value: number): string {
  return "★".repeat(value).padEnd(5, "☆");
}

export function titleCaseCompatibility(value: CompatibilityResult): string {
  return value[0].toUpperCase() + value.slice(1);
}

export function titleCaseSeverity(value: SeverityLevel): string {
  return value[0].toUpperCase() + value.slice(1);
}
