import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { casaAssets } from "@/lib/casa-assets";

const galleryAlts = [
  "Sala de estar com mobiliário e decoração Casa Bem Otto",
  "Composição de ambiente com móveis e iluminação Casa Bem Otto",
  "Detalhe de mobiliário e acabamentos Casa Bem Otto",
  "Ambiente integrado com curadoria Casa Bem Otto",
  "Móveis e objetos decorativos no showroom Casa Bem Otto",
  "Ambiente contemporâneo com peças Casa Bem Otto",
];

export function GalleryLightbox() {
  const [active, setActive] = useState<number | null>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLButtonElement | null>(null);
  const touchStart = useRef<number | null>(null);

  const close = () => {
    setActive(null);
    window.setTimeout(() => opener.current?.focus(), 0);
  };
  const move = (direction: number) => setActive((current) => current === null ? null : (current + direction + casaAssets.gallery.length) % casaAssets.gallery.length);

  useEffect(() => {
    if (active === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
      if (event.key === "Tab") {
        const controls = Array.from(document.querySelectorAll<HTMLElement>("[data-lightbox-control]"));
        const first = controls[0];
        const last = controls.at(-1);
        if (!first || !last) return;
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", keydown);
    return () => { document.body.style.overflow = previousOverflow; window.removeEventListener("keydown", keydown); };
  }, [active]);

  return <>
    <div className="gallery-grid mt-12" aria-label="Galeria de inspirações Casa Bem Otto">
      {casaAssets.gallery.map((asset, index) => <button
        key={asset.small}
        ref={(node) => { if (active === index && node) opener.current = node; }}
        type="button"
        className="gallery-tile group border-0 p-0 text-left"
        onClick={(event) => { opener.current = event.currentTarget; setActive(index); }}
        aria-label={`Ampliar imagem ${index + 1}: ${galleryAlts[index]}`}
      >
        <img src={asset.small} alt={galleryAlts[index]} width="480" height="600" loading="lazy" decoding="async" className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.035]" />
        <span className="gallery-expand"><Maximize2 className="size-4" /> Ampliar</span>
      </button>)}
    </div>
    {active !== null && casaAssets.gallery[active] && <div
      className="fixed inset-0 z-[90] grid place-items-center bg-overlay px-3 py-16 sm:px-12"
      role="dialog"
      aria-modal="true"
      aria-label={`Imagem ${active + 1} de ${casaAssets.gallery.length}`}
      onMouseDown={(event) => { if (event.currentTarget === event.target) close(); }}
      onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null; }}
      onTouchEnd={(event) => { const end = event.changedTouches[0]?.clientX; if (touchStart.current !== null && end !== undefined && Math.abs(end - touchStart.current) > 55) move(end < touchStart.current ? 1 : -1); touchStart.current = null; }}
    >
      <Button ref={closeButton} data-lightbox-control variant="glassDark" size="icon" className="absolute right-4 top-4 size-12" onClick={close} aria-label="Fechar galeria"><X /></Button>
      <Button data-lightbox-control variant="glassDark" size="icon" className="absolute left-3 top-1/2 size-12 -translate-y-1/2 sm:left-6" onClick={() => move(-1)} aria-label="Imagem anterior"><ChevronLeft /></Button>
      <figure className="max-h-full max-w-6xl text-center">
        <img src={casaAssets.gallery[active]?.large} alt={galleryAlts[active] ?? "Inspiração Casa Bem Otto"} width="1600" height="1200" className="max-h-[78svh] max-w-full object-contain" />
        <figcaption className="mt-4 text-xs text-dark-muted">{active + 1} / {casaAssets.gallery.length}</figcaption>
      </figure>
      <Button data-lightbox-control variant="glassDark" size="icon" className="absolute right-3 top-1/2 size-12 -translate-y-1/2 sm:right-6" onClick={() => move(1)} aria-label="Próxima imagem"><ChevronRight /></Button>
    </div>}
  </>;
}