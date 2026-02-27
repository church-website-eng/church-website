import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as { role?: string }).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [
    unreadContacts,
    totalContacts,
    totalPrayers,
    totalVisitors,
    pendingMembers,
    totalMembers,
    totalSubscribers,
    pendingTestimonies,
    totalSacraments,
  ] = await Promise.all([
    prisma.contactSubmission.count({ where: { read: false } }),
    prisma.contactSubmission.count(),
    prisma.prayerRequest.count(),
    prisma.visitorRegistration.count(),
    prisma.user.count({ where: { approved: false } }),
    prisma.user.count(),
    prisma.newsletterSubscriber.count({ where: { active: true } }),
    prisma.testimony.count({ where: { approved: false } }),
    prisma.sacramentRequest.count(),
  ]);

  return NextResponse.json({
    unreadContacts,
    totalContacts,
    totalPrayers,
    totalVisitors,
    pendingMembers,
    totalMembers,
    totalSubscribers,
    pendingTestimonies,
    totalSacraments,
  });
}
