/** @type {import('next').NextConfig} */
const nextConfig = {
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
