"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Magnetic from "@/components/Magnetic";

const NAV_LINKS = [
  { label: "Device", id: "collections" },
  { label: "Features", id: "experience" },
  { label: "Process", id: "process" },
  { label: "FAQ", id: "science" },
  { label: "Footer", id: "footer" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

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
        const current = NAV_LINKS.find((l) => visible.has(l.id));
        if (current) setActiveId(current.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 md:top-5 md:px-6">
      <nav
        className={[
          "relative mx-auto flex h-16 max-w-5xl items-center justify-between rounded-full pl-4 pr-3 backdrop-blur-md transition-all duration-500 ease-out md:pl-6 md:pr-4",
          scrolled
            ? "bg-cream/55 border border-charcoal/10 shadow-[0_12px_32px_-14px_rgba(43,43,43,0.40)]"
            : "bg-cream/25 border border-white/30 shadow-[0_8px_30px_-14px_rgba(43,43,43,0.28)]",
        ].join(" ")}
      >
        {/* Left: logo */}
        <Link href="/" aria-label="LUMÉ home" className="flex items-center">
          {/* logo.svg is referenced per spec; served from /public */}
          <img
            src="/logo.svg"
            alt="LUMÉ"
            className="h-12 w-12 select-none"
            draggable={false}
          />
        </Link>

        {/* Center: navigation */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const active = activeId === link.id;
            return (
              <Link
                key={link.id}
                href={`/#${link.id}`}
                aria-current={active ? "true" : undefined}
                className={[
                  "text-[15px] font-medium tracking-tight transition-colors duration-300",
                  active ? "text-brand" : "text-charcoal/80 hover:text-brand",
                ].join(" ")}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right: SHOP NOW (desktop) */}
        <div className="hidden md:block">
          <Magnetic strength={0.15}>
            <Link
              href="/shop"
              className="inline-block rounded-full bg-white px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-brand shadow-[0_8px_24px_-10px_rgba(43,43,43,0.25)] transition-all duration-300 hover:shadow-glow"
            >
              Shop Now
            </Link>
          </Magnetic>
        </div>

        {/* Hamburger (mobile) */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="flex h-10 w-10 items-center justify-center rounded-full text-charcoal transition-colors hover:text-brand md:hidden"
        >
          {menuOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mx-auto mt-2 max-w-5xl overflow-hidden rounded-3xl border border-white/40 bg-cream/95 p-3 shadow-[0_18px_44px_-16px_rgba(43,43,43,0.4)] backdrop-blur-md md:hidden">
          <nav className="flex flex-col">
            {NAV_LINKS.map((link) => {
              const active = activeId === link.id;
              return (
                <Link
                  key={link.id}
                  href={`/#${link.id}`}
                  onClick={() => setMenuOpen(false)}
                  className={[
                    "rounded-2xl px-4 py-3 text-[15px] font-medium tracking-tight transition-colors",
                    active
                      ? "text-brand"
                      : "text-charcoal/80 hover:bg-white/60 hover:text-brand",
                  ].join(" ")}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <Link
            href="/shop"
            onClick={() => setMenuOpen(false)}
            className="mt-2 block rounded-full bg-brand px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.18em] text-white"
          >
            Shop Now
          </Link>
        </div>
      )}
    </header>
  );
}
