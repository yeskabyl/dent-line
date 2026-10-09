import Image from "next/image";
import { CalendarClock, Star } from "lucide-react";
import { clinic } from "@/lib/clinic";
import { button, container } from "@/lib/ui";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-b from-mist to-white">
      <div
        aria-hidden="true"
        className="absolute -right-40 -top-40 size-[34rem] rounded-full bg-teal-300/20 blur-3xl"
      />
      <div
        className={`${container} relative grid items-center gap-12 pb-16 pt-10 sm:pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-24 lg:pt-20`}
      >
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-teal-700/20 bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-teal-700">
            <span className="size-1.5 rounded-full bg-teal-500" aria-hidden="true" />
            Стоматология · {clinic.city}, {clinic.district}
          </p>
          <h1 className="mt-6 font-display text-[2.5rem] font-medium leading-[1.04] tracking-tight sm:text-6xl lg:text-[4.25rem]">
            Здоровая улыбка начинается с&nbsp;заботы
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-body">
            Современная стоматология в Астане. Помогаем заботиться о здоровье
            зубов в комфортной обстановке.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#booking" className={button.primary}>
              Записаться на приём
            </a>
            <a href="#services" className={button.outline}>
              Наши услуги
            </a>
          </div>

          <dl className="mt-12 grid max-w-xl grid-cols-1 gap-4 border-t border-line pt-8 sm:grid-cols-3 sm:gap-6">
            <div>
              <dt className="flex items-center gap-1.5 text-sm text-body">
                <Star className="size-4 fill-teal-500 text-teal-500" aria-hidden="true" />
                Рейтинг в {clinic.rating.source}
              </dt>
              <dd className="mt-1 font-display text-3xl font-medium text-ink">
                {clinic.rating.value.toString().replace(".", ",")}
                <span className="text-base text-body"> / 5</span>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-body">Отзывов в {clinic.rating.source}</dt>
              <dd className="mt-1 font-display text-3xl font-medium text-ink">
                {clinic.rating.count}
              </dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-sm text-body">
                <CalendarClock className="size-4 text-teal-700" aria-hidden="true" />
                График
              </dt>
              <dd className="mt-1 text-base font-semibold leading-snug text-ink">
                Ежедневно
                <br />
                {clinic.hours.opens}–{clinic.hours.closes}
              </dd>
            </div>
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-mist shadow-lift sm:aspect-[5/5] lg:aspect-[4/5]">
            <Image
              src="/images/hero.jpg"
              alt="Стоматолог показывает пациенту снимок на мониторе в кабинете"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, (min-width: 640px) 576px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-5 left-4 right-4 rounded-2xl border border-line bg-white/95 p-4 shadow-soft backdrop-blur sm:left-auto sm:right-6 sm:max-w-xs">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-700">
              {clinic.shortName} · {clinic.city}
            </p>
            <p className="mt-1.5 text-sm leading-snug text-ink">
              {clinic.street}
              <br />
              <span className="text-body">{clinic.hours.label}</span>
            </p>
          </div>
        </div>
      </div>
      <p className="sr-only">Данные о рейтинге и отзывах приведены по информации 2GIS.</p>
    </section>
  );
}
