import { getBlogPosts } from "@/lib/blog-source";
import BlogsPageClient from "@/components/BlogsPageClient";

export const revalidate = 60; // Re-fetch from Sanity every 60 seconds

export const metadata = {
  title: "Sacred Manuscript — Spiritual Writings",
  description:
    "Explore ancient wisdom, energy healing, kundalini awakening, third eye activation, and the mysteries of consciousness. SoulKnower's sacred manuscript of spiritual teachings.",
  openGraph: {
    title: "Sacred Manuscript — Spiritual Writings | SoulKnower",
    description: "Explore ancient wisdom, energy healing, and spiritual awakening through our curated writings.",
    url: "https://soulknower.com/blogs",
  },
};

export default async function BlogsPage() {
  const posts = await getBlogPosts();
  return <BlogsPageClient posts={posts} />;
}
