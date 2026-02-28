"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { FiPlus, FiTrash2 } from "react-icons/fi";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  slug: string;
  imageUrl?: string;
  registrationUrl?: string;
}

export default function EditEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content/events")
      .then((r) => r.json())
      .then((res) => { if (res.value?.events) setEvents(res.value.events); })
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    await fetch("/api/admin/content/events", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: { events } }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateEvent = (index: number, field: keyof Event, value: string) => {
    const updated = [...events];
    updated[index] = { ...updated[index], [field]: value };
    setEvents(updated);
  };

  const addEvent = () => {
    const id = String(Date.now());
    setEvents([
      ...events,
      {
        id,
        title: "",
        date: new Date().toISOString().split("T")[0],
        time: "",
        location: "Goshen Cathedral, 441 Rubidge St, Peterborough",
        description: "",
        slug: "",
      },
    ]);
  };

  const removeEvent = (index: number) => {
    if (confirm("Remove this event?")) {
      setEvents(events.filter((_, i) => i !== index));
    }
  };

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-serif text-2xl font-bold text-primary">Edit Events</h1>
        <button
          onClick={addEvent}
          className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-light"
        >
          <FiPlus size={14} /> Add Event
        </button>
      </div>

      <div className="space-y-6">
        {events.map((event, i) => (
          <Card key={event.id} className="max-w-2xl space-y-4 p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-foreground">{event.title || "New Event"}</h2>
              <button onClick={() => removeEvent(i)} className="text-sm text-destructive hover:underline flex items-center gap-1">
                <FiTrash2 size={14} /> Remove
              </button>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Event Title</label>
              <input
                value={event.title}
                onChange={(e) => {
                  updateEvent(i, "title", e.target.value);
                  if (!event.slug || event.slug === generateSlug(event.title)) {
                    updateEvent(i, "slug", generateSlug(e.target.value));
                  }
                }}
                className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">Date</label>
                <input
                  type="date"
                  value={event.date}
                  onChange={(e) => updateEvent(i, "date", e.target.value)}
                  className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Time</label>
                <input
                  value={event.time}
                  onChange={(e) => updateEvent(i, "time", e.target.value)}
                  placeholder="e.g. 10:00 AM - 1:00 PM"
                  className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Location</label>
              <input
                value={event.location}
                onChange={(e) => updateEvent(i, "location", e.target.value)}
                className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Image URL (paste from Media Library)</label>
              <input
                value={event.imageUrl || ""}
                onChange={(e) => updateEvent(i, "imageUrl", e.target.value)}
                placeholder="https://... (copy URL from Media Library)"
                className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Registration URL (Google Form, Eventbrite, etc.)</label>
              <input
                value={event.registrationUrl || ""}
                onChange={(e) => updateEvent(i, "registrationUrl", e.target.value)}
                placeholder="https://forms.gle/... or leave blank for no registration"
                className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <p className="mt-1 text-xs text-muted">Paste a Google Form or registration link. A &quot;Register&quot; button will appear on the event page.</p>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Description</label>
              <textarea
                rows={4}
                value={event.description}
                onChange={(e) => updateEvent(i, "description", e.target.value)}
                className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
          </Card>
        ))}

        {events.length === 0 && (
          <p className="text-sm text-muted">No events yet. Click &quot;Add Event&quot; to create one.</p>
        )}
      </div>

      <div className="mt-6 flex items-center gap-3">
        <Button variant="accent" onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save All Events"}
        </Button>
        {saved && <span className="text-sm text-green-600">Saved!</span>}
      </div>
    </div>
  );
}
