import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "./components/Providers";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") || "http://localhost:3000";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "improve. | All your notes, in one space",
    template: "%s | improve.",
  },
  description:
    "A focused study companion for Kerala Plus One improvement exams — trusted videos, notes and previous questions, organised by chapter.",
  manifest: "/manifest.webmanifest",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "improve.",
    title: "improve. | All your notes, in one space",
    description:
      "A calm, practical study companion for Kerala Plus One improvement exams.",
  },
  twitter: {
    card: "summary_large_image",
    title: "improve. | All your notes, in one space",
    description: "Trusted videos, notes and previous questions, organised by chapter.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#10b981" },
    { media: "(prefers-color-scheme: dark)", color: "#111111" },
  ],
};

const themeInitScript = `(function(){try{var t=localStorage.getItem("improve-theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark")}else{document.documentElement.classList.remove("dark")}}catch(e){}})();`;

// Explicit props (not the generated LayoutProps global) so `tsc --noEmit`
// passes on a fresh checkout before `next typegen`/`next build` runs.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-full flex-col bg-[#fafaf8] text-slate-900 dark:bg-[#111] dark:text-neutral-100">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
