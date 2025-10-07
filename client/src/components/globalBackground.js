// src/components/GlobalBackground.jsx
import React from "react";

const GlobalBackground = () => (
  <div aria-hidden="true" className="fixed inset-0 -z-50">
    {/* Deep base gradient */}
    <div className="absolute inset-0 bg-[radial-gradient(1200px_800px_at_80%_-10%,rgba(243,112,33,0.25),transparent_60%),radial-gradient(1000px_700px_at_10%_10%,rgba(31,79,161,0.20),transparent_55%),linear-gradient(180deg,#0F1A2B_0%,#0F1A2B_100%)]" />
    {/* Soft grid texture */}
    <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(transparent_1px,rgba(255,255,255,0.12)_1px)] [background-size:22px_22px] motion-safe:animate-drift" />
    {/* Vignette */}
    <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.45)_100%)]" />
  </div>
);

export default GlobalBackground;