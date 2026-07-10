import Link from "next/link";

type Row = { label: string; count?: number; checked?: boolean };

const MARCAS: Row[] = [
  { label: "Hisense", count: 32, checked: true },
  { label: "LG", count: 41 },
  { label: "Noblex", count: 28 },
  { label: "Philco", count: 19 },
  { label: "Samsung", count: 15 },
];

const TIPOS: Row[] = [
  { label: "Placas Main", count: 54 },
  { label: "Fuentes", count: 31 },
  { label: "T-Con", count: 22 },
  { label: "Tiras de LEDs", count: 12 },
  { label: "Componentes", count: 5 },
];

const ESTADOS: Row[] = [{ label: "Nueva" }, { label: "Scrap nueva" }, { label: "Scrap usada" }];

const DISPONIBILIDAD: Row[] = [{ label: "En stock", checked: true }, { label: "Bajo pedido" }];

function CheckRow({ label, count, checked }: Row) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 py-[5px] text-sm text-body">
      <input type="checkbox" defaultChecked={checked} className="h-[17px] w-[17px] accent-primary" />
      {label}
      {count !== undefined && <span className="ml-auto text-xs text-faint">{count}</span>}
    </label>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-line py-4">
      <div className="mb-3 text-sm font-semibold text-ink">{title}</div>
      {children}
    </div>
  );
}

export function FiltersSidebar() {
  return (
    <aside className="sticky top-[88px] hidden rounded-2xl border border-line bg-white px-5 pb-5 pt-1.5 min-[1000px]:block">
      <div className="flex items-center justify-between pb-1 pt-4">
        <span className="font-display text-base font-semibold text-ink">Filtros</span>
        <Link href="/productos" className="text-[13px] font-medium">
          Limpiar
        </Link>
      </div>

      <Group title="Marca">
        {MARCAS.map((row) => (
          <CheckRow key={row.label} {...row} />
        ))}
        <Link href="/productos" className="mt-2 inline-block text-[13px] font-medium">
          Ver más marcas
        </Link>
      </Group>

      <Group title="Tipo de repuesto">
        {TIPOS.map((row) => (
          <CheckRow key={row.label} {...row} />
        ))}
      </Group>

      <Group title="Estado">
        {ESTADOS.map((row) => (
          <CheckRow key={row.label} {...row} />
        ))}
      </Group>

      <Group title="Disponibilidad">
        {DISPONIBILIDAD.map((row) => (
          <CheckRow key={row.label} {...row} />
        ))}
      </Group>

      <div className="border-t border-line pb-1 pt-4">
        <div className="mb-3.5 text-sm font-semibold text-ink">Rango de precio</div>
        <input type="range" min={0} max={100} defaultValue={60} className="w-full accent-primary" aria-label="Rango de precio" />
        <div className="mt-3 flex gap-2.5">
          <input
            placeholder="Mín"
            aria-label="Precio mínimo"
            className="h-[38px] w-1/2 rounded-lg border border-line px-3 text-[13px] outline-none focus:border-primary"
          />
          <input
            placeholder="Máx"
            aria-label="Precio máximo"
            className="h-[38px] w-1/2 rounded-lg border border-line px-3 text-[13px] outline-none focus:border-primary"
          />
        </div>
      </div>
    </aside>
  );
}
