'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Trash2, X, Check, Loader2, Image as ImageIcon, Edit } from 'lucide-react'
import ImageUpload from '@/components/admin/ImageUpload'

interface GalleryImage {
  id: string
  src: string
  alt: string | null
  caption: string | null
  category: string | null
  sortOrder: number
  active: boolean
  createdAt: string
  updatedAt: string
}

const emptyForm = {
  src: '',
  alt: '',
  caption: '',
  category: '',
  sortOrder: 0,
  active: true,
}

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<GalleryImage | null>(null)
  const [formData, setFormData] = useState(emptyForm)
  const [error, setError] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    fetchImages()
  }, [])

  async function fetchImages() {
    setIsLoading(true)
    try {
      const res = await fetch('/api/gallery?all=true')
      if (res.ok) {
        const data = await res.json()
        setImages(data)
      }
    } catch (err) {
      console.error('Error fetching gallery images:', err)
      setError('Failed to load gallery images')
    } finally {
      setIsLoading(false)
    }
  }

  function openAddForm() {
    setEditingItem(null)
    setFormData({ ...emptyForm, sortOrder: images.length })
    setShowForm(true)
    setError('')
  }

  function openEditForm(image: GalleryImage) {
    setEditingItem(image)
    setFormData({
      src: image.src,
      alt: image.alt || '',
      caption: image.caption || '',
      category: image.category || '',
      sortOrder: image.sortOrder,
      active: image.active,
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
      const url = editingItem ? `/api/gallery/${editingItem.id}` : '/api/gallery'
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
        throw new Error(data.error || 'Failed to save gallery image')
      }

      closeForm()
      fetchImages()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this gallery image?')) return

    try {
      const res = await fetch(`/api/gallery/${id}`, { method: 'DELETE' })
      if (res.ok) {
        fetchImages()
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to delete gallery image')
      }
    } catch (err) {
      console.error('Error deleting gallery image:', err)
      setError('Failed to delete gallery image')
    }
  }

  async function toggleActive(image: GalleryImage) {
    try {
      const res = await fetch(`/api/gallery/${image.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          src: image.src,
          alt: image.alt || '',
          caption: image.caption || '',
          category: image.category || '',
          sortOrder: image.sortOrder,
          active: !image.active,
        }),
      })

      if (res.ok) {
        fetchImages()
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
            Gallery Management
          </h1>
          <p className="mt-2 text-warm-600">
            Manage photos displayed in the public gallery
          </p>
        </div>
        <Button onClick={openAddForm}>
          <Plus className="w-4 h-4 mr-2" />
          Add Image
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
              {editingItem ? 'Edit Gallery Image' : 'Add Gallery Image'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <ImageUpload
                    value={formData.src}
                    onChange={(url) => setFormData({ ...formData, src: url })}
                    folder="gallery"
                    label="Image"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="alt">Alt Text</Label>
                  <Input
                    id="alt"
                    value={formData.alt}
                    onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
                    placeholder="Description of the image"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="caption">Caption</Label>
                  <Input
                    id="caption"
                    value={formData.caption}
                    onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g., Events, Dogs, Shows"
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
                    'Update Image'
                  ) : (
                    'Add Image'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Gallery Grid */}
      {images.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <ImageIcon className="mx-auto h-12 w-12 text-warm-400" />
            <h3 className="mt-4 text-lg font-medium text-espresso">
              No gallery images yet
            </h3>
            <p className="mt-2 text-warm-500">
              Add your first gallery image to get started.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {images.map((image) => (
            <Card key={image.id} className={`overflow-hidden ${!image.active ? 'opacity-60' : ''}`}>
              <div className="aspect-square relative bg-warm-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.src}
                  alt={image.alt || 'Gallery image'}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = 'none'
                  }}
                />
                <div className="absolute top-2 right-2 flex gap-1">
                  <button
                    onClick={() => toggleActive(image)}
                    className={`p-1.5 rounded-lg backdrop-blur-sm transition-colors ${
                      image.active
                        ? 'bg-green-500/80 text-white hover:bg-green-600/80'
                        : 'bg-warm-500/80 text-white hover:bg-warm-600/80'
                    }`}
                  >
                    {image.active ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-sm font-medium text-espresso truncate">
                  {image.alt || image.caption || 'Untitled'}
                </p>
                {image.category && (
                  <span className="inline-block mt-1 px-2 py-0.5 bg-warm-100 text-warm-600 text-xs rounded-full">
                    {image.category}
                  </span>
                )}
                <div className="flex justify-end gap-1 mt-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEditForm(image)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(image.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
