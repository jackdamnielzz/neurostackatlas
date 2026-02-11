import { z } from "zod";

export const evidenceLevelSchema = z.enum(["strong", "moderate", "limited"]);
export const stimulationProfileSchema = z.enum([
  "stimulating",
  "calming",
  "balanced",
  "unknown",
]);
export const compatibilityResultSchema = z.enum([
  "synergy",
  "caution",
  "avoid",
  "unknown",
]);
export const severitySchema = z.enum(["low", "medium", "high"]);
export const entryKindSchema = z.enum(["substance", "intervention"]);

export const categorySchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  displayOrder: z.number().int().positive(),
});

export const entrySchema = z.object({
  id: z.string().min(1),
  indexNumber: z.number().int().positive(),
  name: z.string().min(1),
  kind: entryKindSchema,
  categoryId: z.string().min(1),
  mechanism: z.string().min(1),
  benefits: z.array(z.string().min(1)),
  dosageOrProtocol: z.string().min(1),
  timingAdministration: z.string().min(1),
  onset: z.string().min(1),
  duration: z.string().min(1),
  effectivenessStars: z.union([
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
    z.literal(5),
  ]),
  evidenceLevel: evidenceLevelSchema,
  stimulationProfile: stimulationProfileSchema,
  synergies: z.array(z.string().min(1)),
  cycling: z.object({
    required: z.boolean(),
    guidance: z.string().min(1),
  }),
  warnings: z.array(z.string().min(1)),
  tags: z.array(z.string().min(1)),
  rawNotes: z.string().min(1),
});

export const compatibilityRuleSchema = z.object({
  id: z.string().min(1),
  appliesTo: z.object({
    entryIds: z.array(z.string().min(1)).optional(),
    categoryIds: z.array(z.string().min(1)).optional(),
    tagPairs: z.array(z.string().min(1)).optional(),
  }),
  result: compatibilityResultSchema,
  reason: z.string().min(1),
  severity: severitySchema,
  evidence: evidenceLevelSchema,
});

export const categoriesSchema = z.array(categorySchema);
export const entriesSchema = z.array(entrySchema);
export const compatibilityRulesSchema = z.array(compatibilityRuleSchema);

export type CategoryInput = z.infer<typeof categorySchema>;
export type EntryInput = z.infer<typeof entrySchema>;
export type CompatibilityRuleInput = z.infer<typeof compatibilityRuleSchema>;
