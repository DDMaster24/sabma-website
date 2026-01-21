import { Metadata } from "next";
import Link from "next/link";
import { testimonials } from "@/data/content";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Read what our members and owners say about the South African Black Mastiff breed and their experience with SABMA.",
};

export default function TestimonialsPage() {
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
              Testimonials
            </span>
            <h1 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold text-ivory-100 mb-6">
              What Our Members Say
            </h1>
            <p className="text-xl text-ivory-400 leading-relaxed">
              Hear from the passionate owners and breeders who make up our
              community.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section-padding bg-ivory">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="relative p-8 bg-white rounded-2xl border border-espresso/5
                         hover:border-bronze-300 hover:shadow-lg transition-all duration-300"
              >
                {/* Quote icon */}
                <div className="absolute -top-4 left-8">
                  <div className="w-10 h-10 bg-bronze-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                </div>

                <p className="text-warm-600 leading-relaxed mb-6 mt-4 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-bronze-100 rounded-full flex items-center justify-center">
                    <span className="text-bronze-600 font-semibold font-display text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-espresso">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-bronze-600">SABMA Member</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Share Your Story */}
      <section className="section-padding bg-gradient-to-br from-bronze-500 via-bronze-600 to-bronze-500">
        <div className="container-custom text-center">
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-6">
            Share Your Story
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Have a wonderful experience with your South African Black Mastiff?
            We&apos;d love to hear from you!
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-espresso
                     text-white font-semibold rounded-full transition-all duration-300
                     hover:-translate-y-0.5 hover:shadow-xl"
          >
            Submit Your Testimonial
          </Link>
        </div>
      </section>
    </>
  );
}
