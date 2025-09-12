import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister"; // 👈 added

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bible Maps - Explore Biblical Geography",
  description:
    "Interactive biblical maps covering Old Testament, New Testament, and detailed book-by-book geographical references",
  icons: {
    icon: "/bible-maps-icon.png",
  },
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0f172a" />
      </head>

      <body className={inter.className}>
        {children}
        <ServiceWorkerRegister /> {/* 👈 ensures SW gets registered */}
      </body>
    </html>
  );
}
