"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

interface LiveSettings {
  youtubeChannelUrl: string;
  facebookPageUrl: string;
  currentStreamUrl: string;
  isLive: boolean;
}

const defaultSettings: LiveSettings = {
  youtubeChannelUrl: "https://www.youtube.com/@CelestialChurchGoshen",
  facebookPageUrl: "https://www.facebook.com/celestialchurchofchristayomotherparish",
  currentStreamUrl: "",
  isLive: false,
};

export default function EditLive() {
  const [data, setData] = useState<LiveSettings>(defaultSettings);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content/live")
      .then((r) => r.json())
      .then((res) => { if (res.value) setData({ ...defaultSettings, ...res.value }); })
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    await fetch("/api/admin/content/live", {
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
        Live Stream Settings
      </h1>
      <div className="max-w-2xl space-y-6">
        {/* Live Toggle */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-foreground">Go Live</h2>
              <p className="text-sm text-muted">
                Turn this on when you start a live stream. A red &quot;LIVE&quot; badge will appear on the website.
              </p>
            </div>
            <button
              onClick={() => setData({ ...data, isLive: !data.isLive })}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                data.isLive ? "bg-red-500" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${
                  data.isLive ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          {data.isLive && (
            <div className="mt-3 flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
              </span>
              You are LIVE — visitors will see a red badge on the navbar
            </div>
          )}
        </Card>

        {/* Current Stream URL */}
        <Card className="space-y-4 p-6">
          <h2 className="font-semibold text-foreground">Current Stream URL</h2>
          <p className="text-sm text-muted">
            Paste the YouTube or Facebook live video URL when you go live. This will be embedded on the Live page.
          </p>
          <input
            value={data.currentStreamUrl}
            onChange={(e) => setData({ ...data, currentStreamUrl: e.target.value })}
            placeholder="https://www.youtube.com/watch?v=... or https://www.facebook.com/.../videos/..."
            className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </Card>

        {/* Channel URLs */}
        <Card className="space-y-4 p-6">
          <h2 className="font-semibold text-foreground">Channel Links</h2>
          <div>
            <label className="mb-1 block text-sm font-medium">YouTube Channel URL</label>
            <input
              value={data.youtubeChannelUrl}
              onChange={(e) => setData({ ...data, youtubeChannelUrl: e.target.value })}
              placeholder="https://www.youtube.com/@YourChannel"
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Facebook Page URL</label>
            <input
              value={data.facebookPageUrl}
              onChange={(e) => setData({ ...data, facebookPageUrl: e.target.value })}
              placeholder="https://www.facebook.com/YourPageName"
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
        </Card>

        <div className="flex items-center gap-3">
          <Button variant="accent" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Settings"}
          </Button>
          {saved && <span className="text-sm text-green-600">Saved!</span>}
        </div>
      </div>
    </div>
  );
}
