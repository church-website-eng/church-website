import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const testimonies = await prisma.testimony.findMany({
      where: { approved: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(testimonies);
  } catch (err) {
    console.error("Testimonies GET error:", err);
    return NextResponse.json(
      { error: "Failed to fetch testimonies" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, title, testimony } = body;

    if (!name || !testimony) {
      return NextResponse.json(
        { error: "Name and testimony are required" },
        { status: 400 },
      );
    }

    const entry = await prisma.testimony.create({
      data: {
        name,
        title: title || null,
        body: testimony,
        approved: false,
      },
    });

    return NextResponse.json({ success: true, id: entry.id });
  } catch (err) {
    console.error("Testimony POST error:", err);
    return NextResponse.json(
      { error: "Failed to submit testimony" },
      { status: 500 },
    );
  }
}
