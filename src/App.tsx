import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import ProductDetail from "@/pages/ProductDetail";
import BrandsPage from "@/pages/Brands";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Guide from "@/pages/Guide";
import Delivery from "@/pages/Delivery";
import FAQ from "@/pages/FAQ";
import Checkout from "@/pages/Checkout";
import OrderTracking from "@/pages/Tracking";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import { ROUTE_PATHS } from "@/lib/index";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

/**
 * MOMOZY SHOP - L'épicentre du Streetwear Premium au Bénin
 * Root application component handling routing and global providers.
 * Designed with a brutalist, high-contrast aesthetic inspired by elite urban culture.
 * 
 * Routes:
 * - HOME: Landing page with hero and featured products
 * - SHOP: Product catalog with filtering and search
 * - PRODUCT_DETAIL: Individual product page with images, details, and purchase options
 * - BRANDS: Featured brands and collections
 * - ABOUT: Company story and mission
 * - CONTACT: Contact form and support information
 * - GUIDE: Size guide and garment care instructions
 * - DELIVERY: Shipping zones, costs, and payment methods
 * - FAQ: Frequently asked questions and support
 */
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner position="bottom-right" theme="dark" />
        <HashRouter>
          <Layout>
            <Routes>
              {/* Accueil - La Vitrine d'Influence */}
              <Route path={ROUTE_PATHS.HOME} element={<Home />} />
              
              {/* Boutique - Le Catalogue Infinite Grid */}
              <Route path={ROUTE_PATHS.SHOP} element={<Shop />} />
              
              {/* Détail Produit - Le Showroom Interactif */}
              <Route path={ROUTE_PATHS.PRODUCT_DETAIL} element={<ProductDetail />} />
              
              {/* Marques - Focus sur l'Élite */}
              <Route path={ROUTE_PATHS.BRANDS} element={<BrandsPage />} />
              
              {/* À Propos - L'Histoire de Momozy */}
              <Route path={ROUTE_PATHS.ABOUT} element={<About />} />
              
              {/* Contact - Support Direct & WhatsApp */}
              <Route path={ROUTE_PATHS.CONTACT} element={<Contact />} />

              {/* Guide - Tailles et Entretien des Vêtements */}
              <Route path={ROUTE_PATHS.GUIDE} element={<Guide />} />
              
              {/* Livraison - Zones, Tarifs et Modes de Paiement */}
              <Route path={ROUTE_PATHS.DELIVERY} element={<Delivery />} />
              
              {/* FAQ - Questions Fréquentes et Support */}
              <Route path={ROUTE_PATHS.FAQ} element={<FAQ />} />

              {/* Checkout - Finalisation de commande */}
              <Route path={ROUTE_PATHS.CHECKOUT} element={<Checkout />} />

              {/* Suivi - Suivi de commande en temps réel */}
              <Route path={ROUTE_PATHS.TRACKING} element={<OrderTracking />} />

              {/* Blog - Le Journal du Gang */}
              <Route path={ROUTE_PATHS.BLOG} element={<Blog />} />
              <Route path={ROUTE_PATHS.BLOG_POST} element={<BlogPost />} />

              {/* Catch-all - Redirection vers l'accueil pour le brutalisme sans erreur */}
              <Route path="*" element={<Home />} />
            </Routes>
          </Layout>
        </HashRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
