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
      <section className="relative py-24 lg:py-32 mesh-spotlight overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-amber-600/5 rounded-full blur-2xl" />

        <div className="container-custom relative">
          <div className="max-w-3xl">
            <span className="label-micro mb-4 block">
              Testimonials
            </span>
            <h1 className="heading-display text-cream mb-6">
              What Our Members <span className="text-gradient-amber">Say</span>
            </h1>
            <p className="text-xl text-stone-400 leading-relaxed">
              Hear from the passionate owners and breeders who make up our
              community.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section-padding bg-noir">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="relative p-8 card-noir"
              >
                {/* Quote icon */}
                <div className="absolute -top-4 left-8">
                  <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-noir"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                </div>

                <p className="text-stone-400 leading-relaxed mb-6 mt-4 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center">
                    <span className="text-amber-500 font-semibold font-display text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-cream">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-amber-500">SABMA Member</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Share Your Story */}
      <section className="section-padding bg-charcoal relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-transparent to-transparent" />
        <div className="container-custom text-center relative">
          <h2 className="heading-section text-cream mb-6">
            Share Your <span className="text-gradient-amber">Story</span>
          </h2>
          <p className="text-xl text-stone-400 mb-8 max-w-2xl mx-auto">
            Have a wonderful experience with your South African Black Mastiff?
            We&apos;d love to hear from you!
          </p>
          <Link href="/contact" className="btn-primary">
            <span>Submit Your Testimonial</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
