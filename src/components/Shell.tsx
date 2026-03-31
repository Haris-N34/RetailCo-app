import type { ReactNode } from 'react'
import { Search, ShoppingBag, Sparkles } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { cn } from '../lib/utils'
import { useRetailStore } from '../store/useRetailStore'

export function Shell({ children }: { children: ReactNode }) {
  const location = useLocation()
  const cartCount = useRetailStore((state) => state.cartCount)

  return (
    <div className="mx-auto min-h-screen max-w-[1500px] px-4 pb-28 pt-4 sm:px-6 lg:px-8">
      <div className="glass-panel relative overflow-hidden rounded-[32px] border border-white/70">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.86),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(155,178,178,0.16),transparent_30%)]" />
        <header className="sticky top-0 z-40 border-b border-[color:var(--color-line)] bg-[rgba(248,244,237,0.68)] px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-3">
              <div>
                <p className="font-display text-3xl leading-none tracking-[0.18em] text-[color:var(--color-ink)]">
                  RetailCo
                </p>
                <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--color-ink-soft)]">
                  Personalized Retail
                </p>
              </div>
            </Link>

            <nav className="hidden items-center gap-2 rounded-full border border-white/70 bg-[rgba(255,251,245,0.72)] p-1.5 lg:flex">
              {[
                ['/', 'Home'],
                ['/shop', 'Shop'],
                ['/for-you', 'For You'],
              ].map(([to, label]) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    cn(
                      'rounded-full px-4 py-2 text-sm font-medium transition',
                      isActive
                        ? 'border border-[rgba(41,54,58,0.08)] bg-[rgba(216,184,171,0.58)] text-[color:var(--color-ink)] shadow-sm'
                        : 'text-[color:var(--color-ink-soft)] hover:bg-[rgba(255,255,255,0.82)] hover:text-[color:var(--color-ink)]',
                    )
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <button className="btn-secondary hidden h-11 w-11 sm:flex">
                <Search size={18} />
              </button>
              <Link
                to={location.pathname === '/for-you' ? '/auth' : '/for-you'}
                className="btn-secondary h-11 px-4 text-sm font-semibold"
              >
                <Sparkles size={16} />
                <span className="hidden sm:inline">View Recommendations</span>
              </Link>
              <button className="btn-primary relative h-11 w-11">
                <ShoppingBag size={18} />
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[color:var(--color-gold)] text-[10px] font-bold text-[color:var(--color-ink)]">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>
        </header>

        <main>{children}</main>
      </div>
    </div>
  )
}
