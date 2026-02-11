import type { CompatibilityResult } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

export function CompatibilityBadge({
  verdict,
}: {
  verdict: CompatibilityResult;
}) {
  if (verdict === "avoid") {
    return <Badge variant="avoid">Avoid</Badge>;
  }
  if (verdict === "caution") {
    return <Badge variant="caution">Caution</Badge>;
  }
  if (verdict === "synergy") {
    return <Badge variant="synergy">Synergy</Badge>;
  }
  return <Badge variant="unknown">Unknown</Badge>;
}
