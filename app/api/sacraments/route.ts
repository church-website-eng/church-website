import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendNotification } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, type, preferredDate, details } = body;

    if (!name || !email || !type) {
      return NextResponse.json(
        { error: "Name, email, and sacrament type are required" },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    const sacrament = await prisma.sacramentRequest.create({
      data: {
        name,
        email,
        phone: phone || null,
        type,
        preferredDate: preferredDate || null,
        details: details || null,
      },
    });

    await sendNotification(
      `New Sacrament Request: ${type}`,
      `<h2>New Sacrament Request</h2>
       <p><strong>Name:</strong> ${name}</p>
       <p><strong>Email:</strong> ${email}</p>
       ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
       <p><strong>Sacrament:</strong> ${type}</p>
       ${preferredDate ? `<p><strong>Preferred Date:</strong> ${preferredDate}</p>` : ""}
       ${details ? `<p><strong>Details:</strong> ${details}</p>` : ""}
       <hr/>
       <p style="color:#888">Submitted ${new Date().toLocaleString()}</p>`,
    );

    return NextResponse.json({ success: true, id: sacrament.id });
  } catch (err) {
    console.error("Sacrament API error:", err);
    return NextResponse.json(
      { error: "Failed to submit sacrament request" },
      { status: 500 },
    );
  }
}
