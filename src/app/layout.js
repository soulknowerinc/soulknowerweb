import {
  Cinzel_Decorative,
  Cormorant_Garamond,
  Inter,
  Noto_Serif_Devanagari,
  Outfit,
} from "next/font/google";
import "./globals.css";
import "./animations.css";

const cinzel = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-display",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-ui",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const notoDevanagari = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-deva",
  display: "swap",
});

const SITE_URL = "https://soulknower.com";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SoulKnower — Awaken Your Inner Universe",
    template: "%s | SoulKnower",
  },
  description:
    "Explore meditation, chakra healing, kundalini awakening, and spiritual growth with SoulKnower. Your guide to higher consciousness and inner peace.",
  keywords: [
    "SoulKnower",
    "meditation",
    "spirituality",
    "chakra healing",
    "kundalini",
    "consciousness",
    "third eye",
    "spiritual awakening",
    "astral projection",
    "energy healing",
  ],
  authors: [{ name: "SoulKnower", url: SITE_URL }],
  creator: "SoulKnower",
  publisher: "SoulKnower",
  formatDetection: { email: false, address: false, telephone: false },
  icons: {
    icon: [
      { url: "/logo_wb.png", type: "image/png", sizes: "48x48" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "SoulKnower",
    title: "SoulKnower — Awaken Your Inner Universe",
    description:
      "Explore meditation, chakra healing, kundalini awakening, and spiritual growth. Your guide to higher consciousness.",
    images: [
      { url: "/blog-astral.webp", width: 1200, height: 630, alt: "SoulKnower — Spiritual awakening and consciousness" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SoulKnower — Awaken Your Inner Universe",
    description: "Explore meditation, chakra healing, kundalini awakening, and spiritual growth.",
    images: ["/blog-astral.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: { canonical: SITE_URL },
};

const WEB_SITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "SoulKnower",
  url: SITE_URL,
  description: "Explore meditation, chakra healing, kundalini awakening, and spiritual growth. Your guide to higher consciousness.",
  publisher: { "@type": "Organization", name: "SoulKnower", url: SITE_URL, logo: { "@type": "ImageObject", url: `${SITE_URL}/logo_wb.png` } },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cormorant.variable} ${inter.variable} ${outfit.variable} ${notoDevanagari.variable}`}
    >
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WEB_SITE_JSON_LD) }} />
        {children}
      </body>
    </html>
  );
}
