"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";

interface Sacrament {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  type: string;
  preferredDate: string | null;
  details: string | null;
  createdAt: string;
}

export default function AdminSacraments() {
  const [sacraments, setSacraments] = useState<Sacrament[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/sacraments")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setSacraments(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p className="py-10 text-center text-muted">Loading...</p>;

  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl font-bold text-primary">
        Sacrament Requests
      </h1>
      {sacraments.length === 0 ? (
        <p className="text-muted">No sacrament requests yet.</p>
      ) : (
        <div className="space-y-4">
          {sacraments.map((s) => (
            <Card key={s.id} className="p-5">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground">{s.name}</h3>
                <span className="rounded bg-indigo-100 px-2 py-0.5 text-xs text-indigo-700">
                  {s.type}
                </span>
              </div>
              <p className="text-sm text-muted">
                {s.email}
                {s.phone && ` | ${s.phone}`}
              </p>
              {s.preferredDate && (
                <p className="mt-1 text-sm">
                  <strong>Preferred Date:</strong> {s.preferredDate}
                </p>
              )}
              {s.details && (
                <p className="mt-2 text-foreground/80">{s.details}</p>
              )}
              <p className="mt-2 text-xs text-muted">
                {new Date(s.createdAt).toLocaleString()}
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
