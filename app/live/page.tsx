import Link from "next/link";
import Card from "@/components/ui/Card";
import { FiClock, FiYoutube, FiFacebook } from "react-icons/fi";
import { getContent } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Stream",
  description: "Watch Goshen Cathedral church services live on YouTube and Facebook.",
};

interface LiveSettings {
  youtubeChannelUrl: string;
  facebookPageUrl: string;
  currentStreamUrl: string;
  isLive: boolean;
}

const defaultLive: LiveSettings = {
  youtubeChannelUrl: "https://www.youtube.com/@CelestialChurchGoshen",
  facebookPageUrl: "https://www.facebook.com/celestialchurchofchristayomotherparish",
  currentStreamUrl: "",
  isLive: false,
};

function getEmbedUrl(url: string): { type: "youtube" | "facebook"; src: string } | null {
  if (!url) return null;

  // YouTube: extract video ID
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/live\/)([a-zA-Z0-9_-]+)/);
  if (ytMatch) {
    return { type: "youtube", src: `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1` };
  }

  // Facebook video
  if (url.includes("facebook.com")) {
    return { type: "facebook", src: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&autoplay=true` };
  }

  return null;
}

export default async function LivePage() {
  const live = await getContent("live", defaultLive);
  const embed = getEmbedUrl(live.currentStreamUrl);

  return (
    <>
      <section className="bg-primary py-20 text-center text-white">
        <div className="flex items-center justify-center gap-3">
          {live.isLive && (
            <span className="flex items-center gap-2 rounded-full bg-red-500 px-4 py-1 text-sm font-bold uppercase tracking-wider">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
              </span>
              Live Now
            </span>
          )}
        </div>
        <h1 className="mt-4 font-serif text-4xl font-bold md:text-5xl">
          Live Stream
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/70">
          Join Goshen Cathedral for worship from anywhere in the world
        </p>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Embedded stream */}
          {embed ? (
            <div className="mb-8 aspect-video overflow-hidden rounded-xl bg-black shadow-lg">
              <iframe
                src={embed.src}
                className="h-full w-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                title="Live Stream"
              />
            </div>
          ) : (
            <div className="mb-8 flex aspect-video flex-col items-center justify-center rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-dashed border-border">
              <div className="text-6xl mb-4">
                {live.isLive ? "📺" : "⏳"}
              </div>
              <p className="text-lg font-semibold text-primary">
                {live.isLive ? "We are live! Choose a platform below to watch." : "No live stream right now"}
              </p>
              <p className="mt-2 text-sm text-muted">
                {live.isLive
                  ? "Click YouTube or Facebook below to join the live service."
                  : "Check the schedule below for upcoming services."}
              </p>
            </div>
          )}

          {/* Watch on YouTube / Facebook buttons */}
          <div className="mb-10 flex flex-wrap justify-center gap-4">
            {live.youtubeChannelUrl && (
              <a
                href={live.isLive && live.youtubeChannelUrl ? `${live.youtubeChannelUrl}/live` : live.youtubeChannelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-[#FF0000] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#CC0000] hover:scale-105"
              >
                <FiYoutube size={20} />
                Watch on YouTube
              </a>
            )}
            {live.facebookPageUrl && (
              <a
                href={live.isLive ? `${live.facebookPageUrl}/live` : live.facebookPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-[#1877F2] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#1565C0] hover:scale-105"
              >
                <FiFacebook size={20} />
                Watch on Facebook
              </a>
            )}
          </div>

          {/* Service schedule + catch up */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <h3 className="mb-4 flex items-center gap-2 font-serif text-lg font-bold text-primary">
                <FiClock className="text-accent" />
                Live Stream Schedule
              </h3>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li className="flex justify-between">
                  <span>Sunday Main Service</span>
                  <span className="font-medium text-primary">10:00 AM</span>
                </li>
                <li className="flex justify-between">
                  <span>Wednesday Seeker Service</span>
                  <span className="font-medium text-primary">9:00 AM</span>
                </li>
                <li className="flex justify-between">
                  <span>Wednesday Mercy Service</span>
                  <span className="font-medium text-primary">6:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Friday Special Service</span>
                  <span className="font-medium text-primary">8:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>1st Thursday — New Moon Service</span>
                  <span className="font-medium text-primary">10:00 PM – 1:00 AM</span>
                </li>
                <li className="flex justify-between">
                  <span>Conventions & Holy Days</span>
                  <span className="font-medium text-primary">As announced</span>
                </li>
              </ul>
            </Card>

            <Card>
              <h3 className="mb-4 font-serif text-lg font-bold text-primary">
                Can&apos;t Watch Live?
              </h3>
              <p className="mb-4 text-sm text-foreground/70">
                All our services are recorded and available on demand. Visit our
                Sermons page to watch past services at any time.
              </p>
              <Link
                href="/sermons"
                className="text-sm font-medium text-accent hover:underline"
              >
                Browse Sermon Archive &rarr;
              </Link>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
