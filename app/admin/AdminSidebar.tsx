"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const submissionLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/contacts", label: "Contacts" },
  { href: "/admin/prayers", label: "Prayer Requests" },
  { href: "/admin/visitors", label: "Visitors" },
  { href: "/admin/sacraments", label: "Sacraments" },
  { href: "/admin/members", label: "Members" },
  { href: "/admin/newsletter", label: "Newsletter" },
  { href: "/admin/testimonies", label: "Testimonies" },
];

const contentLinks = [
  { href: "/admin/content", label: "Overview" },
  { href: "/admin/content/church-info", label: "Church Info" },
  { href: "/admin/content/service-times", label: "Service Times" },
  { href: "/admin/content/stats", label: "Homepage Stats" },
  { href: "/admin/content/announcements", label: "Announcements" },
  { href: "/admin/content/about", label: "About Page" },
  { href: "/admin/content/ministries", label: "Ministries" },
  { href: "/admin/content/sermons", label: "Sermons" },
  { href: "/admin/content/rentals", label: "Facility Rentals" },
  { href: "/admin/content/blog", label: "Blog Posts" },
  { href: "/admin/content/events", label: "Events" },
  { href: "/admin/content/hymnal", label: "Hymnal" },
  { href: "/admin/content/live", label: "Live Stream" },
  { href: "/admin/content/gallery", label: "Gallery" },
  { href: "/admin/content/character", label: "Character of Week" },
  { href: "/admin/content/give", label: "Give / Donate" },
  { href: "/admin/content/careers", label: "Careers & Volunteering" },
  { href: "/admin/content/shepherd", label: "Shepherd's Corner" },
  { href: "/admin/content/theme", label: "Theme & Appearance" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const renderLink = (link: { href: string; label: string }) => {
    const isActive =
      link.href === "/admin"
        ? pathname === "/admin"
        : pathname.startsWith(link.href);
    return (
      <Link
        key={link.href}
        href={link.href}
        className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
          isActive
            ? "bg-accent/10 font-medium text-accent"
            : "text-foreground/70 hover:bg-muted/50 hover:text-foreground"
        }`}
      >
        {link.label}
      </Link>
    );
  };

  return (
    <aside className="hidden w-56 shrink-0 border-r border-border bg-card md:block">
      <div className="p-4">
        <h2 className="mb-4 font-serif text-lg font-bold text-primary">
          Admin Panel
        </h2>
        <nav className="space-y-1">
          {submissionLinks.map(renderLink)}
        </nav>

        <h3 className="mb-2 mt-6 text-xs font-bold uppercase tracking-wider text-muted">
          Media
        </h3>
        <nav className="space-y-1">
          {renderLink({ href: "/admin/media", label: "Media Library" })}
        </nav>

        <h3 className="mb-2 mt-6 text-xs font-bold uppercase tracking-wider text-muted">
          Site Content
        </h3>
        <nav className="space-y-1">
          {contentLinks.map(renderLink)}
        </nav>
      </div>
    </aside>
  );
}
