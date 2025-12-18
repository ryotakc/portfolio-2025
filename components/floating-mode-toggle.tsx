"use client";

import { Moon, Sun } from "lucide-react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useThemeTransition } from "./theme-provider";

export function FloatingModeToggle() {
  const { theme, setTheme } = useTheme();
  const { startTransition } = useThemeTransition();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const isDark = theme === "dark";
    const nextTheme = isDark ? "light" : "dark";

    // Get position for the circular transition
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    startTransition(x, y);

    // Delay setting theme slightly to match transition
    setTimeout(() => {
      setTheme(nextTheme);
    }, 50);
  };

  if (!mounted) {
    return <div className="w-full h-10 rounded-lg bg-zinc-100/50 dark:bg-white/5 animate-pulse" />;
  }

  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={toggleTheme}
      className="group flex w-full items-center justify-between px-4 py-2.5 mx-1 rounded-lg text-sm text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50/50 dark:hover:bg-white/5 transition-colors"
      whileTap={{ scale: 0.98 }}
    >
      <span className="font-medium">Theme</span>
      <div className="relative flex items-center justify-center">
        <motion.div
          initial={false}
          animate={{
            scale: isDark ? 1 : 0,
            rotate: isDark ? 0 : 90,
            opacity: isDark ? 1 : 0,
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="absolute"
        >
          <Moon className="w-4 h-4 group-hover:text-sky-400 transition-colors" />
        </motion.div>
        <motion.div
          initial={false}
          animate={{
            scale: isDark ? 0 : 1,
            rotate: isDark ? -90 : 0,
            opacity: isDark ? 0 : 1,
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <Sun className="w-4 h-4 group-hover:text-orange-500 transition-colors" />
        </motion.div>
      </div>
    </motion.button>
  );
}
