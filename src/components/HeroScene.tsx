import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const heroCopy = {
  label: "The Three F's",
  title: 'Designed around your style',
  body: 'RetailCo balances tailored cuts, softer ease, and wearable proportions across everyday dressing.',
}

const transitionCards = [
  {
    name: 'Fit',
    detail: 'Tailored cuts, relaxed proportions, and easy layers designed to feel right from the first try-on.',
    accent: 'from-[#b8d1cf] via-[#dbe9e5] to-[#f7efe5]',
  },
  {
    name: 'Form',
    detail: 'Clean silhouettes, soft structure, and polished shapes that define the RetailCo point of view.',
    accent: 'from-[#efc7b8] via-[#f5ddd2] to-[#fbf1e9]',
  },
  {
    name: 'Fabric',
    detail: 'Merino, silk, cotton, and fluid blends chosen for texture, drape, and everyday wearability.',
    accent: 'from-[#c3d6d8] via-[#e8ddd1] to-[#fff5ec]',
  },
]

export function HeroScene() {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const sweaterScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.02, 1.14])
  const sweaterOpacity = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0.45, 1, 1, 0.22])
  const sweaterY = useTransform(scrollYProgress, [0, 0.5, 1], [220, 140, 30])
  const sweaterRotate = useTransform(scrollYProgress, [0, 0.03, 0.32, 1], [-10, -6, 4, 8])
  const sweaterRotateX = useTransform(scrollYProgress, [0, 0.03, 0.3, 1], [22, 16, 5, 0])
  const blueprintGlow = useTransform(scrollYProgress, [0, 0.5, 1], [0.2, 0.35, 0.08])
  const blueprintLines = useTransform(scrollYProgress, [0, 0.3, 0.8], [0.55, 1, 0.78])
  const backgroundShift = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  const textParallax = useTransform(scrollYProgress, [0, 1], [0, -24])

  return (
    <section ref={sectionRef} className="relative mb-8 h-[112vh] min-h-[980px]">
      <div className="sticky top-0 overflow-visible bg-transparent">
        <div className="relative min-h-[920px] overflow-visible rounded-[32px]">
          <motion.div
            style={{ backgroundPositionX: backgroundShift }}
            className="absolute inset-0 rounded-[32px] bg-[linear-gradient(180deg,rgba(95,127,126,0.96),rgba(86,117,116,0.98)),radial-gradient(circle_at_20%_12%,rgba(130,161,160,0.35),transparent_26%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.08),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0))] shadow-[0_32px_100px_rgba(61,75,80,0.16)]"
          />
          <div className="absolute inset-0 rounded-[32px] bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30 [mask-image:radial-gradient(circle_at_center,black_42%,transparent_88%)]" />

          <motion.div
            style={{ y: textParallax }}
            className="relative z-10 flex h-full min-h-[920px] flex-col items-center justify-start px-6 pb-12 pt-14 text-center lg:px-12"
          >
            <div className="relative flex w-full flex-1 items-center justify-center overflow-visible pb-6 pt-16">
              <motion.div
                style={{
                  scale: sweaterScale,
                  opacity: sweaterOpacity,
                  y: sweaterY,
                  rotateZ: sweaterRotate,
                  rotateX: sweaterRotateX,
                }}
                className="relative w-full max-w-[620px] [perspective:1400px]"
              >
                <motion.div
                  style={{ opacity: blueprintGlow }}
                  className="absolute inset-x-[12%] top-[18%] h-[58%] rounded-full bg-[rgba(155,178,178,0.22)] blur-3xl"
                />
                <div className="relative rounded-[34px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,252,247,0.62),rgba(255,250,243,0.22))] p-6 shadow-[0_32px_90px_rgba(61,75,80,0.08)] backdrop-blur-xl">
                  <div className="absolute inset-4 rounded-[26px] border border-dashed border-[rgba(41,54,58,0.08)]" />
                  <motion.div style={{ opacity: blueprintLines }} className="relative">
                    <SweaterBlueprint />
                  </motion.div>
                </div>
              </motion.div>

              <div className="absolute top-[4%] z-20 w-full max-w-3xl px-6">
                <div className="mx-auto max-w-2xl rounded-[28px] bg-[radial-gradient(circle_at_top,rgba(255,251,244,0.42),rgba(255,251,244,0.18)_50%,transparent_82%)] px-8 py-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#f1dfc9]">{heroCopy.label}</p>
                <h1 className="mt-3 font-display text-5xl leading-none text-[color:var(--color-ink)] sm:text-6xl">
                  {heroCopy.title}
                </h1>
                </div>
              </div>

            </div>

            <motion.div
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-20 mt-44 grid w-full max-w-5xl gap-4 md:grid-cols-3"
            >
              {transitionCards.map((card) => (
                <motion.div
                  key={card.name}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-[24px] border border-[rgba(41,54,58,0.14)] bg-[#fffaf2] p-4 text-left shadow-[0_28px_70px_rgba(61,75,80,0.24)]"
                >
                  <div className={`relative h-28 overflow-hidden rounded-[18px] border border-[rgba(41,54,58,0.12)] bg-gradient-to-br ${card.accent}`}>
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.18),transparent_42%)]" />
                    <div className="absolute left-5 top-5 h-8 w-8 rounded-full bg-white shadow-[0_6px_18px_rgba(41,54,58,0.08)]" />
                    <div className="absolute right-5 top-6 h-3 w-20 rounded-full bg-[rgba(255,255,255,0.96)]" />
                    <div className="absolute right-5 top-12 h-3 w-14 rounded-full bg-[rgba(255,255,255,0.88)]" />
                    <div className="absolute left-5 bottom-5 h-10 w-28 rounded-[14px] bg-[rgba(255,255,255,0.92)] shadow-[0_6px_18px_rgba(41,54,58,0.08)]" />
                  </div>
                  <p className="mt-4 text-base font-semibold text-[#243236]">{card.name}</p>
                  <p className="mt-1 text-sm leading-6 text-[#4a5b5f]">{card.detail}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function SweaterBlueprint() {
  return (
    <svg viewBox="0 0 520 620" className="mx-auto h-auto w-full max-w-[520px]" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="blueprint-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6f8888" />
          <stop offset="100%" stopColor="#b87862" />
        </linearGradient>
        <linearGradient id="shirt-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(95,127,126,0.22)" />
          <stop offset="100%" stopColor="rgba(95,127,126,0.32)" />
        </linearGradient>
      </defs>

      <path
        d="M214 155L188 166L139 193L114 268L163 284L184 231L198 438C218 433 238 430 260 430C282 430 302 433 322 438L336 231L357 284L406 268L381 193L332 166L306 155C296 166 281 173 260 173C239 173 224 166 214 155Z"
        fill="url(#shirt-fill)"
      />
      <rect x="40" y="34" width="440" height="552" rx="28" stroke="rgba(41,54,58,0.08)" strokeDasharray="8 10" />
      <path
        d="M214 155L188 166L139 193L114 268L163 284L184 231L198 438C218 433 238 430 260 430C282 430 302 433 322 438L336 231L357 284L406 268L381 193L332 166L306 155"
        stroke="url(#blueprint-stroke)"
        strokeWidth="4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M214 155C224 166 239 173 260 173C281 173 296 166 306 155"
        stroke="url(#blueprint-stroke)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M226 154C235 143 246 138 260 138C274 138 285 143 294 154"
        stroke="url(#blueprint-stroke)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path d="M198 438C218 433 238 430 260 430C282 430 302 433 322 438" stroke="url(#blueprint-stroke)" strokeWidth="3" strokeLinecap="round" />
      <path d="M206 248H314" stroke="url(#blueprint-stroke)" strokeWidth="2.5" strokeDasharray="8 10" />
      <path d="M203 292H317" stroke="url(#blueprint-stroke)" strokeWidth="2.5" strokeDasharray="8 10" />
      <path d="M201 336H319" stroke="url(#blueprint-stroke)" strokeWidth="2.5" strokeDasharray="8 10" />
      <path d="M201 380H319" stroke="url(#blueprint-stroke)" strokeWidth="2.5" strokeDasharray="8 10" />
      <path d="M198 438L184 231" stroke="url(#blueprint-stroke)" strokeWidth="2" />
      <path d="M322 438L336 231" stroke="url(#blueprint-stroke)" strokeWidth="2" />
      <path d="M260 248V424" stroke="url(#blueprint-stroke)" strokeWidth="1.6" strokeDasharray="5 10" opacity="0.35" />

      <line x1="94" y1="202" x2="94" y2="542" stroke="rgba(41,54,58,0.12)" strokeDasharray="6 8" />
      <line x1="426" y1="202" x2="426" y2="542" stroke="rgba(41,54,58,0.12)" strokeDasharray="6 8" />
      <line x1="172" y1="552" x2="348" y2="552" stroke="rgba(41,54,58,0.12)" strokeDasharray="6 8" />

      <text x="77" y="196" fill="#516170" fontSize="14" letterSpacing="4">FIT</text>
      <text x="432" y="196" fill="#516170" fontSize="14" letterSpacing="4">FORM</text>
      <text x="260" y="544" fill="#516170" fontSize="14" letterSpacing="4" textAnchor="middle">FABRIC</text>
    </svg>
  )
}
