'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Edit, Trash2, X, Check, Loader2, Building2, Eye, Dog } from 'lucide-react'

interface KennelItem {
  id: string
  name: string
  breederName: string | null
  country: string | null
  city: string | null
  region: string | null
  contactEmail: string | null
  contactPhone: string | null
  website: string | null
  logo: string | null
  description: string | null
  active: boolean
  createdAt: string
  updatedAt: string
  _count: {
    dogs: number
  }
}

const emptyForm = {
  name: '',
  breederName: '',
  country: 'South Africa',
  city: '',
  region: '',
  contactEmail: '',
  contactPhone: '',
  website: '',
  logo: '',
  description: '',
  active: true,
}

export default function AdminKennelsPage() {
  const [kennels, setKennels] = useState<KennelItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<KennelItem | null>(null)
  const [formData, setFormData] = useState(emptyForm)
  const [error, setError] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    fetchKennels()
  }, [])

  async function fetchKennels() {
    setIsLoading(true)
    try {
      const res = await fetch('/api/kennels')
      if (res.ok) {
        const data = await res.json()
        setKennels(data)
      }
    } catch (err) {
      console.error('Error fetching kennels:', err)
      setError('Failed to load kennels')
    } finally {
      setIsLoading(false)
    }
  }

  function openAddForm() {
    setEditingItem(null)
    setFormData(emptyForm)
    setShowForm(true)
    setError('')
  }

  function openEditForm(kennel: KennelItem) {
    setEditingItem(kennel)
    setFormData({
      name: kennel.name,
      breederName: kennel.breederName || '',
      country: kennel.country || 'South Africa',
      city: kennel.city || '',
      region: kennel.region || '',
      contactEmail: kennel.contactEmail || '',
      contactPhone: kennel.contactPhone || '',
      website: kennel.website || '',
      logo: kennel.logo || '',
      description: kennel.description || '',
      active: kennel.active,
    })
    setShowForm(true)
    setError('')
  }

  function closeForm() {
    setShowForm(false)
    setEditingItem(null)
    setFormData(emptyForm)
    setError('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setIsSaving(true)

    try {
      const url = editingItem ? `/api/kennels/${editingItem.id}` : '/api/kennels'
      const method = editingItem ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to save kennel')
      }

      closeForm()
      fetchKennels()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this kennel? This will unlink all associated dogs.')) return

    try {
      const res = await fetch(`/api/kennels/${id}`, { method: 'DELETE' })
      if (res.ok) {
        fetchKennels()
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to delete kennel')
      }
    } catch (err) {
      console.error('Error deleting kennel:', err)
      setError('Failed to delete kennel')
    }
  }

  async function toggleActive(kennel: KennelItem) {
    try {
      const res = await fetch(`/api/kennels/${kennel.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: kennel.name,
          breederName: kennel.breederName || '',
          country: kennel.country || '',
          city: kennel.city || '',
          region: kennel.region || '',
          contactEmail: kennel.contactEmail || '',
          contactPhone: kennel.contactPhone || '',
          website: kennel.website || '',
          logo: kennel.logo || '',
          description: kennel.description || '',
          active: !kennel.active,
        }),
      })

      if (res.ok) {
        fetchKennels()
      }
    } catch (err) {
      console.error('Error toggling active status:', err)
    }
  }

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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-espresso">
            Kennel Management
          </h1>
          <p className="mt-2 text-warm-600">
            Manage registered kennels in the SABMA registry
          </p>
        </div>
        <Button onClick={openAddForm}>
          <Plus className="w-4 h-4 mr-2" />
          Add Kennel
        </Button>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
          {error}
        </div>
      )}

      {/* Form */}
      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingItem ? 'Edit Kennel' : 'Add Kennel'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Kennel Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="breederName">Breeder Name</Label>
                  <Input
                    id="breederName"
                    value={formData.breederName}
                    onChange={(e) => setFormData({ ...formData, breederName: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="region">Region / Province</Label>
                  <Input
                    id="region"
                    value={formData.region}
                    onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                    placeholder="e.g., Gauteng, Western Cape"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="contactPhone">Phone</Label>
                  <Input
                    id="contactPhone"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="contactEmail">Email</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://..."
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="logo">Logo URL</Label>
                  <Input
                    id="logo"
                    value={formData.logo}
                    onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                    placeholder="https://..."
                    className="mt-1"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="description">Description</Label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="mt-1 w-full px-4 py-2 rounded-xl border border-warm-300 bg-white text-espresso placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-bronze-500/20 focus:border-bronze-500"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="active"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="w-4 h-4 rounded border-warm-300 text-bronze-600 focus:ring-bronze-500"
                />
                <Label htmlFor="active" className="cursor-pointer">Active</Label>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={closeForm}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : editingItem ? (
                    'Update Kennel'
                  ) : (
                    'Add Kennel'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Kennels List */}
      {kennels.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Building2 className="mx-auto h-12 w-12 text-warm-400" />
            <h3 className="mt-4 text-lg font-medium text-espresso">
              No kennels yet
            </h3>
            <p className="mt-2 text-warm-500">
              Add your first kennel to get started.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>All Kennels ({kennels.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-warm-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-warm-600">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-warm-600">Breeder</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-warm-600">Location</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-warm-600">Contact</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-warm-600">Dogs</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-warm-600">Status</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-warm-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {kennels.map((kennel) => (
                    <tr key={kennel.id} className="border-b border-warm-100 hover:bg-warm-50">
                      <td className="py-3 px-4">
                        <span className="font-medium text-espresso">{kennel.name}</span>
                      </td>
                      <td className="py-3 px-4 text-sm text-warm-600">
                        {kennel.breederName || '-'}
                      </td>
                      <td className="py-3 px-4 text-sm text-warm-600">
                        {[kennel.city, kennel.region].filter(Boolean).join(', ') || '-'}
                      </td>
                      <td className="py-3 px-4 text-sm text-warm-600">
                        {kennel.contactEmail || kennel.contactPhone || '-'}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-warm-100 text-warm-600 rounded-full text-xs font-medium">
                          <Dog className="w-3 h-3" />
                          {kennel._count.dogs}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => toggleActive(kennel)}
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                            kennel.active
                              ? 'bg-green-100 text-green-700 hover:bg-green-200'
                              : 'bg-warm-100 text-warm-500 hover:bg-warm-200'
                          }`}
                        >
                          {kennel.active ? (
                            <>
                              <Check className="w-3 h-3 mr-1" />
                              Active
                            </>
                          ) : (
                            <>
                              <X className="w-3 h-3 mr-1" />
                              Inactive
                            </>
                          )}
                        </button>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          {kennel._count.dogs > 0 && (
                            <Button variant="ghost" size="sm" asChild>
                              <Link href={`/admin/dogs?kennel=${kennel.id}`}>
                                <Eye className="w-4 h-4" />
                              </Link>
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditForm(kennel)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(kennel.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
