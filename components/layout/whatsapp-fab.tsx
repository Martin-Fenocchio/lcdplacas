import { waLink } from "@/lib/site";
import { Whatsapp } from "@/components/ui/icons";

export function WhatsappFab() {
  return (
    <a
      href={waLink("Hola, tengo una consulta sobre un repuesto.")}
      target="_blank"
      rel="noopener noreferrer"
      title="¿Necesitás ayuda?"
      aria-label="Escribinos por WhatsApp"
      className="animate-pulse-ring fixed bottom-6 right-6 z-[60] inline-flex h-[58px] w-[58px] items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_10px_30px_rgba(37,211,102,0.4)]"
    >
      <Whatsapp className="h-[30px] w-[30px]" />
    </a>
  );
}
