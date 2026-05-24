import type { Metadata } from "next";
import { Geist, Geist_Mono, Reenie_Beanie } from "next/font/google";
import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const reenieBeanie = Reenie_Beanie({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-handwriting",
});

export const metadata: Metadata = {
  title: "Piyushee | Portfolio",
  description:
    "Minimal personal portfolio of Piyushee, focused on code, math, systems, and future Computer Engineering.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${reenieBeanie.variable} dark h-full antialiased`}
    >
      <body className="min-h-full overflow-x-hidden">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
