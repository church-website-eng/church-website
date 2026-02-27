import { getEvents } from "@/lib/contentful";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import { formatDate } from "@/lib/utils";
import type { ChurchEvent } from "@/types";
import type { Metadata } from "next";
import Link from "next/link";

const placeholderEvents: ChurchEvent[] = [
  { id: "1", title: "Monthly Thanksgiving Service", date: "2026-03-08T10:00:00Z", location: "Goshen Cathedral", description: "A special service of thanksgiving, praise, and offering unto the Lord.", slug: "monthly-thanksgiving", registrationEnabled: false },
  { id: "2", title: "Easter Revival Week", date: "2026-03-30T19:00:00Z", location: "Goshen Cathedral", description: "A week of intensive prayer, fasting, and revival services leading up to Easter.", slug: "easter-revival-week", registrationEnabled: false },
  { id: "3", title: "Youth Fellowship & Outreach", date: "2026-04-11T09:00:00Z", location: "Parish Hall", description: "Young members come together for fellowship, outreach, and spiritual development.", slug: "youth-outreach", registrationEnabled: true },
  { id: "4", title: "Harvest & Convention", date: "2026-04-25T10:00:00Z", location: "Goshen Cathedral", description: "Annual harvest thanksgiving and convention celebration with special guests.", slug: "harvest-convention", registrationEnabled: true },
  { id: "5", title: "Women's Fellowship Day", date: "2026-05-09T10:00:00Z", location: "Goshen Cathedral", description: "A day dedicated to the women of the church for prayer, teaching, and fellowship.", slug: "womens-fellowship", registrationEnabled: false },
  { id: "6", title: "Children's Day Celebration", date: "2026-05-23T10:00:00Z", location: "Goshen Cathedral", description: "Celebrating our children with special programs, songs, and activities.", slug: "childrens-day", registrationEnabled: false },
];

export const metadata: Metadata = {
  title: "Events",
  description: "Upcoming events and church activities at CCC Goshen Cathedral.",
};

export default async function EventsPage() {
  const events = await getEvents(20);
  const items = events.length > 0 ? events : placeholderEvents;

  return (
    <>
      <section className="bg-primary py-20 text-center text-white">
        <h1 className="font-serif text-4xl font-bold md:text-5xl">Events</h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/70">
          Gather, worship, and grow together
        </p>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((event) => (
              <Card key={event.id} className="flex flex-col">
                {event.image && (
                  <img
                    src={event.image}
                    alt={event.title}
                    className="mb-4 h-40 w-full rounded-lg object-cover"
                  />
                )}
                <h3 className="mb-2 font-serif text-lg font-bold text-primary">
                  <Link href={`/events/${event.slug}`} className="hover:underline">
                    {event.title}
                  </Link>
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
                {event.registrationEnabled && (
                  <Button
                    href={`/events/${event.slug}`}
                    variant="accent"
                    size="sm"
                  >
                    Register
                  </Button>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
