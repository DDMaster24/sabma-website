'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Edit, Trash2, X, Check, Loader2, BookOpen, ExternalLink } from 'lucide-react'

interface Resource {
  id: string
  title: string
  description: string | null
  category: string
  icon: string | null
  link: string | null
  available: boolean
  sortOrder: number
  active: boolean
  createdAt: string
  updatedAt: string
}

const emptyForm = {
  title: '',
  description: '',
  category: '',
  icon: '',
  link: '',
  available: false,
  sortOrder: 0,
  active: true,
}

export default function AdminResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<Resource | null>(null)
  const [formData, setFormData] = useState(emptyForm)
  const [error, setError] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    fetchResources()
  }, [])

  async function fetchResources() {
    setIsLoading(true)
    try {
      const res = await fetch('/api/resources?all=true')
      if (res.ok) {
        const data = await res.json()
        setResources(data)
      }
    } catch (err) {
      console.error('Error fetching resources:', err)
      setError('Failed to load resources')
    } finally {
      setIsLoading(false)
    }
  }

  function openAddForm() {
    setEditingItem(null)
    setFormData({ ...emptyForm, sortOrder: resources.length })
    setShowForm(true)
    setError('')
  }

  function openEditForm(resource: Resource) {
    setEditingItem(resource)
    setFormData({
      title: resource.title,
      description: resource.description || '',
      category: resource.category,
      icon: resource.icon || '',
      link: resource.link || '',
      available: resource.available,
      sortOrder: resource.sortOrder,
      active: resource.active,
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
      const url = editingItem ? `/api/resources/${editingItem.id}` : '/api/resources'
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
        throw new Error(data.error || 'Failed to save resource')
      }

      closeForm()
      fetchResources()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this resource?')) return

    try {
      const res = await fetch(`/api/resources/${id}`, { method: 'DELETE' })
      if (res.ok) {
        fetchResources()
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to delete resource')
      }
    } catch (err) {
      console.error('Error deleting resource:', err)
      setError('Failed to delete resource')
    }
  }

  async function toggleAvailable(resource: Resource) {
    try {
      const res = await fetch(`/api/resources/${resource.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: resource.title,
          description: resource.description || '',
          category: resource.category,
          icon: resource.icon || '',
          link: resource.link || '',
          available: !resource.available,
          sortOrder: resource.sortOrder,
          active: resource.active,
        }),
      })

      if (res.ok) {
        fetchResources()
      }
    } catch (err) {
      console.error('Error toggling available status:', err)
    }
  }

  async function toggleActive(resource: Resource) {
    try {
      const res = await fetch(`/api/resources/${resource.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: resource.title,
          description: resource.description || '',
          category: resource.category,
          icon: resource.icon || '',
          link: resource.link || '',
          available: resource.available,
          sortOrder: resource.sortOrder,
          active: !resource.active,
        }),
      })

      if (res.ok) {
        fetchResources()
      }
    } catch (err) {
      console.error('Error toggling active status:', err)
    }
  }

  // Group resources by category
  const grouped = resources.reduce<Record<string, Resource[]>>((acc, resource) => {
    const cat = resource.category || 'Uncategorized'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(resource)
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-espresso">
            Resources Management
          </h1>
          <p className="mt-2 text-warm-600">
            Manage downloadable resources displayed on the public site
          </p>
        </div>
        <Button onClick={openAddForm}>
          <Plus className="w-4 h-4 mr-2" />
          Add Resource
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
              {editingItem ? 'Edit Resource' : 'Add Resource'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g., Forms, Guides, Standards"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="link">Download Link</Label>
                  <Input
                    id="link"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    placeholder="https://..."
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="icon">Icon Name</Label>
                  <Input
                    id="icon"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="e.g., FileText, Download"
                    className="mt-1"
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
                    rows={2}
                    className="mt-1 w-full px-4 py-2 rounded-xl border border-warm-300 bg-white text-espresso placeholder:text-warm-400 focus:outline-none focus:ring-2 focus:ring-bronze-500/20 focus:border-bronze-500"
                  />
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="available"
                    checked={formData.available}
                    onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                    className="w-4 h-4 rounded border-warm-300 text-bronze-600 focus:ring-bronze-500"
                  />
                  <Label htmlFor="available" className="cursor-pointer">Available for download</Label>
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
                    'Update Resource'
                  ) : (
                    'Add Resource'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Resources List (Grouped by Category) */}
      {resources.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-warm-400" />
            <h3 className="mt-4 text-lg font-medium text-espresso">
              No resources yet
            </h3>
            <p className="mt-2 text-warm-500">
              Add your first resource to get started.
            </p>
          </CardContent>
        </Card>
      ) : (
        Object.entries(grouped).map(([category, items]) => (
          <Card key={category}>
            <CardHeader>
              <CardTitle>{category} ({items.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-warm-100">
                {items.map((resource) => (
                  <div
                    key={resource.id}
                    className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <h3 className="font-medium text-espresso">{resource.title}</h3>
                        {resource.link && (
                          <ExternalLink className="w-3.5 h-3.5 text-warm-400 flex-shrink-0" />
                        )}
                      </div>
                      {resource.description && (
                        <p className="text-sm text-warm-500 mt-1 truncate">{resource.description}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                      <button
                        onClick={() => toggleAvailable(resource)}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                          resource.available
                            ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                            : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                        }`}
                      >
                        {resource.available ? 'Published' : 'Coming Soon'}
                      </button>
                      <button
                        onClick={() => toggleActive(resource)}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                          resource.active
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-warm-100 text-warm-500 hover:bg-warm-200'
                        }`}
                      >
                        {resource.active ? (
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
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditForm(resource)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(resource.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}
