"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { siteConfig } from "@/data/content";

// Simple, clear navigation structure
const mainNav = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "The Council", href: "/council" },
];

const breedersNav = {
  label: "Breeders & Dogs",
  items: [
    { name: "Find a Breeder", href: "/breeders" },
    { name: "Stud Register", href: "/stud-register" },
    { name: "Buying a Puppy", href: "/buying-a-puppy" },
  ],
};

const resourcesNav = {
  label: "Resources",
  items: [
    { name: "Guides & Documents", href: "/resources" },
    { name: "Events Calendar", href: "/calendar" },
    { name: "Testimonials", href: "/testimonials" },
  ],
};

// All items for mobile (registry items handled separately for auth)
const allNavItems = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "The Council", href: "/council" },
  { name: "Find a Breeder", href: "/breeders" },
  { name: "Stud Register", href: "/stud-register" },
  { name: "Buying a Puppy", href: "/buying-a-puppy" },
  { name: "Guides & Documents", href: "/resources" },
  { name: "Events Calendar", href: "/calendar" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Contact Us", href: "/contact" },
];

// Simple Dropdown Component - hover based for ease of use
function NavDropdown({
  label,
  items,
}: {
  label: string;
  items: { name: string; href: string }[];
}) {
  return (
    <div className="relative group">
      <button
        className="flex items-center gap-2 px-4 py-2 text-sm xl:text-base font-semibold
                   text-espresso bg-espresso/5 rounded-full hover:bg-espresso hover:text-white
                   transition-all duration-300 border border-transparent hover:border-espresso/20"
      >
        {label}
        <svg
          className="w-4 h-4 text-espresso/50 group-hover:text-white/70 transition-all duration-200
                     group-hover:rotate-180"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu - appears on hover */}
      <div
        className="absolute top-full left-0 pt-3 opacity-0 invisible translate-y-2
                   group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
                   transition-all duration-200 ease-out"
      >
        <div className="min-w-[240px] py-3 bg-white rounded-xl shadow-xl shadow-espresso/10
                       border border-espresso/10">
          {items.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block px-5 py-3 text-[16px] text-warm-700 hover:text-espresso
                        hover:bg-bronze-50 transition-colors duration-150"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const { data: session, status } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isAuthenticated = status === "authenticated";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled
          ? "py-3 bg-white/95 backdrop-blur-sm shadow-md border-espresso/10"
          : "py-4 bg-ivory border-espresso/5 shadow-sm"
          }`}
      >
        <div className="mx-auto px-4 lg:px-8 max-w-[1400px]">
          <nav className="flex items-center justify-between gap-4">
            {/* Logo - Moved more to the left by removing standard container constraints if needed */}
            <Link href="/" className="flex items-center gap-3 shrink-0 mr-4">
              <div
                className={`relative transition-all duration-300 ${isScrolled ? "w-12 h-12" : "w-14 h-14"
                  }`}
              >
                <Image
                  src="/images/logo/sabma-logo.png"
                  alt="SABMA Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="hidden xl:block">
                <span className="font-display text-2xl font-bold text-espresso leading-none block">
                  SABMA
                </span>
                <span className="text-xs text-warm-600 tracking-wider uppercase font-medium">
                  SA Black Mastiff Association
                </span>
              </div>
            </Link>

            {/* Main Navigation - Desktop */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-3 flex-wrap justify-center flex-1">
              {/* Direct links styling as buttons */}
              {mainNav.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-2 text-sm xl:text-base font-semibold text-espresso bg-espresso/5 rounded-full
                            hover:bg-espresso hover:text-white transition-all duration-300
                            border border-transparent hover:border-espresso/20"
                >
                  {item.name}
                </Link>
              ))}

              {/* Dropdown menus */}
              <NavDropdown label={breedersNav.label} items={breedersNav.items} />
              <NavDropdown label={resourcesNav.label} items={resourcesNav.items} />

              {/* New Buttons Requested */}
              <Link
                href="/buying-a-puppy"
                className="px-4 py-2 text-sm xl:text-base font-semibold text-espresso bg-espresso/5 rounded-full
                          hover:bg-espresso hover:text-white transition-all duration-300
                          border border-transparent hover:border-espresso/20"
              >
                Buy a Puppy
              </Link>
              {isAuthenticated ? (
                <Link
                  href="/registry/dogs"
                  className="px-4 py-2 text-sm xl:text-base font-semibold text-espresso bg-bronze-100/50 rounded-full
                            hover:bg-bronze-500 hover:text-white transition-all duration-300
                            border border-bronze-200 hover:border-bronze-500"
                >
                  SABMA Registry
                </Link>
              ) : (
                <Link
                  href="/login?callbackUrl=/registry/dogs"
                  className="px-4 py-2 text-sm xl:text-base font-semibold text-espresso bg-bronze-100/50 rounded-full
                            hover:bg-bronze-500 hover:text-white transition-all duration-300
                            border border-bronze-200 hover:border-bronze-500"
                >
                  Member Login
                </Link>
              )}
            </div>

            {/* Right side - Contact & Phone */}
            <div className="hidden lg:flex items-center gap-4 shrink-0">
              {/* Phone number - one line */}
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-2 text-sm lg:text-base text-warm-700 hover:text-bronze-600
                          transition-colors duration-200 whitespace-nowrap font-medium"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                {siteConfig.phone}
              </a>

              {/* Contact Button - Smaller, single line */}
              <Link
                href="/contact"
                className="px-5 py-2.5 bg-bronze-500 hover:bg-bronze-600 text-white
                          font-semibold text-sm rounded-full transition-all duration-200
                          shadow-md hover:shadow-lg whitespace-nowrap border border-bronze-400"
              >
                Contact Us
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg
                        hover:bg-espresso/5 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="w-6 h-6 text-espresso"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6 text-espresso"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Header Spacer */}
      <div className={`transition-all duration-300 ${isScrolled ? "h-[84px]" : "h-[106px]"}`} />

      {/* Mobile Menu - Simple slide-in panel */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${isMobileMenuOpen ? "visible" : "invisible"
          }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-espresso/20 transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100" : "opacity-0"
            }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute top-0 right-0 bottom-0 w-full max-w-sm bg-white shadow-2xl
                     transition-transform duration-300 ease-out ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-4 border-b border-espresso/10">
            <span className="font-display text-lg font-semibold text-espresso">Menu</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-10 h-10 flex items-center justify-center rounded-lg
                        hover:bg-espresso/5 transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-5 h-5 text-warm-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Items */}
          <div className="overflow-y-auto h-[calc(100%-140px)] py-2">
            {allNavItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between px-6 py-4 text-[17px] text-espresso
                          hover:bg-bronze-50 border-b border-espresso/5 transition-colors duration-150"
              >
                {item.name}
                <svg className="w-4 h-4 text-warm-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}

            {/* Registry / Auth Link */}
            {isAuthenticated ? (
              <>
                <Link
                  href="/registry/dogs"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-6 py-4 text-[17px] text-bronze-700 font-semibold
                            bg-bronze-50 border-b border-espresso/5 transition-colors duration-150"
                >
                  SABMA Registry
                  <svg className="w-4 h-4 text-bronze-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    signOut({ callbackUrl: "/" });
                  }}
                  className="flex items-center justify-between w-full px-6 py-4 text-[17px] text-warm-600
                            hover:bg-warm-50 border-b border-espresso/5 transition-colors duration-150"
                >
                  Sign Out
                  <svg className="w-4 h-4 text-warm-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </>
            ) : (
              <Link
                href="/login?callbackUrl=/registry/dogs"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between px-6 py-4 text-[17px] text-bronze-700 font-semibold
                          bg-bronze-50 border-b border-espresso/5 transition-colors duration-150"
              >
                Member Login
                <svg className="w-4 h-4 text-bronze-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </div>

          {/* Mobile Footer - Contact Info */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-ivory border-t border-espresso/10">
            <a
              href={`tel:${siteConfig.phone}`}
              className="flex items-center justify-center gap-2 w-full py-3 bg-bronze-500 text-white
                        font-semibold rounded-lg hover:bg-bronze-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Us: {siteConfig.phone}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
