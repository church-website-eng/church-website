import { getContent } from "@/lib/content";
import { defaultShepherdCorner } from "@/data/defaults";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shepherd's Corner",
  description:
    "A word from the Shepherd-in-Charge of CCC Goshen Cathedral. Weekly messages, pastoral reflections, and spiritual guidance.",
};

function getEmbedUrl(url: string) {
  const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([\w-]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  return url;
}

export default async function ShepherdPage() {
  const data = await getContent("shepherd_corner", defaultShepherdCorner);

  return (
    <>
      <section className="bg-primary py-20 text-center text-white">
        <h1 className="font-serif text-4xl font-bold md:text-5xl">
          Shepherd&apos;s Corner
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/70">
          A word from the Shepherd
        </p>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-10 md:flex-row md:items-start">
            {/* Shepherd photo & info */}
            <div className="shrink-0 text-center md:w-64">
              {data.photo ? (
                <img
                  src={data.photo}
                  alt={data.name}
                  className="mx-auto h-48 w-48 rounded-full object-cover border-4 border-gold/30 shadow-lg"
                />
              ) : (
                <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-full bg-primary/10 text-5xl font-bold text-primary">
                  {data.name.charAt(0)}
                </div>
              )}
              <h2 className="mt-5 font-serif text-xl font-bold text-primary">
                {data.name}
              </h2>
              <p className="text-sm text-accent font-semibold">{data.title}</p>
              <p className="mt-3 text-sm text-muted leading-relaxed">{data.bio}</p>
            </div>

            {/* Weekly message + video */}
            <div className="flex-1 space-y-8">
              <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
                <div className="mb-2 text-xs font-bold uppercase tracking-wider text-accent">
                  Weekly Message
                </div>
                <h3 className="mb-5 font-serif text-2xl font-bold text-primary">
                  {data.messageTitle}
                </h3>
                <div
                  className="prose prose-sm max-w-none text-foreground/70 leading-relaxed text-base"
                  dangerouslySetInnerHTML={{ __html: data.messageBody }}
                />
              </div>

              {data.videoUrl && (
                <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
                  <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                    <iframe
                      src={getEmbedUrl(data.videoUrl)}
                      className="absolute inset-0 h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="Shepherd's Video Message"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
