'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, Settings, Check } from 'lucide-react'

const settingsFields = [
  { key: 'siteName', label: 'Site Name', placeholder: 'SABMA', group: 'General' },
  { key: 'fullName', label: 'Full Name', placeholder: 'South African Black Mastiff Association', group: 'General' },
  { key: 'description', label: 'Site Description', placeholder: 'A brief description of the organization', group: 'General' },
  { key: 'phone', label: 'Phone Number', placeholder: '+27 ...', group: 'Contact' },
  { key: 'whatsapp', label: 'WhatsApp Number', placeholder: '+27 ...', group: 'Contact' },
  { key: 'email', label: 'Email Address', placeholder: 'info@sabma.org', group: 'Contact' },
  { key: 'address', label: 'Physical Address', placeholder: 'City, Province, South Africa', group: 'Contact' },
  { key: 'facebookUrl', label: 'Facebook URL', placeholder: 'https://facebook.com/...', group: 'Social Media' },
  { key: 'instagramUrl', label: 'Instagram URL', placeholder: 'https://instagram.com/...', group: 'Social Media' },
]

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

      // Clear success message after 3 seconds
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

  // Group fields by their group
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
          Manage global site settings, contact information, and social media links
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
        {Object.entries(groups).map(([groupName, fields]) => (
          <Card key={groupName}>
            <CardHeader>
              <CardTitle>{groupName}</CardTitle>
              <CardDescription>
                {groupName === 'General' && 'Basic information about the organization'}
                {groupName === 'Contact' && 'Contact details displayed across the site'}
                {groupName === 'Social Media' && 'Social media profile links'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fields.map((field) => (
                  <div key={field.key} className={field.key === 'description' || field.key === 'address' ? 'md:col-span-2' : ''}>
                    <Label htmlFor={field.key}>{field.label}</Label>
                    {field.key === 'description' ? (
                      <textarea
                        id={field.key}
                        value={settings[field.key] || ''}
                        onChange={(e) => updateSetting(field.key, e.target.value)}
                        placeholder={field.placeholder}
                        rows={3}
                        className="mt-1 w-full px-4 py-2 rounded-xl border border-warm-300 bg-white text-espresso placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-bronze-500/20 focus:border-bronze-500"
                      />
                    ) : (
                      <Input
                        id={field.key}
                        value={settings[field.key] || ''}
                        onChange={(e) => updateSetting(field.key, e.target.value)}
                        placeholder={field.placeholder}
                        className="mt-1"
                      />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}

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
