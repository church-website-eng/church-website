"use client";

import { useState, useEffect } from "react";
import { FiClock } from "react-icons/fi";

const services = [
  { day: 0, hour: 10, min: 0, label: "Sunday Main Service" },
  { day: 3, hour: 9, min: 0, label: "Wednesday Seeker Service" },
  { day: 3, hour: 18, min: 0, label: "Wednesday Mercy Day Service" },
  { day: 5, hour: 20, min: 0, label: "Friday Special Service" },
  { day: 6, hour: 7, min: 0, label: "Saturday Sanctuary Cleaning" },
];

function getNextService() {
  const now = new Date();
  const nowDay = now.getDay();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  let best = { diff: Infinity, label: "" };

  for (const s of services) {
    const sMinutes = s.hour * 60 + s.min;
    let dayDiff = s.day - nowDay;
    if (dayDiff < 0) dayDiff += 7;
    if (dayDiff === 0 && sMinutes <= nowMinutes) dayDiff = 7;

    const totalMin = dayDiff * 24 * 60 + (sMinutes - nowMinutes);
    if (totalMin < best.diff) {
      best = { diff: totalMin, label: s.label };
    }
  }

  const hours = Math.floor(best.diff / 60);
  const mins = best.diff % 60;

  if (hours >= 24) {
    const days = Math.floor(hours / 24);
    const remHours = hours % 24;
    return { text: `${days}d ${remHours}h ${mins}m`, label: best.label };
  }
  return { text: `${hours}h ${mins}m`, label: best.label };
}

export default function ServiceCountdown() {
  const [next, setNext] = useState<{ text: string; label: string } | null>(null);

  useEffect(() => {
    setNext(getNextService());
    const interval = setInterval(() => setNext(getNextService()), 60000);
    return () => clearInterval(interval);
  }, []);

  if (!next) return null;

  return (
    <div className="bg-gold/10 py-3">
      <div className="mx-auto flex items-center justify-center gap-3 px-4 text-sm">
        <FiClock size={16} className="text-gold" />
        <span className="text-foreground/70">
          Next: <strong className="text-primary">{next.label}</strong> in{" "}
          <strong className="text-gold">{next.text}</strong>
        </span>
      </div>
    </div>
  );
}
