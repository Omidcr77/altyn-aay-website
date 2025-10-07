// client/src/components/Hero.jsx
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "dr";

  // Reveal-on-intersection
  const [isReady, setIsReady] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // Smooth scrolling (system-friendly)
    const prev = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = prev;
    };
  }, []);

  useEffect(() => {
    setIsReady(false);
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsReady(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [i18n.language]);

  return (
    <section id="main" className="relative overflow-hidden" aria-labelledby="hero-title">
      {/* KEYFRAMES (scoped, motion-safe) */}
      <style>{`
        @media (prefers-reduced-motion: no-preference) {
          @keyframes driftGrid {
            0% { background-position: 0px 0px; }
            100% { background-position: 40px 40px; }
          }
          @keyframes pulseGlow {
            0%, 100% { transform: translate(-50%, 0) scale(1); opacity: .22; }
            50% { transform: translate(-50%, 2%) scale(1.06); opacity: .28; }
          }
          @keyframes floatUp {
            0% { transform: translateY(20px); opacity: 0; }
            10% { opacity: .4; }
            100% { transform: translateY(-60px); opacity: 0; }
          }
          .anim-drift-grid { animation: driftGrid 16s linear infinite; }
          .anim-pulse-glow { animation: pulseGlow 7s ease-in-out infinite; }
          .anim-float-up { animation: floatUp 9s ease-in-out infinite; }
          .anim-float-up.delay-1 { animation-delay: 1.2s; }
          .anim-float-up.delay-2 { animation-delay: 2.4s; }
          .anim-float-up.delay-3 { animation-delay: 3.6s; }
        }
      `}</style>

      {/* Animated Background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {/* soft gradient wash */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-white/0 to-white/0" />
        {/* pulsing radial glow */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[38rem] w-[38rem] rounded-full blur-3xl bg-brand-gold/40 anim-pulse-glow" />
        {/* drifting decorative grid */}
        <div className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(transparent_1px,rgba(255,255,255,0.10)_1px)] [background-size:20px_20px] anim-drift-grid" />
        {/* floating orbs */}
        <div className="absolute inset-0">
          <span className="absolute left-[12%] top-[65%] h-3 w-3 rounded-full bg-brand-gold/40 blur-[1px] anim-float-up" />
          <span className="absolute left-[78%] top-[72%] h-2.5 w-2.5 rounded-full bg-white/30 blur-[1px] anim-float-up delay-1" />
          <span className="absolute left-[32%] top-[28%] h-2 w-2 rounded-full bg-white/25 blur-[1px] anim-float-up delay-2" />
          <span className="absolute left-[58%] top-[18%] h-3 w-3 rounded-full bg-brand-gold/35 blur-[1px] anim-float-up delay-3" />
        </div>
      </div>

      {/* Content */}
      <div
        ref={containerRef}
        className="container mx-auto px-4 sm:px-6 py-20 md:py-28 lg:py-32 text-center"
      >
        <h1
          id="hero-title"
          className={`text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white motion-safe:transition-all ${
            isReady ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          {t("hero_title", { defaultValue: "Fast, Reliable Internet—For Everyone" })}
        </h1>

        <p
          className={`mt-5 text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto motion-safe:transition-all ${
            isReady ? "opacity-100 translate-y-0 delay-200" : "opacity-0 translate-y-3"
          }`}
          style={{ transitionDelay: isReady ? "120ms" : "0ms" }}
        >
          {t("hero_subtitle", {
            defaultValue:
              "Fiber-grade performance, transparent pricing, and coverage that actually reaches you.",
          })}
        </p>

        {/* CTAs */}
        <div
          className={`mt-8 flex items-center justify-center gap-3 sm:gap-4 ${
            isRTL ? "flex-row-reverse" : ""
          } motion-safe:transition-all ${isReady ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
          style={{ transitionDelay: isReady ? "200ms" : "0ms" }}
        >
          <a
            href="#plans"
            className="inline-flex items-center justify-center rounded-full bg-brand-gold px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold text-white hover:bg-yellow-600 motion-safe:transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/70"
          >
            {t("find_plan", { defaultValue: "Find your plan" })}
          </a>

          <a
            href="#coverage"
            className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold text-white/90 hover:bg-white/10 motion-safe:transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            {t("check_availability", { defaultValue: "Check availability" })}
          </a>
        </div>

        {/* Quick stats */}
        <dl
          className={`mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 max-w-4xl mx-auto text-white/90 ${
            isRTL ? "rtl" : ""
          }`}
        >
          {[
            {
              label: t("hero_stat_speed_label", { defaultValue: "Up to" }),
              value: "1 Gbps",
            },
            {
              label: t("hero_stat_uptime_label", { defaultValue: "Network uptime" }),
              value: "99.9%",
            },
            {
              label: t("hero_stat_support_label", { defaultValue: "Support" }),
              value: t("hero_stat_support_value", { defaultValue: "24/7" }),
            },
          ].map((s, i) => (
            <div
              key={s.label}
              className={`rounded-2xl border border-white/10 bg-white/5 px-5 py-4 motion-safe:transition-all ${
                isReady
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-3"
              }`}
              style={{ transitionDelay: isReady ? `${260 + i * 100}ms` : "0ms" }}
            >
              <dt className="text-sm text-white/70">{s.label}</dt>
              <dd className="mt-1 text-2xl font-bold">{s.value}</dd>
            </div>
          ))}
        </dl>

        {/* Trusted by row */}
        <div
          className={`mt-12 motion-safe:transition-opacity ${
            isReady ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: isReady ? "480ms" : "0ms" }}
        >
          <p className="text-sm text-white/60">
            {t("trusted_by", { defaultValue: "Trusted by teams across" })}
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-6 opacity-80">
            <span className="h-6 w-20 rounded bg-white/10" aria-hidden="true" />
            <span className="h-6 w-24 rounded bg-white/10" aria-hidden="true" />
            <span className="h-6 w-16 rounded bg-white/10" aria-hidden="true" />
            <span className="h-6 w-28 rounded bg-white/10" aria-hidden="true" />
          </div>
        </div>

        {/* Scroll hint */}
        <div className="mt-14 flex justify-center">
          <a
            href="#plans"
            className="group inline-flex items-center gap-2 text-white/70 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-full px-3 py-2"
          >
            <span className="text-sm">
              {t("hero_scroll", { defaultValue: "See plans" })}
            </span>
            <svg
              className="h-5 w-5 group-hover:translate-y-0.5 motion-safe:transition-transform"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12 5v14m0 0l-5-5m5 5l5-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
