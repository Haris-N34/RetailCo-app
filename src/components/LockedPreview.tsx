import { Link } from 'react-router-dom'

export function LockedPreview() {
  return (
    <section className="relative overflow-hidden rounded-[32px] border border-white/70 bg-[linear-gradient(180deg,#44585d,#33464b_56%,#766159)] p-6 text-white shadow-[0_30px_90px_rgba(61,75,80,0.22)] sm:p-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(216,184,171,0.28),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(199,215,214,0.16),transparent_32%)]" />
      <div className="relative grid gap-6 lg:grid-cols-[0.92fr,1.08fr]">
        <div className="space-y-5">
          <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--color-gold-soft)]">Personalized access</p>
          <h2 className="font-display text-[2rem] leading-[0.95] sm:text-5xl">Unlock a shopping feed designed around how you browse.</h2>
          <p className="max-w-md text-sm leading-7 text-white/72">
            Sign in to see recommendations based on your preferences, recent activity, saved sizes, and loyalty status across RetailCo.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/auth"
              className="btn-primary px-5 py-3 text-sm font-semibold"
            >
              Unlock Personalized Picks
            </Link>
            <Link
              to="/auth"
              className="btn-dark-secondary px-5 py-3 text-sm font-semibold"
            >
              See What Unlocks
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {['Recommended for your style profile', 'Restock alerts in your saved sizes', 'Offers aligned to your budget range', 'Weekly edits built from recent activity'].map((item, index) => (
            <div
              key={item}
              className="rounded-[24px] border border-white/10 bg-white/8 p-5 backdrop-blur-lg"
              style={{ filter: `blur(${index % 2 === 0 ? 4 : 6}px)` }}
            >
              <p className="text-xs uppercase tracking-[0.28em] text-white/45">Locked Preview</p>
              <p className="mt-4 text-lg font-medium text-white/72">{item}</p>
              <div className="mt-6 h-24 rounded-[18px] bg-white/10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
