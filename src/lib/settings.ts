import { prisma } from '@/lib/prisma'

export type SiteSettings = Record<string, string>

const defaults: SiteSettings = {
  siteName: 'SABMA',
  fullName: 'South African Black Mastiff Association',
  heroTitle1: 'South',
  heroTitle2: 'African',
  heroTitle3: 'Black Mastiff',
  heroSubtitle: 'Preserving bloodlines. Certifying excellence.',
  heroSubtitle2: "The definitive registry for South Africa's most distinguished breed.",
  heroImage: '/images/breed/black-mastiff-adult-studio.png',
  logoUrl: '',
  footerText: '',
  showMarqueeTicker: 'true',
  showAboutSection: 'true',
  showStatsSection: 'true',
  showBenefitsSection: 'true',
  showBreedersSection: 'true',
  showTestimonialsSection: 'true',
  showCtaSection: 'true',
}

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const rows = await prisma.siteSetting.findMany()
    const settings: SiteSettings = { ...defaults }
    for (const row of rows) {
      settings[row.key] = row.value
    }
    return settings
  } catch (error) {
    console.error('Failed to fetch site settings:', error)
    return defaults
  }
}

export function isSectionVisible(settings: SiteSettings, key: string): boolean {
  return settings[key] !== 'false'
}
