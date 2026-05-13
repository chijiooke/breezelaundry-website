import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  metadataBase: new URL("https://breezelaundry.ng"),
  title: {
    default: "breezelaundry",
    template: "%s — breezelaundry",
  },
  description:
    "The invisible operating system for clothing care. Schedule pickups, track your laundry, and get it delivered — across Lagos and Abuja.",
  applicationName: "breezelaundry",
  authors: [{ name: "breezelaundry", url: "https://breezelaundry.ng" }],
  keywords: ["laundry", "dry cleaning", "pickup delivery", "Lagos", "Abuja", "Nigeria"],
  openGraph: {
    siteName: "breezelaundry",
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    site: "@breezelaundry",
    creator: "@breezelaundry",
  },
  robots: {
    index: true,
    follow: true,
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
