import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ScratchToRevealLoader Component
 *
 * A brutalist full-screen overlay that requires the user to "scratch"
 * to reveal the site content. This buys time for heavy assets like
 * the background video to load while engaging the user.
 */
interface ScratchToRevealLoaderProps {
  onComplete: () => void;
}

export const ScratchToRevealLoader: React.FC<ScratchToRevealLoaderProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRevealed, setIsRevealed] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('momozy_revealed') === 'true';
    }
    return false;
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [assetProgress, setAssetProgress] = useState(0);
  const [scratchPercentage, setScratchPercentage] = useState(0);
  const isDrawing = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    // Set canvas size to window size
    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Re-fill with black after resize
      ctx.fillStyle = '#0d0d0d';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add some "brutal" texture/noise
      for (let i = 0; i < 5000; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const opacity = Math.random() * 0.05;
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fillRect(x, y, 1, 1);
      }

      // Draw the logo ON the canvas so it can be scratched
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Responsive font size
      const fontSize = Math.min(canvas.width / 5, 120);
      ctx.font = `900 ${fontSize}px Syne, sans-serif`;
      ctx.letterSpacing = '-0.05em';
      ctx.fillText('MOMOZY', canvas.width / 2, canvas.height / 2);

      ctx.font = `400 ${Math.max(12, fontSize / 8)}px JetBrains Mono, monospace`;
      ctx.letterSpacing = '0.5em';
      ctx.fillText('STREETWEAR', canvas.width / 2, canvas.height / 2 + fontSize / 1.5);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    setIsLoaded(true);

    // Asset Loading Simulation/Tracking
    const totalAssets = 5;
    let loadedAssets = 0;

    const incrementProgress = () => {
      loadedAssets++;
      setAssetProgress((loadedAssets / totalAssets) * 100);
    };

    // Track some critical images
    const criticalImages = [
      '/herosection1.jpg',
      '/herosection2.jpg',
      '/audio/background.mp3', // Tracking audio too
    ];

    criticalImages.forEach(src => {
      const img = new Image();
      if (src.endsWith('.mp3')) {
        const audio = new Audio();
        audio.src = src;
        audio.oncanplaythrough = incrementProgress;
      } else {
        img.src = src;
        img.onload = incrementProgress;
      }
    });

    // Simulated remaining progress to ensure it hits 100% smoothly
    const interval = setInterval(() => {
      setAssetProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(prev + Math.random() * 5, 99);
      });
    }, 200);

    // Lock scroll during loading
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.body.style.overflow = '';
    };
  }, []);

  // Calculate scratched percentage
  const updatePercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentPixels = 0;

    // Sample every 20th pixel to save performance
    for (let i = 0; i < pixels.length; i += 80) {
      if (pixels[i + 3] === 0) {
        transparentPixels++;
      }
    }

    const totalSampledPixels = pixels.length / 80;
    const percentage = (transparentPixels / totalSampledPixels) * 100;
    setScratchPercentage(percentage);

    // Auto-reveal threshold (25% scratched)
    if (percentage > 25 && !isRevealed) {
      handleReveal();
    }
  }, [isRevealed]);

  const handleReveal = () => {
    setIsRevealed(true);
    sessionStorage.setItem('momozy_revealed', 'true');
    document.body.style.overflow = ''; // Restore scroll
    setTimeout(onComplete, 800); // Delay to allow fade out animation
  };

  const getPos = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    if ('touches' in e) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: (e as MouseEvent).clientX, y: (e as MouseEvent).clientY };
  };

  const scratch = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    if (!isDrawing.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pos = getPos(e);

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.lineWidth = 100; // Even larger brush for more brutal effect
    ctx.lineCap = 'round';
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();

    lastPos.current = pos;

    // Throttle percentage calculation
    if (Math.random() > 0.9) {
      updatePercentage();
    }
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    isDrawing.current = true;
    lastPos.current = getPos(e);
  };

  const handleEnd = () => {
    isDrawing.current = false;
    updatePercentage();
  };

  return (
    <AnimatePresence>
      {!isRevealed && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-background touch-none overflow-hidden"
        >
          {/* Static Branding (Visible underneath/during scratch) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
             <div className="flex flex-col items-center">
                <span className="text-6xl md:text-9xl font-black tracking-tighter leading-none text-white opacity-10">
                  MOMOZY
                </span>
                <span className="text-sm md:text-lg font-mono tracking-[0.5em] text-white/5 uppercase mt-4">
                  STREETWEAR CULTURE
                </span>
             </div>
          </div>

          {/* Instruction Layer */}
          <div className="absolute bottom-12 left-0 w-full text-center pointer-events-none select-none">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="flex flex-col gap-1 items-center">
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/20">
                  {assetProgress < 100 ? "SYNCHRONISATION DES ASSETS..." : "GANG READY"}
                </span>
                <span className="text-xs font-mono tracking-[0.3em] uppercase text-white/60">
                  {assetProgress < 100
                    ? `CHARGEMENT: ${Math.round(assetProgress)}%`
                    : scratchPercentage < 2
                      ? "GRATTEZ POUR ENTRER"
                      : `ACCÈS: ${Math.min(100, Math.round(scratchPercentage * 4))}%`
                  }
                </span>
              </div>

              <div className="w-48 h-px bg-white/10 relative overflow-hidden">
                 {/* Asset Progress Bar */}
                 <motion.div
                   className="absolute inset-0 bg-white/20"
                   style={{ scaleX: assetProgress / 100, transformOrigin: 'left' }}
                 />
                 {/* Scratch Progress Bar */}
                 <motion.div
                   className="absolute inset-0 bg-primary z-10"
                   style={{ scaleX: Math.min(1, scratchPercentage / 25), transformOrigin: 'left' }}
                 />
              </div>

              {assetProgress === 100 && scratchPercentage < 5 && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="text-[9px] font-mono tracking-[0.2em] text-primary uppercase mt-2"
                >
                  Utilisez votre doigt ou souris
                </motion.span>
              )}
            </motion.div>
          </div>

          {/* The Scratchable Canvas */}
          <canvas
            ref={canvasRef}
            onMouseDown={handleStart}
            onMouseMove={scratch}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={handleStart}
            onTouchMove={scratch}
            onTouchEnd={handleEnd}
            className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
          />

        </motion.div>
      )}
    </AnimatePresence>
  );
};
