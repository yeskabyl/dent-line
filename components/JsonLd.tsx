import { clinic, getContacts, getSiteUrl } from "@/lib/clinic";

/**
 * Schema.org Dentist — только подтверждённые данные. Рейтинг 2GIS намеренно
 * не включён в разметку: это сторонний источник. Телефон и соцсети добавляются,
 * когда указаны в окружении.
 */
export function JsonLd() {
  const contacts = getContacts();
  const siteUrl = getSiteUrl();

  const data = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: clinic.name,
    url: siteUrl,
    image: `${siteUrl}/images/hero.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "улица Алихан Бокейхан, 16",
      addressLocality: "Астана",
      addressCountry: "KZ",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "09:00",
      closes: "23:59",
    },
    ...(contacts.phone ? { telephone: contacts.phone.href.replace("tel:", "") } : {}),
    ...(contacts.instagramUrl ? { sameAs: [contacts.instagramUrl] } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
