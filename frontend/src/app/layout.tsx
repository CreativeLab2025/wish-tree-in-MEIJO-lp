import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto_Slab } from "next/font/google";
import "./globals.css";
import Footer from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const robotoSlab = Roboto_Slab({
  variable: "--font-roboto-slab",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wish Tree in Meijo",
  description: "情報工学部研究棟に100周年を記念した樹齢100年の大きな木が出現この木にお願いすると願い事が叶うとか...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${robotoSlab.variable} antialiased min-h-screen flex flex-col`}
      >
        <main className="flex-1">
          {children}
        </main>
        {/* --- Footer Start --- */}
        <div className="h-[80px]"></div>
        <div className=" z-[10000]">
          <Footer />
        </div>
        {/* --- Footer End --- */}
      </body>
    </html>
  );
}
