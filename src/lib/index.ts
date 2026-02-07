import { IMAGES } from "@/assets/images";

export const ROUTE_PATHS = {
  HOME: "/",
  SHOP: "/boutique",
  PRODUCT_DETAIL: "/produit/:id",
  BRANDS: "/marques",
  ABOUT: "/a-propos",
  CONTACT: "/contact",
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
    image: IMAGES.STREETWEAR_CLOTHING_1,
    secondaryImage: IMAGES.STREETWEAR_CLOTHING_4,
    description: "Porté par l'élite, conçu pour la rue. Cet ensemble n'est pas qu'un vêtement, c'est une armure de style. Coton premium ultra-confortable pour affronter la ville avec assurance.",
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
    image: IMAGES.STREETWEAR_CLOTHING_2,
    secondaryImage: IMAGES.STREETWEAR_CLOTHING_5,
    description: "Coupe boxy iconique avec imprimé haute densité. Une pièce maîtresse pour tout collectionneur de streetwear premium.",
    sizes: ["M", "L", "XL", "XXL"],
    stockStatus: "in-stock",
  },
  {
    id: "3",
    name: "Pantalon Cargo Heavyweight Black",
    brand: "Stone Island",
    price: 35000,
    category: "bas",
    image: IMAGES.STREETWEAR_CLOTHING_3,
    description: "Matière technique résistante aux intempéries. Patch amovible sur la jambe gauche. Le standard de la fonctionnalité urbaine.",
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
    image: IMAGES.URBAN_STYLE_4,
    description: "L'icône du luxe brut. Semelle multicouche complexe et design agressif. Pour ceux qui ne veulent pas passer inaperçus.",
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
    image: IMAGES.STREETWEAR_CLOTHING_6,
    description: "Minimalisme pur. Coton lourd gratté pour un confort thermique optimal. Logo discret sur la poitrine.",
    sizes: ["S", "M", "L", "XL"],
    stockStatus: "low-stock",
  },
  {
    id: "6",
    name: "Veste en Denim Déstructuré",
    brand: "Diesel",
    price: 55000,
    category: "hauts",
    image: IMAGES.STREETWEAR_CLOTHING_7,
    description: "Effet vintage travaillé à la main. Chaque pièce est unique. Boutons métalliques gravés.",
    sizes: ["M", "L", "XL"],
    stockStatus: "in-stock",
  },
  {
    id: "7",
    name: "Short Cargo 'Elite' Desert Camo",
    brand: "Saint Vanity",
    price: 25000,
    category: "bas",
    image: IMAGES.STREETWEAR_CLOTHING_8,
    description: "Inspiré par l'esthétique militaire urbaine. Poches multiples et sangles ajustables.",
    sizes: ["S", "M", "L"],
    stockStatus: "sold-out",
  },
  {
    id: "8",
    name: "Casquette 'Momozy Gang' Signature",
    brand: "Momozy Selection",
    price: 12000,
    category: "accessoires",
    image: IMAGES.STREETWEAR_CLOTHING_9,
    description: "Broderie 3D haute précision. Fermeture ajustable. L'accessoire final pour valider le look.",
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
