import { NextResponse } from "next/server";
import {
  compatibilitySafetyReminder,
  disclaimerClaims,
  disclaimerSummary,
  disclaimerTitle,
  emergencyGuidance,
} from "@/lib/disclaimers";

export async function GET() {
  return NextResponse.json({
    title: disclaimerTitle,
    summary: disclaimerSummary,
    claims: disclaimerClaims,
    emergencyGuidance,
    compatibilitySafetyReminder,
  });
}
