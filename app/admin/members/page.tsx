"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  approved: boolean;
  createdAt: string;
}

export default function AdminMembers() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/members")
      .then((r) => r.json())
      .then((data) => {
        setMembers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const updateMember = async (
    id: string,
    updates: { approved?: boolean; role?: string },
  ) => {
    const res = await fetch("/api/admin/members", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...updates }),
    });
    if (res.ok) {
      const updated = await res.json();
      setMembers((prev) => prev.map((m) => (m.id === id ? updated : m)));
    }
  };

  if (loading) return <p className="py-10 text-center text-muted">Loading...</p>;

  const pending = members.filter((m) => !m.approved);
  const approved = members.filter((m) => m.approved);

  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl font-bold text-primary">
        Members
      </h1>

      {pending.length > 0 && (
        <>
          <h2 className="mb-3 text-lg font-semibold text-amber-600">
            Pending Approval ({pending.length})
          </h2>
          <div className="mb-8 space-y-3">
            {pending.map((m) => (
              <Card key={m.id} className="border-l-4 border-l-amber-400 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold">{m.name}</h3>
                    <p className="text-sm text-muted">{m.email}</p>
                    <p className="text-xs text-muted">
                      Registered {new Date(m.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="accent"
                      size="sm"
                      onClick={() => updateMember(m.id, { approved: true })}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateMember(m.id, { approved: false })}
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
        Approved Members ({approved.length})
      </h2>
      {approved.length === 0 ? (
        <p className="text-muted">No approved members yet.</p>
      ) : (
        <div className="space-y-3">
          {approved.map((m) => (
            <Card key={m.id} className="p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold">{m.name}</h3>
                  <p className="text-sm text-muted">{m.email}</p>
                  <p className="text-xs text-muted">
                    Role: {m.role} | Joined{" "}
                    {new Date(m.createdAt).toLocaleDateString()}
                  </p>
                </div>
                {m.role !== "ADMIN" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateMember(m.id, { role: "ADMIN" })}
                  >
                    Make Admin
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
