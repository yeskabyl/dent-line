import { ArrowUpRight, Star } from "lucide-react";
import { clinic, getContacts } from "@/lib/clinic";
import { button, container } from "@/lib/ui";
import { SectionHeading } from "./SectionHeading";

export function Reviews() {
  const { gisUrl } = getContacts();
  const { value, count, source } = clinic.rating;

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="bg-mist py-20 sm:py-28">
      <div className={container}>
        <SectionHeading
          id="reviews-title"
          eyebrow="Отзывы"
          title="Что говорят пациенты"
          description={`Рейтинг клиники по данным ${source}. Настоящие мнения пациентов можно прочитать в карточке клиники.`}
        />

        <div className="reveal mt-12 grid items-center gap-8 rounded-[2rem] border border-line bg-white p-8 shadow-soft sm:p-12 lg:grid-cols-[auto_1fr_auto] lg:gap-14">
          <div className="text-center lg:text-left">
            <p className="font-display text-7xl font-medium leading-none text-navy-900 sm:text-8xl">
              {value.toString().replace(".", ",")}
            </p>
            <div
              className="mt-4 flex justify-center gap-1 lg:justify-start"
              role="img"
              aria-label={`Рейтинг ${value} из 5`}
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <Star
                  key={i}
                  className={`size-6 ${i < Math.round(value) ? "fill-teal-500 text-teal-500" : "text-line"}`}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>

          <div className="text-center lg:text-left">
            <p className="text-xl font-bold text-ink">
              {count} отзывов в {source}
            </p>
            <p className="mt-2 max-w-md text-[0.9375rem] leading-relaxed lg:max-w-none">
              Рейтинг и количество отзывов приведены по данным карточки клиники в {source} и могут
              меняться. Это мнение пациентов, а не гарантия результата лечения.
            </p>
          </div>

          <a
            href={gisUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${button.primary} justify-self-center`}
          >
            Читать отзывы в {source}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
