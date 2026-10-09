"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { navigation } from "@/lib/clinic";
import { button, container } from "@/lib/ui";
import { Logo } from "./icons";

type Props = {
  phone?: { display: string; href: string };
};

export function Header({ phone }: Props) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-white/85 backdrop-blur-xl">
      <div className={`${container} flex h-[4.5rem] items-center justify-between gap-6`}>
        <a href="#top" aria-label="Dent Line Astana — на главную" onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <nav aria-label="Основная навигация" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-full px-4 py-2 text-sm font-semibold text-ink/80 transition-colors hover:bg-mist hover:text-navy-900"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          {phone ? (
            <a
              href={phone.href}
              className="hidden items-center gap-2 text-sm font-bold text-navy-900 xl:inline-flex"
            >
              <Phone className="size-4 text-teal-700" aria-hidden="true" />
              {phone.display}
            </a>
          ) : null}
          <a href="#booking" className={`${button.primary} !min-h-11 max-sm:hidden`}>
            Записаться на приём
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="grid size-11 place-items-center rounded-full border border-line text-navy-900 transition-colors hover:bg-mist lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-menu" className="border-t border-line bg-white lg:hidden">
          <nav aria-label="Мобильная навигация" className={`${container} py-4`}>
            <ul className="flex flex-col">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-12 items-center border-b border-line/70 text-lg font-semibold text-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-col gap-3">
              <a href="#booking" onClick={() => setOpen(false)} className={button.accent}>
                Записаться на приём
              </a>
              {phone ? (
                <a href={phone.href} className={button.outline}>
                  <Phone className="size-4" aria-hidden="true" />
                  {phone.display}
                </a>
              ) : null}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
