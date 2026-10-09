import { bookingSchema, normalizePhone } from "@/lib/booking";
import { services } from "@/lib/services";

const MAX_BODY = 4_000;

function json(status: number, body: Record<string, unknown>) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

/**
 * Приём заявки. Заявка считается принятой только после успешного ответа
 * внешнего сервиса (BOOKING_WEBHOOK_URL: CRM, Google Apps Script, n8n и т.п.).
 * Без настроенного webhook маршрут честно отвечает 503 и ничего не «имитирует».
 * Персональные данные не логируются.
 */
export async function POST(request: Request) {
  const webhook = process.env.BOOKING_WEBHOOK_URL;
  if (!webhook) {
    return json(503, { ok: false, code: "not_configured" });
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY) return json(413, { ok: false, code: "too_large" });

  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return json(400, { ok: false, code: "bad_json" });
  }

  // Ловушка для ботов: настоящий пользователь это поле не видит и не заполняет.
  if (
    typeof payload === "object" &&
    payload !== null &&
    "company" in payload &&
    payload.company
  ) {
    return json(200, { ok: true });
  }

  const parsed = bookingSchema.safeParse(payload);
  if (!parsed.success) return json(400, { ok: false, code: "invalid" });

  const { name, phone, service, date, timeWindow } = parsed.data;

  try {
    const upstream = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        phone: `+${normalizePhone(phone)}`,
        service: services.find((s) => s.id === service)?.title ?? null,
        date: date || null,
        timeWindow: timeWindow || null,
        source: "dentline-website",
        consent: true,
        createdAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(8_000),
      cache: "no-store",
    });
    if (!upstream.ok) return json(502, { ok: false, code: "upstream_error" });
    return json(200, { ok: true });
  } catch {
    return json(502, { ok: false, code: "upstream_unreachable" });
  }
}
