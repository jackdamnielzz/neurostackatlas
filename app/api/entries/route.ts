import { NextRequest, NextResponse } from "next/server";
import { getEntries } from "@/lib/data";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q")?.trim().toLowerCase();

  const entries = getEntries();
  if (!query) {
    return NextResponse.json(entries);
  }

  const filtered = entries.filter((entry) => {
    const corpus = [
      entry.name,
      entry.mechanism,
      entry.benefits.join(" "),
      entry.warnings.join(" "),
      entry.synergies.join(" "),
      entry.rawNotes,
    ]
      .join(" ")
      .toLowerCase();

    return corpus.includes(query);
  });

  return NextResponse.json(filtered);
}
