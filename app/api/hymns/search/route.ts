import { NextRequest, NextResponse } from "next/server";
import staticHymns from "@/data/hymns.json";
import { prisma } from "@/lib/db";

type Hymn = { number: number; yoruba: string; english: string; solfa?: string };

async function getHymns(): Promise<Hymn[]> {
  try {
    const row = await prisma.siteContent.findUnique({ where: { key: "hymnal" } });
    if (row) {
      const parsed = JSON.parse(row.value);
      if (parsed.hymns?.length) return parsed.hymns;
    }
  } catch {
    // fall through
  }
  return staticHymns as Hymn[];
}

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.toLowerCase() || "";
  if (!q || q.length < 2) {
    return NextResponse.json([]);
  }

  const hymns = await getHymns();

  const results = hymns
    .filter((h) => {
      const num = String(h.number);
      const eng = (h.english || "").toLowerCase();
      const yor = (h.yoruba || "").toLowerCase();
      return num.includes(q) || eng.includes(q) || yor.includes(q);
    })
    .slice(0, 8)
    .map((h) => ({
      number: h.number,
      title: (h.english || h.yoruba || "").split("\n")[0].trim(),
      firstLine: (h.english || "").split("\n").slice(0, 2).join(" ").trim().substring(0, 80),
    }));

  return NextResponse.json(results);
}
