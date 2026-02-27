import Card from "@/components/ui/Card";
import FadeIn from "@/components/ui/FadeIn";
import { FiClock } from "react-icons/fi";
import { defaultServiceTimes } from "@/data/defaults";

type ServiceTimesData = typeof defaultServiceTimes;

export default function ServiceTimes({ data }: { data?: ServiceTimesData }) {
  const { services, worshipAspects } = data || defaultServiceTimes;

  return (
    <section className="bg-muted-light py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="font-serif text-3xl font-bold text-primary">
            Service Times
          </h2>
          <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-gold" />
          <p className="mt-3 text-muted">
            Join us for worship at Goshen Cathedral
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {services.map((service, i) => (
            <FadeIn key={service.day} delay={i * 100}>
              <Card className="text-center h-full">
                <FiClock className="mx-auto mb-3 text-accent" size={28} />
                <h3 className="mb-2 font-serif text-xl font-bold text-primary">
                  {service.day}
                </h3>
                {service.times.map((time) => (
                  <p key={time} className="text-sm text-muted leading-relaxed">
                    {time}
                  </p>
                ))}
              </Card>
            </FadeIn>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-border bg-white p-6 text-center">
          <h3 className="mb-3 font-serif text-lg font-bold text-primary">
            Key Aspects of Worship
          </h3>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-foreground/70">
            {worshipAspects.map((aspect) => (
              <span key={aspect} className="rounded-full bg-primary/5 px-4 py-1.5">
                {aspect}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
