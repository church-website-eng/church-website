import { getStaff } from "@/lib/contentful";
import Card from "@/components/ui/Card";
import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { defaultAbout } from "@/data/defaults";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about the history, beliefs, and leadership of Celestial Church of Christ, Goshen Cathedral, Peterborough.",
};

export default async function AboutPage() {
  const [staff, about] = await Promise.all([
    getStaff(),
    getContent("about", defaultAbout),
  ]);

  const clergy = staff.length > 0 ? staff : [
    { id: "1", name: "VSE Kunle Lawal", title: "Shepherd-in-Charge — Goshen Cathedral", bio: "Leading the Goshen Cathedral parish with divine guidance, pastoral care, and an unwavering commitment to the spiritual growth of all members. Serving as the shepherd of the Arch Diocese of Canada, National Headquarter.", photo: "/images/head-of-church.jpeg", email: undefined },
    { id: "2", name: "Church Secretary", title: "Church Secretary", bio: "Managing parish administration, communications, and record-keeping to ensure the smooth operation of Goshen Cathedral.", photo: undefined, email: undefined },
    { id: "3", name: "Mother-in-Celestial", title: "Mother-in-Celestial", bio: "Guiding the women's fellowship, prayer ministries, and welfare activities with love and spiritual wisdom.", photo: undefined, email: undefined },
  ];

  return (
    <>
      <section className="bg-primary py-20 text-center text-white">
        <h1 className="font-serif text-4xl font-bold md:text-5xl">
          About Us
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/70">
          Ijo Mimo ti Kristi lati Orun wa &mdash; The Holy Church of Christ from Heaven
        </p>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <img
            src="/images/church-building.png"
            alt="Goshen Cathedral — 441 Rubidge Street, Peterborough, ON"
            className="w-full rounded-xl shadow-lg object-cover max-h-[500px]"
          />
          <p className="mt-3 text-center text-sm text-muted">
            Goshen Cathedral — 441 Rubidge Street, Peterborough, ON
          </p>
        </div>
      </section>

      {/* Church Videos */}
      <section className="pb-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-2 text-center font-serif text-3xl font-bold text-primary">
            Highlights
          </h2>
          <div className="mx-auto mb-8 h-1 w-12 rounded-full bg-gold" />
          <div className="grid gap-8 md:grid-cols-3">
            {/* Church Opening */}
            <div>
              <div className="aspect-video overflow-hidden rounded-xl shadow-lg">
                <iframe
                  src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1748527635854556&show_text=false"
                  className="h-full w-full"
                  style={{ border: "none", overflow: "hidden" }}
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  title="Goshen Cathedral Church Opening"
                />
              </div>
              <p className="mt-3 text-center text-sm font-medium text-primary">
                Church Opening
              </p>
              <p className="text-center text-xs text-muted">
                The opening of Goshen Cathedral
              </p>
            </div>
            {/* Harvest Service */}
            <div>
              <div className="aspect-video overflow-hidden rounded-xl shadow-lg">
                <iframe
                  src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1487311355646218&show_text=false"
                  className="h-full w-full"
                  style={{ border: "none", overflow: "hidden" }}
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  title="Goshen Cathedral Harvest Service"
                />
              </div>
              <p className="mt-3 text-center text-sm font-medium text-primary">
                Harvest Service
              </p>
              <p className="text-center text-xs text-muted">
                Annual Harvest Thanksgiving
              </p>
            </div>
            {/* YouTube Video */}
            <div>
              <div className="aspect-video overflow-hidden rounded-xl shadow-lg">
                <iframe
                  src="https://www.youtube.com/embed/LkVAqyR1088"
                  className="h-full w-full"
                  style={{ border: "none" }}
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  title="Goshen Cathedral Service"
                />
              </div>
              <p className="mt-3 text-center text-sm font-medium text-primary">
                Worship at Goshen Cathedral
              </p>
              <p className="text-center text-xs text-muted">
                Experience our worship services
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 font-serif text-3xl font-bold text-primary">
            Our History
          </h2>
          <div className="space-y-4 text-foreground/70 leading-relaxed">
            {about.historyParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted-light py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center font-serif text-3xl font-bold text-primary">
            What We Believe
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {about.beliefs.map((belief) => (
              <Card key={belief.title}>
                <h3 className="mb-2 font-serif text-lg font-bold text-primary">
                  {belief.title}
                </h3>
                <p className="text-sm text-foreground/70">
                  {belief.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-center font-serif text-3xl font-bold text-primary">
            Our Leadership
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {clergy.map((person) => (
              <Card key={person.id} className="text-center">
                {person.photo ? (
                  <img
                    src={person.photo}
                    alt={person.name}
                    className="mx-auto mb-4 h-28 w-28 rounded-full object-cover object-top shadow-md"
                  />
                ) : (
                  <div className="mx-auto mb-4 flex h-28 w-28 items-center justify-center rounded-full bg-primary/10 text-3xl text-primary">
                    {person.name.charAt(0)}
                  </div>
                )}
                <h3 className="font-serif text-lg font-bold text-primary">
                  {person.name}
                </h3>
                <p className="mb-2 text-sm font-medium text-accent">
                  {person.title}
                </p>
                <p className="text-sm text-foreground/70">{person.bio}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
