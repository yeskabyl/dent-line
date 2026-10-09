"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert, CircleCheck, Info, LoaderCircle } from "lucide-react";
import {
  type BookingValues,
  bookingSchema,
  buildWhatsAppMessage,
  timeWindows,
} from "@/lib/booking";
import { SELECT_SERVICE_EVENT } from "@/lib/events";
import { services } from "@/lib/services";
import { button } from "@/lib/ui";
import { WhatsAppIcon } from "./icons";

type Props = {
  /** Подключён ли backend (BOOKING_WEBHOOK_URL) */
  apiEnabled: boolean;
  /** Официальный номер WhatsApp клиники, только цифры */
  whatsappNumber?: string;
  phoneDisplay?: string;
};

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string }
  | { kind: "notice"; message: string; whatsappUrl?: string };

const defaults: BookingValues = {
  name: "",
  phone: "",
  service: "",
  date: "",
  timeWindow: "",
  consent: false as unknown as true,
};

const field =
  "mt-2 block min-h-12 w-full rounded-xl border border-line bg-white px-4 text-base text-ink placeholder:text-body/50 transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/30 aria-[invalid=true]:border-red-500";

const errorMessages: Record<string, string> = {
  not_configured:
    "Онлайн-приём заявок пока не подключён. Свяжитесь с администратором клиники напрямую.",
  invalid: "Проверьте введённые данные и попробуйте ещё раз.",
};

