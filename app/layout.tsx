import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "./components/Providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "improve. | All your notes, in one space",
  description:
    "A focused study companion for Kerala Plus One improvement exams — key points, trusted videos and previous questions, organised by chapter.",
};

const themeInitScript = `(function(){try{var t=localStorage.getItem("improve-theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark")}else{document.documentElement.classList.remove("dark")}}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
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
