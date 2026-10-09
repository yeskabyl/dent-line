import Image from "next/image";
import { container } from "@/lib/ui";
import { SectionHeading } from "./SectionHeading";

type Photo = {
  src: string;
  alt: string;
  tag: string;
  /** Классы сетки для бенто-раскладки */
  span: string;
  /** true — тематическое стоковое фото, не снимок клиники */
  stock: boolean;
};

/**
 * Замените файлы в /public/images настоящими фотографиями клиники и
 * поставьте stock: false — подпись о стоковых фото исчезнет автоматически.
 * Для «Зоны ожидания» подходящего фото пока нет — добавьте новый элемент.
 */
const photos: Photo[] = [
  {
    src: "/images/interior.jpg",
    alt: "Просторный светлый зал стоматологической клиники с несколькими рабочими местами",
    tag: "Интерьер",
    span: "sm:col-span-2 sm:row-span-2 aspect-[4/3] sm:aspect-auto",
    stock: true,
  },
  {
    src: "/images/cabinet-teal.jpg",
    alt: "Стоматологический кабинет с креслом и монитором",
    tag: "Стоматологический кабинет",
    span: "aspect-[4/3]",
    stock: true,
  },
  {
    src: "/images/equipment.jpg",
    alt: "Два стоматологических кресла с оборудованием у окон",
    tag: "Оборудование",
    span: "aspect-[4/3]",
    stock: true,
  },
];

export function Gallery() {
  const hasStock = photos.some((p) => p.stock);

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="py-20 sm:py-28">
      <div className={container}>
        <SectionHeading
          id="gallery-title"
          eyebrow="Галерея"
          title="Атмосфера, в которой спокойно"
          description="Светлые кабинеты и современное оснащение — так выглядит комфортная стоматология."
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-3 sm:grid-rows-2">
          {photos.map((photo) => (
            <li
              key={photo.src}
              className={`reveal group relative overflow-hidden rounded-3xl bg-mist ${photo.span}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={
                  photo.span.includes("col-span-2")
                    ? "(min-width: 1280px) 780px, (min-width: 640px) 66vw, 100vw"
                    : "(min-width: 1280px) 390px, (min-width: 640px) 33vw, 100vw"
                }
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-bold text-navy-900 backdrop-blur">
                {photo.tag}
              </span>
            </li>
          ))}
        </ul>
        {hasStock ? (
          <p className="mt-5 text-sm text-body/80">
            Фотографии иллюстративные и не являются снимками клиники Dent Line.
          </p>
        ) : null}
      </div>
    </section>
  );
}
