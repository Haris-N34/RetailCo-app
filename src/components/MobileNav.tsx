import { Home, Search, Sparkles, UserRound } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { cn } from '../lib/utils'

const items = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/shop', label: 'Shop', icon: Search },
  { to: '/for-you', label: 'For You', icon: Sparkles },
  { to: '/auth', label: 'Account', icon: UserRound },
]

export function MobileNav() {
  return (
    <nav className="fixed inset-x-0 bottom-4 z-50 mx-auto flex max-w-md items-center justify-between rounded-full border border-white/70 bg-[rgba(61,80,84,0.88)] px-3 py-2 text-white shadow-[0_18px_50px_rgba(61,75,80,0.28)] backdrop-blur-xl lg:hidden">
      {items.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            cn(
              'flex min-w-[72px] flex-col items-center gap-1 rounded-full px-3 py-2 text-[11px] font-medium transition',
              isActive ? 'bg-[color:var(--color-gold-soft)] text-[color:var(--color-ink)] shadow-sm' : 'text-white/68',
            )
          }
        >
          <Icon size={18} />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
