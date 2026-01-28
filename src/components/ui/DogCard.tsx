"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface DogCardProps {
  id: string;
  name: string;
  registrationNumber?: string;
  breed?: string;
  kennel?: string;
  age?: string;
  gender?: "male" | "female";
  image?: string;
  badges?: Array<{
    label: string;
    variant?: "champion" | "verified" | "health" | "default";
  }>;
  stats?: Array<{
    label: string;
    value: string;
  }>;
  href?: string;
  /** Card style variant */
  variant?: "default" | "compact" | "featured";
}

/**
 * DogCard - Interactive card component for displaying dogs
 *
 * Features hover animations, gradient overlays, and content reveal effects.
 * Designed for use in grids, carousels, or standalone displays.
 */
export function DogCard({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  id,
  name,
  registrationNumber,
  breed = "SA Black Mastiff",
  kennel,
  age,
  gender,
  image,
  badges = [],
  stats = [],
  href,
  variant = "default",
}: DogCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const cardContent = (
    <motion.div
      className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
        variant === "compact" ? "aspect-[3/4]" : variant === "featured" ? "aspect-[4/5]" : "aspect-[3/4]"
      }`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
    >
      {/* Card shadow that grows on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        animate={{
          boxShadow: isHovered
            ? "0 25px 50px -12px rgba(93, 64, 55, 0.25), 0 12px 24px -8px rgba(93, 64, 55, 0.15)"
            : "0 10px 30px -10px rgba(93, 64, 55, 0.15), 0 4px 12px -4px rgba(93, 64, 55, 0.08)",
        }}
        transition={{ duration: 0.4 }}
      />

      {/* Image container */}
      <div className="absolute inset-0">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <DogPlaceholder gender={gender} />
        )}
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-earth-bark-900/90 via-earth-bark-900/20 to-transparent" />
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-forest-900/60 via-forest-800/30 to-transparent"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* Top badges */}
      <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-2">
        {badges.map((badge, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase backdrop-blur-sm ${
              badge.variant === "champion"
                ? "bg-amber-500/90 text-white"
                : badge.variant === "verified"
                ? "bg-forest-500/90 text-white"
                : badge.variant === "health"
                ? "bg-earth-grass-500/90 text-white"
                : "bg-white/90 text-earth-bark-600"
            }`}
          >
            {badge.variant === "champion" && (
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            )}
            {badge.variant === "verified" && (
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
            {badge.variant === "health" && (
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            )}
            {badge.label}
          </motion.span>
        ))}
      </div>

      {/* Gender indicator */}
      {gender && (
        <div className="absolute top-4 right-4">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm ${
              gender === "male"
                ? "bg-blue-500/80 text-white"
                : "bg-pink-500/80 text-white"
            }`}
          >
            {gender === "male" ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2a1 1 0 011 1v2.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L11 5.586V3a1 1 0 011-1zm0 6a5 5 0 100 10 5 5 0 000-10z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2a5 5 0 100 10 5 5 0 000-10zm-1 12v4H9a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2v-4a7 7 0 10-2 0z" />
              </svg>
            )}
          </div>
        </div>
      )}

      {/* Content area */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        {/* Main info - always visible */}
        <div className="mb-4">
          <motion.h3
            className="font-display text-2xl text-white mb-1 drop-shadow-lg"
            animate={{ y: isHovered ? -4 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {name}
          </motion.h3>
          {registrationNumber && (
            <p className="text-earth-sand-300/80 text-sm font-mono tracking-wider">
              {registrationNumber}
            </p>
          )}
        </div>

        {/* Additional info - revealed on hover */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="space-y-3"
        >
          {/* Details row */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-earth-sand-200">
            {breed && (
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-earth-grass-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                {breed}
              </span>
            )}
            {kennel && (
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-earth-grass-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                {kennel}
              </span>
            )}
            {age && (
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-earth-grass-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {age}
              </span>
            )}
          </div>

          {/* Stats row */}
          {stats.length > 0 && (
            <div className="flex gap-4 pt-2">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-lg font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-earth-sand-300 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* View button */}
          <div className="pt-2">
            <span className="inline-flex items-center gap-2 text-earth-grass-400 font-semibold text-sm group/btn">
              <span>View Profile</span>
              <motion.svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ x: isHovered ? 4 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </span>
          </div>
        </motion.div>
      </div>

      {/* Hover border glow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{
          boxShadow: isHovered
            ? "inset 0 0 0 2px rgba(16, 185, 129, 0.5)"
            : "inset 0 0 0 0px rgba(16, 185, 129, 0)",
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );

  // Wrap in link if href provided
  if (href) {
    return (
      <Link href={href} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}

/**
 * Placeholder component when no image is provided
 */
function DogPlaceholder({ gender }: { gender?: "male" | "female" }) {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-earth-sand-200 to-earth-sand-300">
      {/* Pattern background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0L40 20L20 40L0 20z' fill='none' stroke='%235D4037' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Dog silhouette */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="0 0 100 80"
          className="w-32 h-32 text-earth-bark-300"
        >
          <path
            d="M85 45 Q90 35 85 25 Q80 20 75 25 Q70 20 65 25 Q60 20 55 30 L50 40 Q45 30 35 35 Q25 40 20 50 Q15 60 25 70 L30 80 L40 80 L45 70 L55 70 L60 80 L70 80 L75 70 Q85 65 90 55 Q92 50 85 45 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      {/* Gender-based accent */}
      {gender && (
        <div
          className={`absolute bottom-0 left-0 right-0 h-1 ${
            gender === "male" ? "bg-blue-400/30" : "bg-pink-400/30"
          }`}
        />
      )}
    </div>
  );
}

/**
 * DogCardSkeleton - Loading placeholder
 */
export function DogCardSkeleton() {
  return (
    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-earth-sand-200 animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-t from-earth-bark-300/50 to-transparent" />
      <div className="absolute bottom-6 left-6 right-6 space-y-3">
        <div className="h-6 bg-earth-bark-200/50 rounded w-3/4" />
        <div className="h-4 bg-earth-bark-200/30 rounded w-1/2" />
      </div>
    </div>
  );
}

/**
 * DogCardGrid - Grid layout for multiple cards
 */
export function DogCardGrid({
  children,
  columns = 3,
}: {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
}) {
  const gridClasses = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  return (
    <div className={`grid ${gridClasses[columns]} gap-6 lg:gap-8`}>
      {children}
    </div>
  );
}

export default DogCard;
