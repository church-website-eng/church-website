import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getSmallGroups } from "@/lib/contentful";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { FiUsers, FiMapPin, FiClock } from "react-icons/fi";
import type { SmallGroup } from "@/types";

const placeholderGroups: SmallGroup[] = [
  { id: "1", name: "Men's Fellowship", leader: "Brother Emmanuel", day: "Tuesday", time: "7:00 PM", location: "Parish Hall", description: "A weekly gathering for men to study the Word, pray, and build brotherhood in Christ.", capacity: 15, currentMembers: 9 },
  { id: "2", name: "Women's Fellowship (Mothers-in-Celestial)", leader: "Sister Grace", day: "Thursday", time: "10:00 AM", location: "Chapel", description: "Women coming together for prayer, support, and spiritual growth under the guidance of our Mothers-in-Celestial.", capacity: 20, currentMembers: 14 },
  { id: "3", name: "Youth & Young Adults Fellowship", leader: "Brother David & Sister Joy", day: "Friday", time: "7:30 PM", location: "Youth Centre", description: "For ages 18-35. Fellowship, faith discussions, community service, and spiritual development.", capacity: 25, currentMembers: 18 },
  { id: "4", name: "Couples & Family Ministry", leader: "Senior Evangelist & Wife", day: "Saturday", time: "9:00 AM", location: "Parish Hall", description: "Monthly gatherings for couples to strengthen their marriages and families through the Word of God.", capacity: 12, currentMembers: 8 },
];

export default async function GroupsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/portal/login");
  }

  const groups = await getSmallGroups();
  const items = groups.length > 0 ? groups : placeholderGroups;

  return (
    <>
      <section className="bg-primary py-16 text-center text-white">
        <h1 className="font-serif text-3xl font-bold md:text-4xl">
          Small Groups
        </h1>
        <p className="mt-2 text-white/70">
          Find your community within the community
        </p>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {items.map((group) => (
              <Card key={group.id} className="flex flex-col">
                <h3 className="mb-1 font-serif text-lg font-bold text-primary">
                  {group.name}
                </h3>
                <p className="mb-3 text-sm text-muted">
                  Led by {group.leader}
                </p>
                <div className="mb-2 flex items-center gap-2 text-sm text-foreground/70">
                  <FiClock size={14} className="text-accent" />
                  <span>
                    {group.day}s at {group.time}
                  </span>
                </div>
                <div className="mb-2 flex items-center gap-2 text-sm text-foreground/70">
                  <FiMapPin size={14} className="text-accent" />
                  <span>{group.location}</span>
                </div>
                <div className="mb-3 flex items-center gap-2 text-sm text-foreground/70">
                  <FiUsers size={14} className="text-accent" />
                  <span>
                    {group.currentMembers} / {group.capacity} members
                  </span>
                </div>
                <p className="mb-4 flex-1 text-sm text-foreground/70">
                  {group.description}
                </p>
                {group.currentMembers < group.capacity ? (
                  <Button variant="accent" size="sm">
                    Join Group
                  </Button>
                ) : (
                  <p className="text-sm font-medium text-muted">
                    Group is full — contact leader for waitlist
                  </p>
                )}
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button href="/portal" variant="secondary">
              &larr; Back to Dashboard
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
