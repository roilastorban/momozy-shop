import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Filter, ShoppingBag } from 'lucide-react';
import { BrandGrid } from '@/components/BrandGrid';
import { ProductCard } from '@/components/ProductCard';
import { ScratchBrutal } from '@/components/ScratchBrutal';
import { GrayscaleImage } from '@/components/GrayscaleImage';
import { 
  BRANDS, 
  PRODUCTS, 
  Product, 
  ROUTE_PATHS 
} from '@/lib/index';
import { IMAGES } from '@/assets/images';

const BrandsPage: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    if (!selectedBrand) return PRODUCTS;
    return PRODUCTS.filter(p => p.brand.toLowerCase() === selectedBrand.toLowerCase());
  }, [selectedBrand]);

  const activeBrandName = useMemo(() => {
    if (!selectedBrand) return "Toutes les Marques";
    return BRANDS.find(b => b.slug === selectedBrand)?.name || selectedBrand;
  }, [selectedBrand]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden border-b border-border">
        <div className="absolute inset-0 z-0">
          <GrayscaleImage
            src={IMAGES.LUXURY_TEXTURE_7} 
            alt="Luxury Texture" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/60 to-background" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div>
            <ScratchBrutal intensity="light" index={0}>
              <span className="inline-block py-1 px-3 mb-6 border border-primary text-[10px] font-mono tracking-[0.2em] uppercase">
                Curated Elite Selection
              </span>
            </ScratchBrutal>
            <ScratchBrutal intensity="brutal" index={1}>
              <h1 className="text-6xl md:text-8xl font-black font-heading tracking-tighter mb-6 uppercase">
                LES <span className="text-outline text-transparent stroke-primary">MAISONS</span>
              </h1>
            </ScratchBrutal>
            <ScratchBrutal intensity="medium" index={2}>
              <p className="max-w-2xl mx-auto text-muted-foreground text-sm md:text-base leading-relaxed">
                L'excellence du streetwear mondial sélectionnée pour le Momozy Gang.
                Des pièces rares issues des créateurs les plus influents de la scène urbaine contemporaine.
              </p>
            </ScratchBrutal>
          </div>
        </div>

        {/* Geometric Decorative Elements */}
        <div className="absolute bottom-0 right-0 w-32 h-32 border-t border-l border-border opacity-20 hidden md:block" />
        <div className="absolute top-0 left-0 w-64 h-64 border-b border-r border-border opacity-10 hidden md:block" />
      </section>

      {/* Brand Grid Selector Section */}
      <section className="py-24 border-b border-border bg-card/30 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold uppercase mb-4 tracking-tight">Le Répertoire</h2>
              <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest">
                Explorez les archives par créateur
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setSelectedBrand(null)}
                className={`px-6 py-2 border text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                  selectedBrand === null 
                    ? 'bg-primary text-primary-foreground border-primary' 
                    : 'bg-transparent text-foreground border-border hover:border-primary'
                }`}
              >
                Tout voir
              </button>
            </div>
          </div>

          <div className="relative">
            {/* Using the imported BrandGrid component */}
            <BrandGrid />
            
            {/* Brand Filter Buttons Overlay (Custom for this page) */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-px bg-border border border-border mt-1">
              {BRANDS.map((brand, index) => (
                <ScratchBrutal
                  key={brand.slug}
                  index={index}
                  intensity="light"
                  className="bg-background"
                >
                  <button
                    onClick={() => setSelectedBrand(brand.slug)}
                    className={`w-full group relative p-6 text-center transition-all duration-300 ${
                      selectedBrand === brand.slug
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background hover:bg-muted'
                    }`}
                  >
                    <span className="relative z-10 text-[10px] font-black uppercase tracking-widest">
                      {brand.name}
                    </span>
                    {selectedBrand === brand.slug && (
                      <motion.div
                        layoutId="activeBrand"
                        className="absolute inset-0 border-2 border-primary-foreground/20"
                      />
                    )}
                  </button>
                </ScratchBrutal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filtered Products Section */}
      <section className="py-24 bg-background overflow-hidden" id="brand-products">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-[1px] bg-primary"></div>
              <h3 className="text-xl font-bold uppercase tracking-tighter">
                {activeBrandName}
              </h3>
              <span className="font-mono text-[10px] text-muted-foreground ml-2">
                ({filteredProducts.length} ARTICLES)
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase text-muted-foreground">
              <Filter className="w-3 h-3" />
              <span>Trié par : Nouveautés</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={selectedBrand || 'all'}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))
              ) : (
                <div className="col-span-full py-32 text-center border border-dashed border-border">
                  <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p className="text-muted-foreground uppercase font-mono text-xs tracking-widest">
                    Aucune pièce disponible pour cette sélection actuellement.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 border-t border-border overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="bg-card border border-border p-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10">
               <ShoppingBag size={120} className="rotate-12" />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-black uppercase mb-4 tracking-tight">Rejoindre le Momozy Gang</h2>
                <p className="text-muted-foreground max-w-md">
                  Accédez aux drops exclusifs avant tout le monde et profitez d'un accès VIP à nos prochaines collections.
                </p>
              </div>
              <button className="px-10 py-5 bg-primary text-primary-foreground font-black uppercase tracking-widest text-sm flex items-center gap-4 hover:scale-105 transition-transform">
                S'inscrire à l'Élite <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Global CSS for text stroke effect used in hero */}
      <style dangerouslySetInnerHTML={{ __html: `
        .text-outline {
          -webkit-text-stroke: 1px var(--color-primary);
          text-stroke: 1px var(--color-primary);
        }
      `}} />
    </div>
  );
};

export default BrandsPage;