type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  light?: boolean;
  id?: string;
};

export function SectionHeading({ eyebrow, title, description, light, id }: Props) {
  return (
    <div className="reveal max-w-2xl">
      <p
        className={`text-xs font-bold uppercase tracking-[0.2em] ${light ? "text-teal-300" : "text-teal-700"}`}
      >
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`mt-3 font-display text-[2rem] font-medium leading-[1.1] tracking-tight sm:text-5xl ${light ? "!text-white" : ""}`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${light ? "text-white/75" : "text-body"}`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
