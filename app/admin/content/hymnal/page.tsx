"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { FiPlus, FiTrash2, FiSearch, FiChevronDown, FiChevronUp } from "react-icons/fi";

interface Hymn {
  number: number;
  yoruba: string;
  english: string;
  solfa?: string;
}

export default function EditHymnal() {
  const [hymns, setHymns] = useState<Hymn[]>([]);
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Try DB first, fall back to static JSON
    fetch("/api/admin/content/hymnal")
      .then((r) => r.json())
      .then((res) => {
        if (res.value?.hymns?.length) {
          setHymns(res.value.hymns);
          setLoaded(true);
        } else {
          return fetch("/data/hymns.json")
            .then((r) => r.json())
            .then((data) => {
              setHymns(data);
              setLoaded(true);
            });
        }
      })
      .catch(() => {
        fetch("/data/hymns.json")
          .then((r) => r.json())
          .then((data) => {
            setHymns(data);
            setLoaded(true);
          })
          .catch(() => setLoaded(true));
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    await fetch("/api/admin/content/hymnal", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: { hymns } }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateHymn = (index: number, field: keyof Hymn, value: string | number) => {
    const updated = [...hymns];
    updated[index] = { ...updated[index], [field]: value };
    setHymns(updated);
  };

  const addHymn = () => {
    const maxNum = hymns.reduce((max, h) => Math.max(max, h.number), 0);
    const newHymn: Hymn = {
      number: maxNum + 1,
      yoruba: "",
      english: "",
      solfa: "",
    };
    setHymns([newHymn, ...hymns]);
    setExpanded(newHymn.number);
    setSearch("");
  };

  const removeHymn = (index: number) => {
    if (confirm(`Remove Hymn #${hymns[index].number}?`)) {
      setHymns(hymns.filter((_, i) => i !== index));
    }
  };

  const firstLine = (text: string) => {
    const lines = text.split("\n").filter((l) => l.trim());
    for (const line of lines) {
      const cleaned = line.replace(/^\d+:\s*/, "").trim();
      if (cleaned && !cleaned.match(/^[drmfslt;:\s\-[\]{}()\d]+$/)) {
        return cleaned;
      }
    }
    return lines[0]?.trim() || "";
  };

  const filtered = hymns
    .map((h, originalIndex) => ({ hymn: h, originalIndex }))
    .filter(({ hymn }) => {
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        String(hymn.number).includes(q) ||
        hymn.yoruba.toLowerCase().includes(q) ||
        hymn.english.toLowerCase().includes(q)
      );
    });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-primary">Edit Hymnal</h1>
          <p className="text-sm text-muted">{hymns.length} hymns total</p>
        </div>
        <button
          onClick={addHymn}
          className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-light"
        >
          <FiPlus size={14} /> Add Hymn
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4 max-w-md">
        <FiSearch className="absolute left-3 top-3 text-muted" size={16} />
        <input
          type="text"
          placeholder="Search by number, Yoruba, or English..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-border bg-white py-2.5 pl-10 pr-4 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
      </div>

      {!loaded && <p className="text-sm text-muted">Loading hymns...</p>}

      {/* Hymn list */}
      <div className="space-y-2">
        {filtered.slice(0, 50).map(({ hymn, originalIndex }) => {
          const isOpen = expanded === hymn.number;

          return (
            <Card key={hymn.number} className="overflow-hidden">
              {/* Header row */}
              <button
                onClick={() => setExpanded(isOpen ? null : hymn.number)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/30"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">
                  {hymn.number}
                </span>
                <span className="flex-1 truncate text-sm font-medium text-foreground">
                  {firstLine(hymn.english) || firstLine(hymn.yoruba) || `Hymn ${hymn.number}`}
                </span>
                {isOpen ? <FiChevronUp size={16} className="text-muted" /> : <FiChevronDown size={16} className="text-muted" />}
              </button>

              {/* Expanded editor */}
              {isOpen && (
                <div className="space-y-4 border-t border-border px-4 py-4">
                  <div className="flex items-center justify-between">
                    <div className="w-32">
                      <label className="mb-1 block text-xs font-medium text-muted">Number</label>
                      <input
                        type="number"
                        value={hymn.number}
                        onChange={(e) => updateHymn(originalIndex, "number", parseInt(e.target.value) || 0)}
                        className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                      />
                    </div>
                    <button
                      onClick={() => removeHymn(originalIndex)}
                      className="flex items-center gap-1 text-sm text-destructive hover:underline"
                    >
                      <FiTrash2 size={14} /> Remove
                    </button>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-muted">English Lyrics</label>
                    <textarea
                      rows={6}
                      value={hymn.english}
                      onChange={(e) => updateHymn(originalIndex, "english", e.target.value)}
                      className="w-full rounded-lg border border-border bg-white px-3 py-2 font-mono text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-muted">Yoruba Lyrics</label>
                    <textarea
                      rows={6}
                      value={hymn.yoruba}
                      onChange={(e) => updateHymn(originalIndex, "yoruba", e.target.value)}
                      className="w-full rounded-lg border border-border bg-white px-3 py-2 font-mono text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-muted">Tonic Solfa (optional)</label>
                    <textarea
                      rows={3}
                      value={hymn.solfa || ""}
                      onChange={(e) => updateHymn(originalIndex, "solfa", e.target.value)}
                      className="w-full rounded-lg border border-border bg-white px-3 py-2 font-mono text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {filtered.length > 50 && (
        <p className="mt-4 text-center text-sm text-muted">
          Showing 50 of {filtered.length} hymns. Use search to find a specific hymn.
        </p>
      )}

      {filtered.length === 0 && loaded && (
        <p className="py-8 text-center text-sm text-muted">
          No hymns found matching &ldquo;{search}&rdquo;
        </p>
      )}

      <div className="mt-6 flex items-center gap-3">
        <Button variant="accent" onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save All Hymns"}
        </Button>
        {saved && <span className="text-sm text-green-600">Saved!</span>}
      </div>
    </div>
  );
}
