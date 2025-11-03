import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ templates: [] });
}

export async function POST(request: Request) {
  const template = await request.json();
  return NextResponse.json({ message: "Template submitted", template });
}
