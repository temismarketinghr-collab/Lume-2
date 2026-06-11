"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    title: "Cleanse & Prep",
    desc: "Gently cleanse skin and open pores for optimal absorption.",
  },
  {
    title: "Treat & Lift",
    desc: "Apply microcurrent and heat therapy to lift and firm.",
  },
  {
    title: "Hydrate & Glow",
    desc: "Enhance serum absorption for deep, lasting hydration.",
  },
  {
    title: "Calm & Rejuvenate",
    desc: "Cool LED therapy to soothe and accelerate skin renewal.",
  },
];

export default function TreatmentProcess() {
  return (
    <section
      id="process"
      className="relative z-10 bg-[#E9F4F9] px-6 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        {/* Title */}
        <h2 className="mx-auto mb-14 max-w-3xl text-center font-sans text-[34px] font-light leading-[42px] text-charcoal md:mb-20 md:text-[48px] md:leading-[56px]">
          Your <span className="italic text-brand">Journey</span> To
          Healthier-Looking Skin
        </h2>

        <div className="grid items-stretch gap-8 md:grid-cols-2 lg:gap-10">
          {/* LEFT: treatment process card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[24px] bg-white p-7 shadow-card md:p-9"
          >
            <p className="text-[13px] font-bold uppercase tracking-[0.16em] text-brand">
              LUMÉ Treatment Process
            </p>

            <div className="mt-6 space-y-4">
              {STEPS.map((step) => (
                <div
                  key={step.title}
                  className="rounded-[16px] bg-[#DCEAF3] px-5 py-4 transition-colors duration-300 hover:bg-[#d2e4ef]"
                >
                  <h3 className="text-[14px] font-bold uppercase tracking-[0.06em] text-brand">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-body">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: lifestyle image */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="min-h-[320px] overflow-hidden rounded-[24px] shadow-card"
          >
            <img
              src="/Process/lifestyle.png"
              alt="A woman using the LUMÉ device alongside the full LUMÉ device collection"
              className="h-full w-full object-cover"
              draggable={false}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
