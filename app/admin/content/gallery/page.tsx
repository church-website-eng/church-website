"use client";

import { useEffect, useState, useRef } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { FiPlus, FiTrash2, FiImage, FiUpload } from "react-icons/fi";

interface GalleryPhoto {
  id: string;
  url: string;
  caption: string;
  album: string;
}

export default function EditGallery() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    fetch("/api/admin/content/gallery")
      .then((r) => r.json())
      .then((res) => { if (res.value?.photos) setPhotos(res.value.photos); })
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    await fetch("/api/admin/content/gallery", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: { photos } }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleUpload = async (index: number, file: File) => {
    const photo = photos[index];
    setUploading(photo.id);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      const data = await res.json();
      updatePhoto(index, "url", data.url);
    }
    setUploading(null);
  };

  const updatePhoto = (index: number, field: keyof GalleryPhoto, value: string) => {
    const updated = [...photos];
    updated[index] = { ...updated[index], [field]: value };
    setPhotos(updated);
  };

  const addPhoto = () => {
    const id = String(Date.now());
    setPhotos([
      ...photos,
      { id, url: "", caption: "", album: "General" },
    ]);
  };

  const removePhoto = (index: number) => {
    if (confirm("Remove this photo?")) {
      setPhotos(photos.filter((_, i) => i !== index));
    }
  };

  const albums = [...new Set(photos.map((p) => p.album).filter(Boolean))];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-serif text-2xl font-bold text-primary">Edit Gallery</h1>
        <button
          onClick={addPhoto}
          className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-light"
        >
          <FiPlus size={14} /> Add Photo
        </button>
      </div>

      <p className="mb-6 text-sm text-muted">
        Upload photos directly or paste a URL. Group photos by album name.
      </p>

      <div className="space-y-4">
        {photos.map((photo, i) => (
          <Card key={photo.id} className="max-w-2xl p-4">
            <div className="flex gap-4">
              {/* Preview */}
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted-light">
                {photo.url ? (
                  <img src={photo.url} alt={photo.caption} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <FiImage size={24} className="text-muted/30" />
                  </div>
                )}
              </div>

              {/* Fields */}
              <div className="flex-1 space-y-2">
                <div className="flex gap-2">
                  <input
                    value={photo.url}
                    onChange={(e) => updatePhoto(i, "url", e.target.value)}
                    placeholder="Image URL (paste or upload)"
                    className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    className="hidden"
                    ref={(el) => { fileInputRefs.current[photo.id] = el; }}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleUpload(i, file);
                    }}
                  />
                  <button
                    onClick={() => fileInputRefs.current[photo.id]?.click()}
                    disabled={uploading === photo.id}
                    className="shrink-0 rounded-lg border border-accent bg-accent/10 px-3 py-2 text-sm font-medium text-accent transition hover:bg-accent/20 disabled:opacity-50"
                  >
                    {uploading === photo.id ? (
                      "Uploading..."
                    ) : (
                      <FiUpload size={16} />
                    )}
                  </button>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  <input
                    value={photo.caption}
                    onChange={(e) => updatePhoto(i, "caption", e.target.value)}
                    placeholder="Caption (optional)"
                    className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                  <div className="flex gap-2">
                    <input
                      value={photo.album}
                      onChange={(e) => updatePhoto(i, "album", e.target.value)}
                      placeholder="Album name"
                      list="album-suggestions"
                      className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                    <button
                      onClick={() => removePhoto(i)}
                      className="shrink-0 rounded-lg border border-border p-2 text-destructive transition hover:bg-destructive/10"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}

        {photos.length === 0 && (
          <p className="text-sm text-muted">No gallery photos yet. Click &quot;Add Photo&quot; to create one.</p>
        )}
      </div>

      <datalist id="album-suggestions">
        {albums.map((a) => <option key={a} value={a} />)}
      </datalist>

      <div className="mt-6 flex items-center gap-3">
        <Button variant="accent" onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Gallery"}
        </Button>
        {saved && <span className="text-sm text-green-600">Saved!</span>}
      </div>
    </div>
  );
}
