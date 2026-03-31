import { ArrowRight, Check } from 'lucide-react'
import type { FormEvent } from 'react'
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRetailStore } from '../store/useRetailStore'
import type { Occasion, ProductCategory, StyleTag } from '../types'

const categoryChoices: ProductCategory[] = ['Women', 'Men', 'Accessories', 'New Arrivals']
const styleChoices: StyleTag[] = ['Minimal', 'Tailored', 'Street', 'Athleisure', 'Evening', 'Travel']
const goalChoices: Occasion[] = ['Work', 'Weekend', 'Travel', 'Gym', 'Night Out', 'Casual']
const colorChoices = ['Black', 'Ivory', 'Stone', 'Champagne', 'Olive', 'Graphite']
const sizeChoices = ['XS', 'S', 'M', 'L', 'XL', 'One Size']

export function AuthPage() {
  const navigate = useNavigate()
  const signUp = useRetailStore((state) => state.signUp)
  const completeOnboarding = useRetailStore((state) => state.completeOnboarding)
  const loginDemo = useRetailStore((state) => state.loginDemo)
  const draft = useRetailStore((state) => state.signUpDraft)

  const [step, setStep] = useState(0)
  const [firstName, setFirstName] = useState(draft?.firstName ?? '')
  const [email, setEmail] = useState(draft?.email ?? '')
  const [preferredCategories, setPreferredCategories] = useState<ProductCategory[]>(['Women', 'Accessories'])
  const [favoriteStyles, setFavoriteStyles] = useState<StyleTag[]>(['Minimal', 'Tailored'])
  const [favoriteColors, setFavoriteColors] = useState<string[]>(['Black', 'Ivory'])
  const [sizes, setSizes] = useState<string[]>(['S', 'M', 'One Size'])
  const [shoppingGoals, setShoppingGoals] = useState<Occasion[]>(['Work', 'Travel'])
  const [budget, setBudget] = useState<[number, number]>([80, 260])

  const stepTitle = useMemo(
    () => [
      'Create your RetailCo account',
      'Choose the categories you shop most',
      'Tell us what your style looks like',
      'Set fit, budget, and shopping goals',
    ][step],
    [step],
  )

  function toggleValue<T>(value: T, values: T[], setter: (values: T[]) => void) {
    setter(values.includes(value) ? values.filter((item) => item !== value) : [...values, value])
  }

  function onContinue(event: FormEvent) {
    event.preventDefault()

    if (step === 0) {
      signUp({ firstName, email })
      setStep(1)
      return
    }

    if (step < 3) {
      setStep(step + 1)
      return
    }

    completeOnboarding({
      preferredCategories,
      favoriteStyles,
      favoriteColors,
      sizes,
      budget,
      shoppingGoals,
    })
    navigate('/for-you')
  }

  return (
    <section className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr,1.18fr]">
        <div className="rounded-[32px] border border-white/70 bg-[linear-gradient(180deg,#43595e,#546d70_58%,#b77d68)] p-6 text-white sm:p-8">
          <p className="text-xs uppercase tracking-[0.34em] text-[color:var(--color-gold-soft)]">Unlock your personalized experience</p>
          <h1 className="mt-4 font-display text-[2.5rem] leading-[0.95] sm:text-5xl">A short setup for better recommendations from the start.</h1>
          <p className="mt-5 max-w-md text-sm leading-7 text-white/74">
            RetailCo uses a few simple preference signals to personalize what you see, surface the right sizes, and make the For You page feel relevant immediately.
          </p>
          <div className="mt-10 space-y-4">
            {[
              '4-step mobile-first onboarding',
              'Preference signals captured for recommendations and future CRM study',
              'Preview the value before you fully unlock the feed',
            ].map((item, index) => (
              <div key={item} className="flex items-center gap-3 rounded-[22px] bg-white/10 p-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/14">{index + 1}</div>
                <p className="text-sm text-white/78">{item}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => {
              loginDemo()
              navigate('/for-you')
            }}
            className="btn-dark-secondary mt-8 px-5 py-3 text-sm font-semibold"
          >
            Continue with Demo Profile
          </button>
        </div>

        <form onSubmit={onContinue} className="glass-panel rounded-[32px] border border-white/70 p-6 sm:p-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--color-gold)]">Step {step + 1} / 4</p>
              <h2 className="mt-3 font-display text-[2rem] leading-[0.95] text-[color:var(--color-ink)] sm:text-4xl">{stepTitle}</h2>
            </div>
            <div className="flex gap-2">
              {[0, 1, 2, 3].map((item) => (
                <span
                  key={item}
                  className={`h-2.5 w-8 rounded-full sm:w-10 ${item <= step ? 'bg-[color:var(--color-ink)]' : 'bg-[color:var(--color-paper-2)]'}`}
                />
              ))}
            </div>
          </div>

          {step === 0 ? (
            <div className="grid gap-4">
              <label className="space-y-2">
                <span className="text-sm font-medium text-[color:var(--color-ink)]">First name</span>
                <input
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  className="input-field px-4 py-3 outline-none"
                  placeholder="Avery"
                  required
                />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-medium text-[color:var(--color-ink)]">Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="input-field px-4 py-3 outline-none"
                  placeholder="you@retailco.ca"
                  required
                />
              </label>
            </div>
          ) : null}

          {step === 1 ? (
            <ChipGroup<ProductCategory>
              values={preferredCategories}
              options={categoryChoices}
              onToggle={(value) => toggleValue(value, preferredCategories, setPreferredCategories)}
            />
          ) : null}

          {step === 2 ? (
            <div className="space-y-6">
              <div>
                <p className="mb-3 text-sm font-medium text-[color:var(--color-ink)]">Favorite styles</p>
                <ChipGroup<StyleTag>
                  values={favoriteStyles}
                  options={styleChoices}
                  onToggle={(value) => toggleValue(value, favoriteStyles, setFavoriteStyles)}
                />
              </div>
              <div>
                <p className="mb-3 text-sm font-medium text-[color:var(--color-ink)]">Preferred colors</p>
                <ChipGroup<string>
                  values={favoriteColors}
                  options={colorChoices}
                  onToggle={(value) => toggleValue(value, favoriteColors, setFavoriteColors)}
                />
              </div>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="space-y-6">
              <div>
                <p className="mb-3 text-sm font-medium text-[color:var(--color-ink)]">Sizes</p>
                <ChipGroup<string>
                  values={sizes}
                  options={sizeChoices}
                  onToggle={(value) => toggleValue(value, sizes, setSizes)}
                />
              </div>
              <div>
                <p className="mb-3 text-sm font-medium text-[color:var(--color-ink)]">Shopping goals</p>
                <ChipGroup<Occasion>
                  values={shoppingGoals}
                  options={goalChoices}
                  onToggle={(value) => toggleValue(value, shoppingGoals, setShoppingGoals)}
                />
              </div>
              <div className="rounded-[24px] border border-white/70 bg-white/60 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-[color:var(--color-ink)]">Budget range</p>
                  <p className="text-sm text-[color:var(--color-ink-soft)]">
                    ${budget[0]} - ${budget[1]} CAD
                  </p>
                </div>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <input
                    type="range"
                    min="40"
                    max="200"
                    value={budget[0]}
                    onChange={(event) => setBudget([Number(event.target.value), budget[1]])}
                  />
                  <input
                    type="range"
                    min="160"
                    max="400"
                    value={budget[1]}
                    onChange={(event) => setBudget([budget[0], Number(event.target.value)])}
                  />
                </div>
              </div>
            </div>
          ) : null}

          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={() => setStep(Math.max(0, step - 1))}
              className="btn-secondary w-full px-5 py-3 text-sm font-semibold sm:w-auto"
            >
              Back
            </button>
            <button
              type="submit"
              className="btn-primary w-full px-6 py-3 text-sm font-semibold sm:w-auto"
            >
              {step === 3 ? 'View Personalized Feed' : 'Continue'}
              <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

function ChipGroup<T extends string>({
  options,
  values,
  onToggle,
}: {
  options: T[]
  values: T[]
  onToggle: (value: T) => void
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((option) => {
        const active = values.includes(option)
        return (
          <button
            key={option}
            type="button"
            onClick={() => onToggle(option)}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-3 text-sm font-medium transition ${
              active
                ? 'bg-[rgba(65,84,88,0.96)] text-white'
                : 'border border-[color:var(--color-line)] bg-[rgba(255,250,244,0.74)] text-[color:var(--color-ink-soft)]'
            }`}
          >
            {active ? <Check size={14} /> : null}
            {option}
          </button>
        )
      })}
    </div>
  )
}
