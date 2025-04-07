import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Provider } from "react-wrap-balancer";
import { unstable_ViewTransition as ViewTransition } from 'react'
import Navbar from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import { HistoryTracker } from "@/components/history-tracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >  
          <div className="md:hidden w-full pt-4 px-4 flex justify-end font-mono">
            <Navbar orientation="horizontal" />
          </div>
          <div className="container flex font-mono justify-center pt-10 md:pt-18 gap-12">
            <div className="hidden md:flex flex gap-10">
              <Navbar />
              <Separator orientation="vertical"/>        
            </div>

            
            <Provider>
              <ViewTransition name="crossfade">
                <div className="mdx-container">
                  <HistoryTracker />
                  {children}
                </div>
              </ViewTransition>        
            </Provider> 
            <div className="fixed bottom-6 right-6 z-50">
              <ModeToggle /> 
            </div> 
                
          </div>

        </ThemeProvider>

      </body>
    </html>
  );
}
