import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Dog, Building2, Users, Plus, Eye, Edit } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)

  // Get statistics
  const [dogCount, kennelCount, memberCount, pendingMemberCount, recentDogs] = await Promise.all([
    prisma.dog.count(),
    prisma.kennel.count(),
    prisma.user.count({ where: { role: 'MEMBER', isActive: true } }),
    prisma.user.count({ where: { role: 'MEMBER', isActive: false } }),
    prisma.dog.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { kennel: true },
    }),
  ])

  return (
    <div className="container-custom py-8">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="font-display text-display-sm font-semibold text-espresso">
          Welcome back, {session?.user?.name || session?.user?.email}
        </h1>
        <p className="text-warm-600 mt-1">
          Manage your SABMA dog registry from here.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Dogs"
          value={dogCount}
          icon={Dog}
          href="/admin/dogs"
        />
        <StatCard
          title="Kennels"
          value={kennelCount}
          icon={Building2}
          href="/admin/kennels"
        />
        <StatCard
          title="Active Members"
          value={memberCount}
          icon={Users}
          href="/admin/members"
        />
        <StatCard
          title="Pending Approvals"
          value={pendingMemberCount}
          icon={Users}
          href="/admin/members?status=pending"
          highlight={pendingMemberCount > 0}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions Card */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Button asChild>
              <Link href="/admin/dogs/new">
                <Plus className="w-4 h-4 mr-2" />
                Add New Dog
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/kennels">
                <Building2 className="w-4 h-4 mr-2" />
                Manage Kennels
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/members">
                <Users className="w-4 h-4 mr-2" />
                Manage Members
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/registry/dogs">
                <Eye className="w-4 h-4 mr-2" />
                View Registry
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Dogs */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recently Added Dogs</CardTitle>
            <Link
              href="/admin/dogs"
              className="text-sm text-bronze-600 hover:text-bronze-700"
            >
              View all
            </Link>
          </CardHeader>
          <CardContent>
            {recentDogs.length === 0 ? (
              <p className="text-warm-500 text-center py-4">No dogs registered yet.</p>
            ) : (
              <div className="space-y-3">
                {recentDogs.map((dog) => (
                  <div
                    key={dog.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-warm-50"
                  >
                    <div>
                      <p className="font-medium text-espresso">
                        {dog.registeredName}
                      </p>
                      <p className="text-sm text-warm-500">
                        {dog.registrationNumber || 'No reg. number'} &bull;{' '}
                        {dog.kennel?.name || 'No kennel'}
                      </p>
                      <p className="text-xs text-warm-400">
                        Added {formatDate(dog.createdAt)}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/registry/dogs/${dog.id}`}>
                          <Eye className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/admin/dogs/${dog.id}/edit`}>
                          <Edit className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

interface StatCardProps {
  title: string
  value: number
  icon: React.ElementType
  href: string
  highlight?: boolean
}

function StatCard({ title, value, icon: Icon, href, highlight }: StatCardProps) {
  return (
    <Link href={href}>
      <Card className={`hover:-translate-y-1 ${highlight ? 'border-bronze-400 bg-bronze-50' : ''}`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-warm-500">{title}</p>
              <p className={`text-3xl font-display font-semibold mt-1 ${highlight ? 'text-bronze-700' : 'text-espresso'}`}>
                {value}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${highlight ? 'bg-bronze-200' : 'bg-warm-100'}`}>
              <Icon className={`w-6 h-6 ${highlight ? 'text-bronze-700' : 'text-warm-500'}`} />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
