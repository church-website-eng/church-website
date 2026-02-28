"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { FiPlus, FiTrash2, FiX } from "react-icons/fi";

const monthNames = [
  "", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  approved: boolean;
  birthMonth: number | null;
  birthDay: number | null;
  createdAt: string;
}

function formatBirthday(m: Member) {
  if (!m.birthMonth || !m.birthDay) return null;
  return `${monthNames[m.birthMonth]} ${m.birthDay}`;
}

export default function AdminMembers() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMember, setNewMember] = useState({ name: "", email: "", birthMonth: 0, birthDay: 0 });
  const [addError, setAddError] = useState("");
  const [adding, setAdding] = useState(false);

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

  const deleteMember = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/admin/members?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      setMembers((prev) => prev.filter((m) => m.id !== id));
    }
  };

  const addMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddError("");
    setAdding(true);
    const res = await fetch("/api/admin/members", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newMember.name,
        email: newMember.email,
        birthMonth: newMember.birthMonth || null,
        birthDay: newMember.birthDay || null,
      }),
    });
    if (res.ok) {
      const member = await res.json();
      setMembers((prev) => [member, ...prev]);
      setNewMember({ name: "", email: "", birthMonth: 0, birthDay: 0 });
      setShowAddForm(false);
    } else {
      const err = await res.json();
      setAddError(err.error || "Failed to add member.");
    }
    setAdding(false);
  };

  if (loading) return <p className="py-10 text-center text-muted">Loading...</p>;

  const pending = members.filter((m) => !m.approved);
  const approved = members.filter((m) => m.approved);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-serif text-2xl font-bold text-primary">Members</h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-light"
        >
          {showAddForm ? <><FiX size={14} /> Cancel</> : <><FiPlus size={14} /> Add Member</>}
        </button>
      </div>

      {/* Add Member Form */}
      {showAddForm && (
        <Card className="mb-8 max-w-lg space-y-4 p-6">
          <h2 className="font-semibold text-foreground">Add New Member</h2>
          <p className="text-xs text-muted">Member will be auto-approved with a temporary password (Welcome123!).</p>
          <form onSubmit={addMember} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">Full Name *</label>
              <input
                required
                value={newMember.name}
                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Email *</label>
              <input
                required
                type="email"
                value={newMember.email}
                onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">Birth Month</label>
                <select
                  value={newMember.birthMonth}
                  onChange={(e) => setNewMember({ ...newMember, birthMonth: Number(e.target.value) })}
                  className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                >
                  <option value={0}>Select month</option>
                  {monthNames.slice(1).map((m, i) => (
                    <option key={i + 1} value={i + 1}>{m}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Birth Day</label>
                <select
                  value={newMember.birthDay}
                  onChange={(e) => setNewMember({ ...newMember, birthDay: Number(e.target.value) })}
                  className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                >
                  <option value={0}>Select day</option>
                  {Array.from({ length: 31 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </div>
            </div>
            {addError && <p className="text-sm text-destructive">{addError}</p>}
            <Button variant="accent" type="submit" disabled={adding}>
              {adding ? "Adding..." : "Add Member"}
            </Button>
          </form>
        </Card>
      )}

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
                    {formatBirthday(m) && (
                      <p className="text-xs text-accent">Birthday: {formatBirthday(m)}</p>
                    )}
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
                    <button
                      onClick={() => deleteMember(m.id, m.name)}
                      className="flex items-center gap-1 rounded-lg border border-destructive/30 px-3 py-1.5 text-sm text-destructive transition hover:bg-destructive/10"
                    >
                      <FiTrash2 size={14} /> Delete
                    </button>
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
                  {formatBirthday(m) && (
                    <p className="text-xs text-accent">Birthday: {formatBirthday(m)}</p>
                  )}
                  <p className="text-xs text-muted">
                    Role: {m.role} | Joined{" "}
                    {new Date(m.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  {m.role !== "ADMIN" ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateMember(m.id, { role: "ADMIN" })}
                    >
                      Make Admin
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateMember(m.id, { role: "MEMBER" })}
                    >
                      Remove Admin
                    </Button>
                  )}
                  <button
                    onClick={() => deleteMember(m.id, m.name)}
                    className="flex items-center gap-1 rounded-lg border border-destructive/30 px-3 py-1.5 text-sm text-destructive transition hover:bg-destructive/10"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
