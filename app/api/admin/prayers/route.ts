import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as { role?: string }).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const prayers = await prisma.prayerRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(prayers);
}

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as { role?: string }).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, isPublic } = await request.json();

  const updated = await prisma.prayerRequest.update({
    where: { id },
    data: { isPublic },
  });

  return NextResponse.json(updated);
}
