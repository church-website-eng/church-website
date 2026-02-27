import Link from "next/link";
import type { Sermon } from "@/types";
import { formatDate } from "@/lib/utils";
import { FiPlay } from "react-icons/fi";
import Card from "@/components/ui/Card";

export default function SermonCard({ sermon }: { sermon: Sermon }) {
  return (
    <Card className="flex flex-col">
      {/* Thumbnail */}
      <div className="mb-4 aspect-video overflow-hidden rounded-lg bg-primary/10">
        {sermon.thumbnail ? (
          <img
            src={sermon.thumbnail}
            alt={sermon.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-primary/30">
            <FiPlay size={40} />
          </div>
        )}
      </div>

      <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-accent">
        {formatDate(sermon.date)}
        {sermon.series && ` | ${sermon.series}`}
      </p>
      <h3 className="mb-1 font-serif text-lg font-bold text-primary">
        <Link href={`/sermons/${sermon.slug}`} className="hover:underline">
          {sermon.title}
        </Link>
      </h3>
      <p className="mt-auto text-sm text-muted">{sermon.speaker}</p>
    </Card>
  );
}
