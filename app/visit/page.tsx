"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function VisitPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    guests: "1",
    questions: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/visit", {
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
          Plan Your Visit
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/70">
          We&apos;d love to welcome you to Goshen Cathedral
        </p>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Info */}
            <div>
              <h2 className="mb-4 font-serif text-2xl font-bold text-primary">
                What to Expect
              </h2>
              <div className="space-y-4 text-sm text-foreground/70 leading-relaxed">
                <div className="rounded-lg bg-muted-light p-4">
                  <h3 className="mb-1 font-semibold text-primary">Dress Code</h3>
                  <p>Members worship in white sutana (robes). First-time visitors are welcome to come in modest, clean attire. White clothing is encouraged but not required for visitors.</p>
                </div>
                <div className="rounded-lg bg-muted-light p-4">
                  <h3 className="mb-1 font-semibold text-primary">Barefoot Worship</h3>
                  <p>We remove our shoes before entering the sanctuary, as it is holy ground. Shoe racks are provided at the entrance.</p>
                </div>
                <div className="rounded-lg bg-muted-light p-4">
                  <h3 className="mb-1 font-semibold text-primary">Service Length</h3>
                  <p>Sunday service runs from 10:00 AM to approximately 1:00 PM. Services include prayers, hymns, Bible reading, sermon, and prophetic session.</p>
                </div>
                <div className="rounded-lg bg-muted-light p-4">
                  <h3 className="mb-1 font-semibold text-primary">Location</h3>
                  <p>441 Rubidge Street, Peterborough, ON. Free parking available.</p>
                </div>
              </div>
            </div>

            {/* Registration form */}
            <div>
              <h2 className="mb-4 font-serif text-2xl font-bold text-primary">
                Register Your Visit
              </h2>
              {submitted ? (
                <Card className="p-8 text-center">
                  <div className="mb-4 text-4xl">&#127881;</div>
                  <h3 className="mb-2 font-serif text-xl font-bold text-primary">
                    Welcome!
                  </h3>
                  <p className="text-muted">
                    Thank you for registering. We look forward to welcoming
                    you to Goshen Cathedral. Someone from our welcoming team
                    will reach out to you. God bless!
                  </p>
                </Card>
              ) : (
                <Card className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="vname" className="mb-1 block text-sm font-medium">Name</label>
                      <input id="vname" type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent" />
                    </div>
                    <div>
                      <label htmlFor="vemail" className="mb-1 block text-sm font-medium">Email</label>
                      <input id="vemail" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent" />
                    </div>
                    <div>
                      <label htmlFor="vphone" className="mb-1 block text-sm font-medium">Phone</label>
                      <input id="vphone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent" />
                    </div>
                    <div>
                      <label htmlFor="vdate" className="mb-1 block text-sm font-medium">Planned Visit Date</label>
                      <input id="vdate" type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent" />
                    </div>
                    <div>
                      <label htmlFor="vguests" className="mb-1 block text-sm font-medium">Number of Guests</label>
                      <select id="vguests" value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent">
                        {[1, 2, 3, 4, 5, "6+"].map((n) => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="vquestions" className="mb-1 block text-sm font-medium">Questions (optional)</label>
                      <textarea id="vquestions" rows={3} value={form.questions} onChange={(e) => setForm({ ...form, questions: e.target.value })} className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent" />
                    </div>
                    <Button type="submit" variant="accent" size="lg" className="w-full">
                      Register My Visit
                    </Button>
                  </form>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
