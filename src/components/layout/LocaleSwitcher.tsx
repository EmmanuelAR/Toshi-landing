"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

export function LocaleSwitcher({ className }: { className?: string }) {
  const t = useTranslations("locale");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function select(next: Locale) {
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-foreground/10 bg-surface p-0.5 text-[12px] font-medium tracking-wide text-muted",
        "dark:border-white/10 dark:bg-white/[0.03]",
        isPending && "opacity-60",
        className,
      )}
      role="group"
      aria-label={t("label")}
    >
      {routing.locales.map((code) => {
        const isActive = code === locale;
        return (
          <button
            key={code}
            type="button"
            onClick={() => select(code)}
            aria-pressed={isActive}
            className={cn(
              "h-7 rounded-full px-3 uppercase transition-colors focus-ring",
              isActive
                ? "bg-foreground text-background"
                : "text-muted hover:text-foreground",
            )}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}
