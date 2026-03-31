import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { ArrowRight, Lock } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { LockedPreview } from '../components/LockedPreview'
import { ProductModal } from '../components/ProductModal'
import { SectionHeading } from '../components/SectionHeading'
import { products } from '../data/catalog'
import { formatPrice } from '../lib/utils'
import { useRetailStore } from '../store/useRetailStore'
import type { Product } from '../types'

const HeroScene = lazy(async () => {
  const module = await import('../components/HeroScene')
  return { default: module.HeroScene }
})

export function HomePage() {
  const viewProduct = useRetailStore((state) => state.viewProduct)
  const addToCart = useRetailStore((state) => state.addToCart)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const featured = useMemo(() => products.filter((product) => product.featured).slice(0, 4), [])
  const trending = useMemo(() => products.filter((product) => product.trending).slice(0, 3), [])
  const recommended = useMemo(() => [products[0], products[7], products[10]], [])
  const lifestyleSets = useMemo(
    () => [
      {
        products: [products[0], products[2], products[6]],
        labels: [
          ['New Arrivals', 'Quiet Texture'],
          ['Spring Essentials', 'Soft Layers', 'Edited for slower browsing'],
          ['How To Style', 'Silky Volume'],
        ],
      },
      {
        products: [
          {
            id: 'mens-model-1',
            name: 'Menswear Editorial',
            image:
              'https://images.unsplash.com/photo-1750390200293-92d5a788d3a2?auto=format&fit=crop&w=1200&q=80',
          },
          {
            id: 'mens-model-2',
            name: 'Tailored Menswear',
            image:
              'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
          },
          {
            id: 'mens-model-3',
            name: 'Menswear Rack',
            image:
              'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80',
          },
        ],
        labels: [
          ['Menswear Edit', 'Refined Utility'],
          ['Tailored Layers', 'Modern Ease', 'Built for work, travel, and weekends'],
          ['New Season', 'Sharp Essentials'],
        ],
      },
      {
        products: [products[0], products[7], products[10]],
        labels: [
          ['New Arrivals', 'Clean Structure'],
          ['Accessories Focus', 'Soft Function', 'Editorial pieces with everyday pull'],
          ['How To Style', 'Quiet Polish'],
        ],
      },
    ],
    [],
  )
  const [lifestyleIndex, setLifestyleIndex] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setLifestyleIndex((current) => (current + 1) % lifestyleSets.length)
    }, 4500)

    return () => window.clearInterval(interval)
  }, [lifestyleSets.length])

  const lifestyle = lifestyleSets[lifestyleIndex]

  return (
    <>
      <section className="px-4 pb-12 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-10">
          <div className="space-y-6">
            <div className="space-y-6 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(155,178,178,0.24)] bg-[linear-gradient(180deg,rgba(255,249,242,0.88),rgba(234,226,216,0.8))] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-ink-soft)] shadow-[0_10px_24px_rgba(61,75,80,0.06)]">
                RetailCo
              </div>
              <div className="space-y-4">
                <h1 className="mx-auto max-w-5xl font-display text-[3.8rem] leading-[0.9] tracking-[-0.05em] text-[color:var(--color-ink)] sm:text-[5.8rem]">
                  Find what works for YOU.
                </h1>
                <p className="mx-auto max-w-2xl text-base leading-8 text-[color:var(--color-ink-soft)] sm:text-lg">
                  Discover seasonal collections, editorial styling, and subtle personalization woven into a premium retail experience.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/shop" className="btn-primary px-6 py-3.5 text-sm font-semibold">
                  Shop Now
                </Link>
                <Link to="/for-you" className="btn-secondary px-6 py-3.5 text-sm font-semibold">
                  Explore For You
                </Link>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[34px] bg-[linear-gradient(180deg,#f4ecdf,#eadfce)] p-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={lifestyleIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: 'easeInOut' }}
                  className="grid gap-2 sm:grid-cols-3"
                >
                  {lifestyle.products.map((product, index) => (
                    <div
                      key={product.id}
                      className="relative overflow-hidden"
                    >
                      <img src={product.image} alt={product.name} className="h-[360px] w-full object-cover sm:h-[620px]" />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_42%,rgba(41,54,58,0.36)_100%)]" />
                      {index === 1 ? (
                        <div className="absolute inset-x-8 bottom-10 text-center text-white">
                          <p className="text-xs uppercase tracking-[0.34em] text-white/72">{lifestyle.labels[index][0]}</p>
                          <p className="mt-3 font-display text-[3.7rem] leading-[0.9] sm:text-[5.8rem]">
                            {lifestyle.labels[index][1]}
                          </p>
                          <p className="mt-3 text-sm uppercase tracking-[0.28em] text-white/70">{lifestyle.labels[index][2]}</p>
                        </div>
                      ) : (
                        <div className="absolute inset-x-6 bottom-8 text-white">
                          <p className="text-xs uppercase tracking-[0.28em] text-white/72">{lifestyle.labels[index][0]}</p>
                          <p className="mt-2 font-display text-4xl leading-none">{lifestyle.labels[index][1]}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="grid gap-6 px-2 md:grid-cols-3">
              {[
                ['New Arrivals', 'Fresh silhouettes and lighter layers for the week ahead.'],
                ['Inspired by Your Style', 'Subtle recommendations appear where they feel useful, not loud.'],
                ['Trending Now', 'Pieces customers are saving, revisiting, and styling first.'],
              ].map(([title, label]) => (
                <div key={title} className="rounded-[26px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,250,244,0.78),rgba(235,226,216,0.78))] p-5 text-center shadow-[0_16px_40px_rgba(61,75,80,0.05)] md:text-left">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[color:var(--color-gold)]">{title}</p>
                  <p className="mx-auto max-w-xs text-sm leading-7 text-[color:var(--color-ink-soft)] md:mx-0">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-14 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-5">
          <SectionHeading
            eyebrow="Seasonal Edit"
            title="A softer look at fit, form, and the season ahead."
            description="Fit, form, and fabric brought into a cleaner seasonal focus."
            centered
          />
          <div className="pb-12 sm:pb-16">
            <Suspense
            fallback={
              <div className="h-[70vh] rounded-[32px] border border-white/70 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.96),rgba(240,232,223,0.92)_40%,rgba(185,205,204,0.32)_100%)]" />
            }
          >
              <HeroScene />
            </Suspense>
          </div>
        </div>
      </section>

      <section className="mt-40 px-4 pt-14 pb-14 sm:mt-44 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="grid gap-6 lg:grid-cols-[1.15fr,0.85fr] lg:items-center">
            <div className="relative overflow-hidden rounded-[34px] border border-[rgba(155,178,178,0.18)] shadow-[0_24px_70px_rgba(61,75,80,0.08)]">
              <img
                src={featured[0].image}
                alt={featured[0].name}
                className="h-[520px] w-full object-cover sepia-[0.58] saturate-[0.52] brightness-[0.8] contrast-[0.92]"
              />
              <div className="absolute inset-0 bg-[rgba(108,84,62,0.34)] mix-blend-multiply" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(214,192,166,0.18),rgba(88,66,48,0.26))]" />
            </div>
            <div className="space-y-6 rounded-[32px] bg-[linear-gradient(180deg,rgba(255,248,241,0.82),rgba(232,222,212,0.78))] p-8 shadow-[0_20px_50px_rgba(61,75,80,0.06)]">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[color:var(--color-gold)]">New Arrivals</p>
              <h2 className="font-display text-5xl leading-none text-[color:var(--color-ink)]">
                Pieces for lighter days and easier dressing.
              </h2>
              <p className="max-w-md text-sm leading-8 text-[color:var(--color-ink-soft)]">
                A calmer edit of knits, tailored separates, and polished accessories selected to feel effortless on first glance.
              </p>
              <Link to="/shop" className="btn-secondary px-5 py-3 text-sm font-semibold">
                View Collection <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <EditorialTile
              image={featured[1].image}
              eyebrow="Spring Essentials"
              title="Fresh structure, quieter color, and pieces that travel well."
              cta="View Collection"
              to="/shop"
            />
            <EditorialTile
              image={featured[3].image}
              eyebrow="Trending Now"
              title="Accessories and soft tailoring customers keep coming back to."
              cta="Shop Now"
              to="/shop"
            />
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <SectionHeading
            eyebrow="Editors' Picks"
            title="A refined edit from across the collection."
            description="Seasonal pieces with strong shape, texture, and everyday versatility."
          />
          <div className="grid gap-8 md:grid-cols-3">
            {recommended.map((product) => (
              <MinimalProductTile
                key={product.id}
                product={product}
                onClick={() => {
                  viewProduct(product.id)
                  setSelectedProduct(product)
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.92fr,1.08fr] lg:items-end">
          <div className="space-y-5 rounded-[32px] bg-[linear-gradient(180deg,rgba(232,224,214,0.72),rgba(255,248,241,0.56))] p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[color:var(--color-gold)]">This Week's Picks</p>
            <h2 className="font-display text-5xl leading-none text-[color:var(--color-ink)]">
              A quieter edit of what customers are reaching for now.
            </h2>
            <p className="max-w-md text-sm leading-8 text-[color:var(--color-ink-soft)]">
              Discovery should feel intuitive. This row keeps the momentum of a real retail homepage without turning the experience into a dense grid.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {trending.map((product) => (
              <MinimalProductTile
                key={product.id}
                product={product}
                onClick={() => {
                  viewProduct(product.id)
                  setSelectedProduct(product)
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[1.05fr,0.95fr] lg:items-center">
            <div className="overflow-hidden rounded-[34px] border border-[rgba(216,184,171,0.18)] shadow-[0_24px_70px_rgba(61,75,80,0.08)]">
              <img src={products[1].image} alt={products[1].name} className="h-[520px] w-full object-cover" />
            </div>
            <div className="space-y-6 rounded-[32px] bg-[linear-gradient(135deg,rgba(155,178,178,0.18),rgba(255,248,240,0.82)_38%,rgba(216,184,171,0.22))] p-8 shadow-[0_20px_50px_rgba(61,75,80,0.06)]">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[color:var(--color-gold)]">Based on Your Style</p>
              <h2 className="font-display text-5xl leading-none text-[color:var(--color-ink)]">
                Personalization should feel like good merchandising.
              </h2>
              <p className="max-w-lg text-sm leading-8 text-[color:var(--color-ink-soft)]">
                RetailCo keeps the recommendation layer subtle: better sizing, stronger ranking, and edits that feel relevant without interrupting the browse.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/for-you" className="btn-secondary px-5 py-3 text-sm font-semibold">
                  View Recommendations
                </Link>
                <Link to="/shop" className="btn-primary px-5 py-3 text-sm font-semibold">
                  Explore
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 pb-14 pt-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <LockedPreview />
          <div className="mt-8 flex items-center justify-between px-1">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--color-ink)] text-white">
                <Lock size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[color:var(--color-ink)]">Want a more personal feed?</p>
                <p className="text-sm text-[color:var(--color-ink-soft)]">Unlock saved sizes, relevant products, and quieter recommendation moments in For You.</p>
              </div>
            </div>
            <Link to="/auth" className="btn-primary hidden px-5 py-3 text-sm font-semibold sm:inline-flex">
              Explore For You
            </Link>
          </div>
        </div>
      </section>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={addToCart} />
    </>
  )
}

function EditorialTile({
  image,
  eyebrow,
  title,
  cta,
  to,
}: {
  image: string
  eyebrow: string
  title: string
  cta: string
  to: string
}) {
  return (
    <div className="relative overflow-hidden rounded-[32px] border border-[rgba(155,178,178,0.18)] shadow-[0_22px_60px_rgba(61,75,80,0.08)]">
      <img src={image} alt={title} className="h-[460px] w-full object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_38%,rgba(41,54,58,0.4)_100%)]" />
      <div className="absolute inset-x-8 bottom-8 text-white">
        <p className="text-xs uppercase tracking-[0.34em] text-white/72">{eyebrow}</p>
        <h3 className="mt-3 max-w-md font-display text-4xl leading-none">{title}</h3>
        <Link to={to} className="btn-dark-secondary mt-5 px-5 py-3 text-sm font-semibold">
          {cta}
        </Link>
      </div>
    </div>
  )
}

function MinimalProductTile({
  product,
  onClick,
}: {
  product: Product
  onClick: () => void
}) {
  return (
    <button onClick={onClick} className="group text-left">
      <div className="overflow-hidden rounded-[28px] border border-[rgba(155,178,178,0.14)] bg-[linear-gradient(180deg,rgba(248,241,232,0.92),rgba(233,223,212,0.86))] shadow-[0_16px_40px_rgba(61,75,80,0.05)]">
        <img src={product.image} alt={product.name} className="h-[360px] w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
      </div>
      <div className="px-1 pt-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[color:var(--color-ink-soft)]">{product.collection}</p>
        <h3 className="mt-2 text-lg font-semibold text-[color:var(--color-ink)]">{product.name}</h3>
        <p className="mt-1 text-sm text-[color:var(--color-ink-soft)]">{formatPrice(product.price)}</p>
      </div>
    </button>
  )
}
