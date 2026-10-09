import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.95L2 22l5.2-1.5A9.9 9.9 0 1 0 12.04 2Zm0 1.8a8.1 8.1 0 0 1 0 16.2 8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.08.89.9-3-.2-.31A8.1 8.1 0 0 1 12.04 3.8Zm-3.2 4.2c-.17 0-.45.06-.69.32-.24.26-.9.88-.9 2.15 0 1.26.92 2.48 1.05 2.65.13.17 1.79 2.86 4.4 3.9 2.17.86 2.6.69 3.07.65.47-.04 1.5-.61 1.72-1.2.21-.6.21-1.1.15-1.2-.06-.11-.23-.17-.49-.3-.26-.13-1.5-.74-1.74-.83-.23-.09-.4-.13-.57.13-.17.26-.65.83-.8 1-.15.17-.3.2-.56.07-.26-.13-1.08-.4-2.06-1.27-.76-.68-1.28-1.52-1.43-1.78-.15-.26-.02-.4.11-.52.12-.12.26-.3.4-.45.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.45-.07-.13-.57-1.4-.79-1.9-.2-.5-.4-.43-.57-.44h-.49Z" />
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5 whitespace-nowrap">
      <span
        aria-hidden="true"
        className={`grid size-9 place-items-center rounded-xl ${light ? "bg-white/10 ring-1 ring-white/20" : "bg-navy-900"}`}
      >
        <span className="size-2.5 rounded-full bg-teal-400" />
      </span>
      <span className="leading-none">
        <span
          className={`font-display text-xl font-semibold tracking-tight ${light ? "text-white" : "text-navy-900"}`}
        >
          Dent Line
        </span>
        <span
          className={`mt-1 block text-[0.625rem] font-semibold uppercase tracking-[0.22em] ${light ? "text-teal-300" : "text-teal-700"}`}
        >
          Astana
        </span>
      </span>
    </span>
  );
}
