import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about SABMA - the South African Black Mastiff Association dedicated to promoting responsible breeding and upholding breed standards.",
};

export default function AboutPage() {
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
              <span className="label-micro">About Us</span>
            </div>
            <h1 className="heading-display text-cream mb-6">
              Get to Know Us and
              <br />
              <span className="text-gradient-amber">Our Philosophy</span>
            </h1>
            <p className="text-xl text-stone-400 leading-relaxed">
              Dedicated to excellence in breeding and the welfare of the South
              African Black Mastiff.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding bg-charcoal">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-stone-700/50 to-transparent" />
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <div className="relative aspect-square rounded-2xl overflow-hidden border border-stone-800/50">
                <div className="absolute inset-0 bg-gradient-to-br from-charcoal to-noir flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto bg-amber-500/10 rounded-full flex items-center justify-center mb-4 border border-amber-500/20">
                      <svg className="w-10 h-10 text-amber-500/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-stone-500">Two Mastiffs Image</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-noir/60 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-amber-500/5 rounded-2xl -z-10" />
              <div className="absolute -top-4 -left-4 w-24 h-24">
                <div className="w-full h-px bg-gradient-to-r from-amber-500 to-transparent" />
                <div className="w-px h-full bg-gradient-to-b from-amber-500 to-transparent" />
              </div>
            </div>

            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-amber-500/50" />
                <span className="label-micro">About SABMA</span>
              </div>
              <h2 className="heading-section text-cream mb-6">
                South African Black
                <br />
                <span className="text-gradient-amber">Mastiff Association</span>
              </h2>
              <div className="space-y-4 text-stone-400 leading-relaxed text-lg">
                <p>
                  The South African Black Mastiff Association (SABMA) is an
                  organization for breeders of black mastiffs in South Africa.
                  Established to promote responsible breeding and uphold the
                  standards of the black mastiff breed, SABMA focuses on a
                  community of enthusiasts who share a passion for these dogs.
                </p>
                <p>
                  We are dedicated to providing support and education to our
                  members, and promoting the welfare of black mastiffs throughout
                  South Africa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-noir">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-px bg-amber-500/50" />
                <span className="label-micro">Our Mission</span>
              </div>
              <h2 className="heading-section text-cream mb-6">
                Promoting Responsible
                <br />
                <span className="text-gradient-amber">Breeding & Welfare</span>
              </h2>
              <div className="space-y-4 text-stone-400 leading-relaxed text-lg">
                <p>
                  At SABMA, we are committed to promoting responsible breeding
                  practices and upholding the highest standards of welfare for our
                  black mastiffs. Our mission is to ensure that these magnificent
                  dogs continue to thrive in South Africa, and that they are
                  recognized as a valuable and respected breed.
                </p>
                <p>
                  We believe that by working together, we can create a community of
                  like-minded enthusiasts who share our passion for these wonderful
                  animals.
                </p>
              </div>
            </div>

            {/* Image */}
            <div className="relative order-1 lg:order-2">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-stone-800/50">
                <div className="absolute inset-0 bg-gradient-to-br from-charcoal to-noir flex items-center justify-center">
                  <span className="text-stone-500">Black Mastiffs Image</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-noir/60 via-transparent to-transparent" />
              </div>
              <div className="absolute -top-6 -left-6 w-32 h-32 border-2 border-amber-500/20 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-charcoal relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-stone-700/50 to-transparent" />
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-amber-500/50" />
              <span className="label-micro">Our Values</span>
              <div className="w-12 h-px bg-amber-500/50" />
            </div>
            <h2 className="heading-display text-cream">
              What We
              <br />
              <span className="text-gradient-amber">Stand For</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Excellence in Breeding",
                description:
                  "We maintain the highest standards in breeding practices to ensure healthy, well-tempered dogs that exemplify the best of the breed.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                ),
              },
              {
                title: "Animal Welfare",
                description:
                  "The health and wellbeing of our dogs is paramount. We advocate for responsible ownership and ethical breeding practices.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                ),
              },
              {
                title: "Community",
                description:
                  "We foster a supportive community where breeders and owners can share knowledge, experiences, and their love for the breed.",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
              },
            ].map((value) => (
              <div
                key={value.title}
                className="card-noir p-8"
              >
                <div className="w-16 h-16 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500 mb-6 border border-amber-500/20">
                  {value.icon}
                </div>
                <h3 className="font-display text-xl font-medium text-cream mb-3">
                  {value.title}
                </h3>
                <p className="text-stone-500 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-noir to-noir" />
        <div className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 60% 60% at 20% 30%, rgba(217, 119, 6, 0.15) 0%, transparent 50%)`,
          }}
        />

        <div className="container-custom relative text-center">
          <div className="inline-flex items-center gap-4 mb-8">
            <div className="w-16 h-px bg-amber-500/40" />
            <div className="w-3 h-3 rounded-full border border-amber-500/60" />
            <div className="w-16 h-px bg-amber-500/40" />
          </div>
          <h2 className="heading-display text-cream mb-6">
            Want to Learn More?
          </h2>
          <p className="text-xl text-stone-400 mb-10 max-w-2xl mx-auto">
            Meet our dedicated council members or connect with accredited breeders.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/council" className="btn-primary">
              <span>Meet The Council</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/breeders" className="btn-secondary">
              <span>Find a Breeder</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
