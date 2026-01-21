import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { studDogs } from "@/data/content";

export const metadata: Metadata = {
  title: "Stud Register",
  description:
    "The Stud Register stands as a testament to the elite and exclusive lineage of our exceptional canine members.",
};

export default function StudRegisterPage() {
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
              Elite Lineage
            </span>
            <h1 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold text-ivory-100 mb-6">
              Stud Register
            </h1>
            <p className="text-xl text-ivory-400 leading-relaxed">
              The Stud Register stands as a testament to the elite and exclusive
              lineage of our exceptional canine members, showcasing the remarkable
              heritage and outstanding qualities that define our South African
              Black Mastiffs as distinguished companions of unparalleled
              excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Stud Dogs Grid */}
      <section className="section-padding bg-ivory">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-espresso mb-4">
              Registered <span className="text-gradient">Studs</span>
            </h2>
            <p className="text-warm-600 max-w-2xl mx-auto">
              Our registered studs represent the finest examples of the breed,
              with verified lineage and health certifications.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {studDogs.map((dog) => (
              <div
                key={dog.id}
                className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-lg
                         transition-all duration-300 hover:-translate-y-1 group border border-espresso/5"
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-ivory-200 to-ivory-300">
                  {dog.image && !dog.image.includes('placeholder') ? (
                    <Image
                      src={dog.image}
                      alt={dog.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto bg-bronze-400/10 rounded-full flex items-center justify-center mb-3">
                          <svg className="w-10 h-10 text-bronze-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </div>
                        <p className="text-warm-400 text-sm">Photo coming soon</p>
                      </div>
                    </div>
                  )}
                  {/* Status badge */}
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                                ${
                                  dog.status === "SILVER"
                                    ? "bg-warm-200 text-warm-700"
                                    : dog.status === "GOLD"
                                    ? "bg-bronze-400 text-espresso"
                                    : "bg-bronze-100 text-bronze-700"
                                }`}
                    >
                      {dog.status}
                    </span>
                  </div>
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-espresso mb-2 group-hover:text-bronze-600 transition-colors">
                    {dog.name}
                  </h3>
                  <div className="flex items-start gap-2 text-warm-600 text-sm">
                    <span className="text-bronze-600 font-medium shrink-0">Lineage:</span>
                    <span>{dog.lineage}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="section-padding bg-ivory-200">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-bronze-600 font-semibold tracking-wider uppercase text-sm mb-4">
              Registration
            </span>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-espresso mb-6">
              Stud Registration Levels
            </h2>
            <p className="text-warm-600 mb-12">
              Our stud register categorizes dogs based on their breeding history,
              health certifications, and show achievements.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  level: "Bronze",
                  description: "Entry level for dogs meeting basic breed standards",
                  color: "bg-bronze-100 text-bronze-700 border-bronze-200",
                },
                {
                  level: "Silver",
                  description:
                    "Dogs with proven breeding success and health certifications",
                  color: "bg-warm-200 text-warm-700 border-warm-300",
                },
                {
                  level: "Gold",
                  description:
                    "Elite status for champion lineage and exceptional qualities",
                  color: "bg-bronze-400 text-espresso border-bronze-500",
                },
              ].map((tier) => (
                <div
                  key={tier.level}
                  className="p-6 bg-white rounded-xl border border-espresso/5 hover:shadow-lg transition-all duration-300"
                >
                  <span
                    className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-4 border ${tier.color}`}
                  >
                    {tier.level}
                  </span>
                  <p className="text-warm-600 text-sm">{tier.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-ivory">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-8 bg-white rounded-2xl border border-espresso/5">
              <div className="w-14 h-14 bg-bronze-400/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-bronze-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold text-espresso mb-3">
                Verified Lineage
              </h3>
              <p className="text-warm-600">
                All registered studs have documented pedigrees verified by SABMA,
                ensuring the authenticity and quality of their bloodlines.
              </p>
            </div>
            <div className="p-8 bg-white rounded-2xl border border-espresso/5">
              <div className="w-14 h-14 bg-bronze-400/10 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-bronze-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold text-espresso mb-3">
                Health Tested
              </h3>
              <p className="text-warm-600">
                Our studs undergo comprehensive health screenings to ensure they
                meet the highest standards for breeding healthy puppies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-espresso">
        <div className="container-custom text-center">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-ivory-100 mb-6">
            Register Your Stud
          </h2>
          <p className="text-xl text-ivory-400 mb-8 max-w-2xl mx-auto">
            Have a qualifying South African Black Mastiff? Apply to have your dog
            listed in our prestigious stud register.
          </p>
          <Link href="/contact" className="btn-primary">
            Apply Now
          </Link>
        </div>
      </section>
    </>
  );
}
