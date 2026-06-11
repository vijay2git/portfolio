import type { Metadata, Viewport } from "next";
import { Inter_Tight, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import "@/styles.css";
import { Providers } from "./providers";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
});

export const viewport: Viewport = {
  themeColor: "#121212",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Vijayaraghavan — AI Engineer & Full Stack Developer",
    template: "%s | Vijayaraghavan",
  },
  description:
    "AI Engineer building intelligent systems — RAG architectures, AI agents, production SaaS platforms, and scalable full-stack applications. Available for premium projects.",
  keywords: [
    "AI Engineer",
    "Full Stack Developer",
    "RAG Architecture",
    "Next.js",
    "TypeScript",
    "Python",
    "Machine Learning",
    "SaaS Development",
    "Vector Search",
    "AI Agents",
  ],
  authors: [{ name: "Vijayaraghavan" }],
  creator: "Vijayaraghavan",
  openGraph: {
    type: "website",
    siteName: "Vijayaraghavan — AI Engineer & Full Stack Developer",
    locale: "en_US",
    title: "Vijayaraghavan — AI Engineer & Full Stack Developer",
    description:
      "Building intelligent systems that scale — from RAG architectures and AI agents to production SaaS platforms.",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@vijay2git",
    title: "Vijayaraghavan — AI Engineer & Full Stack Developer",
    description:
      "Building intelligent systems that scale — from RAG architectures and AI agents to production SaaS platforms.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Vijayaraghavan",
              url: "https://portfolio.vijayaraghavan.dev",
              jobTitle: "AI Engineer & Full Stack Developer",
              description:
                "Building intelligent systems — RAG architectures, AI agents, production SaaS platforms, and scalable full-stack applications.",
              sameAs: ["https://github.com/vijay2git", "https://linkedin.com/in/vijayaraghavan"],
              knowsAbout: [
                "Artificial Intelligence",
                "Machine Learning",
                "Full Stack Development",
                "RAG Architecture",
                "Next.js",
                "TypeScript",
                "Python",
                "React",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${interTight.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable} font-sans antialiased bg-background text-foreground`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
