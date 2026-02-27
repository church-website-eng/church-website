import { unstable_noStore as noStore } from "next/cache";
import { prisma } from "@/lib/db";

export async function getContent<T>(key: string, fallback: T): Promise<T> {
  noStore();
  try {
    const row = await prisma.siteContent.findUnique({ where: { key } });
    if (!row) return fallback;
    return JSON.parse(row.value) as T;
  } catch {
    return fallback;
  }
}
