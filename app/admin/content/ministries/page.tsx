"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { defaultMinistries } from "@/data/defaults";

type MinistriesData = typeof defaultMinistries;
type Ministry = MinistriesData["items"][number];

const iconOptions = [
  { value: "shield", label: "Shield" },
  { value: "heart", label: "Heart" },
  { value: "star", label: "Star" },
  { value: "book", label: "Book" },
  { value: "music", label: "Music" },
  { value: "users", label: "Users" },
];

export default function EditMinistries() {
  const [data, setData] = useState<MinistriesData>(defaultMinistries);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content/ministries")
      .then((r) => r.json())
      .then((res) => { if (res.value) setData(res.value); })
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    await fetch("/api/admin/content/ministries", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: data }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateItem = (index: number, field: keyof Ministry, value: string) => {
    const items = [...data.items];
    items[index] = { ...items[index], [field]: value };
    setData({ ...data, items });
  };

  const addItem = () => {
    setData({
      ...data,
      items: [...data.items, { name: "", description: "", leader: "", icon: "heart" }],
    });
  };

  const removeItem = (index: number) => {
    setData({ ...data, items: data.items.filter((_, i) => i !== index) });
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-serif text-2xl font-bold text-primary">
          Edit Ministries
        </h1>
        <Button variant="accent" onClick={addItem}>
          + Add Ministry
        </Button>
      </div>

      <div className="max-w-2xl space-y-4">
        {data.items.map((item, i) => (
          <Card key={i} className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                Ministry {i + 1}
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
                placeholder="Ministry Name"
                value={item.name}
                onChange={(e) => updateItem(i, "name", e.target.value)}
                className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  placeholder="Leader"
                  value={item.leader}
                  onChange={(e) => updateItem(i, "leader", e.target.value)}
                  className="rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none"
                />
                <select
                  value={item.icon}
                  onChange={(e) => updateItem(i, "icon", e.target.value)}
                  className="rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none"
                >
                  {iconOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <textarea
                placeholder="Description"
                rows={2}
                value={item.description}
                onChange={(e) => updateItem(i, "description", e.target.value)}
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
