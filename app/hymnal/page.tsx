"use client";

import { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import { FiSearch, FiMusic, FiChevronDown, FiChevronUp } from "react-icons/fi";

interface Hymn {
  number: number;
  yoruba: string;
  english: string;
  solfa?: string;
}

export default function HymnalPage() {
  const [hymns, setHymns] = useState<Hymn[]>([]);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const perPage = 50;

  useEffect(() => {
    fetch("/data/hymns.json")
      .then((r) => r.json())
      .then((data) => setHymns(data))
      .catch(() => {});
  }, []);

  const filtered = hymns.filter((h) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      String(h.number).includes(q) ||
      h.yoruba.toLowerCase().includes(q) ||
      h.english.toLowerCase().includes(q)
    );
  });

  const totalPages = Math.ceil(filtered.length / perPage);
  const displayed = filtered.slice(0, page * perPage);

  const toggle = (num: number) => {
    setExpanded(expanded === num ? null : num);
  };

  // Extract first line for display
  const firstLine = (text: string) => {
    const lines = text.split("\n").filter((l) => l.trim());
    // Skip verse numbers like "1:" at the start
    for (const line of lines) {
      const cleaned = line.replace(/^\d+:\s*/, "").trim();
      if (cleaned && !cleaned.match(/^[drmfslt;:\s\-\[\]{}()\d]+$/)) {
        return cleaned;
      }
    }
    return lines[0]?.trim() || "";
  };

  return (
    <>
      <section className="bg-primary py-20 text-center text-white">
        <h1 className="font-serif text-4xl font-bold md:text-5xl">
          CCC Hymnal
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/70">
          Celestial hymns and spiritual songs — {hymns.length} hymns
        </p>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <FiSearch
                className="absolute left-3 top-3 text-muted"
                size={16}
              />
              <input
                type="text"
                placeholder="Search by hymn number, Yoruba or English lyrics..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full rounded-lg border border-border bg-white py-2.5 pl-10 pr-4 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
          </div>

          {/* Hymn list */}
          <div className="space-y-2">
            {displayed.map((hymn) => {
              const isOpen = expanded === hymn.number;
              const englishPreview = firstLine(hymn.english);
              const yorubaPreview = firstLine(hymn.yoruba);

              return (
                <Card key={hymn.number} className="overflow-hidden">
                  <button
                    onClick={() => toggle(hymn.number)}
                    className="flex w-full items-center gap-4 px-4 py-3 text-left transition-colors hover:bg-muted/30"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
                      {hymn.number}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-primary truncate">
                        {englishPreview || yorubaPreview || `Hymn ${hymn.number}`}
                      </h3>
                      {yorubaPreview && englishPreview && (
                        <p className="text-sm text-muted truncate">
                          {yorubaPreview}
                        </p>
                      )}
                    </div>
                    <FiMusic className="hidden sm:block text-muted flex-shrink-0" size={16} />
                    {isOpen ? (
                      <FiChevronUp className="text-muted flex-shrink-0" size={18} />
                    ) : (
                      <FiChevronDown className="text-muted flex-shrink-0" size={18} />
                    )}
                  </button>

                  {isOpen && (
                    <div className="border-t border-border px-4 py-4">
                      <div className="grid gap-6 md:grid-cols-2">
                        {hymn.english && (
                          <div>
                            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-accent">
                              English
                            </h4>
                            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground/80">
                              {hymn.english}
                            </pre>
                          </div>
                        )}
                        {hymn.yoruba && (
                          <div>
                            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-accent">
                              Yoruba
                            </h4>
                            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground/80">
                              {hymn.yoruba}
                            </pre>
                          </div>
                        )}
                      </div>
                      {hymn.solfa && (
                        <div className="mt-4 rounded-lg bg-muted/20 p-3">
                          <h4 className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted">
                            Tonic Solfa
                          </h4>
                          <pre className="whitespace-pre-wrap font-mono text-xs text-foreground/60">
                            {hymn.solfa}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                </Card>
              );
            })}
            {filtered.length === 0 && (
              <p className="py-8 text-center text-muted">
                No hymns found matching your search.
              </p>
            )}
          </div>

          {/* Load more */}
          {page * perPage < filtered.length && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setPage(page + 1)}
                className="rounded-lg bg-accent px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-accent/90"
              >
                Load More ({filtered.length - displayed.length} remaining)
              </button>
            </div>
          )}

          <p className="mt-8 text-center text-sm text-muted">
            Showing {displayed.length} of {filtered.length} hymns
            {search && ` (filtered from ${hymns.length} total)`}
          </p>
        </div>
      </section>
    </>
  );
}
