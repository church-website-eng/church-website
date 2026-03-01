import Button from "@/components/ui/Button";
import type { Sermon } from "@/types";
import { formatDate } from "@/lib/utils";

interface Props {
  sermon?: Sermon | null;
}

export default function LatestSermon({ sermon }: Props) {
  const title = sermon?.title || "Sermon by the Shepherd";
  const speaker = sermon?.speaker || "VSE Kunle Lawal";
  const date = sermon?.date ? formatDate(sermon.date) : "February 26, 2026";
  let videoUrl = sermon?.videoUrl || "";

  // Convert YouTube watch URLs to embed format
  const ytMatch = videoUrl.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([\w-]+)/);
  if (ytMatch) {
    videoUrl = `https://www.youtube.com/embed/${ytMatch[1]}`;
  }

  return (
    <section className="bg-muted-light py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="font-serif text-3xl font-bold text-primary">
            Latest Sermon
          </h2>
          <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-gold" />
          <p className="mt-3 text-muted">
            Catch up on the most recent message
          </p>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-2">
          {/* Video */}
          <div className="aspect-video overflow-hidden rounded-xl bg-primary/10 shadow-lg">
            {videoUrl && videoUrl.startsWith("http") ? (
              <iframe
                src={videoUrl}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={title}
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-primary/20 to-primary/5">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-white shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </div>
                <p className="text-sm font-medium text-muted">Video coming soon</p>
              </div>
            )}
          </div>

          {/* Sermon info */}
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">
              {date}
            </p>
            <h3 className="mb-2 font-serif text-2xl font-bold text-primary">
              {title}
            </h3>
            <p className="mb-4 text-muted">{speaker}</p>
            {sermon?.series && (
              <p className="mb-4 text-sm text-foreground/60">
                Series: {sermon.series}
              </p>
            )}
            <div className="flex gap-3">
              <Button
                href={sermon ? `/sermons/${sermon.slug}` : "/sermons"}
                variant="accent"
              >
                Watch Now
              </Button>
              <Button href="/sermons" variant="outline">
                All Sermons
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
