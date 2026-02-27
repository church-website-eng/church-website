"use client";

import { useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

interface Testimony {
  id: string;
  name: string;
  body: string;
  createdAt: string;
}

const fallbackTestimonies: Testimony[] = [
  {
    id: "1",
    name: "Brother Ayo",
    body: "I came to Goshen Cathedral seeking healing for a chronic illness that doctors said had no cure. Through the fervent prayers of the church and the grace of God, I received complete healing within three months. To God be the glory!",
    createdAt: "2026-02-01",
  },
  {
    id: "2",
    name: "Sister Folake",
    body: "After seven years of waiting, God blessed my family with twins. The Shepherd-in-Charge and the prayer warriors never stopped praying for us. I testify that the God of Celestial Church is alive!",
    createdAt: "2026-01-01",
  },
  {
    id: "3",
    name: "Brother Emmanuel",
    body: "I was facing a very difficult situation at work and was on the verge of losing my job. Through the Mercy Day Service prayers, God intervened and not only did I keep my job, but I received a promotion. God is faithful!",
    createdAt: "2025-12-01",
  },
];

function formatMonth(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export default function TestimoniesPage() {
  const [testimonies, setTestimonies] = useState<Testimony[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", testimony: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/testimonies")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setTestimonies(data);
        } else {
          setTestimonies(fallbackTestimonies);
        }
      })
      .catch(() => setTestimonies(fallbackTestimonies));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/testimonies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, testimony: form.testimony }),
      });

      if (res.ok) {
        setSubmitted(true);
        setForm({ name: "", testimony: "" });
      }
    } catch {
      // silently fail
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="bg-primary py-20 text-center text-white">
        <h1 className="font-serif text-4xl font-bold md:text-5xl">
          Testimonies
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/70">
          &ldquo;Let the redeemed of the Lord say so.&rdquo; &mdash; Psalm 107:2
        </p>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <Button onClick={() => setShowForm(!showForm)} variant="accent">
              {showForm ? "View Testimonies" : "Share Your Testimony"}
            </Button>
          </div>

          {showForm ? (
            <Card className="mx-auto max-w-2xl p-8">
              {submitted ? (
                <div className="text-center">
                  <div className="mb-4 text-4xl">&#10024;</div>
                  <h2 className="mb-2 font-serif text-xl font-bold text-primary">
                    Thank You!
                  </h2>
                  <p className="text-muted">
                    Your testimony has been submitted for review. It will be
                    published after approval. God bless you!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="tname" className="mb-1 block text-sm font-medium text-foreground">
                      Your Name
                    </label>
                    <input
                      id="tname"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>
                  <div>
                    <label htmlFor="ttestimony" className="mb-1 block text-sm font-medium text-foreground">
                      Your Testimony
                    </label>
                    <textarea
                      id="ttestimony"
                      rows={6}
                      required
                      value={form.testimony}
                      onChange={(e) => setForm({ ...form, testimony: e.target.value })}
                      className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="accent"
                    size="lg"
                    className="w-full"
                    disabled={submitting}
                  >
                    {submitting ? "Submitting..." : "Submit Testimony"}
                  </Button>
                </form>
              )}
            </Card>
          ) : (
            <div className="space-y-6">
              {testimonies.map((t) => (
                <Card key={t.id}>
                  <p className="mb-4 text-foreground/70 leading-relaxed italic">
                    &ldquo;{t.body}&rdquo;
                  </p>
                  <div className="flex items-center justify-between border-t border-border pt-3">
                    <span className="font-semibold text-primary">{t.name}</span>
                    <span className="text-xs text-muted">{formatMonth(t.createdAt)}</span>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
