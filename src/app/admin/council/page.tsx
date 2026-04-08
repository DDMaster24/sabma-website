'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Edit, Trash2, X, Check, Loader2, Shield, ChevronUp, ChevronDown } from 'lucide-react'
import ImageUpload from '@/components/admin/ImageUpload'

interface CouncilMember {
  id: string
  name: string
  role: string
  email: string | null
  phone: string | null
  image: string | null
  sortOrder: number
  active: boolean
  createdAt: string
  updatedAt: string
}

const emptyForm = {
  name: '',
  role: '',
  email: '',
  phone: '',
  image: '',
  sortOrder: 0,
  active: true,
}

export default function AdminCouncilPage() {
  const [members, setMembers] = useState<CouncilMember[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<CouncilMember | null>(null)
  const [formData, setFormData] = useState(emptyForm)
  const [error, setError] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    fetchMembers()
  }, [])

  async function fetchMembers() {
    setIsLoading(true)
    try {
      const res = await fetch('/api/council?all=true')
      if (res.ok) {
        const data = await res.json()
        setMembers(data)
      }
    } catch (err) {
      console.error('Error fetching council members:', err)
      setError('Failed to load council members')
    } finally {
      setIsLoading(false)
    }
  }

  function openAddForm() {
    setEditingItem(null)
    setFormData({ ...emptyForm, sortOrder: members.length })
    setShowForm(true)
    setError('')
  }

  function openEditForm(member: CouncilMember) {
    setEditingItem(member)
    setFormData({
      name: member.name,
      role: member.role,
      email: member.email || '',
      phone: member.phone || '',
      image: member.image || '',
      sortOrder: member.sortOrder,
      active: member.active,
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
      const url = editingItem ? `/api/council/${editingItem.id}` : '/api/council'
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
        throw new Error(data.error || 'Failed to save council member')
      }

      closeForm()
      fetchMembers()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this council member?')) return

    try {
      const res = await fetch(`/api/council/${id}`, { method: 'DELETE' })
      if (res.ok) {
        fetchMembers()
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to delete council member')
      }
    } catch (err) {
      console.error('Error deleting council member:', err)
      setError('Failed to delete council member')
    }
  }

  async function toggleActive(member: CouncilMember) {
    try {
      const res = await fetch(`/api/council/${member.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: member.name,
          role: member.role,
          email: member.email || '',
          phone: member.phone || '',
          image: member.image || '',
          sortOrder: member.sortOrder,
          active: !member.active,
        }),
      })

      if (res.ok) {
        fetchMembers()
      }
    } catch (err) {
      console.error('Error toggling active status:', err)
    }
  }

  async function moveItem(member: CouncilMember, direction: 'up' | 'down') {
    const currentIndex = members.findIndex(m => m.id === member.id)
    const swapIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1

    if (swapIndex < 0 || swapIndex >= members.length) return

    const otherMember = members[swapIndex]

    try {
      await Promise.all([
        fetch(`/api/council/${member.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: member.name,
            role: member.role,
            email: member.email || '',
            phone: member.phone || '',
            image: member.image || '',
            sortOrder: otherMember.sortOrder,
            active: member.active,
          }),
        }),
        fetch(`/api/council/${otherMember.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: otherMember.name,
            role: otherMember.role,
            email: otherMember.email || '',
            phone: otherMember.phone || '',
            image: otherMember.image || '',
            sortOrder: member.sortOrder,
            active: otherMember.active,
          }),
        }),
      ])

      fetchMembers()
    } catch (err) {
      console.error('Error reordering:', err)
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
            Council Members
          </h1>
          <p className="mt-2 text-warm-600">
            Manage the SABMA council members displayed on the public site
          </p>
        </div>
        <Button onClick={openAddForm}>
          <Plus className="w-4 h-4 mr-2" />
          Add Member
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
              {editingItem ? 'Edit Council Member' : 'Add Council Member'}
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
                  <Label htmlFor="role">Role *</Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g., Chairman, Vice-Chairman, Secretary"
                    required
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
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <ImageUpload
                    value={formData.image}
                    onChange={(url) => setFormData({ ...formData, image: url })}
                    folder="council"
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
                    'Update Member'
                  ) : (
                    'Add Member'
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Members List */}
      {members.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Shield className="mx-auto h-12 w-12 text-warm-400" />
            <h3 className="mt-4 text-lg font-medium text-espresso">
              No council members yet
            </h3>
            <p className="mt-2 text-warm-500">
              Add your first council member to get started.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>All Council Members ({members.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-warm-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-warm-600">Order</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-warm-600">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-warm-600">Role</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-warm-600">Email</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-warm-600">Phone</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-warm-600">Status</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-warm-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member, index) => (
                    <tr key={member.id} className="border-b border-warm-100 hover:bg-warm-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => moveItem(member, 'up')}
                            disabled={index === 0}
                            className="p-1 hover:bg-warm-100 rounded disabled:opacity-30"
                          >
                            <ChevronUp className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => moveItem(member, 'down')}
                            disabled={index === members.length - 1}
                            className="p-1 hover:bg-warm-100 rounded disabled:opacity-30"
                          >
                            <ChevronDown className="w-4 h-4" />
                          </button>
                          <span className="text-sm text-warm-400 ml-1">{member.sortOrder}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-espresso">{member.name}</span>
                      </td>
                      <td className="py-3 px-4 text-sm text-warm-600">{member.role}</td>
                      <td className="py-3 px-4 text-sm text-warm-600">{member.email || '-'}</td>
                      <td className="py-3 px-4 text-sm text-warm-600">{member.phone || '-'}</td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => toggleActive(member)}
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                            member.active
                              ? 'bg-green-100 text-green-700 hover:bg-green-200'
                              : 'bg-warm-100 text-warm-500 hover:bg-warm-200'
                          }`}
                        >
                          {member.active ? (
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
                            onClick={() => openEditForm(member)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(member.id)}
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
