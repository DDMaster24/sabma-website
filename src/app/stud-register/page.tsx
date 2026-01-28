import { Metadata } from "next";
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
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 mesh-spotlight" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-copper-500/5 rounded-full blur-2xl" />

        <div className="container-custom relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-amber-500/50" />
              <span className="label-micro">Elite Lineage</span>
            </div>
            <h1 className="heading-display text-cream mb-6">
              Stud
              <br />
              <span className="text-gradient-amber">Register</span>
            </h1>
            <p className="text-xl text-stone-400 leading-relaxed">
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
      <section className="section-padding bg-charcoal relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-stone-700/50 to-transparent" />
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="heading-section text-cream mb-4">
              Registered <span className="text-gradient-amber">Studs</span>
            </h2>
            <p className="text-stone-400 max-w-2xl mx-auto">
              Our registered studs represent the finest examples of the breed,
              with verified lineage and health certifications.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {studDogs.map((dog) => (
              <div key={dog.id} className="group card-noir overflow-hidden">
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-noir to-charcoal">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto bg-amber-500/10 rounded-full flex items-center justify-center mb-3 border border-amber-500/20">
                        <svg className="w-10 h-10 text-amber-500/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                      <p className="text-stone-500 text-sm">Photo coming soon</p>
                    </div>
                  </div>
                  {/* Status badge */}
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border
                                ${
                                  dog.status === "SILVER"
                                    ? "bg-stone-400/10 text-stone-300 border-stone-400/30"
                                    : dog.status === "GOLD"
                                    ? "bg-amber-500/20 text-amber-400 border-amber-500/40"
                                    : "bg-copper-500/10 text-copper-400 border-copper-500/30"
                                }`}
                    >
                      {dog.status}
                    </span>
                  </div>
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-noir/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display text-xl font-medium text-cream mb-2 group-hover:text-amber-400 transition-colors">
                    {dog.name}
                  </h3>
                  <div className="flex items-start gap-2 text-stone-500 text-sm">
                    <span className="text-amber-500/80 font-medium shrink-0">Lineage:</span>
                    <span>{dog.lineage}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="section-padding bg-noir">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-amber-500/50" />
              <span className="label-micro">Registration</span>
              <div className="w-12 h-px bg-amber-500/50" />
            </div>
            <h2 className="heading-section text-cream mb-6">
              Stud Registration
              <br />
              <span className="text-gradient-amber">Levels</span>
            </h2>
            <p className="text-stone-400 mb-12">
              Our stud register categorizes dogs based on their breeding history,
              health certifications, and show achievements.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  level: "Bronze",
                  description: "Entry level for dogs meeting basic breed standards",
                  color: "text-copper-400 border-copper-500/30 bg-copper-500/10",
                },
                {
                  level: "Silver",
                  description: "Dogs with proven breeding success and health certifications",
                  color: "text-stone-300 border-stone-400/30 bg-stone-400/10",
                },
                {
                  level: "Gold",
                  description: "Elite status for champion lineage and exceptional qualities",
                  color: "text-amber-400 border-amber-500/40 bg-amber-500/20",
                },
              ].map((tier) => (
                <div key={tier.level} className="card-noir p-6">
                  <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-4 border ${tier.color}`}>
                    {tier.level}
                  </span>
                  <p className="text-stone-500 text-sm">{tier.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding bg-charcoal relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-stone-700/50 to-transparent" />
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="card-noir p-8">
              <div className="w-14 h-14 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6 border border-amber-500/20">
                <svg className="w-7 h-7 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-medium text-cream mb-3">
                Verified Lineage
              </h3>
              <p className="text-stone-500">
                All registered studs have documented pedigrees verified by SABMA,
                ensuring the authenticity and quality of their bloodlines.
              </p>
            </div>
            <div className="card-noir p-8">
              <div className="w-14 h-14 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6 border border-amber-500/20">
                <svg className="w-7 h-7 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-medium text-cream mb-3">
                Health Tested
              </h3>
              <p className="text-stone-500">
                Our studs undergo comprehensive health screenings to ensure they
                meet the highest standards for breeding healthy puppies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-noir to-noir" />
        <div className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 60% 60% at 50% 50%, rgba(217, 119, 6, 0.15) 0%, transparent 50%)`,
          }}
        />

        <div className="container-custom relative text-center">
          <h2 className="heading-display text-cream mb-6">
            Register Your
            <br />
            <span className="text-gradient-amber">Stud</span>
          </h2>
          <p className="text-xl text-stone-400 mb-10 max-w-2xl mx-auto">
            Have a qualifying South African Black Mastiff? Apply to have your dog
            listed in our prestigious stud register.
          </p>
          <Link href="/contact" className="btn-primary">
            <span>Apply Now</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
