import { NextRequest, NextResponse } from "next/server";
import hymns from "@/data/hymns.json";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.toLowerCase() || "";
  if (!q || q.length < 2) {
    return NextResponse.json([]);
  }

  const results = (hymns as Array<{ number: number; yoruba: string; english: string; solfa: string }>)
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
