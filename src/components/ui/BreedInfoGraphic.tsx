"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Image from "next/image";

interface Annotation {
  id: string;
  label: string;
  description: string;
  /** Position as percentage from top-left (0-100) */
  position: { x: number; y: number };
  /** Optional icon name */
  icon?: "head" | "chest" | "bones" | "coat" | "tail" | "legs" | "default";
}

interface BreedInfoGraphicProps {
  /** Dog profile image URL */
  image?: string;
  /** Alt text for the image */
  imageAlt?: string;
  /** Title displayed above the infographic */
  title?: string;
  /** Subtitle displayed below title */
  subtitle?: string;
  /** Array of annotations to display */
  annotations?: Annotation[];
}

// Default breed characteristics for SA Black Mastiff
const defaultAnnotations: Annotation[] = [
  {
    id: "head",
    label: "Massive Head",
    description: "Broad skull with powerful jaws. The head is substantial and well-proportioned to the body, conveying strength and nobility.",
    position: { x: 75, y: 15 },
    icon: "head",
  },
  {
    id: "chest",
    label: "Deep Chest",
    description: "Well-sprung ribs with excellent lung capacity. The chest reaches to the elbow, providing stamina and endurance.",
    position: { x: 55, y: 45 },
    icon: "chest",
  },
  {
    id: "bones",
    label: "Strong Bones",
    description: "Heavy, substantial bone structure throughout. This gives the breed its characteristic powerful stance and stability.",
    position: { x: 30, y: 60 },
    icon: "bones",
  },
  {
    id: "coat",
    label: "Black Coat",
    description: "Short, dense double coat that is jet black. Low maintenance but provides excellent protection from the elements.",
    position: { x: 60, y: 35 },
    icon: "coat",
  },
  {
    id: "tail",
    label: "Strong Tail",
    description: "Set high and thick at the base, tapering to the hock. Carried with a slight curve when alert or moving.",
    position: { x: 15, y: 50 },
    icon: "tail",
  },
];

/**
 * BreedInfoGraphic - An interactive annotated dog infographic
 *
 * Displays a dog image with interactive hotspot markers that reveal
 * detailed information about breed characteristics on hover/click.
 */
