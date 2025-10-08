// client/src/components/SiteBackground.jsx
import React from "react";

const NOISE_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'>
      <filter id='n'>
        <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/>
        <feColorMatrix type='saturate' values='0'/>
        <feComponentTransfer>
          <feFuncA type='table' tableValues='0 0 0 0 .05 .1 .12 .08 0'/>
        </feComponentTransfer>
      </filter>
      <rect width='100%' height='100%' filter='url(#n)'/>
    </svg>`
  );

const SiteBackground = () => {
  const [isLight, setIsLight] = React.useState(document.documentElement.classList.contains('light'));

  React.useEffect(() => {
    const onTheme = () => setIsLight(document.documentElement.classList.contains('light'));
    window.addEventListener('themeChange', onTheme);
    return () => window.removeEventListener('themeChange', onTheme);
  }, []);

  const baseGradient = isLight
    ? "radial-gradient(1200px_600px_at_50%_-10%,rgba(243,112,33,0.08),transparent_60%),radial-gradient(900px_500px_at_80%_20%,rgba(31,79,161,0.10),transparent_55%),linear-gradient(180deg,rgba(250,250,250,1)_0%,rgba(244,244,245,1)_40%,rgba(238,238,239,1)_100%)"
    : "radial-gradient(1200px_600px_at_50%_-10%,rgba(243,112,33,0.18),transparent_60%),radial-gradient(900px_500px_at_80%_20%,rgba(31,79,161,0.22),transparent_55%),linear-gradient(180deg,rgba(8,12,20,1)_0%,rgba(12,18,28,1)_40%,rgba(10,16,26,1)_100%)";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-50 overflow-hidden"
    >
      {/* Base gradient wash */}
      <div className="absolute inset-0" style={{ backgroundImage: baseGradient }} />

      {/* Subtle dot grid */}
      <div className="absolute inset-0 opacity-[0.10]">
        <div className="absolute inset-0 bg-[radial-gradient(transparent_1px,rgba(255,255,255,0.06)_1px)] [background-size:22px_22px]" />
      </div>

      {/* Radial glows / blobs */}
      <div className="absolute -top-28 left-1/2 -translate-x-1/2 h-[42rem] w-[42rem] rounded-full bg-brand-gold/25 blur-3xl opacity-30 motion-safe:animate-pulse-slow" />
      <div className="absolute top-1/3 -right-24 h-[30rem] w-[30rem] rounded-full bg-[#1F4FA1]/25 blur-3xl opacity-30 motion-safe:animate-pulse-slower" />
      <div className="absolute bottom-[-10rem] -left-24 h-[32rem] w-[32rem] rounded-full bg-white/5 blur-3xl opacity-20 motion-safe:animate-pulse-slower" />

  {/* Vignette */}
  <div className="absolute inset-0" style={{ backgroundImage: isLight ? 'radial-gradient(ellipse_at_center,transparent_60%,rgba(255,255,255,0.5)_100%)' : 'radial-gradient(ellipse_at_center,transparent_60%,rgba(0,0,0,0.35)_100%)' }} />

      {/* Noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.18] mix-blend-overlay"
        style={{
          backgroundImage: `url("${NOISE_SVG}")`,
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
        }}
      />
    </div>
  );
};

export default SiteBackground;
