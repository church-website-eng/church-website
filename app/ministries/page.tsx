import Card from "@/components/ui/Card";
import { FiUsers, FiHeart, FiMusic, FiStar, FiShield, FiBookOpen } from "react-icons/fi";
import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { defaultMinistries } from "@/data/defaults";

const iconMap: Record<string, React.ReactNode> = {
  shield: <FiShield className="text-accent" size={28} />,
  heart: <FiHeart className="text-accent" size={28} />,
  star: <FiStar className="text-accent" size={28} />,
  book: <FiBookOpen className="text-accent" size={28} />,
  music: <FiMusic className="text-accent" size={28} />,
  users: <FiUsers className="text-accent" size={28} />,
};

export const metadata: Metadata = {
  title: "Ministries",
  description: "Explore the ministries and service groups at Celestial Church of Christ, Goshen Cathedral.",
};

export default async function MinistriesPage() {
  const { items: ministries } = await getContent("ministries", defaultMinistries);

  return (
    <>
      <section className="bg-primary py-20 text-center text-white">
        <h1 className="font-serif text-4xl font-bold md:text-5xl">
          Ministries
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/70">
          Serving God and His people through dedicated ministries
        </p>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {ministries.map((ministry) => (
              <Card key={ministry.name} className="flex items-start gap-4">
                <div className="mt-1">{iconMap[ministry.icon] || iconMap.heart}</div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-primary">
                    {ministry.name}
                  </h3>
                  <p className="mb-2 text-xs font-medium text-accent">
                    Led by: {ministry.leader}
                  </p>
                  <p className="text-sm text-foreground/70">
                    {ministry.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
