import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Access valuable resources about the South African Black Mastiff breed - health guides, training tips, breed standards, and more.",
};

const resources = [
  {
    category: "Breed Information",
    items: [
      {
        title: "Breed Standard",
        description:
          "The official breed standard for the South African Black Mastiff, including physical characteristics and temperament.",
        icon: "document",
        available: true,
        link: "/documents/breed-standard.pdf",
      },
      {
        title: "History of the Breed",
        description:
          "Learn about the rich history and heritage of the South African Black Mastiff.",
        icon: "history",
        available: false,
      },
      {
        title: "Breed Characteristics",
        description:
          "Detailed information about the temperament, size, and unique traits of the breed.",
        icon: "info",
        available: false,
      },
    ],
  },
  {
    category: "Health & Care",
    items: [
      {
        title: "Health Guidelines",
        description:
          "Important health information, common conditions, and preventive care for your Black Mastiff.",
        icon: "health",
        available: false,
      },
      {
        title: "Nutrition Guide",
        description:
          "Feeding recommendations and nutritional requirements for puppies and adults.",
        icon: "nutrition",
        available: false,
      },
      {
        title: "Grooming Tips",
        description:
          "Best practices for coat care, nail trimming, and general grooming.",
        icon: "grooming",
        available: false,
      },
    ],
  },
  {
    category: "Training & Behaviour",
    items: [
      {
        title: "Training Basics",
        description:
          "Foundation training techniques specifically suited for the Black Mastiff temperament.",
        icon: "training",
        available: false,
      },
      {
        title: "Socialization Guide",
        description:
          "How to properly socialize your Black Mastiff from puppyhood to adulthood.",
        icon: "social",
        available: false,
      },
      {
        title: "Behavioural Tips",
        description:
          "Understanding and managing common behavioural traits of the breed.",
        icon: "behaviour",
        available: false,
      },
    ],
  },
];

const icons: Record<string, React.ReactNode> = {
  document: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  ),
  history: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  info: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  health: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  ),
  nutrition: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  ),
  grooming: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0 0L9.121 9.121"
      />
    </svg>
  ),
  training: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
      />
    </svg>
  ),
  social: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  ),
  behaviour: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
      />
    </svg>
  ),
};

export default function ResourcesPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 mesh-spotlight overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-amber-600/5 rounded-full blur-2xl" />

        <div className="container-custom relative">
          <div className="max-w-3xl">
            <span className="label-micro mb-4 block">
              Knowledge Base
            </span>
            <h1 className="heading-display text-cream mb-6">
              <span className="text-gradient-amber">Resources</span>
            </h1>
            <p className="text-xl text-stone-400 leading-relaxed">
              Access valuable information about the South African Black Mastiff
              breed - from health guides to training tips.
            </p>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="section-padding bg-noir">
        <div className="container-custom">
          {resources.map((section) => (
            <div key={section.category} className="mb-16 last:mb-0">
              <h2 className="font-display text-2xl font-bold text-cream mb-8 flex items-center gap-3">
                <span className="w-8 h-px bg-amber-500" />
                {section.category}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {section.items.map((item) => (
                  <div
                    key={item.title}
                    className={`group p-6 card-noir ${
                      item.available
                        ? "cursor-pointer"
                        : ""
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${
                        item.available
                          ? "bg-amber-500/10 border border-amber-500/20 text-amber-500 group-hover:bg-amber-500 group-hover:text-noir"
                          : "bg-stone-800/50 border border-stone-700/50 text-stone-500"
                      }`}
                    >
                      {icons[item.icon]}
                    </div>
                    <h3 className={`font-display text-lg font-semibold mb-2 ${
                      item.available ? "text-cream" : "text-stone-400"
                    }`}>
                      {item.title}
                    </h3>
                    <p className="text-stone-500 text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>
                    {item.available ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-amber-500 font-medium text-sm group-hover:text-amber-400"
                      >
                        Download PDF
                        <svg
                          className="w-4 h-4 transition-transform group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-2 text-stone-500 text-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Coming Soon
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="section-padding bg-charcoal">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            {/* For New Owners */}
            <div className="p-8 card-noir">
              <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold text-cream mb-3">
                New to Black Mastiffs?
              </h3>
              <p className="text-stone-400 mb-6">
                Start your journey with our comprehensive guide on buying a puppy from an accredited breeder.
              </p>
              <Link
                href="/buying-a-puppy"
                className="inline-flex items-center gap-2 text-amber-500 font-semibold hover:text-amber-400 transition-colors"
              >
                Read the Puppy Guide
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Find a Breeder */}
            <div className="p-8 card-noir">
              <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-7 h-7 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-bold text-cream mb-3">
                Find an Accredited Breeder
              </h3>
              <p className="text-stone-400 mb-6">
                Connect with SABMA-accredited breeders who maintain the highest standards for the breed.
              </p>
              <Link
                href="/breeders"
                className="inline-flex items-center gap-2 text-amber-500 font-semibold hover:text-amber-400 transition-colors"
              >
                View Breeders
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding mesh-spotlight">
        <div className="container-custom text-center">
          <h2 className="heading-section text-cream mb-6">
            Can&apos;t Find What You&apos;re <span className="text-gradient-amber">Looking For?</span>
          </h2>
          <p className="text-xl text-stone-400 mb-8 max-w-2xl mx-auto">
            Our team is here to help. Reach out with any questions about the breed.
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
