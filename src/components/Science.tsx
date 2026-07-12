"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BeforeAfter from "@/components/BeforeAfter";

const ITEMS = [
  {
    title: "Lift & Firm Skin",
    body: "Microcurrent technology stimulates facial muscles, creating a natural lifting and firming effect over time.",
  },
  {
    title: "Enhance Product Absorption",
    body: "Gentle warmth opens the skin's surface so serums and actives absorb deeper for visibly smoother, healthier-looking results.",
  },
  {
    title: "Relax Facial Tension",
    body: "Soothing vibration and heat release built-up tension, easing tight muscles and calming the overall complexion.",
  },
  {
    title: "Sculpt Facial Contours",
    body: "Targeted multi-axial movement helps define the jawline and cheekbones for a more sculpted, refined facial profile.",
  },
];

function Toggle({ open }: { open: boolean }) {
  return (
    <span
      className={[
        "flex h-7 w-7 flex-none items-center justify-center rounded-full text-base leading-none transition-all duration-300",
        open
          ? "bg-brand text-white"
          : "border border-charcoal/25 text-charcoal/60",
      ].join(" ")}
      aria-hidden="true"
    >
      {open ? "–" : "+"}
    </span>
  );
}

export default function Science() {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="science"
      className="relative z-10 bg-cream px-6 pb-[140px] pt-20 md:px-10 md:pt-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2 md:gap-16">
        {/* LEFT: title + accordion */}
        <div>
          <h2 className="font-sans text-[34px] font-light leading-[42px] text-charcoal md:text-[48px] md:leading-[56px]">
            The Science Behind Your{" "}
            <span className="text-shimmer italic text-brand">Natural Glow</span>
          </h2>

          <div className="mt-10">
            {ITEMS.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={item.title} className="border-b border-charcoal/10">
                  <button
                    type="button"
                    onClick={() => setOpen(i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span
                      className={[
                        "text-[13px] font-semibold uppercase tracking-[0.12em] transition-colors duration-300",
                        isOpen ? "text-brand" : "text-charcoal",
                      ].join(" ")}
                    >
                      {item.title}
                    </span>
                    <Toggle open={isOpen} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-md pb-6 text-[15px] leading-relaxed text-body">
                          {item.body}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT: draggable before / after comparison */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <BeforeAfter before="/FAQ/before.png" after="/FAQ/after.png" />
        </motion.div>
      </div>
    </section>
  );
}
