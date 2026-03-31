export type ProductCategory =
  | 'Men'
  | 'Women'
  | 'Accessories'
  | 'New Arrivals'
  | 'Sale'

export type StyleTag =
  | 'Minimal'
  | 'Tailored'
  | 'Street'
  | 'Athleisure'
  | 'Evening'
  | 'Travel'

export type Occasion =
  | 'Casual'
  | 'Work'
  | 'Gym'
  | 'Weekend'
  | 'Night Out'
  | 'Travel'

export interface Product {
  id: string
  name: string
  category: ProductCategory
  fitProfile?: string
  collection: string
  price: number
  colors: string[]
  sizes: string[]
  image: string
  badge?: string
  rating: number
  reviews: number
  inventory: number
  styleTags: StyleTag[]
  occasions: Occasion[]
  description: string
  materials: string[]
  searchTerms?: string[]
  featured?: boolean
  seasonal?: boolean
  trending?: boolean
}

export interface UserProfile {
  firstName: string
  email: string
  preferredCategories: ProductCategory[]
  favoriteStyles: StyleTag[]
  favoriteColors: string[]
  sizes: string[]
  budget: [number, number]
  shoppingGoals: Occasion[]
  loyaltyTier: 'Silver' | 'Gold' | 'Black'
  points: number
}
