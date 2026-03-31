import { Heart, Plus } from 'lucide-react'
import { cn, formatPrice } from '../lib/utils'
import type { Product } from '../types'

export function ProductCard({
  product,
  favorite,
  onFavorite,
  onQuickView,
}: {
  product: Product
  favorite: boolean
  onFavorite: () => void
  onQuickView: () => void
}) {
  return (
    <article className="group relative overflow-hidden rounded-[28px] border border-white/75 bg-[linear-gradient(180deg,rgba(255,249,242,0.82),rgba(232,222,212,0.82))] p-3 shadow-[0_18px_50px_rgba(61,75,80,0.08)] backdrop-blur-xl transition duration-500 hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(61,75,80,0.12)]">
      <div className="relative overflow-hidden rounded-[24px] bg-[linear-gradient(135deg,#edf1ee,#eadfd3_48%,#dbc1b3)]">
        {product.badge ? (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-[rgba(56,73,77,0.78)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-white">
            {product.badge}
          </span>
        ) : null}

        <button
          aria-label="Save item"
          onClick={onFavorite}
          className={cn(
            'absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/70 backdrop-blur-xl transition hover:scale-[1.03]',
            favorite ? 'bg-[linear-gradient(180deg,rgba(74,95,100,0.98),rgba(53,71,75,0.96))] text-white' : 'bg-[rgba(255,250,245,0.7)] text-[color:var(--color-ink)]',
          )}
        >
          <Heart size={16} className={favorite ? 'fill-current' : ''} />
        </button>

        <img
          src={product.image}
          alt={product.name}
          className="h-72 w-full object-cover transition duration-700 group-hover:scale-[1.04]"
        />

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(41,54,58,0.12)_100%)] opacity-0 transition group-hover:opacity-100" />
      </div>

      <div className="space-y-4 p-3 pb-2 pt-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--color-ink-soft)]">
              {product.collection}
            </p>
            <h3 className="mt-2 text-lg font-semibold text-[color:var(--color-ink)]">{product.name}</h3>
          </div>
          <p className="text-sm font-semibold text-[color:var(--color-ink)]">{formatPrice(product.price)}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {product.styleTags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[color:var(--color-line)] bg-[linear-gradient(180deg,rgba(247,240,232,0.94),rgba(235,225,214,0.88))] px-3 py-1 text-[11px] font-medium text-[color:var(--color-ink-soft)]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3 text-sm text-[color:var(--color-ink-soft)]">
          <p>{product.inventory > 10 ? 'Available online and in select stores' : `${product.inventory} left in matching sizes`}</p>
          <button
            onClick={onQuickView}
            className="btn-primary px-4 py-2 text-sm font-semibold"
          >
            <Plus size={15} />
            View Details
          </button>
        </div>
      </div>
    </article>
  )
}
