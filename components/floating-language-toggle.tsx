"use client";

import { Languages } from "lucide-react";
import { motion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";

export function FloatingLanguageToggle() {
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale = pathname.split("/")[1] || "en";
  const pathnameWithoutLocale = pathname.substring(3) || "";

  const toggleLanguage = () => {
    const newLocale = currentLocale === "ja" ? "en" : "ja";

    // Cookie update (simplified, matching existing logic)
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;

    if (document.startViewTransition) {
      document.startViewTransition(() => router.replace(`/${newLocale}${pathnameWithoutLocale}`));
    } else {
      router.replace(`/${newLocale}${pathnameWithoutLocale}`);
    }
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      className="group flex w-full items-center justify-center px-3 py-2.5 rounded-lg text-sm text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50/50 dark:hover:bg-white/5 transition-colors"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center gap-2">
        <motion.span
          className="text-xs font-mono font-medium text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-200 transition-colors"
          key={currentLocale}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {currentLocale === "ja" ? "日本語" : "English"}
        </motion.span>
        <motion.div
          variants={{
            hover: {
              rotate: [0, -10, 10, -10, 0],
              transition: { duration: 0.5, ease: "easeInOut" },
            },
          }}
        >
          <Languages className="w-4 h-4 group-hover:text-primary transition-colors" />
        </motion.div>
      </div>
    </motion.button>
  );
}
