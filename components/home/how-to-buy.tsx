import type { ReactNode } from "react";
import { Search, Truck, Whatsapp } from "@/components/ui/icons";

interface Step {
  n: string;
  icon: ReactNode;
  iconWrap: string;
  title: string;
  body: string;
}

const STEPS: Step[] = [
  {
    n: "01",
    icon: <Search className="h-[26px] w-[26px]" />,
    iconWrap: "bg-primary-soft text-primary",
    title: "Buscá tu repuesto",
    body: "Por modelo de TV, código de parte o marca. Filtrá hasta encontrar la placa exacta.",
  },
  {
    n: "02",
    icon: <Whatsapp className="h-[26px] w-[26px]" />,
    iconWrap: "bg-success-soft text-success",
    title: "Consultá por WhatsApp",
    body: "Escribinos con un clic. Confirmamos stock, precio y forma de pago (transferencia, efectivo o depósito).",
  },
  {
    n: "03",
    icon: <Truck className="h-[26px] w-[26px]" />,
    iconWrap: "bg-primary-soft text-primary",
    title: "Recibí en tu casa",
    body: "Enviamos a todo el país por Correo Argentino. Tu repuesto, probado y garantizado.",
  },
];

export function HowToBuy() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 py-12 min-[900px]:py-[76px]">
      <div className="mx-auto max-w-[620px] text-center">
        <h2 className="text-[32px] font-semibold">Comprar es simple</h2>
        <p className="mt-2 text-base text-muted">
          Sin pago online. Cerramos la compra por WhatsApp, con envío a tu casa.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-[22px] min-[900px]:grid-cols-3">
        {STEPS.map((step) => (
          <div key={step.n} className="relative rounded-[18px] border border-line bg-white px-[26px] py-[30px]">
            <span
              aria-hidden="true"
              data-step={step.n}
              className="step-number absolute right-6 top-[22px] font-display text-[44px] font-bold leading-none text-primary-soft"
            />
            <span className={`inline-flex h-[52px] w-[52px] items-center justify-center rounded-[14px] ${step.iconWrap}`}>
              {step.icon}
            </span>
            <h3 className="mt-[18px] text-[19px] font-semibold">{step.title}</h3>
            <p className="mt-2 text-[15px] leading-[1.55] text-muted">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
