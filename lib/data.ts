import categoriesJson from "@/data/categories.json";
import entriesJson from "@/data/entries.json";
import rulesJson from "@/data/compatibility-rules.json";
import {
  categoriesSchema,
  compatibilityRulesSchema,
  entriesSchema,
} from "@/lib/schemas";
import type { Category, CompatibilityRule, Entry } from "@/lib/types";

const categories = categoriesSchema.parse(categoriesJson) as Category[];
const entries = entriesSchema.parse(entriesJson) as Entry[];
const rules = compatibilityRulesSchema.parse(rulesJson) as CompatibilityRule[];

const entryMap = new Map(entries.map((entry) => [entry.id, entry]));
const categoryMap = new Map(categories.map((category) => [category.id, category]));

export function getCategories(): Category[] {
  return categories;
}

export function getEntries(): Entry[] {
  return entries;
}

export function getEntryById(id: string): Entry | undefined {
  return entryMap.get(id);
}

export function getEntriesByIds(ids: string[]): Entry[] {
  return ids
    .map((id) => entryMap.get(id))
    .filter((entry): entry is Entry => Boolean(entry));
}

export function getRules(): CompatibilityRule[] {
  return rules;
}

export function getCategoryById(id: string): Category | undefined {
  return categoryMap.get(id);
}
