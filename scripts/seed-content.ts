/**
 * Seed the SiteContent table with default values from data/defaults.ts
 *
 * Usage:  npx tsx scripts/seed-content.ts
 */
import { PrismaClient } from "@prisma/client";
import {
  defaultChurchInfo,
  defaultServiceTimes,
  defaultStats,
  defaultAnnouncements,
  defaultAbout,
  defaultMinistries,
} from "../data/defaults";

const prisma = new PrismaClient();

const seeds: { key: string; value: unknown }[] = [
  { key: "church_info", value: defaultChurchInfo },
  { key: "service_times", value: defaultServiceTimes },
  { key: "stats", value: defaultStats },
  { key: "announcements", value: defaultAnnouncements },
  { key: "about", value: defaultAbout },
  { key: "ministries", value: defaultMinistries },
];

async function main() {
  console.log("Seeding SiteContent table...\n");

  for (const { key, value } of seeds) {
    await prisma.siteContent.upsert({
      where: { key },
      update: { value: JSON.stringify(value) },
      create: { key, value: JSON.stringify(value) },
    });
    console.log(`  ✓ ${key}`);
  }

  console.log(`\nDone — ${seeds.length} content rows seeded.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
