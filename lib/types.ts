export type EntryKind = "substance" | "intervention";

export type EvidenceLevel = "strong" | "moderate" | "limited";

export type StimulationProfile =
  | "stimulating"
  | "calming"
  | "balanced"
  | "unknown";

export type CompatibilityResult = "synergy" | "caution" | "avoid" | "unknown";

export type SeverityLevel = "low" | "medium" | "high";

export interface CyclingInfo {
  required: boolean;
  guidance: string;
}

export interface Entry {
  id: string;
  indexNumber: number;
  name: string;
  kind: EntryKind;
  categoryId: string;
  mechanism: string;
  benefits: string[];
  dosageOrProtocol: string;
  timingAdministration: string;
  onset: string;
  duration: string;
  effectivenessStars: 1 | 2 | 3 | 4 | 5;
  evidenceLevel: EvidenceLevel;
  stimulationProfile: StimulationProfile;
  synergies: string[];
  cycling: CyclingInfo;
  warnings: string[];
  tags: string[];
  rawNotes: string;
}

export interface Category {
  id: string;
  title: string;
  displayOrder: number;
}

export interface CompatibilityRule {
  id: string;
  appliesTo: {
    entryIds?: string[];
    categoryIds?: string[];
    tagPairs?: string[];
  };
  result: CompatibilityResult;
  reason: string;
  severity: SeverityLevel;
  evidence: EvidenceLevel;
}

export interface PairCompatibilityResult {
  pair: [string, string];
  verdict: CompatibilityResult;
  severity: SeverityLevel;
  evidence: EvidenceLevel;
  reason: string;
  matchedRules: CompatibilityRule[];
}

export interface CompatibilityOutcome {
  selectedIds: string[];
  selectedEntries: Entry[];
  verdict: CompatibilityResult;
  severity: SeverityLevel;
  evidence: EvidenceLevel;
  summary: string;
  pairResults: PairCompatibilityResult[];
  safetyReminder: string;
}
