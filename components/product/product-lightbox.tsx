"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { cn } from "@/lib/cn";
import { ChevronLeft, ChevronRight, X } from "@/components/ui/icons";

const ZOOM = 2.5;

/**
 * Fullscreen photo viewer for touch (and mouse). Tap the photo to zoom in on
 * that spot, drag to move around, swipe or use the arrows/thumbnails to change
 * photo, and the big × to close. Kept deliberately simple and finger-friendly.
 * Rendered in a portal because the gallery lives inside transformed motion
 * elements, which would otherwise break `position: fixed`.
 */
export function ProductLightbox({
  images,
  title,
  initialIndex,
  onClose,
}: {
  images: string[];
  title: string;
  initialIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(initialIndex);
  const [zoomed, setZoomed] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const areaRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; panX: number; panY: number; moved: boolean } | null>(null);
  const multi = images.length > 1;

  const reset = () => {
    setZoomed(false);
    setPan({ x: 0, y: 0 });
  };
  const go = (delta: number) => {
    reset();
    setIndex((i) => (i + delta + images.length) % images.length);
  };

  // Lock the page behind the overlay and wire keyboard controls.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function clampPan(x: number, y: number) {
    const rect = areaRef.current?.getBoundingClientRect();
    if (!rect) return { x, y };
    const maxX = ((ZOOM - 1) * rect.width) / 2;
    const maxY = ((ZOOM - 1) * rect.height) / 2;
    return {
      x: Math.max(-maxX, Math.min(maxX, x)),
      y: Math.max(-maxY, Math.min(maxY, y)),
    };
  }

  function onPointerDown(e: React.PointerEvent) {
    e.currentTarget.setPointerCapture?.(e.pointerId);
    drag.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y, moved: false };
    if (zoomed) setDragging(true);
  }

  function onPointerMove(e: React.PointerEvent) {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (Math.hypot(dx, dy) > 8) d.moved = true;
    if (zoomed) setPan(clampPan(d.panX + dx, d.panY + dy));
  }

  function onPointerUp(e: React.PointerEvent) {
    const d = drag.current;
    drag.current = null;
    setDragging(false);
    if (!d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;

    if (!d.moved) {
      // A tap: zoom in on the tapped spot, or zoom back out.
      if (!zoomed) {
        const rect = areaRef.current!.getBoundingClientRect();
        const ox = e.clientX - (rect.left + rect.width / 2);
        const oy = e.clientY - (rect.top + rect.height / 2);
        setPan(clampPan(-ox * (ZOOM - 1), -oy * (ZOOM - 1)));
        setZoomed(true);
      } else {
        reset();
      }
      return;
    }

    // A horizontal swipe (only while not zoomed) flips to the next photo.
    if (!zoomed && multi && Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
      go(dx < 0 ? 1 : -1);
    }
  }

  const arrowBtn =
    "absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm";

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Galería: ${title}`}
      style={{ backgroundColor: "rgba(0,0,0,0.94)" }}
      className="fixed inset-0 z-[100] flex select-none flex-col"
    >
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-sm font-medium text-white/80">
          {multi ? `${index + 1} / ${images.length}` : title}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <div
        ref={areaRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className={cn("relative flex-1 touch-none overflow-hidden", zoomed ? "cursor-zoom-out" : "cursor-zoom-in")}
      >
        <Image
          key={images[index]}
          src={images[index]}
          alt={`${title} — imagen ${index + 1}`}
          fill
          draggable={false}
          sizes="100vw"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoomed ? ZOOM : 1})`,
            transformOrigin: "center",
            transition: dragging ? "none" : "transform 0.25s cubic-bezier(0.16,1,0.3,1)",
          }}
          className="object-contain p-3 motion-reduce:transition-none"
        />

        {multi && !zoomed && (
          <>
            <button type="button" onClick={() => go(-1)} aria-label="Anterior" className={cn(arrowBtn, "left-3")}>
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Siguiente" className={cn(arrowBtn, "right-3")}>
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}
      </div>

      {!zoomed && (
        <p className="py-3 text-center text-[13px] text-white/60">Tocá la foto para acercar</p>
      )}

      {multi && (
        <div className="no-scrollbar flex justify-center gap-2 overflow-x-auto px-4 pb-5">
          {images.map((image, i) => (
            <button
              key={image}
              type="button"
              onClick={() => {
                reset();
                setIndex(i);
              }}
              aria-label={`Ver imagen ${i + 1}`}
              aria-current={i === index}
              className={cn(
                "relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-white/90 transition-opacity",
                i === index ? "ring-2 ring-white" : "opacity-50",
              )}
            >
              <Image src={image} alt="" fill sizes="56px" className="object-contain p-1" />
            </button>
          ))}
        </div>
      )}
    </div>,
    document.body,
  );
}
