'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Plus, Eye, Edit, Search, Trash2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface Dog {
  id: string
  registeredName: string
  registrationNumber: string | null
  sex: string
  dateOfBirth: string
  kennel: { name: string } | null
}

export default function AdminDogsPage() {
  const [dogs, setDogs] = useState<Dog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchDogs()
  }, [])

  async function fetchDogs(query = '') {
    setIsLoading(true)
    try {
      const url = query ? `/api/dogs?search=${encodeURIComponent(query)}` : '/api/dogs'
      const res = await fetch(url)
      if (res.ok) {
        const data = await res.json()
        setDogs(data)
      }
    } catch (err) {
      console.error('Error fetching dogs:', err)
    } finally {
      setIsLoading(false)
    }
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    fetchDogs(search)
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) return

    try {
      const res = await fetch(`/api/dogs/${id}`, { method: 'DELETE' })
      if (res.ok) {
        fetchDogs(search)
      } else {
        const data = await res.json()
        setError(data.error || 'Failed to delete dog')
      }
    } catch (err) {
      console.error('Error deleting dog:', err)
      setError('Failed to delete dog')
    }
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
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
            Manage Dogs
          </h1>
          <p className="mt-2 text-warm-600">
            Add, edit, and manage registered dogs.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/dogs/new">
            <Plus className="w-4 h-4 mr-2" />
            Add New Dog
          </Link>
        </Button>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
          {error}
          <button onClick={() => setError('')} className="ml-2 underline text-sm">dismiss</button>
        </div>
      )}

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <form onSubmit={handleSearch} className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-warm-400" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or registration number..."
                className="pl-10"
              />
            </div>
            <Button type="submit">Search</Button>
          </form>
        </CardContent>
      </Card>

      {/* Dogs List */}
      <Card>
        <CardHeader>
          <CardTitle>Registered Dogs ({dogs.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {dogs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-warm-500 mb-4">No dogs found.</p>
              <Button asChild>
                <Link href="/admin/dogs/new">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Dog
                </Link>
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-warm-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-warm-600">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-warm-600">Registration</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-warm-600">Sex</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-warm-600">DOB</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-warm-600">Kennel</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-warm-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dogs.map((dog) => (
                    <tr key={dog.id} className="border-b border-warm-100 hover:bg-warm-50">
                      <td className="py-3 px-4">
                        <span className="font-medium text-espresso">{dog.registeredName}</span>
                      </td>
                      <td className="py-3 px-4 text-sm text-warm-600">
                        {dog.registrationNumber || '-'}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            dog.sex === 'MALE'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-pink-100 text-pink-700'
                          }`}
                        >
                          {dog.sex === 'MALE' ? 'Male' : 'Female'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-warm-600">
                        {formatDate(dog.dateOfBirth)}
                      </td>
                      <td className="py-3 px-4 text-sm text-warm-600">
                        {dog.kennel?.name || '-'}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/admin/dogs/${dog.id}/edit`}>
                              <Eye className="w-4 h-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/admin/dogs/${dog.id}/edit`}>
                              <Edit className="w-4 h-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(dog.id, dog.registeredName)}
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
          )}
        </CardContent>
      </Card>
    </div>
  )
}
