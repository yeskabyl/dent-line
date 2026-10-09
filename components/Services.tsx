import { services } from "@/lib/services";
import { container } from "@/lib/ui";
import { SectionHeading } from "./SectionHeading";
import { ServiceBookButton } from "./ServiceBookButton";

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="bg-mist py-20 sm:py-28">
      <div className={container}>
        <SectionHeading
          id="services-title"
          eyebrow="Услуги"
          title="Направления, в которых мы помогаем"
          description="Актуальный перечень услуг и стоимость уточняйте у администратора — подскажем, с чего начать."
        />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ id, title, description, icon: Icon }) => (
            <li
              key={id}
              className="reveal group flex flex-col rounded-3xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-mist text-navy-700 transition-colors duration-300 group-hover:bg-navy-900 group-hover:text-teal-300">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-lg font-bold">{title}</h3>
              <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed">{description}</p>
              <div className="mt-5 border-t border-line pt-3">
                <ServiceBookButton serviceId={id} title={title} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
