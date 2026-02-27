"use client";

import { useState, useEffect, useRef } from "react";
import { FiUpload, FiTrash2, FiCopy, FiCheck, FiImage, FiVideo, FiFile } from "react-icons/fi";

interface MediaFile {
  filename: string;
  url: string;
  type: "image" | "video";
  size: number;
  uploadedAt: string;
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function MediaPage() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [copiedUrl, setCopiedUrl] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchFiles = async () => {
    try {
      const res = await fetch("/api/admin/upload");
      const data = await res.json();
      setFiles(data.files || []);
    } catch {
      // silent
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const uploadFile = async (file: File) => {
    setError("");
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Upload failed");
      } else {
        await fetchFiles();
      }
    } catch {
      setError("Upload failed. Please try again.");
    }
    setUploading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  };

  const deleteFile = async (url: string, filename: string) => {
    if (!confirm(`Delete ${filename}?`)) return;
    try {
      await fetch("/api/admin/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });
      await fetchFiles();
    } catch {
      // silent
    }
  };

  const copyUrl = async (url: string) => {
    await navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(""), 2000);
  };

  const images = files.filter((f) => f.type === "image");
  const videos = files.filter((f) => f.type === "video");

  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl font-bold text-primary">
        Media Library
      </h1>

      {/* Upload area */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`mb-8 flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-10 text-center transition-colors ${
          dragOver
            ? "border-accent bg-accent/5"
            : "border-border bg-muted-light hover:border-accent/50"
        }`}
      >
        <FiUpload size={32} className="mb-3 text-muted" />
        <p className="mb-1 text-sm font-medium text-primary">
          {uploading ? "Uploading..." : "Drag & drop a file here"}
        </p>
        <p className="mb-4 text-xs text-muted">
          JPG, PNG, WebP, GIF, MP4, WebM — max 50 MB
        </p>
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:bg-primary-light">
          <FiUpload size={14} />
          Choose File
          <input
            ref={inputRef}
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={uploading}
          />
        </label>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Images */}
      {images.length > 0 && (
        <>
          <h2 className="mb-4 flex items-center gap-2 font-serif text-lg font-bold text-primary">
            <FiImage size={18} /> Photos ({images.length})
          </h2>
          <div className="mb-8 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
            {images.map((file) => (
              <div
                key={file.filename}
                className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-sm"
              >
                <div className="aspect-square">
                  <img
                    src={file.url}
                    alt={file.filename}
                    className="h-full w-full object-cover"
                  />
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="flex items-center justify-between p-3">
                    <span className="truncate text-xs text-white/80">
                      {formatSize(file.size)}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => copyUrl(file.url)}
                        className="rounded-full bg-white/20 p-1.5 text-white transition hover:bg-white/40"
                        title="Copy URL"
                      >
                        {copiedUrl === file.url ? (
                          <FiCheck size={14} />
                        ) : (
                          <FiCopy size={14} />
                        )}
                      </button>
                      <button
                        onClick={() => deleteFile(file.url, file.filename)}
                        className="rounded-full bg-white/20 p-1.5 text-white transition hover:bg-destructive/80"
                        title="Delete"
                      >
                        <FiTrash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Videos */}
      {videos.length > 0 && (
        <>
          <h2 className="mb-4 flex items-center gap-2 font-serif text-lg font-bold text-primary">
            <FiVideo size={18} /> Videos ({videos.length})
          </h2>
          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            {videos.map((file) => (
              <div
                key={file.filename}
                className="overflow-hidden rounded-xl border border-border bg-card shadow-sm"
              >
                <div className="aspect-video bg-black">
                  <video
                    controls
                    preload="metadata"
                    className="h-full w-full"
                  >
                    <source src={file.url} />
                  </video>
                </div>
                <div className="flex items-center justify-between p-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-primary">
                      {file.filename}
                    </p>
                    <p className="text-xs text-muted">{formatSize(file.size)}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => copyUrl(file.url)}
                      className="rounded-full border border-border p-2 text-muted transition hover:bg-muted-light hover:text-primary"
                      title="Copy URL"
                    >
                      {copiedUrl === file.url ? (
                        <FiCheck size={14} />
                      ) : (
                        <FiCopy size={14} />
                      )}
                    </button>
                    <button
                      onClick={() => deleteFile(file.url, file.filename)}
                      className="rounded-full border border-border p-2 text-muted transition hover:bg-destructive/10 hover:text-destructive"
                      title="Delete"
                    >
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Empty state */}
      {files.length === 0 && !uploading && (
        <div className="rounded-xl border border-border bg-card p-12 text-center">
          <FiFile size={40} className="mx-auto mb-3 text-muted/30" />
          <p className="text-sm text-muted">
            No files uploaded yet. Use the upload area above to add photos and videos.
          </p>
        </div>
      )}
    </div>
  );
}
