"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { defaultAbout } from "@/data/defaults";

type AboutData = typeof defaultAbout;

export default function EditAbout() {
  const [data, setData] = useState<AboutData>(defaultAbout);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content/about")
      .then((r) => r.json())
      .then((res) => { if (res.value) setData(res.value); })
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    await fetch("/api/admin/content/about", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: data }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateBelief = (index: number, field: string, value: string) => {
    const beliefs = [...data.beliefs];
    beliefs[index] = { ...beliefs[index], [field]: value };
    setData({ ...data, beliefs });
  };

  const addBelief = () => {
    setData({ ...data, beliefs: [...data.beliefs, { title: "", description: "" }] });
  };

  const removeBelief = (index: number) => {
    setData({ ...data, beliefs: data.beliefs.filter((_, i) => i !== index) });
  };

  const updateParagraph = (index: number, value: string) => {
    const paragraphs = [...data.historyParagraphs];
    paragraphs[index] = value;
    setData({ ...data, historyParagraphs: paragraphs });
  };

  const addParagraph = () => {
    setData({ ...data, historyParagraphs: [...data.historyParagraphs, ""] });
  };

  const removeParagraph = (index: number) => {
    setData({ ...data, historyParagraphs: data.historyParagraphs.filter((_, i) => i !== index) });
  };

  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl font-bold text-primary">
        Edit About Page
      </h1>
      <div className="max-w-2xl space-y-6">
        {/* History */}
        <div>
          <h2 className="mb-3 text-lg font-semibold text-foreground">Our History</h2>
          <div className="space-y-3">
            {data.historyParagraphs.map((p, i) => (
              <Card key={i} className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium text-muted">Paragraph {i + 1}</label>
                  <button onClick={() => removeParagraph(i)} className="text-xs text-destructive hover:underline">Remove</button>
                </div>
                <textarea
                  rows={4}
                  value={p}
                  onChange={(e) => updateParagraph(i, e.target.value)}
                  className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </Card>
            ))}
            <Button variant="outline" onClick={addParagraph}>+ Add Paragraph</Button>
          </div>
        </div>

        {/* Beliefs */}
        <div>
          <h2 className="mb-3 text-lg font-semibold text-foreground">What We Believe</h2>
          <div className="space-y-3">
            {data.beliefs.map((b, i) => (
              <Card key={i} className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm font-medium text-muted">Belief {i + 1}</label>
                  <button onClick={() => removeBelief(i)} className="text-xs text-destructive hover:underline">Remove</button>
                </div>
                <input
                  placeholder="Title"
                  value={b.title}
                  onChange={(e) => updateBelief(i, "title", e.target.value)}
                  className="mb-2 w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
                <textarea
                  placeholder="Description"
                  rows={3}
                  value={b.description}
                  onChange={(e) => updateBelief(i, "description", e.target.value)}
                  className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </Card>
            ))}
            <Button variant="outline" onClick={addBelief}>+ Add Belief</Button>
          </div>
        </div>

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
