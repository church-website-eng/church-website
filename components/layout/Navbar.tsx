"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";
import LiveBadge from "./LiveBadge";
import SearchModal from "@/components/ui/SearchModal";

const mainLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Worship",
    children: [
      { label: "Sermons", href: "/sermons" },
      { label: "Live Stream", href: "/live" },
      { label: "Hymnal", href: "/hymnal" },
      { label: "Prayer Request", href: "/prayer" },
    ],
  },
  {
    label: "Community",
    children: [
      { label: "Events", href: "/events" },
      { label: "Ministries", href: "/ministries" },
      { label: "Testimonies", href: "/testimonies" },
      { label: "Blog", href: "/blog" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  { label: "Shepherd's Corner", href: "/shepherd" },
  { label: "Facility Rentals", href: "/rentals" },
  { label: "Announcements", href: "/announcements" },
  { label: "Contact", href: "/contact" },
];

const mobileLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Sermons", href: "/sermons" },
  { label: "Live Stream", href: "/live" },
  { label: "Events", href: "/events" },
  { label: "Ministries", href: "/ministries" },
  { label: "Testimonies", href: "/testimonies" },
  { label: "Hymnal", href: "/hymnal" },
  { label: "Prayer Request", href: "/prayer" },
  { label: "Announcements", href: "/announcements" },
  { label: "Blog", href: "/blog" },
  { label: "Gallery", href: "/gallery" },
  { label: "Shepherd's Corner", href: "/shepherd" },
  { label: "Facility Rentals", href: "/rentals" },
  { label: "Sacraments", href: "/sacraments" },
  { label: "Plan Your Visit", href: "/visit" },
  { label: "Contact", href: "/contact" },
  { label: "Members Portal", href: "/portal" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [logoUrl, setLogoUrl] = useState("/images/logo.jpeg");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    fetch("/api/content/church_info")
      .then((r) => r.json())
      .then((res) => { if (res.value?.logoUrl) setLogoUrl(res.value.logoUrl); })
      .catch(() => {});
  }, []);

  return (
    <header className={`sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur transition-shadow duration-300 ${scrolled ? "shadow-md" : ""}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <img
            src={logoUrl}
            alt="CCC Logo"
            width={46}
            height={46}
            className="rounded-full"
          />
          <div className="hidden sm:block">
            <span className="block font-serif text-sm font-bold text-primary leading-tight">
              Celestial Church of Christ
            </span>
            <span className="block text-xs text-accent font-semibold">
              Goshen Cathedral
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-4 lg:flex">
          {mainLinks.map((link) =>
            link.children ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setDropdown(link.label)}
                onMouseLeave={() => setDropdown(null)}
              >
                <button className="flex items-center gap-1 text-sm font-medium text-foreground/70 transition hover:text-primary">
                  {link.label}
                  <FiChevronDown size={14} />
                </button>
                {dropdown === link.label && (
                  <div className="absolute left-0 top-full z-50 mt-1 w-48 rounded-lg border border-border bg-card py-2 shadow-lg">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-foreground/70 transition hover:bg-muted-light hover:text-primary"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href!}
                className="text-sm font-medium text-foreground/70 transition hover:text-primary"
              >
                {link.label}
              </Link>
            ),
          )}
          <Link
            href="/portal"
            className="text-sm font-medium text-foreground/70 transition hover:text-primary"
          >
            Members
          </Link>
          <LiveBadge />
          <SearchModal />
          <ThemeToggle />
          <Link
            href="/give"
            className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white transition hover:bg-accent-light"
          >
            Give
          </Link>
        </div>

        {/* Mobile toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            className="text-foreground"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="max-h-[70vh] overflow-y-auto border-t border-border bg-card px-4 pb-4 lg:hidden">
          {mobileLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2 text-sm font-medium text-foreground/70 transition hover:text-primary"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/give"
            className="mt-2 block rounded-full bg-accent px-5 py-2 text-center text-sm font-semibold text-white"
            onClick={() => setOpen(false)}
          >
            Give
          </Link>
        </div>
      )}
    </header>
  );
}
