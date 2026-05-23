import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export function Badge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-surface px-3 py-1 text-[12px] font-medium uppercase tracking-[0.16em] text-muted",
        "dark:border-white/10 dark:bg-white/[0.03]",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-mint" aria-hidden />
      {children}
    </span>
  );
}
