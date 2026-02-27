import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json();
  const { amount, frequency, fund, provider, email } = body;

  if (!amount || amount < 1) {
    return NextResponse.json(
      { error: "Invalid amount" },
      { status: 400 },
    );
  }

  if (provider === "stripe") {
    try {
      const params: Record<string, unknown> = {
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "cad",
              product_data: {
                name: `Donation — ${fund || "General Fund"}`,
                description:
                  frequency !== "one-time"
                    ? `${frequency} recurring donation`
                    : "One-time donation",
              },
              unit_amount: Math.round(amount * 100),
              ...(frequency !== "one-time" && {
                recurring: {
                  interval: frequency === "weekly" ? "week" : "month",
                },
              }),
            },
            quantity: 1,
          },
        ],
        mode: frequency === "one-time" ? "payment" : "subscription",
        success_url: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/give?success=true`,
        cancel_url: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/give?canceled=true`,
        metadata: { fund, frequency },
      };

      const s = getStripe();
      const session = await s.checkout.sessions.create(
        params as Parameters<typeof s.checkout.sessions.create>[0],
      );

      await prisma.donation.create({
        data: {
          email: email || null,
          amount,
          fund: fund || "General Fund",
          frequency: frequency || "one-time",
          stripeSessionId: session.id,
          status: "pending",
        },
      });

      return NextResponse.json({ url: session.url });
    } catch (err) {
      console.error("Stripe error:", err);
      return NextResponse.json(
        { error: "Payment processing failed" },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ error: "Unknown provider" }, { status: 400 });
}
