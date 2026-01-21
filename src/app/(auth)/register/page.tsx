'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Dog, Eye, EyeOff, Loader2, CheckCircle } from 'lucide-react'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long')
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email.toLowerCase(),
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed')
      }

      setIsSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  // Success state
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-ivory flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-bronze-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-bronze-100/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="relative sm:mx-auto sm:w-full sm:max-w-md text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>

          <h1 className="text-display-sm font-display font-semibold text-espresso">
            Registration Submitted
          </h1>

          <div className="mt-6 bg-white rounded-3xl shadow-soft border border-warm-200 p-8">
            <p className="text-warm-700 mb-4">
              Thank you for registering! Your account is pending approval.
            </p>
            <p className="text-warm-600 text-sm mb-6">
              A SABMA administrator will review your request and activate your account.
              You will be able to login once your account has been approved.
            </p>

            <Link
              href="/"
              className="inline-flex items-center justify-center w-full py-3.5 px-6 rounded-full font-semibold text-white
                       bg-gradient-to-r from-bronze-500 to-bronze-600
                       hover:from-bronze-600 hover:to-bronze-700
                       shadow-bronze hover:shadow-bronze-lg
                       transition-all duration-300 ease-out-expo"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    )
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
            Request Access
          </h1>
          <p className="mt-2 text-warm-600 font-body">
            Register for SABMA Registry access
          </p>
        </div>

        {/* Registration Form */}
        <div className="mt-8 bg-white rounded-3xl shadow-soft border border-warm-200 p-8">
          {/* Info Box */}
          <div className="bg-bronze-50 border border-bronze-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-bronze-800">
              <strong>Note:</strong> Registration requires admin approval. Once approved,
              you&apos;ll receive access to browse the SABMA dog registry.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-espresso mb-2">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-warm-300 bg-white
                         text-espresso placeholder-warm-400
                         focus:outline-none focus:ring-2 focus:ring-bronze-500/20 focus:border-bronze-500
                         transition-all duration-200"
                placeholder="Your full name"
              />
            </div>

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
                value={formData.email}
                onChange={handleChange}
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
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-warm-300 bg-white
                           text-espresso placeholder-warm-400
                           focus:outline-none focus:ring-2 focus:ring-bronze-500/20 focus:border-bronze-500
                           transition-all duration-200"
                  placeholder="At least 8 characters"
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

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-espresso mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-warm-300 bg-white
                         text-espresso placeholder-warm-400
                         focus:outline-none focus:ring-2 focus:ring-bronze-500/20 focus:border-bronze-500
                         transition-all duration-200"
                placeholder="Repeat your password"
              />
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
                  Submitting...
                </>
              ) : (
                'Request Access'
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-warm-600 text-sm">
              Already have an account?{' '}
              <Link
                href="/login"
                className="font-semibold text-bronze-600 hover:text-bronze-700 transition-colors"
              >
                Sign In
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
