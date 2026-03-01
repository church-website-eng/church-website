"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import RichTextEditor from "@/components/ui/RichTextEditor";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { defaultCareers } from "@/data/defaults";

type CareersData = typeof defaultCareers;

export default function EditCareers() {
  const [data, setData] = useState<CareersData>(defaultCareers);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content/careers")
      .then((r) => r.json())
      .then((res) => {
        if (res.value) setData(res.value);
      })
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    await fetch("/api/admin/content/careers", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: data }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const addCareer = () => {
    setData({
      ...data,
      careers: [
        {
          id: String(Date.now()),
          title: "",
          type: "volunteer",
          description: "",
          requirements: "",
          contact: "",
        },
        ...data.careers,
      ],
    });
  };

  const updateCareer = (
    index: number,
    field: keyof CareersData["careers"][number],
    value: string
  ) => {
    const careers = [...data.careers];
    careers[index] = { ...careers[index], [field]: value };
    setData({ ...data, careers });
  };

  const removeCareer = (index: number) => {
    if (confirm("Remove this position?")) {
      setData({
        ...data,
        careers: data.careers.filter((_, i) => i !== index),
      });
    }
  };

  const addVolunteerArea = () => {
    setData({
      ...data,
      volunteerAreas: [
        {
          id: String(Date.now()),
          name: "",
          description: "",
        },
        ...data.volunteerAreas,
      ],
    });
  };

  const updateVolunteerArea = (
    index: number,
    field: keyof CareersData["volunteerAreas"][number],
    value: string
  ) => {
    const volunteerAreas = [...data.volunteerAreas];
    volunteerAreas[index] = { ...volunteerAreas[index], [field]: value };
    setData({ ...data, volunteerAreas });
  };

  const removeVolunteerArea = (index: number) => {
    if (confirm("Remove this volunteer area?")) {
      setData({
        ...data,
        volunteerAreas: data.volunteerAreas.filter((_, i) => i !== index),
      });
    }
  };

  const inputClass =
    "w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";

  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl font-bold text-primary">
        Edit Careers & Volunteering
      </h1>

      <div className="max-w-2xl space-y-8">
        {/* Intro */}
        <Card className="space-y-4 p-6">
          <h2 className="font-semibold text-foreground">Page Introduction</h2>
          <div>
            <label className="mb-1 block text-sm font-medium">
              Intro Text
            </label>
            <RichTextEditor
              content={data.intro}
              onChange={(html) => setData({ ...data, intro: html })}
              placeholder="Write an intro paragraph for the careers & volunteering page..."
            />
          </div>
        </Card>

        {/* Careers / Positions */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-primary">
              Open Positions
            </h2>
            <button
              onClick={addCareer}
              className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-light"
            >
              <FiPlus size={14} /> Add Position
            </button>
          </div>

          <div className="space-y-4">
            {data.careers.map((career, i) => (
              <Card key={career.id} className="space-y-3 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    {career.title || "New Position"}
                  </span>
                  <button
                    onClick={() => removeCareer(i)}
                    className="flex items-center gap-1 text-sm text-destructive hover:underline"
                  >
                    <FiTrash2 size={14} /> Remove
                  </button>
                </div>
                <input
                  placeholder="Position Title"
                  value={career.title}
                  onChange={(e) => updateCareer(i, "title", e.target.value)}
                  className={inputClass}
                />
                <div className="grid grid-cols-2 gap-3">
                  <select
                    value={career.type}
                    onChange={(e) => updateCareer(i, "type", e.target.value)}
                    className={inputClass}
                  >
                    <option value="volunteer">Volunteer</option>
                    <option value="part-time">Part-Time</option>
                    <option value="full-time">Full-Time</option>
                    <option value="contract">Contract</option>
                  </select>
                  <input
                    placeholder="Contact email"
                    value={career.contact}
                    onChange={(e) => updateCareer(i, "contact", e.target.value)}
                    className={inputClass}
                  />
                </div>
                <textarea
                  placeholder="Description"
                  rows={2}
                  value={career.description}
                  onChange={(e) =>
                    updateCareer(i, "description", e.target.value)
                  }
                  className={inputClass}
                />
                <input
                  placeholder="Requirements (optional)"
                  value={career.requirements}
                  onChange={(e) =>
                    updateCareer(i, "requirements", e.target.value)
                  }
                  className={inputClass}
                />
              </Card>
            ))}
            {data.careers.length === 0 && (
              <p className="text-sm text-muted">
                No positions yet. Click &quot;Add Position&quot; to create one.
              </p>
            )}
          </div>
        </div>

        {/* Volunteer Areas */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-primary">
              Volunteer Areas
            </h2>
            <button
              onClick={addVolunteerArea}
              className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-light"
            >
              <FiPlus size={14} /> Add Area
            </button>
          </div>

          <div className="space-y-4">
            {data.volunteerAreas.map((area, i) => (
              <Card key={area.id} className="space-y-3 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">
                    {area.name || "New Area"}
                  </span>
                  <button
                    onClick={() => removeVolunteerArea(i)}
                    className="flex items-center gap-1 text-sm text-destructive hover:underline"
                  >
                    <FiTrash2 size={14} /> Remove
                  </button>
                </div>
                <input
                  placeholder="Area Name"
                  value={area.name}
                  onChange={(e) =>
                    updateVolunteerArea(i, "name", e.target.value)
                  }
                  className={inputClass}
                />
                <textarea
                  placeholder="Description"
                  rows={2}
                  value={area.description}
                  onChange={(e) =>
                    updateVolunteerArea(i, "description", e.target.value)
                  }
                  className={inputClass}
                />
              </Card>
            ))}
          </div>
        </div>

        {/* Save */}
        <div className="flex items-center gap-3">
          <Button variant="accent" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save All"}
          </Button>
          {saved && <span className="text-sm text-green-600">Saved!</span>}
        </div>
      </div>
    </div>
  );
}
