"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function LiveBadge() {
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const check = () =>
      fetch("/api/content/live")
        .then((r) => r.json())
        .then((res) => { if (res.value) setIsLive(!!res.value.isLive); })
        .catch(() => {});

    check();
    // Re-check every 60 seconds
    const interval = setInterval(check, 60_000);
    return () => clearInterval(interval);
  }, []);

  if (!isLive) return null;

  return (
    <Link
      href="/live"
      className="flex items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-red-600 hover:scale-105 animate-pulse"
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
      </span>
      LIVE
    </Link>
  );
}
