"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const categories = [
  "Healing & Health",
  "Family & Marriage",
  "Financial Breakthrough",
  "Spiritual Growth",
  "Protection & Safety",
  "Thanksgiving",
  "Deliverance",
  "Guidance & Direction",
  "Other",
];

export default function PrayerRequestPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    category: categories[0],
    request: "",
    isPrivate: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/prayer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch {
      // silently handle
    }
    setSubmitted(true);
  };

  return (
    <>
      <section className="bg-primary py-20 text-center text-white">
        <h1 className="font-serif text-4xl font-bold md:text-5xl">
          Prayer Requests
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/70">
          &ldquo;The effectual fervent prayer of a righteous man availeth
          much.&rdquo; &mdash; James 5:16
        </p>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-2xl px-4">
          {submitted ? (
            <Card className="p-8 text-center">
              <div className="mb-4 text-4xl">&#128591;</div>
              <h2 className="mb-2 font-serif text-2xl font-bold text-primary">
                Prayer Request Received
              </h2>
              <p className="text-muted">
                Your request has been submitted. Our prayer warriors will lift
                you up before the Lord. God bless you.
              </p>
              <Button
                onClick={() => {
                  setSubmitted(false);
                  setForm({ name: "", email: "", category: categories[0], request: "", isPrivate: false });
                }}
                variant="outline"
                className="mt-6"
              >
                Submit Another Request
              </Button>
            </Card>
          ) : (
            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="mb-1 block text-sm font-medium text-foreground">
                    Your Name
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
                    Email (optional)
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>
                <div>
                  <label htmlFor="category" className="mb-1 block text-sm font-medium text-foreground">
                    Prayer Category
                  </label>
                  <select
                    id="category"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="request" className="mb-1 block text-sm font-medium text-foreground">
                    Your Prayer Request
                  </label>
                  <textarea
                    id="request"
                    rows={5}
                    required
                    value={form.request}
                    onChange={(e) => setForm({ ...form, request: e.target.value })}
                    className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>
                <label className="flex items-center gap-2 text-sm text-foreground/70">
                  <input
                    type="checkbox"
                    checked={form.isPrivate}
                    onChange={(e) => setForm({ ...form, isPrivate: e.target.checked })}
                    className="rounded border-border"
                  />
                  Keep my request private (only the prayer team will see it)
                </label>
                <Button type="submit" variant="accent" size="lg" className="w-full">
                  Submit Prayer Request
                </Button>
              </form>
            </Card>
          )}
        </div>
      </section>
    </>
  );
}
