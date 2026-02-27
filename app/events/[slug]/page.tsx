import { getEventBySlug } from "@/lib/contentful";
import { formatDate } from "@/lib/utils";
import Button from "@/components/ui/Button";
import { FiCalendar, FiMapPin } from "react-icons/fi";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  const data = event || {
    title: slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" "),
    date: "2026-03-15",
    location: "Holy Trinity Church",
    description:
      "Event details will appear here when content is added through Contentful CMS. Check back soon for more information about this event.",
    registrationEnabled: false,
  };

  if (!data) notFound();

  return (
    <>
      <section className="bg-primary py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="font-serif text-3xl font-bold md:text-4xl">
            {data.title}
          </h1>
          <div className="mt-4 flex items-center justify-center gap-6 text-white/70">
            <span className="flex items-center gap-2">
              <FiCalendar size={16} />
              {formatDate(data.date)}
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
          <div className="prose max-w-none text-foreground/70 leading-relaxed">
            <p>{data.description}</p>
          </div>

          <div className="mt-8 flex gap-3">
            {data.registrationEnabled && (
              <Button variant="accent">Register for this Event</Button>
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
