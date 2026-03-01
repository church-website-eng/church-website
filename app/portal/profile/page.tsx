"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { FiCheck, FiEdit2 } from "react-icons/fi";

const monthNames = [
  "", "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

interface Profile {
  id: string;
  name: string;
  email: string;
  birthMonth: number | null;
  birthDay: number | null;
  createdAt: string;
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Edit fields
  const [name, setName] = useState("");
  const [birthMonth, setBirthMonth] = useState(0);
  const [birthDay, setBirthDay] = useState(0);

  // Password fields
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/portal/login");
      return;
    }
    if (status === "authenticated") {
      fetch("/api/portal/profile")
        .then((r) => r.json())
        .then((data) => {
          setProfile(data);
          setName(data.name || "");
          setBirthMonth(data.birthMonth || 0);
          setBirthDay(data.birthDay || 0);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [status, router]);

  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSuccess("");

    const body: Record<string, unknown> = {
      name,
      birthMonth,
      birthDay,
    };

    if (showPassword && newPassword) {
      if (newPassword !== confirmPassword) {
        setError("Passwords do not match.");
        setSaving(false);
        return;
      }
      body.currentPassword = currentPassword;
      body.newPassword = newPassword;
    }

    const res = await fetch("/api/portal/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      const updated = await res.json();
      setProfile(updated);
      setEditing(false);
      setShowPassword(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setSuccess("Profile updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } else {
      const err = await res.json();
      setError(err.error || "Failed to update profile.");
    }
    setSaving(false);
  };

  if (loading || status === "loading") {
    return <p className="py-20 text-center text-muted">Loading...</p>;
  }

  if (!profile) {
    return <p className="py-20 text-center text-muted">Could not load profile.</p>;
  }

  const inputClass =
    "w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";

  return (
    <>
      <section className="bg-primary py-16 text-center text-white">
        <h1 className="font-serif text-3xl font-bold md:text-4xl">
          My Profile
        </h1>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-2xl px-4">
          {success && (
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700 border border-green-200">
              <FiCheck size={16} /> {success}
            </div>
          )}
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 border border-red-200">
              {error}
            </div>
          )}

          <Card className="p-8">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
                  {profile.name.charAt(0)}
                </div>
                <div>
                  <h2 className="font-serif text-xl font-bold text-primary">
                    {profile.name}
                  </h2>
                  <p className="text-sm text-muted">{profile.email}</p>
                </div>
              </div>
              {!editing && (
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted-light"
                >
                  <FiEdit2 size={14} /> Edit
                </button>
              )}
            </div>

            <div className="space-y-5 border-t border-border pt-6">
              {/* Name */}
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted">
                  Full Name
                </label>
                {editing ? (
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                  />
                ) : (
                  <p className="text-foreground">{profile.name}</p>
                )}
              </div>

              {/* Email (read-only) */}
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted">
                  Email
                </label>
                <p className="text-foreground">{profile.email}</p>
              </div>

              {/* Birthday */}
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted">
                  Birthday
                </label>
                {editing ? (
                  <div className="grid gap-3 sm:grid-cols-2">
                    <select
                      value={birthMonth}
                      onChange={(e) => setBirthMonth(Number(e.target.value))}
                      className={inputClass}
                    >
                      <option value={0}>Select month</option>
                      {monthNames.slice(1).map((m, i) => (
                        <option key={i + 1} value={i + 1}>{m}</option>
                      ))}
                    </select>
                    <select
                      value={birthDay}
                      onChange={(e) => setBirthDay(Number(e.target.value))}
                      className={inputClass}
                    >
                      <option value={0}>Select day</option>
                      {Array.from({ length: 31 }, (_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <p className="text-foreground">
                    {profile.birthMonth && profile.birthDay
                      ? `${monthNames[profile.birthMonth]} ${profile.birthDay}`
                      : "Not set"}
                  </p>
                )}
              </div>

              {/* Member since */}
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted">
                  Member Since
                </label>
                <p className="text-foreground">
                  {new Date(profile.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                  })}
                </p>
              </div>

              {/* Password change */}
              {editing && (
                <div className="border-t border-border pt-5">
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-sm font-semibold text-accent hover:underline"
                  >
                    {showPassword ? "Cancel Password Change" : "Change Password"}
                  </button>
                  {showPassword && (
                    <div className="mt-4 space-y-3">
                      <div>
                        <label className="mb-1 block text-sm font-medium">Current Password</label>
                        <input
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium">New Password</label>
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className={inputClass}
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium">Confirm New Password</label>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className={inputClass}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-3">
              {editing ? (
                <>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="rounded-lg bg-accent px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-light disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    onClick={() => {
                      setEditing(false);
                      setShowPassword(false);
                      setError("");
                      setName(profile.name);
                      setBirthMonth(profile.birthMonth || 0);
                      setBirthDay(profile.birthDay || 0);
                      setCurrentPassword("");
                      setNewPassword("");
                      setConfirmPassword("");
                    }}
                    className="rounded-lg border border-border px-6 py-2.5 text-sm font-medium transition hover:bg-muted-light"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <Button href="/portal" variant="secondary">
                  &larr; Back to Dashboard
                </Button>
              )}
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}
