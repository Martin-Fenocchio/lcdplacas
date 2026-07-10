import type { ReactNode } from "react";
import { ShieldCheck, TrendingUp, Truck, Whatsapp } from "@/components/ui/icons";

interface Prop {
  icon: ReactNode;
  iconWrap: string;
  title: string;
  subtitle: string;
}

const PROPS: Prop[] = [
  {
    icon: <Truck className="h-[22px] w-[22px]" />,
    iconWrap: "bg-primary/[0.18] text-sky",
    title: "Envíos a todo el país",
    subtitle: "Correo Argentino",
  },
  {
    icon: <ShieldCheck className="h-[22px] w-[22px]" />,
    iconWrap: "bg-primary/[0.18] text-sky",
    title: "Compra segura",
    subtitle: "Datos reales y verificables",
  },
  {
    icon: <Whatsapp className="h-[22px] w-[22px]" />,
    iconWrap: "bg-whatsapp/[0.16] text-[#4ADE80]",
    title: "Atención por WhatsApp",
    subtitle: "Respuesta rápida",
  },
  {
    icon: <TrendingUp className="h-[22px] w-[22px]" />,
    iconWrap: "bg-primary/[0.18] text-sky",
    title: "Garantía",
    subtitle: "Repuestos probados",
  },
];

export function ValueProps() {
  return (
    <section className="bg-ink text-slate-200">
      <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-5 px-6 py-11 max-[560px]:grid-cols-1 min-[900px]:grid-cols-4">
        {PROPS.map((prop) => (
          <div key={prop.title} className="flex items-center gap-3.5">
            <span className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${prop.iconWrap}`}>
              {prop.icon}
            </span>
            <div>
              <div className="font-display text-base font-semibold text-white">{prop.title}</div>
              <div className="text-[13px] text-faint">{prop.subtitle}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
