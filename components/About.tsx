import Image from "next/image";
import { ClipboardList, MessagesSquare, ScanLine } from "lucide-react";
import { button, container } from "@/lib/ui";
import { SectionHeading } from "./SectionHeading";

const steps = [
  {
    icon: ScanLine,
    title: "Диагностика",
    text: "Начинаем с осмотра и диагностики: лечение строится на понимании, что происходит с зубами.",
  },
  {
    icon: ClipboardList,
    title: "Индивидуальный план",
    text: "Составляем план лечения под вашу ситуацию и обсуждаем возможные варианты.",
  },
  {
    icon: MessagesSquare,
    title: "Понятные объяснения",
    text: "Рассказываем простым языком, что будет происходить на каждом этапе и зачем.",
  },
] as const;

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-20 sm:py-28">
      <div className={`${container} grid items-center gap-14 lg:grid-cols-2 lg:gap-20`}>
        <div className="reveal relative grid grid-cols-5 gap-4">
          <div className="relative col-span-3 aspect-[3/4] overflow-hidden rounded-3xl bg-mist">
            <Image
              src="/images/diagnostics.jpg"
              alt="Врач изучает снимки зубов на просмотровом экране"
              fill
              sizes="(min-width: 1024px) 28vw, 55vw"
              className="object-cover"
            />
          </div>
          <div className="relative col-span-2 mt-12 aspect-[2/3] overflow-hidden rounded-3xl bg-mist">
            <Image
              src="/images/cabinet-warm.jpg"
              alt="Светлый стоматологический кабинет с креслом"
              fill
              sizes="(min-width: 1024px) 20vw, 38vw"
              className="object-cover"
            />
          </div>
          <p className="col-span-5 text-xs text-body/80">
            Иллюстративные фотографии. Не являются снимками клиники Dent Line.
          </p>
        </div>

        <div>
          <SectionHeading
            id="about-title"
            eyebrow="О клинике"
            title="Лечение, в котором вам всё понятно"
            description="В Dent Line Astana мы придаём значение тому, чтобы пациент понимал, что с ним происходит и что будет дальше."
          />
          <ul className="mt-9 space-y-6">
            {steps.map(({ icon: Icon, title, text }) => (
              <li key={title} className="reveal flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-mist text-navy-700">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-bold">{title}</h3>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed">{text}</p>
                </div>
              </li>
            ))}
          </ul>
          <a href="#contacts" className={`${button.primary} mt-10`}>
            Связаться с нами
          </a>
        </div>
      </div>
    </section>
  );
}
