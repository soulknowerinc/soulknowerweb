import { getBlogPosts } from "@/lib/blog-source";

export async function GET() {
  try {
    const posts = await getBlogPosts();
    return Response.json(posts);
  } catch (err) {
    console.error("Blogs API error:", err);
    return Response.json([], { status: 500 });
  }
}
