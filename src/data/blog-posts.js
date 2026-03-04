export const BLOG_POSTS = [
  { slug: "meditation", title: "Sacred Silence: Advanced Meditation for Soul Connection", excerpt: "Go beyond ordinary meditation. These ancient Vedic techniques will guide you into the deepest states of consciousness.", category: "Meditation", date: "Feb 5, 2026", readTime: "12 min read", gradient: "meditation", icon: "🧘", image: "/blog-meditation.webp", heroBg: "meditation" },
  { slug: "third-eye", title: "Opening the Third Eye: Gateway to Higher Perception", excerpt: "The Ajna chakra, your third eye, is the seat of intuition and inner wisdom. Learn powerful techniques to activate this divine center.", category: "Third Eye", date: "Feb 15, 2026", readTime: "10 min read", gradient: "third-eye", icon: "🔮", image: "/blog-third-eye.webp", heroBg: "third-eye" },
  { slug: "kundalini", title: "Awakening the Serpent Within: A Guide to Kundalini Energy", excerpt: "Discover the ancient science of kundalini awakening and how the dormant energy at the base of your spine holds the key to spiritual transcendence.", category: "Kundalini", date: "Feb 20, 2026", readTime: "14 min read", gradient: "kundalini", icon: "🐍", image: "/blog-kundalini.webp", heroBg: "kundalini" },
  { slug: "astral-travel", title: "The Astral Journey: Traveling Beyond the Physical Realm", excerpt: "Explore the art of astral projection — the ability to consciously separate your soul from the physical body and travel through higher dimensions.", category: "Astral Travel", date: "Feb 10, 2026", readTime: "13 min read", gradient: "soul", icon: "✨", image: "/blog-astral.webp", heroBg: "astral" },
  { slug: "crystals", title: "Crystal Alchemy: Healing Your Seven Sacred Energy Centers", excerpt: "Each chakra resonates with specific crystalline frequencies. Learn to harness the power of sacred stones to balance your energy body.", category: "Chakra Healing", date: "Jan 28, 2026", readTime: "11 min read", gradient: "kundalini", icon: "💎", image: "/blog-crystals.webp", heroBg: "crystals" },
  { slug: "soul-purpose", title: "Discovering Your Soul's Blueprint: Dharma and Destiny", excerpt: "Your soul chose this life for a reason. Uncover the cosmic blueprint of your existence and align with your true dharma.", category: "Soul Purpose", date: "Jan 20, 2026", readTime: "11 min read", gradient: "soul", icon: "🌟", image: "/blog-soul-purpose.webp", heroBg: "sacred-texts" },
  { slug: "mantras", title: "The Power of Sacred Mantras: Vibrations That Transform Reality", excerpt: "Mantras are not mere words — they are vibrational keys that unlock the deepest levels of consciousness.", category: "Mantras", date: "Jan 15, 2026", readTime: "10 min read", gradient: "kundalini", icon: "🕉️", image: "/blog-astral.webp", heroBg: "mantras" },
  { slug: "moon-rituals", title: "Moon Rituals: Harnessing Lunar Cycles for Spiritual Transformation", excerpt: "Align with the sacred rhythms of the moon to amplify your intentions and deepen your spiritual practice.", category: "Moon Rituals", date: "Jan 10, 2026", readTime: "9 min read", gradient: "meditation", icon: "🌙", image: "/blog-astral.webp", heroBg: "moon" },
  { slug: "sacred-texts", title: "Sacred Texts: Timeless Wisdom for the Modern Seeker", excerpt: "Explore the eternal teachings of the Vedas, Upanishads, and world scriptures that have guided seekers for millennia.", category: "Sacred Texts", date: "Jan 5, 2026", readTime: "8 min read", gradient: "soul", icon: "📿", image: "/blog-astral.webp", heroBg: "sacred-texts" },
];

export const SLUG_TO_OLD = {
  "awakening-kundalini-energy": "kundalini",
  "third-eye-activation": "third-eye",
  "astral-projection-guide": "astral-travel",
  "deep-meditation-techniques": "meditation",
  "chakra-healing-crystals": "crystals",
  "soul-purpose-discovery": "soul-purpose",
};

export function getPostBySlug(slug) {
  const canonical = SLUG_TO_OLD[slug] || slug;
  return BLOG_POSTS.find((p) => p.slug === canonical) || BLOG_POSTS.find((p) => p.slug === slug);
}
