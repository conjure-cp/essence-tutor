import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
//import Image from "next/image";
import { SiteHeader } from "@/components/ui/siteHeader";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Essence Tutor",
  description: "A course to learn Essence",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* Here's the top ribbon that shows about, uses, help, etc. TODO: Add in real page links later */}
      <body className="bg-gradient-to-br from-purple-800 to-purple-50">
        <SiteHeader />
        
        {children}
      </body>
    </html>
  );
}
