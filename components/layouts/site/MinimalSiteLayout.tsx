import { Analytics } from "@vercel/analytics/react";
// import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import cn from "clsx";
import { unstable_ViewTransition as ViewTransition } from "react";
import { LanguageToggle } from "@/components/language-toggle";
import { ModeToggle } from "@/components/mode-toggle";
import NavbarWrapper from "@/components/navbar-wrapper";

export default function MinimalSiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "font-mono",
        "w-full min-h-screen p-6 sm:p-10 md:p-14",
        "text-sm leading-6 sm:text-[15px] sm:leading-7 md:text-base md:leading-7",
        "text-rurikon-500",
      )}
    >
      <div className="fixed sm:hidden h-6 sm:h-10 md:h-14 w-full top-0 left-0 z-30 pointer-events-none content-fade-out" />
      <div className="">
        <div className="flex flex-col mobile:flex-row justify-center">
          <NavbarWrapper />
          <main className="relative flex-1 max-w-5xl [contain:inline-size]">
            <div className="absolute w-full h-px opacity-50 bg-rurikon-border dark:bg-rurikon-border-dark right-0 mobile:right-auto mobile:left-0 mobile:w-px mobile:h-full mobile:opacity-100" />
            <ViewTransition name="crossfade">
              {children}
              <Analytics />
            </ViewTransition>
          </main>
        </div>

        <div className="fixed bottom-2 md:bottom-6 right-2 md:right-6 z-50 flex flex-col gap-1 md:gap-3">
          <div>
            <LanguageToggle />
          </div>
          <div>
            <ModeToggle />
            {/* <AnimatedThemeToggler /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
