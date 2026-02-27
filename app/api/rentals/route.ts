import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendNotification } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, hall, date, startTime, endTime, guests, eventType, message } = body;

    if (!name || !email || !hall || !date) {
      return NextResponse.json({ error: "Name, email, hall, and date are required." }, { status: 400 });
    }

    await prisma.contactSubmission.create({
      data: {
        name,
        email,
        message: `HALL RENTAL INQUIRY\n\nSpace: ${hall}\nDate: ${date}\nTime: ${startTime || "TBD"} – ${endTime || "TBD"}\nGuests: ${guests || "TBD"}\nEvent Type: ${eventType || "Not specified"}\nPhone: ${phone || "Not provided"}\n\nAdditional Details:\n${message || "None"}`,
      },
    });

    await sendNotification(
      `Hall Rental Inquiry — ${hall}`,
      `<h2>New Hall Rental Inquiry</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
      <p><strong>Space:</strong> ${hall}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${startTime || "TBD"} – ${endTime || "TBD"}</p>
      <p><strong>Expected Guests:</strong> ${guests || "TBD"}</p>
      <p><strong>Event Type:</strong> ${eventType || "Not specified"}</p>
      <p><strong>Additional Details:</strong> ${message || "None"}</p>`,
    );

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
