import type { Metadata } from "next";
import { Inter, Playfair_Display, Italianno } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const italianno = Italianno({
  weight: "400",
  variable: "--font-italianno",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dear Darling",
  description: "Wear the Light - Handcrafted heirloom jewelry",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${italianno.variable} h-full antialiased bg-[#f5f1ea] text-[#1a1a1a]`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
