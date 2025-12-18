"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { FloatingMenu } from "@/components/FloatingMenu";
import Footer from "@/components/footer";
import type { SiteLayoutProps } from "@/lib/layout-registry";
import { LanguageToggle } from "@/components/language-toggle";
import { ModeToggle } from "@/components/mode-toggle";

export default function CatnoseSiteLayout({ children }: SiteLayoutProps) {
  const pathname = usePathname();
  // Extract locale from pathname (e.g., /en/...)
  const locale = pathname.split("/")[1] || "en";

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-zinc-200 dark:selection:bg-zinc-800">
      <main className="w-full">
        {/* Main Content Area - Very clean and focused */}
        <div className="mx-auto w-full max-w-[680px] px-5 pt-12 pb-32 md:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </div>
      </main>

      {/* Persistent Floating Navigation */}
      <FloatingMenu currentLocale={locale} />

      {/* Minimal Footer */}
      {/* <div className="pb-8">
        <Footer />
      </div> */}
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
  );
}
