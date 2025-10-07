// src/hooks/useScrollStatus.js
import { useState, useEffect } from "react";

export function useScrollStatus() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - doc.clientHeight;
  const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  // expose scroll progress as a CSS variable for UI effects
  doc.style.setProperty("--scroll", String(progress));
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Run on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { isScrolled };
}