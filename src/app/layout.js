import {
  Cinzel_Decorative,
  Cormorant_Garamond,
  Inter,
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

export const metadata = {
  metadataBase: new URL("https://soulknower.com"),
  title: "SoulKnower — Awaken Your Inner Universe",
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
  ],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
  },
  openGraph: {
    title: "SoulKnower — Awaken Your Inner Universe",
    description:
      "Explore meditation, chakra healing, kundalini awakening, and spiritual growth.",
    type: "website",
    images: [{ url: "/blog-astral.webp", width: 1200, height: 630 }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${cormorant.variable} ${inter.variable} ${outfit.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
