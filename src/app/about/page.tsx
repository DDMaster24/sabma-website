import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about SABMA - the South African Black Mastiff Association dedicated to promoting responsible breeding and upholding breed standards.",
};

export default function AboutPage() {
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
              About Us
            </span>
            <h1 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold text-ivory-100 mb-6">
              Get to Know Us and Our Philosophy
            </h1>
            <p className="text-xl text-ivory-400 leading-relaxed">
              Dedicated to excellence in breeding and the welfare of the South
              African Black Mastiff.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding bg-ivory">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl shadow-espresso/10">
                <Image
                  src="/images/about/two-mastiffs.jpg"
                  alt="South African Black Mastiffs"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-bronze-400/10 rounded-2xl -z-10" />
              <div className="absolute -top-4 -left-4 w-24 h-24">
                <div className="w-full h-px bg-gradient-to-r from-bronze-500 to-transparent" />
                <div className="w-px h-full bg-gradient-to-b from-bronze-500 to-transparent" />
              </div>
            </div>

            {/* Content */}
            <Reveal animation="slide-in-left" className="order-2 lg:order-1">
              <span className="inline-block text-bronze-600 font-semibold tracking-wider uppercase text-sm mb-4">
                About SABMA
              </span>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-espresso mb-6">
                South African Black Mastiff Association
              </h2>
              <div className="space-y-4 text-warm-600 leading-relaxed text-lg">
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
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-ivory-200">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <Reveal animation="slide-in-right" className="order-2 lg:order-1">
              <span className="inline-block text-bronze-600 font-semibold tracking-wider uppercase text-sm mb-4">
                Our Mission
              </span>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-espresso mb-6">
                Promoting Responsible Breeding and Welfare
              </h2>
              <div className="space-y-4 text-warm-600 leading-relaxed text-lg">
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
            </Reveal>

            {/* Image */}
            <div className="relative order-1 lg:order-2">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl shadow-espresso/10">
                <Image
                  src="/images/hero/hero-dogs-water.jpg"
                  alt="Black Mastiffs"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -top-6 -left-6 w-32 h-32 border-2 border-bronze-500/20 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-espresso">
        <div className="container-custom">
          <Reveal className="text-center max-w-3xl mx-auto mb-16" animation="fade-in-up">
            <span className="inline-block text-bronze-400 font-semibold tracking-wider uppercase text-sm mb-4">
              Our Values
            </span>
            <h2 className="font-display text-3xl lg:text-4xl xl:text-5xl font-bold text-ivory-100 mb-6">
              What We Stand For
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Excellence in Breeding",
                description:
                  "We maintain the highest standards in breeding practices to ensure healthy, well-tempered dogs that exemplify the best of the breed.",
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                ),
              },
              {
                title: "Animal Welfare",
                description:
                  "The health and wellbeing of our dogs is paramount. We advocate for responsible ownership and ethical breeding practices.",
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                ),
              },
              {
                title: "Community",
                description:
                  "We foster a supportive community where breeders and owners can share knowledge, experiences, and their love for the breed.",
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                ),
              },
            ].map((value, index) => (
              <Reveal
                key={value.title}
                className="p-8 bg-espresso-50/50 rounded-2xl border border-ivory-100/10
                         hover:border-bronze-400/30 transition-all duration-300"
                delay={index * 150}
                animation="scale-in"
              >
                <div className="w-16 h-16 bg-bronze-400/10 rounded-xl flex items-center justify-center text-bronze-400 mb-6">
                  {value.icon}
                </div>
                <h3 className="font-display text-xl font-semibold text-ivory-100 mb-3">
                  {value.title}
                </h3>
                <p className="text-ivory-400 leading-relaxed">
                  {value.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-bronze-500 via-bronze-400 to-bronze-600">
        <div className="container-custom text-center">
          <Reveal animation="scale-in">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-6">
              Want to Learn More?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Meet our dedicated council members or connect with accredited breeders.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/council"
                className="inline-flex items-center justify-center px-8 py-4 bg-espresso
                        text-white font-semibold rounded-full transition-all duration-300
                        hover:-translate-y-0.5 hover:shadow-xl"
              >
                Meet The Council
              </Link>
              <Link
                href="/breeders"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/20
                        text-white font-semibold rounded-full border-2 border-white/30
                        transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/30"
              >
                Find a Breeder
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
