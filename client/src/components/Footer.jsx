// client/src/components/Footer.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import logo from "../logo.svg";

const SocialIcon = ({ label, href, children }) => (
  <a
    href={href}
    aria-label={label}
    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10 motion-safe:transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
  >
    {children}
  </a>
);

const Footer = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "dr";
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-white/10 bg-[rgba(15,26,43,0.7)] backdrop-blur">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        {/* Top section */}
        <div
          className={`grid gap-10 md:grid-cols-4 ${
            isRTL ? "rtl" : ""
          }`}
        >
          {/* Brand */}
          <div className="md:col-span-1">
            <a href="#" className="flex items-center gap-3">
              <img
                src={logo}
                alt={t("brand_alt", { defaultValue: "Altyn Aay Logo" })}
                className="h-9 w-auto"
                loading="lazy"
                decoding="async"
              />
              <span className="text-white/90 font-semibold tracking-wide">
                ALTYN AAY
              </span>
            </a>
            <p className="mt-3 text-sm text-white/70">
              {t("footer_tagline", {
                defaultValue:
                  "Reliable connectivity with transparent pricing and human support.",
              })}
            </p>

            <div className="mt-5 flex items-center gap-3">
              <SocialIcon label="Twitter" href="#">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="M21 5.5a7.4 7.4 0 0 1-2.1.6 3.6 3.6 0 0 0 1.6-2 7.2 7.2 0 0 1-2.3.9A3.6 3.6 0 0 0 12 7.8a10.2 10.2 0 0 1-7.4-3.8 3.6 3.6 0 0 0 1.1 4.8 3.6 3.6 0 0 1-1.6-.5v.1c0 1.8 1.3 3.3 3 3.7a3.7 3.7 0 0 1-1.6.1c.4 1.4 1.8 2.4 3.4 2.5A7.3 7.3 0 0 1 3 16.6a10.3 10.3 0 0 0 5.6 1.6c6.7 0 10.4-5.6 10.4-10.4v-.5A7.4 7.4 0 0 0 21 5.5z" />
                </svg>
              </SocialIcon>
              <SocialIcon label="LinkedIn" href="#">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v16H0V8zm7.5 0h4.8v2.2h.1c.7-1.3 2.4-2.7 4.9-2.7 5.2 0 6.2 3.4 6.2 7.8V24h-5V16c0-1.9 0-4.3-2.6-4.3-2.6 0-3 2-3 4.1V24h-5V8z"/>
                </svg>
              </SocialIcon>
              <SocialIcon label="Instagram" href="#">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5a5.5 5.5 0 1 1 0 11.001 5.5 5.5 0 0 1 0-11zM18 6.5a1 1 0 1 1 0 2.001 1 1 0 0 1 0-2z"/>
                </svg>
              </SocialIcon>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white/90 font-semibold">{t("footer_quick_links", { defaultValue: "Quick Links" })}</h3>
            <ul className="mt-3 space-y-2 text-white/70">
              <li>
                <a href="#plans" className="hover:text-white motion-safe:transition-colors">
                  {t("nav_plans", { defaultValue: "Plans" })}
                </a>
              </li>
              <li>
                <a href="#coverage" className="hover:text-white motion-safe:transition-colors">
                  {t("nav_coverage", { defaultValue: "Coverage" })}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white motion-safe:transition-colors">
                  {t("footer_faq", { defaultValue: "FAQ" })}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white motion-safe:transition-colors">
                  {t("footer_contact", { defaultValue: "Contact" })}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white/90 font-semibold">{t("footer_contact", { defaultValue: "Contact" })}</h3>
            <ul className="mt-3 space-y-2 text-white/70">
              <li>
                <a href="mailto:info@altynaay.example" className="hover:text-white motion-safe:transition-colors">
                  info@altynaay.example
                </a>
              </li>
              <li>
                <a href="tel:+31200000000" className="hover:text-white motion-safe:transition-colors">
                  +31 20 000 00 00
                </a>
              </li>
              <li className="text-sm">
                {t("footer_hours", { defaultValue: "Support: 24/7" })}
              </li>
              <li className="text-sm">
                {t("footer_address", {
                  defaultValue: "Amsterdam, Netherlands",
                })}
              </li>
            </ul>
          </div>

          {/* Newsletter (non-blocking UI only) */}
          <div>
            <h3 className="text-white/90 font-semibold">{t("footer_updates", { defaultValue: "Get Updates" })}</h3>
            <p className="mt-3 text-sm text-white/70">
              {t("footer_updates_copy", {
                defaultValue: "News about new plans and coverage—no spam.",
              })}
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex gap-2"
            >
              <label htmlFor="footer-email" className="sr-only">
                {t("footer_email", { defaultValue: "Email" })}
              </label>
              <input
                id="footer-email"
                type="email"
                autoComplete="email"
                placeholder={t("footer_email", { defaultValue: "Email" })}
                className="min-w-0 flex-1 rounded-md bg-gray-900/60 border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-brand-gold"
              />
              <button
                type="submit"
                className="rounded-md bg-brand-gold px-4 py-2 font-semibold text-white hover:bg-yellow-600 motion-safe:transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/70"
              >
                {t("footer_subscribe", { defaultValue: "Subscribe" })}
              </button>
            </form>
            <p className="mt-2 text-xs text-white/50">
              {t("footer_privacy_hint", { defaultValue: "We respect your privacy." })}
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-white/60 md:flex-row">
          <p>© {year} ALTYN AAY. {t("footer_rights", { defaultValue: "All rights reserved." })}</p>
          <div className={`flex items-center gap-4 ${isRTL ? "flex-row-reverse" : ""}`}>
            <a href="#terms" className="hover:text-white motion-safe:transition-colors">
              {t("footer_terms", { defaultValue: "Terms" })}
            </a>
            <span aria-hidden="true">•</span>
            <a href="#privacy" className="hover:text-white motion-safe:transition-colors">
              {t("footer_privacy", { defaultValue: "Privacy" })}
            </a>
            <span aria-hidden="true">•</span>
            <a href="#cookies" className="hover:text-white motion-safe:transition-colors">
              {t("footer_cookies", { defaultValue: "Cookies" })}
            </a>
            <a
              href="#top"
              className="ms-4 inline-flex items-center gap-1 rounded-full px-2 py-1 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              aria-label={t("footer_back_to_top", { defaultValue: "Back to top" })}
            >
              ↑
              <span className="sr-only">
                {t("footer_back_to_top", { defaultValue: "Back to top" })}
              </span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
