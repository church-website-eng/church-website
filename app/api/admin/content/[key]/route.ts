import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ key: string }> },
) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as { role?: string }).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { key } = await params;
  const row = await prisma.siteContent.findUnique({ where: { key } });

  if (!row) {
    return NextResponse.json({ value: null });
  }

  return NextResponse.json({ value: JSON.parse(row.value) });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ key: string }> },
) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as { role?: string }).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { key } = await params;
  const body = await request.json();

  const row = await prisma.siteContent.upsert({
    where: { key },
    update: { value: JSON.stringify(body.value) },
    create: { key, value: JSON.stringify(body.value) },
  });

  return NextResponse.json({ success: true, updatedAt: row.updatedAt });
}
