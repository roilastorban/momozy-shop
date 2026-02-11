import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Zap } from "lucide-react";
import { ScratchBrutal } from "./ScratchBrutal";
import { Button } from "./ui/button";

/**
 * NewsletterPopup Component
 * A brutalist styled popup that appears after a delay.
 * Offers a discount for joining the "Momozy Gang".
 */
export function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Show popup after 5 seconds on every page load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Removed localStorage dismissal to allow it to reappear on next load/refresh
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // In a real app, send email to API
    setTimeout(() => {
      handleClose();
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            initial={{ scale: 0.8, rotate: -5, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.8, rotate: 5, opacity: 0 }}
            transition={{ type: "spring", damping: 15, stiffness: 100 }}
            className="relative w-full max-w-lg bg-background border-4 border-foreground p-8 md:p-12 shadow-[20px_20px_0px_0px_rgba(255,255,255,0.1)]"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute -top-4 -right-4 bg-primary text-primary-foreground p-2 border-2 border-foreground hover:bg-foreground hover:text-background transition-colors"
            >
              <X size={24} strokeWidth={3} />
            </button>

            {!isSubmitted ? (
              <div className="flex flex-col gap-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-3 py-1 text-xs font-black uppercase tracking-widest">
                    <Zap size={14} fill="currentColor" /> EXCLUSIF
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
                    -15% SUR TON PREMIER DROP.
                  </h2>
                  <p className="text-muted-foreground font-mono text-sm">
                    Rejoins l'élite. Reçois les codes secrets et les accès anticipés aux collections limitées.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="relative">
                    <input
                      type="email"
                      required
                      placeholder="TON_EMAIL@ELITE.COM"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white/5 border-2 border-border p-4 font-mono text-sm focus:border-primary outline-none transition-colors uppercase"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-16 bg-foreground text-background font-black text-lg uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all rounded-none border-2 border-foreground group"
                  >
                    ACCÉDER AU GANG
                    <ArrowRight size={20} className="ml-2 transition-transform group-hover:translate-x-2" />
                  </Button>
                </form>

                <p className="text-[10px] text-center font-mono text-muted-foreground uppercase">
                  Pas de spam. Juste du brut. Désinscris-toi quand tu veux.
                </p>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8 space-y-4"
              >
                <div className="text-6xl mb-4">🤘</div>
                <h3 className="text-3xl font-black uppercase tracking-tighter">BIENVENU DANS LE GANG.</h3>
                <p className="font-mono text-primary font-bold">VÉRIFIE TES MAILS POUR TON CODE -15%</p>
              </motion.div>
            )}

            {/* Decorative elements */}
            <div className="absolute -bottom-2 -left-2 w-12 h-12 border-l-2 border-b-2 border-primary pointer-events-none" />
            <div className="absolute top-1/2 -left-4 -translate-y-1/2 w-8 h-px bg-primary opacity-50" />
            <div className="absolute top-1/2 -right-4 -translate-y-1/2 w-8 h-px bg-primary opacity-50" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
