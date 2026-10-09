const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[0.9375rem] font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60";

/** Классы кнопок и ссылок-кнопок. */
export const button = {
  primary: `${base} bg-navy-900 text-white hover:bg-navy-700`,
  accent: `${base} bg-teal-400 text-navy-950 hover:bg-teal-300`,
  outline: `${base} border border-navy-900/20 bg-white text-navy-900 hover:border-navy-900/50 hover:bg-mist`,
  ghostLight: `${base} border border-white/25 text-white hover:bg-white/10`,
} as const;

export const container = "mx-auto w-full max-w-7xl px-5 sm:px-8";
