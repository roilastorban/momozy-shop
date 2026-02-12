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
  BLOG: "/blog",
  BLOG_POST: "/blog/:id",
} as const;

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
}

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

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "L'Ascension du Streetwear Brutaliste en Afrique de l'Ouest",
    excerpt: "Comment les silhouettes agressives et les matériaux bruts redéfinissent la mode à Cotonou et au-delà.",
    content: `
      Le paysage de la mode en Afrique de l'Ouest subit une transformation radicale. Fini le temps où le luxe se définissait uniquement par le faste et la brillance. Aujourd'hui, une nouvelle génération de créateurs et de passionnés, menée par des collectifs comme le Momozy Gang, embrasse l'esthétique du brut.

      Le "Scratch Brutal", ce n'est pas seulement un style visuel, c'est une déclaration d'indépendance. Il s'agit de célébrer l'imperfection, la texture du béton, et la force des lignes industrielles. À Cotonou, cette tendance se manifeste par des coupes boxy, des tissus heavyweight et une palette de couleurs dominée par le noir et les gris profonds.

      Pourquoi ce succès ? Parce que le style brutaliste résonne avec la réalité urbaine. Il est résistant, il est honnête, et il impose le respect. Les pièces que nous sélectionnons chez Momozy Shop ne sont pas de simples vêtements ; ce sont des armures modernes pour l'élite urbaine qui navigue dans la jungle de Calavi et de Cotonou.
    `,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop",
    date: "12 Mars 2026",
    author: "Momozy Editor",
    category: "Tendances",
    readTime: "5 min"
  },
  {
    id: "2",
    title: "Guide : Comment Porter l'Oversize sans se Perdre",
    excerpt: "Les secrets pour maîtriser les volumes et les proportions de vos hoodies et t-shirts cette saison.",
    content: `
      L'oversize est partout, mais le maîtriser demande de la précision. Porter du large ne signifie pas porter du mal ajusté. Voici les règles d'or du Momozy Gang pour dominer le volume :

      1. La Règle de l'Équilibre : Si votre haut est massif (comme nos hoodies Fear of God), essayez de structurer le bas avec un pantalon cargo aux chevilles resserrées ou un denim plus fitté.
      2. La Matière est la Clé : Un t-shirt oversize doit avoir de la tenue. Cherchez du coton lourd (au moins 240 GSM) pour que la silhouette reste structurée et ne s'affaisse pas.
      3. Accessoirisez avec Force : Les volumes larges appellent des accessoires marquants. Une casquette signature ou des sneakers massives comme les Triple S équilibrent la silhouette.

      L'objectif est de créer une impression de puissance, pas de négligence. Explorez notre collection 'Hauts' pour trouver les pièces de base de votre garde-robe oversize.
    `,
    image: "https://images.unsplash.com/photo-1554568218-0f1715e72254?q=80&w=1000&auto=format&fit=crop",
    date: "08 Mars 2026",
    author: "Style Guru",
    category: "Guide",
    readTime: "4 min"
  },
  {
    id: "3",
    title: "Sneaker Culture : Pourquoi la Triple S reste une Icône",
    excerpt: "Analyse d'une chaussure qui a divisé l'opinion avant de conquérir le monde du luxe déstructuré.",
    content: `
      Quand Balenciaga a lancé la Triple S, le monde de la mode a été secoué. Trop grosse, trop étrange, trop "chaussure de papa". Et pourtant, quelques années plus tard, elle reste la référence absolue du luxe déstructuré.

      Ce qui rend la Triple S spéciale, c'est son audace. Elle a brisé les codes de la sneaker fine pour imposer une vision architecturale du pied. Dans nos rues de Cotonou, elle est devenue le symbole ultime de ceux qui osent. Sa semelle multicouche n'est pas qu'un gadget design ; c'est une prouesse technique qui offre une stature et une présence inégalées.

      Dans ce numéro, nous explorons comment l'intégrer dans un look 'Elite' sans en faire trop. Spoiler : la sobriété du reste de la tenue est votre meilleure alliée.
    `,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop",
    date: "01 Mars 2026",
    author: "Kick Hunter",
    category: "Culture",
    readTime: "6 min"
  }
];

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
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1000&auto=format&fit=crop",
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
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop",
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
