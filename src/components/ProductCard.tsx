import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Eye, ShoppingBag, ArrowRight } from "lucide-react";
import { Product, ROUTE_PATHS, formatPrice } from "@/lib/index";
import { useCart } from "@/hooks/useCart";
import { ScratchBrutal } from "./ScratchBrutal";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

/**
 * ProductCard Component
 * 
 * Displays a product with:
 * - Image with hover effect (secondary image swap)
 * - Status badges (Elite, New, Sold Out)
 * - Product info (brand, name, price, sizes)
 * - Dual action buttons:
 *   - "Acheter" (Buy/View Details) - navigates to product page
 *   - "Ajouter au panier" (Add to Cart) - direct cart action
 * - Scratch brutal animation on entry
 * - Brutalist geometric design elements
 */
export function ProductCard({ product, className }: ProductCardProps) {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  // Determine product status
  const isSoldOut = product.stockStatus === "sold-out";
  const isLowStock = product.stockStatus === "low-stock";

  /**
   * Handle "Ajouter au panier" (Add to Cart) action
   * - For single-size items (accessories): add directly
   * - For multi-size items: navigate to product detail for size selection
   */
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (product.sizes.length === 1 && product.sizes[0] === "Unique") {
      // Single size - add directly to cart
      addItem(product, "Unique");
    } else {
      // Multiple sizes - navigate to detail page for selection
      navigate(ROUTE_PATHS.PRODUCT_DETAIL.replace(":id", product.id));
    }
  };

  /**
   * Handle "Acheter" (Buy/View Details) action
   * Always navigates to product detail page for full product view
   */
  const handleBuyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(ROUTE_PATHS.PRODUCT_DETAIL.replace(":id", product.id));
  };

  return (
    <ScratchBrutal intensity="light" delay={Math.random() * 5}>
      <motion.div
        className={cn(
          "group relative flex flex-col border border-border bg-background rounded-none transition-all duration-300",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{
          rotate: 0, // Straighten on hover
          scale: 1.02,
          transition: { duration: 0.2 }
        }}
      >
        {/* Status Badges - Top Left Corner */}
        <div className="absolute top-0 left-0 z-20 flex flex-col">
          {/* Elite Member Only Badge */}
          {product.isElite && (
            <div className="bg-foreground text-background px-3 py-1 text-[10px] font-mono font-black uppercase tracking-widest">
              Elite Member Only
            </div>
          )}
          
          {/* New Drop Badge */}
          {product.isNew && (
            <div className="bg-white text-black px-3 py-1 text-[10px] font-mono font-black uppercase tracking-widest border-b border-r border-black">
              Nouveau Drop
            </div>
          )}
          
          {/* Sold Out Badge */}
          {isSoldOut && (
            <div className="bg-destructive text-white px-3 py-1 text-[10px] font-mono font-black uppercase tracking-widest">
              Sold Out
            </div>
          )}
        </div>

        {/* Image Container with Hover Effects */}
        <div className="relative aspect-[4/5] overflow-hidden bg-muted">
          {/* Primary Image Link */}
          <Link 
            to={ROUTE_PATHS.PRODUCT_DETAIL.replace(":id", product.id)}
            className="block w-full h-full cursor-none"
          >
            {/* Primary Image - Fades out on hover if secondary exists */}
            <img
              src={product.image}
              alt={product.name}
              className={cn(
                "w-full h-full object-cover transition-opacity duration-200",
                isHovered && product.secondaryImage ? "opacity-0" : "opacity-100"
              )}
            />
            
            {/* Secondary Image - Fades in on hover */}
            {product.secondaryImage && (
              <img
                src={product.secondaryImage}
                alt={`${product.name} alternate view`}
                className={cn(
                  "absolute inset-0 w-full h-full object-cover transition-opacity duration-200",
                  isHovered ? "opacity-100" : "opacity-0"
                )}
              />
            )}
          </Link>

          {/* Action Buttons - Slide up from bottom on hover */}
          {!isSoldOut && (
            <div className={cn(
              "absolute inset-x-0 bottom-0 flex flex-col gap-2 p-3 bg-gradient-to-t from-black/90 to-transparent",
              "transition-transform duration-200 transform translate-y-full group-hover:translate-y-0"
            )}>
              {/* Primary Button: "Acheter" (Buy/View Details) */}
              <button
                onClick={handleBuyClick}
                className={cn(
                  "w-full py-3 bg-primary text-primary-foreground font-mono text-xs font-bold uppercase tracking-[0.15em]",
                  "flex items-center justify-center gap-2 transition-all duration-150",
                  "hover:bg-white hover:text-black"
                )}
              >
                <span>Acheter</span>
                <ArrowRight className="w-3 h-3" />
              </button>

              {/* Secondary Button: "Ajouter au panier" (Add to Cart) */}
              <button
                onClick={handleAddToCart}
                className={cn(
                  "w-full py-2 border border-white/30 text-white font-mono text-xs font-bold uppercase tracking-[0.15em]",
                  "flex items-center justify-center gap-2 transition-all duration-150",
                  "hover:bg-white/10 hover:border-white"
                )}
              >
                <ShoppingBag className="w-3 h-3" />
                <span>Ajouter au panier</span>
              </button>
            </div>
          )}

          {/* Custom Cursor Indicator on Hover (Desktop only) */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border border-white/20 rounded-none flex items-center justify-center">
              <span className="text-[10px] font-mono text-white tracking-widest">VIEW</span>
            </div>
          </div>
        </div>

        {/* Product Information Section */}
        <div className="p-5 flex flex-col flex-grow border-t border-border">
          {/* Brand and Stock Status */}
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
              {product.brand}
            </span>
            {isLowStock && (
              <span className="text-[9px] font-mono text-destructive font-bold uppercase animate-pulse">
                Stock Limité
              </span>
            )}
          </div>

          {/* Product Name */}
          <Link
            to={ROUTE_PATHS.PRODUCT_DETAIL.replace(":id", product.id)}
            className="text-base font-bold uppercase tracking-tight mb-4 group-hover:text-primary transition-colors leading-tight"
          >
            {product.name}
          </Link>

          {/* Price and Available Sizes */}
          <div className="mt-auto flex items-end justify-between">
            {/* Price Display */}
            <div className="font-mono text-lg font-medium">
              {formatPrice(product.price)}
            </div>
            
            {/* Available Sizes Preview */}
            <div className="flex gap-1">
              {product.sizes.slice(0, 3).map((size) => (
                <span 
                  key={size} 
                  className="text-[9px] font-mono border border-border px-1 py-0.5 opacity-50"
                >
                  {size}
                </span>
              ))}
              {product.sizes.length > 3 && (
                <span className="text-[9px] font-mono opacity-50">+</span>
              )}
            </div>
          </div>
        </div>

        {/* Brutalist Geometric Corner Decorations - Appear on hover */}
        <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-foreground opacity-0 group-hover:opacity-100 transition-all" />
        <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-foreground opacity-0 group-hover:opacity-100 transition-all" />
      </motion.div>
    </ScratchBrutal>
  );
}
