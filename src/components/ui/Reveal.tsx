"use client";

import { useEffect, useRef, useState } from "react";

interface RevealProps {
    children: React.ReactNode;
    className?: string; // Additional classes
    delay?: number; // Delay in ms
    threshold?: number; // Intersection threshold (0-1)
    animation?:
    | "fade-in"
    | "fade-in-up"
    | "fade-in-down"
    | "slide-in-right"
    | "slide-in-left"
    | "scale-in";
}

export default function Reveal({
    children,
    className = "",
    delay = 0,
    threshold = 0.1,
    animation = "fade-in-up",
}: RevealProps) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Add a small delay for smoother sequential reveals if multiple elements trigger at once
                    setTimeout(() => {
                        setIsVisible(true);
                    }, 50); // Minimal baseline connection delay
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold,
                rootMargin: "0px 0px -50px 0px", // Trigger just before it comes fully into view
            }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [threshold]);

    const animationClass = {
        "fade-in": "animate-fade-in",
        "fade-in-up": "animate-fade-in-up",
        "fade-in-down": "animate-fade-in-down",
        "slide-in-right": "animate-slide-in-right",
        "slide-in-left": "animate-slide-in-left",
        "scale-in": "animate-scale-in",
    }[animation];

    // We control opacity manually before animation starts to prevent flash
    // The animation keyframes in tailwind.config.ts start from opacity: 0

    return (
        <div
            ref={ref}
            className={`${className} ${isVisible ? animationClass : "opacity-0"}`}
            style={isVisible ? { animationDelay: `${delay}ms` } : undefined}
        >
            {children}
        </div>
    );
}
