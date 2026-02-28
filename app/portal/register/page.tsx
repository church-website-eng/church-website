"use client";

import { useState } from "react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthMonth: "",
    birthDay: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const daysInMonth = form.birthMonth
    ? new Date(2000, Number(form.birthMonth), 0).getDate()
    : 31;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          birthMonth: form.birthMonth ? Number(form.birthMonth) : null,
          birthDay: form.birthDay ? Number(form.birthDay) : null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed. Please try again.");
      } else {
        setSuccess(true);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="bg-primary py-20 text-center text-white">
        <h1 className="font-serif text-4xl font-bold md:text-5xl">
          Create Account
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/70">
          Join the Goshen Cathedral members portal
        </p>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-md px-4">
          <Card className="p-8">
            {success ? (
              <div className="text-center">
                <div className="mb-4 text-4xl">&#9989;</div>
                <h2 className="mb-2 font-serif text-xl font-bold text-primary">
                  Account Created
                </h2>
                <p className="mb-4 text-muted">
                  Your account is pending approval. A church administrator will
                  review and approve your registration. You will be able to sign
                  in once approved.
                </p>
                <Link href="/portal/login">
                  <Button variant="accent">Back to Sign In</Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <p className="rounded-lg bg-destructive/10 px-4 py-2 text-sm text-destructive">
                    {error}
                  </p>
                )}

                <div>
                  <label htmlFor="name" className="mb-1 block text-sm font-medium text-foreground">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-1 block text-sm font-medium text-foreground">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-foreground">
                    Birthday (Month &amp; Day)
                  </label>
                  <p className="mb-2 text-xs text-muted">
                    We use this for birthday celebrations — year is not required
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <select
                      value={form.birthMonth}
                      onChange={(e) =>
                        setForm({ ...form, birthMonth: e.target.value, birthDay: "" })
                      }
                      className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    >
                      <option value="">Month</option>
                      {months.map((m, i) => (
                        <option key={m} value={i + 1}>
                          {m}
                        </option>
                      ))}
                    </select>
                    <select
                      value={form.birthDay}
                      onChange={(e) =>
                        setForm({ ...form, birthDay: e.target.value })
                      }
                      disabled={!form.birthMonth}
                      className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent disabled:opacity-50"
                    >
                      <option value="">Day</option>
                      {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
                        (d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ),
                      )}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="mb-1 block text-sm font-medium text-foreground">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    required
                    minLength={8}
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                  <p className="mt-1 text-xs text-muted">Minimum 8 characters</p>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium text-foreground">
                    Confirm Password
                  </label>
                  <input
                    id="confirmPassword"
                    type="password"
                    required
                    minLength={8}
                    value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                    className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>

                <Button
                  type="submit"
                  variant="accent"
                  size="lg"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>

                <p className="mt-4 text-center text-sm text-muted">
                  Already have an account?{" "}
                  <Link href="/portal/login" className="text-accent hover:underline">
                    Sign in
                  </Link>
                </p>
              </form>
            )}
          </Card>
        </div>
      </section>
    </>
  );
}
