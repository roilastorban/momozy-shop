import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  CreditCard,
  MessageSquare,
  ShieldCheck,
  ArrowLeft,
  ChevronRight,
  Truck,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { formatPrice, ROUTE_PATHS } from '@/lib/index';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

export default function Checkout() {
  const { items, getTotalPrice, checkoutWhatsApp, clearCart } = useCart();
  const navigate = useNavigate();
  const totalPrice = getTotalPrice();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: 'Cotonou',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleClassicPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.phone || !formData.address) {
      toast.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    toast.info("Redirection vers la passerelle de paiement sécurisée...");
    // Mock payment process
    setTimeout(() => {
      toast.success("Commande validée !");
      clearCart();
      navigate(ROUTE_PATHS.HOME);
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4">
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">Votre panier est vide</h1>
        <Button
          onClick={() => navigate(ROUTE_PATHS.SHOP)}
          className="bg-primary text-primary-foreground font-bold px-8 py-4 uppercase tracking-widest"
        >
          Retour à la boutique
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 mb-12">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} /> Retour
          </button>
          <div className="h-[1px] flex-grow bg-border"></div>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 space-y-12">
            <section>
              <h2 className="text-2xl font-bold uppercase mb-8 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-background text-sm">1</span>
                Informations de Livraison
              </h2>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="uppercase font-mono text-xs">Prénom</Label>
                  <Input
                    id="firstName"
                    placeholder="Jean"
                    className="rounded-none border-border bg-card"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="uppercase font-mono text-xs">Nom</Label>
                  <Input
                    id="lastName"
                    placeholder="Koffi"
                    className="rounded-none border-border bg-card"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="phone" className="uppercase font-mono text-xs">Numéro WhatsApp</Label>
                  <Input
                    id="phone"
                    placeholder="+229 96 00 00 00"
                    className="rounded-none border-border bg-card font-mono"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address" className="uppercase font-mono text-xs">Adresse / Quartier</Label>
                  <Input
                    id="address"
                    placeholder="Ex: Fidjrossè, Pavé en face du supermarché..."
                    className="rounded-none border-border bg-card"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city" className="uppercase font-mono text-xs">Ville</Label>
                  <Input
                    id="city"
                    value="Cotonou"
                    disabled
                    className="rounded-none border-border bg-muted opacity-50"
                  />
                </div>
              </form>
            </section>

            <section>
              <h2 className="text-2xl font-bold uppercase mb-8 flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-background text-sm">2</span>
                Mode de Paiement
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* WhatsApp Payment Option */}
                <button
                  onClick={checkoutWhatsApp}
                  className="flex flex-col items-center justify-center p-8 border border-emerald-500/50 bg-emerald-500/5 hover:bg-emerald-500/10 transition-all group"
                >
                  <MessageSquare className="w-12 h-12 text-[#25D366] mb-4 group-hover:scale-110 transition-transform" />
                  <span className="font-bold uppercase tracking-tight mb-2">Payer par WhatsApp</span>
                  <span className="text-[10px] font-mono text-emerald-500/70 uppercase">Finalisez avec un conseiller</span>
                </button>

                {/* Classic Payment Option */}
                <button
                  onClick={handleClassicPayment}
                  className="flex flex-col items-center justify-center p-8 border border-border bg-card hover:border-primary transition-all group"
                >
                  <CreditCard className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <span className="font-bold uppercase tracking-tight mb-2">Paiement Classique</span>
                  <span className="text-[10px] font-mono text-muted-foreground uppercase">MTN / Moov / Visa</span>
                </button>
              </div>
            </section>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-card border border-border p-8 sticky top-32">
              <h2 className="text-2xl font-black uppercase tracking-tighter mb-8 pb-4 border-b border-border">Résumé de Commande</h2>

              <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {items.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}`} className="flex gap-4">
                    <div className="w-16 h-20 bg-muted shrink-0 overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold uppercase leading-tight">{item.name}</h3>
                      <p className="text-[10px] font-mono text-muted-foreground mt-1 uppercase">Taille: {item.selectedSize} × {item.quantity}</p>
                      <p className="text-sm font-mono mt-1">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-sm uppercase tracking-tighter">
                  <span className="text-muted-foreground">Sous-total</span>
                  <span className="font-mono">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm uppercase tracking-tighter">
                  <span className="text-muted-foreground">Livraison</span>
                  <span className="text-emerald-500 font-bold uppercase">Gratuit</span>
                </div>
                <Separator className="bg-border" />
                <div className="flex justify-between text-2xl font-black uppercase tracking-tighter">
                  <span>Total</span>
                  <span className="font-mono">{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 p-4 bg-primary/5 border border-primary/10 rounded-none">
                  <ShieldCheck className="text-primary w-5 h-5 shrink-0" />
                  <p className="text-[10px] font-mono uppercase text-muted-foreground">Paiement 100% sécurisé via passerelle cryptée</p>
                </div>
                <div className="flex items-center gap-3 p-4 bg-muted/50 border border-border rounded-none">
                  <Truck className="text-muted-foreground w-5 h-5 shrink-0" />
                  <p className="text-[10px] font-mono uppercase text-muted-foreground">Livraison prévue sous 24-48h à Cotonou</p>
                </div>
              </div>

              <p className="text-center text-[10px] text-muted-foreground uppercase tracking-widest mt-8">
                MOMOZY SHOP 2026 — L'ÉLITE DU STREETWEAR
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
