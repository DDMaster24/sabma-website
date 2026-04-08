import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Unauthorized',
  description: 'You do not have permission to access this page.',
}

export default function UnauthorizedPage() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center section-padding">
      <div className="container-custom text-center">
        <div className="w-20 h-20 mx-auto bg-amber-500/10 rounded-full flex items-center justify-center mb-8 border border-amber-500/20">
          <svg className="w-10 h-10 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h1 className="heading-display text-cream mb-4">
          Access <span className="text-gradient-amber">Denied</span>
        </h1>
        <p className="text-xl text-stone-400 mb-10 max-w-lg mx-auto">
          You do not have permission to access this page. Please contact an administrator if you believe this is an error.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/" className="btn-primary">
            <span>Go Home</span>
          </Link>
          <Link href="/login" className="btn-secondary">
            <span>Sign In</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
