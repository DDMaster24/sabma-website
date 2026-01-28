import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Buying a Puppy",
  description:
    "Everything you need to know about buying a South African Black Mastiff puppy from an accredited SABMA breeder.",
};

const buyingSteps = [
  {
    step: 1,
    title: "Research the Breed",
    description:
      "Ensure the South African Black Mastiff is the right breed for your lifestyle. They are large, powerful dogs that require space, proper training, and an experienced owner.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),
  },
  {
    step: 2,
    title: "Find an Accredited Breeder",
    description:
      "Only purchase from SABMA accredited breeders who follow ethical breeding practices and health testing protocols.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    step: 3,
    title: "Visit the Breeder",
    description:
      "Meet the breeder in person, see the parents and the environment where the puppies are raised. Ask questions about health history and temperament.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    step: 4,
    title: "Review Documentation",
    description:
      "Ensure you receive proper registration papers, health certificates, vaccination records, and a sales agreement.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
  },
  {
    step: 5,
    title: "Prepare Your Home",
    description:
      "Before bringing your puppy home, ensure you have the necessary supplies, a safe space, and have puppy-proofed your home.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },
  {
    step: 6,
    title: "Welcome Your Puppy",
    description:
      "Bring your puppy home and begin the journey of responsible ownership, training, and creating a lifelong bond.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
  },
];

const whatToExpect = [
  {
    title: "Health Testing",
    description:
      "All SABMA accredited breeders conduct health testing on breeding dogs to minimize genetic health issues.",
  },
  {
    title: "Registration Papers",
    description:
      "Your puppy should come with proper SABMA registration documentation proving its lineage.",
  },
  {
    title: "Vaccination Records",
    description:
      "Puppies should be vaccinated and dewormed according to veterinary guidelines before going to their new homes.",
  },
  {
    title: "Socialization",
    description:
      "Reputable breeders begin early socialization, exposing puppies to various stimuli for better temperament.",
  },
  {
    title: "Support",
    description:
      "Accredited breeders provide ongoing support and guidance throughout your dog's life.",
  },
  {
    title: "Health Guarantee",
    description:
      "Most breeders offer a health guarantee covering genetic conditions for a specified period.",
  },
];

export default function BuyingAPuppyPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 mesh-spotlight overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-amber-600/5 rounded-full blur-2xl" />

        <div className="container-custom relative">
          <div className="max-w-3xl">
            <span className="label-micro mb-4 block">
              Your Journey Starts Here
            </span>
            <h1 className="heading-display text-cream mb-6">
              Buying a <span className="text-gradient-amber">Puppy</span>
            </h1>
            <p className="text-xl text-stone-400 leading-relaxed">
              Everything you need to know about bringing a South African Black
              Mastiff into your family.
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="section-padding bg-noir">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="label-micro mb-4 block">
              The Process
            </span>
            <h2 className="heading-section text-cream mb-6">
              Steps to Finding Your <span className="text-gradient-amber">Puppy</span>
            </h2>
            <p className="text-stone-400">
              Follow these steps to ensure you find a healthy, well-bred puppy
              from a responsible breeder.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {buyingSteps.map((item) => (
              <div
                key={item.step}
                className="relative p-8 card-noir"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center
                              text-noir font-display font-bold text-lg"
                  >
                    {item.step}
                  </div>
                  <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-center justify-center text-amber-500">
                    {item.icon}
                  </div>
                </div>
                <h3 className="font-display text-xl font-semibold text-cream mb-2">
                  {item.title}
                </h3>
                <p className="text-stone-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="section-padding mesh-spotlight">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="label-micro mb-4 block">
              From Accredited Breeders
            </span>
            <h2 className="heading-section text-cream mb-6">
              What to <span className="text-gradient-amber">Expect</span>
            </h2>
            <p className="text-stone-400">
              When you purchase from a SABMA accredited breeder, you can expect
              the following standards.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whatToExpect.map((item) => (
              <div
                key={item.title}
                className="p-6 card-noir"
              >
                <h3 className="font-display text-lg font-semibold text-cream mb-2">
                  {item.title}
                </h3>
                <p className="text-stone-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Notice */}
      <section className="section-padding bg-charcoal">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-amber-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="heading-section text-cream mb-4">
              Important <span className="text-gradient-amber">Notice</span>
            </h2>
            <p className="text-stone-400 mb-6">
              The South African Black Mastiff is a powerful breed that requires
              responsible ownership. They need proper training, socialization, and
              a committed owner who understands large breed management. Please
              ensure you are prepared for this responsibility before purchasing a
              puppy.
            </p>
            <p className="text-cream font-medium">
              Only purchase from SABMA accredited breeders to ensure you receive a
              healthy, well-bred puppy with proper documentation.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-noir relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-transparent to-transparent" />
        <div className="container-custom text-center relative">
          <h2 className="heading-section text-cream mb-6">
            Ready to Find Your <span className="text-gradient-amber">Puppy?</span>
          </h2>
          <p className="text-xl text-stone-400 mb-8 max-w-2xl mx-auto">
            Browse our directory of accredited breeders or contact us for
            assistance in finding the perfect puppy.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/breeders" className="btn-primary">
              <span>View Breeders</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/contact" className="btn-secondary">
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
