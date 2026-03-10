import { getAllSlugs } from "@/lib/sanity";
import { BLOG_POSTS } from "@/data/blog-posts";

const BASE = "https://soulknower.com";

export default async function sitemap() {
  const staticPages = [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/blogs`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/videos`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  ];

  let blogSlugs = [];
  try {
    const sanityId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    if (sanityId) {
      const slugs = await getAllSlugs();
      if (slugs?.length > 0) blogSlugs = slugs;
    }
  } catch (_) {}

  if (blogSlugs.length === 0) {
    blogSlugs = BLOG_POSTS.map((p) => p.slug);
  }

  const blogPages = blogSlugs.map((slug) => ({
    url: `${BASE}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}
