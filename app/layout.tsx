import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://evtrack.vercel.app"),
  title: {
    default: "EV Green Bus | Smarter, Greener Journeys",
    template: "%s | EV Green Bus",
  },
  description:
    "Plan EV bus journeys, discover routes, view live service status and travel cleaner with EV Green Bus.",
  keywords: [
    "EV bus",
    "electric bus",
    "green bus service",
    "bus routes",
    "public transport",
    "journey planner",
    "city transit",
    "EV transportation",
  ],
  authors: [{ name: "EV Green Bus", url: "https://evtrack.vercel.app" }],
  alternates: { canonical: "/", languages: { en: "/", ur: "/?lang=ur" } },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://evtrack.vercel.app/",
    siteName: "EV Green Bus",
    title: "EV Green Bus — Smarter, Greener Journeys",
    description: "A cleaner, calmer way to move around the city.",
    images: [
      {
        url: "https://evtrack.vercel.app/opengraph-image",
        width: 1200,
        height: 630,
        alt: "EV electric green bus service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EV Green Bus",
    description: "Smarter, greener journeys for everyone.",
    images: ["https://evtrack.vercel.app/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  applicationName: "EV Green Bus",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#10201b" },
    { media: "(prefers-color-scheme: light)", color: "#f6f5ef" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
