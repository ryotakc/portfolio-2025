"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type * as React from "react";
import { createContext, useContext, useEffect, useState } from "react";

// テーマトランジションのためのコンテキスト
type ThemeTransitionContextType = {
  startTransition: (x: number, y: number) => void;
};

const ThemeTransitionContext = createContext<ThemeTransitionContextType>({
  startTransition: () => {},
});

export const useThemeTransition = () => useContext(ThemeTransitionContext);

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const [transitionActive, setTransitionActive] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const startTransition = (x: number, y: number) => {
    setPosition({ x, y });

    // すでにアクティブなトランジションがあれば削除して新しいものを開始
    if (transitionActive) {
      setTransitionActive(false);
      setTimeout(() => {
        setTransitionActive(true);
      }, 10);
    } else {
      setTransitionActive(true);
    }
  };

  // トランジションが完了したらクリーンアップ
  useEffect(() => {
    if (transitionActive) {
      const timer = setTimeout(() => {
        setTransitionActive(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [transitionActive]);

  return (
    <ThemeTransitionContext.Provider value={{ startTransition }}>
      <div className="theme-transition-container">
        <NextThemesProvider {...props}>{children}</NextThemesProvider>

        {transitionActive && (
          <div
            className="theme-transition-circle"
            style={
              {
                "--x": `${position.x}px`,
                "--y": `${position.y}px`,
              } as React.CSSProperties
            }
          />
        )}
      </div>
    </ThemeTransitionContext.Provider>
  );
}
