export function AnnouncementBar() {
  return (
    <div className="bg-ink text-[13px] text-slate-200">
      <div className="mx-auto flex max-w-[1280px] items-center justify-center gap-2.5 px-6 py-[9px] text-center">
        <span className="inline-flex h-1.5 w-1.5 rounded-full bg-accent-light" />
        <span>
          Envíos a todo el país por Correo Argentino
          <span className="hidden min-[560px]:inline">
            {" "}· Placas <strong className="font-semibold text-white">probadas en 5 puntos</strong>
          </span>
        </span>
      </div>
    </div>
  );
}
