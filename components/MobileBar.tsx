import { button } from "@/lib/ui";

/** Фиксированная кнопка записи на мобильных устройствах. */
export function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/90 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl sm:hidden">
      <a href="#booking" className={`${button.accent} w-full`}>
        Записаться на приём
      </a>
    </div>
  );
}
