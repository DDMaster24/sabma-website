import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions, isAdmin } from '@/lib/auth'
import { Dog, Home, Users, Building2, LogOut, Shield, Heart, Award, Image as ImageIcon, Calendar, MessageSquare, BookOpen, Settings } from 'lucide-react'

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
    { href: '/admin/council', label: 'Council', icon: Shield },
    { href: '/admin/breeders', label: 'Breeders', icon: Heart },
    { href: '/admin/studs', label: 'Studs', icon: Award },
    { href: '/admin/gallery', label: 'Gallery', icon: ImageIcon },
    { href: '/admin/calendar', label: 'Calendar', icon: Calendar },
    { href: '/admin/testimonials', label: 'Testimonials', icon: MessageSquare },
    { href: '/admin/resources', label: 'Resources', icon: BookOpen },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-warm-50">
      {/* Admin Header */}
      <header className="bg-espresso text-ivory shadow-lg">
        <div className="container-custom">
          <div className="flex items-center justify-between h-16">
            <Link href="/admin" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-8 h-8 rounded-lg bg-bronze-500 flex items-center justify-center">
                <Dog className="w-5 h-5 text-white" />
              </div>
              <span className="font-display text-lg font-semibold">SABMA Admin</span>
            </Link>

            <div className="flex items-center gap-4">
              <span className="hidden sm:inline text-sm text-ivory/60">
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

        {/* Navigation - scrollable */}
        <div className="border-t border-white/10">
          <div className="container-custom">
            <nav className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-hide">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-ivory/70 hover:text-ivory hover:bg-white/10 transition-colors whitespace-nowrap flex-shrink-0"
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  )
}
