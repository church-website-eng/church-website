"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

interface ThemeSettings {
  fontSerif: string;
  fontSans: string;
  fontSize: string;
  primaryColor: string;
  accentColor: string;
  goldColor: string;
}

const defaults: ThemeSettings = {
  fontSerif: "Georgia",
  fontSans: "system-ui",
  fontSize: "default",
  primaryColor: "#1a237e",
  accentColor: "#c62828",
  goldColor: "#d4a017",
};

const serifFonts = [
  { label: "Georgia (Default)", value: "Georgia" },
  { label: "Playfair Display", value: "Playfair Display" },
  { label: "Lora", value: "Lora" },
  { label: "Merriweather", value: "Merriweather" },
  { label: "Libre Baskerville", value: "Libre Baskerville" },
  { label: "EB Garamond", value: "EB Garamond" },
  { label: "Times New Roman", value: "Times New Roman" },
];

const sansFonts = [
  { label: "System Default", value: "system-ui" },
  { label: "Inter", value: "Inter" },
  { label: "Open Sans", value: "Open Sans" },
  { label: "Roboto", value: "Roboto" },
  { label: "Nunito", value: "Nunito" },
  { label: "Poppins", value: "Poppins" },
  { label: "Lato", value: "Lato" },
];

const fontSizes = [
  { label: "Small", value: "small" },
  { label: "Default", value: "default" },
  { label: "Large", value: "large" },
];

export default function EditTheme() {
  const [data, setData] = useState<ThemeSettings>(defaults);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content/theme_settings")
      .then((r) => r.json())
      .then((res) => {
        if (res.value) setData({ ...defaults, ...res.value });
      })
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    await fetch("/api/admin/content/theme_settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: data }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl font-bold text-primary">
        Theme &amp; Appearance
      </h1>

      <div className="max-w-2xl space-y-6">
        {/* Fonts */}
        <Card className="space-y-4 p-6">
          <h2 className="font-semibold text-foreground">Fonts</h2>
          <p className="text-xs text-muted">
            Choose fonts for headings and body text. Google Fonts will be loaded automatically.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Heading Font (Serif)
              </label>
              <select
                value={data.fontSerif}
                onChange={(e) => setData({ ...data, fontSerif: e.target.value })}
                className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              >
                {serifFonts.map((f) => (
                  <option key={f.value} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                Body Font (Sans-Serif)
              </label>
              <select
                value={data.fontSans}
                onChange={(e) => setData({ ...data, fontSans: e.target.value })}
                className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              >
                {sansFonts.map((f) => (
                  <option key={f.value} value={f.value}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Font Size</label>
            <div className="flex gap-3">
              {fontSizes.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setData({ ...data, fontSize: s.value })}
                  className={`rounded-lg border-2 px-5 py-2 text-sm font-medium transition ${
                    data.fontSize === s.value
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border text-foreground/70 hover:border-accent/50"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="rounded-lg border border-border bg-muted-light p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-2">Preview</p>
            <h3
              className="text-xl font-bold mb-1"
              style={{ fontFamily: `"${data.fontSerif}", serif` }}
            >
              Heading Preview
            </h3>
            <p
              className="text-sm text-foreground/70"
              style={{ fontFamily: data.fontSans === "system-ui" ? "system-ui, sans-serif" : `"${data.fontSans}", sans-serif` }}
            >
              This is how body text will appear on the website with the selected font.
            </p>
          </div>
        </Card>

        {/* Colors */}
        <Card className="space-y-4 p-6">
          <h2 className="font-semibold text-foreground">Colors</h2>
          <p className="text-xs text-muted">
            Customize the primary color, accent color, and highlight/gold color used across the website.
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm font-medium">Primary Color</label>
              <p className="mb-2 text-xs text-muted">Headings, navbar, hero background</p>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={data.primaryColor}
                  onChange={(e) => setData({ ...data, primaryColor: e.target.value })}
                  className="h-10 w-14 cursor-pointer rounded border border-border"
                />
                <input
                  value={data.primaryColor}
                  onChange={(e) => setData({ ...data, primaryColor: e.target.value })}
                  className="flex-1 rounded-lg border border-border bg-white px-3 py-2 text-sm font-mono focus:border-accent focus:outline-none"
                  maxLength={7}
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Accent Color</label>
              <p className="mb-2 text-xs text-muted">Buttons, links, highlights</p>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={data.accentColor}
                  onChange={(e) => setData({ ...data, accentColor: e.target.value })}
                  className="h-10 w-14 cursor-pointer rounded border border-border"
                />
                <input
                  value={data.accentColor}
                  onChange={(e) => setData({ ...data, accentColor: e.target.value })}
                  className="flex-1 rounded-lg border border-border bg-white px-3 py-2 text-sm font-mono focus:border-accent focus:outline-none"
                  maxLength={7}
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Gold / Highlight</label>
              <p className="mb-2 text-xs text-muted">Special accents, badges</p>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={data.goldColor}
                  onChange={(e) => setData({ ...data, goldColor: e.target.value })}
                  className="h-10 w-14 cursor-pointer rounded border border-border"
                />
                <input
                  value={data.goldColor}
                  onChange={(e) => setData({ ...data, goldColor: e.target.value })}
                  className="flex-1 rounded-lg border border-border bg-white px-3 py-2 text-sm font-mono focus:border-accent focus:outline-none"
                  maxLength={7}
                />
              </div>
            </div>
          </div>

          {/* Color Preview */}
          <div className="rounded-lg border border-border p-4 flex gap-3 items-center">
            <div className="h-10 w-10 rounded-full" style={{ backgroundColor: data.primaryColor }} />
            <div className="h-10 w-10 rounded-full" style={{ backgroundColor: data.accentColor }} />
            <div className="h-10 w-10 rounded-full" style={{ backgroundColor: data.goldColor }} />
            <span className="ml-2 text-xs text-muted">Color palette preview</span>
          </div>
        </Card>

        <div className="flex items-center gap-3">
          <Button variant="accent" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Theme"}
          </Button>
          {saved && <span className="text-sm text-green-600">Saved! Refresh the site to see changes.</span>}
        </div>
      </div>
    </div>
  );
}
