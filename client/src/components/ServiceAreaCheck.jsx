// client/src/components/ServiceAreaCheck.jsx
import React, { useMemo, useRef, useState, useEffect } from "react";
import axios from "axios";
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

const ServiceAreaCheck = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "dr";
  const [formData, setFormData] = useState({ address: "", zipCode: "", hp: "" }); // hp = honeypot
  const [status, setStatus] = useState({ loading: false, message: "", error: false });
  const [fieldErr, setFieldErr] = useState({ address: "", zipCode: "" });
  const controllerRef = useRef(null);

  const labels = useMemo(() => ({
    title: t("coverage_title", { defaultValue: "Check Service Availability" }),
    address: t("address_label", { defaultValue: "Street address" }),
    zip: t("zip_label", { defaultValue: "ZIP / Postal Code" }),
    submit: t("check_availability", { defaultValue: "Check availability" }),
    fillAll: t("form_fill_fields", { defaultValue: "Please fill in all fields." }),
    success: t("form_success", { defaultValue: "Great news! We can serve your address." }),
    fail: t("form_error", { defaultValue: "Sorry, something went wrong. Try again." }),
  }), [t]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const v =
      name === "zipCode"
        ? value.replace(/[^\p{L}\p{N}\s-]/gu, "").slice(0, 16)
        : value.slice(0, 120);
    setFormData((p) => ({ ...p, [name]: v }));
    setFieldErr((p) => ({ ...p, [name]: "" }));
  };

  const validate = () => {
    const errs = { address: "", zipCode: "" };
    if (!formData.address.trim()) errs.address = labels.fillAll;
    if (!formData.zipCode.trim()) errs.zipCode = labels.fillAll;
    if (formData.zipCode && formData.zipCode.trim().length < 3) {
      errs.zipCode = t("zip_invalid", { defaultValue: "Please enter a valid postal code." });
    }
    setFieldErr(errs);
    return !errs.address && !errs.zipCode;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.hp) return; // bot caught
    if (!validate()) {
      setStatus({ loading: false, message: labels.fillAll, error: true });
      return;
    }
    setStatus({ loading: true, message: "", error: false });

    if (controllerRef.current) controllerRef.current.abort();
    controllerRef.current = new AbortController();

    try {
      await axios.post(
        "/api/leads/check",
        { address: formData.address.trim(), zipCode: formData.zipCode.trim() },
        { headers: { "Accept-Language": i18n.language }, signal: controllerRef.current.signal, timeout: 12000 }
      );
      setStatus({ loading: false, message: labels.success, error: false });
      setFormData({ address: "", zipCode: "", hp: "" });
    } catch (error) {
      const canceled = axios.isCancel?.(error) || error.name === "CanceledError";
      if (canceled) return;
      const msg = error?.response?.data?.message || labels.fail;
      setStatus({ loading: false, message: msg, error: true });
    } finally {
      controllerRef.current = null;
    }
  };

  // reveals
  const titleReveal = useReveal();
  const formReveal = useReveal();

  return (
    <section id="coverage" className="relative py-16 border-t border-white/10">
      {/* section background polish + motion-safe keyframes */}
      <style>{`
        @media (prefers-reduced-motion: no-preference){
          @keyframes breathe {
            0%,100% { transform: translateY(0) scale(1); opacity:.15; }
            50% { transform: translateY(-6px) scale(1.03); opacity:.22; }
          }
          @keyframes shimmer {
            0% { background-position: -120% 0; }
            100% { background-position: 220% 0; }
          }
          .cov-accent { animation: breathe 12s ease-in-out infinite; }
          .status-enter { transform: translateY(6px); opacity: 0; }
          .status-enter-active { transform: translateY(0); opacity: 1; transition: all .4s ease; }
        }
      `}</style>

      {/* glowing blur accent */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-8 -z-10">
        <div className="mx-auto h-48 w-[84%] max-w-5xl rounded-full blur-3xl bg-brand-gold/15 cov-accent" />
      </div>

      <div className="container mx-auto px-4 sm:px-6">
        <header
          ref={titleReveal.ref}
          className={`text-center mb-8 motion-safe:transition-all ${
            titleReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
          style={{ transitionDuration: ".6s" }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-white">{labels.title}</h2>
          <p className="mt-2 text-white/70">
            {t("coverage_sub", {
              defaultValue: "Enter your address to see if ALTYN AAY serves your area.",
            })}
          </p>
        </header>

        <form
          ref={formReveal.ref}
          onSubmit={handleSubmit}
          noValidate
          className={`mx-auto max-w-3xl grid gap-4 md:grid-cols-[1fr_minmax(160px,240px)_auto] items-start ${
            isRTL ? "rtl" : ""
          } motion-safe:transition-all ${
            formReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}
          aria-describedby="coverage-status"
          style={{ transitionDuration: ".5s", transitionDelay: ".08s" }}
        >
          {/* Honeypot */}
          <div className="absolute left-[-10000px] top-auto w-[1px] h-[1px] overflow-hidden">
            <label>
              Do not fill this field
              <input
                type="text"
                name="hp"
                tabIndex={-1}
                autoComplete="off"
                value={formData.hp}
                onChange={handleChange}
              />
            </label>
          </div>

          {/* Address */}
          <div className="flex flex-col">
            <label htmlFor="address" className="sr-only">{labels.address}</label>
            <input
              id="address"
              name="address"
              type="text"
              placeholder={labels.address}
              value={formData.address}
              onChange={handleChange}
              autoComplete="street-address"
              enterKeyHint="next"
              className={`w-full rounded-md bg-gray-900/60 border ${
                fieldErr.address ? "border-red-500/60" : "border-white/10"
              } px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-brand-gold`}
            />
            {fieldErr.address && <span className="mt-1 text-sm text-red-400">{fieldErr.address}</span>}
          </div>

          {/* ZIP/Postal */}
          <div className="flex flex-col">
            <label htmlFor="zipCode" className="sr-only">{labels.zip}</label>
            <input
              id="zipCode"
              name="zipCode"
              type="text"
              inputMode="text"
              placeholder={labels.zip}
              value={formData.zipCode}
              onChange={handleChange}
              autoComplete="postal-code"
              enterKeyHint="go"
              className={`w-full rounded-md bg-gray-900/60 border ${
                fieldErr.zipCode ? "border-red-500/60" : "border-white/10"
              } px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-brand-gold`}
              style={{ direction: "ltr" }}
            />
            {fieldErr.zipCode && <span className="mt-1 text-sm text-red-400">{fieldErr.zipCode}</span>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={status.loading}
            className="relative inline-flex items-center justify-center whitespace-nowrap rounded-md bg-brand-gold px-6 py-3 font-semibold text-white hover:bg-yellow-600 motion-safe:transition-colors disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/70"
          >
            {/* subtle shimmer when idle */}
            {!status.loading && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-md opacity-0 motion-safe:[background:linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent)] motion-safe:[background-size:220%_100%] motion-safe:[animation:shimmer_3.2s_ease_infinite]"
              />
            )}
            {status.loading ? (
              <>
                <svg className="mr-2 h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
                {t("checking", { defaultValue: "Checking..." })}
              </>
            ) : (
              labels.submit
            )}
          </button>
        </form>

        {/* Live status */}
        <div id="coverage-status" className="mx-auto mt-5 max-w-3xl" role="status" aria-live="polite">
          {!!status.message && (
            <div
              className={`rounded-lg border px-4 py-3 text-sm motion-safe:transition-all ${
                status.error
                  ? "border-red-500/30 bg-red-500/10 text-red-300"
                  : "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
              }`}
            >
              {status.message}
            </div>
          )}
        </div>

        {/* Small privacy note */}
        <p className="mt-6 text-center text-xs text-white/50">
          {t("privacy_note", {
            defaultValue:
              "We use your address only to check coverage. We never sell your data.",
          })}
        </p>
      </div>
    </section>
  );
};

export default ServiceAreaCheck;
