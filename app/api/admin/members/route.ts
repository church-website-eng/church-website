import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

const memberSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  approved: true,
  birthMonth: true,
  birthDay: true,
  createdAt: true,
};

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as { role?: string }).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const members = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: memberSelect,
  });

  return NextResponse.json(members);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as { role?: string }).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, email, role, birthMonth, birthDay } = await request.json();

  if (!name || !email) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "A member with this email already exists." }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash("Welcome123!", 10);

  const member = await prisma.user.create({
    data: {
      name,
      email,
      hashedPassword,
      role: role || "MEMBER",
      approved: true,
      birthMonth: birthMonth ?? null,
      birthDay: birthDay ?? null,
    },
    select: memberSelect,
  });

  return NextResponse.json(member);
}

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as { role?: string }).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, approved, role } = await request.json();

  const data: { approved?: boolean; role?: string } = {};
  if (typeof approved === "boolean") data.approved = approved;
  if (role) data.role = role;

  const updated = await prisma.user.update({
    where: { id },
    data,
    select: memberSelect,
  });

  return NextResponse.json(updated);
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as { role?: string }).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Member ID is required." }, { status: 400 });
  }

  await prisma.user.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
