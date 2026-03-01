import { getContent } from "@/lib/content";
import { defaultCareers } from "@/data/defaults";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { FiBriefcase, FiHeart, FiMail } from "react-icons/fi";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers & Volunteering",
  description:
    "Explore career opportunities and volunteer positions at CCC Goshen Cathedral. Serve the church with your gifts and talents.",
};

export default async function CareersPage() {
  const data = await getContent("careers", defaultCareers);

  return (
    <>
      <section className="bg-primary py-20 text-center text-white">
        <h1 className="font-serif text-4xl font-bold md:text-5xl">
          Careers & Volunteering
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/70">
          Use your gifts to serve God and His people
        </p>
      </section>

      {/* Intro */}
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="text-lg text-foreground/70 leading-relaxed">
            {data.intro}
          </p>
        </div>
      </section>

      {/* Open Positions / Careers */}
      {data.careers.length > 0 && (
        <section className="border-t border-border py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <FiBriefcase className="mx-auto mb-3 text-accent" size={32} />
              <h2 className="font-serif text-2xl font-bold text-primary">
                Open Positions
              </h2>
              <p className="mt-2 text-sm text-muted">
                Current opportunities to serve in a dedicated role
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {data.careers.map((career) => (
                <Card key={career.id} className="flex flex-col">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-full bg-accent/10 px-3 py-0.5 text-xs font-semibold uppercase text-accent">
                      {career.type}
                    </span>
                  </div>
                  <h3 className="mb-2 font-serif text-lg font-bold text-primary">
                    {career.title}
                  </h3>
                  <p className="mb-3 flex-1 text-sm text-foreground/70 leading-relaxed">
                    {career.description}
                  </p>
                  {career.requirements && (
                    <p className="mb-3 text-xs text-muted">
                      <strong>Requirements:</strong> {career.requirements}
                    </p>
                  )}
                  {career.contact && (
                    <a
                      href={`mailto:${career.contact}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
                    >
                      <FiMail size={14} /> Apply / Inquire
                    </a>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Volunteer Areas */}
      <section className="border-t border-border bg-muted-light/30 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <FiHeart className="mx-auto mb-3 text-gold" size={32} />
            <h2 className="font-serif text-2xl font-bold text-primary">
              Volunteer Opportunities
            </h2>
            <p className="mt-2 text-sm text-muted">
              No special qualifications needed — just a willing heart
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.volunteerAreas.map((area) => (
              <Card key={area.id}>
                <h3 className="mb-2 font-serif text-lg font-bold text-primary">
                  {area.name}
                </h3>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  {area.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="mb-4 font-serif text-2xl font-bold text-primary">
            Ready to Serve?
          </h2>
          <p className="mb-6 text-foreground/70">
            Contact us to learn more about any position or volunteer
            opportunity. We&apos;d love to have you on the team.
          </p>
          <Button href="/contact" variant="accent">
            Get in Touch
          </Button>
        </div>
      </section>
    </>
  );
}
