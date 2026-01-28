"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { breeders, membershipBenefits } from "@/data/content";

// ========================================
// HOOKS
// ========================================

function useScrollReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin: "0px 0px -100px 0px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

// ========================================
// HERO SECTION - Dramatic Noir
// ========================================

function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-[100vh] flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 mesh-spotlight" />

      {/* Ambient glow orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[10%] right-[5%] w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(217, 119, 6, 0.1) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(199, 123, 72, 0.08) 0%, transparent 60%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(250,247,242,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(250,247,242,0.1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Content */}
      <div className="container-wide relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          {/* Left - Text content */}
          <div className={`transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            {/* Registry badge */}
            <div className="inline-flex items-center gap-3 mb-10">
              <div className="w-px h-12 bg-gradient-to-b from-amber-500 to-transparent" />
              <span className="label-micro">Official SA Registry</span>
            </div>

            {/* Main headline */}
            <h1 className="heading-hero text-cream mb-8">
              <span className="block">South</span>
              <span className="block">African</span>
              <span className="block text-gradient-amber">Black Mastiff</span>
            </h1>

            {/* Subheadline */}
            <p className={`text-stone-400 text-xl lg:text-2xl leading-relaxed max-w-xl mb-12 transition-all duration-1000 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Preserving bloodlines. Certifying excellence.
              <span className="block mt-2 text-stone-500 text-lg">
                The definitive registry for South Africa&apos;s most distinguished breed.
              </span>
            </p>

            {/* CTAs */}
            <div className={`flex flex-wrap gap-4 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <Link href="/registry" className="btn-primary">
                <span>Access Registry</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/breeders" className="btn-secondary">
                <span>Find Breeders</span>
              </Link>
            </div>
          </div>

          {/* Right - Hero visual */}
          <div className={`relative transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}>
            <div className="relative aspect-[4/5] max-w-lg mx-auto lg:ml-auto">
              {/* Outer frame glow */}
              <div className="absolute -inset-4 bg-gradient-to-br from-amber-500/10 to-copper-500/5 rounded-2xl blur-2xl" />

              {/* Main image container */}
              <div className="relative h-full bg-gradient-to-br from-charcoal to-noir rounded-2xl overflow-hidden border border-stone-800/50">
                {/* Hero Image */}
                <Image
                  src="/images/breed/black-mastiff-adult-studio.png"
                  alt="South African Black Mastiff - Majestic breed portrait"
                  fill
                  className="object-cover object-center"
                  priority
                />

                {/* Cinematic gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/20 to-transparent" />

                {/* Corner accents */}
                <div className="absolute top-6 left-6 w-12 h-12">
                  <div className="w-full h-px bg-amber-500/40" />
                  <div className="w-px h-full bg-amber-500/40" />
                </div>
                <div className="absolute bottom-6 right-6 w-12 h-12">
                  <div className="absolute bottom-0 w-full h-px bg-amber-500/40" />
                  <div className="absolute right-0 w-px h-full bg-amber-500/40" />
                </div>
              </div>

              {/* Floating info card */}
              <div className="absolute -bottom-6 -left-6 lg:-left-12 card-noir p-6 max-w-[280px]">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <div className="label-micro mb-1">Certified</div>
                    <div className="font-display text-lg text-cream">Official Registry</div>
                    <div className="text-sm text-stone-500 mt-1">Verified pedigrees & health</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <span className="text-[10px] tracking-[0.3em] uppercase text-stone-600">Explore</span>
        <div className="w-px h-12 bg-gradient-to-b from-amber-500/50 to-transparent" />
      </div>
    </section>
  );
}

// ========================================
// MARQUEE TICKER
// ========================================

