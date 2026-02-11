import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BRANDS, ROUTE_PATHS } from '@/lib/index';
import { IMAGES } from '@/assets/images';
import { ArrowRight } from 'lucide-react';
import { ScratchBrutal } from '@/components/ScratchBrutal';
import { GrayscaleImage } from '@/components/GrayscaleImage';

/**
 * BrandGrid Component
 * Implements a brutalist geometric grid for luxury brands.
 * Features aggressive hover animations and strict rectangular design.
 */
export function BrandGrid() {
  // Map textures to brands for a unique look per card
  const textures = [
    IMAGES.LUXURY_TEXTURE_1,
    IMAGES.LUXURY_TEXTURE_2,
    IMAGES.LUXURY_TEXTURE_3,
    IMAGES.LUXURY_TEXTURE_4,
    IMAGES.LUXURY_TEXTURE_5,
    IMAGES.LUXURY_TEXTURE_6,
    IMAGES.LUXURY_TEXTURE_7,
  ];

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-6xl md:text-8xl font-black font-heading uppercase leading-none tracking-tighter"
            >
              LES <span className="text-muted-foreground">MAISONS</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-xl text-muted-foreground font-mono uppercase tracking-widest"
            >
              Sélection exclusive d'élite internationale
            </motion.p>
          </div>
          <Link 
            to={ROUTE_PATHS.BRANDS} 
            className="group flex items-center gap-4 bg-foreground text-background px-8 py-4 font-bold uppercase transition-all hover:bg-white hover:text-black border border-foreground"
          >
            Voir Tout le Gang
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-foreground/20">
          {BRANDS.map((brand, index) => (
            <ScratchBrutal
              key={brand.slug}
              cascadeIndex={index}
              intensity="medium"
            >
              <Link
                to={`${ROUTE_PATHS.BRANDS}?brand=${brand.slug}`}
                className="group relative block h-[400px] border-r border-b border-foreground/20 overflow-hidden"
              >
                {/* Background Texture Overlay */}
                <div className="absolute inset-0 z-0">
                  <GrayscaleImage
                    src={textures[index % textures.length]} 
                    alt="Texture"
                    className="w-full h-full object-cover opacity-20 transition-all duration-700 group-hover:scale-110 group-hover:opacity-40"
                  />
                  <div className="absolute inset-0 bg-background/80 group-hover:bg-background/40 transition-colors duration-500" />
                </div>

                {/* Decorative Geometric Lines */}
                <div className="absolute top-0 left-0 w-full h-px bg-foreground/10 group-hover:bg-foreground/40 transition-colors" />
                <div className="absolute top-0 left-0 w-px h-full bg-foreground/10 group-hover:bg-foreground/40 transition-colors" />
                
                <div className="relative z-10 h-full p-8 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-sm opacity-50">MOD00{index + 1}</span>
                    <div className="w-12 h-12 border border-foreground/20 flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-colors">
                      <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-4xl md:text-3xl xl:text-4xl font-black font-heading uppercase leading-none break-words group-hover:tracking-wider transition-all duration-500">
                      {brand.name}
                    </h3>
                    <div className="mt-4 h-1 w-0 bg-foreground group-hover:w-full transition-all duration-700" />
                  </div>

                  {/* Brutalist Geometric Pattern overlay on hover */}
                  <div className="absolute bottom-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none">
                    <svg viewBox="0 0 100 100" className="w-full h-full fill-foreground">
                      <path d="M0 0h10v10H0zM20 0h10v10H20zM40 0h10v10H40zM60 0h10v10H60zM80 0h10v10H80zM0 20h10v10H0zM0 40h10v10H0zM0 60h10v10H0zM0 80h10v10H0z" />
                    </svg>
                  </div>
                </div>
              </Link>
            </ScratchBrutal>
          ))}
          
          {/* CTA Tile for Boutique */}
          <ScratchBrutal
            intensity="brutal"
            cascadeIndex={BRANDS.length}
            className="group relative h-[400px] border-r border-b border-foreground/20 bg-foreground flex items-center justify-center"
          >
            <Link
              to={ROUTE_PATHS.SHOP}
              className="absolute inset-0 flex flex-col items-center justify-center text-background p-8 text-center"
            >
              <h3 className="text-5xl font-black font-heading uppercase leading-tight mb-4">
                SHOP THE <br />DROP
              </h3>
              <p className="font-mono text-xs uppercase tracking-widest opacity-70 group-hover:opacity-100 transition-opacity">
                Mise à jour hebdomadaire
              </p>
              <div className="mt-8 p-4 border border-background/20 group-hover:border-background transition-colors">
                <ArrowRight className="w-8 h-8" />
              </div>
            </Link>
          </ScratchBrutal>
        </div>
      </div>
    </section>
  );
}
