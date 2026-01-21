import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/content";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms and conditions for using the SABMA website and services.",
};

export default function TermsOfServicePage() {
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
              Terms of Service
            </h1>
            <p className="text-xl text-ivory-400 leading-relaxed">
              Please read these terms carefully before using our website and
              services.
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
                    1. Acceptance of Terms
                  </h2>
                  <div className="text-warm-600 space-y-4">
                    <p>
                      By accessing and using the South African Black Mastiff Association
                      (SABMA) website, you accept and agree to be bound by these Terms of
                      Service. If you do not agree to these terms, please do not use our
                      website or services.
                    </p>
                  </div>
                </div>

                {/* Section 2 */}
                <div>
                  <h2 className="font-display text-2xl font-bold text-espresso mb-4">
                    2. Use of Website
                  </h2>
                  <div className="text-warm-600 space-y-4">
                    <p>You agree to use this website only for lawful purposes and in a way that does not:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Infringe the rights of others or restrict their use of the website</li>
                      <li>Violate any applicable local, national, or international law</li>
                      <li>Transmit any harmful, threatening, or offensive material</li>
                      <li>Attempt to gain unauthorized access to our systems</li>
                      <li>Interfere with the proper functioning of the website</li>
                    </ul>
                  </div>
                </div>

                {/* Section 3 */}
                <div>
                  <h2 className="font-display text-2xl font-bold text-espresso mb-4">
                    3. Membership and Registration
                  </h2>
                  <div className="text-warm-600 space-y-4">
                    <p>
                      SABMA membership and breeder/stud registration are subject to approval
                      by the SABMA council. By applying for membership or registration, you agree to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Provide accurate and complete information</li>
                      <li>Maintain the accuracy of your information</li>
                      <li>Comply with SABMA&apos;s breeding standards and ethical guidelines</li>
                      <li>Pay any applicable membership fees</li>
                      <li>Abide by decisions made by the SABMA council</li>
                    </ul>
                    <p>
                      SABMA reserves the right to refuse, suspend, or revoke membership
                      or registration at its discretion.
                    </p>
                  </div>
                </div>

                {/* Section 4 */}
                <div>
                  <h2 className="font-display text-2xl font-bold text-espresso mb-4">
                    4. Breeder Directory
                  </h2>
                  <div className="text-warm-600 space-y-4">
                    <p>
                      Breeders listed in our directory have agreed to uphold SABMA&apos;s
                      breeding standards. However, SABMA does not guarantee or warrant:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>The quality, health, or temperament of any dogs</li>
                      <li>The accuracy of information provided by breeders</li>
                      <li>The outcome of any transaction between buyers and breeders</li>
                    </ul>
                    <p>
                      We encourage all prospective buyers to conduct their own due diligence
                      before purchasing a puppy.
                    </p>
                  </div>
                </div>

                {/* Section 5 */}
                <div>
                  <h2 className="font-display text-2xl font-bold text-espresso mb-4">
                    5. Intellectual Property
                  </h2>
                  <div className="text-warm-600 space-y-4">
                    <p>
                      All content on this website, including text, images, logos, and graphics,
                      is the property of SABMA or its content providers and is protected by
                      South African and international copyright laws. You may not reproduce,
                      distribute, or create derivative works without our express written permission.
                    </p>
                  </div>
                </div>

                {/* Section 6 */}
                <div>
                  <h2 className="font-display text-2xl font-bold text-espresso mb-4">
                    6. Disclaimer of Warranties
                  </h2>
                  <div className="text-warm-600 space-y-4">
                    <p>
                      This website and its contents are provided &quot;as is&quot; without any
                      warranties, express or implied. SABMA does not warrant that:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>The website will be available at all times or error-free</li>
                      <li>Information on the website is complete, accurate, or up-to-date</li>
                      <li>The website is free from viruses or harmful components</li>
                    </ul>
                  </div>
                </div>

                {/* Section 7 */}
                <div>
                  <h2 className="font-display text-2xl font-bold text-espresso mb-4">
                    7. Limitation of Liability
                  </h2>
                  <div className="text-warm-600 space-y-4">
                    <p>
                      To the fullest extent permitted by law, SABMA shall not be liable for
                      any direct, indirect, incidental, consequential, or punitive damages
                      arising from your use of or inability to use this website or our services.
                    </p>
                  </div>
                </div>

                {/* Section 8 */}
                <div>
                  <h2 className="font-display text-2xl font-bold text-espresso mb-4">
                    8. Third-Party Links
                  </h2>
                  <div className="text-warm-600 space-y-4">
                    <p>
                      Our website may contain links to third-party websites. These links are
                      provided for your convenience only. SABMA does not endorse or accept
                      responsibility for the content of any third-party websites.
                    </p>
                  </div>
                </div>

                {/* Section 9 */}
                <div>
                  <h2 className="font-display text-2xl font-bold text-espresso mb-4">
                    9. Governing Law
                  </h2>
                  <div className="text-warm-600 space-y-4">
                    <p>
                      These Terms of Service are governed by and construed in accordance
                      with the laws of the Republic of South Africa. Any disputes arising
                      from these terms shall be subject to the exclusive jurisdiction of
                      the South African courts.
                    </p>
                  </div>
                </div>

                {/* Section 10 */}
                <div>
                  <h2 className="font-display text-2xl font-bold text-espresso mb-4">
                    10. Changes to Terms
                  </h2>
                  <div className="text-warm-600 space-y-4">
                    <p>
                      SABMA reserves the right to modify these Terms of Service at any time.
                      Changes will be effective immediately upon posting to this website.
                      Your continued use of the website after any changes constitutes
                      acceptance of the modified terms.
                    </p>
                  </div>
                </div>

                {/* Section 11 */}
                <div>
                  <h2 className="font-display text-2xl font-bold text-espresso mb-4">
                    11. Contact Us
                  </h2>
                  <div className="text-warm-600 space-y-4">
                    <p>
                      If you have any questions about these Terms of Service, please contact us:
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
