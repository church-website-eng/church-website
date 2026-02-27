"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function AdminContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/contacts")
      .then((r) => r.json())
      .then((data) => {
        setContacts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const toggleRead = async (id: string, read: boolean) => {
    const res = await fetch("/api/admin/contacts", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, read }),
    });
    if (res.ok) {
      setContacts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, read } : c)),
      );
    }
  };

  if (loading) return <p className="py-10 text-center text-muted">Loading...</p>;

  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl font-bold text-primary">
        Contact Submissions
      </h1>
      {contacts.length === 0 ? (
        <p className="text-muted">No contact submissions yet.</p>
      ) : (
        <div className="space-y-4">
          {contacts.map((c) => (
            <Card
              key={c.id}
              className={`p-5 ${!c.read ? "border-l-4 border-l-accent" : ""}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{c.name}</h3>
                    {!c.read && (
                      <span className="rounded bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted">
                    {c.email}
                    {c.phone && ` | ${c.phone}`}
                  </p>
                  <p className="mt-2 text-foreground/80">{c.message}</p>
                  <p className="mt-2 text-xs text-muted">
                    {new Date(c.createdAt).toLocaleString()}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => toggleRead(c.id, !c.read)}
                >
                  {c.read ? "Mark Unread" : "Mark Read"}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
