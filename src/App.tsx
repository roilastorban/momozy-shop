import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import ProductDetail from "@/pages/ProductDetail";
import BrandsPage from "@/pages/Brands";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
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
 */
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner position="bottom-right" theme="dark" />
        <BrowserRouter>
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

              {/* Catch-all - Redirection vers l'accueil pour le brutalisme sans erreur */}
              <Route path="*" element={<Home />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
