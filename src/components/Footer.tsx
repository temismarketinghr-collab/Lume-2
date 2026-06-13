"use client";

import { useState } from "react";

const NAV_LINKS = [
  { label: "Device", href: "#collections" },
  { label: "Features", href: "#experience" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#science" },
  { label: "Footer", href: "#footer" },
];

const SOCIALS = [
  { src: "/Footer/linkedin.svg", label: "LinkedIn" },
  { src: "/Footer/facebook.svg", label: "Facebook" },
  { src: "/Footer/facebook-1.svg", label: "X" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSent(true);
    setEmail("");
  };

  return (
    <footer
      id="footer"
      className="bg-[#E8F0F8] px-6 pb-12 pt-20 md:px-10 md:pt-24"
    >
      {/* Newsletter */}
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="mx-auto font-sans text-[48px] font-light leading-[56px] text-charcoal">
          <span className="text-shimmer italic text-brand">Discover</span> beauty launches
          and self-care inspiration.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-body">
          Join the LUMÉ community and be the first to receive exclusive offers,
          skincare tips, and new device launches.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-10 flex max-w-xl items-center gap-2 rounded-full bg-white p-2 pl-6 shadow-[0_14px_44px_-16px_rgba(43,43,43,0.25)]"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setSent(false);
            }}
            placeholder={sent ? "Thanks for subscribing!" : "Enter your email address"}
            className="min-w-0 flex-1 bg-transparent text-[15px] text-charcoal placeholder:text-body/70 focus:outline-none"
          />
          <button
            type="submit"
            className="flex-none rounded-full bg-brand px-7 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:brightness-110"
          >
            Subscribe
          </button>
        </form>
      </div>

      {/* Footer card */}
      <div className="mx-auto mt-16 max-w-7xl rounded-[24px] bg-white px-8 py-10 md:px-12 md:py-11">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between md:gap-6">
          {/* Logo */}
          <a href="#" aria-label="LUMÉ home" className="flex items-center">
            <img
              src="/logo.svg"
              alt="LUMÉ"
              className="h-16 w-16 select-none"
              draggable={false}
            />
          </a>

          {/* Nav */}
          <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[15px] font-medium tracking-tight text-charcoal/80 transition-colors duration-300 hover:text-brand"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-5">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href="#"
                aria-label={s.label}
                className="transition-transform duration-300 hover:-translate-y-0.5"
              >
                <img src={s.src} alt={s.label} className="h-5 w-5" draggable={false} />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px w-full bg-brand/40" />

        {/* Copyright */}
        <p className="text-center text-[13px] tracking-wide text-brand">
          2026©&nbsp;&nbsp;LUMÉ.&nbsp;&nbsp;&nbsp;
          <span className="text-brand/80">| All Rights Reserved</span>
        </p>
      </div>
    </footer>
  );
}
