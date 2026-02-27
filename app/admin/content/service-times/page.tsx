"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { defaultServiceTimes } from "@/data/defaults";

type ServiceTimesData = typeof defaultServiceTimes;

export default function EditServiceTimes() {
  const [data, setData] = useState<ServiceTimesData>(defaultServiceTimes);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content/service_times")
      .then((r) => r.json())
      .then((res) => { if (res.value) setData(res.value); })
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    await fetch("/api/admin/content/service_times", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: data }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateService = (index: number, field: string, value: string) => {
    const services = [...data.services];
    if (field === "day") {
      services[index] = { ...services[index], day: value };
    } else {
      services[index] = { ...services[index], times: value.split("\n") };
    }
    setData({ ...data, services });
  };

  const addService = () => {
    setData({ ...data, services: [...data.services, { day: "", times: [""] }] });
  };

  const removeService = (index: number) => {
    setData({ ...data, services: data.services.filter((_, i) => i !== index) });
  };

  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl font-bold text-primary">
        Edit Service Times
      </h1>
      <div className="max-w-2xl space-y-4">
        {data.services.map((service, i) => (
          <Card key={i} className="p-4">
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">Service {i + 1}</label>
              <button
                onClick={() => removeService(i)}
                className="text-xs text-destructive hover:underline"
              >
                Remove
              </button>
            </div>
            <input
              placeholder="Day (e.g. Sunday)"
              value={service.day}
              onChange={(e) => updateService(i, "day", e.target.value)}
              className="mb-2 w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
            <textarea
              placeholder="Times (one per line)"
              rows={2}
              value={service.times.join("\n")}
              onChange={(e) => updateService(i, "times", e.target.value)}
              className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </Card>
        ))}

        <Button variant="outline" onClick={addService}>
          + Add Service
        </Button>

        <Card className="p-4">
          <label className="mb-1 block text-sm font-medium text-foreground">
            Key Aspects of Worship (one per line)
          </label>
          <textarea
            rows={4}
            value={data.worshipAspects.join("\n")}
            onChange={(e) => setData({ ...data, worshipAspects: e.target.value.split("\n") })}
            className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
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
