// client/src/components/Services.jsx
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

/* ---- tiny reveal hook (local) ---- */
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
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px", ...opts }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [opts]);
  return { ref, visible };
};

const Card = ({ icon, title, desc, index = 0 }) => {
  const { ref, visible } = useReveal();
  const delay = 80 + index * 90;
  return (
    <div
      ref={ref}
      className={`group relative rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm motion-safe:transition-all
      hover:-translate-y-0.5 hover:shadow-lg
      ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
      style={{ transition: "opacity .5s ease, transform .5s ease", transitionDelay: `${delay}ms` }}
    >
      {/* subtle accent ring on hover */}
      <div className="absolute inset-0 rounded-2xl ring-0 ring-brand-gold/0 group-hover:ring-1 group-hover:ring-brand-gold/30 pointer-events-none" />
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gold/15 text-brand-gold">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="mt-1 text-sm text-white/70 leading-relaxed">{desc}</p>
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "dr";

  const items = [
    {
      key: "svc_networking",
      title: t("svc_networking_title", { defaultValue: "Network Design & Setup" }),
      desc: t("svc_networking_desc", {
        defaultValue:
          "Structured cabling, secure Wi-Fi, MikroTik/RouterOS, and high-availability networks tailored to your site.",
      }),
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
          <path d="M6 18h12M4 6h16M8 6v12m8-12v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    
    {
      key: "svc_cyber",
      title: t("svc_cyber_title", { defaultValue: "Cybersecurity & Audits" }),
      desc: t("svc_cyber_desc", {
        defaultValue:
          "Hardening, firewalling, VPN, and assessments with clear remediation plans—no jargon, real outcomes.",
      }),
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
          <path d="M12 3l7 4v5a7 7 0 1 1-14 0V7l7-4z" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
   
    {
      key: "svc_support",
      title: t("svc_support_title", { defaultValue: "Managed IT & Support" }),
      desc: t("svc_support_desc", {
        defaultValue:
          "Proactive maintenance, endpoint management, and responsive helpdesk with clear SLAs.",
      }),
      icon: (
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
          <path d="M12 6a6 6 0 0 0-6 6v5h12v-5a6 6 0 0 0-6-6z" stroke="currentColor" strokeWidth="2" />
          <path d="M8 20h8" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
      ];

  // section header reveal
  const head = useReveal();

  return (
    <section id="services" className="relative py-16 sm:py-20 border-t border-white/10">
      {/* motion-safe keyframes + subtle breathing accent */}   
      <style>{`
        @media (prefers-reduced-motion: no-preference){
          @keyframes breathe {
            0%,100% { transform: translateY(0) scale(1); opacity:.14; }
            50% { transform: translateY(-6px) scale(1.03); opacity:.2; }
          }
          @keyframes drift {
            from { background-position: 0px 0px; }
            to { background-position: 36px 36px; }
          }
          .svc-accent { animation: breathe 12s ease-in-out infinite; }
          .svc-grid { animation: drift 18s linear infinite; }
        }
      `}</style>

      {/* section background accents */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -z-10">
        {/* gold blur */}
        <div className="mx-auto h-44 w-[80%] max-w-5xl rounded-full blur-3xl bg-brand-gold/15 svc-accent" />
        {/* faint drifting grid overlay */}
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(transparent_1px,rgba(255,255,255,0.12)_1px)] [background-size:22px_22px] svc-grid" />
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <header
          ref={head.ref}
          className={`mx-auto mb-10 max-w-2xl text-center motion-safe:transition-all ${
            head.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
          style={{ transitionDuration: ".6s" }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-white">
            {t("services_title", { defaultValue: "ICT Services that move you forward" })}
          </h2>
          <p className="mt-3 text-white/70">
            {t("services_sub", {
              defaultValue:
                "From secure networks to fast web apps—we deliver reliable, scalable solutions.",
            })}
          </p>
        </header>

        <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${isRTL ? "rtl" : ""}`}>
          {items.map((it, i) => (
            <Card key={it.key} icon={it.icon} title={it.title} desc={it.desc} index={i} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#coverage"
            className="inline-flex items-center justify-center rounded-full bg-brand-gold px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold text-white hover:bg-yellow-600 motion-safe:transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/70"
          >
            {t("check_availability", { defaultValue: "Check availability" })}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
