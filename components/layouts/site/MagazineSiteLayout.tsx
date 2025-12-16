import { Analytics } from "@vercel/analytics/react";
import { unstable_ViewTransition as ViewTransition } from "react";
import { LanguageToggle } from "@/components/language-toggle";
import { ModeToggle } from "@/components/mode-toggle";
import NavbarWrapper from "@/components/navbar-wrapper";

export default function MagazineSiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen font-mono text-rurikon-500">
      {/* Top Header */}
      <header className="border-b border-rurikon-border dark:border-rurikon-border-dark p-4 sticky top-0 bg-background/90 backdrop-blur z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="font-serif text-2xl font-bold">Leo.Magazine</div>
          <div className="hidden md:block">
            <NavbarWrapper />
          </div>
          <div className="flex gap-2">
            <LanguageToggle />
            <ModeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4 md:p-8">
        <ViewTransition name="crossfade">
          {children}
          <Analytics />
        </ViewTransition>
      </main>
    </div>
  );
}
