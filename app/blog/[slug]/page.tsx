import { getBlogPostBySlug } from "@/lib/contentful";
import { placeholderPosts } from "@/data/blog";
import { formatDate } from "@/lib/utils";
import Button from "@/components/ui/Button";
import ShareButtons from "@/components/ui/ShareButtons";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  const placeholder = placeholderPosts.find((p) => p.slug === slug);
  const data = post || placeholder || {
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
          <article className="max-w-none space-y-4 text-foreground/80 leading-relaxed">
            {data.body.split("\n\n").map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </article>

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
