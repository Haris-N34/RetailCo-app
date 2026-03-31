import type { ReactNode } from 'react'
import { useMemo, useState } from 'react'
import { ArrowRight, Gift, History, Lock, Search, Sparkles, Star, Wand2, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { LockedPreview } from '../components/LockedPreview'
import { ProductCard } from '../components/ProductCard'
import { ProductModal } from '../components/ProductModal'
import { SectionHeading } from '../components/SectionHeading'
import { products } from '../data/catalog'
import { buildWeeklyStory, getPromptMatches, getPromptVisualRequests, getRecommendedProducts } from '../lib/recommendations'
import { useRetailStore } from '../store/useRetailStore'
import type { Product } from '../types'

export function ForYouPage() {
  const isAuthenticated = useRetailStore((state) => state.isAuthenticated)
  const user = useRetailStore((state) => state.user)
  const favorites = useRetailStore((state) => state.favorites)
  const recentlyViewed = useRetailStore((state) => state.recentlyViewed)
  const toggleFavorite = useRetailStore((state) => state.toggleFavorite)
  const viewProduct = useRetailStore((state) => state.viewProduct)
  const addToCart = useRetailStore((state) => state.addToCart)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [prompt, setPrompt] = useState('Blue coloured shirt that fits well on slim men with white pants')
  const [activePrompt, setActivePrompt] = useState('Blue coloured shirt that fits well on slim men with white pants')

  const recommended = useMemo(() => {
    if (!user) return []
    return getRecommendedProducts(user, recentlyViewed, favorites).slice(0, 6)
  }, [favorites, recentlyViewed, user])

  const recentlyViewedProducts = useMemo(
    () => recentlyViewed.map((id) => products.find((product) => product.id === id)).filter(Boolean) as Product[],
    [recentlyViewed],
  )

  const promptResults = useMemo(() => {
    if (!user) return []
    return getPromptMatches(activePrompt, user, favorites, recentlyViewed)
  }, [activePrompt, favorites, recentlyViewed, user])

  const promptVisuals = useMemo(() => getPromptVisualRequests(activePrompt), [activePrompt])

  if (!isAuthenticated || !user) {
    return (
      <section className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <SectionHeading
            eyebrow="For You"
            title="RetailCo's personalized shopping feed."
            description="Preview the value of signing in before full access, then unlock recommendations shaped by preferences, browsing, and loyalty context."
          />
          <LockedPreview />
          <div className="grid gap-4 lg:grid-cols-3">
            {[
              'Taste-aware product ranking',
              'Loyalty-aware offers and perks',
              'Recently viewed items surfaced in your preferred sizes',
            ].map((item) => (
              <div key={item} className="rounded-[28px] border border-white/70 bg-white/62 p-6 backdrop-blur-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--color-paper)] text-[color:var(--color-ink)]">
                  <Lock size={18} />
                </div>
                <p className="mt-4 text-lg font-semibold text-[color:var(--color-ink)]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="grid gap-5 lg:grid-cols-[1.12fr,0.88fr]">
          <div className="overflow-hidden rounded-[32px] border border-white/70 bg-[linear-gradient(135deg,#42585d,#587072_52%,#b97d66)] p-6 text-white sm:p-8">
            <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--color-gold-soft)]">For {user.firstName}</p>
            <h1 className="mt-3 font-display text-[2.6rem] leading-[0.95] sm:text-6xl">Recommended for you, based on how you shop.</h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/74">{buildWeeklyStory(user)}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {user.favoriteStyles.map((tag) => (
                <span key={tag} className="rounded-full border border-white/14 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/82">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <MetricCard label="Loyalty status" value={user.loyaltyTier} caption={`${user.points} points ready to use`} icon={<Star size={18} />} />
            <MetricCard label="Recommended fit" value={user.sizes.join(' / ')} caption="Saved sizes are prioritized in ranking" icon={<Sparkles size={18} />} />
            <MetricCard label="Shopping focus" value={user.shoppingGoals[0]} caption="This week's feed reflects your current intent" icon={<Zap size={18} />} />
            <MetricCard label="Offer" value="12% off curated bundles" caption="Shown because accessories index highly in your profile" icon={<Gift size={18} />} />
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.04fr,0.96fr]">
          <div className="overflow-hidden rounded-[32px] border border-white/70 bg-[linear-gradient(135deg,rgba(255,252,247,0.92),rgba(239,229,218,0.92))] p-6 shadow-[0_22px_60px_rgba(61,75,80,0.08)] sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--color-gold)]">Prompt Concierge</p>
                <h2 className="mt-3 font-display text-[2rem] leading-[0.95] text-[color:var(--color-ink)] sm:text-4xl">
                  Ask for a look, and RetailCo will search the inventory for it.
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[color:var(--color-ink-soft)]">
                  Describe the piece, fit, color, and who it is for. We combine your saved profile with the live catalog to return the closest matches.
                </p>
              </div>
              <div className="hidden h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(180deg,#475d61,#314246)] text-white sm:flex">
                <Wand2 size={20} />
              </div>
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault()
                setActivePrompt(prompt)
              }}
              className="mt-8"
            >
              <div className="rounded-[28px] border border-white/80 bg-white/76 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]">
                <textarea
                  value={prompt}
                  onChange={(event) => setPrompt(event.target.value)}
                  rows={4}
                  className="min-h-[136px] w-full resize-none rounded-[22px] bg-transparent px-4 py-3 text-base text-[color:var(--color-ink)] outline-none"
                  placeholder="Try: I need a polished weekend outfit in dark tones for travel."
                />
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3 px-2 pb-2">
                  <div className="flex flex-wrap gap-2">
                    {[
                      'blue shirt for slim men',
                      'travel-ready black layers',
                      'tailored workwear under $150',
                    ].map((example) => (
                      <button
                        key={example}
                        type="button"
                        onClick={() => {
                          setPrompt(example)
                          setActivePrompt(example)
                        }}
                        className="rounded-full border border-[color:var(--color-line)] bg-[rgba(255,248,241,0.9)] px-3 py-1.5 text-xs font-medium text-[color:var(--color-ink-soft)]"
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                  <button type="submit" className="btn-primary px-5 py-3 text-sm font-semibold">
                    <Search size={16} />
                    Find Matches
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="rounded-[32px] border border-white/70 bg-[linear-gradient(180deg,rgba(67,89,94,0.98),rgba(46,62,66,0.96))] p-6 text-white sm:p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--color-gold-soft)]">Prompt Summary</p>
            <h3 className="mt-3 font-display text-[2rem] leading-[0.95] sm:text-4xl">Interpreting your request</h3>
            <p className="mt-4 rounded-[24px] border border-white/10 bg-white/6 p-4 text-sm leading-7 text-white/84">
              {activePrompt}
            </p>
            {promptVisuals.length ? (
              <div className="mt-6">
                <p className="text-xs uppercase tracking-[0.24em] text-white/56">Requested Pieces</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {promptVisuals.map((item) => (
                    <div key={`${item.color}-${item.garment}`} className="rounded-[24px] border border-white/10 bg-white/8 p-3">
                      <div className="rounded-[18px] bg-[rgba(247,242,234,0.96)] p-3">
                        <img src={item.image} alt={item.label} className="h-44 w-full rounded-[14px] object-contain" />
                      </div>
                      <p className="mt-3 text-sm font-semibold text-white">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
            {!promptVisuals.length ? (
              <div className="mt-6 rounded-[24px] border border-dashed border-white/16 bg-white/6 p-4 text-sm leading-7 text-white/72">
                No close inventory matches yet. Try changing the color, garment type, or occasion in your prompt.
              </div>
            ) : null}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.15fr,0.85fr]">
          <div className="rounded-[32px] border border-white/70 bg-white/65 p-6 backdrop-blur-xl sm:p-8">
            <SectionHeading
              eyebrow="Recommended For You"
              title="Products ranked around your preferences and activity."
              description="This feed prioritizes category affinity, style tags, budget fit, loyalty context, and recent browsing signals."
            />
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {(promptResults.length ? promptResults.map(({ product }) => product) : recommended).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  favorite={favorites.includes(product.id)}
                  onFavorite={() => toggleFavorite(product.id)}
                  onQuickView={() => {
                    viewProduct(product.id)
                    setSelectedProduct(product)
                  }}
                />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <InsightCard
              title="Prompt-aware ranking is now live"
              body="When you type what you want, RetailCo blends the prompt with your saved style, sizes, and favorites before ranking results."
            />
            <InsightCard
              title="Inventory match reasons"
              body={promptResults[0]?.reasons[0] ?? 'Each result explains why it matched, so the feed feels closer to a guided stylist than a generic search box.'}
            />
            <InsightCard
              title="Suggested outfit"
              body="Try combining a prompted top result with your recommended accessories to turn a single-item search into a full RetailCo look."
            />
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[0.9fr,1.1fr]">
          <div className="rounded-[32px] border border-white/70 bg-white/62 p-6 backdrop-blur-xl sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[color:var(--color-paper)] text-[color:var(--color-ink)]">
                <History size={18} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.26em] text-[color:var(--color-gold)]">Continue shopping</p>
                <h2 className="mt-2 font-display text-3xl leading-none text-[color:var(--color-ink)]">Recently viewed, ready to pick back up.</h2>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              {recentlyViewedProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className="flex w-full items-center gap-3 rounded-[24px] border border-white/70 bg-white/70 p-3 text-left sm:gap-4"
                >
                  <img src={product.image} alt={product.name} className="h-20 w-20 rounded-[18px] object-cover" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[color:var(--color-ink)]">{product.name}</p>
                    <p className="mt-1 text-sm text-[color:var(--color-ink-soft)]">{product.collection}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,252,247,0.78),rgba(238,230,220,0.84))] p-6 sm:p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--color-gold)]">Curated For This Week</p>
            <h2 className="mt-3 font-display text-[2rem] leading-[0.95] text-[color:var(--color-ink)] sm:text-4xl">Your week, translated into relevant outfits.</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                {
                  title: 'Workday precision',
                  body: 'Tailored layers and low-noise accessories designed around your preferred palette.',
                },
                {
                  title: 'Night out edit',
                  body: 'Polished textures and sculptural accents aligned to your after-hours interest.',
                },
                {
                  title: 'Travel-ready staples',
                  body: 'Versatile pieces with comfort signals and packable structure.',
                },
                {
                  title: 'Budget-aware picks',
                  body: 'High-fit recommendations filtered to your current spending range.',
                },
              ].map((item) => (
                <div key={item.title} className="rounded-[24px] border border-white/70 bg-white/70 p-5">
                  <p className="text-lg font-semibold text-[color:var(--color-ink)]">{item.title}</p>
                  <p className="mt-3 text-sm leading-7 text-[color:var(--color-ink-soft)]">{item.body}</p>
                </div>
              ))}
            </div>
            <Link to="/shop" className="btn-secondary mt-6 px-5 py-3 text-sm font-semibold">
              Shop More Recommendations <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={addToCart} />
    </section>
  )
}

function MetricCard({
  label,
  value,
  caption,
  icon,
}: {
  label: string
  value: string
  caption: string
  icon: ReactNode
}) {
  return (
    <div className="rounded-[28px] border border-white/70 bg-white/65 p-5 backdrop-blur-xl">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[color:var(--color-paper)] text-[color:var(--color-ink)]">
        {icon}
      </div>
      <p className="mt-4 text-xs uppercase tracking-[0.24em] text-[color:var(--color-ink-soft)]">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-[color:var(--color-ink)]">{value}</p>
      <p className="mt-2 text-sm leading-6 text-[color:var(--color-ink-soft)]">{caption}</p>
    </div>
  )
}

function InsightCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-[28px] border border-white/70 bg-white/65 p-6 backdrop-blur-xl">
      <p className="text-xs uppercase tracking-[0.26em] text-[color:var(--color-gold)]">Signal</p>
      <h3 className="mt-3 text-xl font-semibold text-[color:var(--color-ink)]">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-[color:var(--color-ink-soft)]">{body}</p>
    </div>
  )
}
