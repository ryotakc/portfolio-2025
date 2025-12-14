"use client";

import * as React from "react";
import { useRef } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useThemeTransition } from "./theme-provider";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const { startTransition } = useThemeTransition();
  const buttonRef = useRef<HTMLDivElement>(null);

  const toggleTheme = (e: React.MouseEvent) => {
    // ボタン要素の位置を取得
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();

      // ボタンの中心ではなく、右下の位置を使用
      const x = rect.right;
      const y = rect.bottom;

      // アニメーショントランジションを開始
      startTransition(x, y);

      // テーマを切り替え (少し遅延させてアニメーションと同期)
      setTimeout(() => {
        setTheme(theme === "light" ? "dark" : "light");
      }, 50);
    }
  };

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div
      ref={buttonRef}
      onClick={toggleTheme}
      className="relative w-12 h-12 cursor-pointer flex items-center justify-center group z-50"
    >
      {/* Icon */}
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />

      {/* Corners */}
      {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos, i) => (
        <span
          key={i}
          className={`absolute ${pos} w-2 h-2 border-neutral-400 transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none ${
            i < 2 ? "border-t" : "border-b"
          } ${i % 2 === 0 ? "border-l" : "border-r"}`}
        />
      ))}
    </div>
  );
}
