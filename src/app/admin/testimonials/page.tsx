'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Edit, Trash2, X, Check, Loader2, MessageSquare } from 'lucide-react'
import ImageUpload from '@/components/admin/ImageUpload'

interface Testimonial {
  id: string
  name: string
  quote: string
  image: string | null
  active: boolean
  sortOrder: number
  createdAt: string
  updatedAt: string
}

const emptyForm = {
  name: '',
  quote: '',
  image: '',
  sortOrder: 0,
  active: true,
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null)
  const [formData, setFormData] = useState(emptyForm)
  const [error, setError] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  async function fetchTestimonials() {
    setIsLoading(true)
    try {
      const res = await fetch('/api/testimonials?all=true')
      if (res.ok) {
        const data = await res.json()
        setTestimonials(data)
      }
    } catch (err) {
      console.error('Error fetching testimonials:', err)
      setError('Failed to load testimonials')
    } finally {
      setIsLoading(false)
    }
  }

  function openAddForm() {
    setEditingItem(null)
    setFormData({ ...emptyForm, sortOrder: testimonials.length })
    setShowForm(true)
    setError('')
  }

  function openEditForm(testimonial: Testimonial) {
    setEditingItem(testimonial)
    setFormData({
      name: testimonial.name,
      quote: testimonial.quote,
      image: testimonial.image || '',
      sortOrder: testimonial.sortOrder,
      active: testimonial.active,
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
      const url = editingItem ? `/api/testimonials/${editingItem.id}` : '/api/testimonials'
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
        throw new Error(data.error || 'Failed to save testimonial')
      }

      closeForm()
      fetchTestimonials()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this testimonial?')) return

    try {
      const res = await fetch(`/api/testimonials/${id}`, { method: 'DELETE' })
      if (res.ok) {
        fetchTestimonials()
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to delete testimonial')
      }
    } catch (err) {
      console.error('Error deleting testimonial:', err)
      setError('Failed to delete testimonial')
    }
  }

  async function toggleActive(testimonial: Testimonial) {
    try {
      const res = await fetch(`/api/testimonials/${testimonial.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: testimonial.name,
          quote: testimonial.quote,
          image: testimonial.image || '',
          sortOrder: testimonial.sortOrder,
          active: !testimonial.active,
        }),
      })

      if (res.ok) {
        fetchTestimonials()
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
            Testimonials Management
          </h1>
          <p className="mt-2 text-warm-600">
            Manage testimonials displayed on the public site
          </p>
        </div>
        <Button onClick={openAddForm}>
          <Plus className="w-4 h-4 mr-2" />
          Add Testimonial
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
              {editingItem ? 'Edit Testimonial' : 'Add Testimonial'}
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
                  <ImageUpload
                    value={formData.image}
                    onChange={(url) => setFormData({ ...formData, image: url })}
                    folder="testimonials"
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
                  <Label htmlFor="quote">Quote *</Label>
                  <textarea
                    id="quote"
                    value={formData.quote}
                    onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                    required
                    rows={4}
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
                    'Update Testimonial'
                  ) : (
                    'Add Testimonial'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Testimonials List */}
      {testimonials.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <MessageSquare className="mx-auto h-12 w-12 text-warm-400" />
            <h3 className="mt-4 text-lg font-medium text-espresso">
              No testimonials yet
            </h3>
            <p className="mt-2 text-warm-500">
              Add your first testimonial to get started.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id}>
              <CardContent className="py-4 px-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-espresso">{testimonial.name}</h3>
                      <button
                        onClick={() => toggleActive(testimonial)}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                          testimonial.active
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-warm-100 text-warm-500 hover:bg-warm-200'
                        }`}
                      >
                        {testimonial.active ? (
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
                    </div>
                    <p className="text-sm text-warm-600 line-clamp-3">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditForm(testimonial)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(testimonial.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
