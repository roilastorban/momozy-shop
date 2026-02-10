import React from 'react';
import { motion } from 'framer-motion';

/**
 * MOMOZY SHOP Social Proof Marquee
 * Un bandeau défilant horizontalement à l'infini affichant les célébrités qui valident la marque.
 * Design brutaliste avec typographie massive et bordures rigides.
 */

const CELEBRITIES = [
  "AMIR EL PRÉSIDENTE",
  "TRANQUILLIN",
  "XTIME",
  "KARDINAL RICKY",
  "TGANG",
  "VANO BABY",
  "BLAZZE",
  "FIRST KING",
  "FANICKO",
  "NIKANO",
  "TIDIANE MARIO"
];

export function SocialProofMarquee() {
  // On triple la liste pour garantir un défilement infini fluide sans coupure visuelle
  const displayItems = [...CELEBRITIES, ...CELEBRITIES, ...CELEBRITIES];

  return (
    <section className="relative w-full bg-background border-y border-foreground overflow-hidden py-10 md:py-16 select-none group">
      {/* Badge Brutaliste d'Authenticité */}
      <div className="absolute top-0 left-0 bg-foreground text-background px-4 py-1.5 text-[10px] md:text-xs font-mono font-bold uppercase z-20 border-r border-b border-foreground">
        Validation Gang // MOMOZY SHOP 2026
      </div>

      <motion.div
        className="flex whitespace-nowrap items-center cursor-grab active:cursor-grabbing"
        initial={{ x: 0 }}
        animate={{ x: "-33.333%" }}
        transition={{
          duration: 20, // Vitesse doublée (était 40)
          ease: "linear",
          repeat: Infinity,
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }} // Keep it mostly in place but allow dragging
        dragElastic={0.05}
        whileTap={{ scale: 0.98 }}
      >
        {displayItems.map((name, index) => (
          <div key={index} className="flex items-center gap-12 md:gap-24 px-8 md:px-16">
            <div className="flex flex-col items-start">
              <span className="text-[10px] md:text-[12px] font-mono text-muted-foreground uppercase tracking-[0.4em] mb-2">
                Approuvé par
              </span>
              <h2 className="text-4xl md:text-9xl font-black uppercase tracking-tighter text-foreground group-hover:text-primary transition-colors duration-500">
                {name}
              </h2>
            </div>

            {/* Séparateur Géométrique Brutaliste */}
            <div className="flex flex-col gap-2 items-center opacity-20">
              <div className="w-4 h-4 md:w-10 md:h-10 border-2 border-foreground rotate-45 flex-shrink-0" />
              <div className="w-2 h-2 md:w-4 md:h-4 bg-foreground rotate-45 flex-shrink-0" />
              <div className="w-4 h-4 md:w-10 md:h-10 border-2 border-foreground rotate-45 flex-shrink-0" />
            </div>
          </div>
        ))}
      </motion.div>

      {/* Effet de scanline subtil pour le côté brut/technique */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

      {/* Overlay dégradé pour adoucir les bords du conteneur (Glassmorphism subtil) */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
      
      {/* Message de bas de section */}
      <div className="absolute bottom-0 right-0 bg-foreground text-background px-4 py-1 text-[9px] font-mono uppercase tracking-widest">
        Elite Status Verified
      </div>
    </section>
  );
}
