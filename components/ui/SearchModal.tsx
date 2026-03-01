"use client";

import { useState, useEffect, useRef } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import Link from "next/link";

interface SearchResult {
  title: string;
  href: string;
  type: "Hymn" | "Sermon" | "Blog" | "Page";
  snippet?: string;
}

const sitePages: SearchResult[] = [
  { title: "Home", href: "/", type: "Page" },
  { title: "About Us", href: "/about", type: "Page" },
  { title: "Sermons", href: "/sermons", type: "Page" },
  { title: "Live Stream", href: "/live", type: "Page" },
  { title: "Hymnal", href: "/hymnal", type: "Page" },
  { title: "Prayer Request", href: "/prayer", type: "Page" },
  { title: "Events", href: "/events", type: "Page" },
  { title: "Ministries", href: "/ministries", type: "Page" },
  { title: "Testimonies", href: "/testimonies", type: "Page" },
  { title: "Blog", href: "/blog", type: "Page" },
  { title: "Gallery", href: "/gallery", type: "Page" },
  { title: "Careers & Volunteering", href: "/careers", type: "Page" },
  { title: "Shepherd's Corner", href: "/shepherd", type: "Page" },
  { title: "Facility Rentals", href: "/rentals", type: "Page" },
  { title: "Announcements & Calendar", href: "/announcements", type: "Page" },
  { title: "Contact", href: "/contact", type: "Page" },
  { title: "Give / Donate", href: "/give", type: "Page" },
  { title: "Plan Your Visit", href: "/visit", type: "Page" },
  { title: "Sacraments", href: "/sacraments", type: "Page" },
  { title: "Members Portal", href: "/portal", type: "Page" },
  { title: "Privacy Policy", href: "/privacy", type: "Page" },
];

export default function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut: Ctrl+K or Cmd+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  // Search logic
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase();
    const matched: SearchResult[] = [];

    // Search site pages
    for (const page of sitePages) {
      if (page.title.toLowerCase().includes(q)) {
        matched.push(page);
      }
    }

    // Search hymns from the API
    const searchHymns = async () => {
      try {
        const res = await fetch(`/api/hymns/search?q=${encodeURIComponent(q)}`);
        if (res.ok) {
          const hymns = await res.json();
          for (const h of hymns.slice(0, 5)) {
            matched.push({
              title: `#${h.number} — ${h.title}`,
              href: `/hymnal?search=${h.number}`,
              type: "Hymn",
              snippet: h.firstLine,
            });
          }
        }
      } catch {
        // Ignore search errors
      }
      setResults([...matched].slice(0, 10));
    };

    // Debounce hymn search
    const timer = setTimeout(searchHymns, 200);
    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1.5 rounded-lg border border-border bg-muted-light/50 px-3 py-1.5 text-sm text-muted transition hover:border-primary/30 hover:text-foreground"
        aria-label="Search"
      >
        <FiSearch size={14} />
        <span className="hidden xl:inline">Search</span>
        <kbd className="hidden rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium xl:inline">
          Ctrl K
        </kbd>
      </button>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal */}
      <div className="fixed inset-x-4 top-[15%] z-[101] mx-auto max-w-lg rounded-xl border border-border bg-card shadow-2xl">
        {/* Search input */}
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <FiSearch size={18} className="text-muted" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, hymns, sermons..."
            className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="text-muted transition hover:text-foreground"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[50vh] overflow-y-auto p-2">
          {query && results.length === 0 && (
            <p className="p-4 text-center text-sm text-muted">
              No results for &ldquo;{query}&rdquo;
            </p>
          )}
          {results.map((r, i) => (
            <Link
              key={i}
              href={r.href}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition hover:bg-muted-light"
            >
              <span
                className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${
                  r.type === "Hymn"
                    ? "bg-gold/20 text-gold"
                    : r.type === "Sermon"
                      ? "bg-accent/20 text-accent"
                      : r.type === "Blog"
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted"
                }`}
              >
                {r.type}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-foreground">
                  {r.title}
                </p>
                {r.snippet && (
                  <p className="truncate text-xs text-muted">{r.snippet}</p>
                )}
              </div>
            </Link>
          ))}
          {!query && (
            <p className="p-4 text-center text-sm text-muted">
              Type to search across pages and hymns
            </p>
          )}
        </div>
      </div>
    </>
  );
}
