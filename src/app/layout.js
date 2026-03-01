import "./globals.css";
import "./animations.css";

export const metadata = {
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
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "SoulKnower — Awaken Your Inner Universe",
    description:
      "Explore meditation, chakra healing, kundalini awakening, and spiritual growth.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
