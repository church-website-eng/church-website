import { getSermonBySlug, getSermons } from "@/lib/contentful";
import { placeholderSermons } from "@/data/sermons";
import { getContent } from "@/lib/content";
import Button from "@/components/ui/Button";
import ShareButtons from "@/components/ui/ShareButtons";
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function SermonDetailPage({ params }: Props) {
  const { slug } = await params;
  const [sermon, dbData] = await Promise.all([
    getSermonBySlug(slug),
    getContent("sermons", { sermons: [] } as { sermons: { id: string; title: string; speaker: string; date: string; series?: string; slug: string; videoUrl?: string; notes?: string; pdfUrl?: string; audioUrl?: string }[] }),
  ]);

  // Check DB sermons first
  const dbSermon = dbData.sermons.find((s) => s.slug === slug);

  // Fallback: look up placeholder data by slug
  const placeholder = placeholderSermons.find((s) => s.slug === slug);
  const data = dbSermon || sermon || placeholder || {
    title: slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" "),
    speaker: "VSE Kunle Lawal",
    date: "2026-02-22",
    series: undefined as string | undefined,
    videoUrl: "",
    audioUrl: "",
    notes: "Sermon notes will appear here when content is added through Contentful CMS.",
    pdfUrl: "",
    slug,
  };

  if (!data) notFound();

  // Convert YouTube watch URLs to embed format
  let embedUrl = data.videoUrl || "";
  const ytMatch = embedUrl.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/,
  );
  if (ytMatch) {
    embedUrl = `https://www.youtube.com/embed/${ytMatch[1]}`;
  }

  const isLocalVideo =
    embedUrl && (embedUrl.endsWith(".mp4") || embedUrl.startsWith("/videos/"));
  const isEmbed = embedUrl && !isLocalVideo;

  return (
    <>
      <section className="bg-primary py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          {data.series && (
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">
              {data.series}
            </p>
          )}
          <h1 className="font-serif text-3xl font-bold md:text-4xl">
            {data.title}
          </h1>
          <p className="mt-3 text-white/70">
            {data.speaker} &middot; {formatDate(data.date)}
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-4xl px-4">
          {/* Video */}
          <div className="mb-8 aspect-video overflow-hidden rounded-xl bg-black">
            {isLocalVideo ? (
              <video controls preload="metadata" className="h-full w-full">
                <source src={embedUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : isEmbed ? (
              <iframe
                src={embedUrl}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={data.title}
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-primary/10 text-muted">
                <p>Video will be available after the service is streamed.</p>
              </div>
            )}
          </div>

          {/* Notes */}
          {data.notes && (
            <div className="mb-8">
              <h2 className="mb-4 font-serif text-2xl font-bold text-primary">
                Sermon Notes
              </h2>
              <div className="prose max-w-none text-foreground/70 leading-relaxed">
                {data.notes}
              </div>
            </div>
          )}

          {/* Share */}
          <div className="mb-8">
            <ShareButtons title={data.title} />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            {data.pdfUrl && (
              <Button href={data.pdfUrl} variant="outline">
                Download PDF
              </Button>
            )}
            <Button href="/sermons" variant="secondary">
              &larr; All Sermons
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
