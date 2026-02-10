import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatPrice, ROUTE_PATHS } from '@/lib/index';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, updateQuantity, removeItem, getTotalPrice } = useCart();
  const totalPrice = getTotalPrice();
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    navigate(ROUTE_PATHS.CHECKOUT);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-md border-l border-border bg-background/95 shadow-2xl backdrop-blur-md"
          >
            <div className="flex h-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-border p-6">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="h-6 w-6" />
                  <h2 className="font-heading text-xl font-bold uppercase tracking-tighter">
                    Mon Panier
                  </h2>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="h-10 w-10 hover:bg-white hover:text-black"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {/* Content */}
              <ScrollArea className="flex-1 p-6">
                {items.length === 0 ? (
                  <div className="flex h-[60vh] flex-col items-center justify-center space-y-4 text-center">
                    <div className="border border-dashed border-muted-foreground/30 p-8">
                      <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground/50" />
                    </div>
                    <p className="text-muted-foreground uppercase tracking-widest text-sm">
                      Votre panier est vide
                    </p>
                    <Button 
                      onClick={onClose} 
                      className="w-full bg-foreground text-background hover:bg-white hover:text-black font-bold uppercase"
                    >
                      Retour
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {items.map((item) => (
                      <div key={`${item.id}-${item.selectedSize}`} className="group relative flex gap-4 border border-border bg-card p-3 transition-colors hover:border-white">
                        <div className="relative h-24 w-24 shrink-0 overflow-hidden bg-muted">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover grayscale transition-transform duration-500 group-hover:scale-110 group-hover:grayscale-0"
                          />
                        </div>
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="text-sm font-bold uppercase leading-tight tracking-tight">
                                {item.name}
                              </h3>
                              <button
                                onClick={() => removeItem(item.id, item.selectedSize)}
                                className="text-muted-foreground hover:text-destructive transition-colors"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                            <p className="text-xs text-muted-foreground uppercase tracking-tighter mt-1">
                              {item.brand}
                            </p>
                            <p className="mt-1 inline-block border border-border px-2 py-0.5 text-[10px] font-mono">
                              TAILLE: {item.selectedSize}
                            </p>
                          </div>
                          <div className="flex items-end justify-between mt-2">
                            <div className="flex items-center border border-border">
                              <button
                                onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                                className="flex h-8 w-8 items-center justify-center hover:bg-white hover:text-black transition-colors"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="flex h-8 w-8 items-center justify-center font-mono text-sm border-x border-border">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                                className="flex h-8 w-8 items-center justify-center hover:bg-white hover:text-black transition-colors"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <p className="font-mono text-sm font-bold">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t border-border bg-card p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm uppercase tracking-tighter">
                      <span className="text-muted-foreground">Sous-total</span>
                      <span className="font-mono">{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between text-sm uppercase tracking-tighter">
                      <span className="text-muted-foreground">Livraison (Cotonou)</span>
                      <span className="text-emerald-500 font-bold">GRATUIT</span>
                    </div>
                    <Separator className="bg-border" />
                    <div className="flex justify-between text-xl font-bold uppercase tracking-tighter">
                      <span>Total</span>
                      <span className="font-mono">{formatPrice(totalPrice)}</span>
                    </div>
                  </div>

                  <div className="grid gap-3 pt-2">
                    <Button
                      size="lg"
                      onClick={handleCheckout}
                      className="h-14 w-full bg-primary text-primary-foreground hover:bg-foreground hover:text-background border-none flex items-center justify-center gap-3 group"
                    >
                      <CreditCard className="h-5 w-5" />
                      <span className="font-bold tracking-tight uppercase">
                        Payer ma commande
                      </span>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={onClose}
                      className="h-14 w-full border-2 border-foreground hover:bg-foreground hover:text-background transition-all font-bold tracking-tight uppercase"
                    >
                      Continuer mes achats
                    </Button>
                  </div>

                  <p className="text-center text-[10px] text-muted-foreground uppercase tracking-widest">
                    Paiement sécurisé par Mobile Money ou Cash à la livraison
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
