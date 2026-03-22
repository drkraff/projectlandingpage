"use client";

import { useEffect, useRef } from "react";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const items = el.querySelectorAll<HTMLElement>("[data-reveal]");
    items.forEach((item, i) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(32px)";
      item.style.transition = `opacity 0.8s ease ${i * 0.15}s, transform 0.8s ease ${i * 0.15}s`;
    });
    const timeout = setTimeout(() => {
      items.forEach((item) => {
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
      });
    }, 80);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-[#0f0e0d] overflow-hidden flex flex-col justify-between px-6 md:px-12 lg:px-20 py-16"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between" data-reveal>
        <span className="text-[#e8e0d5] text-xs tracking-[0.25em] uppercase font-sans">
          Est. 2024
        </span>
        <span className="text-[#e8e0d5] text-xs tracking-[0.25em] uppercase font-sans">
          Issue No. 01
        </span>
      </div>

      {/* Main content — asymmetric: headline left-heavy, sub right-offset */}
      <div className="mt-16 lg:mt-0 lg:flex lg:items-end lg:justify-between gap-12">
        {/* Oversized headline */}
        <div className="lg:w-3/4">
          <p
            data-reveal
            className="text-[#c2440e] text-xs tracking-[0.3em] uppercase font-sans mb-6"
          >
            — The New Standard
          </p>
          <h1
            data-reveal
            className="font-serif text-[clamp(3.5rem,10vw,9rem)] leading-[0.92] text-[#e8e0d5] tracking-tight"
          >
            The Work
            <br />
            <em className="not-italic text-[#c2440e]">That</em>
            <br />
            Endures.
          </h1>
        </div>

        {/* Sub-column — offset right, sits at baseline */}
        <div className="lg:w-1/4 mt-10 lg:mt-0 lg:pb-2 flex flex-col gap-6">
          <p
            data-reveal
            className="font-serif text-[#9e9488] text-lg leading-relaxed"
          >
            A platform built for the work that outlives the sprint. Opinionated
            tooling, zero compromise.
          </p>
          <div data-reveal>
            <a
              href="#"
              className="inline-block border border-[#c2440e] text-[#c2440e] text-xs tracking-[0.25em] uppercase px-6 py-3 font-sans hover:bg-[#c2440e] hover:text-[#0f0e0d] transition-colors duration-300"
            >
              Begin Reading
            </a>
          </div>
        </div>
      </div>

      {/* Bottom rule + scroll hint */}
      <div
        data-reveal
        className="flex items-center justify-between pt-12 border-t border-[#2a2622] mt-12"
      >
        <span className="text-[#4a4540] text-xs tracking-[0.2em] uppercase font-sans">
          Scroll to explore
        </span>
        <div className="flex items-center gap-3">
          <div className="w-12 h-px bg-[#c2440e]" />
          <span className="text-[#4a4540] text-xs font-sans">↓</span>
        </div>
      </div>
    </section>
  );
}
