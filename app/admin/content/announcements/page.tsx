"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { defaultAnnouncements } from "@/data/defaults";

type AnnouncementsData = typeof defaultAnnouncements;
type Announcement = AnnouncementsData["items"][number];

export default function EditAnnouncements() {
  const [data, setData] = useState<AnnouncementsData>(defaultAnnouncements);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content/announcements")
      .then((r) => r.json())
      .then((res) => { if (res.value) setData(res.value); })
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    await fetch("/api/admin/content/announcements", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: data }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateItem = (index: number, field: keyof Announcement, value: string) => {
    const items = [...data.items];
    items[index] = { ...items[index], [field]: value };
    setData({ ...data, items });
  };

  const addItem = () => {
    setData({
      ...data,
      items: [
        { id: Date.now().toString(), title: "", date: "", type: "info", body: "" },
        ...data.items,
      ],
    });
  };

  const removeItem = (index: number) => {
    setData({ ...data, items: data.items.filter((_, i) => i !== index) });
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-serif text-2xl font-bold text-primary">
          Edit Announcements
        </h1>
        <Button variant="accent" onClick={addItem}>
          + New Announcement
        </Button>
      </div>

      <div className="max-w-2xl space-y-4">
        {data.items.map((item, i) => (
          <Card key={item.id} className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                Announcement {i + 1}
              </span>
              <button
                onClick={() => removeItem(i)}
                className="text-xs text-destructive hover:underline"
              >
                Remove
              </button>
            </div>
            <div className="space-y-2">
              <input
                placeholder="Title"
                value={item.title}
                onChange={(e) => updateItem(i, "title", e.target.value)}
                className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  placeholder="Date (e.g. March 1, 2026)"
                  value={item.date}
                  onChange={(e) => updateItem(i, "date", e.target.value)}
                  className="rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none"
                />
                <select
                  value={item.type}
                  onChange={(e) => updateItem(i, "type", e.target.value)}
                  className="rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none"
                >
                  <option value="important">Important</option>
                  <option value="event">Upcoming Event</option>
                  <option value="info">Information</option>
                </select>
              </div>
              <textarea
                placeholder="Announcement body..."
                rows={3}
                value={item.body}
                onChange={(e) => updateItem(i, "body", e.target.value)}
                className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
          </Card>
        ))}

        <div className="flex items-center gap-3">
          <Button variant="accent" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save All"}
          </Button>
          {saved && <span className="text-sm text-green-600">Saved!</span>}
        </div>
      </div>
    </div>
  );
}
