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
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 mesh-spotlight" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-copper-500/5 rounded-full blur-2xl" />

        <div className="container-custom relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-amber-500/50" />
              <span className="label-micro">Our Team</span>
            </div>
            <h1 className="heading-display text-cream mb-6">
              The
              <br />
              <span className="text-gradient-amber">Council</span>
            </h1>
            <p className="text-xl text-stone-400 leading-relaxed">
              Meet the dedicated individuals steering our community towards
              excellence. They are the heartbeat of SABMA where decisions are made
              to uphold the standards, ethics, and future of the South African
              Black Mastiff breed.
            </p>
          </div>
        </div>
      </section>

      {/* Council Members Grid */}
      <section className="section-padding bg-charcoal relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-stone-700/50 to-transparent" />
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {councilMembers.map((member) => (
              <div
                key={member.id}
                className="group card-noir overflow-hidden"
              >
                {/* Image / Avatar */}
                <div className="relative aspect-[4/3] bg-gradient-to-br from-noir to-charcoal overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-amber-500/10 rounded-full flex items-center justify-center
                                  border border-amber-500/20 group-hover:bg-amber-500/20 transition-all duration-300">
                      <span className="text-4xl text-amber-500 font-display font-medium">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-noir/60 to-transparent opacity-0
                                group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="inline-block px-3 py-1 bg-amber-500/10 text-amber-500 text-xs font-semibold
                                tracking-wider uppercase rounded-full mb-3 border border-amber-500/20">
                    {member.role}
                  </div>
                  <h3 className="font-display text-xl font-medium text-cream mb-4">
                    {member.name}
                  </h3>

                  {/* Contact Info */}
                  <div className="space-y-2">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="flex items-center gap-3 text-sm text-stone-500 hover:text-amber-500 transition-colors"
                      >
                        <svg className="w-4 h-4 flex-shrink-0 text-amber-500/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="truncate">{member.email}</span>
                      </a>
                    )}
                    {member.phone && (
                      <a
                        href={`tel:${member.phone}`}
                        className="flex items-center gap-3 text-sm text-stone-500 hover:text-amber-500 transition-colors"
                      >
                        <svg className="w-4 h-4 flex-shrink-0 text-amber-500/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
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
      <section className="section-padding bg-noir">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="card-noir p-8">
                <div className="w-14 h-14 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6 border border-amber-500/20">
                  <svg className="w-7 h-7 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-medium text-cream mb-3">
                  Our Commitment
                </h3>
                <p className="text-stone-500">
                  Every council member is committed to upholding the breed standard
                  and ensuring ethical practices across all SABMA-accredited breeders.
                </p>
              </div>
              <div className="card-noir p-8">
                <div className="w-14 h-14 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6 border border-amber-500/20">
                  <svg className="w-7 h-7 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-medium text-cream mb-3">
                  Years of Experience
                </h3>
                <p className="text-stone-500">
                  Our council members bring decades of combined experience in breeding,
                  showing, and caring for South African Black Mastiffs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Section */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-noir to-noir" />
        <div className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 60% 60% at 80% 70%, rgba(217, 119, 6, 0.1) 0%, transparent 50%)`,
          }}
        />

        <div className="container-custom relative text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-amber-500/50" />
            <span className="label-micro">Get Involved</span>
            <div className="w-12 h-px bg-amber-500/50" />
          </div>
          <h2 className="heading-display text-cream mb-6">
            Want to Be Part of
            <br />
            <span className="text-gradient-amber">SABMA?</span>
          </h2>
          <p className="text-xl text-stone-400 mb-10 max-w-2xl mx-auto">
            Join our community of passionate black mastiff enthusiasts and
            contribute to the future of the breed.
          </p>
          <Link href="/contact" className="btn-primary">
            <span>Contact Us Today</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
