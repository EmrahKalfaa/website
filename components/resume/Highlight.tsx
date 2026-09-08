export function Highlight({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <blockquote className="max-w-3xl">
      <p className="text-2xl font-medium tracking-tight text-ink md:text-[2rem] md:leading-snug">
        {title}
      </p>
      <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
        {body}
      </p>
    </blockquote>
  );
}
