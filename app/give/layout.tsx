import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Give Online",
  description:
    "Support the work of God at CCC Goshen Cathedral. Tithe, donate, and give securely online.",
};

export default function GiveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
