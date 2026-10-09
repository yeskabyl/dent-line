import Link from "next/link";
import { clinic, getContacts, navigation } from "@/lib/clinic";
import { container } from "@/lib/ui";
import { CurrentYear } from "./CurrentYear";
import { InstagramIcon, Logo, WhatsAppIcon } from "./icons";

export function Footer() {
  const contacts = getContacts();

  return (
    <footer className="bg-navy-950 pb-28 pt-16 text-white/70 lg:pb-12">
      <div className={container}>
        <div className="grid gap-12 md:grid-cols-[1.2fr_0.8fr_1fr]">
          <div>
            <a href="#top" aria-label="Dent Line Astana — наверх">
              <Logo light />
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed">
              Стоматологическая клиника в Астане. Помогаем заботиться о здоровье зубов в
              комфортной обстановке.
            </p>
          </div>

          <nav aria-label="Навигация в подвале">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-300">Разделы</p>
            <ul className="mt-4 space-y-1">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-flex min-h-9 items-center text-sm transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-300">Контакты</p>
            <address className="mt-4 space-y-2 text-sm not-italic leading-relaxed">
              <p>{clinic.name}</p>
              <p>{clinic.addressLine}</p>
              <p>{clinic.hours.label}</p>
              {contacts.phone ? (
                <p>
                  <a href={contacts.phone.href} className="font-semibold text-white">
                    {contacts.phone.display}
                  </a>
                </p>
              ) : null}
            </address>
            {contacts.whatsappUrl || contacts.instagramUrl ? (
              <div className="mt-5 flex gap-3">
                {contacts.whatsappUrl ? (
                  <a
                    href={contacts.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="grid size-11 place-items-center rounded-full border border-white/20 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <WhatsAppIcon className="size-5" />
                  </a>
                ) : null}
                {contacts.instagramUrl ? (
                  <a
                    href={contacts.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="grid size-11 place-items-center rounded-full border border-white/20 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <InstagramIcon className="size-5" />
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs leading-relaxed sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xl space-y-2">
            <p>
              © <CurrentYear /> {clinic.name}. Все права защищены.
            </p>
            <p>
              Информация на сайте носит справочный характер и не заменяет консультацию врача.
              Рейтинг и отзывы приведены по данным {clinic.rating.source}.
            </p>
          </div>
          <ul className="flex flex-col gap-1 sm:items-end">
            <li>
              <Link href="/privacy" className="inline-flex min-h-9 items-center underline underline-offset-2 hover:text-white">
                Политика конфиденциальности
              </Link>
            </li>
            <li>
              <Link href="/privacy#data" className="inline-flex min-h-9 items-center underline underline-offset-2 hover:text-white">
                Обработка персональных данных
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
