import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      name: true,
      email: true,
      birthMonth: true,
      birthDay: true,
      createdAt: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name, birthMonth, birthDay, currentPassword, newPassword } =
    await request.json();

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const data: {
    name?: string;
    birthMonth?: number | null;
    birthDay?: number | null;
    hashedPassword?: string;
  } = {};

  if (name && name.trim()) data.name = name.trim();
  if (typeof birthMonth === "number") data.birthMonth = birthMonth || null;
  if (typeof birthDay === "number") data.birthDay = birthDay || null;

  // Password change
  if (newPassword) {
    if (!currentPassword) {
      return NextResponse.json(
        { error: "Current password is required to set a new password." },
        { status: 400 },
      );
    }
    const valid = await bcrypt.compare(currentPassword, user.hashedPassword);
    if (!valid) {
      return NextResponse.json(
        { error: "Current password is incorrect." },
        { status: 400 },
      );
    }
    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "New password must be at least 6 characters." },
        { status: 400 },
      );
    }
    data.hashedPassword = await bcrypt.hash(newPassword, 10);
  }

  const updated = await prisma.user.update({
    where: { email: session.user.email },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      birthMonth: true,
      birthDay: true,
      createdAt: true,
    },
  });

  return NextResponse.json(updated);
}
