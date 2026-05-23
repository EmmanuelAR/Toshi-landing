"use client";

import Image from "next/image";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap, useGSAP } from "@/lib/gsap";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const t = useTranslations("hero");
  const ref = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          if (!ctx.conditions?.motion) return;

          const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

          tl.from("[data-hero-image]", {
            opacity: 0,
            scale: 1.06,
            duration: 1.4,
          });

          tl.from(
            "[data-hero-eyebrow]",
            { opacity: 0, y: 14, duration: 0.7 },
            "-=0.95",
          );

          const lines = gsap.utils.toArray<HTMLElement>("[data-hero-line]");
          lines.forEach((line) => {
            const words = line.querySelectorAll<HTMLElement>("[data-word]");
            tl.from(
              words,
              {
                yPercent: 110,
                duration: 1.1,
                stagger: 0.07,
              },
              "-=0.7",
            );
          });

          tl.from(
            "[data-hero-sub]",
            { opacity: 0, y: 18, duration: 0.8 },
            "-=0.6",
          );
          tl.from(
            "[data-hero-cta]",
            { opacity: 0, y: 14, duration: 0.6, stagger: 0.08 },
            "-=0.55",
          );
          tl.from(
            "[data-hero-card]",
            { opacity: 0, y: 26, scale: 0.96, duration: 1 },
            "-=0.8",
          );
          tl.from(
            "[data-hero-badge]",
            { opacity: 0, y: 12, duration: 0.6, stagger: 0.08 },
            "-=0.7",
          );

          if (imgRef.current) {
            gsap.to(imgRef.current, {
              yPercent: 8,
              ease: "none",
              scrollTrigger: {
                trigger: ref.current,
                start: "top top",
                end: "bottom top",
                scrub: 0.6,
              },
            });
          }
        },
      );
      return () => mm.revert();
    },
    { scope: ref },
  );

  const words1 = t("headlineLine1").replace(/\.$/, "").split(" ");
  const words2 = t("headlineLine2").replace(/\.$/, "").split(" ");

  return (
    <section
      ref={ref}
      className="relative isolate overflow-hidden -mt-16 pt-16 md:-mt-[72px] md:pt-[72px]"
      aria-label="Toshi"
    >
      <div
        ref={imgRef}
        data-hero-image
        className="absolute inset-0 -z-10"
      >
        <Image
          src="/images/hero-cinematic.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_25%]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent dark:from-background dark:via-background/70"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-transparent dark:from-background/60"
        />
      </div>

      <div className="container-screen relative pt-10 sm:pt-14 md:pt-20">
        <div
          data-hero-eyebrow
          className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-background/40 px-3 py-1 text-[12px] font-medium uppercase tracking-[0.16em] text-foreground backdrop-blur-md dark:border-white/20"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-mint" />
          {t("eyebrow")}
        </div>

        <h1
          className="mt-6 font-display font-semibold leading-[0.93] tracking-[-0.04em] text-foreground"
          style={{ fontSize: "clamp(3rem, 11.5vw, 11.5rem)" }}
        >
          <span
            data-hero-line
            className="block overflow-hidden pb-[0.06em]"
          >
            {words1.map((word, i) => (
              <span
                key={`l1-${i}`}
                className="inline-block overflow-hidden align-bottom"
                style={{ marginRight: "0.22em" }}
              >
                <span data-word className="inline-block will-change-transform">
                  {word}
                </span>
              </span>
            ))}
            <span className="text-mint">.</span>
          </span>
          <span
            data-hero-line
            className="block overflow-hidden pb-[0.06em]"
          >
            {words2.map((word, i) => (
              <span
                key={`l2-${i}`}
                className="inline-block overflow-hidden align-bottom"
                style={{ marginRight: "0.22em" }}
              >
                <span data-word className="inline-block will-change-transform">
                  {word}
                </span>
              </span>
            ))}
            <span>.</span>
          </span>
        </h1>

        <div className="mt-10 grid items-end gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-5 lg:col-span-4">
            <p
              data-hero-sub
              className="max-w-md text-base leading-relaxed text-foreground/85 md:text-lg"
            >
              {t("subhead")}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a href="#cta" data-hero-cta>
                <Button size="lg">
                  {t("ctaPrimary")}
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                    <path d="M5 12h14" />
                    <path d="M13 5l7 7-7 7" />
                  </svg>
                </Button>
              </a>
              <a href="#how-it-works" data-hero-cta className="text-sm font-medium text-foreground/80 underline-offset-4 hover:text-foreground hover:underline">
                {t("ctaSecondary")}
              </a>
            </div>
          </div>

          <div className="md:col-span-7 md:col-start-6 lg:col-span-5 lg:col-start-8">
            <div
              data-hero-card
              className="relative ml-auto w-full max-w-[440px] overflow-hidden rounded-[28px] border border-white/25 bg-white/10 p-6 text-white shadow-[0_30px_80px_-30px_rgba(0,0,0,0.55)] backdrop-blur-xl"
            >
              <div className="flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.16em] text-white/70">
                <span>{t("mockupAccount")}</span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="relative h-1.5 w-1.5">
                    <span className="absolute inset-0 animate-ping rounded-full bg-mint/70" />
                    <span className="relative block h-1.5 w-1.5 rounded-full bg-mint" />
                  </span>
                  Live
                </span>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span
                  className="font-display text-[clamp(2.4rem,5vw,4rem)] font-semibold leading-none tracking-tight"
                >
                  ${t("mockupAmount")}
                </span>
                <span className="text-xs font-medium uppercase tracking-wider text-white/70">
                  {t("mockupCurrency")}
                </span>
              </div>
              <p className="mt-1 text-sm text-white/70">{t("mockupItem")}</p>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-neutral-900">
                <Fingerprint className="h-4 w-4" />
                {t("mockupConfirm")}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-x-12 gap-y-6 border-t border-foreground/10 pt-6 dark:border-white/15">
          <TrustBadge
            data-hero-badge
            label={t("stat1Label")}
            value={t("stat1Value")}
          />
          <TrustBadge
            data-hero-badge
            label={t("stat2Label")}
            value={t("stat2Value")}
          />
          <TrustBadge
            data-hero-badge
            label={t("stat3Label")}
            value={t("stat3Value")}
          />
          <div data-hero-badge className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-foreground/70">
            <ShieldIcon className="h-4 w-4" />
            Non-custodial
          </div>
          <div data-hero-badge className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-foreground/70">
            <KeyIcon className="h-4 w-4" />
            Passkey native
          </div>
        </div>

        <div className="h-12 sm:h-16 md:h-20" />
      </div>
    </section>
  );
}

function TrustBadge({
  label,
  value,
  ...rest
}: {
  label: string;
  value: string;
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...rest} className="flex items-baseline gap-3">
      <span className="font-display text-2xl font-semibold tracking-tight tabular-nums text-foreground">
        {value}
      </span>
      <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-foreground/60">
        {label}
      </span>
    </div>
  );
}

function Fingerprint({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 11v3" />
      <path d="M9 7.5c.83-.66 1.86-1 3-1 1.14 0 2.17.34 3 1" />
      <path d="M6.5 9.5C7.7 7.8 9.7 6.7 12 6.7s4.3 1.1 5.5 2.8" />
      <path d="M5 13c.4 2.2 1.3 4.4 2.7 6" />
      <path d="M9 14.5c.2 1.8.8 3.4 1.7 4.8" />
      <path d="M13 16c.3 1 .8 1.9 1.4 2.7" />
      <path d="M19.5 15.5c.3-1 .5-2.1.5-3.2" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 3l8 3v6c0 4.5-3.4 8.5-8 9-4.6-.5-8-4.5-8-9V6l8-3z" />
    </svg>
  );
}

function KeyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="9" cy="14" r="3" />
      <path d="M12 12l9-9" />
      <path d="M17 7l3 3" />
    </svg>
  );
}
