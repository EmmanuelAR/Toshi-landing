"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/cn";

export function ThemeToggle({ className }: { className?: string }) {
  const t = useTranslations("theme");
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const current = (mounted ? theme === "system" ? resolvedTheme : theme : "light") ?? "light";
  const isDark = current === "dark";

  return (
    <button
      type="button"
      aria-label={t("toggleLabel")}
      title={isDark ? t("light") : t("dark")}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/10 text-foreground transition-colors hover:border-foreground/30 focus-ring",
        "dark:border-white/10 dark:hover:border-white/30",
        className,
      )}
      suppressHydrationWarning
    >
      <Sun className={cn("h-[18px] w-[18px] transition-all", isDark ? "scale-0 opacity-0" : "scale-100 opacity-100")} />
      <Moon className={cn("absolute h-[18px] w-[18px] transition-all", isDark ? "scale-100 opacity-100" : "scale-0 opacity-0")} />
    </button>
  );
}

function Sun({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function Moon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
