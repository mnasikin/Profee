import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { getFallbackPersonalInfo, getFallbackProjects } from "@/lib/fallback-data";
import { getConfig } from "@/lib/config";

// Font setup
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Config & base setup
const config = getConfig();
const [fallbackPersonalInfo] = getFallbackPersonalInfo();
const fallbackProjects = getFallbackProjects();

const metadataTitle = config.siteTitle || config.portalTitle;
const metadataDescription = config.siteDescription || config.portalDescription;
const metadataKeywords = config.siteKeywords
  ? config.siteKeywords.split(",").map((k) => k.trim()).filter(Boolean)
  : [];

const baseUrl = config.siteUrl ? config.siteUrl.replace(/\/$/, "") : "";
const metadataBase = baseUrl ? new URL(baseUrl) : undefined;
const hasCustomIcons = Boolean(baseUrl);

// URL Resolver Helper
const resolveImageUrl = (value?: string | null) => {
  if (!value) return null;
  const trimmed = value.trim().replace(/^['"]|['"]$/g, "");
  if (!trimmed) return null;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (!baseUrl) return null;
  return `${baseUrl}${trimmed.startsWith("/") ? trimmed : `/${trimmed}`}`;
};

const envOgImage = process.env.OG_IMAGE?.trim().replace(/^['"]|['"]$/g, "");
const ogImageFromEnv = envOgImage || config.ogImage || "/img/og-image.png";
const resolvedOgImage = resolveImageUrl(ogImageFromEnv) || ogImageFromEnv;

const openGraphImages = resolvedOgImage
  ? [{ url: resolvedOgImage, alt: metadataTitle || "Open Graph Image" }]
  : [];

const openGraphImageUrls = openGraphImages
  .map((img) => img.url)
  .filter((url): url is string => Boolean(url && url.trim()));

const pruneUndefined = <T extends Record<string, unknown>>(obj: T) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] === undefined || obj[key] === null) {
      delete obj[key];
    }
  });
  return obj;
};

const schemaGraphItems: Array<Record<string, unknown>> = [];

const websiteSchema = pruneUndefined({
  "@type": "WebSite",
  "@id": baseUrl ? `${baseUrl}#website` : undefined,
  name: config.defaultName || fallbackPersonalInfo?.fullName || config.portalTitle || undefined,
  url: baseUrl || config.siteUrl || undefined,
  description: metadataDescription || undefined,
  inLanguage: "en-US",
  publisher: fallbackPersonalInfo
    ? pruneUndefined({
        "@type": "Person",
        name: fallbackPersonalInfo.fullName,
        jobTitle: fallbackPersonalInfo.title,
        url: baseUrl || config.siteUrl || undefined,
        sameAs: [
          config.githubUrl || config.defaultGithub || undefined,
          config.linkedinUrl || config.defaultLinkedin || undefined,
        ].filter((val): val is string => Boolean(val && val.trim())),
      })
    : undefined,
});

if (websiteSchema.url) schemaGraphItems.push(websiteSchema);

if (fallbackPersonalInfo) {
  const personSchema = pruneUndefined({
    "@type": "Person",
    "@id": baseUrl ? `${baseUrl}#person` : undefined,
    name: fallbackPersonalInfo.fullName,
    jobTitle: fallbackPersonalInfo.title,
    description: fallbackPersonalInfo.bio || undefined,
    url: baseUrl || config.siteUrl || undefined,
    sameAs: [
      config.githubUrl || config.defaultGithub || undefined,
      config.linkedinUrl || config.defaultLinkedin || undefined,
    ].filter((val): val is string => Boolean(val && val.trim())),
  });
  schemaGraphItems.push(personSchema);
}

const projectSchemas = fallbackProjects
  .map((project) => {
    const authorSameAs = [
      config.githubUrl || config.defaultGithub || undefined,
      config.linkedinUrl || config.defaultLinkedin || undefined,
    ].filter((val): val is string => Boolean(val && val.trim()));

    return pruneUndefined({
      "@type": "CreativeWork",
      "@id": baseUrl ? `${baseUrl}#project-${project.id}` : undefined,
      name: project.title,
      description: project.description,
      url: project.projectUrl?.trim() || undefined,
      image: resolveImageUrl(project.imageUrl) || project.imageUrl || undefined,
      sameAs: [
        project.projectUrl?.trim() || undefined,
        project.githubUrl?.trim() || undefined,
      ].filter((val): val is string => Boolean(val && val.trim())),
      author: fallbackPersonalInfo
        ? pruneUndefined({
            "@type": "Person",
            name: fallbackPersonalInfo.fullName,
            jobTitle: fallbackPersonalInfo.title,
            sameAs: authorSameAs,
          })
        : undefined,
    });
  })
  .filter((p) => Object.keys(p).length > 1);

schemaGraphItems.push(...projectSchemas);

const structuredData =
  schemaGraphItems.length > 0
    ? {
        "@context": "https://schema.org",
        "@graph": schemaGraphItems,
      }
    : null;

const metadataIcons = hasCustomIcons
  ? {
      icon: [
        { url: `${baseUrl}/img/icon/favicon-96x96.png`, type: "image/png", sizes: "96x96" },
        { url: `${baseUrl}/img/icon/favicon.svg`, type: "image/svg+xml" },
        { url: `${baseUrl}/img/icon/favicon.ico`, rel: "shortcut icon" },
      ],
      apple: [{ url: `${baseUrl}/img/icon/apple-touch-icon.png`, sizes: "180x180" }],
    }
  : {
      icon: [
        { url: "/img/favicon.png", type: "image/png" },
        { url: "/favicon.ico", rel: "shortcut icon" },
      ],
    };

export const metadata: Metadata = {
  metadataBase,
  title: metadataTitle,
  description: metadataDescription,
  keywords: metadataKeywords,
  authors: fallbackPersonalInfo
    ? [{ name: fallbackPersonalInfo.fullName, url: config.websiteUrl || config.siteUrl }]
    : undefined,
  alternates: config.siteUrl ? { canonical: config.siteUrl } : undefined,
  icons: metadataIcons,
  manifest: hasCustomIcons ? `${baseUrl}/img/icon/site.webmanifest` : undefined,
  other: {
    "apple-mobile-web-app-title": "Profee",
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
    images: openGraphImageUrls.length ? [openGraphImageUrls[0]] : undefined,
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
        {structuredData && (
          <script
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(structuredData, null, 2),
            }}
          />
        )}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
