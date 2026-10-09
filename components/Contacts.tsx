import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { branches, clinic, getContacts, hasPendingBranch } from "@/lib/clinic";
import { button, container } from "@/lib/ui";
import { InstagramIcon, WhatsAppIcon } from "./icons";
import { MapEmbed } from "./MapEmbed";
import { SectionHeading } from "./SectionHeading";

export function Contacts() {
  const contacts = getContacts();

  return (
    <section id="contacts" aria-labelledby="contacts-title" className="py-20 sm:py-28">
      <div className={container}>
        <SectionHeading
          id="contacts-title"
          eyebrow="Контакты"
          title="Как нас найти"
          description="Мы находимся в районе Есиль в Астане и принимаем ежедневно."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-4">
            {branches.map((branch) => (
              <article
                key={branch.id}
                className="reveal rounded-3xl border border-line bg-cloud p-6 sm:p-8"
              >
                <h3 className="font-display text-2xl font-medium">{branch.title}</h3>
                <ul className="mt-5 space-y-3.5">
                  <li className="flex gap-3">
                    <MapPin className="mt-0.5 size-5 shrink-0 text-teal-700" aria-hidden="true" />
                    <address className="not-italic text-ink">{branch.address}</address>
                  </li>
                  <li className="flex gap-3">
                    <Clock className="mt-0.5 size-5 shrink-0 text-teal-700" aria-hidden="true" />
                    <span className="text-ink">{branch.hours}</span>
                  </li>
                  {contacts.phone ? (
                    <li className="flex gap-3">
                      <Phone className="mt-0.5 size-5 shrink-0 text-teal-700" aria-hidden="true" />
                      <a href={contacts.phone.href} className="font-semibold text-ink hover:text-navy-700">
                        {contacts.phone.display}
                      </a>
                    </li>
                  ) : null}
                </ul>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  {contacts.whatsappUrl ? (
                    <a
                      href={contacts.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={button.primary}
                    >
                      <WhatsAppIcon className="size-5" />
                      WhatsApp
                    </a>
                  ) : null}
                  {contacts.instagramUrl ? (
                    <a
                      href={contacts.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={button.outline}
                    >
                      <InstagramIcon className="size-5" />
                      Instagram
                    </a>
                  ) : null}
                  <a
                    href={contacts.gisUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={button.outline}
                  >
                    {contacts.gisIsOfficial ? "Открыть в 2GIS" : "Найти в 2GIS"}
                  </a>
                  <a href="#booking" className={button.accent}>
                    Записаться
                  </a>
                </div>
              </article>
            ))}

            {hasPendingBranch ? (
              <article className="rounded-3xl border border-dashed border-line p-6 sm:p-8">
                <h3 className="font-display text-xl font-medium">Второй филиал</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed">
                  У клиники {clinic.branchCount} филиала. Адрес и график второго филиала уточняйте
                  у администратора.
                </p>
              </article>
            ) : null}
          </div>

          <div className="reveal relative min-h-[22rem] overflow-hidden rounded-3xl border border-line bg-mist lg:min-h-full">
            <MapEmbed
              src={contacts.mapEmbedUrl}
              title={`Карта: ${clinic.name}, ${clinic.addressLine}`}
            />
            <a
              href={contacts.mapDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 left-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-4 text-sm font-bold text-navy-900 shadow-soft transition-colors hover:bg-mist"
            >
              <Navigation className="size-4" aria-hidden="true" />
              Построить маршрут
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
