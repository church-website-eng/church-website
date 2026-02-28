"use client";

import { useEffect, useState } from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { FiPlus, FiTrash2 } from "react-icons/fi";

interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  slug: string;
  category: string;
  excerpt: string;
  body: string;
}

export default function EditBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content/blog")
      .then((r) => r.json())
      .then((res) => { if (res.value?.posts) setPosts(res.value.posts); })
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    await fetch("/api/admin/content/blog", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value: { posts } }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updatePost = (index: number, field: keyof BlogPost, value: string) => {
    const updated = [...posts];
    updated[index] = { ...updated[index], [field]: value };
    setPosts(updated);
  };

  const addPost = () => {
    const id = String(Date.now());
    setPosts([
      {
        id,
        title: "",
        author: "VSE Kunle Lawal",
        date: new Date().toISOString().split("T")[0],
        slug: "",
        category: "Parish Life",
        excerpt: "",
        body: "",
      },
      ...posts,
    ]);
  };

  const removePost = (index: number) => {
    if (confirm("Remove this blog post?")) {
      setPosts(posts.filter((_, i) => i !== index));
    }
  };

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-serif text-2xl font-bold text-primary">Edit Blog Posts</h1>
        <button
          onClick={addPost}
          className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-light"
        >
          <FiPlus size={14} /> Add Post
        </button>
      </div>

      <div className="space-y-6">
        {posts.map((post, i) => (
          <Card key={post.id} className="max-w-2xl space-y-4 p-6">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-foreground">{post.title || "New Post"}</h2>
              <button onClick={() => removePost(i)} className="text-sm text-destructive hover:underline flex items-center gap-1">
                <FiTrash2 size={14} /> Remove
              </button>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Title</label>
              <input
                value={post.title}
                onChange={(e) => {
                  updatePost(i, "title", e.target.value);
                  if (!post.slug || post.slug === generateSlug(post.title)) {
                    updatePost(i, "slug", generateSlug(e.target.value));
                  }
                }}
                className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-1 block text-sm font-medium">Author</label>
                <input
                  value={post.author}
                  onChange={(e) => updatePost(i, "author", e.target.value)}
                  className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Date</label>
                <input
                  type="date"
                  value={post.date}
                  onChange={(e) => updatePost(i, "date", e.target.value)}
                  className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Category</label>
                <input
                  value={post.category}
                  onChange={(e) => updatePost(i, "category", e.target.value)}
                  className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Excerpt (short summary)</label>
              <textarea
                rows={2}
                value={post.excerpt}
                onChange={(e) => updatePost(i, "excerpt", e.target.value)}
                className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Body (full article — separate paragraphs with blank lines)</label>
              <textarea
                rows={8}
                value={post.body}
                onChange={(e) => updatePost(i, "body", e.target.value)}
                className="w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
          </Card>
        ))}

        {posts.length === 0 && (
          <p className="text-sm text-muted">No blog posts yet. Click &quot;Add Post&quot; to create one.</p>
        )}
      </div>

      <div className="mt-6 flex items-center gap-3">
        <Button variant="accent" onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save All Posts"}
        </Button>
        {saved && <span className="text-sm text-green-600">Saved!</span>}
      </div>
    </div>
  );
}
