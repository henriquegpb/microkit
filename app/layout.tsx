import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  OPEN_GRAPH_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  TWITTER_IMAGE,
} from "./site-metadata";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  /*
   * Written the way somebody with the problem searches, not the way the product
   * describes itself. Nobody types "microinteraction library for product
   * interfaces"; they type "css button hover animation" or ask an assistant for
   * a copy-paste animated button.
   *
   * Every phrase here is something the catalog actually contains — buttons,
   * hover and click effects, tabs, an input. No toggles, modals or carousels:
   * bringing in traffic for an interaction that is not on the site costs the
   * visitor a click and the site a bounce.
   */
  keywords: [
    "copy paste microinteractions",
    "css hover effects",
    "tailwind micro animations",
    "react button hover animation",
    "css button animation",
    "animated button component react",
    "microinteractions library",
    "copy paste react components",
    "tailwind hover effects",
    "animated tabs react",
    "css sliding underline tabs",
    "animated input focus css",
    "free ui interactions",
  ],
  applicationName: SITE_NAME,
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: SITE_NAME,
    locale: "en_US",
    images: [OPEN_GRAPH_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [TWITTER_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/favicon-32x32.png?v=2",
        type: "image/png",
        sizes: "32x32",
      },
      {
        url: "/favicon-16x16.png?v=2",
        type: "image/png",
        sizes: "16x16",
      },
      {
        url: "/favicon.ico?v=2",
        type: "image/x-icon",
        sizes: "any",
      },
    ],
    shortcut: "/favicon.ico?v=2",
    apple: {
      url: "/apple-touch-icon.png?v=2",
      type: "image/png",
      sizes: "180x180",
    },
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#0b0c0e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}<Analytics /></body>
    </html>
  );
}
