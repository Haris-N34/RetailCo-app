export type PromptVisualGarment = 'shirt' | 'pants'

export type PromptVisualColor =
  | 'blue'
  | 'white'
  | 'black'
  | 'grey'
  | 'beige'
  | 'green'
  | 'gold'

export interface PromptVisualRequest {
  garment: PromptVisualGarment
  color: PromptVisualColor
  label: string
  image: string
}

const colorPalette: Record<PromptVisualColor, { fill: string; accent: string; shadow: string; label: string }> = {
  blue: { fill: '#5f7fbe', accent: '#89a5de', shadow: '#d7e1f5', label: 'Blue' },
  white: { fill: '#f7f4ee', accent: '#ffffff', shadow: '#d8d2c8', label: 'White' },
  black: { fill: '#31353a', accent: '#5d646d', shadow: '#d6d9de', label: 'Black' },
  grey: { fill: '#8c939b', accent: '#b8bec4', shadow: '#d9dde1', label: 'Grey' },
  beige: { fill: '#c9b59a', accent: '#e4d3bd', shadow: '#e7ddd0', label: 'Beige' },
  green: { fill: '#6d8063', accent: '#94aa88', shadow: '#dce4d6', label: 'Green' },
  gold: { fill: '#c6a15b', accent: '#e0c887', shadow: '#ece0bf', label: 'Gold' },
}

function encodeSvg(svg: string) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

function buildShirtSvg(color: PromptVisualColor) {
  const palette = colorPalette[color]
  return encodeSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320">
      <rect width="320" height="320" rx="36" fill="#f4efe8"/>
      <ellipse cx="160" cy="266" rx="82" ry="18" fill="${palette.shadow}" opacity="0.55"/>
      <path d="M121 72l39 26 39-26 34 30-22 35v101c0 10-8 18-18 18H127c-10 0-18-8-18-18V137l-22-35 34-30z" fill="${palette.fill}"/>
      <path d="M160 98l-21-22h42l-21 22z" fill="${palette.accent}"/>
      <path d="M142 92h36l-8 28 11 118h-42l11-118-8-28z" fill="${palette.accent}" opacity="0.55"/>
      <path d="M109 137l-22-35 34-30 15 20-10 39-17 36zM211 137l22-35-34-30-15 20 10 39 17 36z" fill="${palette.accent}" opacity="0.88"/>
      <circle cx="160" cy="134" r="3.5" fill="#d9cab7"/>
      <circle cx="160" cy="156" r="3.5" fill="#d9cab7"/>
      <circle cx="160" cy="178" r="3.5" fill="#d9cab7"/>
    </svg>
  `)
}

function buildPantsSvg(color: PromptVisualColor) {
  const palette = colorPalette[color]
  return encodeSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 320">
      <rect width="320" height="320" rx="36" fill="#f4efe8"/>
      <ellipse cx="160" cy="276" rx="82" ry="18" fill="${palette.shadow}" opacity="0.55"/>
      <path d="M112 74h96l16 74-26 112h-35l-9-104-9 104h-35L94 148l18-74z" fill="${palette.fill}"/>
      <path d="M112 74h96l8 37H104l8-37z" fill="${palette.accent}" opacity="0.8"/>
      <path d="M160 111v148" stroke="${palette.accent}" stroke-width="4" opacity="0.75"/>
      <path d="M128 95v18M192 95v18" stroke="#d9cab7" stroke-width="3" stroke-linecap="round"/>
      <path d="M126 259h31M163 259h31" stroke="#c9baa8" stroke-width="6" stroke-linecap="round"/>
    </svg>
  `)
}

export function getPromptVisualImage(garment: PromptVisualGarment, color: PromptVisualColor) {
  return garment === 'shirt' ? buildShirtSvg(color) : buildPantsSvg(color)
}

export function createPromptVisualRequest(garment: PromptVisualGarment, color: PromptVisualColor): PromptVisualRequest {
  const label = `${colorPalette[color].label} ${garment}`
  return {
    garment,
    color,
    label,
    image: getPromptVisualImage(garment, color),
  }
}
