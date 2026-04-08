'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Edit, Trash2, X, Check, Loader2, Heart } from 'lucide-react'
import ImageUpload from '@/components/admin/ImageUpload'

interface Breeder {
  id: string
  name: string
  kennel: string
  owners: string
  location: string
  phone: string | null
  email: string | null
  image: string | null
  description: string | null
  active: boolean
  sortOrder: number
  createdAt: string
  updatedAt: string
}

const emptyForm = {
  name: '',
  kennel: '',
  owners: '',
  location: '',
  phone: '',
  email: '',
  image: '',
  description: '',
  sortOrder: 0,
  active: true,
}

export default function AdminBreedersPage() {
  const [breeders, setBreeders] = useState<Breeder[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<Breeder | null>(null)
  const [formData, setFormData] = useState(emptyForm)
  const [error, setError] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    fetchBreeders()
  }, [])

  async function fetchBreeders() {
    setIsLoading(true)
    try {
      const res = await fetch('/api/breeders?all=true')
      if (res.ok) {
        const data = await res.json()
        setBreeders(data)
      }
    } catch (err) {
      console.error('Error fetching breeders:', err)
      setError('Failed to load breeders')
    } finally {
      setIsLoading(false)
    }
  }

  function openAddForm() {
    setEditingItem(null)
    setFormData({ ...emptyForm, sortOrder: breeders.length })
    setShowForm(true)
    setError('')
  }

  function openEditForm(breeder: Breeder) {
    setEditingItem(breeder)
    setFormData({
      name: breeder.name,
      kennel: breeder.kennel,
      owners: breeder.owners,
      location: breeder.location,
      phone: breeder.phone || '',
      email: breeder.email || '',
      image: breeder.image || '',
      description: breeder.description || '',
      sortOrder: breeder.sortOrder,
      active: breeder.active,
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
      const url = editingItem ? `/api/breeders/${editingItem.id}` : '/api/breeders'
      const method = editingItem ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          sortOrder: Number(formData.sortOrder),
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to save breeder')
      }

      closeForm()
      fetchBreeders()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this breeder?')) return

    try {
      const res = await fetch(`/api/breeders/${id}`, { method: 'DELETE' })
      if (res.ok) {
        fetchBreeders()
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to delete breeder')
      }
    } catch (err) {
      console.error('Error deleting breeder:', err)
      setError('Failed to delete breeder')
    }
  }

  async function toggleActive(breeder: Breeder) {
    try {
      const res = await fetch(`/api/breeders/${breeder.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: breeder.name,
          kennel: breeder.kennel,
          owners: breeder.owners,
          location: breeder.location,
          phone: breeder.phone || '',
          email: breeder.email || '',
          image: breeder.image || '',
          description: breeder.description || '',
          sortOrder: breeder.sortOrder,
          active: !breeder.active,
        }),
      })

      if (res.ok) {
        fetchBreeders()
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
            Breeder Management
          </h1>
          <p className="mt-2 text-warm-600">
            Manage accredited breeders displayed on the public site
          </p>
        </div>
        <Button onClick={openAddForm}>
          <Plus className="w-4 h-4 mr-2" />
          Add Breeder
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
              {editingItem ? 'Edit Breeder' : 'Add Breeder'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Breeder Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="kennel">Kennel Name *</Label>
                  <Input
                    id="kennel"
                    value={formData.kennel}
                    onChange={(e) => setFormData({ ...formData, kennel: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="owners">Owners *</Label>
                  <Input
                    id="owners"
                    value={formData.owners}
                    onChange={(e) => setFormData({ ...formData, owners: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g., Johannesburg, Gauteng"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <ImageUpload
                    value={formData.image}
                    onChange={(url) => setFormData({ ...formData, image: url })}
                    folder="breeders"
                    label="Photo"
                  />
                </div>
                <div>
                  <Label htmlFor="sortOrder">Sort Order</Label>
                  <Input
                    id="sortOrder"
                    type="number"
                    value={formData.sortOrder}
                    onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
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
                <Label htmlFor="active" className="cursor-pointer">Active (visible on public site)</Label>
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
                    'Update Breeder'
                  ) : (
                    'Add Breeder'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Breeders List */}
      {breeders.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Heart className="mx-auto h-12 w-12 text-warm-400" />
            <h3 className="mt-4 text-lg font-medium text-espresso">
              No breeders yet
            </h3>
            <p className="mt-2 text-warm-500">
              Add your first accredited breeder to get started.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>All Breeders ({breeders.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-warm-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-warm-600">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-warm-600">Kennel</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-warm-600">Owners</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-warm-600">Location</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-warm-600">Status</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-warm-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {breeders.map((breeder) => (
                    <tr key={breeder.id} className="border-b border-warm-100 hover:bg-warm-50">
                      <td className="py-3 px-4">
                        <span className="font-medium text-espresso">{breeder.name}</span>
                      </td>
                      <td className="py-3 px-4 text-sm text-warm-600">{breeder.kennel}</td>
                      <td className="py-3 px-4 text-sm text-warm-600">{breeder.owners}</td>
                      <td className="py-3 px-4 text-sm text-warm-600">{breeder.location}</td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => toggleActive(breeder)}
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                            breeder.active
                              ? 'bg-green-100 text-green-700 hover:bg-green-200'
                              : 'bg-warm-100 text-warm-500 hover:bg-warm-200'
                          }`}
                        >
                          {breeder.active ? (
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
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditForm(breeder)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(breeder.id)}
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
