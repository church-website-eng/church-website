import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as { role?: string }).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const testimonies = await prisma.testimony.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(testimonies);
}

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as { role?: string }).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, approved } = await request.json();

  const updated = await prisma.testimony.update({
    where: { id },
    data: { approved },
  });

  return NextResponse.json(updated);
}
