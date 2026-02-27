import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { groupId, memberName, memberEmail } = body;

    if (!groupId || !memberName || !memberEmail) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(memberEmail)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    const joinRequest = await prisma.groupJoinRequest.create({
      data: {
        name: memberName,
        email: memberEmail,
        groupName: groupId,
      },
    });

    return NextResponse.json({ success: true, id: joinRequest.id });
  } catch (err) {
    console.error("Group join API error:", err);
    return NextResponse.json(
      { error: "Failed to submit join request" },
      { status: 500 },
    );
  }
}
