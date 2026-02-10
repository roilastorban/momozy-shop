/**
 * useGrayscaleToColor Hook
 * 
 * Applies grayscale filter to images by default, then transitions to full color
 * when the element scrolls into view.
 * 
 * Usage:
 * const ref = useGrayscaleToColor();
 * <img ref={ref} src="..." alt="..." />
 * 
 * The hook automatically:
 * - Applies grayscale(100%) filter on mount
 * - Detects when element enters viewport
 * - Smoothly transitions to grayscale(0%) over 0.6s
 * - Uses Intersection Observer for performance
 */

import { useRef, useEffect } from 'react';

export function useGrayscaleToColor() {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Set initial grayscale state
    element.style.filter = 'grayscale(100%)';
    element.style.transition = 'filter 0.6s ease-out';

    // Create Intersection Observer to detect when element enters viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Element is visible - transition to color
          element.style.filter = 'grayscale(0%)';
          // Stop observing after animation triggers (performance optimization)
          observer.unobserve(element);
        }
      },
      {
        // Trigger slightly before element becomes visible (positive margin)
        rootMargin: '100px',
        threshold: 0,
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return ref;
}

export default useGrayscaleToColor;
