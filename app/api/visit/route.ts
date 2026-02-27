import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendNotification, sendEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, date, guests, questions } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    const visit = await prisma.visitorRegistration.create({
      data: {
        name,
        email,
        phone: phone || null,
        date: date || null,
        guests: guests || null,
        questions: questions || null,
      },
    });

    await sendNotification(
      `New Visitor Registration: ${name}`,
      `<h2>New Visitor Registration</h2>
       <p><strong>Name:</strong> ${name}</p>
       <p><strong>Email:</strong> ${email}</p>
       ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
       ${date ? `<p><strong>Planned Visit Date:</strong> ${date}</p>` : ""}
       ${guests ? `<p><strong>Guests:</strong> ${guests}</p>` : ""}
       ${questions ? `<p><strong>Questions:</strong> ${questions}</p>` : ""}
       <hr/>
       <p style="color:#888">Submitted ${new Date().toLocaleString()}</p>`,
    );

    await sendEmail(
      email,
      "Welcome to Goshen Cathedral — Visit Confirmation",
      `<h2>Thank You, ${name}!</h2>
       <p>We are excited to welcome you to Celestial Church of Christ, Goshen Cathedral.</p>
       ${date ? `<p>We look forward to seeing you on <strong>${date}</strong>.</p>` : ""}
       <p><strong>Location:</strong> 441 Rubidge Street, Peterborough, ON</p>
       <p><strong>Sunday Service:</strong> 10:00 AM — 1:00 PM</p>
       <p>Please wear modest attire. White sutanas are available for visitors. Shoes are removed before entering the sanctuary.</p>
       <p>God bless you!</p>
       <p>— Goshen Cathedral</p>`,
    );

    return NextResponse.json({ success: true, id: visit.id });
  } catch (err) {
    console.error("Visit API error:", err);
    return NextResponse.json(
      { error: "Failed to register visit" },
      { status: 500 },
    );
  }
}
