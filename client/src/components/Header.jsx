// client/src/components/Header.jsx
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useScrollStatus } from "../hook/useScrollStatus";
import logo from "../logo.svg";

// I'll define these small components in the same file for brevity,
// but you could move them to their own files (e.g., components/ui/Icons.jsx).

const MenuIcon = () => (
  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const CloseIcon = () => (
  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M6 6l12 12M18 6l-12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Define nav links data once
const navLinks = [
  { href: "#plans", key: "nav_plans", def: "Plans" },
  { href: "#services", key: "nav_services", def: "Services" },
  { href: "#coverage", key: "nav_coverage", def: "Coverage" },
];

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isScrolled } = useScrollStatus();
  // Persist language + set document attributes
  React.useEffect(() => {
    const saved = localStorage.getItem("lang");
    const lang = saved || i18n.language || "en";
    i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "dr" ? "rtl" : "ltr";
  }, []); // eslint-disable-line

  React.useEffect(() => {
    const lang = i18n.language || "en";
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "dr" ? "rtl" : "ltr";
  }, [i18n.language]);

  const handleNavClick = () => setMobileMenuOpen(false);

  return (
    <>
      {/* Scroll progress bar */}
      <div
        aria-hidden="true"
        className="fixed left-0 top-0 z-[60] h-[2px] origin-left bg-brand/80"
        style={{ width: `calc(var(--scroll, 0) * 100%)` }}
      />
      
      <header
        id="top"
        className={`sticky top-0 z-50 border-b transition-colors bg-sweep ${
          isScrolled
            ? "border-header-border bg-header-bg-scrolled backdrop-blur"
            : "border-transparent bg-header-bg"
        }`}
      >
        <nav className="container mx-auto flex items-center justify-between px-4 py-3 sm:px-6">
          {/* Brand */}
          <a href="/" className="flex items-center gap-3">
            <img src={logo} alt={t("brand_alt", "Altyn Aay Logo")} className="h-9 w-auto" />
            <span className="font-semibold tracking-wide text-foreground/90">ALTYN AAY</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-muted-foreground hover:text-brand transition-colors">
                {t(link.key, link.def)}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden items-center gap-4 md:flex">
            {/* Language segmented control */}
            <div role="group" aria-label={t("language", { defaultValue: "Language" })} className="flex items-center rounded-full bg-white/5 border border-white/10 p-0.5">
              <button
                type="button"
                onClick={() => i18n.changeLanguage("en")}
                className={`px-3 py-1.5 text-sm rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/70 ${
                  i18n.language === "en" ? "bg-brand text-background" : "text-foreground/80 hover:text-foreground"
                }`}
                aria-pressed={i18n.language === "en"}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => i18n.changeLanguage("dr")}
                className={`px-3 py-1.5 text-sm rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/70 ${
                  i18n.language === "dr" ? "bg-brand text-background" : "text-foreground/80 hover:text-foreground"
                }`}
                aria-pressed={i18n.language === "dr"}
              >
                DR
              </button>
            </div>

            <a href="#coverage" className="bg-brand text-background font-semibold py-2 px-4 rounded-full hover:bg-brand/90 transition-colors">
              {t("check_availability")}
            </a>
          </div>

          {/* Mobile Toggler */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="md:hidden p-2 text-foreground/90 hover:text-foreground hover:bg-white/10 rounded-md"
            aria-controls="mobile-menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="sr-only">{t("open_main_menu", "Open main menu")}</span>
            {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          <div className="container mx-auto flex flex-col gap-3 px-4 pb-4 pt-3 sm:px-6 border-t border-border">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={handleNavClick} className="block rounded-md px-3 py-2 text-foreground/90 hover:bg-border">
                {t(link.key, link.def)}
              </a>
            ))}
            <div className="pt-2">
                <a href="#coverage" onClick={handleNavClick} className="bg-brand text-background font-semibold py-2 px-4 rounded-full">
                    {t("check_availability")}
                </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;