"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

interface ScrollSequenceProps {
  /** Array of image URLs for the sequence frames */
  images?: string[];
  /** Total number of frames (used for placeholder mode) */
  frameCount?: number;
  /** Height multiplier for scroll distance (default: 3 = 300vh) */
  scrollMultiplier?: number;
  /** Optional title text */
  title?: string;
  /** Optional subtitle text */
  subtitle?: string;
}

/**
 * ScrollSequence - A scroll-driven animation component
 *
 * Creates a "video controlled by scroll" effect where the user's scroll
 * position controls which frame of an image sequence is displayed.
 *
 * When no images are provided, displays a placeholder with animated
 * dog silhouette that transforms based on scroll progress.
 */
export function ScrollSequence({
  images = [],
  frameCount = 60,
  scrollMultiplier = 3,
  title = "Watch Them Grow",
  subtitle = "From playful puppy to majestic guardian",
}: ScrollSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentFrame, setCurrentFrame] = useState(0);
  const hasImages = images.length > 0;
  const totalFrames = hasImages ? images.length : frameCount;

  // Track scroll progress within the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth spring animation for frame transitions
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Transform scroll progress to frame index
  const frameIndex = useTransform(smoothProgress, [0, 1], [0, totalFrames - 1]);

  // Update current frame when scroll changes
  useEffect(() => {
    const unsubscribe = frameIndex.on("change", (latest) => {
      setCurrentFrame(Math.round(latest));
    });
    return () => unsubscribe();
  }, [frameIndex]);

  // Progress percentage for visual indicators
  const progressPercent = useTransform(smoothProgress, [0, 1], [0, 100]);

  // Parallax transforms for decorative elements
  const grassY = useTransform(smoothProgress, [0, 1], [0, -50]);
  const cloudX = useTransform(smoothProgress, [0, 1], [-20, 20]);
  const sunScale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1, 1.2]);

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: `${scrollMultiplier * 100}vh` }}
    >
      {/* Sticky container that stays in view during scroll */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Nature background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-earth-sand-100 via-earth-sand-200 to-earth-grass-100" />

        {/* Animated sky elements */}
        <motion.div
          className="absolute top-[10%] right-[15%] w-24 h-24 rounded-full bg-gradient-to-br from-amber-200 to-amber-300 opacity-60 blur-sm"
          style={{ scale: sunScale }}
        />

        {/* Floating clouds */}
        <motion.div
          className="absolute top-[15%] left-[10%] flex gap-4 opacity-30"
          style={{ x: cloudX }}
        >
          <div className="w-32 h-12 bg-white rounded-full blur-md" />
          <div className="w-20 h-10 bg-white rounded-full blur-md -mt-2" />
        </motion.div>

        <motion.div
          className="absolute top-[20%] right-[25%] flex gap-3 opacity-20"
          style={{ x: useTransform(cloudX, (x) => -x * 0.5) }}
        >
          <div className="w-24 h-8 bg-white rounded-full blur-md" />
          <div className="w-16 h-6 bg-white rounded-full blur-md mt-1" />
        </motion.div>

        {/* Main content area */}
        <div className="relative h-full flex flex-col items-center justify-center">
          {/* Title and subtitle */}
          <motion.div
            className="absolute top-[12%] text-center z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-earth-bark-500 mb-3">
              {title}
            </h2>
            <p className="text-earth-bark-400 text-lg md:text-xl">{subtitle}</p>
          </motion.div>

          {/* Frame display area */}
          <div className="relative w-full max-w-4xl aspect-video mx-auto px-8">
            {hasImages ? (
              // Real image sequence mode
              <div className="relative w-full h-full">
                {images.map((src, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-100 ${
                      index === currentFrame ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <Image
                      src={src}
                      alt={`Frame ${index + 1}`}
                      fill
                      className="object-contain"
                      priority={index < 5}
                    />
                  </div>
                ))}
              </div>
            ) : (
              // Placeholder mode with animated dog silhouette
              <PlaceholderSequence progress={currentFrame / (totalFrames - 1)} />
            )}
          </div>

          {/* Animated grass foreground */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[25%] pointer-events-none"
            style={{ y: grassY }}
          >
            {/* Grass layers */}
            <svg
              viewBox="0 0 1440 200"
              className="absolute bottom-0 w-full h-full"
              preserveAspectRatio="none"
            >
              {/* Back grass layer */}
              <path
                d="M0,100 C200,80 400,120 600,90 C800,60 1000,110 1200,85 C1300,75 1400,95 1440,100 L1440,200 L0,200 Z"
                fill="rgba(16, 185, 129, 0.3)"
              />
              {/* Middle grass layer */}
              <path
                d="M0,120 C150,100 350,140 550,110 C750,80 950,130 1150,105 C1300,90 1400,115 1440,120 L1440,200 L0,200 Z"
                fill="rgba(16, 185, 129, 0.5)"
              />
              {/* Front grass layer */}
              <path
                d="M0,150 C100,130 300,170 500,140 C700,110 900,160 1100,135 C1250,115 1380,145 1440,150 L1440,200 L0,200 Z"
                fill="rgba(5, 150, 105, 0.7)"
              />
            </svg>

            {/* Individual grass blades */}
            <div className="absolute bottom-0 left-0 right-0 h-20 flex items-end justify-around px-4">
              {Array.from({ length: 30 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-gradient-to-t from-earth-grass-600 to-earth-grass-400 rounded-t-full"
                  style={{
                    height: `${20 + Math.random() * 40}px`,
                    opacity: 0.6 + Math.random() * 0.4,
                  }}
                  animate={{
                    rotate: [0, Math.random() * 5 - 2.5, 0],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Progress indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
            <div className="flex flex-col items-center gap-3">
              {/* Progress bar */}
              <div className="w-48 h-1 bg-earth-bark-200/50 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-forest-500 to-earth-grass-500 rounded-full"
                  style={{ width: useTransform(progressPercent, (p) => `${p}%`) }}
                />
              </div>

              {/* Scroll instruction */}
              <motion.p
                className="text-xs text-earth-bark-400 tracking-widest uppercase"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Scroll to animate
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * PlaceholderSequence - Animated placeholder when no images are provided
 * Shows a dog silhouette that grows from puppy to adult based on progress
 */
function PlaceholderSequence({ progress }: { progress: number }) {
  // Calculate dog size based on progress (puppy = small, adult = large)
  const scale = 0.4 + progress * 0.6;
  const legLength = 20 + progress * 30;
  const bodyLength = 60 + progress * 40;
  const headSize = 25 + progress * 15;

  // Running animation offset
  const runCycle = Math.sin(progress * Math.PI * 8) * 10;
  const legOffset = Math.sin(progress * Math.PI * 16);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Background frame */}
      <div className="absolute inset-8 border-2 border-dashed border-earth-bark-200/30 rounded-2xl flex items-center justify-center">
        <div className="text-center">
          <p className="text-earth-bark-300 text-sm mb-2">Scroll Animation Preview</p>
          <p className="text-earth-bark-400/60 text-xs">
            Frame {Math.round(progress * 59) + 1} of 60
          </p>
        </div>
      </div>

      {/* Animated dog silhouette */}
      <motion.svg
        viewBox="0 0 200 150"
        className="w-full max-w-md h-auto"
        style={{
          transform: `scale(${scale})`,
        }}
      >
        {/* Dog body */}
        <motion.g
          style={{
            transform: `translateY(${runCycle}px)`,
          }}
        >
          {/* Body */}
          <ellipse
            cx={100}
            cy={75}
            rx={bodyLength / 2}
            ry={25}
            fill="#5D4037"
            className="transition-all duration-100"
          />

          {/* Head */}
          <circle
            cx={100 + bodyLength / 2 - 10}
            cy={60}
            r={headSize}
            fill="#5D4037"
          />

          {/* Snout */}
          <ellipse
            cx={100 + bodyLength / 2 + headSize - 15}
            cy={65}
            rx={headSize * 0.5}
            ry={headSize * 0.35}
            fill="#4E3630"
          />

          {/* Eye */}
          <circle
            cx={100 + bodyLength / 2 + 5}
            cy={55}
            r={4}
            fill="#1F1410"
          />

          {/* Ear */}
          <ellipse
            cx={100 + bodyLength / 2 - 20}
            cy={45}
            rx={8}
            ry={12}
            fill="#4E3630"
            transform={`rotate(-15 ${100 + bodyLength / 2 - 20} 45)`}
          />

          {/* Tail */}
          <motion.path
            d={`M ${100 - bodyLength / 2 + 5} 70 Q ${100 - bodyLength / 2 - 15} ${55 + legOffset * 5} ${100 - bodyLength / 2 - 10} ${45 + legOffset * 3}`}
            stroke="#5D4037"
            strokeWidth={8}
            strokeLinecap="round"
            fill="none"
          />

          {/* Front legs */}
          <motion.line
            x1={100 + bodyLength / 4}
            y1={95}
            x2={100 + bodyLength / 4 + legOffset * 8}
            y2={95 + legLength}
            stroke="#5D4037"
            strokeWidth={10}
            strokeLinecap="round"
          />
          <motion.line
            x1={100 + bodyLength / 4 - 15}
            y1={95}
            x2={100 + bodyLength / 4 - 15 - legOffset * 8}
            y2={95 + legLength}
            stroke="#4E3630"
            strokeWidth={10}
            strokeLinecap="round"
          />

          {/* Back legs */}
          <motion.line
            x1={100 - bodyLength / 4}
            y1={95}
            x2={100 - bodyLength / 4 - legOffset * 10}
            y2={95 + legLength}
            stroke="#5D4037"
            strokeWidth={10}
            strokeLinecap="round"
          />
          <motion.line
            x1={100 - bodyLength / 4 + 15}
            y1={95}
            x2={100 - bodyLength / 4 + 15 + legOffset * 10}
            y2={95 + legLength}
            stroke="#4E3630"
            strokeWidth={10}
            strokeLinecap="round"
          />
        </motion.g>
      </motion.svg>

      {/* Growth indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <span className="text-xs text-earth-bark-400">Puppy</span>
        <div className="w-32 h-2 bg-earth-bark-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-earth-bark-300 to-earth-bark-500 rounded-full"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <span className="text-xs text-earth-bark-400">Adult</span>
      </div>
    </div>
  );
}

export default ScrollSequence;
