import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions, isMember } from '@/lib/auth'

export default async function RegistryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login?callbackUrl=/registry/dogs')
  }

  // User must be MEMBER, ADMIN, or SUPER_ADMIN
  if (!isMember(session.user.role)) {
    redirect('/unauthorized')
  }

  return <>{children}</>
}
