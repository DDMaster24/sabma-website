import { Metadata } from "next";
import Link from "next/link";
import { councilMembers } from "@/data/content";

export const metadata: Metadata = {
  title: "The Council",
  description:
    "Meet the dedicated individuals steering SABMA towards excellence - the heartbeat of our organization.",
};

export default function CouncilPage() {
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
              Our Team
            </span>
            <h1 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold text-ivory-100 mb-6">
              The Council
            </h1>
            <p className="text-xl text-ivory-400 leading-relaxed">
              Meet the dedicated individuals steering our community towards
              excellence. They are the heartbeat of SABMA where decisions are made
              to uphold the standards, ethics, and future of the South African
              Black Mastiff breed.
            </p>
          </div>
        </div>
      </section>

      {/* Council Members Grid */}
      <section className="section-padding bg-ivory">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {councilMembers.map((member) => (
              <div
                key={member.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-lg
                         transition-all duration-300 hover:-translate-y-1 border border-espresso/5"
              >
                {/* Image / Avatar */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-ivory-200 to-ivory-300 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-bronze-400/10 rounded-full flex items-center justify-center
                                  group-hover:bg-bronze-400/20 transition-all duration-300">
                      <span className="text-4xl text-bronze-600 font-display font-bold">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/20 to-transparent opacity-0
                                group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="inline-block px-3 py-1 bg-bronze-400/10 text-bronze-700 text-xs font-semibold rounded-full mb-3">
                    {member.role}
                  </div>
                  <h3 className="font-display text-xl font-semibold text-espresso mb-4">
                    {member.name}
                  </h3>

                  {/* Contact Info */}
                  <div className="space-y-2">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="flex items-center gap-3 text-sm text-warm-600 hover:text-bronze-600 transition-colors"
                      >
                        <svg
                          className="w-4 h-4 flex-shrink-0 text-bronze-500"
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
                        <span className="truncate">{member.email}</span>
                      </a>
                    )}
                    {member.phone && (
                      <a
                        href={`tel:${member.phone}`}
                        className="flex items-center gap-3 text-sm text-warm-600 hover:text-bronze-600 transition-colors"
                      >
                        <svg
                          className="w-4 h-4 flex-shrink-0 text-bronze-500"
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
                        <span>{member.phone}</span>
                      </a>
                    )}
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
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 bg-white rounded-2xl border border-espresso/5">
                <div className="w-14 h-14 bg-bronze-400/10 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-bronze-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-bold text-espresso mb-3">
                  Our Commitment
                </h3>
                <p className="text-warm-600">
                  Every council member is committed to upholding the breed standard
                  and ensuring ethical practices across all SABMA-accredited breeders.
                </p>
              </div>
              <div className="p-8 bg-white rounded-2xl border border-espresso/5">
                <div className="w-14 h-14 bg-bronze-400/10 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-bronze-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-bold text-espresso mb-3">
                  Years of Experience
                </h3>
                <p className="text-warm-600">
                  Our council members bring decades of combined experience in breeding,
                  showing, and caring for South African Black Mastiffs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section className="section-padding bg-espresso">
        <div className="container-custom text-center">
          <span className="inline-block text-bronze-400 font-semibold tracking-wider uppercase text-sm mb-4">
            Get Involved
          </span>
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-ivory-100 mb-6">
            Want to Be Part of SABMA?
          </h2>
          <p className="text-xl text-ivory-400 mb-8 max-w-2xl mx-auto">
            Join our community of passionate black mastiff enthusiasts and
            contribute to the future of the breed.
          </p>
          <Link href="/contact" className="btn-primary">
            Contact Us Today
          </Link>
        </div>
      </section>
    </>
  );
}
