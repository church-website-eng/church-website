import { getBlogPostBySlug } from "@/lib/contentful";
import { getContent } from "@/lib/content";
import { placeholderPosts } from "@/data/blog";
import { formatDate } from "@/lib/utils";
import Button from "@/components/ui/Button";
import ShareButtons from "@/components/ui/ShareButtons";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

function getEmbedUrl(url: string) {
  const ytMatch = url.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([\w-]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  return url;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const [post, dbData] = await Promise.all([
    getBlogPostBySlug(slug),
    getContent("blog", { posts: [] as Array<{ id: string; title: string; author: string; date: string; slug: string; category: string; excerpt: string; body: string; imageUrl?: string; videoUrl?: string }> }),
  ]);

  const dbPost = (dbData.posts || []).find((p: { slug: string }) => p.slug === slug) as { title: string; author: string; date: string; body: string; category: string; imageUrl?: string; videoUrl?: string } | undefined;
  const placeholder = placeholderPosts.find((p) => p.slug === slug);
  const data = dbPost || post || placeholder || {
    title: slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" "),
    author: "VSE Kunle Lawal",
    date: "2026-02-20",
    body: "Blog post content will appear here when content is added through Contentful CMS. Please check back soon.",
    category: "Parish Life",
  };

  if (!data) notFound();

  const imageUrl = (data as { imageUrl?: string }).imageUrl;
  const videoUrl = (data as { videoUrl?: string }).videoUrl;

  return (
    <>
      <section className="bg-primary py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">
            {data.category}
          </p>
          <h1 className="font-serif text-3xl font-bold md:text-4xl">
            {data.title}
          </h1>
          <p className="mt-3 text-white/70">
            {data.author} &middot; {formatDate(data.date)}
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4">
          {imageUrl && (
            <img
              src={imageUrl}
              alt={data.title}
              className="mb-8 w-full rounded-2xl object-cover shadow-lg"
            />
          )}

          {videoUrl && (
            <div className="mb-8 overflow-hidden rounded-2xl shadow-lg">
              <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                  src={getEmbedUrl(videoUrl)}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={data.title}
                />
              </div>
            </div>
          )}

          <article
            className="prose prose-sm sm:prose max-w-none text-foreground/80 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: data.body }}
          />

          <div className="mt-8 mb-8">
            <ShareButtons title={data.title} />
          </div>

          <div>
            <Button href="/blog" variant="secondary">
              &larr; All Posts
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
