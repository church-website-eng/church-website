"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { defaultDirectory } from "@/data/defaults";
import { FiTrash2, FiPlus, FiChevronUp, FiChevronDown } from "react-icons/fi";

type DirectoryData = typeof defaultDirectory;
type DirectoryEntry = DirectoryData["items"][number];

export default function EditDirectory() {
  const [data, setData] = useState<DirectoryData>(defaultDirectory);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/admin/content/directory")
      .then((r) => r.json())
      .then((res) => {
        if (res.value) setData(res.value);
      })
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    await fetch("/api/admin/content/directory", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: data }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateItem = (
    index: number,
    field: keyof DirectoryEntry,
    value: string,
  ) => {
    const items = [...data.items];
    items[index] = { ...items[index], [field]: value };
    setData({ ...data, items });
  };

  const addItem = () => {
    const newId = String(Date.now());
    setData({
      ...data,
      items: [
        ...data.items,
        {
          id: newId,
          name: "",
          title: "",
          phone: "",
          email: "",
          ministry: "",
          photoUrl: "",
        },
      ],
    });
    setExpanded(data.items.length);
  };

  const removeItem = (index: number) => {
    if (!confirm("Remove this directory entry?")) return;
    setData({ ...data, items: data.items.filter((_, i) => i !== index) });
    setExpanded(null);
  };

  const moveItem = (index: number, direction: "up" | "down") => {
    const items = [...data.items];
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= items.length) return;
    [items[index], items[target]] = [items[target], items[index]];
    setData({ ...data, items });
    setExpanded(target);
  };

  const inputClass =
    "w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-primary">
            Church Directory
          </h1>
          <p className="mt-1 text-sm text-muted">
            Manage the member directory visible to logged-in members in the
            portal.
          </p>
        </div>
        <Button variant="accent" onClick={addItem}>
          <span className="flex items-center gap-1">
            <FiPlus size={14} /> Add Entry
          </span>
        </Button>
      </div>

      <div className="max-w-2xl space-y-3">
        {data.items.map((item, i) => {
          const isOpen = expanded === i;
          return (
            <Card key={item.id || i} className="p-0 overflow-hidden">
              {/* Header row — always visible */}
              <button
                onClick={() => setExpanded(isOpen ? null : i)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/30"
              >
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {item.name ? item.name.charAt(0).toUpperCase() : "?"}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground truncate">
                    {item.name || "New Entry"}
                  </h3>
                  <p className="text-xs text-muted truncate">
                    {item.title || item.ministry || "—"}
                  </p>
                </div>
                {isOpen ? (
                  <FiChevronUp className="text-muted" size={16} />
                ) : (
                  <FiChevronDown className="text-muted" size={16} />
                )}
              </button>

              {/* Expanded edit form */}
              {isOpen && (
                <div className="border-t border-border px-4 pb-4 pt-3 space-y-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-muted">
                        Full Name *
                      </label>
                      <input
                        placeholder="e.g. Brother John Adeyemi"
                        value={item.name}
                        onChange={(e) => updateItem(i, "name", e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-muted">
                        Title / Role
                      </label>
                      <input
                        placeholder="e.g. Shepherd-in-Charge"
                        value={item.title}
                        onChange={(e) => updateItem(i, "title", e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-muted">
                      Ministry / Department
                    </label>
                    <input
                      placeholder="e.g. Parish Leadership"
                      value={item.ministry}
                      onChange={(e) =>
                        updateItem(i, "ministry", e.target.value)
                      }
                      className={inputClass}
                    />
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-muted">
                        Phone
                      </label>
                      <input
                        type="tel"
                        placeholder="(587) 000-0000"
                        value={item.phone}
                        onChange={(e) =>
                          updateItem(i, "phone", e.target.value)
                        }
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-muted">
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="name@email.com"
                        value={item.email}
                        onChange={(e) =>
                          updateItem(i, "email", e.target.value)
                        }
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-muted">
                      Photo URL
                    </label>
                    <input
                      placeholder="https://... or /images/..."
                      value={item.photoUrl}
                      onChange={(e) =>
                        updateItem(i, "photoUrl", e.target.value)
                      }
                      className={inputClass}
                    />
                    <p className="mt-1 text-xs text-muted">
                      Upload photos in Media Library first, then paste the URL
                      here.
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => moveItem(i, "up")}
                      disabled={i === 0}
                      className="rounded border border-border px-2 py-1 text-xs text-muted transition hover:bg-muted/30 disabled:opacity-30"
                    >
                      Move Up
                    </button>
                    <button
                      onClick={() => moveItem(i, "down")}
                      disabled={i === data.items.length - 1}
                      className="rounded border border-border px-2 py-1 text-xs text-muted transition hover:bg-muted/30 disabled:opacity-30"
                    >
                      Move Down
                    </button>
                    <div className="flex-1" />
                    <button
                      onClick={() => removeItem(i)}
                      className="flex items-center gap-1 rounded border border-destructive/30 px-2 py-1 text-xs text-destructive transition hover:bg-destructive/10"
                    >
                      <FiTrash2 size={12} /> Remove
                    </button>
                  </div>
                </div>
              )}
            </Card>
          );
        })}

        {data.items.length === 0 && (
          <p className="py-8 text-center text-sm text-muted">
            No directory entries yet. Click &quot;Add Entry&quot; to get
            started.
          </p>
        )}

        <div className="flex items-center gap-3 pt-4">
          <Button variant="accent" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Directory"}
          </Button>
          {saved && (
            <span className="text-sm text-green-600">Saved!</span>
          )}
        </div>
      </div>
    </div>
  );
}
