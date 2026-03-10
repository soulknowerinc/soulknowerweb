/**
 * Unified blog data source: Sanity first, fallback to static.
 */
import { getPosts as getSanityPosts } from "./sanity";
import { BLOG_POSTS } from "@/data/blog-posts";

function sanityToCardFormat(post) {
  if (!post) return null;
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    date: post.date,
    readTime: post.readTime,
    gradient: post.gradient || "soul",
    image: post.image || `/blog-${post.slug}.webp`,
    id: post._id || post.slug,
  };
}

export async function getBlogPosts() {
  try {
    const sanityId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (sanityId) {
      const posts = await getSanityPosts();
      if (posts?.length > 0) {
        return posts.map(sanityToCardFormat);
      }
    }
  } catch (e) {
    console.warn("Sanity fetch failed, using static:", e.message);
  }
  return BLOG_POSTS.map((p, i) => ({ ...p, id: p.slug || i + 1 }));
}
