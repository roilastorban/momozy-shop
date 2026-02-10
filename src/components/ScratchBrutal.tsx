/**
 * ScratchBrutal Animation Component
 * 
 * A reusable component that applies "scratch brutal" animations to elements.
 * Elements arrive from left/right with random rotation, then stabilize with a slight tilt.
 */

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export type Intensity = 'light' | 'medium' | 'brutal';

interface ScratchBrutalProps {
  children: React.ReactNode;
  intensity?: Intensity;
  cascadeIndex?: number; // Renamed from index to avoid potential naming conflicts
  delay?: number; // Base delay if cascadeIndex is not provided
  className?: string;
  once?: boolean;
}

// Configuration for each intensity level
const INTENSITY_CONFIG: Record<Intensity, { distance: number; rotation: number }> = {
  light: { distance: 100, rotation: 3 },
  medium: { distance: 200, rotation: 6 },
  brutal: { distance: 300, rotation: 12 },
};

// Spring physics configuration
const SPRING_CONFIG = {
  damping: 22,
  stiffness: 100,
  mass: 1,
};

export function ScratchBrutal({
  children,
  intensity = 'medium',
  cascadeIndex = 0,
  delay = 0,
  className = '',
  once = true,
}: ScratchBrutalProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Random direction: -1 for left, 1 for right
  const directionRef = useRef(Math.random() > 0.5 ? 1 : -1);
  
  // Random starting rotation between -12° and +12°
  const randomRotationRef = useRef(Math.random() * 24 - 12);
  
  // Final slight tilt (between -2° and +2°)
  const finalTiltRef = useRef(Math.random() * 4 - 2);

  const config = INTENSITY_CONFIG[intensity];

  // Calculate total delay: base delay + (cascadeIndex * stagger)
  const totalDelay = (delay || 0) + (cascadeIndex * 0.1);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!hasAnimated || !once)) {
          setIsVisible(true);
          if (once) setHasAnimated(true);
        }
      },
      {
        // Positive margin triggers animation BEFORE the element enters the viewport
        // This ensures elements at the top are visible immediately.
        rootMargin: '100px',
        threshold: 0,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [hasAnimated, once]);

  // Animation variants
  const variants = {
    hidden: {
      x: directionRef.current * config.distance,
      rotate: randomRotationRef.current,
      opacity: 0,
    },
    visible: {
      x: 0,
      rotate: finalTiltRef.current,
      opacity: 1,
      transition: {
        delay: totalDelay,
        type: 'spring',
        ...SPRING_CONFIG,
      },
    },
    hover: {
      rotate: 0,
      transition: {
        duration: 0.3,
        type: 'spring',
        damping: 20,
        stiffness: 150,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      whileHover="hover"
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default ScratchBrutal;
