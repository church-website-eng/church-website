"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { FiPlus, FiTrash2 } from "react-icons/fi";

interface Hall {
  name: string;
  capacity: number;
  rate: string;
  description: string;
  amenities: string[];
}

const defaultHalls: Hall[] = [
  {
    name: "Main Hall",
    capacity: 200,
    rate: "$75/hr or $500/day",
    description: "A spacious, elegant hall ideal for weddings, receptions, banquets, community events, and large gatherings.",
    amenities: ["Stage area with podium", "Sound system & microphone", "Tables & chairs (up to 200 guests)", "Kitchen access", "Wheelchair accessible", "Free parking", "Air conditioning & heating"],
  },
  {
    name: "Meeting Room",
    capacity: 40,
    rate: "$40/hr or $250/day",
    description: "A comfortable, well-lit meeting room perfect for workshops, Bible studies, small group meetings, and presentations.",
    amenities: ["Tables & chairs (up to 40 guests)", "Whiteboard & projector screen", "Wi-Fi access", "Kitchenette nearby", "Wheelchair accessible", "Free parking", "Air conditioning & heating"],
  },
];

export default function EditRentals() {
  const [halls, setHalls] = useState<Hall[]>(defaultHalls);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content/rentals")
      .then((r) => r.json())
      .then((res) => { if (res.value?.halls) setHalls(res.value.halls); })
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    await fetch("/api/admin/content/rentals", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: { halls } }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateHall = (index: number, field: keyof Hall, value: string | number | string[]) => {
    const updated = [...halls];
    updated[index] = { ...updated[index], [field]: value };
    setHalls(updated);
  };

  const addHall = () => {
    setHalls([...halls, { name: "", capacity: 0, rate: "", description: "", amenities: [] }]);
  };

  const removeHall = (index: number) => {
    if (confirm("Remove this facility?")) {
      setHalls(halls.filter((_, i) => i !== index));
    }
  };

  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl font-bold text-primary">
        Edit Facility Rentals
      </h1>

      <div className="space-y-6">
        {halls.map((hall, i) => (
          <Card key={i} className="max-w-2xl space-y-4 p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-foreground">Facility #{i + 1}</h2>
              <button onClick={() => removeHall(i)} className="text-sm text-destructive hover:underline flex items-center gap-1">
                <FiTrash2 size={14} /> Remove
              </button>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Facility Name</label>
              <input
                value={hall.name}
                onChange={(e) => updateHall(i, "name", e.target.value)}
                className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">Capacity</label>
                <input
                  type="number"
                  value={hall.capacity}
                  onChange={(e) => updateHall(i, "capacity", parseInt(e.target.value) || 0)}
                  className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Rate</label>
                <input
                  value={hall.rate}
                  onChange={(e) => updateHall(i, "rate", e.target.value)}
                  placeholder="e.g. $75/hr or $500/day"
                  className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Description</label>
              <textarea
                rows={3}
                value={hall.description}
                onChange={(e) => updateHall(i, "description", e.target.value)}
                className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Amenities (one per line)</label>
              <textarea
                rows={5}
                value={hall.amenities.join("\n")}
                onChange={(e) => updateHall(i, "amenities", e.target.value.split("\n"))}
                className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
          </Card>
        ))}
      </div>

      <button
        onClick={addHall}
        className="mt-4 flex items-center gap-2 rounded-lg border border-dashed border-border px-4 py-2 text-sm text-muted transition hover:border-accent hover:text-accent"
      >
        <FiPlus size={14} /> Add Another Facility
      </button>

      <div className="mt-6 flex items-center gap-3">
        <Button variant="accent" onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
        {saved && <span className="text-sm text-green-600">Saved!</span>}
      </div>
    </div>
  );
}
