import { IMAGES } from "@/assets/images";

export const ROUTE_PATHS = {
  HOME: "/",
  SHOP: "/boutique",
  PRODUCT_DETAIL: "/produit/:id",
  BRANDS: "/marques",
  ABOUT: "/a-propos",
  CONTACT: "/contact",
  GUIDE: "/guide",
  DELIVERY: "/livraison",
  FAQ: "/faq",
  CHECKOUT: "/checkout",
  TRACKING: "/suivi",
} as const;

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: string;
  image: string;
  secondaryImage?: string;
  description: string;
  sizes: string[];
  stockStatus: 'in-stock' | 'low-stock' | 'sold-out';
  isNew?: boolean;
  isElite?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

export const CATEGORIES = [
  { name: "Tous", slug: "all" },
  { name: "Ensembles", slug: "ensembles" },
  { name: "Hauts", slug: "hauts" },
  { name: "Bas", slug: "bas" },
  { name: "Sneakers", slug: "sneakers" },
  { name: "Accessoires", slug: "accessoires" },
] as const;

export const BRANDS = [
  { name: "Balenciaga", slug: "balenciaga" },
  { name: "Off-White", slug: "off-white" },
  { name: "Stone Island", slug: "stone-island" },
  { name: "Fear of God", slug: "fear-of-god" },
  { name: "Enfants Riches Déprimés", slug: "enfants-riches-deprimes" },
  { name: "Saint Vanity", slug: "saint-vanity" },
  { name: "Diesel", slug: "diesel" },
] as const;

export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Ensemble Cargo 'JAPAN 03' Edition Limitée",
    brand: "Momozy Selection",
    price: 18500,
    category: "ensembles",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1000&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1000&auto=format&fit=crop&blur=50",
    description: "L'uniforme de l'élite urbaine. Notre ensemble 'JAPAN 03' combine une coupe structurée et un confort absolu. Conçu pour ceux qui dominent la ville, de jour comme de nuit. Coton lourd 450 GSM, finitions tactiques et exclusivité garantie.",
    sizes: ["S", "M", "L", "XL"],
    stockStatus: "low-stock",
    isNew: true,
    isElite: true,
  },
  {
    id: "2",
    name: "T-Shirt Oversize 'Belgium' Graphic",
    brand: "Off-White",
    price: 22000,
    category: "hauts",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop",
    secondaryImage: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop&blur=50",
    description: "L'esthétique brutaliste signée Off-White. Ce t-shirt oversize arbore un graphique 'Belgium' haute densité, véritable manifeste de style urbain contemporain. Coupe boxy, coton premium et authenticité certifiée par le Momozy Gang.",
    sizes: ["M", "L", "XL", "XXL"],
    stockStatus: "in-stock",
  },
  {
    id: "3",
    name: "Pantalon Cargo Heavyweight Black",
    brand: "Stone Island",
    price: 35000,
    category: "bas",
    image: "https://images.unsplash.com/photo-1624372927414-039f7236573c?q=80&w=1000&auto=format&fit=crop",
    description: "Ingénierie textile de pointe. Ce cargo Stone Island en coton lourd offre une résistance aux éléments sans compromis sur le style. Poches cargo asymétriques et badge amovible iconique sur la jambe gauche.",
    sizes: ["S", "M", "L"],
    stockStatus: "in-stock",
    isElite: true,
  },
  {
    id: "4",
    name: "Sneakers 'Triple S' Neon Accent",
    brand: "Balenciaga",
    price: 145000,
    category: "sneakers",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop",
    description: "Le sommet du luxe déstructuré. La Triple S de Balenciaga redéfinit la silhouette urbaine avec sa semelle multicouche complexe et ses accents néon agressifs. Une pièce de collection pour ceux qui ne craignent pas d'être vus.",
    sizes: ["40", "41", "42", "43", "44", "45"],
    stockStatus: "in-stock",
    isNew: true,
  },
  {
    id: "5",
    name: "Hoodie 'Essential' Fear of God",
    brand: "Fear of God",
    price: 45000,
    category: "hauts",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop",
    description: "Le minimalisme élevé au rang d'art. Le Hoodie Essential de Jerry Lorenzo offre une coupe parfaite et une texture inégalée. Conçu pour le layering ou porté seul pour un statement sobre mais puissant.",
    sizes: ["S", "M", "L", "XL"],
    stockStatus: "low-stock",
  },
  {
    id: "6",
    name: "Veste en Denim Déstructuré",
    brand: "Diesel",
    price: 55000,
    category: "hauts",
    image: "https://images.unsplash.com/photo-1576905341935-422bc79d2a9d?q=80&w=1000&auto=format&fit=crop",
    description: "Brut et authentique. Cette veste Diesel explore les limites du denim avec un travail manuel sur les usures et les délavages. Chaque pièce raconte une histoire différente. Boutons métalliques gravés au laser.",
    sizes: ["M", "L", "XL"],
    stockStatus: "in-stock",
  },
  {
    id: "7",
    name: "Short Cargo 'Elite' Desert Camo",
    brand: "Saint Vanity",
    price: 25000,
    category: "bas",
    image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=1000&auto=format&fit=crop",
    description: "Inspiré par les théâtres d'opérations urbains. Ce short cargo Saint Vanity propose une esthétique militaire raffinée. Multiples poches sécurisées et sangles de compression pour un look tactique 'Elite'.",
    sizes: ["S", "M", "L"],
    stockStatus: "sold-out",
  },
  {
    id: "8",
    name: "Casquette 'Momozy Gang' Signature",
    brand: "Momozy Selection",
    price: 12000,
    category: "accessoires",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=1000&auto=format&fit=crop",
    description: "Le sceau d'appartenance au Gang. Notre casquette signature avec broderie 3D haute définition. Fermeture ajustable premium pour un maintien parfait. Indispensable pour valider votre statut.",
    sizes: ["Unique"],
    stockStatus: "in-stock",
    isElite: true,
  }
];

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'XOF',
    minimumFractionDigits: 0,
  }).format(price).replace('XOF', 'CFA');
};
