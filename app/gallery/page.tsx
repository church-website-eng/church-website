import { getContent } from "@/lib/content";
import type { Metadata } from "next";
import { FiFacebook, FiExternalLink } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photo gallery of events and worship at CCC Goshen Cathedral.",
};

const facebookPageUrl =
  "https://www.facebook.com/celestialchurchofchristayomotherparish";

interface GalleryPhoto {
  id: string;
  url: string;
  caption: string;
  album: string;
}

export default async function GalleryPage() {
  const data = await getContent("gallery", { photos: [] } as { photos: GalleryPhoto[] });
  const photos = data.photos || [];

  // Group photos by album
  const albumMap = new Map<string, GalleryPhoto[]>();
  for (const photo of photos) {
    if (!photo.url) continue;
    const album = photo.album || "General";
    if (!albumMap.has(album)) albumMap.set(album, []);
    albumMap.get(album)!.push(photo);
  }

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
          {albumMap.size > 0 ? (
            Array.from(albumMap.entries()).map(([albumName, albumPhotos]) => (
              <div key={albumName} className="mb-12">
                <h2 className="mb-2 font-serif text-2xl font-bold text-primary">
                  {albumName}
                </h2>
                <p className="mb-6 text-sm text-muted">
                  {albumPhotos.length} photo{albumPhotos.length !== 1 ? "s" : ""}
                </p>
                <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {albumPhotos.map((photo) => (
                    <div
                      key={photo.id}
                      className="group relative aspect-square overflow-hidden rounded-lg bg-muted-light"
                    >
                      <img
                        src={photo.url}
                        alt={photo.caption || `${albumName} photo`}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                      {photo.caption && (
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 pb-3 pt-8 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <p className="text-sm text-white">{photo.caption}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center">
              <p className="text-muted">Gallery photos coming soon.</p>
            </div>
          )}

          {/* Facebook link */}
          <div className="mt-10 text-center">
            <a
              href={`${facebookPageUrl}/photos`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-primary-light hover:scale-[1.02] active:scale-[0.98]"
            >
              <FiFacebook size={18} />
              View More Photos on Facebook
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
