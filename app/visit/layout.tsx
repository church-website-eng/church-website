import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plan Your Visit",
  description:
    "Plan your first visit to Celestial Church of Christ, Goshen Cathedral, Peterborough. Sunday service 10:00 AM — 1:00 PM.",
};

export default function VisitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
