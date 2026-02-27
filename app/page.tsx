import Hero from "@/components/home/Hero";
import ServiceCountdown from "@/components/home/ServiceCountdown";
import Stats from "@/components/home/Stats";
import ServiceTimes from "@/components/home/ServiceTimes";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import LatestSermon from "@/components/home/LatestSermon";
import Newsletter from "@/components/home/Newsletter";
import Divider from "@/components/ui/Divider";
import { getEvents, getSermons } from "@/lib/contentful";
import { getContent } from "@/lib/content";
import { defaultChurchInfo, defaultServiceTimes, defaultStats } from "@/data/defaults";

export default async function Home() {
  const [events, sermons, churchInfo, serviceTimes, stats] = await Promise.all([
    getEvents(3),
    getSermons(1),
    getContent("church_info", defaultChurchInfo),
    getContent("service_times", defaultServiceTimes),
    getContent("stats", defaultStats),
  ]);

  return (
    <>
      <Hero churchInfo={churchInfo} />
      <ServiceCountdown />
      <Stats items={stats.items} />
      <Divider />
      <ServiceTimes data={serviceTimes} />
      <Divider />
      <UpcomingEvents events={events} />
      <Divider />
      <LatestSermon sermon={sermons[0] || null} />
      <Divider />
      <Newsletter />
    </>
  );
}
