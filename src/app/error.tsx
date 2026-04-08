'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <section className="min-h-[60vh] flex items-center justify-center section-padding">
      <div className="container-custom text-center">
        <div className="w-20 h-20 mx-auto bg-red-500/10 rounded-full flex items-center justify-center mb-8 border border-red-500/20">
          <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="heading-section text-cream mb-4">
          Something Went <span className="text-gradient-amber">Wrong</span>
        </h1>
        <p className="text-xl text-stone-400 mb-10 max-w-lg mx-auto">
          An unexpected error occurred. Please try again.
        </p>
        <button onClick={reset} className="btn-primary">
          <span>Try Again</span>
        </button>
      </div>
    </section>
  )
}
