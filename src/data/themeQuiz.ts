export type ThemeName = 'ocean' | 'arcade' | 'minimal' | 'cyber'

export type ThemeQuizAnswer = {
  label: string
  theme: ThemeName
}

export type ThemeQuizQuestion = {
  prompt: string
  answers: ThemeQuizAnswer[]
}

export const themeDescriptions: Record<ThemeName, string> = {
  ocean: 'Calm, focused, and polished with deep blue and cyan accents.',
  arcade: 'Energetic, playful, and game-inspired with neon purple and blue.',
  minimal: 'Professional, clean, and subtle with a neutral visual system.',
  cyber: 'Futuristic, technical, and systems-inspired with electric accents.',
}

export const themeLabels: Record<ThemeName, string> = {
  ocean: 'Ocean',
  arcade: 'Arcade',
  minimal: 'Minimal',
  cyber: 'Cyber',
}

export const themeQuizQuestions: ThemeQuizQuestion[] = [
  {
    prompt: 'What kind of interface makes you want to keep exploring?',
    answers: [
      { label: 'A calm dashboard with clear priorities', theme: 'ocean' },
      { label: 'A bright, kinetic space with instant feedback', theme: 'arcade' },
      { label: 'A quiet layout where the content leads', theme: 'minimal' },
      { label: 'A technical command-center feel', theme: 'cyber' },
    ],
  },
  {
    prompt: 'How should a portfolio first impression feel?',
    answers: [
      { label: 'Composed and confident', theme: 'ocean' },
      { label: 'Playful and memorable', theme: 'arcade' },
      { label: 'Sharp and professional', theme: 'minimal' },
      { label: 'Inventive and advanced', theme: 'cyber' },
    ],
  },
  {
    prompt: 'Which detail would you notice first?',
    answers: [
      { label: 'Smooth gradients and polished contrast', theme: 'ocean' },
      { label: 'Neon highlights and punchy interactions', theme: 'arcade' },
      { label: 'Spacing, typography, and restraint', theme: 'minimal' },
      { label: 'Electric accents and layered depth', theme: 'cyber' },
    ],
  },
  {
    prompt: 'Pick a working style.',
    answers: [
      { label: 'Focused, steady, and intentional', theme: 'ocean' },
      { label: 'Experimental, fast, and expressive', theme: 'arcade' },
      { label: 'Organized, direct, and practical', theme: 'minimal' },
      { label: 'Analytical, technical, and systems-minded', theme: 'cyber' },
    ],
  },
  {
    prompt: 'What should the final theme say about the work?',
    answers: [
      { label: 'It is polished and thoughtfully built', theme: 'ocean' },
      { label: 'It has personality and creative energy', theme: 'arcade' },
      { label: 'It is clear, reliable, and easy to scan', theme: 'minimal' },
      { label: 'It is modern, technical, and future-facing', theme: 'cyber' },
    ],
  },
]
