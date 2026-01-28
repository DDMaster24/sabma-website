"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface CarouselItem {
  id: string;
  title: string;
  subtitle?: string;
  image?: string;
  badge?: string;
}

interface Carousel3DProps {
  items: CarouselItem[];
  /** Auto-rotation interval in ms (default: 4000, set to 0 to disable) */
  autoPlayInterval?: number;
  /** Whether to pause on hover */
  pauseOnHover?: boolean;
  /** Radius of the carousel in pixels */
  radius?: number;
}

/**
 * Carousel3D - A 3D rotating carousel component
 *
 * Displays items in a circular arrangement with CSS 3D transforms.
 * Supports auto-rotation, manual navigation, and hover interactions.
 */
export function Carousel3D({
  items,
  autoPlayInterval = 4000,
  pauseOnHover = true,
  radius = 300,
}: Carousel3DProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const itemCount = items.length;
  const angleStep = 360 / itemCount;

  // Auto-rotation logic
  useEffect(() => {
    if (autoPlayInterval <= 0 || (pauseOnHover && isHovered) || isPaused) {
      return;
    }

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % itemCount);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlayInterval, isHovered, isPaused, pauseOnHover, itemCount]);

  // Navigate to specific item
  const goToItem = useCallback((index: number) => {
    setActiveIndex(index);
    // Briefly pause auto-rotation after manual navigation
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), autoPlayInterval * 2);
  }, [autoPlayInterval]);

  // Navigate to previous/next
  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + itemCount) % itemCount);
  }, [itemCount]);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % itemCount);
  }, [itemCount]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPrev, goToNext]);

  return (
    <div className="relative w-full py-16">
      {/* Main carousel container */}
      <div
        ref={containerRef}
        className="relative mx-auto"
        style={{
          perspective: "1200px",
          perspectiveOrigin: "50% 50%",
          height: `${radius * 1.2}px`,
          maxWidth: "100%",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Rotating container */}
        <motion.div
          className="relative w-full h-full"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateY(${-activeIndex * angleStep}deg)`,
          }}
          animate={{
            rotateY: -activeIndex * angleStep,
          }}
          transition={{
            duration: 0.8,
            ease: [0.32, 0.72, 0, 1],
          }}
        >
          {items.map((item, index) => {
            const angle = index * angleStep;
            const isActive = index === activeIndex;

            return (
              <CarouselCard
                key={item.id}
                item={item}
                angle={angle}
                radius={radius}
                isActive={isActive}
                onClick={() => goToItem(index)}
              />
            );
          })}
        </motion.div>

        {/* Center spotlight effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
        </div>
      </div>

      {/* Navigation arrows */}
      <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none z-10">
        <button
          onClick={goToPrev}
          className="pointer-events-auto w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center text-earth-bark-500 hover:text-forest-600 hover:bg-white transition-all duration-300 hover:scale-110"
          aria-label="Previous item"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="pointer-events-auto w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center text-earth-bark-500 hover:text-forest-600 hover:bg-white transition-all duration-300 hover:scale-110"
          aria-label="Next item"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center gap-2 mt-8">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToItem(index)}
            className={`transition-all duration-300 rounded-full ${
              index === activeIndex
                ? "w-8 h-2 bg-forest-500"
                : "w-2 h-2 bg-earth-bark-200 hover:bg-earth-bark-300"
            }`}
            aria-label={`Go to item ${index + 1}`}
          />
        ))}
      </div>

      {/* Active item details (below carousel) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="text-center mt-8"
        >
          <h3 className="font-display text-2xl md:text-3xl text-earth-bark-500 mb-2">
            {items[activeIndex].title}
          </h3>
          {items[activeIndex].subtitle && (
            <p className="text-earth-bark-400">{items[activeIndex].subtitle}</p>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Pause indicator */}
      {isHovered && pauseOnHover && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full text-xs text-earth-bark-500"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
          Paused
        </motion.div>
      )}
    </div>
  );
}

/**
 * Individual carousel card component
 */
function CarouselCard({
  item,
  angle,
  radius,
  isActive,
  onClick,
}: {
  item: CarouselItem;
  angle: number;
  radius: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const cardWidth = 280;
  const cardHeight = 360;

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 cursor-pointer"
      style={{
        width: cardWidth,
        height: cardHeight,
        marginLeft: -cardWidth / 2,
        marginTop: -cardHeight / 2,
        transformStyle: "preserve-3d",
        transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
      }}
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
    >
      <div
        className={`relative w-full h-full rounded-2xl overflow-hidden shadow-xl transition-all duration-500 ${
          isActive
            ? "ring-4 ring-forest-500/50 shadow-2xl shadow-forest-500/20"
            : "opacity-70 saturate-50"
        }`}
      >
        {/* Card background */}
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-earth-sand-200 to-earth-sand-300">
            {/* Placeholder content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-earth-bark-200/50 flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-earth-bark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-earth-bark-400 font-medium text-sm">Dog Photo</span>
            </div>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-earth-bark-800/80 via-transparent to-transparent" />

        {/* Badge */}
        {item.badge && (
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-forest-500 text-white text-xs font-bold tracking-wider uppercase rounded-full shadow-lg">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {item.badge}
            </span>
          </div>
        )}

        {/* Card content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h4 className="font-display text-xl text-white mb-1 drop-shadow-lg">
            {item.title}
          </h4>
          {item.subtitle && (
            <p className="text-earth-sand-200 text-sm">{item.subtitle}</p>
          )}
        </div>

        {/* Active indicator glow */}
        {isActive && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, transparent 50%)",
            }}
          />
        )}
      </div>
    </motion.div>
  );
}

/**
 * Simplified mobile carousel (horizontal scroll)
 */
export function Carousel3DMobile({
  items,
}: {
  items: CarouselItem[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Track scroll position to update active index
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const cardWidth = 280 + 16; // card width + gap
    const newIndex = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(newIndex, items.length - 1));
  };

  return (
    <div className="relative w-full py-8">
      {/* Scrollable container */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`flex-shrink-0 w-[280px] snap-center transition-all duration-300 ${
              index === activeIndex ? "scale-100" : "scale-95 opacity-70"
            }`}
          >
            <div className="relative h-[360px] rounded-2xl overflow-hidden shadow-lg">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-earth-sand-200 to-earth-sand-300 flex items-center justify-center">
                  <span className="text-earth-bark-400 font-medium">Dog Photo</span>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-earth-bark-800/80 via-transparent to-transparent" />

              {item.badge && (
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1.5 bg-forest-500 text-white text-xs font-bold rounded-full">
                    {item.badge}
                  </span>
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h4 className="font-display text-xl text-white mb-1">{item.title}</h4>
                {item.subtitle && (
                  <p className="text-earth-sand-200 text-sm">{item.subtitle}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center gap-2 mt-4">
        {items.map((_, index) => (
          <div
            key={index}
            className={`transition-all duration-300 rounded-full ${
              index === activeIndex
                ? "w-6 h-2 bg-forest-500"
                : "w-2 h-2 bg-earth-bark-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Responsive wrapper that switches between 3D and mobile versions
 */
export function Carousel3DResponsive(props: Carousel3DProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return <Carousel3DMobile items={props.items} />;
  }

  return <Carousel3D {...props} />;
}

export default Carousel3DResponsive;
