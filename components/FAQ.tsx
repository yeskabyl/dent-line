import { ChevronDown } from "lucide-react";
import { clinic } from "@/lib/clinic";
import { container } from "@/lib/ui";
import { SectionHeading } from "./SectionHeading";

const faq = [
  {
    q: "Как записаться на приём?",
    a: "Оставьте заявку в форме на этой странице — администратор свяжется с вами и подберёт время. Также можно связаться с клиникой через контакты внизу страницы.",
  },
  {
    q: "Где находится клиника?",
    a: `Dent Line Astana находится в Астане, в районе Есиль, по адресу: ${clinic.street}. Всего у клиники ${clinic.branchCount} филиала — актуальные адреса уточняйте у администратора.`,
  },
  {
    q: "Какой график работы?",
    a: `Клиника принимает ежедневно с ${clinic.hours.opens} до ${clinic.hours.closes}.`,
  },
  {
    q: "Как узнать стоимость лечения?",
    a: "Стоимость зависит от конкретной ситуации и объёма лечения, поэтому на сайте мы не указываем цены. Администратор подскажет актуальные цены при записи, а врач озвучит план и стоимость после осмотра.",
  },
  {
    q: "Как добраться до клиники?",
    a: "Клиника расположена на улице Алихан Бокейхан, 16 в районе Есиль. Построить маршрут можно через карту в разделе «Контакты» или в 2GIS.",
  },
] as const;

export function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-mist py-20 sm:py-28">
      <div className={`${container} grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20`}>
        <SectionHeading
          id="faq-title"
          eyebrow="Вопросы и ответы"
          title="Частые вопросы"
          description="Не нашли ответ? Спросите администратора — подскажем по телефону или в мессенджере."
        />
        <div className="space-y-3">
          {faq.map(({ q, a }) => (
            <details
              key={q}
              name="faq"
              className="reveal group rounded-2xl border border-line bg-white open:shadow-soft"
            >
              <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 rounded-2xl px-5 py-3 text-left text-base font-bold text-ink sm:px-6">
                {q}
                <ChevronDown
                  className="faq-chevron size-5 shrink-0 text-teal-700 transition-transform duration-200"
                  aria-hidden="true"
                />
              </summary>
              <p className="px-5 pb-5 text-[0.9375rem] leading-relaxed sm:px-6">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
