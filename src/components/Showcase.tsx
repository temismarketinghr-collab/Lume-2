"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

export default function Showcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const deviceY = reduced ? 0 : rawY;

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative z-10 bg-cream px-6 pb-[140px] pt-0 md:px-10"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-14 md:grid-cols-2 md:gap-10 lg:gap-16">
        {/* LEFT: headline, copy, lifestyle image */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col"
        >
          <h2>
            <span className="block font-sans text-[48px] font-light uppercase leading-[56px] tracking-tight text-charcoal">
              Experience
              <br />
              Intelligent Skin
            </span>
            <span className="text-shimmer block font-sans text-[48px] font-light italic uppercase leading-[56px] tracking-tight text-brand">
              Rejuvenation
            </span>
          </h2>

          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-body">
            LUMÉ combines smart skincare technology with a refined ritual
            designed for everyday glow, lift, and skin confidence.
          </p>

          <div className="mt-10 max-w-sm overflow-hidden rounded-[18px] shadow-card">
            <img
              src="/lifting-device/woman.png"
              alt="A woman using the LUMÉ facial rejuvenation device"
              className="block w-full"
              draggable={false}
            />
          </div>
        </motion.div>

        {/* RIGHT: complete annotated device image (parallax) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="mx-auto w-full max-w-[540px]"
        >
          <motion.img
            style={{ y: deviceY }}
            src="/lifting-device/device.png"
            alt="LUMÉ neck & face lifting device — Red LED array, polished metal head frame, multi-axial joint, ergonomic power button"
            className="block w-full will-change-transform"
            draggable={false}
          />
        </motion.div>
      </div>
    </section>
  );
}
