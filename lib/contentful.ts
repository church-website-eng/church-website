import { createClient } from "contentful";
import type {
  Sermon,
  ChurchEvent,
  BlogPost,
  Staff,
  SmallGroup,
  GalleryAlbum,
} from "@/types";

const isConfigured =
  !!process.env.CONTENTFUL_SPACE_ID && !!process.env.CONTENTFUL_ACCESS_TOKEN;

const client = isConfigured
  ? createClient({
      space: process.env.CONTENTFUL_SPACE_ID!,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
    })
  : null;

function parseFields(entry: Record<string, unknown>): Record<string, unknown> {
  const fields = entry.fields as Record<string, unknown>;
  const id = (entry.sys as Record<string, unknown>).id as string;
  return { ...fields, id };
}

function assetUrl(asset: unknown): string {
  if (!asset) return "";
  const f = (asset as Record<string, unknown>).fields as Record<
    string,
    unknown
  >;
  const file = f?.file as Record<string, unknown>;
  return file?.url ? `https:${file.url}` : "";
}

// ── Sermons ──────────────────────────────────────────────────────

export async function getSermons(limit = 20): Promise<Sermon[]> {
  if (!client) return [];
  try {
    const res = await client.getEntries({
      content_type: "sermon",
      order: ["-fields.date"],
      limit,
    });
    return res.items.map((item) => {
      const f = parseFields(item as unknown as Record<string, unknown>);
      return {
        id: f.id as string,
        title: (f.title as string) || "",
        speaker: (f.speaker as string) || "",
        date: (f.date as string) || "",
        series: f.series as string | undefined,
        slug: (f.slug as string) || "",
        videoUrl: f.videoUrl as string | undefined,
        audioUrl: f.audioUrl as string | undefined,
        notes: f.notes as string | undefined,
        pdfUrl: f.pdf ? assetUrl(f.pdf) : undefined,
        thumbnail: f.thumbnail ? assetUrl(f.thumbnail) : undefined,
      };
    });
  } catch {
    return [];
  }
}

export async function getSermonBySlug(
  slug: string,
): Promise<Sermon | null> {
  if (!client) return null;
  try {
    const res = await client.getEntries({
      content_type: "sermon",
      "fields.slug": slug,
      limit: 1,
    });
    if (!res.items.length) return null;
    const f = parseFields(res.items[0] as unknown as Record<string, unknown>);
    return {
      id: f.id as string,
      title: (f.title as string) || "",
      speaker: (f.speaker as string) || "",
      date: (f.date as string) || "",
      series: f.series as string | undefined,
      slug: (f.slug as string) || "",
      videoUrl: f.videoUrl as string | undefined,
      audioUrl: f.audioUrl as string | undefined,
      notes: f.notes as string | undefined,
      pdfUrl: f.pdf ? assetUrl(f.pdf) : undefined,
      thumbnail: f.thumbnail ? assetUrl(f.thumbnail) : undefined,
    };
  } catch {
    return null;
  }
}

// ── Events ───────────────────────────────────────────────────────

export async function getEvents(limit = 20): Promise<ChurchEvent[]> {
  if (!client) return [];
  try {
    const res = await client.getEntries({
      content_type: "event",
      order: ["fields.date"],
      limit,
    });
    return res.items.map((item) => {
      const f = parseFields(item as unknown as Record<string, unknown>);
      return {
        id: f.id as string,
        title: (f.title as string) || "",
        date: (f.date as string) || "",
        endDate: f.endDate as string | undefined,
        location: (f.location as string) || "",
        description: (f.description as string) || "",
        slug: (f.slug as string) || "",
        image: f.image ? assetUrl(f.image) : undefined,
        registrationEnabled: (f.registrationEnabled as boolean) || false,
      };
    });
  } catch {
    return [];
  }
}

