import {
  Inter,
  Source_Serif_4,
  JetBrains_Mono,
  IBM_Plex_Serif,
} from 'next/font/google'

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const source_serif_4 = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-serif',
})

export const jetbrains_mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const ibm_plex_serif = IBM_Plex_Serif({
  weight: ['400', '500', '600', '700'],
  style: ['italic', 'normal'],
  subsets: ['latin'],
})
