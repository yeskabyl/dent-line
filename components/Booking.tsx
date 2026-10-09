import { CalendarCheck, Clock, MapPin } from "lucide-react";
import { clinic, getContacts } from "@/lib/clinic";
import { container } from "@/lib/ui";
import { BookingForm } from "./BookingForm";
import { SectionHeading } from "./SectionHeading";

export function Booking() {
  const contacts = getContacts();
  const apiEnabled = Boolean(process.env.BOOKING_WEBHOOK_URL);

  return (
    <section
      id="booking"
      aria-labelledby="booking-title"
      className="relative overflow-hidden bg-navy-900 py-20 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="absolute -left-32 top-0 size-[30rem] rounded-full bg-teal-500/10 blur-3xl"
      />
      <div className={`${container} relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20`}>
        <div className="lg:pt-4">
          <SectionHeading
            id="booking-title"
            light
            eyebrow="Запись на приём"
            title="Оставьте заявку — подберём удобное время"
            description="Укажите имя и телефон. Администратор свяжется с вами, ответит на вопросы и подтвердит запись."
          />
          <ul className="mt-9 space-y-4 text-white/85">
            <li className="flex items-start gap-3">
              <Clock className="mt-0.5 size-5 shrink-0 text-teal-300" aria-hidden="true" />
              {clinic.hours.label}
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-teal-300" aria-hidden="true" />
              {clinic.addressLine}
            </li>
            <li className="flex items-start gap-3">
              <CalendarCheck className="mt-0.5 size-5 shrink-0 text-teal-300" aria-hidden="true" />
              Стоимость и план лечения администратор подскажет при записи
            </li>
          </ul>
        </div>

        <BookingForm
          apiEnabled={apiEnabled}
          whatsappNumber={contacts.whatsappNumber}
          phoneDisplay={contacts.phone?.display}
        />
      </div>
    </section>
  );
}
