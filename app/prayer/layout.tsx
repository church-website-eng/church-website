import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prayer Requests",
  description:
    "Submit a prayer request to Celestial Church of Christ, Goshen Cathedral. Our prayer warriors intercede for you.",
};

export default function PrayerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
