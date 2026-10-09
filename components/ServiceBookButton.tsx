"use client";

import { ArrowRight } from "lucide-react";
import { SELECT_SERVICE_EVENT } from "@/lib/events";

/** Выбирает услугу в форме записи и прокручивает страницу к форме. */
export function ServiceBookButton({ serviceId, title }: { serviceId: string; title: string }) {
  return (
    <a
      href="#booking"
      aria-label={`Записаться: ${title}`}
      onClick={() =>
        window.dispatchEvent(new CustomEvent(SELECT_SERVICE_EVENT, { detail: serviceId }))
      }
      className="group/btn inline-flex min-h-11 items-center gap-2 text-sm font-bold text-navy-900"
    >
      Записаться
      <ArrowRight
        className="size-4 transition-transform duration-200 group-hover/btn:translate-x-1"
        aria-hidden="true"
      />
    </a>
  );
}
