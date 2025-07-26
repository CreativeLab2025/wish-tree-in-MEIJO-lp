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

const getBasePath = () => {
  const isProd = process.env.NODE_ENV === 'production';
  return isProd ? '/wish-tree-in-MEIJO-lp' : '';
};

export const metadata: Metadata = {
  title: "Wish Tree in Meijo",
  description: "情報工学部研究棟に100周年を記念した樹齢100年の大きな木が出現この木にお願いすると願い事が叶うとか...",
  icons: {
    icon: [
      { url: `${getBasePath()}/favicons/icon-16x16.png`, sizes: '16x16', type: 'image/png' },
      { url: `${getBasePath()}/favicons/icon-32x32.png`, sizes: '32x32', type: 'image/png' },
      { url: `${getBasePath()}/favicons/icon-96x96.png`, sizes: '96x96', type: 'image/png' },
      { url: `${getBasePath()}/favicons/favicon.ico`, sizes: '16x16 32x32', type: 'image/x-icon' },
    ],
    apple: [
      { url: `${getBasePath()}/favicons/apple-touch-icon.png`, sizes: '180x180', type: 'image/png' },
      { url: `${getBasePath()}/favicons/apple-touch-icon-152x152.png`, sizes: '152x152', type: 'image/png' },
      { url: `${getBasePath()}/favicons/apple-touch-icon-144x144.png`, sizes: '144x144', type: 'image/png' },
      { url: `${getBasePath()}/favicons/apple-touch-icon-120x120.png`, sizes: '120x120', type: 'image/png' },
    ],
    other: [
      { url: `${getBasePath()}/favicons/android-chrome-192x192.png`, sizes: '192x192', type: 'image/png' },
      { url: `${getBasePath()}/favicons/android-chrome-512x512.png`, sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: `${getBasePath()}/favicons/manifest.json`,
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
