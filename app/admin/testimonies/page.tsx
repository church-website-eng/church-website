"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

interface Testimony {
  id: string;
  name: string;
  title: string | null;
  body: string;
  approved: boolean;
  createdAt: string;
}

export default function AdminTestimonies() {
  const [testimonies, setTestimonies] = useState<Testimony[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/testimonies")
      .then((r) => r.json())
      .then((data) => {
        setTestimonies(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const toggleApproval = async (id: string, approved: boolean) => {
    const res = await fetch("/api/admin/testimonies", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, approved }),
    });
    if (res.ok) {
      setTestimonies((prev) =>
        prev.map((t) => (t.id === id ? { ...t, approved } : t)),
      );
    }
  };

  if (loading) return <p className="py-10 text-center text-muted">Loading...</p>;

  const pending = testimonies.filter((t) => !t.approved);
  const approved = testimonies.filter((t) => t.approved);

  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl font-bold text-primary">
        Testimonies
      </h1>

      {pending.length > 0 && (
        <>
          <h2 className="mb-3 text-lg font-semibold text-amber-600">
            Pending Review ({pending.length})
          </h2>
          <div className="mb-8 space-y-4">
            {pending.map((t) => (
              <Card key={t.id} className="border-l-4 border-l-amber-400 p-5">
                <h3 className="font-semibold">{t.name}</h3>
                {t.title && (
                  <p className="text-sm font-medium text-foreground/70">
                    {t.title}
                  </p>
                )}
                <p className="mt-2 italic text-foreground/80">
                  &ldquo;{t.body}&rdquo;
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-xs text-muted">
                    {new Date(t.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="accent"
                      size="sm"
                      onClick={() => toggleApproval(t.id, true)}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleApproval(t.id, false)}
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      <h2 className="mb-3 text-lg font-semibold text-green-600">
        Published ({approved.length})
      </h2>
      {approved.length === 0 ? (
        <p className="text-muted">No published testimonies.</p>
      ) : (
        <div className="space-y-4">
          {approved.map((t) => (
            <Card key={t.id} className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold">{t.name}</h3>
                  <p className="mt-1 italic text-foreground/70">
                    &ldquo;{t.body}&rdquo;
                  </p>
                  <p className="mt-2 text-xs text-muted">
                    {new Date(t.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleApproval(t.id, false)}
                >
                  Unpublish
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
