import { getSermons } from "@/lib/contentful";
import SermonCard from "@/components/sermons/SermonCard";
import { placeholderSermons } from "@/data/sermons";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sermons",
  description: "Watch and listen to sermons from Celestial Church of Christ, Goshen Cathedral.",
};

export default async function SermonsPage() {
  const sermons = await getSermons(20);
  const items = sermons.length > 0 ? sermons : placeholderSermons;

  return (
    <>
      <section className="bg-primary py-20 text-center text-white">
        <h1 className="font-serif text-4xl font-bold md:text-5xl">Sermons</h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/70">
          Messages that inspire, strengthen, and transform through the Word of God
        </p>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {items.map((sermon) => (
              <SermonCard key={sermon.id} sermon={sermon} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
