"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Link from "next/link";

interface Stats {
  unreadContacts: number;
  totalContacts: number;
  totalPrayers: number;
  totalVisitors: number;
  pendingMembers: number;
  totalMembers: number;
  totalSubscribers: number;
  pendingTestimonies: number;
  totalSacraments: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {});
  }, []);

  if (!stats) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted">Loading dashboard...</p>
      </div>
    );
  }

  const tiles = [
    {
      label: "Unread Contacts",
      value: stats.unreadContacts,
      total: stats.totalContacts,
      href: "/admin/contacts",
      color: "text-blue-600",
    },
    {
      label: "Prayer Requests",
      value: stats.totalPrayers,
      href: "/admin/prayers",
      color: "text-purple-600",
    },
    {
      label: "New Visitors",
      value: stats.totalVisitors,
      href: "/admin/visitors",
      color: "text-green-600",
    },
    {
      label: "Pending Members",
      value: stats.pendingMembers,
      total: stats.totalMembers,
      href: "/admin/members",
      color: "text-amber-600",
    },
    {
      label: "Newsletter Subscribers",
      value: stats.totalSubscribers,
      href: "/admin/newsletter",
      color: "text-teal-600",
    },
    {
      label: "Pending Testimonies",
      value: stats.pendingTestimonies,
      href: "/admin/testimonies",
      color: "text-rose-600",
    },
    {
      label: "Sacrament Requests",
      value: stats.totalSacraments,
      href: "/admin/sacraments",
      color: "text-indigo-600",
    },
  ];

  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl font-bold text-primary">
        Admin Dashboard
      </h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tiles.map((tile) => (
          <Link key={tile.label} href={tile.href}>
            <Card className="p-5 transition-shadow hover:shadow-md">
              <p className="text-sm text-muted">{tile.label}</p>
              <p className={`mt-1 text-3xl font-bold ${tile.color}`}>
                {tile.value}
              </p>
              {tile.total !== undefined && (
                <p className="mt-1 text-xs text-muted">
                  of {tile.total} total
                </p>
              )}
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
