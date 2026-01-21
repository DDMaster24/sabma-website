import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from 'bcryptjs'
import { prisma } from '@/lib/prisma'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter your email and password')
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toLowerCase() },
        })

        if (!user) {
          throw new Error('Invalid email or password')
        }

        if (!user.isActive) {
          throw new Error('Your account is pending approval. Please contact an administrator.')
        }

        const isPasswordValid = await compare(credentials.password, user.password)

        if (!isPasswordValid) {
          throw new Error('Invalid email or password')
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
        },
      }
    },
  },
}

// Helper function to check if user has required role
export function hasRole(userRole: string | undefined, requiredRoles: string[]): boolean {
  if (!userRole) return false
  return requiredRoles.includes(userRole)
}

// Role hierarchy check
export function isAdmin(role: string | undefined): boolean {
  return hasRole(role, ['ADMIN', 'SUPER_ADMIN'])
}

export function isSuperAdmin(role: string | undefined): boolean {
  return hasRole(role, ['SUPER_ADMIN'])
}

export function isMember(role: string | undefined): boolean {
  return hasRole(role, ['MEMBER', 'ADMIN', 'SUPER_ADMIN'])
}
