import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Providers } from "./providers";
import { Analytics } from '@vercel/analytics/react';

export const metadata: Metadata = {
  title: "Barelands | Landscape Photography",
  description: "Capturing the breathtaking beauty of landscapes from around the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.className} antialiased bg-zinc-900 text-zinc-100`}>
        <Providers>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
