import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, ShieldCheck, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * CookieConsent Component
 * A brutalist styled cookie consent banner with glassmorphism effects.
 */
export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after 2 seconds
    const hasConsented = localStorage.getItem("momozy_cookie_consent");
    if (!hasConsented) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("momozy_cookie_consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("momozy_cookie_consent", "declined");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md z-[70]"
        >
          <div className="bg-background/40 backdrop-blur-xl border-2 border-foreground p-6 shadow-[10px_10px_0px_0px_rgba(255,255,255,0.1)] relative overflow-hidden">
            {/* Brutalist accents */}
            <div className="absolute top-0 left-0 w-2 h-2 bg-foreground" />
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-foreground" />

            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4">
                <div className="bg-foreground text-background p-2">
                  <Cookie size={24} strokeWidth={2.5} />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-black uppercase tracking-tighter">DATA ACCESS // COOKIES</h3>
                  <p className="text-xs font-mono text-muted-foreground leading-relaxed uppercase">
                    Nous utilisons des traceurs pour optimiser votre expérience sur le shop. En continuant, vous acceptez notre standard d'élite.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleDecline}
                  className="py-3 border-2 border-foreground font-bold text-[10px] uppercase tracking-widest hover:bg-foreground/10 transition-colors"
                >
                  REFUSER
                </button>
                <button
                  onClick={handleAccept}
                  className="py-3 bg-foreground text-background border-2 border-foreground font-bold text-[10px] uppercase tracking-widest hover:bg-white transition-colors"
                >
                  ACCEPTER
                </button>
              </div>
            </div>

            {/* Subtle scanline effect */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,0.1)_50%,transparent_50%)] bg-[length:100%_4px]" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CookieConsent;
