"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import { FiClock } from "react-icons/fi";

type Platform = "youtube" | "facebook";

export default function LivePage() {
  const [platform, setPlatform] = useState<Platform>("youtube");

  // Replace with your actual channel/page IDs
  const youtubeChannelId = "YOUR_YOUTUBE_CHANNEL_ID";
  const facebookPageId = "YOUR_FACEBOOK_PAGE_ID";

  return (
    <>
      <section className="bg-primary py-20 text-center text-white">
        <h1 className="font-serif text-4xl font-bold md:text-5xl">
          Live Stream
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/70">
          Join Goshen Cathedral for worship from anywhere in the world
        </p>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Platform toggle */}
          <div className="mb-6 flex justify-center gap-2">
            <button
              onClick={() => setPlatform("youtube")}
              className={`rounded-full px-6 py-2 text-sm font-semibold transition ${
                platform === "youtube"
                  ? "bg-[#FF0000] text-white"
                  : "bg-muted-light text-foreground hover:bg-border"
              }`}
            >
              YouTube
            </button>
            <button
              onClick={() => setPlatform("facebook")}
              className={`rounded-full px-6 py-2 text-sm font-semibold transition ${
                platform === "facebook"
                  ? "bg-[#1877F2] text-white"
                  : "bg-muted-light text-foreground hover:bg-border"
              }`}
            >
              Facebook
            </button>
          </div>

          {/* Video embed */}
          <div className="mb-8 aspect-video overflow-hidden rounded-xl bg-black">
            {platform === "youtube" ? (
              <iframe
                src={`https://www.youtube.com/embed/live_stream?channel=${youtubeChannelId}`}
                className="h-full w-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                title="YouTube Live Stream"
              />
            ) : (
              <iframe
                src={`https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/${facebookPageId}/live&show_text=false`}
                className="h-full w-full"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                title="Facebook Live Stream"
              />
            )}
          </div>

          {/* Service schedule */}
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
              <a
                href="/sermons"
                className="text-sm font-medium text-accent hover:underline"
              >
                Browse Sermon Archive &rarr;
              </a>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
