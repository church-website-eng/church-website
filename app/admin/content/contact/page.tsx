"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { defaultContactPage } from "@/data/defaults";

type ContactPageData = typeof defaultContactPage;

export default function EditContactPage() {
  const [data, setData] = useState<ContactPageData>(defaultContactPage);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content/contact_page")
      .then((r) => r.json())
      .then((res) => {
        if (res.value) setData(res.value);
      })
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    await fetch("/api/admin/content/contact_page", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: data }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const inputClass =
    "w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";

  return (
    <div>
      <h1 className="mb-2 font-serif text-2xl font-bold text-primary">
        Edit Contact Page
      </h1>
      <p className="mb-6 text-sm text-muted">
        Edit the text shown on the Contact Us page. Address, phone, email, and
        service times are managed under{" "}
        <a href="/admin/content/church-info" className="text-accent hover:underline">
          Church Info
        </a>{" "}
        and{" "}
        <a href="/admin/content/service-times" className="text-accent hover:underline">
          Service Times
        </a>
        .
      </p>

      <Card className="max-w-2xl space-y-4 p-6">
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            Page Subtitle
          </label>
          <input
            value={data.subtitle}
            onChange={(e) => setData({ ...data, subtitle: e.target.value })}
            placeholder="e.g. We'd love to hear from you"
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            Form Heading
          </label>
          <input
            value={data.formHeading}
            onChange={(e) => setData({ ...data, formHeading: e.target.value })}
            placeholder="e.g. Send us a Message"
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            Success Message
          </label>
          <textarea
            rows={2}
            value={data.successMessage}
            onChange={(e) =>
              setData({ ...data, successMessage: e.target.value })
            }
            placeholder="Shown after form submission"
            className={inputClass}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            Office Hours
          </label>
          <input
            value={data.officeHours}
            onChange={(e) => setData({ ...data, officeHours: e.target.value })}
            placeholder="e.g. Sunday 10 AM – 1 PM | Wednesday 6 PM"
            className={inputClass}
          />
          <p className="mt-1 text-xs text-muted">
            Displayed on the contact page as an extra info card. Leave blank to
            hide.
          </p>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            Additional Info
          </label>
          <textarea
            rows={2}
            value={data.additionalInfo}
            onChange={(e) =>
              setData({ ...data, additionalInfo: e.target.value })
            }
            placeholder="e.g. For urgent matters, please call directly."
            className={inputClass}
          />
          <p className="mt-1 text-xs text-muted">
            Extra note shown below the contact cards. Leave blank to hide.
          </p>
        </div>

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
