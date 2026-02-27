"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";

interface Visitor {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  date: string | null;
  guests: string | null;
  questions: string | null;
  createdAt: string;
}

export default function AdminVisitors() {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/visitors")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setVisitors(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p className="py-10 text-center text-muted">Loading...</p>;

  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl font-bold text-primary">
        Visitor Registrations
      </h1>
      {visitors.length === 0 ? (
        <p className="text-muted">No visitor registrations yet.</p>
      ) : (
        <div className="space-y-4">
          {visitors.map((v) => (
            <Card key={v.id} className="p-5">
              <h3 className="font-semibold text-foreground">{v.name}</h3>
              <p className="text-sm text-muted">
                {v.email}
                {v.phone && ` | ${v.phone}`}
              </p>
              {v.date && (
                <p className="mt-1 text-sm">
                  <strong>Visit Date:</strong> {v.date}
                </p>
              )}
              {v.guests && (
                <p className="text-sm">
                  <strong>Guests:</strong> {v.guests}
                </p>
              )}
              {v.questions && (
                <p className="mt-2 text-foreground/80">{v.questions}</p>
              )}
              <p className="mt-2 text-xs text-muted">
                {new Date(v.createdAt).toLocaleString()}
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
