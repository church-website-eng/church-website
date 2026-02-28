import { getEventBySlug } from "@/lib/contentful";
import { getContent } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import Button from "@/components/ui/Button";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

interface DBEvent {
  title: string;
  date: string;
  time?: string;
  location: string;
  description: string;
  slug: string;
  imageUrl?: string;
  registrationUrl?: string;
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;

  // Check DB first
  const dbEvents = await getContent<{ events: DBEvent[] }>("events", { events: [] });
  const dbEvent = dbEvents.events.find((e) => e.slug === slug);

  // Try Contentful as fallback
  const contentfulEvent = !dbEvent ? await getEventBySlug(slug) : null;

  const data = dbEvent || contentfulEvent || null;

  if (!data) notFound();

  return (
    <>
      <section className="bg-primary py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          {(data as DBEvent).imageUrl && (
            <img
              src={(data as DBEvent).imageUrl}
              alt={data.title}
              className="mx-auto mb-6 max-h-64 rounded-xl object-cover"
            />
          )}
          <h1 className="font-serif text-3xl font-bold md:text-4xl">
            {data.title}
          </h1>
          <div className="mt-4 flex items-center justify-center gap-6 text-white/70">
            <span className="flex items-center gap-2">
              <FiCalendar size={16} />
              {formatDate(data.date)}
              {(data as DBEvent).time && ` — ${(data as DBEvent).time}`}
            </span>
            <span className="flex items-center gap-2">
              <FiMapPin size={16} />
              {data.location}
            </span>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-4xl px-4">
          <div className="prose max-w-none text-foreground/70 leading-relaxed whitespace-pre-line">
            <p>{data.description}</p>
          </div>

          <div className="mt-8 flex gap-3">
            {(data as DBEvent).registrationUrl && (
              <Button
                href={(data as DBEvent).registrationUrl!}
                variant="accent"
                target="_blank"
              >
                Register for this Event
              </Button>
            )}
            <Button href="/events" variant="secondary">
              &larr; All Events
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
