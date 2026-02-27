import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { put, list, del } from "@vercel/blob";

const MAX_SIZE = 50 * 1024 * 1024; // 50 MB
const ALLOWED_IMAGE = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const ALLOWED_VIDEO = ["video/mp4", "video/webm", "video/quicktime"];
const ALLOWED_TYPES = [...ALLOWED_IMAGE, ...ALLOWED_VIDEO];

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as { role?: string }).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "File type not allowed. Accepted: JPG, PNG, WebP, GIF, MP4, WebM" },
        { status: 400 },
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 50 MB." },
        { status: 400 },
      );
    }

    // Generate unique filename
    const ext = file.name.split(".").pop() || "bin";
    const timestamp = Date.now();
    const safeName = file.name
      .replace(/\.[^.]+$/, "")
      .replace(/[^a-zA-Z0-9_-]/g, "_")
      .substring(0, 50);
    const filename = `uploads/${timestamp}-${safeName}.${ext}`;

    const blob = await put(filename, file, { access: "public" });

    const isVideo = ALLOWED_VIDEO.includes(file.type);

    return NextResponse.json({
      url: blob.url,
      filename: blob.pathname,
      type: isVideo ? "video" : "image",
    });
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as { role?: string }).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { blobs } = await list({ prefix: "uploads/" });

    const media = blobs.map((blob) => {
      const ext = blob.pathname.split(".").pop()?.toLowerCase() || "";
      const isVideo = ["mp4", "webm", "mov"].includes(ext);
      return {
        filename: blob.pathname.split("/").pop() || blob.pathname,
        url: blob.url,
        type: isVideo ? "video" : "image",
        size: blob.size,
        uploadedAt: blob.uploadedAt.toISOString(),
      };
    });

    // Sort newest first
    media.sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt));

    return NextResponse.json({ files: media });
  } catch {
    return NextResponse.json({ files: [] });
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as { role?: string }).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { url } = await req.json();
    if (!url) {
      return NextResponse.json({ error: "No URL provided" }, { status: 400 });
    }

    await del(url);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
