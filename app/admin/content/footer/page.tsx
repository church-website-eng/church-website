"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { defaultFooter } from "@/data/defaults";
import { FiPlus, FiTrash2 } from "react-icons/fi";

type FooterData = typeof defaultFooter;
type QuickLink = FooterData["quickLinks"][number];

export default function EditFooter() {
  const [data, setData] = useState<FooterData>(defaultFooter);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content/footer")
      .then((r) => r.json())
      .then((res) => {
        if (res.value) setData(res.value);
      })
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    await fetch("/api/admin/content/footer", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: data }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateLink = (index: number, field: keyof QuickLink, value: string) => {
    const links = [...data.quickLinks];
    links[index] = { ...links[index], [field]: value };
    setData({ ...data, quickLinks: links });
  };

  const addLink = () => {
    setData({
      ...data,
      quickLinks: [...data.quickLinks, { label: "", href: "/" }],
    });
  };

  const removeLink = (index: number) => {
    setData({
      ...data,
      quickLinks: data.quickLinks.filter((_, i) => i !== index),
    });
  };

  const inputClass =
    "w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";

  return (
    <div>
      <h1 className="mb-2 font-serif text-2xl font-bold text-primary">
        Edit Footer
      </h1>
      <p className="mb-6 text-sm text-muted">
        Manage footer quick links and extra text. Church info, service times,
        and social links are managed under{" "}
        <a
          href="/admin/content/church-info"
          className="text-accent hover:underline"
        >
          Church Info
        </a>{" "}
        and{" "}
        <a
          href="/admin/content/service-times"
          className="text-accent hover:underline"
        >
          Service Times
        </a>
        .
      </p>

      <div className="max-w-2xl space-y-6">
        {/* Quick Links */}
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-foreground">Quick Links</h2>
            <button
              onClick={addLink}
              className="flex items-center gap-1 rounded-lg bg-accent px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-accent-light"
            >
              <FiPlus size={12} /> Add Link
            </button>
          </div>

          <div className="space-y-3">
            {data.quickLinks.map((link, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  placeholder="Label (e.g. About Us)"
                  value={link.label}
                  onChange={(e) => updateLink(i, "label", e.target.value)}
                  className={inputClass}
                />
                <input
                  placeholder="URL (e.g. /about)"
                  value={link.href}
                  onChange={(e) => updateLink(i, "href", e.target.value)}
                  className={inputClass}
                />
                <button
                  onClick={() => removeLink(i)}
                  className="flex-shrink-0 rounded border border-destructive/30 p-2 text-destructive transition hover:bg-destructive/10"
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
            ))}
            {data.quickLinks.length === 0 && (
              <p className="text-sm text-muted">
                No quick links. Click &quot;Add Link&quot; to add one.
              </p>
            )}
          </div>
        </Card>

        {/* Extra text */}
        <Card className="space-y-4 p-6">
          <h2 className="font-semibold text-foreground">Extra Text</h2>

          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">
              Footer Tagline
            </label>
            <input
              value={data.tagline}
              onChange={(e) => setData({ ...data, tagline: e.target.value })}
              placeholder="e.g. A community of faith, prayer, and spiritual growth"
              className={inputClass}
            />
            <p className="mt-1 text-xs text-muted">
              Shown below the church address in the footer. Leave blank to hide.
            </p>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-foreground">
              Copyright Extra Text
            </label>
            <input
              value={data.copyrightExtra}
              onChange={(e) =>
                setData({ ...data, copyrightExtra: e.target.value })
              }
              placeholder="e.g. Diocese of Alberta"
              className={inputClass}
            />
            <p className="mt-1 text-xs text-muted">
              Appended to the copyright line at the bottom. Leave blank for
              default.
            </p>
          </div>
        </Card>

        <div className="flex items-center gap-3">
          <Button variant="accent" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Footer"}
          </Button>
          {saved && <span className="text-sm text-green-600">Saved!</span>}
        </div>
      </div>
    </div>
  );
}
