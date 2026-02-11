import { describe, expect, it } from "vitest";
import { getCategories, getEntries } from "@/lib/data";

describe("data integrity", () => {
  it("parses all categories and entries from data.md", () => {
    const categories = getCategories();
    const entries = getEntries();

    expect(categories).toHaveLength(18);
    expect(entries).toHaveLength(109);
  });

  it("maps category 18 intervention variant correctly", () => {
    const categories = getCategories();
    const entries = getEntries();
    const category18 = categories.find((category) => category.displayOrder === 18);

    expect(category18).toBeDefined();

    const interventions = entries.filter((entry) => entry.kind === "intervention");
    expect(interventions.length).toBe(9);
    expect(interventions.every((entry) => entry.categoryId === category18?.id)).toBe(
      true,
    );
  });

  it("keeps required fields populated", () => {
    const entries = getEntries();

    for (const entry of entries) {
      expect(entry.id).toBeTruthy();
      expect(entry.name).toBeTruthy();
      expect(entry.categoryId).toBeTruthy();
      expect(entry.mechanism).toBeTruthy();
      expect(entry.benefits.length).toBeGreaterThan(0);
      expect(entry.dosageOrProtocol).toBeTruthy();
      expect(entry.timingAdministration).toBeTruthy();
      expect(entry.onset).toBeTruthy();
      expect(entry.duration).toBeTruthy();
      expect(entry.rawNotes).toBeTruthy();
    }
  });
});
