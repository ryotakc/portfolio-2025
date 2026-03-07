"use client";

import cn from "clsx";
import type { Variants } from "motion/react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FloatingLanguageToggle } from "@/features/language-switcher/floating-language-toggle";
import { FloatingModeToggle } from "@/features/theme-switcher/floating-mode-toggle";
import { navigation } from "@/shared/lib/i18n";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/ui/tooltip";
import { Home, FileText, Menu, X, ChevronUp, Mail } from "lucide-react";
import { useWebHaptics } from "web-haptics/react";

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
  const { trigger } = useWebHaptics();

  const toggleMenu = () => {
    trigger([{ duration: 40 }]);
    setIsOpen((prev) => !prev);
  };

  const menuVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 10,
      scale: 0.95,
      transition: { duration: 0.15, type: "tween" },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 400, damping: 30 },
    },
    exit: {
      opacity: 0,
      y: 10,
      scale: 0.95,
      transition: { duration: 0.15, type: "tween" },
    },
  };

  const dockVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 15,
      scale: 0.9,
      transition: { duration: 0.15, type: "tween" },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 400, damping: 30 },
    },
    exit: {
      opacity: 0,
      y: 15,
      scale: 0.9,
      transition: { duration: 0.15, type: "tween" },
    },
  };

  return (
    <div className="fixed bottom-8 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <TooltipProvider delayDuration={100}>
        <div className="relative flex justify-center items-end" ref={menuRef}>
          <motion.div
            layout
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              layout: { type: "spring", stiffness: 400, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            style={{ borderRadius: isOpen ? 24 : 9999 }}
            className="pointer-events-auto bg-white/80 dark:bg-[#111111]/80 backdrop-blur-xl shadow-2xl border border-zinc-200/80 dark:border-white/10 overflow-hidden origin-bottom"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {!isOpen ? (
                <motion.div
                  key="dock-ui"
                  initial={{ opacity: 0, filter: "blur(4px)", scale: 0.95 }}
                  animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                  exit={{ opacity: 0, filter: "blur(4px)", scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center gap-1 p-1.5"
                >
                  <DockLink
                    href="/"
                    icon={<Home className="w-[1.125rem] h-[1.125rem]" />}
                    label={navItems.home}
                    locale={currentLocale}
                  />
                  <DockLink
                    href="/note"
                    icon={<FileText className="w-[1.125rem] h-[1.125rem]" />}
                    label={navItems.note}
                    locale={currentLocale}
                  />
                  <div className="w-[1px] h-6 bg-zinc-200 dark:bg-white/10 mx-1" />
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        onClick={toggleMenu}
                        aria-label="Open menu"
                        className="flex items-center justify-center w-10 h-10 rounded-full text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors active:scale-95 ml-0.5"
                      >
                        <ChevronUp className="w-[1.125rem] h-[1.125rem]" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top" sideOffset={12} className="rounded-lg text-xs">
                      Menu
                    </TooltipContent>
                  </Tooltip>
                </motion.div>
              ) : (
                <motion.div
                  key="menu-ui"
                  initial={{ opacity: 0, filter: "blur(4px)", scale: 0.95 }}
                  animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                  exit={{ opacity: 0, filter: "blur(4px)", scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="min-w-[280px] p-2 flex flex-col gap-1 w-full"
                >
                  <div className="px-4 py-2 text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                    Pages
                  </div>
                  <MenuLink
                    href="/"
                    icon={<Home className="w-4 h-4" />}
                    label={navItems.home}
                    locale={currentLocale}
                  />
                  <MenuLink
                    href="/note"
                    icon={<FileText className="w-4 h-4" />}
                    label={navItems.note}
                    locale={currentLocale}
                  />
                  <MenuLink
                    href="/contact"
                    icon={<Mail className="w-4 h-4" />}
                    label={navItems.contact}
                    locale={currentLocale}
                  />

                  <div className="my-1 border-t border-zinc-100/50 dark:border-white/5" />

                  <div className="px-4 py-2 text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                    Settings
                  </div>
                  <div className="flex items-center w-full gap-1.5 px-2 mb-1">
                    <div className="flex-1 flex justify-center">
                      <FloatingModeToggle />
                    </div>
                    <div className="w-[1px] h-5 bg-zinc-200 dark:bg-white/10 flex-shrink-0" />
                    <div className="flex-1 flex justify-center">
                      <FloatingLanguageToggle />
                    </div>
                  </div>

                  <div className="my-1 border-t border-zinc-100/50 dark:border-white/5" />

                  <button
                    type="button"
                    onClick={toggleMenu}
                    className="mx-1 my-0.5 flex items-center justify-center gap-2 px-4 py-1.5 rounded-xl text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100/80 dark:hover:bg-white/5 transition-all active:scale-[0.98]"
                  >
                    <X className="w-4 h-4" />
                    Close Menu
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </TooltipProvider>
    </div>
  );
}

function DockLink({
  href,
  icon,
  label,
  locale,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  locale: string;
}) {
  const pathname = usePathname();
  const fullPath = `/${locale}${href === "/" ? "" : href}`;
  const isActive =
    pathname === fullPath || (pathname.startsWith(`${fullPath}/`) && fullPath !== `/${locale}`);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={fullPath}
          className={cn(
            "flex items-center justify-center w-10 h-10 rounded-full transition-all active:scale-[0.85]",
            isActive
              ? "bg-zinc-100 dark:bg-white/10 text-zinc-900 dark:text-white"
              : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-white/5",
          )}
          aria-label={label}
        >
          {icon}
        </Link>
      </TooltipTrigger>
      <TooltipContent side="top" sideOffset={12} className="rounded-lg text-xs">
        {label}
      </TooltipContent>
    </Tooltip>
  );
}

function MenuLink({
  href,
  icon,
  label,
  locale,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  locale: string;
}) {
  const pathname = usePathname();
  const fullPath = `/${locale}${href === "/" ? "" : href}`;
  const isActive =
    pathname === fullPath || (pathname.startsWith(`${fullPath}/`) && fullPath !== `/${locale}`);

  return (
    <Link
      href={fullPath}
      className={cn(
        "flex items-center gap-3 px-4 py-2.5 mx-1 rounded-lg text-sm transition-all active:scale-[0.98]",
        isActive
          ? "bg-zinc-100/80 dark:bg-white/10 text-zinc-900 dark:text-white font-medium"
          : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-50/80 dark:hover:bg-white/5",
      )}
    >
      <div
        className={cn(
          "flex-shrink-0",
          isActive ? "text-zinc-900 dark:text-white" : "text-zinc-400 dark:text-zinc-500",
        )}
      >
        {icon}
      </div>
      {label}
    </Link>
  );
}
