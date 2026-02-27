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
  const videoUrl = sermon?.videoUrl || "";

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
          <div className="aspect-video overflow-hidden rounded-xl bg-black shadow-lg">
            {videoUrl ? (
              <iframe
                src={videoUrl}
                className="h-full w-full"
                allowFullScreen
                title={title}
              />
            ) : (
              <video
                controls
                preload="metadata"
                className="h-full w-full"
                poster="/images/head-of-church.jpeg"
              >
                <source src="/videos/sermon-shepherd.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
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
