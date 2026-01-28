import { Metadata } from "next";
import Link from "next/link";
import { breeders } from "@/data/content";

export const metadata: Metadata = {
  title: "Breeders",
  description:
    "Meet our accredited breeders committed to upholding our standards and ensuring the well-being of the South African Black Mastiff breed.",
};

export default function BreedersPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 mesh-spotlight" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-copper-500/5 rounded-full blur-2xl" />

        <div className="container-custom relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-amber-500/50" />
              <span className="label-micro">Our Network</span>
            </div>
            <h1 className="heading-display text-cream mb-6">
              Our
              <br />
              <span className="text-gradient-amber">Breeders</span>
            </h1>
            <p className="text-xl text-stone-400 leading-relaxed">
              Meet the Accredited Breeders committed to upholding our standards,
              ensuring the well-being and authenticity of the South African Black
              Mastiff breed.
            </p>
          </div>
        </div>
      </section>

      {/* Breeders List */}
      <section className="section-padding bg-charcoal relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-stone-700/50 to-transparent" />
        <div className="container-custom">
          <div className="space-y-8">
            {breeders.map((breeder, index) => (
              <div
                key={breeder.id}
                className={`grid md:grid-cols-2 gap-8 items-center card-noir p-8
                          ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
              >
                {/* Image */}
                <div
                  className={`relative aspect-[4/3] rounded-xl overflow-hidden border border-stone-800/50
                            ${index % 2 === 1 ? "md:order-2" : ""}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-charcoal to-noir flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto bg-amber-500/10 rounded-full flex items-center justify-center mb-3 border border-amber-500/20">
                        <span className="text-2xl text-amber-500 font-display font-medium">
                          {breeder.name.charAt(0)}
                        </span>
                      </div>
                      <span className="text-stone-500 text-sm">Breeder Photo</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-noir/60 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className={index % 2 === 1 ? "md:order-1" : ""}>
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center
                                border border-amber-500/20 text-amber-500 font-display font-medium text-lg"
                    >
                      {breeder.id.toString().padStart(2, "0")}
                    </div>
                    <div>
                      <h2 className="font-display text-2xl font-medium text-cream">
                        {breeder.name}
                      </h2>
                      <p className="text-amber-500 font-medium">
                        {breeder.kennel}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-stone-400">
                      <svg className="w-5 h-5 text-amber-500/60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>{breeder.owners}</span>
                    </div>
                    <div className="flex items-center gap-3 text-stone-400">
                      <svg className="w-5 h-5 text-amber-500/60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{breeder.location}</span>
                    </div>
                    {breeder.phone && (
                      <a
                        href={`tel:${breeder.phone}`}
                        className="flex items-center gap-3 text-stone-400 hover:text-amber-500 transition-colors"
                      >
                        <svg className="w-5 h-5 text-amber-500/60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>{breeder.phone}</span>
                      </a>
                    )}
                    {breeder.email && (
                      <a
                        href={`mailto:${breeder.email}`}
                        className="flex items-center gap-3 text-stone-400 hover:text-amber-500 transition-colors"
                      >
                        <svg className="w-5 h-5 text-amber-500/60 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>{breeder.email}</span>
                      </a>
                    )}
                  </div>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-amber-500 font-semibold
                             hover:text-amber-400 transition-colors group"
                  >
                    Contact Breeder
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Breeder CTA */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-noir to-noir" />
        <div className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 60% 60% at 50% 50%, rgba(217, 119, 6, 0.15) 0%, transparent 50%)`,
          }}
        />

        <div className="container-custom relative text-center">
          <div className="inline-flex items-center gap-4 mb-8">
            <div className="w-16 h-px bg-amber-500/40" />
            <div className="w-3 h-3 rounded-full border border-amber-500/60" />
            <div className="w-16 h-px bg-amber-500/40" />
          </div>
          <h2 className="heading-display text-cream mb-6">
            Interested in Becoming an
            <br />
            <span className="text-gradient-amber">Accredited Breeder?</span>
          </h2>
          <p className="text-xl text-stone-400 mb-10 max-w-2xl mx-auto">
            Join our network of dedicated breeders and help preserve the legacy of
            the South African Black Mastiff.
          </p>
          <Link href="/contact" className="btn-primary">
            <span>Contact Us</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
