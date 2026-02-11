import { getEntries } from "@/lib/data";
import { CompatibilityClient } from "@/app/compatibility/compatibility-client";

export default function CompatibilityPage() {
  const entries = getEntries();
  return <CompatibilityClient entries={entries} />;
}
