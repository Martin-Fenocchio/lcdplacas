"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import heroPlaca from "@/assets/hero-placa.jpg";
import { Check, Search, ShieldCheck } from "@/components/ui/icons";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const leftGroup: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const rightGroup: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.28 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};
const imageIn: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE } },
};
const statPop: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 240, damping: 18 } },
};

const HERO_GLOW = {
  width: 340,
  height: 340,
  right: "6%",
  top: "8%",
  background: "radial-gradient(circle, rgba(37,99,235,0.14), transparent 68%)",
  filter: "blur(6px)",
} as const;

const HERO_TINT = {
  background:
    "radial-gradient(680px 340px at 78% 6%, rgba(37,99,235,0.10), transparent 70%), radial-gradient(560px 320px at 96% 40%, rgba(6,182,212,0.10), transparent 70%)",
} as const;

const POPULAR = ["Placa main Hisense", "Fuente Noblex", "T-Con Sansei", "Tira de LED Noblex"];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-0" style={HERO_TINT} />
      <div className="animate-float-glow pointer-events-none absolute rounded-full" style={HERO_GLOW} />

      <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-8 px-6 pb-14 pt-12 min-[900px]:grid-cols-[1.05fr_0.95fr] min-[900px]:gap-14 min-[900px]:pb-[84px] min-[900px]:pt-[76px]">
        <motion.div variants={leftGroup} initial="hidden" animate="show">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-primary-softer bg-primary-soft px-3.5 py-1.5 text-[13px] font-semibold text-primary-hover"
          >
            <Check className="h-3.5 w-3.5" strokeWidth={2.2} />
            Probadas en 5 puntos · Garantía
          </motion.span>
          <motion.h1
            variants={item}
            className="mt-5 max-w-[16ch] text-[clamp(38px,4.6vw,60px)] font-bold leading-[1.06]"
          >
            Repuestos para TV LED, <span className="text-primary">probados y garantizados</span>
          </motion.h1>
          <motion.p variants={item} className="mt-5 max-w-[52ch] text-lg leading-[1.55] text-slate-600">
            Placas main, fuentes, T-Con, tiras de LED y componentes. Encontrá la placa exacta para tu TV por marca,
            modelo o código de parte.
          </motion.p>

          <motion.form
            variants={item}
            action="/productos"
            className="mt-[30px] flex max-w-[580px] flex-col gap-2.5 min-[561px]:flex-row"
          >
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-[18px] top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
              <input
                type="search"
                name="q"
                placeholder="Ej. Hisense 55U60H o RSAG7.820.11493"
                aria-label="Buscar repuestos"
                className="h-14 w-full rounded-xl border border-line-strong bg-white pl-[50px] pr-[18px] text-[15px] text-ink shadow-[0_4px_16px_rgba(15,23,42,0.05)] outline-none focus:border-primary"
              />
            </div>
            <motion.button
              type="submit"
              whileTap={{ scale: 0.97 }}
              className="h-14 whitespace-nowrap rounded-xl bg-primary px-[26px] font-display text-[15px] font-semibold text-white shadow-[0_8px_24px_rgba(37,99,235,0.28)] transition-colors hover:bg-primary-hover"
            >
              Buscar
            </motion.button>
          </motion.form>

          <motion.div variants={item} className="mt-4 flex flex-wrap items-center gap-2 text-[13px] text-muted">
            <span className="text-muted">Populares:</span>
            {POPULAR.map((term) => (
              <Link
                key={term}
                href="/productos"
                className="rounded-full border border-line bg-surface px-[11px] py-1 font-medium text-body transition-colors hover:border-primary-softer"
              >
                {term}
              </Link>
            ))}
          </motion.div>
        </motion.div>

        <motion.div variants={rightGroup} initial="hidden" animate="show">
          <motion.div
            variants={imageIn}
            className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line shadow-[0_30px_60px_-30px_rgba(15,23,42,0.35)]"
          >
            <Image
              src={heroPlaca}
              alt="Placa de circuito de un TV LED en primer plano"
              fill
              priority
              placeholder="blur"
              sizes="(max-width: 900px) 100vw, 45vw"
              className="object-cover"
            />
          </motion.div>
          <motion.div
            variants={statPop}
            className="relative -ml-[18px] -mt-[46px] flex w-fit items-center gap-3 rounded-2xl border border-line bg-white px-[18px] py-3.5 shadow-[0_16px_40px_-18px_rgba(15,23,42,0.3)]"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] bg-success-soft text-success">
              <ShieldCheck className="h-5 w-5" strokeWidth={2} />
            </span>
            <div>
              <div className="font-display text-base font-bold text-ink">Garantía real</div>
              <div className="text-xs text-muted">Cada placa, testeada antes de enviar</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
