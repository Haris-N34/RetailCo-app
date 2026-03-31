import { X } from 'lucide-react'
import { formatPrice } from '../lib/utils'
import type { Product } from '../types'

export function ProductModal({
  product,
  onClose,
  onAddToCart,
}: {
  product: Product | null
  onClose: () => void
  onAddToCart: () => void
}) {
  if (!product) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-[rgba(44,56,61,0.44)] p-4 backdrop-blur-md sm:items-center">
      <div className="glass-panel w-full max-w-4xl overflow-hidden rounded-[32px] border border-white/70 bg-[color:var(--color-paper)]">
        <div className="grid gap-0 sm:grid-cols-[1.05fr,0.95fr]">
          <div className="relative min-h-[300px]">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
            <button
              onClick={onClose}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/85 text-[color:var(--color-ink)] shadow-sm"
            >
              <X size={18} />
            </button>
          </div>
          <div className="space-y-5 p-6 sm:p-8">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--color-gold)]">{product.collection}</p>
              <h3 className="mt-3 font-display text-4xl leading-none text-[color:var(--color-ink)]">
                {product.name}
              </h3>
              <p className="mt-4 text-base leading-7 text-[color:var(--color-ink-soft)]">{product.description}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.materials.map((item) => (
                <span key={item} className="rounded-full bg-white/80 px-3 py-1 text-sm text-[color:var(--color-ink-soft)]">
                  {item}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 rounded-[24px] border border-white/70 bg-white/60 p-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--color-ink-soft)]">Price</p>
                <p className="mt-2 text-xl font-semibold text-[color:var(--color-ink)]">{formatPrice(product.price)}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--color-ink-soft)]">Sizes</p>
                <p className="mt-2 text-sm text-[color:var(--color-ink)]">{product.sizes.join(' • ')}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={onAddToCart}
                className="btn-primary flex-1 px-5 py-3.5 text-sm font-semibold"
              >
                Add to Bag
              </button>
              <button
                onClick={onClose}
                className="btn-secondary px-5 py-3.5 text-sm font-semibold"
              >
                Back to Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
