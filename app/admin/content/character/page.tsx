"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { defaultCharacterOfWeek } from "@/data/defaults";

type CharacterData = typeof defaultCharacterOfWeek;

export default function EditCharacterOfWeek() {
  const [data, setData] = useState<CharacterData>(defaultCharacterOfWeek);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content/character_of_week")
      .then((r) => r.json())
      .then((res) => {
        if (res.value) setData(res.value);
      })
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    await fetch("/api/admin/content/character_of_week", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: data }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const field = (
    label: string,
    key: keyof CharacterData,
    type: "text" | "textarea" = "text",
    placeholder = "",
  ) => (
    <div key={key}>
      <label className="mb-1 block text-sm font-medium text-foreground">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          rows={4}
          value={data[key]}
          onChange={(e) => setData({ ...data, [key]: e.target.value })}
          placeholder={placeholder}
          className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
      ) : (
        <input
          type="text"
          value={data[key]}
          onChange={(e) => setData({ ...data, [key]: e.target.value })}
          placeholder={placeholder}
          className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
      )}
    </div>
  );

  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl font-bold text-primary">
        Edit Character of the Week
      </h1>
      <Card className="max-w-2xl space-y-4 p-6">
        {field("Character Name", "name", "text", "e.g. Onesimus")}
        {field("Title / Epithet", "title", "text", "e.g. The Faithful Servant")}
        {field("Bible Verse Reference", "verse", "text", "e.g. Philemon 1:10-11")}
        {field(
          "Description",
          "description",
          "textarea",
          "A short paragraph about this character and the lesson from their life...",
        )}
        {field(
          "Image URL (optional)",
          "imageUrl",
          "text",
          "Paste a URL from the Media Library",
        )}

        <div className="flex items-center gap-3 pt-4">
          <Button variant="accent" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
          {saved && <span className="text-sm text-green-600">Saved!</span>}
        </div>
      </Card>
    </div>
  );
}
