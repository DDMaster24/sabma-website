import Link from "next/link";
import {
  breeders,
  membershipBenefits,
} from "@/data/content";
import Reveal from "@/components/ui/Reveal";

// Hero Section - Clean editorial layout: Header -> Subheading -> Photos -> Quick Access
function HeroSection() {
  const quickLinks = [
    {
      name: "Find a Breeder",
      href: "/breeders",
      description: "Connect with accredited breeders",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      name: "About SABMA",
      href: "/about",
      description: "Our mission and heritage",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      name: "Buying a Puppy",
      href: "/buying-a-puppy",
      description: "Your guide to finding the perfect companion",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    },
    {
      name: "Stud Register",
      href: "/stud-register",
      description: "Browse registered studs",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
  ];

  return (
    <section className="relative bg-ivory overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Decorative gradient orbs */}
      <div className="absolute top-20 right-[10%] w-[600px] h-[600px] rounded-full opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(184, 134, 11, 0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(184, 134, 11, 0.1) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="container-custom relative z-10">
        {/* Header and Subheading */}
        <div className="pt-16 pb-12 lg:pt-24 lg:pb-16 text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 mb-8">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bronze-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-bronze-500" />
            </span>
            <span className="text-bronze-600 text-sm font-medium tracking-[0.2em] uppercase">
              South Africa&apos;s Premier Breed Association
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light leading-[0.95] mb-8 text-espresso">
            The South African
            <span className="block text-gradient mt-2">Black Mastiff</span>
          </h1>

          {/* Subheading */}
          <p className="text-warm-600 text-xl lg:text-2xl leading-relaxed max-w-2xl mx-auto">
            Dedicated to promoting responsible breeding and upholding the standards of this majestic breed across South Africa.
          </p>
        </div>

        {/* Photo Gallery - Asymmetric Grid */}
        <div className="pb-16 lg:pb-20">
          <div className="grid grid-cols-12 gap-4 lg:gap-6 max-w-6xl mx-auto">
            {/* Large featured placeholder */}
            <div className="col-span-12 md:col-span-7 relative">
              <div className="relative aspect-[4/3] rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl shadow-espresso/15 bg-warm-200 border-2 border-warm-300 flex items-center justify-center">
                <span className="text-warm-500 font-medium text-lg">Placeholder image</span>
              </div>
            </div>

            {/* Stacked smaller placeholders */}
            <div className="col-span-12 md:col-span-5 grid grid-cols-2 md:grid-cols-1 gap-4 lg:gap-6">
              <div className="relative aspect-[4/3] md:aspect-[16/9] rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl shadow-espresso/10 bg-warm-200 border-2 border-warm-300 flex items-center justify-center">
                <span className="text-warm-500 font-medium text-lg">Placeholder image</span>
              </div>
              <div className="relative aspect-[4/3] md:aspect-[16/9] rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl shadow-espresso/10 bg-warm-200 border-2 border-warm-300 flex items-center justify-center">
                <span className="text-warm-500 font-medium text-lg">Placeholder image</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Access Buttons */}
        <div className="pb-20 lg:pb-28">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 max-w-6xl mx-auto">
            {quickLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="group relative bg-white rounded-2xl p-6 lg:p-8 border border-warm-200
                          shadow-sm hover:shadow-xl hover:shadow-bronze-500/10
                          hover:border-bronze-300 hover:-translate-y-1
                          transition-all duration-300 ease-out"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-bronze-50 flex items-center justify-center mb-5
                              text-bronze-600 group-hover:bg-bronze-500 group-hover:text-white
                              transition-all duration-300">
                  {link.icon}
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-medium text-espresso mb-2
                             group-hover:text-bronze-700 transition-colors duration-300">
                  {link.name}
                </h3>
                <p className="text-warm-500 text-sm leading-relaxed">
                  {link.description}
                </p>

                {/* Arrow indicator */}
                <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-warm-100
                              flex items-center justify-center opacity-0 group-hover:opacity-100
                              transition-all duration-300 group-hover:translate-x-1">
                  <svg className="w-4 h-4 text-bronze-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-bronze-300/50 to-transparent" />
    </section>
  );
}

// About Preview Section
function AboutSection() {
  return (
    <section className="section-padding bg-ivory-200 relative overflow-hidden noise-overlay">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-1/2 h-full"
        style={{
          background: 'radial-gradient(ellipse 100% 100% at 100% 0%, rgba(160, 120, 60, 0.04) 0%, transparent 50%)',
        }}
      />

      <div className="container-custom relative">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image Placeholder */}
          <div className="relative">
            <div className="relative">
              {/* Background shape */}
              <div className="absolute -inset-8 lg:-inset-12 bg-gradient-to-br from-bronze-400/5 to-transparent rounded-3xl" />

              {/* Placeholder */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl shadow-espresso/15 bg-warm-200 border-2 border-warm-300 flex items-center justify-center">
                <span className="text-warm-500 font-medium text-lg">Placeholder image</span>
              </div>

              {/* Decorative corner */}
              <div className="absolute -top-4 -left-4 w-24 h-24">
                <div className="w-full h-px bg-gradient-to-r from-bronze-500 to-transparent" />
                <div className="w-px h-full bg-gradient-to-b from-bronze-500 to-transparent" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24">
                <div className="absolute bottom-0 w-full h-px bg-gradient-to-l from-bronze-500 to-transparent" />
                <div className="absolute right-0 w-px h-full bg-gradient-to-t from-bronze-500 to-transparent" />
              </div>
            </div>
          </div>

          {/* Content */}
          <Reveal animation="fade-in-up" delay={200}>
            <span className="label mb-6">About SABMA</span>
            <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl font-light text-espresso mb-8 leading-tight">
              Our Mission &<br />
              <span className="text-gradient">Heritage</span>
            </h2>
            <div className="space-y-6 text-warm-600 text-lg leading-relaxed">
              <p>
                At the South African Mastiff Breed Council, we are dedicated to
                promoting responsible breeding and upholding the standards of the
                black mastiff breed in South Africa.
              </p>
              <p>
                Our association is made up of passionate and knowledgeable
                breeders who are committed to maintaining the health, temperament,
                and conformation of this majestic breed.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-10">
              <Link href="/about" className="btn-primary">
                <span>Learn More</span>
              </Link>
              <Link href="/council" className="btn-secondary">
                <span>Meet The Council</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// Membership Benefits Section
function BenefitsSection() {
  const icons: Record<string, React.ReactNode> = {
    directory: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    education: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    events: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    community: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  };

  return (
    <section className="section-padding bg-ivory relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 50% 50% at 0% 50%, rgba(160, 120, 60, 0.04) 0%, transparent 50%),
            radial-gradient(ellipse 50% 50% at 100% 50%, rgba(160, 120, 60, 0.03) 0%, transparent 50%)
          `
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(44, 36, 24, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(44, 36, 24, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container-custom relative">
        {/* Section header */}
        <Reveal className="section-header" animation="fade-in-up">
          <span className="label mb-6">Why Join SABMA</span>
          <h2>Membership <span className="text-gradient">Benefits</span></h2>
          <p>
            Become part of South Africa&apos;s premier black mastiff community and
            enjoy exclusive benefits that elevate your breeding journey.
          </p>
        </Reveal>

        {/* Benefits grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {membershipBenefits.map((benefit, index) => (
            <Reveal
              key={benefit.title}
              className="group card gradient-border"
              delay={index * 100}
              animation="scale-in"
            >
              {/* Icon */}
              <div className="relative w-14 h-14 mb-6">
                <div className="absolute inset-0 bg-bronze-500/10 rounded-xl
                              group-hover:bg-bronze-500 transition-all duration-500" />
                <div className="relative w-full h-full flex items-center justify-center
                              text-bronze-600 group-hover:text-white transition-colors duration-500">
                  {icons[benefit.icon]}
                </div>
              </div>

              <h3 className="font-display text-xl font-light text-espresso mb-4">
                {benefit.title}
              </h3>
              <p className="text-warm-500 leading-relaxed text-sm">
                {benefit.description}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link href="/register" className="btn-primary">
            <span>Become a Member</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

// Breeders Preview Section
function BreedersSection() {
  return (
    <section className="section-padding bg-ivory-200 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(160, 120, 60, 0.04) 0%, transparent 50%)'
        }}
      />

      <div className="container-custom relative">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
          <Reveal animation="slide-in-right">
            <span className="label mb-6">Our Network</span>
            <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl font-light text-espresso">
              Accredited <span className="text-gradient">Breeders</span>
            </h2>
          </Reveal>
          <Reveal animation="slide-in-left" delay={200}>
            <Link
              href="/breeders"
              className="group inline-flex items-center gap-3 text-bronze-600 font-medium
                      hover:text-bronze-700 transition-colors duration-300"
            >
              View All Breeders
              <svg
                className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </Reveal>
        </div>

        {/* Breeders grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {breeders.slice(0, 3).map((breeder, index) => (
            <Reveal key={breeder.id} className="group" delay={index * 150} animation="fade-in-up">
              {/* Placeholder */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 shadow-lg shadow-espresso/10 bg-warm-200 border-2 border-warm-300 flex items-center justify-center">
                <span className="text-warm-500 font-medium text-lg">Placeholder image</span>
                {/* Number badge */}
                <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm
                              flex items-center justify-center border border-espresso/10">
                  <span className="font-display text-bronze-600 text-lg">
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 className="font-display text-2xl font-light text-espresso mb-2
                             group-hover:text-bronze-600 transition-colors duration-300">
                  {breeder.name}
                </h3>
                <p className="text-warm-500 text-sm mb-2">{breeder.kennel}</p>
                <p className="text-bronze-600 text-sm font-medium flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {breeder.location}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}


// CTA Section
function CTASection() {
  return (
    <section className="relative py-32 lg:py-40 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-bronze-500 via-bronze-400 to-bronze-600" />

      {/* Mesh overlay */}
      <div className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(ellipse 50% 80% at 20% 40%, rgba(0, 0, 0, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse 50% 80% at 80% 60%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)
          `
        }}
      />

      {/* Noise texture */}
      <div className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Decorative lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-espresso/10" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-espresso/10" />

      <div className="container-custom relative">
        <Reveal className="max-w-4xl mx-auto text-center" animation="fade-in-up">
          <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl font-light text-white mb-8 leading-tight">
            Ready to Find Your Perfect<br />
            <span className="font-medium">Black Mastiff?</span>
          </h2>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Connect with accredited breeders and join our community of passionate
            black mastiff enthusiasts.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/buying-a-puppy"
              className="inline-flex items-center justify-center px-8 py-4
                       bg-white text-espresso font-semibold text-sm tracking-wide uppercase
                       rounded-full transition-all duration-500
                       hover:-translate-y-1 hover:shadow-xl hover:shadow-espresso/20"
            >
              Buying a Puppy
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4
                       bg-transparent text-white font-semibold text-sm tracking-wide uppercase
                       rounded-full border-2 border-white/30
                       transition-all duration-500
                       hover:-translate-y-1 hover:bg-white/10 hover:border-white/50"
            >
              Contact Us
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// Main Page Component
export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <BenefitsSection />
      <BreedersSection />
      <CTASection />
    </>
  );
}
