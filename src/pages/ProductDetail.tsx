import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  MessageSquare,
  ChevronRight,
  ShieldCheck,
  Truck,
  RefreshCcw,
  ArrowLeft,
  Maximize2,
  Star,
  AlertCircle
} from "lucide-react";
import { useCart } from "@/hooks/useCart";
import {
  PRODUCTS,
  formatPrice,
  ROUTE_PATHS,
  Product
} from "@/lib/index";
import { ProductCard } from "@/components/ProductCard";
import { ScratchBrutal } from "@/components/ScratchBrutal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [activeImage, setActiveImage] = useState<string>("");

  const product = useMemo(() => {
    return PRODUCTS.find((p) => p.id === id);
  }, [id]);

  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      window.scrollTo(0, 0);
    }
  }, [product]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return PRODUCTS.filter(
      (p) => p.category === product.category && p.id !== product.id
    ).slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
        <h1 className="text-4xl font-bold mb-4 font-heading">PRODUIT INTROUVABLE</h1>
        <p className="text-muted-foreground mb-8">Désolé, la pièce que vous recherchez n'existe pas ou a été retirée du drop.</p>
        <Button 
          variant="outline" 
          className="rounded-none border-foreground hover:bg-foreground hover:text-background transition-colors"
          onClick={() => navigate(ROUTE_PATHS.SHOP)}
        >
          RETOURNER À LA BOUTIQUE
        </Button>
      </div>
    );
  }

  const images = [product.image, ...(product.secondaryImage ? [product.secondaryImage] : [])];

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes.length > 0 && product.sizes[0] !== "Unique") {
      toast.error("Veuillez sélectionner une taille", {
        className: "bg-destructive text-destructive-foreground rounded-none",
      });
      return;
    }
    
    const size = product.sizes[0] === "Unique" ? "Unique" : selectedSize;
    addItem(product, size);
    toast.success(`${product.name} ajouté au panier`, {
      className: "bg-foreground text-background rounded-none font-bold",
    });
  };

  const handleWhatsAppOrder = () => {
    const size = product.sizes[0] === "Unique" ? "Unique" : selectedSize;
    const message = `Salut Momozy, je veux commander l'article : ${product.name}${size !== "Unique" ? ` en taille ${size}` : ""}. Est-il disponible ?`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/22996092439?text=${encodedMessage}`, "_blank");
  };

  return (
    <div className="bg-background text-foreground min-h-screen pt-20">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-6 flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
        <Link to={ROUTE_PATHS.HOME} className="hover:text-foreground transition-colors">Accueil</Link>
        <ChevronRight size={12} />
        <Link to={ROUTE_PATHS.SHOP} className="hover:text-foreground transition-colors">Boutique</Link>
        <ChevronRight size={12} />
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="container mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <ScratchBrutal intensity="medium" className="relative aspect-[4/5] bg-muted overflow-hidden border border-border group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={activeImage}
                  alt={product.name}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                {product.isElite && (
                  <Badge className="bg-foreground text-background rounded-none font-bold border-none px-3 py-1">
                    ELITE DROP
                  </Badge>
                )}
                {product.isNew && (
                  <Badge className="bg-primary text-primary-foreground rounded-none font-bold border-none px-3 py-1">
                    NOUVEAU
                  </Badge>
                )}
              </div>
              <button className="absolute bottom-4 right-4 p-3 bg-background/50 backdrop-blur-md border border-white/20 hover:bg-background transition-colors">
                <Maximize2 size={20} />
              </button>
            </ScratchBrutal>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={cn(
                    "aspect-square border transition-all duration-300",
                    activeImage === img ? "border-foreground opacity-100" : "border-border opacity-50 hover:opacity-100 hover:border-muted-foreground"
                  )}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Product Info (Sticky) */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28 space-y-8">
              <div>
                <ScratchBrutal intensity="light" index={0}>
                  <h2 className="text-sm font-mono text-muted-foreground mb-2 uppercase tracking-tighter">
                    {product.brand}
                  </h2>
                </ScratchBrutal>
                <ScratchBrutal intensity="medium" index={1}>
                  <h1 className="text-3xl md:text-5xl font-bold font-heading leading-tight mb-4 uppercase">
                    {product.name}
                  </h1>
                </ScratchBrutal>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-mono font-bold">
                    {formatPrice(product.price)}
                  </span>
                  {product.stockStatus === "low-stock" && (
                    <Badge variant="destructive" className="rounded-none animate-pulse uppercase">
                      Stock Limité
                    </Badge>
                  )}
                  {product.stockStatus === "sold-out" && (
                    <Badge variant="secondary" className="rounded-none uppercase bg-muted text-muted-foreground">
                      Épuisé
                    </Badge>
                  )}
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {/* Size Selection */}
              {product.sizes[0] !== "Unique" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold uppercase tracking-widest">SÉLECTIONNER LA TAILLE</h3>
                    <button className="text-xs underline text-muted-foreground hover:text-foreground">Guide des tailles</button>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        disabled={product.stockStatus === "sold-out"}
                        className={cn(
                          "h-12 border font-mono transition-all flex items-center justify-center",
                          selectedSize === size 
                            ? "bg-foreground text-background border-foreground"
                            : "hover:border-foreground border-border",
                          product.stockStatus === "sold-out" && "opacity-20 cursor-not-allowed"
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col gap-3">
                <Button
                  onClick={handleAddToCart}
                  disabled={product.stockStatus === "sold-out"}
                  className="h-16 rounded-none bg-foreground text-background hover:bg-muted-foreground transition-all text-lg font-bold group"
                >
                  <ShoppingCart className="mr-2 group-hover:translate-x-1 transition-transform" />
                  AJOUTER AU PANIER
                </Button>
                <Button
                  variant="outline"
                  onClick={handleWhatsAppOrder}
                  className="h-16 rounded-none border-foreground text-foreground hover:bg-foreground hover:text-background transition-all text-lg font-bold flex items-center justify-center gap-2"
                >
                  <MessageSquare className="text-[#25D366]" />
                  COMMANDER VIA WHATSAPP
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 py-8 border-y border-border">
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="p-3 bg-muted rounded-none">
                    <Truck size={20} />
                  </div>
                  <span className="text-[10px] font-bold uppercase">Livraison Express</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="p-3 bg-muted rounded-none">
                    <ShieldCheck size={20} />
                  </div>
                  <span className="text-[10px] font-bold uppercase">Qualité Certifiée</span>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="p-3 bg-muted rounded-none">
                    <RefreshCcw size={20} />
                  </div>
                  <span className="text-[10px] font-bold uppercase">Échange 24h</span>
                </div>
              </div>

              {/* Accordion Info */}
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="details" className="border-border">
                  <AccordionTrigger className="text-xs font-bold uppercase tracking-widest">Détails du Produit</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    <ul className="list-disc pl-4 space-y-2">
                      <li>Matière : 100% Coton lourd (Heavyweight)</li>
                      <li>Coupe : Oversize / Boxy fit</li>
                      <li>Origine : Importé (Qualité Premium)</li>
                      <li>Entretien : Lavage à froid pour préserver les graphismes</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="shipping" className="border-border">
                  <AccordionTrigger className="text-xs font-bold uppercase tracking-widest">Livraison & Retours</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    Livraison gratuite à Cotonou et Calavi pour toute commande supérieure à 50.000 CFA. 
                    Pour les autres villes, expédition sécurisée via transporteurs partenaires. 
                    Échange possible sous 24h si la taille ne convient pas.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-32">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-sm font-mono text-muted-foreground uppercase mb-2">VOUS POURRIEZ AUSSI AIMER</h2>
                <h3 className="text-4xl font-bold font-heading uppercase">COMPLÉTEZ VOTRE LOOK</h3>
              </div>
              <Button variant="link" asChild className="hidden md:flex gap-2 text-foreground font-bold">
                <Link to={ROUTE_PATHS.SHOP}>TOUT VOIR <ChevronRight size={16} /></Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p, index) => (
                <ProductCard key={p.id} product={p} index={index} />
              ))}
            </div>
          </section>
        )}

        {/* Back Button Mobile */}
        <div className="mt-12 lg:hidden">
          <Button 
            variant="outline" 
            className="w-full rounded-none border-border" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2" size={16} /> RETOUR
          </Button>
        </div>
      </div>

      {/* Geometric Overlay Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 border border-foreground rotate-12"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] border border-foreground -rotate-6"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-foreground"></div>
      </div>
    </div>
  );
}
