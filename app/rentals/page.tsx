"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { FiUsers, FiCheck, FiMapPin, FiPhone, FiMail, FiCalendar } from "react-icons/fi";

const halls = [
  {
    name: "Main Hall",
    capacity: 200,
    rate: "$75/hr or $500/day",
    description:
      "A spacious, elegant hall ideal for weddings, receptions, banquets, community events, and large gatherings. Features a stage area, sound system, and ample seating.",
    amenities: [
      "Stage area with podium",
      "Sound system & microphone",
      "Tables & chairs (up to 200 guests)",
      "Kitchen access",
      "Wheelchair accessible",
      "Free parking",
      "Air conditioning & heating",
    ],
  },
  {
    name: "Meeting Room",
    capacity: 40,
    rate: "$40/hr or $250/day",
    description:
      "A comfortable, well-lit meeting room perfect for workshops, Bible studies, small group meetings, birthday parties, and business presentations.",
    amenities: [
      "Tables & chairs (up to 40 guests)",
      "Whiteboard & projector screen",
      "Wi-Fi access",
      "Kitchenette nearby",
      "Wheelchair accessible",
      "Free parking",
      "Air conditioning & heating",
    ],
  },
];

export default function RentalsPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    hall: halls[0].name,
    date: "",
    startTime: "",
    endTime: "",
    guests: "",
    eventType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/rentals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch {
      // handled silently
    }
    setLoading(false);
    setSubmitted(true);
  };

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <>
      <section className="bg-primary py-20 text-center text-white">
        <h1 className="font-serif text-4xl font-bold md:text-5xl">
          Hall Rentals
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/70">
          Beautiful, affordable spaces for your next event at Goshen Cathedral
        </p>
      </section>

      {/* Spaces */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="font-serif text-3xl font-bold text-primary">
              Our Spaces
            </h2>
            <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-gold" />
            <p className="mt-3 text-muted">
              Two versatile spaces to suit events of any size
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {halls.map((hall) => (
              <Card key={hall.name} className="flex flex-col">
                {/* Header */}
                <div className="mb-4 rounded-lg bg-primary/5 p-4 text-center">
                  <h3 className="font-serif text-2xl font-bold text-primary">
                    {hall.name}
                  </h3>
                  <div className="mt-2 flex items-center justify-center gap-2 text-sm text-muted">
                    <FiUsers size={16} />
                    <span>Up to {hall.capacity} guests</span>
                  </div>
                  <p className="mt-2 text-lg font-bold text-gold">
                    {hall.rate}
                  </p>
                </div>

                {/* Description */}
                <p className="mb-4 text-sm text-foreground/70 leading-relaxed">
                  {hall.description}
                </p>

                {/* Amenities */}
                <div className="mt-auto">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">
                    Amenities
                  </p>
                  <ul className="space-y-1.5">
                    {hall.amenities.map((amenity) => (
                      <li
                        key={amenity}
                        className="flex items-center gap-2 text-sm text-foreground/70"
                      >
                        <FiCheck size={14} className="shrink-0 text-success" />
                        {amenity}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Location info */}
      <section className="bg-muted-light py-12">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-foreground/70">
            <span className="flex items-center gap-2">
              <FiMapPin size={16} className="text-accent" />
              441 Rubidge Street, Peterborough, ON
            </span>
            <span className="flex items-center gap-2">
              <FiMail size={16} className="text-accent" />
              info@cccgoshencathedral.ca
            </span>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="py-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="font-serif text-3xl font-bold text-primary">
              Request a Booking
            </h2>
            <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-gold" />
            <p className="mt-3 text-muted">
              Fill out the form below and we&apos;ll get back to you within 24–48 hours
            </p>
          </div>

          {submitted ? (
            <Card className="p-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                <FiCheck className="text-success" size={28} />
              </div>
              <h3 className="mb-2 font-serif text-xl font-bold text-primary">
                Inquiry Received!
              </h3>
              <p className="text-sm text-muted">
                Thank you for your interest in renting our facilities. We will
                review your request and contact you shortly. God bless!
              </p>
            </Card>
          ) : (
            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name & Email */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-primary">
                      Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-primary">
                      Email *
                    </label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>
                </div>

                {/* Phone & Hall */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-primary">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-primary">
                      Space *
                    </label>
                    <select
                      required
                      value={form.hall}
                      onChange={(e) => update("hall", e.target.value)}
                      className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    >
                      {halls.map((h) => (
                        <option key={h.name} value={h.name}>
                          {h.name} (up to {h.capacity} guests — {h.rate})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Date & Times */}
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-primary">
                      Preferred Date *
                    </label>
                    <input
                      required
                      type="date"
                      value={form.date}
                      onChange={(e) => update("date", e.target.value)}
                      className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-primary">
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={form.startTime}
                      onChange={(e) => update("startTime", e.target.value)}
                      className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-primary">
                      End Time
                    </label>
                    <input
                      type="time"
                      value={form.endTime}
                      onChange={(e) => update("endTime", e.target.value)}
                      className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>
                </div>

                {/* Guests & Event Type */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-primary">
                      Expected Guests
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={form.guests}
                      onChange={(e) => update("guests", e.target.value)}
                      placeholder="e.g. 80"
                      className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-primary">
                      Type of Event
                    </label>
                    <input
                      type="text"
                      value={form.eventType}
                      onChange={(e) => update("eventType", e.target.value)}
                      placeholder="e.g. Wedding reception, Meeting"
                      className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="mb-1 block text-sm font-semibold text-primary">
                    Additional Details
                  </label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Any special requirements, setup needs, catering questions, etc."
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
                  {loading ? "Submitting..." : "Submit Inquiry"}
                </Button>
              </form>
            </Card>
          )}
        </div>
      </section>
    </>
  );
}
