import Card from "@/components/ui/Card";
import { FiAlertCircle, FiCalendar, FiInfo } from "react-icons/fi";
import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { defaultAnnouncements } from "@/data/defaults";

const typeIcons: Record<string, React.ReactNode> = {
  important: <FiAlertCircle className="text-accent" size={20} />,
  event: <FiCalendar className="text-gold" size={20} />,
  info: <FiInfo className="text-primary" size={20} />,
};

const typeLabels: Record<string, string> = {
  important: "Important",
  event: "Upcoming Event",
  info: "Information",
};

const cccCalendar = [
  { month: "January", events: [{ name: "New Year Thanksgiving Service", date: "1st Sunday" }, { name: "New Moon Service", date: "1st Thursday" }] },
  { month: "February", events: [{ name: "New Moon Service", date: "1st Thursday" }, { name: "Founder's Month Remembrance", date: "Throughout" }] },
  { month: "March", events: [{ name: "Lenten Season", date: "Throughout" }, { name: "New Moon Service", date: "1st Thursday" }] },
  { month: "April", events: [{ name: "Easter — Good Friday Service", date: "Good Friday" }, { name: "Easter Sunday Celebration", date: "Easter Sunday" }, { name: "New Moon Service", date: "1st Thursday" }] },
  { month: "May", events: [{ name: "Children's Day Celebration", date: "Last Sunday" }, { name: "New Moon Service", date: "1st Thursday" }] },
  { month: "June", events: [{ name: "Mid-Year Thanksgiving", date: "1st Sunday" }, { name: "New Moon Service", date: "1st Thursday" }] },
  { month: "July", events: [{ name: "Annual Convention Preparations", date: "Throughout" }, { name: "New Moon Service", date: "1st Thursday" }] },
  { month: "August", events: [{ name: "Youth Month & Conference", date: "Throughout" }, { name: "New Moon Service", date: "1st Thursday" }] },
  { month: "September", events: [{ name: "Harvest Thanksgiving", date: "Last Sunday" }, { name: "Pastor-Founder's Day (Sep 29)", date: "September 29" }, { name: "New Moon Service", date: "1st Thursday" }] },
  { month: "October", events: [{ name: "Annual Convention", date: "As announced" }, { name: "New Moon Service", date: "1st Thursday" }] },
  { month: "November", events: [{ name: "Remembrance Service", date: "1st Sunday" }, { name: "New Moon Service", date: "1st Thursday" }] },
  { month: "December", events: [{ name: "Christmas Carol Service", date: "3rd Sunday" }, { name: "Christmas Day Service", date: "December 25" }, { name: "Crossover Night / Watchnight", date: "December 31" }, { name: "New Moon Service", date: "1st Thursday" }] },
];

export const metadata: Metadata = {
  title: "Announcements & Calendar",
  description: "Latest announcements and yearly church calendar at CCC Goshen Cathedral.",
};

export default async function AnnouncementsPage() {
  const { items: announcements } = await getContent("announcements", defaultAnnouncements);

  return (
    <>
      <section className="bg-primary py-20 text-center text-white">
        <h1 className="font-serif text-4xl font-bold md:text-5xl">
          Announcements & Calendar
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/70">
          Weekly bulletin, parish announcements, and church calendar
        </p>
      </section>

      {/* Announcements */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center font-serif text-2xl font-bold text-primary">
            Latest Announcements
          </h2>
          <div className="space-y-6">
            {announcements.map((a) => (
              <Card key={a.id}>
                <div className="mb-3 flex items-center gap-3">
                  {typeIcons[a.type]}
                  <span className="rounded-full bg-primary/5 px-3 py-0.5 text-xs font-semibold text-primary">
                    {typeLabels[a.type]}
                  </span>
                  <span className="text-xs text-muted">{a.date}</span>
                </div>
                <h3 className="mb-2 font-serif text-lg font-bold text-primary">
                  {a.title}
                </h3>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  {a.body}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Calendar */}
      <section className="border-t border-border bg-muted-light/30 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-2 text-center font-serif text-2xl font-bold text-primary">
            CCC Calendar 2026
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-center text-sm text-muted">
            Holy days, conventions, and special services throughout the year
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cccCalendar.map((month) => (
              <Card key={month.month}>
                <h3 className="mb-3 font-serif text-lg font-bold text-primary">
                  {month.month}
                </h3>
                <ul className="space-y-2">
                  {month.events.map((event, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                      <div>
                        <span className="font-medium text-foreground">{event.name}</span>
                        <span className="ml-1 text-muted">— {event.date}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
