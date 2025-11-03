import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const ledgerEntry = await request.json();
  return NextResponse.json({ message: "Attribution entry received", ledgerEntry });
}
