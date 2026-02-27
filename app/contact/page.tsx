"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { FiMapPin, FiPhone, FiMail, FiClock } from "react-icons/fi";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/contact", {
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
          Contact Us
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/70">
          We&apos;d love to hear from you
        </p>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact form */}
            <div>
              <h2 className="mb-6 font-serif text-2xl font-bold text-primary">
                Send us a Message
              </h2>

              {submitted ? (
                <Card>
                  <p className="text-center text-lg font-medium text-success">
                    Thank you! We&apos;ll be in touch soon. God bless you.
                  </p>
                </Card>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1 block text-sm font-medium text-foreground"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1 block text-sm font-medium text-foreground"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-1 block text-sm font-medium text-foreground"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>
                  <Button type="submit" variant="accent" size="lg">
                    Send Message
                  </Button>
                </form>
              )}
            </div>

            {/* Info cards */}
            <div className="space-y-6">
              <Card>
                <div className="flex items-start gap-4">
                  <FiMapPin className="mt-1 text-accent" size={20} />
                  <div>
                    <h3 className="font-semibold text-primary">Address</h3>
                    <p className="text-sm text-muted">
                      Goshen Cathedral<br />
                      Celestial Church of Christ<br />
                      441 Rubidge Street<br />
                      Peterborough, ON<br />
                      Arch Diocese of Canada
                    </p>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-start gap-4">
                  <FiPhone className="mt-1 text-accent" size={20} />
                  <div>
                    <h3 className="font-semibold text-primary">Phone</h3>
                    <p className="text-sm text-muted">Contact the parish office</p>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-start gap-4">
                  <FiMail className="mt-1 text-accent" size={20} />
                  <div>
                    <h3 className="font-semibold text-primary">Email</h3>
                    <p className="text-sm text-muted">
                      info@cccgoshencathedral.ca
                    </p>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-start gap-4">
                  <FiClock className="mt-1 text-accent" size={20} />
                  <div>
                    <h3 className="font-semibold text-primary">Service Times</h3>
                    <p className="text-sm text-muted">
                      Sunday: 10:00 AM – 1:00 PM — Main Service<br />
                      Wednesday: 9:00 AM (Seeker) & 6:00 PM (Mercy)<br />
                      Friday: 8:00 PM — Special Service<br />
                      1st Thursday: 10:00 PM – 1:00 AM — New Moon Service<br />
                      Saturday: 7:00 AM — Sanctuary Cleaning
                    </p>
                  </div>
                </div>
              </Card>

              {/* Map */}
              <div className="h-64 overflow-hidden rounded-xl">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2838.5!2d-78.3197!3d44.3001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s441+Rubidge+Street%2C+Peterborough%2C+ON!5e0!3m2!1sen!2sca!4v1"
                  className="h-full w-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Goshen Cathedral Location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
