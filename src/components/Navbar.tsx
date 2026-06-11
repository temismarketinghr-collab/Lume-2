"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Device", id: "collections" },
  { label: "Features", id: "experience" },
  { label: "Process", id: "process" },
  { label: "Faq", id: "science" },
  { label: "Footer", id: "footer" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the link whose section is currently in view.
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => !!el,
    );
    if (!sections.length) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        });
        // Activate the first section (in nav order) currently in the band.
        const current = NAV_LINKS.find((l) => visible.has(l.id));
        if (current) setActiveId(current.id);
      },
      // A thin band across the upper-middle of the viewport decides "active".
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-50 w-full bg-cream/95 backdrop-blur-md transition-shadow duration-500 ease-out",
        scrolled
          ? "border-b border-charcoal/10 shadow-[0_6px_24px_-18px_rgba(43,43,43,0.45)]"
          : "border-b border-charcoal/[0.06]",
      ].join(" ")}
      style={{ height: "var(--header-h)" }}
    >
      <nav className="relative mx-auto flex h-full max-w-7xl items-center justify-between px-6 md:px-10">
        {/* Left: logo */}
        <a href="#" aria-label="LUMÉ home" className="flex items-center">
          {/* logo.svg is referenced per spec; served from /public */}
          <img
            src="/logo.svg"
            alt="LUMÉ"
            className="h-20 w-20 select-none"
            draggable={false}
          />
        </a>

        {/* Center: navigation */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => {
            const active = activeId === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                aria-current={active ? "true" : undefined}
                className={[
                  "text-[15px] font-medium tracking-tight transition-colors duration-300",
                  active ? "text-brand" : "text-charcoal/80 hover:text-brand",
                ].join(" ")}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Right: SHOP NOW button */}
        <a
          href="#collections"
          className="rounded-full bg-white px-7 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand shadow-[0_8px_24px_-10px_rgba(43,43,43,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow"
        >
          Shop Now
        </a>
      </nav>
    </header>
  );
}
