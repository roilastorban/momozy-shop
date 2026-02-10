import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Package, Truck, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScratchBrutal } from '@/components/ScratchBrutal';

export default function OrderTracking() {
  const [orderId, setOrderId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [orderStatus, setOrderStatus] = useState<null | 'found'>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId) return;

    setIsSearching(true);
    // Mock tracking search
    setTimeout(() => {
      setIsSearching(false);
      setOrderStatus('found');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <ScratchBrutal intensity="brutal" index={0}>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-8">
            Suivi de <br /><span className="text-primary">Commande</span>
          </h1>
        </ScratchBrutal>

        <ScratchBrutal intensity="medium" index={1} className="mb-16">
          <p className="text-xl text-muted-foreground uppercase font-mono max-w-2xl">
            Entrez votre numéro de commande pour localiser vos pièces en temps réel. Le Gang s'occupe de tout.
          </p>
        </ScratchBrutal>

        <div className="bg-card border border-border p-8 md:p-12 mb-12">
          <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <Input
                placeholder="NUMÉRO DE COMMANDE (EX: MMZ-2026-XXXX)"
                className="pl-12 py-8 rounded-none border-border bg-background font-mono uppercase"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              disabled={isSearching}
              className="bg-primary text-primary-foreground font-black px-12 py-8 uppercase tracking-widest hover:bg-white hover:text-black transition-all"
            >
              {isSearching ? "Recherche..." : "Tracer"}
            </Button>
          </form>
        </div>

        {orderStatus === 'found' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { step: "Confirmé", icon: CheckCircle2, active: true },
                { step: "Préparation", icon: Package, active: true },
                { step: "En Route", icon: Truck, active: true },
                { step: "Livré", icon: CheckCircle2, active: false },
              ].map((s, i) => (
                <div key={i} className={`p-6 border ${s.active ? 'border-primary bg-primary/5' : 'border-border opacity-30'} flex flex-col items-center gap-4 text-center`}>
                  <s.icon size={32} className={s.active ? 'text-primary' : 'text-muted-foreground'} />
                  <span className="font-bold uppercase text-xs tracking-widest">{s.step}</span>
                </div>
              ))}
            </div>

            <div className="bg-card border border-border p-8">
              <div className="flex flex-col md:flex-row justify-between gap-8">
                <div>
                  <h3 className="text-xs font-mono text-muted-foreground uppercase mb-2">Dernière Mise à Jour</h3>
                  <p className="text-lg font-bold uppercase">Colis remis au transporteur à Cotonou</p>
                  <p className="text-sm text-muted-foreground font-mono">14 Février 2026 - 10:45</p>
                </div>
                <div>
                  <h3 className="text-xs font-mono text-muted-foreground uppercase mb-2">Estimation Livraison</h3>
                  <p className="text-2xl font-black text-primary uppercase">Aujourd'hui</p>
                  <p className="text-sm text-muted-foreground uppercase">Avant 18h00</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div className="mt-20 border-t border-border pt-12 text-center">
          <h2 className="text-2xl font-bold uppercase mb-6">Un problème avec votre colis ?</h2>
          <a
            href="https://wa.me/22996092439"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-primary font-black uppercase tracking-widest hover:underline"
          >
            Contacter le Support WhatsApp <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </div>
  );
}
