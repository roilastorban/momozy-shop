/**
 * ScratchBrutal Animation Component
 * 
 * A reusable component that applies "scratch brutal" animations to elements.
 * Elements arrive from left/right with random rotation, then stabilize with a slight tilt.
 */

import React from 'react';
import { motion } from 'framer-motion';

export type Intensity = 'light' | 'medium' | 'brutal';

interface ScratchBrutalProps {
  children: React.ReactNode;
  intensity?: Intensity;
  cascadeIndex?: number;
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
  const config = INTENSITY_CONFIG[intensity];

  // Calculate total delay: base delay + (cascadeIndex * stagger)
  const totalDelay = (delay || 0) + (cascadeIndex * 0.1);

  // Deterministic values based on cascadeIndex to ensure coherent "wave" effects
  // direction: -1 for left, 1 for right
  const direction = cascadeIndex % 2 === 0 ? 1 : -1;

  // Starting rotation between -intensity.rotation and +intensity.rotation
  // Using a deterministic "pseudo-random" offset based on index
  const startRotation = (((cascadeIndex * 7) % 24) - 12) * (config.rotation / 12);

  // Final slight tilt (between -2° and +2°)
  const finalTilt = ((cascadeIndex * 3) % 4) - 2;

  // Animation variants
  const variants = {
    hidden: {
      x: direction * config.distance,
      rotate: startRotation,
      opacity: 0,
    },
    visible: {
      x: 0,
      rotate: finalTilt,
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
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: once,
        margin: "0px", // Trigger immediately when entering viewport
        amount: 0
      }}
      whileHover="hover"
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default ScratchBrutal;
