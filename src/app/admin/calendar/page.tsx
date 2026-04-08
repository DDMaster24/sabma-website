'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Edit, Trash2, X, Check, Loader2, Calendar } from 'lucide-react'

interface CalendarEvent {
  id: string
  title: string
  date: string
  time: string | null
  location: string | null
  type: string
  description: string | null
  active: boolean
  createdAt: string
  updatedAt: string
}

const emptyForm = {
  title: '',
  date: '',
  time: '',
  location: '',
  type: 'Event',
  description: '',
  active: true,
}

const eventTypeBadge: Record<string, string> = {
  Appraisal: 'bg-purple-100 text-purple-700',
  Meeting: 'bg-blue-100 text-blue-700',
  Seminar: 'bg-teal-100 text-teal-700',
  Show: 'bg-amber-100 text-amber-700',
  Event: 'bg-warm-100 text-warm-600',
}

export default function AdminCalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<CalendarEvent | null>(null)
  const [formData, setFormData] = useState(emptyForm)
  const [error, setError] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    fetchEvents()
  }, [])

  async function fetchEvents() {
    setIsLoading(true)
    try {
      const res = await fetch('/api/calendar?all=true')
      if (res.ok) {
        const data = await res.json()
        setEvents(data)
      }
    } catch (err) {
      console.error('Error fetching events:', err)
      setError('Failed to load events')
    } finally {
      setIsLoading(false)
    }
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  function toInputDate(dateString: string) {
    const d = new Date(dateString)
    return d.toISOString().split('T')[0]
  }

  function openAddForm() {
    setEditingItem(null)
    setFormData(emptyForm)
    setShowForm(true)
    setError('')
  }

  function openEditForm(event: CalendarEvent) {
    setEditingItem(event)
    setFormData({
      title: event.title,
      date: toInputDate(event.date),
      time: event.time || '',
      location: event.location || '',
      type: event.type,
      description: event.description || '',
      active: event.active,
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
      const url = editingItem ? `/api/calendar/${editingItem.id}` : '/api/calendar'
      const method = editingItem ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to save event')
      }

      closeForm()
      fetchEvents()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this event?')) return

    try {
      const res = await fetch(`/api/calendar/${id}`, { method: 'DELETE' })
      if (res.ok) {
        fetchEvents()
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to delete event')
      }
    } catch (err) {
      console.error('Error deleting event:', err)
      setError('Failed to delete event')
    }
  }

  async function toggleActive(event: CalendarEvent) {
    try {
      const res = await fetch(`/api/calendar/${event.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: event.title,
          date: toInputDate(event.date),
          time: event.time || '',
          location: event.location || '',
          type: event.type,
          description: event.description || '',
          active: !event.active,
        }),
      })

      if (res.ok) {
        fetchEvents()
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
            Events Management
          </h1>
          <p className="mt-2 text-warm-600">
            Manage events displayed on the public calendar
          </p>
        </div>
        <Button onClick={openAddForm}>
          <Plus className="w-4 h-4 mr-2" />
          Add Event
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
              {editingItem ? 'Edit Event' : 'Add Event'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
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
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    placeholder="e.g., 09:00 - 16:00"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g., Johannesburg"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="type">Event Type</Label>
                  <select
                    id="type"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="mt-1 flex h-11 w-full rounded-xl border border-warm-300 bg-white px-4 py-2 text-base text-espresso focus:outline-none focus:ring-2 focus:ring-bronze-500/20 focus:border-bronze-500"
                  >
                    <option value="Event">Event</option>
                    <option value="Appraisal">Appraisal</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Show">Show</option>
                  </select>
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
                    'Update Event'
                  ) : (
                    'Add Event'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Events List */}
      {events.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Calendar className="mx-auto h-12 w-12 text-warm-400" />
            <h3 className="mt-4 text-lg font-medium text-espresso">
              No events yet
            </h3>
            <p className="mt-2 text-warm-500">
              Add your first event to get started.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>All Events ({events.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-warm-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-warm-600">Title</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-warm-600">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-warm-600">Time</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-warm-600">Location</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-warm-600">Type</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-warm-600">Status</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-warm-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <tr key={event.id} className="border-b border-warm-100 hover:bg-warm-50">
                      <td className="py-3 px-4">
                        <span className="font-medium text-espresso">{event.title}</span>
                      </td>
                      <td className="py-3 px-4 text-sm text-warm-600">
                        {formatDate(event.date)}
                      </td>
                      <td className="py-3 px-4 text-sm text-warm-600">
                        {event.time || '-'}
                      </td>
                      <td className="py-3 px-4 text-sm text-warm-600">
                        {event.location || '-'}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            eventTypeBadge[event.type] || eventTypeBadge['Event']
                          }`}
                        >
                          {event.type}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => toggleActive(event)}
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                            event.active
                              ? 'bg-green-100 text-green-700 hover:bg-green-200'
                              : 'bg-warm-100 text-warm-500 hover:bg-warm-200'
                          }`}
                        >
                          {event.active ? (
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
                            onClick={() => openEditForm(event)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(event.id)}
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
