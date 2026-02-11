import { describe, expect, it } from "vitest";
import { evaluateCompatibilityByIds } from "@/lib/compatibility";
import { getEntries } from "@/lib/data";

function findId(nameFragment: string): string {
  const match = getEntries().find((entry) =>
    entry.name.toLowerCase().includes(nameFragment.toLowerCase()),
  );
  if (!match) {
    throw new Error(`Entry not found: ${nameFragment}`);
  }
  return match.id;
}

describe("compatibility engine", () => {
  it("applies avoid over other verdicts when serotonergic + MAOI pattern appears", () => {
    const htp = findId("5-HTP");
    const rhodiola = findId("Rhodiola Rosea");

    const result = evaluateCompatibilityByIds([htp, rhodiola]);
    expect(result.verdict).toBe("avoid");
    expect(result.pairResults[0].verdict).toBe("avoid");
  });

  it("returns unknown when no matching rule exists", () => {
    const creatine = findId("Creatine Monohydrate");
    const prebiotics = findId("Prebiotics");

    const result = evaluateCompatibilityByIds([creatine, prebiotics]);
    expect(result.verdict).toBe("unknown");
  });

  it("resolves multi-item checks by highest-priority pair verdict", () => {
    const htp = findId("5-HTP");
    const rhodiola = findId("Rhodiola Rosea");
    const caffeine = findId("Caffeine");

    const result = evaluateCompatibilityByIds([htp, caffeine, rhodiola]);
    expect(result.verdict).toBe("avoid");
    expect(result.pairResults.length).toBe(3);
  });
});
