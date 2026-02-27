import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ key: string }> },
) {
  const { key } = await params;

  try {
    const row = await prisma.siteContent.findUnique({ where: { key } });
    if (!row) {
      return NextResponse.json({ value: null });
    }
    return NextResponse.json({ value: JSON.parse(row.value) });
  } catch {
    return NextResponse.json({ value: null });
  }
}
