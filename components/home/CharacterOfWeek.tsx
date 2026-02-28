import Image from "next/image";
import Card from "@/components/ui/Card";
import { getContent } from "@/lib/content";
import { defaultCharacterOfWeek } from "@/data/defaults";

export default async function CharacterOfWeek() {
  const character = await getContent("character_of_week", defaultCharacterOfWeek);

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="font-serif text-3xl font-bold text-primary">
            Character of the Week
          </h2>
          <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-gold" />
          <p className="mt-3 text-muted">
            Lessons from the men and women of the Bible
          </p>
        </div>

        <Card className="mx-auto max-w-3xl p-8">
          <div className={character.imageUrl ? "flex flex-col items-center gap-6 sm:flex-row sm:items-start" : ""}>
            {character.imageUrl && (
              <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={character.imageUrl}
                  alt={character.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className={character.imageUrl ? "" : "text-center"}>
              <h3 className="font-serif text-2xl font-bold text-primary">
                {character.name}
              </h3>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-accent">
                {character.title}
              </p>
              <p className="mt-2 inline-block rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
                {character.verse}
              </p>
              <p className="mt-4 leading-relaxed text-muted">
                {character.description}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
