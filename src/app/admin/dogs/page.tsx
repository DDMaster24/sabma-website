import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { Plus, Eye, Edit, Search } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { formatDate } from '@/lib/utils'

interface PageProps {
  searchParams: { search?: string }
}

export default async function AdminDogsPage({ searchParams }: PageProps) {
  const search = searchParams.search || ''

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {}
  if (search) {
    where.OR = [
      { registeredName: { contains: search, mode: 'insensitive' } },
      { registrationNumber: { contains: search, mode: 'insensitive' } },
    ]
  }

  const dogs = await prisma.dog.findMany({
    where,
    include: { kennel: true },
    orderBy: { createdAt: 'desc' },
    take: 100,
  })

  return (
    <div className="container-custom py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-display-sm font-semibold text-espresso">
            Manage Dogs
          </h1>
          <p className="text-warm-600 mt-1">
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

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <form className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-warm-400" />
              <Input
                name="search"
                placeholder="Search by name or registration number..."
                defaultValue={search}
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
                            <Link href={`/registry/dogs/${dog.id}`}>
                              <Eye className="w-4 h-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/admin/dogs/${dog.id}/edit`}>
                              <Edit className="w-4 h-4" />
                            </Link>
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
