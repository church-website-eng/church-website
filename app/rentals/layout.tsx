import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hall Rentals",
  description:
    "Rent our main hall or meeting room at Goshen Cathedral, Peterborough. Affordable, accessible spaces for weddings, receptions, meetings, and community events.",
};

export default function RentalsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