function MarqueeTicker() {
  const items = [
    "Official Registry",
    "Verified Pedigrees",
    "Health Certified",
    "Accredited Breeders",
    "Breed Excellence",
    "DNA Testing",
    "Appraisal Events",
  ];

  return (
    <div className="relative overflow-hidden bg-charcoal py-4 border-y border-stone-800/50">
      <div className="flex animate-[marquee_30s_linear_infinite]">
        {[...items, ...items].map((item, index) => (
          <div key={index} className="flex items-center shrink-0 px-8">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500/60 mr-8" />
            <span className="text-[11px] tracking-[0.2em] uppercase text-stone-500 whitespace-nowrap">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ========================================
// ABOUT SECTION - Editorial Style
// ========================================

function AboutSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="relative section-padding bg-noir overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 100% 20%, rgba(217, 119, 6, 0.05) 0%, transparent 50%)',
        }}
      />

      <div ref={ref} className="container-custom relative">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* Left - Image */}
          <div className={`lg:col-span-5 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="relative">
              {/* Image frame */}
              <div className="relative aspect-[3/4] bg-gradient-to-br from-charcoal to-noir rounded-lg overflow-hidden border border-stone-800/50">
                <Image
                  src="/images/dogs/black-mastiff-front-portrait.jpg"
                  alt="South African Black Mastiff - Heritage breed"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noir/60 via-transparent to-transparent" />

                {/* Inner border */}
                <div className="absolute inset-4 border border-amber-500/10 rounded" />
              </div>

              {/* Registry stamp */}
              <div className="absolute -bottom-8 -right-4 lg:-right-8">
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-2 border-amber-500/30 animate-[spin_30s_linear_infinite]" />
                  <div className="absolute inset-3 rounded-full border border-amber-500/20" />
                  <div className="text-center transform -rotate-12">
                    <div className="text-[8px] font-semibold tracking-[0.15em] uppercase text-amber-600">Official</div>
                    <div className="font-display text-lg text-amber-500 font-medium leading-none">SABMA</div>
                    <div className="text-[8px] font-semibold tracking-[0.15em] uppercase text-amber-600">Registry</div>
                  </div>
                </div>
              </div>

              {/* Decorative corner */}
              <div className="absolute -top-4 -left-4 w-20 h-px bg-gradient-to-r from-amber-500/50 to-transparent" />
              <div className="absolute -top-4 -left-4 w-px h-20 bg-gradient-to-b from-amber-500/50 to-transparent" />
            </div>
          </div>

          {/* Right - Content */}
          <div className={`lg:col-span-7 lg:pl-8 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-12 h-px bg-amber-500/50" />
              <span className="label-micro">Our Heritage</span>
            </div>

            <h2 className="heading-display text-cream mb-8">
              Guardians of an
              <br />
              <span className="text-gradient-amber">Exceptional Lineage</span>
            </h2>

            <div className="space-y-6 text-stone-400 text-lg leading-relaxed mb-10">
              <p>
                The South African Mastiff Breed Council stands as the premier authority
                for Black Mastiff registration, certification, and breed preservation
                in Southern Africa.
              </p>
              <p>
                Our rigorous standards ensure every registered dog meets the highest
                benchmarks for health, temperament, and breed conformation.
              </p>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-3 mb-10">
              <div className="badge-verified">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Verified Pedigrees
              </div>
              <div className="badge-amber">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Health Certified
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/about" className="btn-primary">
                <span>Our Story</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/council" className="btn-outline-amber">
                <span>Meet the Council</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ========================================
// STATS SECTION - Big Numbers
// ========================================

function StatsSection() {
  const { ref, isVisible } = useScrollReveal();

  const stats = [
    { number: "500+", label: "Registered Dogs" },
    { number: "25+", label: "Accredited Breeders" },
    { number: "15", label: "Years of Excellence" },
    { number: "100%", label: "Health Verified" },
  ];

  return (
    <section className="relative py-20 lg:py-24 bg-charcoal overflow-hidden">
      {/* Top/bottom lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-stone-700/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-stone-700/50 to-transparent" />

      <div ref={ref} className="container-custom">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="stat-number text-gradient-amber">{stat.number}</div>
              <div className="text-stone-500 text-sm tracking-wide mt-2">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ========================================
// BENEFITS SECTION - Glass Cards
// ========================================

function BenefitsSection() {
  const { ref, isVisible } = useScrollReveal();

  const icons: Record<string, React.ReactNode> = {
    directory: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    education: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    events: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    community: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  };

  return (
    <section className="relative section-padding bg-noir overflow-hidden">
      {/* Background mesh */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(217, 119, 6, 0.08) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div ref={ref} className="container-custom relative">
        {/* Section header */}
        <div className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="w-12 h-px bg-amber-500/50" />
            <span className="label-micro">Membership</span>
            <div className="w-12 h-px bg-amber-500/50" />
          </div>

          <h2 className="heading-display text-cream mb-6">
            Exclusive Member
            <br />
            <span className="text-gradient-amber">Benefits</span>
          </h2>

          <p className="text-stone-400 text-lg">
            Join South Africa&apos;s most distinguished community of Black Mastiff
            enthusiasts and breeders.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {membershipBenefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className={`card-noir p-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${index * 100 + 200}ms` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-6">
                {icons[benefit.icon]}
              </div>

              <h3 className="font-display text-xl text-cream mb-3">
                {benefit.title}
              </h3>

              <p className="text-stone-500 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Link href="/register" className="btn-primary">
            <span>Become a Member</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ========================================
// BREEDERS SECTION - Magazine Grid
// ========================================

function BreedersSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="relative section-padding bg-charcoal overflow-hidden">
      {/* Top line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-stone-700/50 to-transparent" />

      <div ref={ref} className="container-custom relative">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-amber-500/50" />
              <span className="label-micro">Our Network</span>
            </div>
            <h2 className="heading-display text-cream">
              Accredited
              <br />
              <span className="text-gradient-amber">Breeders</span>
            </h2>
          </div>

          <Link
            href="/breeders"
            className={`group inline-flex items-center gap-3 text-stone-400 font-medium transition-all duration-300 hover:text-cream ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
            style={{ transitionDelay: '200ms' }}
          >
            <span className="text-sm tracking-wide uppercase">View All</span>
            <div className="w-10 h-10 rounded-full border border-stone-700 flex items-center justify-center group-hover:border-amber-500 group-hover:bg-amber-500/10 transition-all duration-300">
              <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </Link>
        </div>

        {/* Breeders grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {breeders.slice(0, 3).map((breeder, index) => (
            <div
              key={breeder.id}
              className={`group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${index * 150 + 300}ms` }}
            >
              {/* Image */}
              <div className="relative aspect-[4/5] mb-6 overflow-hidden rounded-xl border border-stone-800/50 group-hover:border-amber-500/30 transition-colors duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-charcoal to-noir group-hover:scale-105 transition-transform duration-700">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-stone-600 font-medium">Breeder Portrait</span>
                  </div>
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Edition number */}
                <div className="absolute top-6 left-6">
                  <div className="font-display text-5xl font-light text-white/10 leading-none">
                    {(index + 1).toString().padStart(2, '0')}
                  </div>
                </div>

                {/* Verified badge */}
                <div className="absolute top-6 right-6">
                  <div className="badge-verified">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Verified
                  </div>
                </div>

                {/* View profile on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <Link href={`/breeders/${breeder.id}`} className="inline-flex items-center gap-2 text-cream text-sm font-semibold hover:text-amber-400 transition-colors">
                    <span className="tracking-wide uppercase">View Profile</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 className="font-display text-2xl text-cream mb-1 group-hover:text-amber-400 transition-colors duration-300">
                  {breeder.name}
                </h3>
                <p className="text-stone-500 text-sm mb-2">{breeder.kennel}</p>
                <p className="text-amber-500/80 text-sm font-medium flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  {breeder.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ========================================
// CTA SECTION - Full Width Dramatic
// ========================================

function CTASection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className="relative section-padding overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-noir to-noir" />

      {/* Mesh overlay */}
      <div className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 60% at 20% 30%, rgba(217, 119, 6, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse 50% 50% at 80% 70%, rgba(0,0,0,0.3) 0%, transparent 50%)
          `,
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(250,247,242,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(250,247,242,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container-custom relative">
        <div className={`max-w-3xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          {/* Decorative element */}
          <div className="inline-flex items-center gap-4 mb-10">
            <div className="w-16 h-px bg-amber-500/40" />
            <div className="w-3 h-3 rounded-full border border-amber-500/60" />
            <div className="w-16 h-px bg-amber-500/40" />
          </div>

          <h2 className="heading-display text-cream mb-6">
            Ready to Discover Your
            <br />
            <span className="text-gradient-amber">Perfect Companion?</span>
          </h2>

          <p className="text-xl text-stone-400 mb-12 max-w-xl mx-auto">
            Connect with our network of accredited breeders and begin your journey
            with South Africa&apos;s most distinguished breed.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/buying-a-puppy" className="btn-primary">
              <span>Find Your Puppy</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/contact" className="btn-secondary">
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ========================================
// MAIN PAGE
// ========================================

export default function Home() {
  return (
    <>
      <HeroSection />
      <MarqueeTicker />
      <AboutSection />
      <StatsSection />
      <BenefitsSection />
      <BreedersSection />
      <CTASection />
    </>
  );
}
