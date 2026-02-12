import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTE_PATHS } from '@/lib/index';
import { IMAGES } from '@/assets/images';
import { ScratchBrutal } from './ScratchBrutal';

/**
 * HeroSection Component
 * 
 * Main hero section with:
 * - Parallax background with autoplaying video
 * - Scratch brutal animations on geometric elements
 * - Responsive layout with CTA buttons
 * - Scroll indicator and status information
 */
export function HeroSection() {
  const { scrollY } = useScroll();
  const [currentImage, setCurrentImage] = useState(0);
  const heroImages = ['/herosection1.jpg', '/herosection2.jpg'];
  
  // Image transformation loop
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000); // 5 seconds per image
    return () => clearInterval(timer);
  }, []);

  // Parallax effects for depth and visual interest
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scaleEffect = useTransform(scrollY, [0, 500], [1, 1.1]);

  return (
    <section className="relative min-h-screen w-full flex items-center overflow-hidden bg-background">
      {/* Background Layer with Parallax and Image Transition */}
      <motion.div 
        style={{ y: y1, scale: scaleEffect }}
        className="absolute inset-0 z-0 bg-black"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage}
            src={heroImages[currentImage]}
            initial={{ opacity: 0, scale: 1.1, filter: 'grayscale(100%) blur(10px)' }}
            animate={{ opacity: 0.5, scale: 1, filter: 'grayscale(0%) blur(0px)' }}
            exit={{ opacity: 0, scale: 0.95, filter: 'grayscale(100%) blur(10px)' }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
        </AnimatePresence>

        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 z-10" />
      </motion.div>

      {/* Geometric Brutalist Overlays with Scratch Animations */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {/* Structural grid lines for brutalist aesthetic */}
        <div className="absolute top-0 left-0 w-full h-px bg-white/10" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-white/10" />
        <div className="absolute top-0 left-1/4 w-px h-full bg-white/5" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-white/5" />
        
        {/* Scratch Brutal Animation - Top Right (Brutal intensity) */}
        {/* This element scratches in from the right with maximum intensity (300px, 12°) */}
        <ScratchBrutal 
          intensity="brutal"
          delay={0.5}
          className="absolute top-1/4 -right-20 w-1/3 opacity-10 filter invert pointer-events-none"
        >
          <img 
            src={IMAGES.GEOMETRIC_BRUTALIST_3}
            className="w-full h-auto"
            alt="Geometric element - top right"
          />
        </ScratchBrutal>
        
        {/* Scratch Brutal Animation - Bottom Left (Medium intensity) */}
        {/* This element scratches in from the left with medium intensity (200px, 6°) */}
        <ScratchBrutal 
          intensity="medium"
          delay={0.8}
          className="absolute bottom-1/4 -left-16 w-1/4 opacity-5 pointer-events-none"
        >
          <img 
            src={IMAGES.GEOMETRIC_BRUTALIST_2}
            className="w-full h-auto filter invert"
            alt="Geometric element - bottom left"
          />
        </ScratchBrutal>
        
        {/* Scratch Brutal Animation - Top Center (Light intensity) */}
        {/* This element scratches in from the top with light intensity (100px, 3°) */}
        <ScratchBrutal 
          intensity="light"
          delay={1.2}
          className="absolute top-10 right-1/3 w-20 h-20 opacity-10 pointer-events-none"
        >
          <div className="w-full h-full border-2 border-white/20 rotate-45" />
        </ScratchBrutal>
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Badge - New Collection */}
            <span className="inline-block py-1 px-4 border border-white/20 text-xs font-mono tracking-widest uppercase mb-6 bg-white/10">
              Nouvelle Collection 2026
            </span>
            
            {/* Main Headline with Scratch Animation */}
            <ScratchBrutal 
              intensity="medium"
              delay={0.3}
              className="inline-block w-full"
            >
              <h1 className="text-5xl sm:text-7xl md:text-9xl font-black leading-[0.85] tracking-tighter uppercase mb-8 font-syne break-words">
                <span className="block">Dominez</span>
                <span className="block text-outline-white text-transparent">La Rue.</span>
              </h1>
            </ScratchBrutal>
            
            {/* Subheading */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-12 leading-relaxed">
              L'épicentre du streetwear premium au Bénin. Qualité supérieure, 
              coupes boxy et exclusivité totale pour l'élite urbaine.
            </p>

            {/* CTA Buttons with Scratch Animations */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              {/* Primary CTA - Shop Drop (Medium intensity scratch) */}
              <ScratchBrutal intensity="medium" delay={1.5} className="w-full sm:w-auto">
                <Link to={ROUTE_PATHS.SHOP}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-primary text-primary-foreground px-8 py-5 font-bold uppercase tracking-tighter flex items-center justify-between group min-w-0 sm:min-w-[240px]"
                  >
                    Shopper le Drop
                    <ArrowRight className="ml-4 transition-transform group-hover:translate-x-2" />
                  </motion.button>
                </Link>
              </ScratchBrutal>
              
              {/* Secondary CTA - Momozy Gang (Light intensity scratch) */}
              <ScratchBrutal intensity="light" delay={1.7} className="w-full sm:w-auto">
                <Link to={ROUTE_PATHS.BRANDS}>
                  <motion.button
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                    className="w-full border border-white/20 px-8 py-5 font-bold uppercase tracking-tighter"
                  >
                    Le Momozy Gang
                  </motion.button>
                </Link>
              </ScratchBrutal>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Info Bar - Fades out on scroll */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-0 left-0 w-full p-8 flex flex-col md:flex-row justify-between items-end md:items-center z-20 border-t border-white/10"
      >
        {/* Location and Status Info */}
        <div className="flex gap-8 mb-4 md:mb-0">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono uppercase text-muted-foreground">Localisation</span>
            <span className="text-sm font-bold uppercase">Cotonou, Togoudo</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono uppercase text-muted-foreground">Statut</span>
            <span className="text-sm font-bold uppercase text-green-500">Shop Ouvert</span>
          </div>
        </div>

        {/* Scroll Indicator - Animated chevron */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="hidden md:flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <span className="text-[10px] font-mono uppercase tracking-widest">Scroll</span>
          <ChevronDown size={20} />
        </motion.div>

        {/* Limited Edition Counter */}
        <div className="text-right">
          <p className="text-xs font-mono uppercase text-muted-foreground mb-1">Éditions Limitées</p>
          <p className="text-xl font-black">03 / 10</p>
        </div>
      </motion.div>

      {/* Side Text - Vertical (Hidden on mobile) */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block rotate-90 origin-right">
        <p className="text-[10px] font-mono uppercase tracking-[1em] text-white/20 whitespace-nowrap">
          Streetwear Culture • Elite Standards • Momozy Shop
        </p>
      </div>

      {/* Text Outline Style for "La Rue" */}
      <style dangerouslySetInnerHTML={{ __html: `
        .text-outline-white {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.4);
        }
      `}} />
    </section>
  );
}
