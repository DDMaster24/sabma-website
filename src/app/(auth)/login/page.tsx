'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Dog, Eye, EyeOff, Loader2 } from 'lucide-react'

export default function LoginPage() {
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
    <div className="min-h-screen bg-ivory flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-bronze-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-bronze-100/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo and Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-bronze-400 to-bronze-600 flex items-center justify-center shadow-bronze transition-transform duration-300 group-hover:scale-105">
              <Dog className="w-8 h-8 text-white" />
            </div>
          </Link>
          <h1 className="mt-6 text-display-sm font-display font-semibold text-espresso">
            Member Login
          </h1>
          <p className="mt-2 text-warm-600 font-body">
            Sign in to access the SABMA Registry
          </p>
        </div>

        {/* Login Form */}
        <div className="mt-8 bg-white rounded-3xl shadow-soft border border-warm-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-espresso mb-2">
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
                className="w-full px-4 py-3 rounded-xl border border-warm-300 bg-white
                         text-espresso placeholder-warm-400
                         focus:outline-none focus:ring-2 focus:ring-bronze-500/20 focus:border-bronze-500
                         transition-all duration-200"
                placeholder="you@example.com"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-espresso mb-2">
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
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-warm-300 bg-white
                           text-espresso placeholder-warm-400
                           focus:outline-none focus:ring-2 focus:ring-bronze-500/20 focus:border-bronze-500
                           transition-all duration-200"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-500 hover:text-espresso transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-full font-semibold text-white
                       bg-gradient-to-r from-bronze-500 to-bronze-600
                       hover:from-bronze-600 hover:to-bronze-700
                       focus:outline-none focus:ring-2 focus:ring-bronze-500/50 focus:ring-offset-2
                       disabled:opacity-50 disabled:cursor-not-allowed
                       shadow-bronze hover:shadow-bronze-lg
                       transition-all duration-300 ease-out-expo
                       flex items-center justify-center gap-2"
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
            <p className="text-warm-600 text-sm">
              Not a member yet?{' '}
              <Link
                href="/register"
                className="font-semibold text-bronze-600 hover:text-bronze-700 transition-colors"
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
            className="text-sm text-warm-500 hover:text-espresso transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
