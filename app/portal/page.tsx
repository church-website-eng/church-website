import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { FiUser, FiUsers, FiCalendar, FiHeart } from "react-icons/fi";

export default async function PortalDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/portal/login");
  }

  const cards = [
    {
      title: "My Profile",
      description: "View and edit your personal information",
      icon: <FiUser className="text-accent" size={24} />,
      href: "/portal/profile",
    },
    {
      title: "Small Groups",
      description: "Browse and join small groups",
      icon: <FiUsers className="text-accent" size={24} />,
      href: "/portal/groups",
    },
    {
      title: "Upcoming Events",
      description: "See what's happening this week",
      icon: <FiCalendar className="text-accent" size={24} />,
      href: "/events",
    },
    {
      title: "Give Online",
      description: "Support the mission of our church",
      icon: <FiHeart className="text-accent" size={24} />,
      href: "/give",
    },
  ];

  return (
    <>
      <section className="bg-primary py-16 text-center text-white">
        <h1 className="font-serif text-3xl font-bold md:text-4xl">
          Welcome, {session.user?.name || "Member"}
        </h1>
        <p className="mt-2 text-white/70">Your member dashboard</p>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {cards.map((card) => (
              <Card key={card.title} className="flex items-start gap-4">
                <div className="mt-1">{card.icon}</div>
                <div className="flex-1">
                  <h3 className="font-serif text-lg font-bold text-primary">
                    {card.title}
                  </h3>
                  <p className="mb-3 text-sm text-muted">{card.description}</p>
                  <Button href={card.href} variant="outline" size="sm">
                    Go &rarr;
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
