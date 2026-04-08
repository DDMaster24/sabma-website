'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, Settings, Check } from 'lucide-react'
import ImageUpload from '@/components/admin/ImageUpload'

const settingsFields = [
  // General
  { key: 'siteName', label: 'Site Name', placeholder: 'SABMA', group: 'General', type: 'text' },
  { key: 'fullName', label: 'Full Name', placeholder: 'South African Black Mastiff Association', group: 'General', type: 'text' },
  { key: 'description', label: 'Site Description', placeholder: 'A brief description of the organization', group: 'General', type: 'textarea' },
  // Contact
  { key: 'phone', label: 'Phone Number', placeholder: '+27 ...', group: 'Contact', type: 'text' },
  { key: 'whatsapp', label: 'WhatsApp Number', placeholder: '+27 ...', group: 'Contact', type: 'text' },
  { key: 'email', label: 'Email Address', placeholder: 'info@sabma.org', group: 'Contact', type: 'text' },
  { key: 'address', label: 'Physical Address', placeholder: 'City, Province, South Africa', group: 'Contact', type: 'text' },
  // Social Media
  { key: 'facebookUrl', label: 'Facebook URL', placeholder: 'https://facebook.com/...', group: 'Social Media', type: 'text' },
  { key: 'instagramUrl', label: 'Instagram URL', placeholder: 'https://instagram.com/...', group: 'Social Media', type: 'text' },
  // Hero Section
  { key: 'heroTitle1', label: 'Hero Line 1', placeholder: 'South', group: 'Hero Section', type: 'text' },
  { key: 'heroTitle2', label: 'Hero Line 2', placeholder: 'African', group: 'Hero Section', type: 'text' },
  { key: 'heroTitle3', label: 'Hero Line 3 (highlighted)', placeholder: 'Black Mastiff', group: 'Hero Section', type: 'text' },
  { key: 'heroSubtitle', label: 'Subtitle', placeholder: 'Preserving bloodlines. Certifying excellence.', group: 'Hero Section', type: 'text' },
  { key: 'heroSubtitle2', label: 'Secondary Subtitle', placeholder: 'The definitive registry for...', group: 'Hero Section', type: 'text' },
  { key: 'heroImage', label: 'Hero Image', placeholder: '', group: 'Hero Section', type: 'image' },
  // Branding
  { key: 'logoUrl', label: 'Site Logo', placeholder: '', group: 'Branding', type: 'image' },
  { key: 'footerText', label: 'Footer Tagline', placeholder: 'Preserving the legacy of the South African Black Mastiff', group: 'Branding', type: 'text' },
]

const sectionToggles = [
  { key: 'showMarqueeTicker', label: 'Marquee Ticker', description: 'Scrolling banner with registry highlights' },
  { key: 'showAboutSection', label: 'About Section', description: 'Heritage story with breed image' },
  { key: 'showStatsSection', label: 'Statistics Section', description: 'Numbers: registered dogs, breeders, etc.' },
  { key: 'showBenefitsSection', label: 'Benefits Section', description: 'Membership benefits cards' },
  { key: 'showBreedersSection', label: 'Breeders Section', description: 'Featured accredited breeders' },
  { key: 'showTestimonialsSection', label: 'Testimonials Section', description: 'Member testimonials' },
  { key: 'showCtaSection', label: 'Call to Action Section', description: 'Find your puppy / contact CTA' },
]

const groupDescriptions: Record<string, string> = {
  'General': 'Basic information about the organization',
  'Contact': 'Contact details displayed across the site',
  'Social Media': 'Social media profile links',
  'Hero Section': 'Customize the main hero banner on the homepage',
  'Branding': 'Logo and branding elements used across the site',
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    fetchSettings()
  }, [])

  async function fetchSettings() {
    setIsLoading(true)
    try {
      const res = await fetch('/api/site-settings')
      if (res.ok) {
        const data = await res.json()
        setSettings(data)
      }
    } catch (err) {
      console.error('Error fetching settings:', err)
      setError('Failed to load settings')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')
    setIsSaving(true)

    try {
      const res = await fetch('/api/site-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to save settings')
      }

      const updated = await res.json()
      setSettings(updated)
      setSuccess('Settings saved successfully!')
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsSaving(false)
    }
  }

  function updateSetting(key: string, value: string) {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  function toggleSection(key: string) {
    const current = settings[key]
    // Default to 'true' if not set, toggle to opposite
    const newValue = current === 'false' ? 'true' : 'false'
    setSettings((prev) => ({ ...prev, [key]: newValue }))
  }

  function isSectionVisible(key: string) {
    return settings[key] !== 'false'
  }

  // Group regular fields
  const groups = settingsFields.reduce<Record<string, typeof settingsFields>>((acc, field) => {
    if (!acc[field.group]) acc[field.group] = []
    acc[field.group].push(field)
    return acc
  }, {})

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-bronze-500" />
      </div>
    )
  }

  return (
    <div className="space-y-8 p-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold text-espresso">
          Site Settings
        </h1>
        <p className="mt-2 text-warm-600">
          Manage site content, branding, hero section, and homepage layout
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* Success */}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center gap-2">
          <Check className="w-4 h-4" />
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Regular settings groups */}
        {Object.entries(groups).map(([groupName, fields]) => (
          <Card key={groupName}>
            <CardHeader>
              <CardTitle>{groupName}</CardTitle>
              <CardDescription>{groupDescriptions[groupName]}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fields.map((field) => (
                  <div key={field.key} className={
                    field.type === 'textarea' || field.key === 'address' || field.type === 'image'
                      ? 'md:col-span-2' : ''
                  }>
                    {field.type === 'image' ? (
                      <ImageUpload
                        value={settings[field.key] || ''}
                        onChange={(url) => updateSetting(field.key, url)}
                        folder="branding"
                        label={field.label}
                      />
                    ) : field.type === 'textarea' ? (
                      <>
                        <Label htmlFor={field.key}>{field.label}</Label>
                        <textarea
                          id={field.key}
                          value={settings[field.key] || ''}
                          onChange={(e) => updateSetting(field.key, e.target.value)}
                          placeholder={field.placeholder}
                          rows={3}
                          className="mt-1 w-full px-4 py-2 rounded-xl border border-warm-300 bg-white text-espresso placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-bronze-500/20 focus:border-bronze-500"
                        />
                      </>
                    ) : (
                      <>
                        <Label htmlFor={field.key}>{field.label}</Label>
                        <Input
                          id={field.key}
                          value={settings[field.key] || ''}
                          onChange={(e) => updateSetting(field.key, e.target.value)}
                          placeholder={field.placeholder}
                          className="mt-1"
                        />
                      </>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Homepage Section Visibility */}
        <Card>
          <CardHeader>
            <CardTitle>Homepage Sections</CardTitle>
            <CardDescription>
              Toggle which sections appear on the homepage. Changes take effect immediately after saving.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sectionToggles.map((section) => (
                <div
                  key={section.key}
                  className="flex items-center justify-between p-4 rounded-xl border border-warm-200 hover:border-warm-300 transition-colors"
                >
                  <div className="flex-1">
                    <div className="font-medium text-espresso">{section.label}</div>
                    <div className="text-sm text-warm-500">{section.description}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleSection(section.key)}
                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                      isSectionVisible(section.key)
                        ? 'bg-bronze-500'
                        : 'bg-warm-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 rounded-full bg-white transition-transform shadow-sm ${
                        isSectionVisible(section.key) ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Settings className="w-4 h-4 mr-2" />
                Save Settings
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
