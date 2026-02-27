import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calendar",
  description:
    "Church calendar and service schedule at CCC Goshen Cathedral, Peterborough.",
};

export default function CalendarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
