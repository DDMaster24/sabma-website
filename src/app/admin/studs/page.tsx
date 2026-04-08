'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Edit, Trash2, X, Check, Loader2, Award } from 'lucide-react'
import ImageUpload from '@/components/admin/ImageUpload'

interface StudDog {
  id: string
  name: string
  lineage: string | null
  classification: string
  image: string | null
  description: string | null
  active: boolean
  sortOrder: number
  createdAt: string
  updatedAt: string
}

const emptyForm = {
  name: '',
  lineage: '',
  classification: 'BRONZE',
  image: '',
  description: '',
  sortOrder: 0,
  active: true,
}

const classificationBadge: Record<string, string> = {
  BRONZE: 'bg-amber-100 text-amber-800',
  SILVER: 'bg-slate-100 text-slate-700',
  GOLD: 'bg-yellow-100 text-yellow-800',
}

export default function AdminStudsPage() {
  const [studs, setStuds] = useState<StudDog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<StudDog | null>(null)
  const [formData, setFormData] = useState(emptyForm)
  const [error, setError] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    fetchStuds()
  }, [])

  async function fetchStuds() {
    setIsLoading(true)
    try {
      const res = await fetch('/api/studs?all=true')
      if (res.ok) {
        const data = await res.json()
        setStuds(data)
      }
    } catch (err) {
      console.error('Error fetching stud dogs:', err)
      setError('Failed to load stud dogs')
    } finally {
      setIsLoading(false)
    }
  }

  function openAddForm() {
    setEditingItem(null)
    setFormData({ ...emptyForm, sortOrder: studs.length })
    setShowForm(true)
    setError('')
  }

  function openEditForm(stud: StudDog) {
    setEditingItem(stud)
    setFormData({
      name: stud.name,
      lineage: stud.lineage || '',
      classification: stud.classification,
      image: stud.image || '',
      description: stud.description || '',
      sortOrder: stud.sortOrder,
      active: stud.active,
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
      const url = editingItem ? `/api/studs/${editingItem.id}` : '/api/studs'
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
        throw new Error(data.error || 'Failed to save stud dog')
      }

      closeForm()
      fetchStuds()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this stud dog?')) return

    try {
      const res = await fetch(`/api/studs/${id}`, { method: 'DELETE' })
      if (res.ok) {
        fetchStuds()
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to delete stud dog')
      }
    } catch (err) {
      console.error('Error deleting stud dog:', err)
      setError('Failed to delete stud dog')
    }
  }

  async function toggleActive(stud: StudDog) {
    try {
      const res = await fetch(`/api/studs/${stud.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: stud.name,
          lineage: stud.lineage || '',
          classification: stud.classification,
          image: stud.image || '',
          description: stud.description || '',
          sortOrder: stud.sortOrder,
          active: !stud.active,
        }),
      })

      if (res.ok) {
        fetchStuds()
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
            Stud Dog Management
          </h1>
          <p className="mt-2 text-warm-600">
            Manage stud dogs displayed on the public stud register
          </p>
        </div>
        <Button onClick={openAddForm}>
          <Plus className="w-4 h-4 mr-2" />
          Add Stud Dog
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
              {editingItem ? 'Edit Stud Dog' : 'Add Stud Dog'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="lineage">Lineage</Label>
                  <Input
                    id="lineage"
                    value={formData.lineage}
                    onChange={(e) => setFormData({ ...formData, lineage: e.target.value })}
                    placeholder="e.g., Sire x Dam"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="classification">Classification *</Label>
                  <select
                    id="classification"
                    value={formData.classification}
                    onChange={(e) => setFormData({ ...formData, classification: e.target.value })}
                    className="mt-1 flex h-11 w-full rounded-xl border border-warm-300 bg-white px-4 py-2 text-base text-espresso focus:outline-none focus:ring-2 focus:ring-bronze-500/20 focus:border-bronze-500"
                  >
                    <option value="BRONZE">Bronze</option>
                    <option value="SILVER">Silver</option>
                    <option value="GOLD">Gold</option>
                  </select>
                </div>
                <div>
                  <ImageUpload
                    value={formData.image}
                    onChange={(url) => setFormData({ ...formData, image: url })}
                    folder="studs"
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
                    'Update Stud Dog'
                  ) : (
                    'Add Stud Dog'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Studs List */}
      {studs.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Award className="mx-auto h-12 w-12 text-warm-400" />
            <h3 className="mt-4 text-lg font-medium text-espresso">
              No stud dogs yet
            </h3>
            <p className="mt-2 text-warm-500">
              Add your first stud dog to get started.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>All Stud Dogs ({studs.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-warm-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-warm-600">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-warm-600">Lineage</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-warm-600">Classification</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-warm-600">Status</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-warm-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {studs.map((stud) => (
                    <tr key={stud.id} className="border-b border-warm-100 hover:bg-warm-50">
                      <td className="py-3 px-4">
                        <span className="font-medium text-espresso">{stud.name}</span>
                      </td>
                      <td className="py-3 px-4 text-sm text-warm-600">
                        {stud.lineage || '-'}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            classificationBadge[stud.classification] || 'bg-warm-100 text-warm-600'
                          }`}
                        >
                          <Award className="w-3 h-3 mr-1" />
                          {stud.classification}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => toggleActive(stud)}
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                            stud.active
                              ? 'bg-green-100 text-green-700 hover:bg-green-200'
                              : 'bg-warm-100 text-warm-500 hover:bg-warm-200'
                          }`}
                        >
                          {stud.active ? (
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
                            onClick={() => openEditForm(stud)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(stud.id)}
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
