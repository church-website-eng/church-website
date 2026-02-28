"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { FiPlus, FiTrash2 } from "react-icons/fi";

interface Sermon {
  id: string;
  title: string;
  speaker: string;
  date: string;
  series?: string;
  slug: string;
  videoUrl?: string;
  audioUrl?: string;
  notes?: string;
  pdfUrl?: string;
}

const defaultSermons: Sermon[] = [
  { id: "1", title: "Sermon by the Shepherd", speaker: "VSE Kunle Lawal", date: "2026-02-26", slug: "sermon-by-the-shepherd", videoUrl: "/videos/sermon-shepherd.mp4" },
  { id: "2", title: "The Power of Prayer and Fasting", speaker: "VSE Kunle Lawal", date: "2026-02-15", series: "Spiritual Warfare", slug: "power-of-prayer-fasting" },
  { id: "3", title: "Living by Faith, Not by Sight", speaker: "Senior Evangelist", date: "2026-02-08", slug: "living-by-faith" },
];

export default function EditSermons() {
  const [sermons, setSermons] = useState<Sermon[]>(defaultSermons);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content/sermons")
      .then((r) => r.json())
      .then((res) => { if (res.value?.sermons) setSermons(res.value.sermons); })
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    await fetch("/api/admin/content/sermons", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: { sermons } }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateSermon = (index: number, field: keyof Sermon, value: string) => {
    const updated = [...sermons];
    updated[index] = { ...updated[index], [field]: value };
    setSermons(updated);
  };

  const addSermon = () => {
    const id = String(Date.now());
    setSermons([
      {
        id,
        title: "",
        speaker: "VSE Kunle Lawal",
        date: new Date().toISOString().split("T")[0],
        slug: "",
        videoUrl: "",
      },
      ...sermons,
    ]);
  };

  const removeSermon = (index: number) => {
    if (confirm("Remove this sermon?")) {
      setSermons(sermons.filter((_, i) => i !== index));
    }
  };

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-serif text-2xl font-bold text-primary">
          Edit Sermons
        </h1>
        <button
          onClick={addSermon}
          className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-light"
        >
          <FiPlus size={14} /> Add Sermon
        </button>
      </div>

      <div className="space-y-6">
        {sermons.map((sermon, i) => (
          <Card key={sermon.id} className="max-w-2xl space-y-4 p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-foreground">
                {sermon.title || "New Sermon"}
              </h2>
              <button onClick={() => removeSermon(i)} className="text-sm text-destructive hover:underline flex items-center gap-1">
                <FiTrash2 size={14} /> Remove
              </button>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Title</label>
              <input
                value={sermon.title}
                onChange={(e) => {
                  updateSermon(i, "title", e.target.value);
                  if (!sermon.slug || sermon.slug === generateSlug(sermon.title)) {
                    updateSermon(i, "slug", generateSlug(e.target.value));
                  }
                }}
                className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">Speaker</label>
                <input
                  value={sermon.speaker}
                  onChange={(e) => updateSermon(i, "speaker", e.target.value)}
                  className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Date</label>
                <input
                  type="date"
                  value={sermon.date}
                  onChange={(e) => updateSermon(i, "date", e.target.value)}
                  className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">Series (optional)</label>
                <input
                  value={sermon.series || ""}
                  onChange={(e) => updateSermon(i, "series", e.target.value)}
                  placeholder="e.g. Spiritual Warfare"
                  className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Slug</label>
                <input
                  value={sermon.slug}
                  onChange={(e) => updateSermon(i, "slug", e.target.value)}
                  className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Video URL (YouTube link or uploaded video)</label>
              <input
                value={sermon.videoUrl || ""}
                onChange={(e) => updateSermon(i, "videoUrl", e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Sermon Notes (optional)</label>
              <textarea
                rows={3}
                value={sermon.notes || ""}
                onChange={(e) => updateSermon(i, "notes", e.target.value)}
                className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3">
        <Button variant="accent" onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save All Sermons"}
        </Button>
        {saved && <span className="text-sm text-green-600">Saved!</span>}
      </div>
    </div>
  );
}
