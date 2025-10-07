// client/src/components/PlanSelector.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import plansData from "./altyn_aay_plans.json";

/* ---------- tiny reveal hook (stays in this file) ---------- */
const useReveal = (opts = {}) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15, ...opts }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [opts]);
  return { ref, visible };
};

/* ---------- icons ---------- */
const CheckIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M5 13l4 4L19 7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* ---------- card ---------- */
const PlanCard = ({ plan, popular, t, index = 0 }) => {
  const { ref, visible } = useReveal();
  const delay = 80 + index * 80;

  return (
    <div
      ref={ref}
      className={`group relative flex flex-col rounded-2xl border-2 bg-white/5 p-6 shadow-sm ring-0 motion-safe:transition-all
      ${popular ? "border-brand-gold shadow-[0_0_0_1px_rgba(243,112,33,0.1)]" : "border-white/10"}
      hover:shadow-lg hover:-translate-y-0.5
      ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
      style={{ transition: "opacity .5s ease, transform .5s ease", transitionDelay: `${delay}ms` }}
    >
      {/* Popular badge */}
      {popular && (
        <span className="absolute -top-3 ltr:left-4 rtl:right-4 rounded-full bg-brand-gold px-3 py-1 text-xs font-bold text-white shadow">
          {t("plans_popular", { defaultValue: "Popular" })}
        </span>
      )}

      {/* Title + price */}
      <div className="mb-5">
        <h3 className="text-2xl font-bold text-white tracking-tight">{plan.name}</h3>
        <p className="mt-3">
          <span className="text-4xl font-extrabold text-white">
            {plan.price}
          </span>
          <span className="ms-2 align-baseline text-sm text-white/60">
            {t("plans_per_month", { defaultValue: "/mo" })}
          </span>
        </p>
      </div>

      {/* Features */}
      <ul className="mb-6 grid gap-2 text-white/85">
        {(plan.features || []).map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <CheckIcon className="mt-0.5 h-5 w-5 text-brand-gold flex-none" />
            <span className="leading-snug">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="mt-auto pt-2">
        <button
          type="button"
          aria-label={t("plans_choose_aria", {
            defaultValue: "Choose plan {{name}}",
            name: plan.name,
          })}
          className={`w-full rounded-full py-2.5 text-center font-semibold motion-safe:transition-colors
          focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-gold/70 focus-visible:ring-offset-[rgba(15,26,43,0.6)]
          ${popular ? "bg-brand-gold text-white hover:bg-yellow-600" : "bg-white/10 text-white hover:bg-white/15"}`}
        >
          {t("plans_choose", { defaultValue: "Choose Plan" })}
        </button>
      </div>
    </div>
  );
};

/* ---------- section block ---------- */
const SectionBlock = ({ title, plans, t }) => {
  const headerReveal = useReveal();
  if (!plans?.length) return null;
  return (
    <>
      <h3
        ref={headerReveal.ref}
        className={`mb-6 text-center text-2xl font-semibold text-brand-gold motion-safe:transition-all
        ${headerReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
        style={{ transitionDuration: ".5s" }}
      >
        {title}
      </h3>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan, i) => (
          <PlanCard key={plan.name} plan={plan} popular={plan.popular} t={t} index={i} />
        ))}
      </div>
    </>
  );
};

const PlanSelector = () => {
  const { t, i18n } = useTranslation();
  const currentPlans = useMemo(
    () => plansData[i18n.language] || plansData.en,
    [i18n.language]
  );

  const { ref: headRef, visible: headVisible } = useReveal();

  return (
    <section id="plans" className="relative">
      {/* Subtle animated background accent for the section */}
      <style>{`
        @media (prefers-reduced-motion: no-preference){
          @keyframes planGlow {
            0%,100% { transform: translateY(0) scale(1); opacity:.16; }
            50%     { transform: translateY(-4px) scale(1.03); opacity:.22; }
          }
          .plans-accent { animation: planGlow 10s ease-in-out infinite; }
        }
      `}</style>
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-8 -z-10">
        <div className="mx-auto h-48 w-[84%] max-w-6xl rounded-full blur-3xl bg-brand-gold/15 plans-accent" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-16">
        <header
          ref={headRef}
          className={`mx-auto mb-10 max-w-2xl text-center motion-safe:transition-all
          ${headVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
          style={{ transitionDuration: ".6s" }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-white">
            {t("plans_title", { defaultValue: "Plans that fit your needs" })}
          </h2>
          <p className="mt-3 text-white/70">
            {t("plans_sub", {
              defaultValue: "Transparent pricing. No hidden fees. Cancel anytime.",
            })}
          </p>
        </header>

        <div className={`space-y-12 ${i18n.language === "dr" ? "rtl" : ""}`}>
          <SectionBlock
            title={t("unlimited", { defaultValue: "Unlimited" })}
            plans={currentPlans.unlimited}
            t={t}
          />
          <SectionBlock
            title={t("limited", { defaultValue: "Limited" })}
            plans={currentPlans.limited}
            t={t}
          />
        </div>

        {/* small note */}
        <p className="mt-10 text-center text-xs text-white/50">
          {t("plans_disclaimer", {
            defaultValue:
              "Speeds may vary by location. Taxes and fees not included unless stated.",
          })}
        </p>
      </div>
    </section>
  );
};

export default PlanSelector;
