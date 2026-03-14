import { createClient } from "next-sanity";

const projectId = (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "").trim();
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

let _client = null;
if (projectId && projectId !== "your-project-id") {
  try {
    _client = createClient({
      projectId,
      dataset,
      apiVersion: "2024-01-01",
      useCdn: false,
    });
  } catch (_) {
    _client = null;
  }
}
export const client = _client;

const POST_LIST = `*[_type == "post" && defined(slug.current)] | order(date desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  category,
  date,
  readTime,
  gradient,
  icon,
  "image": image.asset->url,
  heroBg,
  "related": related[]{
    "href": href,
    "icon": icon,
    "title": title,
    "desc": desc
  }
}`;

const POST_BY_SLUG = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  category,
  date,
  readTime,
  gradient,
  icon,
  "image": image.asset->url,
  heroBg,
  videoLink,
  body,
  "related": related[]{
    "href": href,
    "icon": icon,
    "title": title,
    "desc": desc
  }
}`;

export async function getPosts() {
  if (!client) return [];
  const posts = await client.fetch(POST_LIST);
  return posts || [];
}

export async function getPostBySlug(slug) {
  if (!client) return null;
  const post = await client.fetch(POST_BY_SLUG, { slug });
  return post || null;
}

export async function getAllSlugs() {
  if (!client) return [];
  const slugs = await client.fetch(
    `*[_type == "post" && defined(slug.current)].slug.current`
  );
  return slugs || [];
}
