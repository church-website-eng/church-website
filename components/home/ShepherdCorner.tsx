import { getContent } from "@/lib/content";
import { defaultShepherdCorner } from "@/data/defaults";

function getEmbedUrl(url: string) {
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  return url;
}

export default async function ShepherdCorner() {
  const data = await getContent("shepherd_corner", defaultShepherdCorner);

  return (
    <section className="py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-10 text-center font-serif text-3xl font-bold text-primary">
          Shepherd&apos;s Corner
        </h2>

        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
          {/* Shepherd photo & info */}
          <div className="shrink-0 text-center md:w-56">
            {data.photo ? (
              <img
                src={data.photo}
                alt={data.name}
                className="mx-auto h-40 w-40 rounded-full object-cover border-4 border-gold/30 shadow-lg"
              />
            ) : (
              <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-full bg-primary/10 text-4xl font-bold text-primary">
                {data.name.charAt(0)}
              </div>
            )}
            <h3 className="mt-4 font-serif text-lg font-bold text-primary">
              {data.name}
            </h3>
            <p className="text-sm text-accent font-semibold">{data.title}</p>
            <p className="mt-2 text-xs text-muted leading-relaxed">{data.bio}</p>
          </div>

          {/* Weekly message + video */}
          <div className="flex-1 space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
              <div className="mb-1 text-xs font-bold uppercase tracking-wider text-accent">
                Weekly Message
              </div>
              <h3 className="mb-4 font-serif text-xl font-bold text-primary">
                {data.messageTitle}
              </h3>
              <div className="text-foreground/70 leading-relaxed whitespace-pre-line">
                {data.messageBody}
              </div>
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
  );
}
