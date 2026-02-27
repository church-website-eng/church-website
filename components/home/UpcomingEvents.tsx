import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/ui/FadeIn";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import type { ChurchEvent } from "@/types";
import { formatDate } from "@/lib/utils";

const placeholderEvents: ChurchEvent[] = [
  {
    id: "1",
    title: "Monthly Thanksgiving Service",
    date: "2026-03-08T10:00:00Z",
    location: "Goshen Cathedral",
    description: "Join the entire parish for our monthly thanksgiving and harvest celebration unto the Lord.",
    slug: "monthly-thanksgiving",
    registrationEnabled: false,
  },
  {
    id: "2",
    title: "Easter Revival Week",
    date: "2026-03-30T19:00:00Z",
    location: "Goshen Cathedral",
    description: "A week of intensive prayer, fasting, and revival services leading up to Easter.",
    slug: "easter-revival-week",
    registrationEnabled: false,
  },
  {
    id: "3",
    title: "Youth Fellowship & Outreach",
    date: "2026-04-11T09:00:00Z",
    location: "Parish Hall",
    description: "Young members come together for fellowship, community outreach, and spiritual development.",
    slug: "youth-outreach",
    registrationEnabled: true,
  },
];

interface Props {
  events?: ChurchEvent[];
}

export default function UpcomingEvents({ events }: Props) {
  const items = events && events.length > 0 ? events.slice(0, 3) : placeholderEvents;

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="font-serif text-3xl font-bold text-primary">
            Upcoming Events
          </h2>
          <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-gold" />
          <p className="mt-3 text-muted">
            What&apos;s happening at Goshen Cathedral
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((event, i) => (
            <FadeIn key={event.id} delay={i * 120}>
              <Card className="flex flex-col h-full">
                <h3 className="mb-2 font-serif text-lg font-bold text-primary">
                  {event.title}
                </h3>
                <div className="mb-1 flex items-center gap-2 text-sm text-muted">
                  <FiCalendar size={14} />
                  <span>{formatDate(event.date)}</span>
                </div>
                <div className="mb-3 flex items-center gap-2 text-sm text-muted">
                  <FiMapPin size={14} />
                  <span>{event.location}</span>
                </div>
                <p className="mb-4 flex-1 text-sm text-foreground/70">
                  {event.description}
                </p>
                <Link
                  href={`/events/${event.slug}`}
                  className="text-sm font-medium text-accent hover:underline"
                >
                  Learn More &rarr;
                </Link>
              </Card>
            </FadeIn>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button href="/events" variant="outline">
            View All Events
          </Button>
        </div>
      </div>
    </section>
  );
}
