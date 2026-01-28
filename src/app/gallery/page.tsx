"use client";

import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// Gallery images - add more images here as needed
const galleryImages = [
  // Featured hero/breed images
  { src: "/images/hero/mastiff-sunset-left.png", alt: "Black Mastiff silhouette at sunset" },
  { src: "/images/hero/mastiff-sunset-right.png", alt: "Black Mastiff in golden wheat field" },
  { src: "/images/breed/black-mastiff-adult-studio.png", alt: "Adult Black Mastiff studio portrait" },
  { src: "/images/breed/black-mastiff-puppy-studio.png", alt: "Black Mastiff puppy studio portrait" },
  { src: "/images/dogs/black-mastiff-front-portrait.jpg", alt: "Black Mastiff front portrait" },
  { src: "/images/dogs/black-mastiff-hilltop-blue-sky.jpg", alt: "Black Mastiff on hilltop" },
  { src: "/images/studs/nyamvubu-serabi.jpg", alt: "Nyamvubu Serabi - registered stud" },
  // Puppies
  { src: "/images/puppies/black-mastiff-puppy-walking.jpg", alt: "Black Mastiff puppy walking" },
  { src: "/images/puppies/nyamvubu-pepper-card.jpg", alt: "Nyamvubu Pepper puppy" },
  { src: "/images/puppies/pepper-puppy-white-bg.jpg", alt: "Pepper puppy portrait" },
  // New gallery images
  { src: "/images/gallery/mastiff-running-field.jpg", alt: "Mastiff running in field" },
  { src: "/images/gallery/black-mastiff-stance-01.jpg", alt: "Black Mastiff in show stance" },
  { src: "/images/gallery/black-mastiff-portrait-01.jpg", alt: "Black Mastiff portrait" },
  { src: "/images/gallery/black-mastiff-portrait-02.jpg", alt: "Black Mastiff portrait" },
  { src: "/images/gallery/black-mastiff-studio-portrait.png", alt: "Black Mastiff studio portrait trio" },
  { src: "/images/breed/black-mastiff-poses-grid.png", alt: "Black Mastiff multiple poses" },
  // Original gallery images
  { src: "/images/gallery/WhatsApp-Image-2025-02-26-at-16.35.54.jpeg", alt: "South African Black Mastiff" },
  { src: "/images/gallery/WhatsApp-Image-2025-02-26-at-16.37.20.jpeg", alt: "South African Black Mastiff" },
  { src: "/images/gallery/WhatsApp-Image-2024-02-01-at-21.51.33.jpeg", alt: "South African Black Mastiff" },
  { src: "/images/gallery/WhatsApp-Image-2024-02-01-at-21.44.21.jpeg", alt: "South African Black Mastiff" },
  { src: "/images/gallery/WhatsApp-Image-2024-02-01-at-21.52.28.jpeg", alt: "South African Black Mastiff" },
  { src: "/images/gallery/WhatsApp-Image-2024-02-01-at-21.51.01.jpeg", alt: "South African Black Mastiff" },
  { src: "/images/gallery/WhatsApp-Image-2024-02-01-at-21.48.58.jpeg", alt: "South African Black Mastiff" },
  { src: "/images/gallery/WhatsApp-Image-2024-02-01-at-21.49.17.jpeg", alt: "South African Black Mastiff" },
  { src: "/images/gallery/WhatsApp-Image-2024-02-01-at-21.46.05.jpeg", alt: "South African Black Mastiff" },
  { src: "/images/gallery/WhatsApp-Image-2024-02-01-at-21.44.39.jpeg", alt: "South African Black Mastiff" },
  { src: "/images/gallery/WhatsApp-Image-2024-02-01-at-21.41.10.jpeg", alt: "South African Black Mastiff" },
  { src: "/images/gallery/WhatsApp-Image-2024-02-01-at-21.41.09.jpeg", alt: "South African Black Mastiff" },
  { src: "/images/gallery/WhatsApp-Image-2024-02-12-at-20.27.37.jpeg", alt: "South African Black Mastiff" },
  { src: "/images/gallery/WhatsApp-Image-2024-02-01-at-21.46.50.jpeg", alt: "South African Black Mastiff" },
  { src: "/images/gallery/WhatsApp-Image-2024-02-01-at-21.53.08.jpeg", alt: "South African Black Mastiff" },
  { src: "/images/gallery/WhatsApp-Image-2024-02-01-at-21.45.28.jpeg", alt: "South African Black Mastiff" },
  { src: "/images/hero/hero-main.jpg", alt: "South African Black Mastiff" },
  { src: "/images/hero/hero-dogs-water.jpg", alt: "South African Black Mastiffs by water" },
  { src: "/images/dogs/mastiff-sitting.jpg", alt: "Black Mastiff sitting" },
  { src: "/images/about/two-mastiffs.jpg", alt: "Two Black Mastiffs" },
];

export default function GalleryPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") goToPrevious();
    if (e.key === "ArrowRight") goToNext();
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 mesh-spotlight" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-copper-500/5 rounded-full blur-2xl" />

        <div className="container-custom relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-amber-500/50" />
              <span className="label-micro">Photo Gallery</span>
            </div>
            <h1 className="heading-display text-cream mb-6">
              Our
              <br />
              <span className="text-gradient-amber">Gallery</span>
            </h1>
            <p className="text-xl text-stone-400 leading-relaxed">
              Explore our collection of stunning South African Black Mastiffs.
              These magnificent dogs represent the finest examples of the breed.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding bg-charcoal relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-stone-700/50 to-transparent" />
        <div className="container-custom">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="break-inside-avoid group cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <div className="relative overflow-hidden rounded-xl border border-stone-800/50 bg-noir">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-noir/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="flex items-center gap-2 text-cream">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                        />
                      </svg>
                      <span className="text-sm font-medium">View</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Image count */}
          <div className="mt-12 text-center">
            <p className="text-stone-500">
              Showing {galleryImages.length} photos
            </p>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-noir/95 backdrop-blur-sm flex items-center justify-center"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="absolute left-4 md:left-8 z-50 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="absolute right-4 md:right-8 z-50 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image container */}
          <div
            className="relative max-w-[90vw] max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={galleryImages[currentIndex].src}
              alt={galleryImages[currentIndex].alt}
              width={1200}
              height={800}
              className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-lg"
              priority
            />

            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-noir/80 rounded-full border border-white/10">
              <span className="text-sm text-cream">
                {currentIndex + 1} / {galleryImages.length}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="relative section-padding overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-noir to-noir" />
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 60% 60% at 50% 50%, rgba(217, 119, 6, 0.15) 0%, transparent 50%)`,
          }}
        />

        <div className="container-custom relative text-center">
          <div className="inline-flex items-center gap-4 mb-8">
            <div className="w-16 h-px bg-amber-500/40" />
            <div className="w-3 h-3 rounded-full border border-amber-500/60" />
            <div className="w-16 h-px bg-amber-500/40" />
          </div>
          <h2 className="heading-display text-cream mb-6">
            Have Photos to
            <br />
            <span className="text-gradient-amber">Share?</span>
          </h2>
          <p className="text-xl text-stone-400 mb-10 max-w-2xl mx-auto">
            We love seeing your South African Black Mastiffs! Send us your best
            photos to be featured in our gallery.
          </p>
          <a href="/contact" className="btn-primary">
            <span>Submit Photos</span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </section>
    </>
  );
}
