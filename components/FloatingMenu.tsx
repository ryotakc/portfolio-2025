"use client";

import cn from "clsx";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { navigation } from "@/lib/i18n";
import { FloatingLanguageToggle } from "./floating-language-toggle";
import { FloatingModeToggle } from "./floating-mode-toggle";

interface FloatingMenuProps {
  currentLocale?: string;
}

export function FloatingMenu({ currentLocale = "en" }: FloatingMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close menu on route change
  // biome-ignore lint/correctness/useExhaustiveDependencies: We want to trigger this effect when pathname changes to close the menu
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navItems = navigation[currentLocale as keyof typeof navigation] || navigation.en;

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const menuVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transition: { duration: 0.2, type: "tween" } as any,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transition: { type: "spring", stiffness: 300, damping: 25 } as any,
    },
    exit: {
      opacity: 0,
      y: 20,
      scale: 0.95,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      transition: { duration: 0.15, type: "tween" } as any,
    },
  };

  return (
    <div className="fixed bottom-8 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div className="relative pointer-events-auto" ref={menuRef}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={menuVariants}
              className="absolute bottom-16 left-1/2 -translate-x-1/2 min-w-[280px] bg-white/80 dark:bg-[#111111]/80 backdrop-blur-md rounded-[20px] shadow-2xl border border-zinc-200/80 dark:border-white/15 overflow-hidden"
            >
              <div className="p-2 flex flex-col gap-1">
                <div className="px-4 py-2 text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                  Pages
                </div>
                <MenuLink href="/" label={navItems.home} locale={currentLocale} />
                <MenuLink href="/about" label={navItems.about} locale={currentLocale} />
                <MenuLink href="/contact" label={navItems.contact} locale={currentLocale} />

                <div className="my-1 border-t border-zinc-100/50 dark:border-white/5" />

                <div className="px-4 py-2 text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                  Settings
                </div>
                <div className="flex items-center w-full gap-1.5">
                  <div className="flex-1 flex justify-center">
                    <FloatingModeToggle />
                  </div>
                  <div className="w-[1px] h-5 bg-zinc-100/50 dark:bg-white/5 flex-shrink-0" />
                  <div className="flex-1 flex justify-center">
                    <FloatingLanguageToggle />
                  </div>
                </div>

                {/* Links Section (Hidden for now) */}
                {/* 
                <div className="my-1 border-t border-zinc-100/50 dark:border-white/5" />
                <div className="px-4 py-2 text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                  Links
                </div>
                <a
                  href="https://github.com/ryotakc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2.5 mx-1 rounded-lg text-sm text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50/50 dark:hover:bg-white/5 transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="https://x.com/ryotakc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2.5 mx-1 rounded-lg text-sm text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50/50 dark:hover:bg-white/5 transition-colors"
                >
                  X (Twitter)
                </a> 
                */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={toggleMenu}
          className={cn(
            "flex items-center gap-2 px-5 py-3 rounded-full shadow-lg transition-all active:scale-95 backdrop-blur-md",
            "bg-white/70 text-zinc-900 border border-zinc-200 hover:bg-white/80",
            "dark:bg-[#111111]/50 dark:text-white dark:border-white/10 dark:hover:bg-[#111111]/60",
            isOpen &&
              "ring-2 ring-offset-2 ring-zinc-900 dark:ring-white dark:ring-offset-zinc-950",
          )}
        >
          <span className="text-sm font-medium">Menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("transition-transform duration-200", isOpen && "rotate-180")}
            aria-hidden="true"
          >
            <path d="m18 15-6-6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function MenuLink({ href, label, locale }: { href: string; label: string; locale: string }) {
  const pathname = usePathname();
  const fullPath = `/${locale}${href === "/" ? "" : href}`;
  const isActive =
    pathname === fullPath || (pathname.startsWith(`${fullPath}/`) && fullPath !== `/${locale}`);

  return (
    <Link
      href={fullPath}
      className={cn(
        "block px-4 py-2.5 mx-1 rounded-lg text-sm transition-colors",
        isActive
          ? "bg-zinc-100/80 dark:bg-white/10 text-zinc-900 dark:text-white font-medium"
          : "text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50/50 dark:hover:bg-white/5",
      )}
    >
      {label}
    </Link>
  );
}
