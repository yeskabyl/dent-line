import { z } from "zod";
import { services } from "./services";

export const timeWindows = [
  { value: "morning", label: "Утро, 09:00–12:00" },
  { value: "day", label: "День, 12:00–17:00" },
  { value: "evening", label: "Вечер, 17:00–21:00" },
  { value: "late", label: "Поздний вечер, 21:00–00:00" },
] as const;

/** Приводит номер к виду 77001234567 или возвращает null, если формат неверный. */
export function normalizePhone(raw: string): string | null {
  let d = raw.replace(/\D/g, "");
  if (d.length === 11 && d.startsWith("8")) d = `7${d.slice(1)}`;
  if (d.length === 10) d = `7${d}`;
  return /^7\d{10}$/.test(d) ? d : null;
}

const serviceIds = services.map((s) => s.id);
const windowIds = timeWindows.map((t) => t.value);

export const bookingSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Введите имя — не короче 2 символов")
    .max(60, "Имя слишком длинное"),
  phone: z
    .string()
    .trim()
    .min(1, "Введите номер телефона")
    .refine(
      (v) => normalizePhone(v) !== null,
      "Проверьте номер: например, +7 701 123 45 67",
    ),
  service: z
    .string()
    .refine((v) => v === "" || serviceIds.includes(v), "Выберите услугу из списка"),
  date: z
    .string()
    .refine((v) => v === "" || /^\d{4}-\d{2}-\d{2}$/.test(v), "Некорректная дата"),
  timeWindow: z
    .string()
    .refine(
      (v) => v === "" || (windowIds as readonly string[]).includes(v),
      "Выберите время из списка",
    ),
  consent: z.literal(true, {
    error: "Необходимо согласие на обработку персональных данных",
  }),
});

export type BookingValues = z.infer<typeof bookingSchema>;

/** Текст сообщения для WhatsApp на основе данных формы. */
export function buildWhatsAppMessage(values: BookingValues): string {
  const service = services.find((s) => s.id === values.service)?.title;
  const window = timeWindows.find((t) => t.value === values.timeWindow)?.label;
  const lines = [
    "Здравствуйте! Хочу записаться на приём в Dent Line Astana.",
    `Имя: ${values.name}`,
    `Телефон: ${values.phone}`,
    service ? `Услуга: ${service}` : null,
    values.date ? `Удобная дата: ${values.date}` : null,
    window ? `Удобное время: ${window}` : null,
  ];
  return lines.filter(Boolean).join("\n");
}
