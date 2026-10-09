import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { clinic, getContacts } from "@/lib/clinic";
import { Logo } from "@/components/icons";
import { container } from "@/lib/ui";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description: "Как Dent Line Astana обрабатывает персональные данные, оставленные на сайте.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  const { phone } = getContacts();

  return (
    <>
      <header className="border-b border-line">
        <div className={`${container} flex h-[4.5rem] items-center justify-between`}>
          <Link href="/" aria-label="Dent Line Astana — на главную">
            <Logo />
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-navy-900"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            На главную
          </Link>
        </div>
      </header>

      <main id="main" className={`${container} max-w-3xl py-14 sm:py-20`}>
        <h1 className="font-display text-4xl font-medium leading-tight sm:text-5xl">
          Политика конфиденциальности
        </h1>

        <p className="mt-6 rounded-2xl bg-mist p-4 text-sm leading-relaxed text-navy-800">
          Это рабочий шаблон. Перед запуском сайта клиника должна заменить текст на
          официальную политику, согласованную с юристом, в соответствии с законодательством
          Республики Казахстан о персональных данных.
        </p>

        <div className="mt-10 space-y-8 leading-relaxed [&_h2]:mb-3 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-medium">
          <section>
            <h2>Кто обрабатывает данные</h2>
            <p>
              Оператором персональных данных, оставленных на этом сайте, является {clinic.name}
              {" "}({clinic.street}, {clinic.city}).
              {phone ? ` Телефон: ${phone.display}.` : ""} По вопросам обработки данных
              обращайтесь к администратору клиники.
            </p>
          </section>

          <section id="data">
            <h2>Какие данные мы собираем</h2>
            <p>
              Через форму записи мы получаем только то, что вы указали сами: имя, номер телефона,
              выбранную услугу и удобные дату и время. Мы просим не указывать диагнозы и сведения
              о состоянии здоровья — их обсуждает врач на приёме.
            </p>
          </section>

          <section>
            <h2>Зачем нужны данные</h2>
            <p>
              Данные используются только для того, чтобы связаться с вами, подтвердить запись и
              ответить на вопросы о приёме.
            </p>
          </section>

          <section>
            <h2>Передача третьим лицам</h2>
            <p>
              Данные передаются только сервису приёма заявок клиники и, если вы выбрали отправку
              через WhatsApp, — мессенджеру WhatsApp по вашему собственному действию. Карта
              загружается со стороннего сервиса только после вашего нажатия на кнопку «Показать
              карту».
            </p>
          </section>

          <section>
            <h2>Ваши права</h2>
            <p>
              Вы можете запросить информацию о ваших данных, их изменение или удаление, а также
              отозвать согласие, обратившись в клинику.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
