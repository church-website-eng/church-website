import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hymnal",
  description:
    "CCC hymns and spiritual songs. Browse the Celestial Church of Christ hymnal.",
};

export default function HymnalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