export function BookingForm({ apiEnabled, whatsappNumber, phoneDisplay }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<BookingValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: defaults,
    mode: "onTouched",
  });
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const busy = useRef(false);
  const honeypot = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onSelect = (event: Event) => {
      const id = (event as CustomEvent<string>).detail;
      setValue("service", id, { shouldDirty: true });
    };
    window.addEventListener(SELECT_SERVICE_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_SERVICE_EVENT, onSelect);
  }, [setValue]);

  const submitting = status.kind === "submitting";

  async function sendToApi(values: BookingValues) {
    if (busy.current) return;
    busy.current = true;
    setStatus({ kind: "submitting" });
    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, company: honeypot.current?.value ?? "" }),
      });
      const data = (await response.json().catch(() => null)) as {
        ok?: boolean;
        code?: string;
      } | null;
      if (response.ok && data?.ok === true) {
        reset(defaults);
        setStatus({ kind: "success" });
      } else {
        setStatus({
          kind: "error",
          message:
            (data?.code && errorMessages[data.code]) ||
            "Не удалось отправить заявку. Попробуйте ещё раз или свяжитесь с клиникой.",
        });
      }
    } catch {
      setStatus({
        kind: "error",
        message: "Нет соединения с сервером. Проверьте интернет и попробуйте ещё раз.",
      });
    } finally {
      busy.current = false;
    }
  }

  function openWhatsApp(values: BookingValues) {
    if (!whatsappNumber) return;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(buildWhatsAppMessage(values))}`;
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    setStatus(
      opened
        ? {
            kind: "notice",
            message:
              "Сообщение подготовлено в WhatsApp. Заявка будет отправлена, когда вы нажмёте «Отправить» в мессенджере.",
          }
        : {
            kind: "notice",
            message: "Браузер заблокировал открытие WhatsApp. Нажмите на ссылку ниже.",
            whatsappUrl: url,
          },
    );
  }

  function noBackend() {
    setStatus({
      kind: "notice",
      message: phoneDisplay
        ? `Приём заявок через сайт ещё не подключён. Позвоните нам: ${phoneDisplay}.`
        : "Приём заявок через сайт ещё не подключён. Свяжитесь с администратором клиники напрямую.",
    });
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    void handleSubmit((values) => {
      if (apiEnabled) return sendToApi(values);
      if (whatsappNumber) return openWhatsApp(values);
      return noBackend();
    })(event);
  }

  function onWhatsApp() {
    void handleSubmit((values) => openWhatsApp(values))();
  }

  if (status.kind === "success") {
    return (
      <div role="status" className="rounded-3xl bg-white p-8 text-center shadow-lift sm:p-10">
        <CircleCheck className="mx-auto size-12 text-teal-700" aria-hidden="true" />
        <h3 className="mt-5 font-display text-2xl font-medium">Заявка отправлена</h3>
        <p className="mt-3 text-body">
          Администратор свяжется с вами по указанному номеру, чтобы подтвердить время приёма.
        </p>
        <button type="button" className={`${button.outline} mt-7`} onClick={() => setStatus({ kind: "idle" })}>
          Отправить ещё одну заявку
        </button>
      </div>
    );
  }

  const primaryLabel = apiEnabled || !whatsappNumber ? "Отправить заявку" : "Продолжить в WhatsApp";
  const demo = !apiEnabled && !whatsappNumber;

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      aria-busy={submitting}
      className="rounded-3xl bg-white p-6 shadow-lift sm:p-9"
    >
      {demo ? (
        <p className="mb-6 flex gap-2.5 rounded-xl bg-mist p-3.5 text-sm leading-snug text-navy-800">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          Демонстрационный режим: приём заявок пока не подключён, форма только проверяет данные.
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="b-name" className="text-sm font-bold text-ink">
            Имя
          </label>
          <input
            id="b-name"
            type="text"
            autoComplete="given-name"
            placeholder="Как к вам обращаться"
            className={field}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "b-name-err" : undefined}
            {...register("name")}
          />
          <FieldError id="b-name-err" message={errors.name?.message} />
        </div>

        <div>
          <label htmlFor="b-phone" className="text-sm font-bold text-ink">
            Телефон
          </label>
          <input
            id="b-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+7 701 123 45 67"
            className={field}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "b-phone-err" : undefined}
            {...register("phone")}
          />
          <FieldError id="b-phone-err" message={errors.phone?.message} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="b-service" className="text-sm font-bold text-ink">
            Интересующая услуга <span className="font-medium text-body">· необязательно</span>
          </label>
          <select
            id="b-service"
            className={field}
            aria-invalid={Boolean(errors.service)}
            {...register("service")}
          >
            <option value="">Не выбрано — подскажет администратор</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="b-date" className="text-sm font-bold text-ink">
            Удобная дата <span className="font-medium text-body">· необязательно</span>
          </label>
          <input
            id="b-date"
            type="date"
            className={field}
            aria-invalid={Boolean(errors.date)}
            {...register("date")}
          />
        </div>

        <div>
          <label htmlFor="b-time" className="text-sm font-bold text-ink">
            Удобное время <span className="font-medium text-body">· необязательно</span>
          </label>
          <select id="b-time" className={field} {...register("timeWindow")}>
            <option value="">Любое</option>
            {timeWindows.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Ловушка для ботов: скрыта от пользователей и скринридеров */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Компания
          <input ref={honeypot} type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-6">
        <label className="flex cursor-pointer items-start gap-3 text-sm leading-snug">
          <input
            type="checkbox"
            className="mt-0.5 size-5 shrink-0 cursor-pointer accent-navy-900"
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? "b-consent-err" : undefined}
            {...register("consent")}
          />
          <span>
            Я согласен(на) на обработку моих персональных данных в соответствии с{" "}
            <Link href="/privacy" className="font-semibold text-navy-700 underline underline-offset-2">
              Политикой конфиденциальности
            </Link>
            .
          </span>
        </label>
        <FieldError id="b-consent-err" message={errors.consent?.message} />
      </div>

      <p className="mt-4 text-xs leading-relaxed text-body/80">
        Пожалуйста, не указывайте диагнозы и сведения о состоянии здоровья — всё это вы
        обсудите с врачом на приёме.
      </p>

      <div aria-live="polite" className="empty:hidden">
        {status.kind === "error" ? (
          <p className="mt-5 flex gap-2.5 rounded-xl bg-red-50 p-3.5 text-sm leading-snug text-red-800">
            <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {status.message}
          </p>
        ) : null}
        {status.kind === "notice" ? (
          <p className="mt-5 flex gap-2.5 rounded-xl bg-mist p-3.5 text-sm leading-snug text-navy-800">
            <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            <span>
              {status.message}
              {status.whatsappUrl ? (
                <>
                  {" "}
                  <a
                    href={status.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold underline underline-offset-2"
                  >
                    Открыть WhatsApp
                  </a>
                </>
              ) : null}
            </span>
          </p>
        ) : null}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button type="submit" disabled={submitting} className={`${button.primary} sm:flex-1`}>
          {submitting ? (
            <>
              <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />
              Отправляем…
            </>
          ) : (
            <>
              {!apiEnabled && whatsappNumber ? (
                <WhatsAppIcon className="size-5" />
              ) : null}
              {primaryLabel}
            </>
          )}
        </button>
        {apiEnabled && whatsappNumber ? (
          <button
            type="button"
            onClick={onWhatsApp}
            disabled={submitting}
            className={`${button.outline} sm:flex-1`}
          >
            <WhatsAppIcon className="size-5" />
            Написать в WhatsApp
          </button>
        ) : null}
      </div>
    </form>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm font-medium text-red-700">
      {message}
    </p>
  );
}
