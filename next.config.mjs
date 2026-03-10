/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" },
    ],
    // Fix: "resolved to private ip" when CDN resolves via IPv6 NAT64 on some networks
    dangerouslyAllowLocalIP: true,
  },
  async redirects() {
    return [
      { source: "/blog/awakening-kundalini-energy", destination: "/blog/kundalini", permanent: true },
      { source: "/blog/third-eye-activation", destination: "/blog/third-eye", permanent: true },
      { source: "/blog/astral-projection-guide", destination: "/blog/astral-travel", permanent: true },
      { source: "/blog/deep-meditation-techniques", destination: "/blog/meditation", permanent: true },
      { source: "/blog/chakra-healing-crystals", destination: "/blog/crystals", permanent: true },
      { source: "/blog/soul-purpose-discovery", destination: "/blog/soul-purpose", permanent: true },
    ];
  },
};

export default nextConfig;
