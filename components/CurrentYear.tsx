"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};
// На сервере и при гидратации — год сборки; затем подменяется актуальным годом клиента.
const FALLBACK_YEAR = 2026;

export function CurrentYear() {
  const year = useSyncExternalStore(
    noopSubscribe,
    () => new Date().getFullYear(),
    () => FALLBACK_YEAR,
  );
  return <>{year}</>;
}
