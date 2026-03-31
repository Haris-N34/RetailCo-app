export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}: {
  eyebrow: string
  title: string
  description: string
  centered?: boolean
}) {
  return (
    <div className={`mb-6 space-y-3 sm:mb-8 ${centered ? 'text-center' : ''}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.38em] text-[color:var(--color-gold)]">
        {eyebrow}
      </p>
      <div className={`space-y-3 ${centered ? 'mx-auto max-w-3xl' : 'max-w-2xl'}`}>
        <h2 className="font-display text-4xl leading-none text-[color:var(--color-ink)] sm:text-5xl">
          {title}
        </h2>
        <p className={`text-sm leading-6 text-[color:var(--color-ink-soft)] sm:text-base ${centered ? 'mx-auto max-w-2xl' : 'max-w-xl'}`}>
          {description}
        </p>
      </div>
    </div>
  )
}
