import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Occasion, ProductCategory, StyleTag, UserProfile } from '../types'

interface SignUpPayload {
  firstName: string
  email: string
}

interface OnboardingPayload {
  preferredCategories: ProductCategory[]
  favoriteStyles: StyleTag[]
  favoriteColors: string[]
  sizes: string[]
  budget: [number, number]
  shoppingGoals: Occasion[]
}

interface RetailState {
  user: UserProfile | null
  isAuthenticated: boolean
  favorites: string[]
  recentlyViewed: string[]
  cartCount: number
  signUpDraft: SignUpPayload | null
  signUp: (payload: SignUpPayload) => void
  completeOnboarding: (payload: OnboardingPayload) => void
  loginDemo: () => void
  logout: () => void
  toggleFavorite: (id: string) => void
  viewProduct: (id: string) => void
  addToCart: () => void
}

const demoProfile: UserProfile = {
  firstName: 'Avery',
  email: 'avery@retailco-demo.ca',
  preferredCategories: ['Women', 'Accessories', 'New Arrivals'],
  favoriteStyles: ['Minimal', 'Tailored', 'Evening'],
  favoriteColors: ['Black', 'Ivory', 'Champagne'],
  sizes: ['S', 'M', 'One Size'],
  budget: [80, 280],
  shoppingGoals: ['Work', 'Night Out', 'Travel'],
  loyaltyTier: 'Gold',
  points: 2480,
}

export const useRetailStore = create<RetailState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      favorites: ['p4', 'p11'],
      recentlyViewed: ['p3', 'p5', 'p8'],
      cartCount: 1,
      signUpDraft: null,
      signUp: (payload) => set({ signUpDraft: payload }),
      completeOnboarding: (payload) =>
        set((state) => ({
          isAuthenticated: true,
          user: {
            firstName: state.signUpDraft?.firstName ?? 'Guest',
            email: state.signUpDraft?.email ?? 'guest@retailco.ca',
            loyaltyTier: 'Silver',
            points: 320,
            ...payload,
          },
        })),
      loginDemo: () =>
        set({
          isAuthenticated: true,
          user: demoProfile,
        }),
      logout: () =>
        set({
          isAuthenticated: false,
          user: null,
          signUpDraft: null,
        }),
      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((item) => item !== id)
            : [...state.favorites, id],
        })),
      viewProduct: (id) =>
        set((state) => ({
          recentlyViewed: [id, ...state.recentlyViewed.filter((item) => item !== id)].slice(0, 6),
        })),
      addToCart: () =>
        set((state) => ({
          cartCount: state.cartCount + 1,
        })),
    }),
    {
      name: 'retailco-app-state',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        favorites: state.favorites,
        recentlyViewed: state.recentlyViewed,
        cartCount: state.cartCount,
        signUpDraft: state.signUpDraft,
      }),
    },
  ),
)
