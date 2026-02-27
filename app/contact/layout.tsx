import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Celestial Church of Christ, Goshen Cathedral. Located at 441 Rubidge Street, Peterborough, ON.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
