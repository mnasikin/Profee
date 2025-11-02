import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { getFallbackPersonalInfo, getFallbackProjects } from "@/lib/fallback-data";
import { getConfig } from "@/lib/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const config = getConfig();
const [fallbackPersonalInfo] = getFallbackPersonalInfo();
const fallbackProjects = getFallbackProjects();

const metadataTitle =
  config.siteTitle ||
  (fallbackPersonalInfo
    ? `${fallbackPersonalInfo.fullName} - ${fallbackPersonalInfo.title}`
    : config.portalTitle);

const metadataDescription =
  fallbackPersonalInfo?.bio || config.siteDescription || config.portalDescription;

const metadataKeywords = config.siteKeywords
  ? config.siteKeywords.split(",").map((keyword) => keyword.trim()).filter(Boolean)
  : [];

const openGraphImages = fallbackProjects.reduce<Array<{ url: string; alt: string }>>((images, project) => {
  if (project.imageUrl && project.imageUrl.trim() !== "") {
    images.push({
      url: project.imageUrl,
      alt: project.title,
    });
  }
  return images;
}, []);

const baseUrl = config.siteUrl ? config.siteUrl.replace(/\/$/, "") : "";
const hasCustomIcons = Boolean(baseUrl);

const metadataIcons = hasCustomIcons
  ? {
      icon: [
        { url: `${baseUrl}/img/icon/favicon-96x96.png`, type: "image/png", sizes: "96x96" },
        { url: `${baseUrl}/img/icon/favicon.svg`, type: "image/svg+xml" },
        { url: `${baseUrl}/img/icon/favicon.ico`, rel: "shortcut icon" },
      ],
      apple: [
        { url: `${baseUrl}/img/icon/apple-touch-icon.png`, sizes: "180x180" },
      ],
    }
  : {
      icon: [
        { url: "/img/favicon.png", type: "image/png" },
        { url: "/favicon.ico", rel: "shortcut icon" },
      ],
    };

export const metadata: Metadata = {
  title: metadataTitle,
  description: metadataDescription,
  keywords: metadataKeywords,
  authors: fallbackPersonalInfo
    ? [{ name: fallbackPersonalInfo.fullName, url: config.websiteUrl || config.siteUrl }]
    : undefined,
  alternates: config.siteUrl
    ? { canonical: config.siteUrl }
    : undefined,

  icons: metadataIcons,

  manifest: hasCustomIcons ? `${baseUrl}/img/icon/site.webmanifest` : undefined,

  other: {
    "apple-mobile-web-app-title": "Profeel",
  },

  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: config.siteUrl,
    siteName: config.siteTitle || metadataTitle,
    type: "website",
    images: openGraphImages.length ? openGraphImages : undefined,
  },
  twitter: {
    card: "summary_large_image",
    title: metadataTitle,
    description: metadataDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={config.theme === "dark" ? "dark" : undefined}
      data-theme={config.theme}
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
