import Link from "next/link";
import type { Sermon } from "@/types";
import { formatDate } from "@/lib/utils";
import { FiPlay } from "react-icons/fi";
import Card from "@/components/ui/Card";

export default function SermonCard({ sermon }: { sermon: Sermon }) {
  return (
    <Link href={`/sermons/${sermon.slug}`} className="block">
      <Card className="flex flex-col transition-shadow hover:shadow-md">
        {/* Thumbnail with play overlay */}
        <div className="group relative mb-4 aspect-video overflow-hidden rounded-lg bg-primary/10">
          {sermon.thumbnail ? (
            <img
              src={sermon.thumbnail}
              alt={sermon.title}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5" />
          )}
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-lg transition-transform group-hover:scale-110">
              <FiPlay size={24} className="ml-1" />
            </div>
          </div>
        </div>

        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-accent">
          {formatDate(sermon.date)}
          {sermon.series && ` | ${sermon.series}`}
        </p>
        <h3 className="mb-1 font-serif text-lg font-bold text-primary">
          {sermon.title}
        </h3>
        <p className="mt-auto text-sm text-muted">{sermon.speaker}</p>
      </Card>
    </Link>
  );
}
