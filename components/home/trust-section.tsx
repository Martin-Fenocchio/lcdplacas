import { cn } from "@/lib/cn";
import { QUALITY_CHECKS } from "@/lib/products";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { CheckThick } from "@/components/ui/icons";

export function TrustSection() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 py-[76px]">
      <div className="grid grid-cols-1 items-center gap-8 min-[900px]:grid-cols-[0.9fr_1.1fr] min-[900px]:gap-[52px]">
        <div className="overflow-hidden rounded-[22px] border border-line shadow-[0_24px_50px_-28px_rgba(15,23,42,0.35)]">
          <ImagePlaceholder
            stripe="panel"
            glyph="image"
            label="foto_testeo_taller.jpg"
            className="aspect-[5/4]"
            glyphClassName="w-11 h-11"
          />
        </div>

        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-softer bg-primary-soft px-3.5 py-1.5 text-[13px] font-semibold text-primary-hover">
            Nuestro control de calidad
          </span>
          <h2 className="mt-4 text-[34px] font-semibold">Cada placa, probada en 5 puntos</h2>
          <p className="mt-3 max-w-[52ch] text-base leading-[1.6] text-slate-600">
            Antes de salir del taller, testeamos cada repuesto para asegurar que funcione. Sin sorpresas, con garantía.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3.5">
            {QUALITY_CHECKS.map((check, i) => (
              <div
                key={check}
                className={cn(
                  "flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3.5",
                  i === QUALITY_CHECKS.length - 1 && "col-span-2",
                )}
              >
                <span className="inline-flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-success-soft text-success">
                  <CheckThick className="h-4 w-4" />
                </span>
                <span className="text-[15px] font-semibold text-ink">{check}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
