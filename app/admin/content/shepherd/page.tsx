"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import RichTextEditor from "@/components/ui/RichTextEditor";

interface ShepherdData {
  name: string;
  title: string;
  bio: string;
  photo: string;
  messageTitle: string;
  messageBody: string;
  videoUrl: string;
}

const defaults: ShepherdData = {
  name: "VSE Kunle Lawal",
  title: "Shepherd-in-Charge — Goshen Cathedral",
  bio: "Leading the Goshen Cathedral parish with divine guidance, pastoral care, and an unwavering commitment to the spiritual growth of all members.",
  photo: "/images/head-of-church.jpeg",
  messageTitle: "A Word from the Shepherd",
  messageBody: "Beloved in Christ, let us continue to walk in faith, love, and obedience to God's word. Remember that our strength comes from the Lord, and in every season, He remains faithful. Stay prayerful, stay connected, and let the light of Christ shine through you.",
  videoUrl: "",
};

export default function EditShepherdCorner() {
  const [data, setData] = useState<ShepherdData>(defaults);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content/shepherd_corner")
      .then((r) => r.json())
      .then((res) => { if (res.value) setData({ ...defaults, ...res.value }); })
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    await fetch("/api/admin/content/shepherd_corner", {
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
        Edit Shepherd&apos;s Corner
      </h1>

      <div className="max-w-2xl space-y-6">
        <Card className="space-y-4 p-6">
          <h2 className="font-semibold text-foreground">Shepherd Info</h2>

          <div className="flex items-center gap-4">
            {data.photo && (
              <img
                src={data.photo}
                alt="Shepherd preview"
                className="h-20 w-20 rounded-full object-cover border border-border"
              />
            )}
            <div className="flex-1">
              <label className="mb-1 block text-sm font-medium">Photo URL</label>
              <input
                value={data.photo}
                onChange={(e) => setData({ ...data, photo: e.target.value })}
                placeholder="/images/photo.jpeg or paste from Media Library"
                className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Name</label>
            <input
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Title / Role</label>
            <input
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Short Bio</label>
            <textarea
              rows={3}
              value={data.bio}
              onChange={(e) => setData({ ...data, bio: e.target.value })}
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
        </Card>

        <Card className="space-y-4 p-6">
          <h2 className="font-semibold text-foreground">Weekly Message</h2>
          <p className="text-xs text-muted">Update this weekly with a new devotional or word of encouragement from the Shepherd.</p>

          <div>
            <label className="mb-1 block text-sm font-medium">Message Title</label>
            <input
              value={data.messageTitle}
              onChange={(e) => setData({ ...data, messageTitle: e.target.value })}
              placeholder="e.g. A Word from the Shepherd"
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Message Body</label>
            <RichTextEditor
              content={data.messageBody}
              onChange={(html) => setData({ ...data, messageBody: html })}
              placeholder="Write the Shepherd's weekly message here..."
            />
          </div>
        </Card>

        <Card className="space-y-4 p-6">
          <h2 className="font-semibold text-foreground">Video Message (Optional)</h2>
          <p className="text-xs text-muted">
            Paste a YouTube link or upload a video via Media Library. If provided, the video will display alongside the written message.
          </p>

          <div>
            <label className="mb-1 block text-sm font-medium">Video URL</label>
            <input
              value={data.videoUrl}
              onChange={(e) => setData({ ...data, videoUrl: e.target.value })}
              placeholder="https://www.youtube.com/watch?v=... or paste from Media Library"
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
        </Card>

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
