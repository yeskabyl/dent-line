import {
  Baby,
  Drill,
  Hammer,
  type LucideIcon,
  Smile,
  Sparkles,
  Stethoscope,
  Sun,
  Wrench,
} from "lucide-react";

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

/**
 * ПРЕДВАРИТЕЛЬНЫЙ список услуг — требует подтверждения клиникой.
 * Цены намеренно не указаны: добавлять только из официального прайс-листа.
 */
export const services: Service[] = [
  {
    id: "treatment",
    title: "Лечение зубов",
    description:
      "Осмотр, диагностика и лечение с понятным планом: что делаем и зачем.",
    icon: Stethoscope,
  },
  {
    id: "hygiene",
    title: "Профессиональная гигиена",
    description:
      "Профессиональная чистка и рекомендации по ежедневному уходу за полостью рта.",
    icon: Sparkles,
  },
  {
    id: "whitening",
    title: "Отбеливание зубов",
    description:
      "Консультация о том, подходит ли отбеливание вам и какой метод выбрать.",
    icon: Sun,
  },
  {
    id: "orthodontics",
    title: "Ортодонтия",
    description:
      "Консультация по исправлению прикуса и выравниванию зубов.",
    icon: Smile,
  },
  {
    id: "implants",
    title: "Имплантация",
    description:
      "Консультация по восстановлению отсутствующих зубов и вариантам лечения.",
    icon: Drill,
  },
  {
    id: "prosthetics",
    title: "Протезирование",
    description:
      "Подбор решения для восстановления формы и функции зубов.",
    icon: Hammer,
  },
  {
    id: "extraction",
    title: "Удаление зубов",
    description:
      "Консультация и определение показаний, обсуждение дальнейшего восстановления.",
    icon: Wrench,
  },
  {
    id: "pediatric",
    title: "Детская стоматология",
    description:
      "Помощь в заботе о здоровье зубов у детей и профилактические осмотры.",
    icon: Baby,
  },
];
