import { notFound } from "next/navigation";
import { getPostBySlug, getAllSlugs } from "@/lib/sanity";
import { BLOG_POSTS, getPostBySlug as getStaticPost, SLUG_TO_OLD } from "@/data/blog-posts";
import BlogLayout from "../content/BlogLayout";
import PortableTextRenderer from "@/components/PortableTextRenderer";

export const revalidate = 60; // Re-fetch from Sanity every 60 seconds
export const dynamicParams = true; // Allow new slugs not in generateStaticParams

// Static content components (fallback when Sanity has no data)
import MeditationContent from "../content/meditation";
import ThirdEyeContent from "../content/third-eye";
import KundaliniContent from "../content/kundalini";
import AstralTravelContent from "../content/astral-travel";
import CrystalsContent from "../content/crystals";
import SoulPurposeContent from "../content/soul-purpose";
import MantrasContent from "../content/mantras";
import MoonRitualsContent from "../content/moon-rituals";
import SacredTextsContent from "../content/sacred-texts";

const STATIC_CONTENT_MAP = {
  meditation: MeditationContent,
  "third-eye": ThirdEyeContent,
  kundalini: KundaliniContent,
  "astral-travel": AstralTravelContent,
  crystals: CrystalsContent,
  "soul-purpose": SoulPurposeContent,
  mantras: MantrasContent,
  "moon-rituals": MoonRitualsContent,
  "sacred-texts": SacredTextsContent,
};

const DEFAULT_RELATED = [
  { icon: "🔮", title: "Third Eye Activation", desc: "Open the gateway to higher perception.", href: "/blog/third-eye" },
  { icon: "🐍", title: "Kundalini Awakening", desc: "Unlock the serpent energy.", href: "/blog/kundalini" },
  { icon: "🕉️", title: "Sacred Mantras", desc: "Harness vibrational power.", href: "/blog/mantras" },
];

export async function generateStaticParams() {
  const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (sanityProjectId) {
    try {
      const slugs = await getAllSlugs();
      if (slugs?.length > 0) {
        return slugs.map((slug) => ({ slug }));
      }
    } catch (_) {}
  }
  const allSlugs = [
    ...BLOG_POSTS.map((p) => p.slug),
    ...Object.keys(SLUG_TO_OLD),
  ];
  return allSlugs.map((slug) => ({ slug }));
}

const SITE_URL = "https://soulknower.com";

function parseDateForISO(dateStr) {
  if (!dateStr) return null;
  const months = { Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06", Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12" };
  const m = dateStr.match(/(\w{3})\s+(\d{1,2}),\s+(\d{4})/);
  if (!m) return null;
  const [, mon, day, year] = m;
  return `${year}-${months[mon] || "01"}-${day.padStart(2, "0")}`;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const canonicalSlug = SLUG_TO_OLD[slug] || slug;
  const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  let post = null;
  if (sanityProjectId) {
    try {
      post = await getPostBySlug(canonicalSlug);
    } catch (_) {}
  }
  if (!post) post = getStaticPost(slug);
  if (!post) return {};

  const image = post.image?.startsWith("http") ? post.image : post.image || `/blog-${canonicalSlug}.webp`;
  const canonicalUrl = `${SITE_URL}/blog/${canonicalSlug}`;
  const publishedTime = parseDateForISO(post.date);

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: "article",
      url: canonicalUrl,
      title: post.title,
      description: post.excerpt,
      images: [{ url: image, width: 1200, height: 630, alt: post.title }],
      ...(publishedTime && { publishedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [image],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const canonicalSlug = SLUG_TO_OLD[slug] || slug;
  const sanityProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  if (sanityProjectId) {
    try {
      const post = await getPostBySlug(canonicalSlug);
      if (post) {
        const related = post.related?.length > 0 ? post.related : DEFAULT_RELATED;
        const normalizedPost = {
          ...post,
          image: post.image || `/blog-${canonicalSlug}.webp`,
          heroBg: post.heroBg || "meditation",
        };
        return (
          <BlogLayout post={normalizedPost} related={related}>
            <article className="blog-article">
              {post.body?.length > 0 ? (
                <PortableTextRenderer value={post.body} />
              ) : (
                <div className="article-section">
                  <p>{post.excerpt}</p>
                </div>
              )}
            </article>
          </BlogLayout>
        );
      }
    } catch (_) {}
  }

  const post = getStaticPost(slug);
  const Content = STATIC_CONTENT_MAP[canonicalSlug];
  if (!post || !Content) notFound();
  return <Content post={post} />;
}
