const BASE = "https://soulknower.com";

export default function robots() {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/studio", "/api/","/login", "/register"] },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
