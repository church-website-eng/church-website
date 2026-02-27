"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {
      // silently handle
    }
    setSubscribed(true);
  };

  return (
    <section className="bg-primary py-12">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="mb-2 font-serif text-2xl font-bold text-white">
          Stay Connected
        </h2>
        <p className="mb-6 text-sm text-white/70">
          Subscribe to our weekly newsletter for announcements, sermon
          highlights, and upcoming events.
        </p>

        {subscribed ? (
          <p className="rounded-full bg-white/10 px-6 py-3 text-sm font-medium text-gold">
            Thank you! You&apos;re now subscribed. God bless!
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <input
              type="email"
              required
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm text-white placeholder-white/50 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold sm:w-80"
            />
            <Button type="submit" variant="accent" size="md">
              Subscribe
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
