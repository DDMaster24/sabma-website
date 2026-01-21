import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how SABMA collects, uses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
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
              Legal
            </span>
            <h1 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold text-ivory-100 mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-ivory-400 leading-relaxed">
              Your privacy is important to us. This policy explains how we
              collect, use, and protect your personal information.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section-padding bg-ivory">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg prose-warm max-w-none">
              <p className="text-warm-600 leading-relaxed mb-8">
                Last updated: {new Date().toLocaleDateString("en-ZA", { month: "long", year: "numeric" })}
              </p>

              <div className="space-y-12">
                {/* Section 1 */}
                <div>
                  <h2 className="font-display text-2xl font-bold text-espresso mb-4">
                    1. Information We Collect
                  </h2>
                  <div className="text-warm-600 space-y-4">
                    <p>
                      The South African Black Mastiff Association (SABMA) collects information
                      that you voluntarily provide to us when you:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Submit a contact form or inquiry</li>
                      <li>Subscribe to our newsletter</li>
                      <li>Apply for membership or breeder registration</li>
                      <li>Register a dog in our stud register</li>
                      <li>Attend our events or appraisals</li>
                    </ul>
                    <p>
                      This information may include your name, email address, phone number,
                      physical address, and details about your dogs.
                    </p>
                  </div>
                </div>

                {/* Section 2 */}
                <div>
                  <h2 className="font-display text-2xl font-bold text-espresso mb-4">
                    2. How We Use Your Information
                  </h2>
                  <div className="text-warm-600 space-y-4">
                    <p>We use the information we collect to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Respond to your inquiries and provide customer support</li>
                      <li>Send you newsletters and updates about SABMA activities</li>
                      <li>Process membership and registration applications</li>
                      <li>Maintain our breeder directory and stud register</li>
                      <li>Organize and communicate about events</li>
                      <li>Improve our website and services</li>
                    </ul>
                  </div>
                </div>

                {/* Section 3 */}
                <div>
                  <h2 className="font-display text-2xl font-bold text-espresso mb-4">
                    3. Information Sharing
                  </h2>
                  <div className="text-warm-600 space-y-4">
                    <p>
                      We do not sell, trade, or otherwise transfer your personal information
                      to third parties without your consent, except:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        Breeder information that you consent to be publicly displayed
                        in our breeder directory
                      </li>
                      <li>
                        Stud dog information that you consent to be listed in our
                        public stud register
                      </li>
                      <li>
                        When required by law or to protect our rights
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Section 4 */}
                <div>
                  <h2 className="font-display text-2xl font-bold text-espresso mb-4">
                    4. Data Security
                  </h2>
                  <div className="text-warm-600 space-y-4">
                    <p>
                      We implement appropriate security measures to protect your personal
                      information against unauthorized access, alteration, disclosure, or
                      destruction. However, no method of transmission over the Internet
                      is 100% secure.
                    </p>
                  </div>
                </div>

                {/* Section 5 */}
                <div>
                  <h2 className="font-display text-2xl font-bold text-espresso mb-4">
                    5. Your Rights
                  </h2>
                  <div className="text-warm-600 space-y-4">
                    <p>
                      In accordance with the Protection of Personal Information Act (POPIA),
                      you have the right to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Access the personal information we hold about you</li>
                      <li>Request correction of inaccurate information</li>
                      <li>Request deletion of your personal information</li>
                      <li>Withdraw consent for marketing communications</li>
                      <li>Lodge a complaint with the Information Regulator</li>
                    </ul>
                  </div>
                </div>

                {/* Section 6 */}
                <div>
                  <h2 className="font-display text-2xl font-bold text-espresso mb-4">
                    6. Cookies
                  </h2>
                  <div className="text-warm-600 space-y-4">
                    <p>
                      Our website may use cookies to enhance your browsing experience.
                      Cookies are small files stored on your device that help us understand
                      how you use our website. You can choose to disable cookies through
                      your browser settings.
                    </p>
                  </div>
                </div>

                {/* Section 7 */}
                <div>
                  <h2 className="font-display text-2xl font-bold text-espresso mb-4">
                    7. Changes to This Policy
                  </h2>
                  <div className="text-warm-600 space-y-4">
                    <p>
                      We may update this privacy policy from time to time. Any changes
                      will be posted on this page with an updated revision date.
                    </p>
                  </div>
                </div>

                {/* Section 8 */}
                <div>
                  <h2 className="font-display text-2xl font-bold text-espresso mb-4">
                    8. Contact Us
                  </h2>
                  <div className="text-warm-600 space-y-4">
                    <p>
                      If you have any questions about this privacy policy or our data
                      practices, please contact us:
                    </p>
                    <div className="bg-ivory-200 p-6 rounded-xl">
                      <p className="font-semibold text-espresso mb-2">{siteConfig.fullName}</p>
                      <p>Email: <a href={`mailto:${siteConfig.email}`} className="text-bronze-600 hover:text-bronze-700">{siteConfig.email}</a></p>
                      <p>Phone: <a href={`tel:${siteConfig.phone}`} className="text-bronze-600 hover:text-bronze-700">{siteConfig.phone}</a></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Back Link */}
            <div className="mt-12 pt-8 border-t border-espresso/10">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-bronze-600 font-semibold hover:text-bronze-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                </svg>
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
