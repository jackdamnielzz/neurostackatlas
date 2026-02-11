import { NextRequest, NextResponse } from "next/server";
import { evaluateCompatibilityByIds } from "@/lib/compatibility";

export async function GET(request: NextRequest) {
  const rawIds = request.nextUrl.searchParams.get("ids") ?? "";
  const ids = rawIds
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  if (ids.length < 2) {
    return NextResponse.json(
      { error: "Provide at least two comma-separated ids in the ids query." },
      { status: 400 },
    );
  }

  const payload = evaluateCompatibilityByIds(ids);
  return NextResponse.json(payload);
}
