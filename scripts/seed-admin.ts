/**
 * Seed an admin user
 *
 * Usage:  npx tsx scripts/seed-admin.ts
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@goshencathedral.ca";
  const password = "GoshenAdmin2026!";

  const hashed = await bcrypt.hash(password, 12);

  const user = await prisma.user.upsert({
    where: { email },
    update: { hashedPassword: hashed, role: "ADMIN", approved: true },
    create: {
      name: "Admin",
      email,
      hashedPassword: hashed,
      role: "ADMIN",
      approved: true,
    },
  });

  console.log(`Admin user seeded:`);
  console.log(`  Email:    ${email}`);
  console.log(`  Password: ${password}`);
  console.log(`  ID:       ${user.id}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
