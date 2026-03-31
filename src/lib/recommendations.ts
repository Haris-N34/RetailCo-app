import { products } from '../data/catalog'
import { createPromptVisualRequest, type PromptVisualColor, type PromptVisualGarment, type PromptVisualRequest } from './promptVisuals'
import type { Product, UserProfile } from '../types'

export interface PromptMatchResult {
  product: Product
  score: number
  reasons: string[]
}

export interface PromptRequirement {
  garment: PromptVisualGarment
  color: PromptVisualColor
}

export function scoreProduct(product: Product, profile: UserProfile) {
  let score = 0

  if (profile.preferredCategories.includes(product.category)) score += 32
  profile.favoriteStyles.forEach((style) => {
    if (product.styleTags.includes(style)) score += 18
  })
  profile.shoppingGoals.forEach((goal) => {
    if (product.occasions.includes(goal)) score += 14
  })
  profile.favoriteColors.forEach((color) => {
    if (product.colors.some((productColor) => productColor.toLowerCase() === color.toLowerCase())) score += 10
  })
  if (product.price >= profile.budget[0] && product.price <= profile.budget[1]) score += 12
  if (product.badge) score += 4
  if (product.trending) score += 6
  if (product.featured) score += 5

  return score + product.rating
}

export function getRecommendedProducts(profile: UserProfile, recentlyViewed: string[], favorites: string[]) {
  return [...products]
    .map((product) => {
      let score = scoreProduct(product, profile)
      if (recentlyViewed.includes(product.id)) score += 8
      if (favorites.includes(product.id)) score += 10
      return { product, score }
    })
    .sort((a, b) => b.score - a.score)
    .map(({ product }) => product)
}

export function buildWeeklyStory(profile: UserProfile) {
  const primaryStyle = profile.favoriteStyles[0] ?? 'Minimal'
  const primaryGoal = profile.shoppingGoals[0] ?? 'Weekend'
  return `This week's feed leans ${primaryStyle.toLowerCase()} for ${primaryGoal.toLowerCase()} plans, anchored by refined layers in your preferred palette.`
}

const colorAliases: Record<string, string[]> = {
  white: ['white', 'ivory', 'pearl', 'cloud', 'oat', 'champagne'],
  blue: ['blue', 'ink', 'slate', 'midnight'],
  black: ['black', 'graphite', 'ink'],
  grey: ['grey', 'gray', 'graphite', 'slate', 'pebble'],
  beige: ['beige', 'sand', 'stone', 'latte', 'oat', 'pebble'],
  green: ['green', 'olive'],
  gold: ['gold', 'champagne'],
}

const styleSignals = [
  { term: 'slim', aliases: ['slim', 'fitted'], reasons: ['Cut with a slimmer fit profile'], score: 24 },
  { term: 'tailored', aliases: ['tailored', 'fits well', 'well fitting', 'structured'], reasons: ['Matches a tailored, refined silhouette'], score: 20 },
  { term: 'casual', aliases: ['casual', 'everyday'], reasons: ['Works for casual styling'], score: 12 },
  { term: 'travel', aliases: ['travel', 'trip'], reasons: ['Built around travel-friendly wear'], score: 12 },
]

const categorySignals = [
  { type: 'shirt', aliases: ['shirt', 'top', 'tee', 'polo', 'blouse', 'shell'], reason: 'Category and naming align with tops and shirts', score: 26 },
  { type: 'pants', aliases: ['pants', 'trousers', 'slacks', 'joggers', 'denim', 'jeans'], reason: 'Category and naming align with pants and bottoms', score: 26 },
  { type: 'jacket', aliases: ['jacket', 'coat', 'bomber', 'outerwear'], reason: 'Category and naming align with outerwear', score: 26 },
  { type: 'bag', aliases: ['bag', 'tote', 'crossbody', 'purse'], reason: 'Category and naming align with accessories', score: 22 },
]

const garmentAliases: Record<PromptVisualGarment, string[]> = {
  shirt: ['shirt', 'top', 'tee', 't-shirt', 'polo', 'blouse', 'shell', 'button up', 'button-up'],
  pants: ['pants', 'trousers', 'slacks', 'joggers', 'denim', 'jeans'],
}

const audienceSignals = [
  { audience: 'men', aliases: ['men', 'male', 'man'], reason: "Best aligned to RetailCo's men's inventory", score: 22 },
  { audience: 'women', aliases: ['women', 'female', 'woman'], reason: "Best aligned to RetailCo's women's inventory", score: 22 },
]

function normalizePrompt(prompt: string) {
  return prompt.toLowerCase().replace(/[^a-z0-9\s-]/g, ' ')
}

function findPromptColor(prompt: string) {
  const orderedColors = Object.keys(colorAliases) as PromptVisualColor[]
  return orderedColors.find((color) => colorAliases[color].some((alias) => prompt.includes(alias))) ?? null
}

function hasGarment(prompt: string, garment: PromptVisualGarment) {
  return garmentAliases[garment].some((alias) => prompt.includes(alias))
}

