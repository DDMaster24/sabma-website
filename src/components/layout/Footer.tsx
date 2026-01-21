"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { siteConfig, navigation } from "@/data/content";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Try Formspree submission
      const response = await fetch("https://formspree.io/f/xwpopjrj", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          _subject: "New SABMA Newsletter Subscription",
        }),
      });

      if (response.ok) {
        setIsSubscribed(true);
        setEmail("");
      } else {
        // Fallback: Open email client with subscription request
        const mailtoLink = `mailto:${siteConfig.email}?subject=Newsletter%20Subscription&body=Please%20add%20me%20to%20the%20SABMA%20newsletter.%0A%0AEmail:%20${encodeURIComponent(email)}`;
        window.location.href = mailtoLink;
        setIsSubscribed(true);
        setEmail("");
      }
    } catch {
      // Fallback: Open email client with subscription request
      const mailtoLink = `mailto:${siteConfig.email}?subject=Newsletter%20Subscription&body=Please%20add%20me%20to%20the%20SABMA%20newsletter.%0A%0AEmail:%20${encodeURIComponent(email)}`;
      window.location.href = mailtoLink;
      setIsSubscribed(true);
      setEmail("");
    }

    setIsSubmitting(false);
  };

  const quickLinks = navigation.slice(0, 5);
  const resourceLinks = navigation.slice(5);

  return (
    <footer className="bg-espresso relative overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-bronze-400/40 to-transparent" />

      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full"
        style={{
          background: 'radial-gradient(ellipse 100% 100% at 100% 0%, rgba(201, 165, 92, 0.05) 0%, transparent 50%)',
        }}
      />
      <div className="absolute bottom-0 left-0 w-1/3 h-full"
        style={{
          background: 'radial-gradient(ellipse 100% 100% at 0% 100%, rgba(201, 165, 92, 0.03) 0%, transparent 50%)',
        }}
      />

      <div className="container-custom relative">
        {/* Main footer content */}
        <div className="py-20 lg:py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3 mb-8 group">
              <div className="relative w-12 h-12 transition-transform duration-500 group-hover:scale-105">
                <Image
                  src="/images/logo/sabma-logo.png"
                  alt="SABMA Logo"
                  fill
                  className="object-contain brightness-0 invert opacity-80"
                />
              </div>
              <div>
                <span className="font-display text-2xl font-light text-ivory-100">
                  SABMA
                </span>
              </div>
            </Link>
            <p className="text-ivory-400 mb-8 leading-relaxed max-w-sm">
              Promoting responsible breeding and upholding the standards of the
              black mastiff breed in South Africa.
            </p>

            {/* Social links */}
            <div className="flex gap-3">
              {siteConfig.social.facebook && siteConfig.social.facebook !== "#" && (
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-ivory-100/5 border border-ivory-100/10
                           flex items-center justify-center text-ivory-400
                           hover:bg-bronze-400/10 hover:border-bronze-400/30 hover:text-bronze-400
                           transition-all duration-300"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              )}
              {siteConfig.social.instagram && siteConfig.social.instagram !== "#" && (
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-ivory-100/5 border border-ivory-100/10
                           flex items-center justify-center text-ivory-400
                           hover:bg-bronze-400/10 hover:border-bronze-400/30 hover:text-bronze-400
                           transition-all duration-300"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-lg font-light text-ivory-100 mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-ivory-400
                             hover:text-ivory-100 transition-colors duration-300"
                  >
                    <span className="w-0 h-px bg-bronze-400 group-hover:w-4 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-lg font-light text-ivory-100 mb-6">
              Resources
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-ivory-400
                             hover:text-ivory-100 transition-colors duration-300"
                  >
                    <span className="w-0 h-px bg-bronze-400 group-hover:w-4 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-4">
            <h3 className="font-display text-lg font-light text-ivory-100 mb-6">
              Newsletter
            </h3>
            <p className="text-ivory-400 mb-6 text-sm leading-relaxed">
              Stay updated with the latest news, events, and resources from SABMA.
            </p>
            {isSubscribed ? (
              <div className="p-4 rounded-xl bg-bronze-400/10 border border-bronze-400/20">
                <p className="text-bronze-400 text-sm font-medium flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M5 13l4 4L19 7" />
                  </svg>
                  Thank you for subscribing!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-5 py-4 bg-ivory-100/5 border border-ivory-100/10 rounded-xl
                             text-ivory-100 placeholder-ivory-500 text-sm
                             focus:outline-none focus:border-bronze-400/40 focus:bg-ivory-100/[0.07]
                             transition-all duration-300"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-gradient-to-r from-bronze-400 via-bronze-500 to-bronze-400
                           text-espresso font-semibold text-sm tracking-wide uppercase rounded-xl
                           transition-all duration-500 hover:shadow-bronze hover:-translate-y-0.5
                           disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Subscribing...
                    </span>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </form>
            )}

            {/* Contact Info */}
            <div className="mt-8 pt-8 border-t border-ivory-100/5 space-y-4">
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-3 text-ivory-400 hover:text-ivory-100
                         transition-colors duration-300 text-sm"
              >
                <div className="w-10 h-10 rounded-lg bg-ivory-100/5 flex items-center justify-center">
                  <svg className="w-4 h-4 text-bronze-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                {siteConfig.phone}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 text-ivory-400 hover:text-ivory-100
                         transition-colors duration-300 text-sm"
              >
                <div className="w-10 h-10 rounded-lg bg-ivory-100/5 flex items-center justify-center">
                  <svg className="w-4 h-4 text-bronze-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                {siteConfig.email}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-8 border-t border-ivory-100/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-ivory-500 text-sm">
            &copy; {new Date().getFullYear()} {siteConfig.fullName}. All rights reserved.
          </p>
          <div className="flex items-center gap-8 text-sm">
            <Link
              href="/privacy"
              className="text-ivory-500 hover:text-ivory-100 transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-ivory-500 hover:text-ivory-100 transition-colors duration-300"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="h-1 bg-gradient-to-r from-bronze-500 via-bronze-400 to-bronze-600" />
    </footer>
  );
}
