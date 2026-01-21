import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions, isAdmin } from '@/lib/auth'
import { Dog, Home, Users, Building2, LogOut } from 'lucide-react'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login?callbackUrl=/admin')
  }

  // User must be ADMIN or SUPER_ADMIN
  if (!isAdmin(session.user.role)) {
    redirect('/unauthorized')
  }

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: Home },
    { href: '/admin/dogs', label: 'Dogs', icon: Dog },
    { href: '/admin/kennels', label: 'Kennels', icon: Building2 },
    { href: '/admin/members', label: 'Members', icon: Users },
  ]

  return (
    <div className="min-h-screen bg-warm-50">
      {/* Admin Header */}
      <header className="bg-espresso text-ivory shadow-lg">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link href="/admin" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-bronze-500 flex items-center justify-center">
                  <Dog className="w-5 h-5 text-white" />
                </div>
                <span className="font-display text-lg font-semibold">SABMA Admin</span>
              </Link>

              <nav className="hidden md:flex items-center gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-ivory/70 hover:text-ivory hover:bg-white/10 transition-colors"
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-ivory/60">
                {session.user.email}
              </span>
              <Link
                href="/api/auth/signout"
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-ivory/70 hover:text-ivory hover:bg-white/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Sign Out</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  )
}
