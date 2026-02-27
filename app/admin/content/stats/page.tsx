"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { defaultStats } from "@/data/defaults";

type StatsData = typeof defaultStats;

export default function EditStats() {
  const [data, setData] = useState<StatsData>(defaultStats);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content/stats")
      .then((r) => r.json())
      .then((res) => { if (res.value) setData(res.value); })
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    await fetch("/api/admin/content/stats", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: data }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateItem = (index: number, field: string, value: string | number) => {
    const items = [...data.items];
    items[index] = { ...items[index], [field]: value };
    setData({ ...data, items });
  };

  const addItem = () => {
    setData({ ...data, items: [...data.items, { label: "", value: 0, suffix: "" }] });
  };

  const removeItem = (index: number) => {
    setData({ ...data, items: data.items.filter((_, i) => i !== index) });
  };

  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl font-bold text-primary">
        Edit Homepage Stats
      </h1>
      <div className="max-w-2xl space-y-4">
        {data.items.map((item, i) => (
          <Card key={i} className="p-4">
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">Stat {i + 1}</label>
              <button
                onClick={() => removeItem(i)}
                className="text-xs text-destructive hover:underline"
              >
                Remove
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="mb-1 block text-xs text-muted">Label</label>
                <input
                  value={item.label}
                  onChange={(e) => updateItem(i, "label", e.target.value)}
                  className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-accent focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-muted">Value</label>
                <input
                  type="number"
                  value={item.value}
                  onChange={(e) => updateItem(i, "value", parseInt(e.target.value) || 0)}
                  className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-accent focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs text-muted">Suffix</label>
                <input
                  value={item.suffix}
                  placeholder="e.g. +"
                  onChange={(e) => updateItem(i, "suffix", e.target.value)}
                  className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-accent focus:outline-none"
                />
              </div>
            </div>
          </Card>
        ))}

        <Button variant="outline" onClick={addItem}>
          + Add Stat
        </Button>

        <div className="flex items-center gap-3">
          <Button variant="accent" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
          {saved && <span className="text-sm text-green-600">Saved!</span>}
        </div>
      </div>
    </div>
  );
}
