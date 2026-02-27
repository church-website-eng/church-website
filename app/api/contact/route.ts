import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendNotification } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    const submission = await prisma.contactSubmission.create({
      data: { name, email, phone: phone || null, message },
    });

    await sendNotification(
      `New Contact Form: ${name}`,
      `<h2>New Contact Submission</h2>
       <p><strong>Name:</strong> ${name}</p>
       <p><strong>Email:</strong> ${email}</p>
       ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
       <p><strong>Message:</strong></p>
       <p>${message}</p>
       <hr/>
       <p style="color:#888">Submitted ${new Date().toLocaleString()}</p>`,
    );

    return NextResponse.json({ success: true, id: submission.id });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Failed to submit contact form" },
      { status: 500 },
    );
  }
}
