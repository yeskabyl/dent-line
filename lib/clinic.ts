/**
 * Единый источник данных о клинике.
 * Подтверждённые факты зашиты здесь; всё, что ещё не получено от клиники
 * (телефон, ссылки, второй филиал, цены), задаётся через переменные окружения
 * (см. .env.example) и скрывается на сайте, пока не указано.
 *
 * Важно: значения из process.env доступны только на сервере. Клиентским
 * компонентам их нужно передавать пропсами из серверных.
 */

export const clinic = {
  name: "Dent Line Astana",
  shortName: "Dent Line",
  city: "Астана",
  district: "район Есиль",
  street: "улица Алихан Бокейхан, 16",
  /** Короткий адрес для карточек и подвала */
  addressLine: "ул. Алихан Бокейхан, 16, Астана",
  hours: {
    label: "Ежедневно, 09:00–00:00",
    opens: "09:00",
    closes: "00:00",
  },
  /** Данные из карточки клиники в 2GIS — обновить перед публикацией */
  rating: {
    value: 4.8,
    count: 158,
    source: "2GIS",
  },
  branchCount: 2,
} as const;

export type Branch = {
  id: string;
  title: string;
  address: string;
  hours: string;
  phone?: string;
};

/** Добавьте сюда второй филиал, когда клиника предоставит адрес и график. */
export const branches: Branch[] = [
  {
    id: "esil",
    title: "Dent Line Astana — Есиль",
    address: "Астана, район Есиль, улица Алихан Бокейхан, 16",
    hours: clinic.hours.label,
  },
];

export const hasPendingBranch = branches.length < clinic.branchCount;

const digits = (value?: string) => value?.replace(/\D/g, "") ?? "";

function httpUrl(value?: string): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:"
      ? url.toString()
      : undefined;
  } catch {
    return undefined;
  }
}

function formatPhone(raw: string): string {
  const d = digits(raw);
  if (d.length !== 11) return raw;
  return `+${d[0]} ${d.slice(1, 4)} ${d.slice(4, 7)} ${d.slice(7, 9)} ${d.slice(9)}`;
}

export type Contacts = {
  phone?: { display: string; href: string };
  whatsappNumber?: string;
  whatsappUrl?: string;
  instagramUrl?: string;
  /** Официальная ссылка на карточку в 2GIS или поиск по названию, если её нет */
  gisUrl: string;
  gisIsOfficial: boolean;
  mapEmbedUrl: string;
  mapDirectionsUrl: string;
};

/** Читает контакты из окружения. Вызывать только в серверных компонентах. */
export function getContacts(): Contacts {
  const phoneDigits = digits(process.env.CLINIC_PHONE);
  const waDigits = digits(process.env.CLINIC_WHATSAPP);
  const officialGis = httpUrl(process.env.CLINIC_2GIS_URL);
  const query = encodeURIComponent(`${clinic.street}, ${clinic.city}`);

  return {
    phone:
      phoneDigits.length === 11
        ? { display: formatPhone(phoneDigits), href: `tel:+${phoneDigits}` }
        : undefined,
    whatsappNumber: waDigits.length >= 11 ? waDigits : undefined,
    whatsappUrl: waDigits.length >= 11 ? `https://wa.me/${waDigits}` : undefined,
    instagramUrl: httpUrl(process.env.CLINIC_INSTAGRAM_URL),
    gisUrl:
      officialGis ??
      `https://2gis.kz/astana/search/${encodeURIComponent(clinic.name)}`,
    gisIsOfficial: Boolean(officialGis),
    mapEmbedUrl: `https://www.google.com/maps?q=${query}&hl=ru&z=16&output=embed`,
    mapDirectionsUrl: `https://www.google.com/maps/search/?api=1&query=${query}`,
  };
}

export function getSiteUrl(): string {
  return (
    httpUrl(process.env.NEXT_PUBLIC_SITE_URL)?.replace(/\/$/, "") ??
    "http://localhost:3000"
  );
}

export const navigation = [
  { href: "#top", label: "Главная" },
  { href: "#services", label: "Услуги" },
  { href: "#about", label: "О клинике" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#contacts", label: "Контакты" },
] as const;
