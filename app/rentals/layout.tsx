import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Facility Rentals",
  description:
    "Rent our facilities at Goshen Cathedral, Peterborough. Affordable, accessible spaces for weddings, receptions, meetings, and community events.",
};

export default function RentalsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
