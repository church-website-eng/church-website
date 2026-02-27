import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testimonies",
  description:
    "Read and share testimonies of God's faithfulness at Celestial Church of Christ, Goshen Cathedral.",
};

export default function TestimoniesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
