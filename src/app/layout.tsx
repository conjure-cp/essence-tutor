import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import {ThemeProvider} from "next-themes";
import {AppSidebar} from "@/components/panels/Sidebar";
import { TooltipProvider } from "@/components/ui/tooltip"
import {SiteHeader} from "@/components/panels/Site-Header";


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
  description: "Learn Essence from scratch",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="h-svh overflow-hidden flex flex-col bg-background">
        <TooltipProvider>
          <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange={false}
          >
            <SidebarProvider className="h-svh">
              <AppSidebar />
              <main className="flex min-w-0 flex-1 flex-col">
                <SiteHeader />
                {/* add dark mode trigger */}
                {children}
              </main>
            </SidebarProvider>
          </ThemeProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
