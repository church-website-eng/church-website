"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { defaultChurchInfo } from "@/data/defaults";

type ChurchInfo = typeof defaultChurchInfo;

export default function EditChurchInfo() {
  const [data, setData] = useState<ChurchInfo>(defaultChurchInfo);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content/church_info")
      .then((r) => r.json())
      .then((res) => { if (res.value) setData(res.value); })
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    await fetch("/api/admin/content/church_info", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: data }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const field = (label: string, key: keyof ChurchInfo, type = "text") => (
    <div key={key}>
      <label className="mb-1 block text-sm font-medium text-foreground">{label}</label>
      {type === "textarea" ? (
        <textarea
          rows={3}
          value={data[key]}
          onChange={(e) => setData({ ...data, [key]: e.target.value })}
          className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
      ) : (
        <input
          type={type}
          value={data[key]}
          onChange={(e) => setData({ ...data, [key]: e.target.value })}
          className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
      )}
    </div>
  );

  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl font-bold text-primary">
        Edit Church Info
      </h1>
      <Card className="max-w-2xl space-y-4 p-6">
        <h2 className="font-semibold text-foreground">Identity</h2>
        {field("Church Name", "churchName")}
        {field("Cathedral Name", "cathedralName")}
        {field("Subtitle", "subtitle")}
        {field("Motto / Tagline", "motto", "textarea")}

        <h2 className="mt-4 font-semibold text-foreground">Address</h2>
        {field("Street", "street")}
        {field("City", "city")}
        {field("Province", "province")}

        <h2 className="mt-4 font-semibold text-foreground">Contact</h2>
        {field("Phone", "phone")}
        {field("Email", "email", "email")}

        <h2 className="mt-4 font-semibold text-foreground">Social Media</h2>
        {field("Facebook URL", "facebookUrl")}
        {field("YouTube URL", "youtubeUrl")}
        {field("Instagram URL", "instagramUrl")}

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
