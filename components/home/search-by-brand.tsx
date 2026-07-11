"use client";

import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { BRANDS } from "@/lib/site";

const MotionLink = motion.create(Link);

const PANEL = {
  background: "linear-gradient(135deg,#eff6ff 0%,#ffffff 52%,#ecfeff 100%)",
} as const;

const GLOW = {
  background:
    "radial-gradient(520px 220px at 12% -10%, rgba(37,99,235,0.12), transparent 70%), radial-gradient(480px 240px at 92% 110%, rgba(6,182,212,0.12), transparent 70%)",
} as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};
const pill: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

const PILL_BASE =
  "min-w-[110px] rounded-xl px-[22px] py-3 text-center font-display text-[15px] font-semibold " +
  "transition-[translate,background-color,box-shadow,border-color] duration-200 will-change-transform hover:-translate-y-0.5";

export function SearchByBrand() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 py-10 min-[900px]:py-[52px]">
      <div
        className="relative overflow-hidden rounded-[20px] border border-primary-softer px-8 py-[34px] shadow-[0_24px_60px_-34px_rgba(37,99,235,0.35)]"
        style={PANEL}
      >
        <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={GLOW} />

        <div className="relative mx-auto max-w-[640px] text-center">
          <h2 className="text-[26px] font-semibold">Encontrá el repuesto exacto para tu TV</h2>
          <p className="mt-2 text-[15px] text-muted">
            Elegí la marca y filtramos los repuestos compatibles con tu modelo.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="relative mt-6 flex flex-wrap justify-center gap-3"
        >
          {BRANDS.map((brand) => (
            <MotionLink
              key={brand}
              variants={pill}
              href="/productos"
              className={`${PILL_BASE} border border-primary-softer bg-primary-soft text-primary-hover hover:border-primary hover:bg-primary hover:text-white hover:shadow-[0_12px_26px_-12px_rgba(37,99,235,0.65)]`}
            >
              {brand}
            </MotionLink>
          ))}
          <MotionLink
            variants={pill}
            href="/productos"
            className={`${PILL_BASE} border border-dashed border-primary/45 bg-white/70 text-primary hover:bg-primary-soft hover:shadow-[0_12px_26px_-12px_rgba(37,99,235,0.45)]`}
          >
            Ver todas →
          </MotionLink>
        </motion.div>
      </div>
    </section>
  );
}
