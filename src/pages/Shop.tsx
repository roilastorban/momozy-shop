import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS, CATEGORIES, BRANDS, Product } from "@/lib/index";
import { ScratchBrutal } from "@/components/ScratchBrutal";

export default function Shop() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeBrand, setActiveBrand] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (activeBrand !== "all") {
      result = result.filter((p) => p.brand.toLowerCase() === activeBrand.toLowerCase());
    }

    if (searchQuery) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      result.sort((a, b) => (a.isNew ? -1 : 1));
    }

    return result;
  }, [searchQuery, activeCategory, activeBrand, sortBy]);

  const activeCategoryName = CATEGORIES.find(c => c.slug === activeCategory)?.name || "TOUTES LES PIÈCES";

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header Section */}
      <section className="pt-32 pb-12 px-6 border-b border-border">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
                Catalogue Officiel
              </span>
              <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-none">
                {activeCategoryName}
              </h1>
            </div>
            <div className="font-mono text-sm">
              <span className="text-primary">{filteredProducts.length}</span> ARTICLES TROUVÉS
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar (Sticky) */}
      <nav className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[280px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="RECHERCHER UN STYLE..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-secondary border border-border px-12 py-3 text-sm focus:outline-none focus:border-primary transition-colors font-mono uppercase"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 hover:text-primary transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Desktop Filter Tabs */}
          <div className="hidden lg:flex items-center gap-2">
            {CATEGORIES.map((cat, index) => (
              <ScratchBrutal
                key={cat.slug}
                cascadeIndex={index}
                intensity="light"
              >
                <button
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-tighter border transition-all ${
                    activeCategory === cat.slug
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-transparent text-foreground border-border hover:border-primary"
                  }`}
                >
                  {cat.name}
                </button>
              </ScratchBrutal>
            ))}
          </div>

          {/* Sort & Mobile Filter Trigger */}
          <div className="flex items-center gap-2">
            <div className="relative group">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-secondary border border-border px-6 py-3 pr-10 text-xs font-bold uppercase tracking-tighter cursor-pointer focus:outline-none hover:border-primary transition-colors"
              >
                <option value="newest">NOUVEAUTÉS</option>
                <option value="price-asc">PRIX CROISSANT</option>
                <option value="price-desc">PRIX DÉCROISSANT</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none" />
            </div>

            <button
              onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
              className="lg:hidden flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-xs font-bold uppercase tracking-tighter hover:opacity-90 transition-opacity"
            >
              <SlidersHorizontal className="w-4 h-4" />
              FILTRES
            </button>
          </div>
        </div>

        {/* Mobile Filter Overlay */}
        <AnimatePresence>
          {isFilterMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden bg-secondary border-t border-border"
            >
              <div className="px-6 py-8 space-y-8">
                <div>
                  <h4 className="text-xs font-mono uppercase text-muted-foreground mb-4">Catégories</h4>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.slug}
                        onClick={() => setActiveCategory(cat.slug)}
                        className={`px-6 py-3 text-xs font-bold uppercase border ${
                          activeCategory === cat.slug
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background text-foreground border-border"
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase text-muted-foreground mb-4">Marques</h4>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setActiveBrand("all")}
                      className={`px-6 py-3 text-xs font-bold uppercase border ${
                        activeBrand === "all"
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background text-foreground border-border"
                      }`}
                    >
                      Toutes
                    </button>
                    {BRANDS.map((brand) => (
                      <button
                        key={brand.slug}
                        onClick={() => setActiveBrand(brand.slug)}
                        className={`px-6 py-3 text-xs font-bold uppercase border ${
                          activeBrand === brand.slug
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background text-foreground border-border"
                        }`}
                      >
                        {brand.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Product Grid */}
      <main className="container mx-auto px-6 py-12">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-border border border-border">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, index) => (
                <div key={product.id} className="bg-background">
                  <ProductCard product={product} cascadeIndex={index} />
                </div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="py-40 flex flex-col items-center justify-center text-center">
            <X className="w-12 h-12 text-muted-foreground mb-6" />
            <h3 className="text-2xl font-bold uppercase tracking-tighter mb-2">
              AUCUN RÉSULTAT
            </h3>
            <p className="text-muted-foreground font-mono text-sm max-w-md uppercase">
              Désolé, nous n'avons trouvé aucun article correspondant à vos critères de recherche.
            </p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setActiveBrand("all");
                setSearchQuery("");
              }}
              className="mt-8 px-8 py-4 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity"
            >
              RÉINITIALISER LES FILTRES
            </button>
          </div>
        )}
      </main>

      {/* Bottom CTA */}
      <section className="border-t border-border py-24 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter mb-8">
            VOUS NE TROUVEZ PAS VOTRE TAILLE ?
          </h2>
          <p className="text-muted-foreground font-mono text-sm uppercase max-w-2xl mx-auto mb-12">
            Notre stock en boutique à Togoudo peut différer. Contactez-nous en direct pour une vérification instantanée ou une commande spéciale.
          </p>
          <a
            href="https://wa.me/22996092439"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 bg-primary text-primary-foreground px-12 py-6 text-sm font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            CONTACTER SUR WHATSAPP
          </a>
        </div>
      </section>
    </div>
  );
}
