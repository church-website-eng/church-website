"use client";

import Link from "next/link";
import Card from "@/components/ui/Card";

const editors = [
  { href: "/admin/content/church-info", label: "Church Info", description: "Church name, address, phone, email, social media links" },
  { href: "/admin/content/service-times", label: "Service Times", description: "Weekly service schedule and worship aspects" },
  { href: "/admin/content/stats", label: "Homepage Stats", description: "Counters shown on the homepage (members, years, etc.)" },
  { href: "/admin/content/announcements", label: "Announcements", description: "Parish bulletins and announcements" },
  { href: "/admin/content/about", label: "About Page", description: "Church history, beliefs, and leadership" },
  { href: "/admin/content/ministries", label: "Ministries", description: "Ministry names, descriptions, and leaders" },
  { href: "/admin/content/sermons", label: "Sermons", description: "Sermon titles, speakers, videos, and notes" },
  { href: "/admin/content/rentals", label: "Hall Rentals", description: "Rental halls, capacity, rates, and amenities" },
  { href: "/admin/content/blog", label: "Blog Posts", description: "Blog articles, authors, and categories" },
  { href: "/admin/content/events", label: "Events", description: "Upcoming events, dates, times, and locations" },
  { href: "/admin/content/hymnal", label: "Hymnal", description: "CCC hymns — English, Yoruba, and tonic solfa" },
  { href: "/admin/content/live", label: "Live Stream", description: "YouTube & Facebook live stream settings" },
];

export default function ContentOverview() {
  return (
    <div>
      <h1 className="mb-2 font-serif text-2xl font-bold text-primary">
        Edit Site Content
      </h1>
      <p className="mb-6 text-muted">
        Choose a section below to edit your website content.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {editors.map((e) => (
          <Link key={e.href} href={e.href}>
            <Card className="p-5 transition-shadow hover:shadow-md">
              <h3 className="font-semibold text-primary">{e.label}</h3>
              <p className="mt-1 text-sm text-muted">{e.description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
