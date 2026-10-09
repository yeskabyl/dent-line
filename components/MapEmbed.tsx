"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { button } from "@/lib/ui";

/**
 * Карта загружается только по клику: до этого момента данные посетителя
 * не передаются стороннему сервису.
 */
export function MapEmbed({ src, title }: { src: string; title: string }) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <iframe
        src={src}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="size-full border-0"
        allowFullScreen
      />
    );
  }

  return (
    <div className="flex size-full flex-col items-center justify-center gap-4 bg-mist p-6 text-center">
      <span className="grid size-14 place-items-center rounded-full bg-white text-teal-700 shadow-soft">
        <MapPin className="size-6" aria-hidden="true" />
      </span>
      <p className="max-w-xs text-sm leading-relaxed">
        Карта подгружается с сервиса Google Maps после вашего нажатия.
      </p>
      <button type="button" onClick={() => setLoaded(true)} className={button.primary}>
        Показать карту
      </button>
    </div>
  );
}