export async function getEventBySlug(
  slug: string,
): Promise<ChurchEvent | null> {
  if (!client) return null;
  try {
    const res = await client.getEntries({
      content_type: "event",
      "fields.slug": slug,
      limit: 1,
    });
    if (!res.items.length) return null;
    const f = parseFields(res.items[0] as unknown as Record<string, unknown>);
    return {
      id: f.id as string,
      title: (f.title as string) || "",
      date: (f.date as string) || "",
      endDate: f.endDate as string | undefined,
      location: (f.location as string) || "",
      description: (f.description as string) || "",
      slug: (f.slug as string) || "",
      image: f.image ? assetUrl(f.image) : undefined,
      registrationEnabled: (f.registrationEnabled as boolean) || false,
    };
  } catch {
    return null;
  }
}

// ── Blog Posts ───────────────────────────────────────────────────

export async function getBlogPosts(limit = 20): Promise<BlogPost[]> {
  if (!client) return [];
  try {
    const res = await client.getEntries({
      content_type: "blogPost",
      order: ["-fields.date"],
      limit,
    });
    return res.items.map((item) => {
      const f = parseFields(item as unknown as Record<string, unknown>);
      return {
        id: f.id as string,
        title: (f.title as string) || "",
        author: (f.author as string) || "",
        date: (f.date as string) || "",
        body: (f.body as string) || "",
        slug: (f.slug as string) || "",
        featuredImage: f.featuredImage ? assetUrl(f.featuredImage) : undefined,
        category: (f.category as string) || "",
        excerpt: f.excerpt as string | undefined,
      };
    });
  } catch {
    return [];
  }
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  if (!client) return null;
  try {
    const res = await client.getEntries({
      content_type: "blogPost",
      "fields.slug": slug,
      limit: 1,
    });
    if (!res.items.length) return null;
    const f = parseFields(res.items[0] as unknown as Record<string, unknown>);
    return {
      id: f.id as string,
      title: (f.title as string) || "",
      author: (f.author as string) || "",
      date: (f.date as string) || "",
      body: (f.body as string) || "",
      slug: (f.slug as string) || "",
      featuredImage: f.featuredImage ? assetUrl(f.featuredImage) : undefined,
      category: (f.category as string) || "",
      excerpt: f.excerpt as string | undefined,
    };
  } catch {
    return null;
  }
}

// ── Staff ────────────────────────────────────────────────────────

export async function getStaff(): Promise<Staff[]> {
  if (!client) return [];
  try {
    const res = await client.getEntries({
      content_type: "staff",
      order: ["fields.name"],
    });
    return res.items.map((item) => {
      const f = parseFields(item as unknown as Record<string, unknown>);
      return {
        id: f.id as string,
        name: (f.name as string) || "",
        title: (f.title as string) || "",
        bio: (f.bio as string) || "",
        photo: f.photo ? assetUrl(f.photo) : undefined,
        email: f.email as string | undefined,
      };
    });
  } catch {
    return [];
  }
}

// ── Small Groups ─────────────────────────────────────────────────

export async function getSmallGroups(): Promise<SmallGroup[]> {
  if (!client) return [];
  try {
    const res = await client.getEntries({
      content_type: "smallGroup",
      order: ["fields.name"],
    });
    return res.items.map((item) => {
      const f = parseFields(item as unknown as Record<string, unknown>);
      return {
        id: f.id as string,
        name: (f.name as string) || "",
        leader: (f.leader as string) || "",
        day: (f.day as string) || "",
        time: (f.time as string) || "",
        location: (f.location as string) || "",
        description: (f.description as string) || "",
        capacity: (f.capacity as number) || 0,
        currentMembers: (f.currentMembers as number) || 0,
      };
    });
  } catch {
    return [];
  }
}

// ── Gallery ──────────────────────────────────────────────────────

export async function getGalleryAlbums(): Promise<GalleryAlbum[]> {
  if (!client) return [];
  try {
    const res = await client.getEntries({
      content_type: "galleryAlbum",
      order: ["-fields.date"],
    });
    return res.items.map((item) => {
      const f = parseFields(item as unknown as Record<string, unknown>);
      const photos = Array.isArray(f.photos)
        ? (f.photos as unknown[]).map((p) => assetUrl(p))
        : [];
      return {
        id: f.id as string,
        title: (f.title as string) || "",
        date: (f.date as string) || "",
        photos,
      };
    });
  } catch {
    return [];
  }
}
