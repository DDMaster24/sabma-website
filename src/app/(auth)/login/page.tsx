'use client'

import { Suspense, useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Dog, Eye, EyeOff, Loader2 } from 'lucide-react'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/registry/dogs'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        email: email.toLowerCase(),
        password,
        redirect: false,
      })

      if (result?.error) {
        setError(result.error)
      } else {
        router.push(callbackUrl)
        router.refresh()
      }
    } catch {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative sm:mx-auto sm:w-full sm:max-w-md">
      {/* Logo and Header */}
      <div className="text-center">
        <Link href="/" className="inline-flex items-center gap-3 group">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-amber transition-transform duration-300 group-hover:scale-105">
            <Dog className="w-8 h-8 text-noir" />
          </div>
        </Link>
        <h1 className="mt-6 font-display text-3xl font-semibold text-cream">
          Member Login
        </h1>
        <p className="mt-2 text-stone-400">
          Sign in to access the SABMA Registry
        </p>
      </div>

      {/* Login Form */}
      <div className="mt-8 card-noir p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-cream mb-2">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5
                       text-cream placeholder-stone-600
                       focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/50
                       transition-all duration-200"
              placeholder="you@example.com"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-cream mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pr-12 rounded-xl border border-white/10 bg-white/5
                         text-cream placeholder-stone-600
                         focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/50
                         transition-all duration-200"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 hover:text-cream transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Register Link */}
        <div className="mt-6 text-center">
          <p className="text-stone-500 text-sm">
            Not a member yet?{' '}
            <Link
              href="/register"
              className="font-semibold text-amber-500 hover:text-amber-400 transition-colors"
            >
              Request Access
            </Link>
          </p>
        </div>
      </div>

      {/* Back to Home */}
      <div className="mt-6 text-center">
        <Link
          href="/"
          className="text-sm text-stone-500 hover:text-cream transition-colors inline-flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </div>
    </div>
  )
}

function LoginFormFallback() {
  return (
    <div className="relative sm:mx-auto sm:w-full sm:max-w-md">
      <div className="text-center">
        <div className="w-14 h-14 rounded-2xl bg-stone-800 animate-pulse mx-auto" />
        <div className="mt-6 h-8 bg-stone-800 rounded animate-pulse w-48 mx-auto" />
        <div className="mt-2 h-4 bg-stone-800/50 rounded animate-pulse w-64 mx-auto" />
      </div>
      <div className="mt-8 card-noir p-8">
        <div className="space-y-6">
          <div className="h-12 bg-stone-800/50 rounded-xl animate-pulse" />
          <div className="h-12 bg-stone-800/50 rounded-xl animate-pulse" />
          <div className="h-12 bg-amber-500/20 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-noir flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      <Suspense fallback={<LoginFormFallback />}>
        <LoginForm />
      </Suspense>
    </div>
  )
}