export function extractPromptRequirements(prompt: string): PromptRequirement[] {
  const normalizedPrompt = normalizePrompt(prompt).trim()
  if (!normalizedPrompt) return []

  const requirements: PromptRequirement[] = []

  if (hasGarment(normalizedPrompt, 'shirt')) {
    const shirtPrompt = normalizedPrompt.split('with')[0] ?? normalizedPrompt
    const shirtColor = findPromptColor(shirtPrompt) ?? findPromptColor(normalizedPrompt)
    if (shirtColor) {
      requirements.push({ garment: 'shirt', color: shirtColor })
    }
  }

  if (hasGarment(normalizedPrompt, 'pants')) {
    const pantsSection = normalizedPrompt.includes('with')
      ? normalizedPrompt.slice(normalizedPrompt.indexOf('with') + 4)
      : normalizedPrompt
    const pantsColor = findPromptColor(pantsSection) ?? findPromptColor(normalizedPrompt)
    if (pantsColor) {
      requirements.push({ garment: 'pants', color: pantsColor })
    }
  }

  return requirements.filter(
    (requirement, index, all) =>
      all.findIndex((item) => item.garment === requirement.garment && item.color === requirement.color) === index,
  )
}

export function getPromptVisualRequests(prompt: string): PromptVisualRequest[] {
  return extractPromptRequirements(prompt).map(({ garment, color }) => createPromptVisualRequest(garment, color))
}

function buildSearchText(product: Product) {
  return [
    product.name,
    product.category,
    product.collection,
    product.description,
    product.fitProfile ?? '',
    product.colors.join(' '),
    product.styleTags.join(' '),
    product.occasions.join(' '),
    product.materials.join(' '),
    ...(product.searchTerms ?? []),
  ]
    .join(' ')
    .toLowerCase()
}

export function getPromptMatches(prompt: string, profile: UserProfile, favorites: string[], recentlyViewed: string[]) {
  const normalizedPrompt = normalizePrompt(prompt).trim()
  if (!normalizedPrompt) return []
  const requirements = extractPromptRequirements(prompt)

  const results: PromptMatchResult[] = products
    .map((product) => {
      const searchText = buildSearchText(product)
      let score = scoreProduct(product, profile)
      const reasons = new Set<string>()

      if (favorites.includes(product.id)) {
        score += 8
        reasons.add('You already saved similar pieces in this direction')
      }

      if (recentlyViewed.includes(product.id)) {
        score += 6
        reasons.add('You recently explored related products')
      }

      for (const { type, aliases, reason, score: categoryScore } of categorySignals) {
        if (aliases.some((alias) => normalizedPrompt.includes(alias)) && aliases.some((alias) => searchText.includes(alias))) {
          score += categoryScore
          reasons.add(reason)
        }

        if (type === 'shirt' && product.category === 'Men' && normalizedPrompt.includes('shirt') && searchText.includes('top')) {
          score += 8
          reasons.add('Best available shirt-like match in current inventory')
        }
      }

      for (const [baseColor, aliases] of Object.entries(colorAliases)) {
        if (normalizedPrompt.includes(baseColor) && aliases.some((alias) => searchText.includes(alias))) {
          score += 18
          reasons.add(`Color palette is close to ${baseColor} tones`)
        }
      }

      if (normalizedPrompt.includes('blue shirt') && searchText.includes('blue shirt')) {
        score += 30
        reasons.add('Direct match for a blue shirt request')
      }

      if (normalizedPrompt.includes('white pants') && searchText.includes('white pants')) {
        score += 30
        reasons.add('Direct match for white pants')
      }

      for (const requirement of requirements) {
        const garmentHit = garmentAliases[requirement.garment].some((alias) => searchText.includes(alias))
        const colorHit = colorAliases[requirement.color].some((alias) => searchText.includes(alias))

        if (garmentHit && colorHit) {
          score += 42
          reasons.add(`Matches the requested ${requirement.color} ${requirement.garment}`)
        } else if (garmentHit) {
          score += 8
          reasons.add(`Matches the requested ${requirement.garment} silhouette`)
        } else if (colorHit) {
          score += 6
          reasons.add(`Matches the requested ${requirement.color} palette`)
        }
      }

      for (const signal of styleSignals) {
        if (signal.aliases.some((alias) => normalizedPrompt.includes(alias)) && signal.aliases.some((alias) => searchText.includes(alias))) {
          score += signal.score
          signal.reasons.forEach((reason) => reasons.add(reason))
        }
      }

      for (const signal of audienceSignals) {
        if (signal.aliases.some((alias) => normalizedPrompt.includes(alias))) {
          if ((signal.audience === 'men' && product.category === 'Men') || (signal.audience === 'women' && product.category === 'Women')) {
            score += signal.score
            reasons.add(signal.reason)
          } else {
            score -= 12
          }
        }
      }

      if (normalizedPrompt.includes('white pants') && product.searchTerms?.includes('white pants')) {
        score += 14
        reasons.add('Easy pairing with white pants')
      }

      if (normalizedPrompt.includes('with white pants') && product.searchTerms?.includes('blue shirt')) {
        score += 16
        reasons.add('Styled to pair cleanly with white pants')
      }

      if (profile.sizes.some((size) => product.sizes.includes(size))) {
        score += 7
        reasons.add('Available in one of your saved sizes')
      }

      return { product, score, reasons: [...reasons] }
    })
    .filter((item) => item.reasons.length > 0)
    .sort((a, b) => b.score - a.score)

  return results.slice(0, 6)
}
