import type { Metadata } from "next";
import "./globals.css";
import { Providers } from './providers';

export const metadata: Metadata = {
  title: "Tennis Trophy RWA | Historic Collectible Tokenization",
  description: "Own a piece of tennis history. The 1947 Championship Trophy, awarded to ladies doubles champions for over 77 years, now tokenized as a Real World Asset on the blockchain.",
  keywords: ["tennis trophy", "RWA", "real world asset", "NFT", "blockchain", "collectibles", "tokenization", "1947", "championship"],
  authors: [{ name: "Tennis Trophy RWA" }],
  openGraph: {
    title: "Tennis Trophy RWA | Historic Collectible Tokenization",
    description: "Own a piece of tennis history. The 1947 Championship Trophy, now tokenized on the blockchain.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tennis Trophy RWA | Historic Collectible Tokenization",
    description: "Own a piece of tennis history. The 1947 Championship Trophy, now tokenized on the blockchain.",
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
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-[#0C0F1A] text-[#F5F1E8]">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
