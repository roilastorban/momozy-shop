import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, 
  Menu, 
  X, 
  Search, 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  ChevronRight,
  ArrowUpRight,
  Volume2,
  VolumeX
} from "lucide-react";
import { SiWhatsapp, SiInstagram, SiFacebook } from "react-icons/si";
import { ROUTE_PATHS, CATEGORIES } from "@/lib/index";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils";
import { CartDrawer } from "./CartDrawer";
import { NewsletterPopup } from "./NewsletterPopup";
import { CookieConsent } from "./CookieConsent";
import { ScratchToRevealLoader } from "./ScratchToRevealLoader";

interface LayoutProps {
  children: React.ReactNode;
}

const AUDIO_CONFIG = {
  START_SCROLL: 50,
  END_SCROLL: 1500,
  MAX_VOLUME: 0.15,
  FILE_PATH: "/audio/background.mp3"
};

export default function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSiteRevealed, setIsSiteRevealed] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { getTotalItems } = useCart();
  const location = useLocation();
  const totalItems = getTotalItems();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > AUDIO_CONFIG.START_SCROLL);

      // Dynamic volume based on scroll
      if (audioRef.current && !isMuted) {
        if (scrollY < AUDIO_CONFIG.START_SCROLL) {
          audioRef.current.volume = 0;
        } else {
          // Linear increase from 0 to MAX_VOLUME
          const ratio = Math.min(1, (scrollY - AUDIO_CONFIG.START_SCROLL) / (AUDIO_CONFIG.END_SCROLL - AUDIO_CONFIG.START_SCROLL));
          audioRef.current.volume = ratio * AUDIO_CONFIG.MAX_VOLUME;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMuted]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0;

      // Setup Media Session API
      if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: 'Momozy Vibes',
          artist: 'Momozy Store',
          album: 'Elite Streetwear',
          artwork: [
            { src: '/cover.png', sizes: '512x512', type: 'image/png' },
          ]
        });

        // Add action handlers for better control
        navigator.mediaSession.setActionHandler('play', () => {
          audioRef.current?.play();
          setIsMuted(false);
        });
        navigator.mediaSession.setActionHandler('pause', () => {
          audioRef.current?.pause();
          setIsMuted(true);
        });
      }
    }

    // Attempt to start audio on first interaction if not muted
    const handleFirstInteraction = () => {
      if (audioRef.current && !isMuted) {
        audioRef.current.play().catch(err => console.log("Autoplay blocked", err));
      }
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });
    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [isMuted]);

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play().then(() => {
          // Trigger scroll check to set correct volume immediately after play
          const scrollY = window.scrollY;
          const ratio = Math.max(0, Math.min(1, (scrollY - AUDIO_CONFIG.START_SCROLL) / (AUDIO_CONFIG.END_SCROLL - AUDIO_CONFIG.START_SCROLL)));
          audioRef.current!.volume = ratio * AUDIO_CONFIG.MAX_VOLUME;
        }).catch(err => console.log("Autoplay blocked", err));
        setIsMuted(false);
      } else {
        audioRef.current.pause();
        setIsMuted(true);
      }
    }
  };

  const navLinks = [
    { name: "DROPS", path: ROUTE_PATHS.HOME },
    { name: "BOUTIQUE", path: ROUTE_PATHS.SHOP },
    { name: "MARQUES", path: ROUTE_PATHS.BRANDS },
    { name: "BLOG", path: ROUTE_PATHS.BLOG },
    { name: "MOMOZY GANG", path: ROUTE_PATHS.ABOUT },
    { name: "CONTACT", path: ROUTE_PATHS.CONTACT },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans overflow-x-hidden relative">
      {/* Brutalist Scratch Loader */}
      <ScratchToRevealLoader onComplete={() => {
        setIsSiteRevealed(true);
        // Start audio if not muted when site is revealed
        if (audioRef.current && !isMuted) {
          audioRef.current.play().catch(err => console.log("Autoplay blocked", err));
        }
      }} />

      <div className="fixed top-0 left-0 w-full z-50 pointer-events-none">
        {/* Top Bar Announcement */}
        <div className="w-full bg-black/40 backdrop-blur-md text-white py-2 overflow-hidden border-b border-white/10 pointer-events-auto">
          <motion.div
            animate={{ x: ["100%", "-100%"] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="whitespace-nowrap font-mono text-xs uppercase tracking-[0.2em] font-bold"
          >
            Livraison Express sur Cotonou & Calavi — Commandez via WhatsApp au +229 96 09 24 39 — L'élite du Streetwear au Bénin
          </motion.div>
        </div>

        {/* Header - Fixed & Transparent */}
        <header className="w-full bg-transparent py-6 md:py-8 transition-all duration-300 pointer-events-auto">
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Left: Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => cn(
                  "text-xs font-bold tracking-[0.2em] hover:text-primary transition-colors relative group",
                  isActive ? "text-primary" : "text-white"
                )}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
              </NavLink>
            ))}
          </nav>

          {/* Center: Logo */}
          <Link 
            to={ROUTE_PATHS.HOME} 
            className="flex flex-col items-center group text-white"
          >
            <span className="text-2xl md:text-3xl font-black tracking-tighter leading-none group-hover:scale-105 transition-transform">
              MOMOZY
            </span>
            <span className="text-[10px] font-mono tracking-[0.4em] opacity-60">
              STREETWEAR
            </span>
          </Link>

          {/* Right: Actions */}
          <div className="flex items-center gap-4 md:gap-6 text-white">
            <button
              onClick={toggleMute}
              className="hover:text-primary transition-colors p-2"
              title={isMuted ? "Activer le son" : "Couper le son"}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} className="animate-pulse" />}
            </button>
            <button className="hover:text-primary transition-colors p-2">
              <Search size={20} strokeWidth={2.5} />
            </button>
            <button className="hidden md:block hover:text-primary transition-colors p-2">
              <User size={20} strokeWidth={2.5} />
            </button>
            <button 
              className="relative hover:text-primary transition-colors p-2"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag size={20} strokeWidth={2.5} />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-destructive text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-none border border-background animate-in zoom-in">
                  {totalItems}
                </span>
              )}
            </button>
            <button 
              className="lg:hidden p-2 relative w-8 h-8 flex flex-col justify-between items-end group"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <motion.span
                animate={isMenuOpen ? { rotate: 45, y: 14, width: "100%" } : { rotate: 0, y: 0, width: "100%" }}
                className="w-full h-1 bg-white transition-all"
              />
              <motion.span
                animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-2/3 h-1 bg-white transition-all"
              />
              <motion.span
                animate={isMenuOpen ? { rotate: -45, y: -14, width: "100%" } : { rotate: 0, y: 0, width: "33%" }}
                className="w-1/3 h-1 bg-white transition-all"
              />
            </button>
          </div>
        </div>
      </header>
    </div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-background flex flex-col pt-32 px-6 lg:hidden"
          >
            <button
              className="absolute top-10 right-6 p-4 border border-foreground group hover:bg-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center gap-3 font-black text-xs tracking-tighter group-hover:text-background">
                FERMER <ArrowUpRight className="rotate-45" size={16} />
              </div>
            </button>

            <nav className="flex flex-col gap-6">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <NavLink
                    to={link.path}
                    className={({ isActive }) => cn(
                      "text-4xl font-black tracking-tighter hover:text-primary transition-colors",
                      isActive ? "text-primary" : "text-foreground"
                    )}
                  >
                    {link.name}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto pb-12 grid grid-cols-2 gap-4">
              <div className="border border-border p-4 flex flex-col gap-2">
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Instagram</span>
                <span className="text-sm font-bold">@momozy_shop</span>
              </div>
              <div className="border border-border p-4 flex flex-col gap-2">
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">WhatsApp</span>
                <span className="text-sm font-bold font-mono">+229 96 09 24 39</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow overflow-x-hidden relative">
        {children}
      </main>

      {/* Newsletter Popup */}
      <NewsletterPopup />

      {/* Cookie Consent */}
      <CookieConsent />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-20 pt-20 pb-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            {/* Column 1: Brand */}
            <div className="space-y-6">
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tighter">MOMOZY SHOP</span>
                <span className="text-[10px] font-mono tracking-[0.4em] text-muted-foreground uppercase">Designed for the Elite</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
                Le standard du streetwear premium au Bénin. Nous ne vendons pas seulement des vêtements, nous vendons un statut.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                  <SiInstagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                  <SiFacebook size={18} />
                </a>
                <a href="#" className="w-10 h-10 border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                  <SiWhatsapp size={18} />
                </a>
              </div>
            </div>

            {/* Column 2: Shop */}
            <div className="space-y-6">
              <h4 className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-primary">Collections</h4>
              <ul className="space-y-3">
                {CATEGORIES.filter(c => c.slug !== 'all').map((cat) => (
                  <li key={cat.slug}>
                    <Link to={ROUTE_PATHS.SHOP} className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center group">
                      <ChevronRight size={14} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Help */}
            <div className="space-y-6">
              <h4 className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-primary">Assistance</h4>
              <ul className="space-y-3">
                <li>
                  <Link to={ROUTE_PATHS.GUIDE} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Guide des Tailles</Link>
                </li>
                <li>
                  <Link to={ROUTE_PATHS.DELIVERY} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Livraison & Tarifs</Link>
                </li>
                <li>
                  <Link to={ROUTE_PATHS.FAQ} className="text-sm text-muted-foreground hover:text-foreground transition-colors">FAQ</Link>
                </li>
                <li>
                  <Link to={ROUTE_PATHS.TRACKING} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Suivi de Commande</Link>
                </li>
                <li>
                  <Link to={ROUTE_PATHS.BLOG} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Journal & Blog</Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div className="space-y-6">
              <h4 className="text-xs font-mono font-bold uppercase tracking-[0.3em] text-primary">Boutique Physique</h4>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <MapPin size={18} className="text-primary shrink-0" />
                  <p className="text-sm text-muted-foreground leading-snug">
                    Carrefour Togoudo, avant la station AK Petrolenium, Abomey-Calavi.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Phone size={18} className="text-primary shrink-0" />
                  <p className="text-sm text-muted-foreground font-mono">+229 96 09 24 39</p>
                </div>
                <div className="flex gap-3">
                  <Mail size={18} className="text-primary shrink-0" />
                  <p className="text-sm text-muted-foreground">contact@momozy.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="pt-10 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
              © 2026 MOMOZY SHOP. Tout droits réservés. L'élite de Cotonou.
            </p>
            <div className="flex items-center gap-8">
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Paiements sécurisés:</span>
              <div className="flex gap-4 opacity-50 grayscale hover:grayscale-0 transition-all">
                <span className="text-[10px] font-black border border-border px-2 py-1">MTN</span>
                <span className="text-[10px] font-black border border-border px-2 py-1">MOOV</span>
                <span className="text-[10px] font-black border border-border px-2 py-1">VISA</span>
              </div>
            </div>
          </div>

          {/* Credits */}
          <div className="mt-12 pt-8 border-t border-border/20 text-center">
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.3em]">
              Réalisé par G & G
            </p>
          </div>
        </div>
      </footer>

      {/* Background Music - Street/Funky Hip Hop Beat */}
      <audio
        ref={audioRef}
        src={AUDIO_CONFIG.FILE_PATH}
        loop
        preload="auto"
      />

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/22996092439"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[60] bg-[#25D366] text-white p-4 group transition-all duration-300 hover:scale-110 active:scale-95 shadow-2xl"
      >
        <SiWhatsapp size={24} />
        <span className="absolute right-full mr-4 bg-background border border-border text-foreground px-4 py-2 text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
          Discutez avec nous
          <ArrowUpRight size={12} className="inline-block ml-1" />
        </span>
      </a>
    </div>
  );
}
