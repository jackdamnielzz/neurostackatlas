import type { Metadata } from "next";
import { Manrope, Newsreader } from "next/font/google";
import { SafetyRibbon } from "@/components/safety-ribbon";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NeuroStack Atlas",
  description:
    "Educational biohacking knowledge hub for substances and cognitive protocols. Not medical advice.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${newsreader.variable} min-h-screen bg-[var(--surface-1)] font-sans text-[var(--text-strong)] antialiased`}
      >
        <SafetyRibbon />
        <SiteHeader />
        <main className="mx-auto min-h-[calc(100vh-13.5rem)] w-full max-w-7xl px-4 py-8 sm:px-6">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
