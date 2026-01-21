import { Metadata } from "next";
import Image from "next/image";
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
      <section className="relative py-24 lg:py-32 bg-espresso overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-espresso via-espresso-100 to-espresso" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-bronze-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-bronze-500/5 rounded-full blur-2xl" />

        <div className="container-custom relative">
          <div className="max-w-3xl">
            <span className="inline-block text-bronze-400 font-semibold tracking-wider uppercase text-sm mb-4">
              Our Network
            </span>
            <h1 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold text-ivory-100 mb-6">
              Our Breeders
            </h1>
            <p className="text-xl text-ivory-400 leading-relaxed">
              Meet the Accredited Breeders committed to upholding our standards,
              ensuring the well-being and authenticity of the South African Black
              Mastiff breed.
            </p>
          </div>
        </div>
      </section>

      {/* Breeders List */}
      <section className="section-padding bg-ivory">
        <div className="container-custom">
          <div className="space-y-8">
            {breeders.map((breeder, index) => (
              <div
                key={breeder.id}
                className={`grid md:grid-cols-2 gap-8 items-center p-8 rounded-2xl bg-white border border-espresso/5
                          hover:border-bronze-300 hover:shadow-lg transition-all duration-300
                          ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
              >
                {/* Image */}
                <div
                  className={`relative aspect-[4/3] rounded-xl overflow-hidden
                            ${index % 2 === 1 ? "md:order-2" : ""}`}
                >
                  <Image
                    src={breeder.image}
                    alt={breeder.kennel}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className={index % 2 === 1 ? "md:order-1" : ""}>
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className="w-12 h-12 bg-bronze-100 rounded-full flex items-center justify-center
                                text-bronze-600 font-display font-bold text-lg flex-shrink-0"
                    >
                      {breeder.id.toString().padStart(2, "0")}
                    </div>
                    <div>
                      <h2 className="font-display text-2xl font-bold text-espresso">
                        {breeder.name}
                      </h2>
                      <p className="text-bronze-600 font-medium">
                        {breeder.kennel}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-warm-600">
                      <svg
                        className="w-5 h-5 text-bronze-500 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <span>{breeder.owners}</span>
                    </div>
                    <div className="flex items-center gap-3 text-warm-600">
                      <svg
                        className="w-5 h-5 text-bronze-500 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span>{breeder.location}</span>
                    </div>
                    {breeder.phone && (
                      <a
                        href={`tel:${breeder.phone}`}
                        className="flex items-center gap-3 text-warm-600 hover:text-bronze-600 transition-colors"
                      >
                        <svg
                          className="w-5 h-5 text-bronze-500 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        <span>{breeder.phone}</span>
                      </a>
                    )}
                    {breeder.email && (
                      <a
                        href={`mailto:${breeder.email}`}
                        className="flex items-center gap-3 text-warm-600 hover:text-bronze-600 transition-colors"
                      >
                        <svg
                          className="w-5 h-5 text-bronze-500 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <span>{breeder.email}</span>
                      </a>
                    )}
                  </div>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-bronze-600 font-semibold
                             hover:text-bronze-700 transition-colors group"
                  >
                    Contact Breeder
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Breeder CTA */}
      <section className="section-padding bg-gradient-to-br from-bronze-500 via-bronze-600 to-bronze-500">
        <div className="container-custom text-center">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-6">
            Interested in Becoming an Accredited Breeder?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join our network of dedicated breeders and help preserve the legacy of
            the South African Black Mastiff.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-espresso
                     text-white font-semibold rounded-full transition-all duration-300
                     hover:-translate-y-0.5 hover:shadow-xl"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