export function BreedInfoGraphic({
  image,
  imageAlt = "South African Black Mastiff breed profile",
  title = "Breed Characteristics",
  subtitle = "Discover what makes the South African Black Mastiff exceptional",
  annotations = defaultAnnotations,
}: BreedInfoGraphicProps) {
  const [activeAnnotation, setActiveAnnotation] = useState<string | null>(null);
  const [hoveredAnnotation, setHoveredAnnotation] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const handleAnnotationClick = (id: string) => {
    setActiveAnnotation(activeAnnotation === id ? null : id);
  };

  const currentAnnotation = annotations.find(
    (a) => a.id === (activeAnnotation || hoveredAnnotation)
  );

  return (
    <div ref={containerRef} className="relative w-full max-w-6xl mx-auto px-4">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-12 h-px bg-forest-400" />
          <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-forest-600">
            Breed Standard
          </span>
          <div className="w-12 h-px bg-forest-400" />
        </div>
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-earth-bark-500 mb-3">
          {title}
        </h2>
        <p className="text-earth-bark-400 text-lg max-w-2xl mx-auto">{subtitle}</p>
      </motion.div>

      <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
        {/* Left sidebar - Annotation list */}
        <motion.div
          className="lg:col-span-1 hidden lg:block"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="space-y-3">
            {annotations.map((annotation, index) => (
              <motion.button
                key={annotation.id}
                onClick={() => handleAnnotationClick(annotation.id)}
                onMouseEnter={() => setHoveredAnnotation(annotation.id)}
                onMouseLeave={() => setHoveredAnnotation(null)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                  activeAnnotation === annotation.id
                    ? "bg-forest-500 text-white shadow-lg"
                    : hoveredAnnotation === annotation.id
                    ? "bg-forest-50 text-forest-700"
                    : "bg-earth-sand-100 text-earth-bark-500 hover:bg-earth-sand-200"
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              >
                <span className="text-sm font-semibold">{annotation.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Center - Main image with annotations */}
        <motion.div
          className="lg:col-span-3 relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-earth-sand-200 to-earth-sand-300">
            {/* Image or placeholder */}
            {image ? (
              <Image
                src={image}
                alt={imageAlt}
                fill
                className="object-cover"
              />
            ) : (
              <DogSilhouettePlaceholder />
            )}

            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-earth-bark-800/20 via-transparent to-white/10" />

            {/* Annotation markers */}
            {annotations.map((annotation, index) => (
              <AnnotationMarker
                key={annotation.id}
                annotation={annotation}
                index={index}
                isActive={activeAnnotation === annotation.id}
                isHovered={hoveredAnnotation === annotation.id}
                isInView={isInView}
                onClick={() => handleAnnotationClick(annotation.id)}
                onMouseEnter={() => setHoveredAnnotation(annotation.id)}
                onMouseLeave={() => setHoveredAnnotation(null)}
              />
            ))}

            {/* Connection lines from active marker */}
            {currentAnnotation && (
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ zIndex: 5 }}
              >
                <motion.line
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.5 }}
                  exit={{ pathLength: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  x1={`${currentAnnotation.position.x}%`}
                  y1={`${currentAnnotation.position.y}%`}
                  x2={currentAnnotation.position.x > 50 ? "95%" : "5%"}
                  y2={`${currentAnnotation.position.y}%`}
                  stroke="#059669"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
              </svg>
            )}
          </div>

          {/* Mobile annotation popup */}
          <AnimatePresence>
            {currentAnnotation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="lg:hidden mt-6 p-6 bg-white rounded-xl shadow-lg border border-earth-bark-100"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-forest-100 flex items-center justify-center flex-shrink-0">
                    <AnnotationIcon icon={currentAnnotation.icon} />
                  </div>
                  <div>
                    <h4 className="font-display text-xl text-earth-bark-500 mb-2">
                      {currentAnnotation.label}
                    </h4>
                    <p className="text-earth-bark-400 text-sm leading-relaxed">
                      {currentAnnotation.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Right sidebar - Description panel */}
        <motion.div
          className="lg:col-span-1 hidden lg:block"
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {currentAnnotation ? (
              <motion.div
                key={currentAnnotation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="p-6 bg-white rounded-xl shadow-lg border border-earth-bark-100"
              >
                <div className="w-14 h-14 rounded-xl bg-forest-100 flex items-center justify-center mb-4">
                  <AnnotationIcon icon={currentAnnotation.icon} />
                </div>
                <h4 className="font-display text-xl text-earth-bark-500 mb-3">
                  {currentAnnotation.label}
                </h4>
                <p className="text-earth-bark-400 text-sm leading-relaxed">
                  {currentAnnotation.description}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-6 bg-earth-sand-100 rounded-xl border border-dashed border-earth-bark-200 text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-earth-sand-200 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-earth-bark-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                </div>
                <p className="text-earth-bark-400 text-sm">
                  Click or hover on a marker to learn about each characteristic
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Mobile list view */}
      <div className="lg:hidden mt-8 grid sm:grid-cols-2 gap-3">
        {annotations.map((annotation) => (
          <button
            key={annotation.id}
            onClick={() => handleAnnotationClick(annotation.id)}
            className={`text-left px-4 py-3 rounded-lg transition-all duration-300 ${
              activeAnnotation === annotation.id
                ? "bg-forest-500 text-white shadow-lg"
                : "bg-earth-sand-100 text-earth-bark-500 active:bg-earth-sand-200"
            }`}
          >
            <span className="text-sm font-semibold">{annotation.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * Individual annotation marker component
 */
function AnnotationMarker({
  annotation,
  index,
  isActive,
  isHovered,
  isInView,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: {
  annotation: Annotation;
  index: number;
  isActive: boolean;
  isHovered: boolean;
  isInView: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const isHighlighted = isActive || isHovered;

  return (
    <motion.button
      className="absolute z-10"
      style={{
        left: `${annotation.position.x}%`,
        top: `${annotation.position.y}%`,
        transform: "translate(-50%, -50%)",
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : {}}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.5 + index * 0.1,
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-label={`Learn about ${annotation.label}`}
    >
      {/* Outer pulse ring */}
      <motion.div
        className={`absolute inset-0 rounded-full ${
          isHighlighted ? "bg-forest-500" : "bg-earth-grass-500"
        }`}
        animate={{
          scale: isHighlighted ? [1, 1.8, 1.8] : [1, 2, 2],
          opacity: isHighlighted ? [0.6, 0, 0] : [0.4, 0, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut",
        }}
        style={{ width: 24, height: 24, marginLeft: -12, marginTop: -12 }}
      />

      {/* Main marker */}
      <motion.div
        className={`relative w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
          isHighlighted
            ? "bg-forest-500 shadow-lg shadow-forest-500/40 scale-125"
            : "bg-white shadow-md"
        }`}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.95 }}
      >
        <div
          className={`w-2 h-2 rounded-full transition-colors duration-300 ${
            isHighlighted ? "bg-white" : "bg-forest-500"
          }`}
        />
      </motion.div>

      {/* Tooltip on hover (desktop only) */}
      <AnimatePresence>
        {isHovered && !isActive && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-1.5 bg-earth-bark-800 text-white text-xs font-medium rounded-lg whitespace-nowrap shadow-lg hidden lg:block"
          >
            {annotation.label}
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-earth-bark-800" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

/**
 * Icon component for annotations
 */
function AnnotationIcon({ icon }: { icon?: string }) {
  const iconClass = "w-6 h-6 text-forest-600";

  switch (icon) {
    case "head":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="10" r="6" strokeWidth={1.5} />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 9h.01M15 9h.01M9 13a3 3 0 006 0" />
        </svg>
      );
    case "chest":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      );
    case "bones":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      );
    case "coat":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      );
    case "tail":
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      );
    default:
      return (
        <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
  }
}

/**
 * Dog silhouette placeholder when no image is provided
 */
function DogSilhouettePlaceholder() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30z' fill='none' stroke='%235D4037' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Dog silhouette */}
      <svg
        viewBox="0 0 400 300"
        className="w-full max-w-md h-auto opacity-20"
      >
        {/* Dog body silhouette */}
        <path
          d="M320 180
             Q340 160 350 130
             Q355 110 340 100
             Q320 90 310 100
             Q300 110 295 100
             Q290 85 270 90
             Q250 95 240 110
             L230 130
             Q220 110 200 110
             Q180 110 160 120
             Q140 130 120 140
             Q100 150 80 160
             Q60 170 50 190
             Q45 210 60 230
             Q70 245 90 250
             L100 280
             Q105 290 115 290
             Q125 290 130 280
             L135 260
             L160 260
             L165 280
             Q170 290 180 290
             Q190 290 195 280
             L200 260
             L240 260
             L245 280
             Q250 290 260 290
             Q270 290 275 280
             L280 260
             L300 260
             L305 280
             Q310 290 320 290
             Q330 290 335 280
             L340 250
             Q360 240 370 220
             Q375 200 360 190
             Q340 180 320 180 Z"
          fill="#5D4037"
        />
        {/* Eye */}
        <circle cx="290" cy="115" r="5" fill="#F5E6D3" />
      </svg>

      {/* Placeholder text */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-earth-bark-400 text-sm font-medium">Dog Profile Image</p>
        <p className="text-earth-bark-300 text-xs mt-1">Click markers to explore characteristics</p>
      </div>
    </div>
  );
}

export default BreedInfoGraphic;
