import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="min-h-[60vh] flex items-center justify-center section-padding">
      <div className="container-custom text-center">
        <div className="font-display text-[8rem] font-bold text-amber-500/20 leading-none mb-4">
          404
        </div>
        <h1 className="heading-section text-cream mb-4">
          Page Not <span className="text-gradient-amber">Found</span>
        </h1>
        <p className="text-xl text-stone-400 mb-10 max-w-lg mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link href="/" className="btn-primary">
          <span>Back to Home</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
  )
}
