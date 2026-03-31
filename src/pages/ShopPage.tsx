import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { ProductCard } from '../components/ProductCard'
import { ProductModal } from '../components/ProductModal'
import { SectionHeading } from '../components/SectionHeading'
import { categoryOptions, products } from '../data/catalog'
import { useRetailStore } from '../store/useRetailStore'
import type { Product } from '../types'

export function ShopPage() {
  const favorites = useRetailStore((state) => state.favorites)
  const toggleFavorite = useRetailStore((state) => state.toggleFavorite)
  const viewProduct = useRetailStore((state) => state.viewProduct)
  const addToCart = useRetailStore((state) => state.addToCart)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<(typeof categoryOptions)[number]>('All')

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch = category === 'All' || product.category === category
      const queryMatch =
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.collection.toLowerCase().includes(query.toLowerCase()) ||
        product.styleTags.join(' ').toLowerCase().includes(query.toLowerCase())
      return categoryMatch && queryMatch
    })
  }, [category, query])

  return (
    <section className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Browse"
          title="Browse by category, collection, and customer intent."
          description="Search, filters, and premium product cards help customers move from discovery to decision with less friction."
        />

        <div className="mb-8 grid gap-4 rounded-[30px] border border-white/70 bg-[linear-gradient(135deg,rgba(155,178,178,0.18),rgba(250,244,237,0.82)_34%,rgba(216,184,171,0.18))] p-4 backdrop-blur-xl lg:grid-cols-[1fr,auto]">
          <label className="flex items-center gap-3 rounded-[22px] border border-[color:var(--color-line)] bg-[linear-gradient(180deg,rgba(247,241,232,0.92),rgba(236,227,216,0.88))] px-4 py-3">
            <Search size={18} className="text-[color:var(--color-ink-soft)]" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products, collections, and style cues..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-[color:var(--color-ink-soft)]"
            />
          </label>
          <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-1">
            {categoryOptions.map((option) => (
              <button
                key={option}
                onClick={() => setCategory(option)}
                className={`whitespace-nowrap rounded-full px-4 py-3 text-sm font-medium ${
                  category === option
                    ? 'bg-[linear-gradient(180deg,rgba(74,95,100,0.98),rgba(53,71,75,0.96))] text-white'
                    : 'border border-[color:var(--color-line)] bg-[linear-gradient(180deg,rgba(250,245,239,0.82),rgba(237,227,217,0.8))] text-[color:var(--color-ink-soft)]'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[color:var(--color-ink-soft)]">{filteredProducts.length} styles available</p>
          <p className="text-sm text-[color:var(--color-ink-soft)]">Availability shown for delivery and select store pickup</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
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

      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={addToCart} />
    </section>
  )
}
