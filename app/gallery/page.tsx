import { getGalleryAlbums } from "@/lib/contentful";
import { formatDate } from "@/lib/utils";
import type { Metadata } from "next";
import { FiFacebook, FiExternalLink } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photo gallery of events and worship at CCC Goshen Cathedral.",
};

const facebookPageUrl =
  "https://www.facebook.com/celestialchurchofchristayomotherparish";

export default async function GalleryPage() {
  const albums = await getGalleryAlbums();

  return (
    <>
      <section className="bg-primary py-20 text-center text-white">
        <h1 className="font-serif text-4xl font-bold md:text-5xl">Gallery</h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/70">
          Moments of faith, fellowship, and joy at Goshen Cathedral
        </p>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Contentful albums (if connected) */}
          {albums.length > 0 &&
            albums.map((album) => (
              <div key={album.id} className="mb-12">
                <h2 className="mb-2 font-serif text-2xl font-bold text-primary">
                  {album.title}
                </h2>
                <p className="mb-6 text-sm text-muted">
                  {formatDate(album.date)}
                </p>
                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {album.photos.map((photo, i) => (
                    <div
                      key={i}
                      className="aspect-square overflow-hidden rounded-lg"
                    >
                      <img
                        src={photo}
                        alt={`${album.title} photo ${i + 1}`}
                        className="h-full w-full object-cover transition hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}

          {/* Facebook Photos Embed */}
          <div className="mb-10 text-center">
            <h2 className="font-serif text-2xl font-bold text-primary">
              Photos from Our Facebook
            </h2>
            <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-gold" />
            <p className="mt-3 text-sm text-muted">
              Browse our latest photos from services, events, and parish life
            </p>
          </div>

          {/* Embedded Facebook Page */}
          <div className="mx-auto max-w-3xl">
            <div className="overflow-hidden rounded-xl border border-border shadow-sm">
              <iframe
                src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(facebookPageUrl)}&tabs=timeline&width=600&height=800&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false`}
                className="w-full"
                style={{ border: "none", overflow: "hidden", height: "800px" }}
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                title="CCC Ayo Mother Parish Facebook"
              />
            </div>
          </div>

          {/* Link to full Facebook gallery */}
          <div className="mt-10 text-center">
            <a
              href={`${facebookPageUrl}/photos`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-primary-light hover:scale-[1.02] active:scale-[0.98]"
            >
              <FiFacebook size={18} />
              View All Photos on Facebook
              <FiExternalLink size={14} />
            </a>
            <p className="mt-3 text-xs text-muted">
              Follow us on Facebook to see the latest photos and updates
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
