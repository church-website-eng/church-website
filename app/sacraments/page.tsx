"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const sacramentTypes = [
  { value: "baptism", label: "Baptism (Immersion)", description: "Full immersion baptism in the name of the Father, Son, and Holy Spirit." },
  { value: "wedding", label: "Holy Matrimony (Wedding)", description: "Celestial wedding ceremony conducted according to CCC rites and traditions." },
  { value: "naming", label: "Naming Ceremony", description: "Dedication and naming of newborn children before God and the congregation." },
  { value: "burial", label: "Burial / Funeral Service", description: "Christian burial rites conducted according to CCC traditions." },
  { value: "thanksgiving", label: "Special Thanksgiving", description: "Personal or family thanksgiving service for God's blessings." },
];

export default function SacramentsPage() {
  const [selected, setSelected] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", details: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/sacraments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type: selected }),
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
          Sacraments & Ceremonies
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/70">
          Request a baptism, wedding, naming ceremony, or other sacred rites
        </p>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Types */}
          <div className="mb-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sacramentTypes.map((s) => (
              <Card
                key={s.value}
                className={`cursor-pointer transition ${selected === s.value ? "ring-2 ring-accent border-accent" : "hover:border-accent/50"}`}
              >
                <button onClick={() => setSelected(s.value)} className="w-full text-left">
                  <h3 className="mb-1 font-serif text-base font-bold text-primary">{s.label}</h3>
                  <p className="text-xs text-foreground/70">{s.description}</p>
                </button>
              </Card>
            ))}
          </div>

          {/* Request form */}
          {selected && !submitted && (
            <Card className="mx-auto max-w-2xl p-8">
              <h2 className="mb-4 font-serif text-xl font-bold text-primary">
                Request: {sacramentTypes.find((s) => s.value === selected)?.label}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="sname" className="mb-1 block text-sm font-medium">Full Name</label>
                  <input id="sname" type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="semail" className="mb-1 block text-sm font-medium">Email</label>
                    <input id="semail" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent" />
                  </div>
                  <div>
                    <label htmlFor="sphone" className="mb-1 block text-sm font-medium">Phone</label>
                    <input id="sphone" type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent" />
                  </div>
                </div>
                <div>
                  <label htmlFor="sdate" className="mb-1 block text-sm font-medium">Preferred Date</label>
                  <input id="sdate" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent" />
                </div>
                <div>
                  <label htmlFor="sdetails" className="mb-1 block text-sm font-medium">Additional Details</label>
                  <textarea id="sdetails" rows={4} value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent" />
                </div>
                <Button type="submit" variant="accent" size="lg" className="w-full">Submit Request</Button>
              </form>
            </Card>
          )}

          {submitted && (
            <Card className="mx-auto max-w-2xl p-8 text-center">
              <div className="mb-4 text-4xl">&#10003;</div>
              <h2 className="mb-2 font-serif text-xl font-bold text-primary">Request Submitted</h2>
              <p className="text-muted">The Shepherd-in-Charge will review your request and contact you. God bless!</p>
            </Card>
          )}
        </div>
      </section>
    </>
  );
}
