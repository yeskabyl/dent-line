import { Armchair, CalendarCheck, Clock, HeartHandshake } from "lucide-react";
import { clinic } from "@/lib/clinic";
import { container } from "@/lib/ui";

const items = [
  {
    icon: Clock,
    title: "Удобный график",
    text: `Принимаем ежедневно с ${clinic.hours.opens} до ${clinic.hours.closes} — можно выбрать время после работы.`,
  },
  {
    icon: Armchair,
    title: "Комфортная обстановка",
    text: "Спокойная атмосфера и современные кабинеты, в которых удобно находиться.",
  },
  {
    icon: HeartHandshake,
    title: "Индивидуальный подход",
    text: "Объясняем, что и зачем делаем, и предлагаем план лечения под вашу ситуацию.",
  },
  {
    icon: CalendarCheck,
    title: "Удобная запись",
    text: "Оставьте заявку на сайте или свяжитесь с администратором — подберём время.",
  },
] as const;

export function Advantages() {
  return (
    <section aria-label="Преимущества клиники" className="py-16 sm:py-20">
      <div className={container}>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, text }) => (
            <li
              key={title}
              className="reveal rounded-3xl border border-line bg-cloud p-6 transition-shadow duration-300 hover:shadow-soft"
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-navy-900 text-teal-300">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
