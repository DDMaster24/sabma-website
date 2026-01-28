"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { siteConfig } from "@/data/content";

const mainNav = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Council", href: "/council" },
];

const breedersNav = {
  label: "Breeders",
  items: [
    { name: "Find a Breeder", href: "/breeders", description: "Accredited SABMA breeders" },
    { name: "Stud Register", href: "/stud-register", description: "Certified breeding males" },
    { name: "Buy a Puppy", href: "/buying-a-puppy", description: "Your guide to ownership" },
  ],
};

const resourcesNav = {
  label: "Resources",
  items: [
    { name: "Guides", href: "/resources", description: "Documents & resources" },
    { name: "Calendar", href: "/calendar", description: "Events & appraisals" },
    { name: "Testimonials", href: "/testimonials", description: "Owner stories" },
  ],
};

const allNavItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Council", href: "/council" },
  { name: "Find a Breeder", href: "/breeders" },
  { name: "Stud Register", href: "/stud-register" },
  { name: "Buy a Puppy", href: "/buying-a-puppy" },
  { name: "Guides", href: "/resources" },
  { name: "Calendar", href: "/calendar" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Contact", href: "/contact" },
];

function NavDropdown({
  label,
  items,
}: {
  label: string;
  items: { name: string; href: string; description: string }[];
}) {
  return (
    <div className="relative group">
      <button className="flex items-center gap-1.5 px-4 py-2 text-[14px] font-medium text-stone-400 hover:text-cream transition-all duration-300">
        {label}
        <svg
          className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div className="absolute top-full left-0 pt-4 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-out-expo z-50">
        <div className="min-w-[280px] p-2 bg-charcoal/95 backdrop-blur-xl rounded-xl border border-stone-800/50 shadow-2xl">
          {items.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block px-4 py-3 rounded-lg hover:bg-white/5 transition-colors duration-200 group/item"
            >
              <span className="block text-[14px] font-medium text-cream group-hover/item:text-amber-400 transition-colors">
                {item.name}
              </span>
              <span className="block text-[12px] text-stone-500 mt-0.5">
                {item.description}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const { status } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isAuthenticated = status === "authenticated";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out-expo ${
          isScrolled
            ? "py-3 bg-noir/90 backdrop-blur-xl border-b border-stone-800/50"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="container-wide">
          <nav className="flex items-center justify-between gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className={`relative transition-all duration-500 ${isScrolled ? "w-10 h-10" : "w-12 h-12"}`}>
                <Image
                  src="/images/logo/sabma-logo.png"
                  alt="SABMA Logo"
                  fill
                  className="object-contain brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity"
                  priority
                />
              </div>
              <div className="hidden sm:block">
                <span className="font-display text-xl font-medium text-cream tracking-tight group-hover:text-amber-400 transition-colors duration-300">
                  SABMA
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {mainNav.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="nav-link"
                >
                  {item.name}
                </Link>
              ))}
              <NavDropdown label={breedersNav.label} items={breedersNav.items} />
              <NavDropdown label={resourcesNav.label} items={resourcesNav.items} />
            </div>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Phone */}
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center gap-2 px-3 py-2 text-[13px] text-stone-400 hover:text-cream transition-colors duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="hidden xl:inline">{siteConfig.phone}</span>
              </a>

              {/* Registry / Login */}
              {isAuthenticated ? (
                <Link
                  href="/registry/dogs"
                  className="px-4 py-2 text-[13px] font-medium text-amber-400 border border-amber-500/30 rounded-lg hover:bg-amber-500/10 transition-all duration-300"
                >
                  Registry
                </Link>
              ) : (
                <Link
                  href="/login?callbackUrl=/registry/dogs"
                  className="px-4 py-2 text-[13px] font-medium text-stone-400 hover:text-cream transition-colors duration-300"
                >
                  Login
                </Link>
              )}

              {/* Contact CTA */}
              <Link
                href="/contact"
                className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-noir font-semibold text-[13px] tracking-wide uppercase rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-amber"
              >
                Contact
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-11 h-11 flex items-center justify-center rounded-xl bg-charcoal/50 border border-stone-800/50 transition-colors duration-200 hover:bg-charcoal"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-5 h-5 text-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </nav>
        </div>

        {/* Amber accent line when scrolled */}
        <div className={`absolute bottom-0 left-0 right-0 h-px transition-opacity duration-500 ${isScrolled ? 'opacity-100' : 'opacity-0'}`}>
          <div className="h-full bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
        </div>
      </header>

      {/* Header Spacer */}
      <div className={`transition-all duration-500 ${isScrolled ? "h-[72px]" : "h-[88px]"}`} />

      {/* Mobile Menu - Full screen overlay */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${isMobileMenuOpen ? "visible" : "invisible"}`}>
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-noir/95 backdrop-blur-xl transition-opacity duration-500 ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Content */}
        <div className={`absolute inset-0 flex flex-col transition-all duration-500 ease-out-expo ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"}`}>
          {/* Close button area */}
          <div className="flex justify-end p-5">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-11 h-11 flex items-center justify-center rounded-xl bg-charcoal/50 border border-stone-800/50"
              aria-label="Close menu"
            >
              <svg className="w-5 h-5 text-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto px-8 pb-8">
            <div className="space-y-1">
              {allNavItems.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-4 text-2xl font-display text-cream hover:text-amber-400 transition-colors duration-300 border-b border-stone-800/30"
                  style={{ transitionDelay: `${index * 30}ms` }}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Auth Links */}
            <div className="mt-8 pt-8 border-t border-stone-800/50">
              {isAuthenticated ? (
                <>
                  <Link
                    href="/registry/dogs"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-4 text-lg text-amber-400 font-medium"
                  >
                    SABMA Registry
                  </Link>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      signOut({ callbackUrl: "/" });
                    }}
                    className="block py-4 text-lg text-stone-500"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  href="/login?callbackUrl=/registry/dogs"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-4 text-lg text-amber-400 font-medium"
                >
                  Member Login
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Footer */}
          <div className="p-8 border-t border-stone-800/50">
            <a
              href={`tel:${siteConfig.phone}`}
              className="flex items-center justify-center gap-3 w-full py-4 bg-amber-600 hover:bg-amber-500 text-noir font-semibold rounded-xl transition-colors duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {siteConfig.phone}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
