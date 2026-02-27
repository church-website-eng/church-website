"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
  active: boolean;
}

export default function AdminNewsletter() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/newsletter")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setSubscribers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const exportCSV = () => {
    const active = subscribers.filter((s) => s.active);
    const csv = ["Email,Subscribed Date"]
      .concat(
        active.map(
          (s) =>
            `${s.email},${new Date(s.subscribedAt).toLocaleDateString()}`,
        ),
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "newsletter-subscribers.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) return <p className="py-10 text-center text-muted">Loading...</p>;

  const active = subscribers.filter((s) => s.active);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-serif text-2xl font-bold text-primary">
          Newsletter Subscribers
        </h1>
        {active.length > 0 && (
          <Button variant="outline" size="sm" onClick={exportCSV}>
            Export CSV
          </Button>
        )}
      </div>

      <p className="mb-4 text-muted">
        {active.length} active subscriber{active.length !== 1 && "s"}
      </p>

      {active.length === 0 ? (
        <p className="text-muted">No subscribers yet.</p>
      ) : (
        <Card className="overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-3 text-left font-medium text-foreground">
                  Email
                </th>
                <th className="px-4 py-3 text-left font-medium text-foreground">
                  Subscribed
                </th>
              </tr>
            </thead>
            <tbody>
              {active.map((s) => (
                <tr key={s.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3">{s.email}</td>
                  <td className="px-4 py-3 text-muted">
                    {new Date(s.subscribedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
