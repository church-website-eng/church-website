import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendNotification } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, category, request: prayerRequest, isPrivate } = body;

    if (!name || !prayerRequest) {
      return NextResponse.json(
        { error: "Name and prayer request are required" },
        { status: 400 },
      );
    }

    const prayer = await prisma.prayerRequest.create({
      data: {
        name,
        email: email || null,
        category: category || null,
        request: prayerRequest,
        isPublic: !isPrivate,
      },
    });

    await sendNotification(
      `New Prayer Request: ${category || "General"}`,
      `<h2>New Prayer Request</h2>
       <p><strong>Name:</strong> ${name}</p>
       ${email ? `<p><strong>Email:</strong> ${email}</p>` : ""}
       <p><strong>Category:</strong> ${category || "General"}</p>
       <p><strong>Visibility:</strong> ${isPrivate ? "Private" : "Public"}</p>
       <p><strong>Request:</strong></p>
       <p>${prayerRequest}</p>
       <hr/>
       <p style="color:#888">Submitted ${new Date().toLocaleString()}</p>`,
    );

    return NextResponse.json({ success: true, id: prayer.id });
  } catch (err) {
    console.error("Prayer API error:", err);
    return NextResponse.json(
      { error: "Failed to submit prayer request" },
      { status: 500 },
    );
  }
}
