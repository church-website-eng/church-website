"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

interface Prayer {
  id: string;
  name: string;
  email: string | null;
  category: string | null;
  request: string;
  isPublic: boolean;
  createdAt: string;
}

export default function AdminPrayers() {
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/prayers")
      .then((r) => r.json())
      .then((data) => {
        setPrayers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const toggleVisibility = async (id: string, isPublic: boolean) => {
    const res = await fetch("/api/admin/prayers", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, isPublic }),
    });
    if (res.ok) {
      setPrayers((prev) =>
        prev.map((p) => (p.id === id ? { ...p, isPublic } : p)),
      );
    }
  };

  if (loading) return <p className="py-10 text-center text-muted">Loading...</p>;

  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl font-bold text-primary">
        Prayer Requests
      </h1>
      {prayers.length === 0 ? (
        <p className="text-muted">No prayer requests yet.</p>
      ) : (
        <div className="space-y-4">
          {prayers.map((p) => (
            <Card key={p.id} className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{p.name}</h3>
                    {p.category && (
                      <span className="rounded bg-purple-100 px-2 py-0.5 text-xs text-purple-700">
                        {p.category}
                      </span>
                    )}
                    <span
                      className={`rounded px-2 py-0.5 text-xs ${
                        p.isPublic
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {p.isPublic ? "Public" : "Private"}
                    </span>
                  </div>
                  {p.email && <p className="text-sm text-muted">{p.email}</p>}
                  <p className="mt-2 text-foreground/80">{p.request}</p>
                  <p className="mt-2 text-xs text-muted">
                    {new Date(p.createdAt).toLocaleString()}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleVisibility(p.id, !p.isPublic)}
                >
                  {p.isPublic ? "Make Private" : "Make Public"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
