import { notFound } from "next/navigation";
import { BLOG_POSTS, getPostBySlug, SLUG_TO_OLD } from "@/data/blog-posts";
import MeditationContent from "../content/meditation";
import ThirdEyeContent from "../content/third-eye";
import KundaliniContent from "../content/kundalini";
import AstralTravelContent from "../content/astral-travel";
import CrystalsContent from "../content/crystals";
import SoulPurposeContent from "../content/soul-purpose";
import MantrasContent from "../content/mantras";
import MoonRitualsContent from "../content/moon-rituals";
import SacredTextsContent from "../content/sacred-texts";

const CONTENT_MAP = {
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

export async function generateStaticParams() {
  const allSlugs = [
    ...BLOG_POSTS.map((p) => p.slug),
    ...Object.keys(SLUG_TO_OLD),
  ];
  return allSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} — SoulKnower`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const canonicalSlug = SLUG_TO_OLD[slug] || slug;
  const post = getPostBySlug(slug);
  const Content = CONTENT_MAP[canonicalSlug];

  if (!post || !Content) notFound();

  return <Content post={post} />;
}
