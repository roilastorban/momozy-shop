import { motion } from "framer-motion";
import { IMAGES } from "@/assets/images";
import { ROUTE_PATHS } from "@/lib/index.ts";
import { Shield, Users, Zap, MapPin, Phone, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { ScratchBrutal } from "@/components/ScratchBrutal";
import { GrayscaleImage } from "@/components/GrayscaleImage";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] } },
};

export default function About() {
  return (
    <div className="bg-background text-foreground min-h-screen pt-24 pb-12 overflow-hidden">
      {/* Hero Section - Brutalist Typography */}
      <section className="container mx-auto px-4 mb-24 relative">
        <div className="absolute -top-12 -left-12 w-64 h-64 border-l border-t border-border/30 z-0" />
        <div className="relative z-10">
          <ScratchBrutal intensity="light" index={0}>
            <span className="font-mono text-xs tracking-widest uppercase text-muted-foreground mb-4 block">
              Établi en 2024 • Bénin
            </span>
          </ScratchBrutal>
          <ScratchBrutal intensity="brutal" index={1}>
            <h1 className="text-6xl md:text-9xl font-extrabold font-heading leading-none tracking-tighter mb-8">
              MOMOZY <br /> SHOP
            </h1>
          </ScratchBrutal>
          <ScratchBrutal intensity="medium" index={2}>
            <p className="text-xl md:text-2xl font-light max-w-2xl leading-relaxed text-muted-foreground">
              L'épicentre du Streetwear Premium au Bénin. Nous ne vendons pas des vêtements, nous définissons des standards.
            </p>
          </ScratchBrutal>
        </div>
        <div className="absolute bottom-0 right-0 w-1/2 aspect-square z-0 opacity-10">
          <img src={IMAGES.GEOMETRIC_BRUTALIST_1} alt="Geometric Design" className="w-full h-full object-cover grayscale" />
        </div>
      </section>

      {/* Story Section - Image Left Text Right Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 border-t border-border">
        <div className="aspect-[4/5] md:aspect-auto border-r border-border overflow-hidden">
          <GrayscaleImage
            src={IMAGES.URBAN_STYLE_1}
            alt="Momozy Vision"
            className="w-full h-full object-cover hover:scale-105"
          />
        </div>
        <div className="flex flex-col justify-center p-8 md:p-20 bg-card">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 variants={itemVariants} className="text-4xl font-bold font-heading mb-8 uppercase tracking-tight">
              Notre Genèse
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg leading-relaxed text-muted-foreground mb-6">
              Né de l'asphalte de Cotonou, MOMOZY SHOP a été fondé avec une vision claire : combler le fossé entre la haute couture urbaine mondiale et l'élite béninoise. 
            </motion.p>
            <motion.p variants={itemVariants} className="text-lg leading-relaxed text-muted-foreground mb-10">
              Chaque pièce de notre catalogue est sélectionnée pour sa force graphique, sa qualité de fabrication et son exclusivité. Nous croyons que le vêtement est l'armure de l'homme moderne.
            </motion.p>
            <motion.div variants={itemVariants}>
              <Link 
                to={ROUTE_PATHS.SHOP} 
                className="inline-block px-10 py-4 bg-primary text-primary-foreground font-bold hover:bg-white hover:text-black transition-colors duration-200 border border-transparent"
              >
                VOIR LA COLLECTION
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values - Geometric Blocks */}
      <section className="container mx-auto px-4 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <h2 className="text-5xl font-bold font-heading uppercase">Le Code d'Honneur</h2>
          <div className="h-[1px] flex-grow bg-border mx-8 hidden md:block"></div>
          <span className="font-mono text-muted-foreground">003 / VALEURS</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-border">
          {[ 
            { icon: Shield, title: "EXCLUSIVITÉ", desc: "Nous ne suivons pas les tendances, nous les imposons. Drops limités uniquement." },
            { icon: Zap, title: "ÉNERGIE", desc: "Inspiré par le dynamisme brut de Cotonou et les codes de New York." },
            { icon: Users, title: "LE GANG", desc: "Une communauté d'élite validée par les plus grands artistes du pays." }
          ].map((val, idx) => (
            <ScratchBrutal key={idx} intensity="medium" index={idx}>
              <div className="h-full p-12 border-b md:border-b-0 md:border-r last:border-r-0 border-border hover:bg-white/5 transition-colors group">
                <val.icon className="w-12 h-12 mb-8 text-primary group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold mb-4 font-heading">{val.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{val.desc}</p>
              </div>
            </ScratchBrutal>
          ))}
        </div>
      </section>

      {/* Showroom Location - Brutalist Map/Info */}
      <section className="bg-card text-foreground py-24 border-y border-border">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-6xl md:text-8xl font-black font-heading tracking-tighter mb-8 uppercase">
              DANS LE <br /> REEL.
            </h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 mt-1 text-primary" />
                <div>
                  <p className="font-bold uppercase text-xl">Boutique Physique</p>
                  <p className="text-lg text-muted-foreground">Carrefour Togoudo, avant la station AK Petrolenium. Abomey-Calavi, Bénin.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 mt-1 text-primary" />
                <div>
                  <p className="font-bold uppercase text-xl">Support WhatsApp</p>
                  <p className="text-lg text-muted-foreground">+229 96 09 24 39</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Instagram className="w-6 h-6 mt-1 text-primary" />
                <div>
                  <p className="font-bold uppercase text-xl">Instagram</p>
                  <p className="text-lg text-muted-foreground">@momozyshop_official</p>
                </div>
              </div>
            </div>
            <div className="mt-12">
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                rel="noreferrer"
                className="inline-block border-2 border-primary px-12 py-5 font-black uppercase hover:bg-primary hover:text-primary-foreground transition-all"
              >
                Nous trouver sur Maps
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 border-2 border-border z-0" />
            <img 
              src={IMAGES.URBAN_STYLE_5} 
              alt="Momozy Store Interior" 
              className="relative z-10 w-full h-[600px] object-cover grayscale"
            />
          </div>
        </div>
      </section>

      {/* Team / Elite Gang Section */}
      <section className="container mx-auto px-4 py-24">
        <h2 className="text-4xl font-bold font-heading mb-16 uppercase text-center tracking-widest">Le Momozy Gang</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[ 
            { name: "Momozy", role: "Founder & Curator", img: IMAGES.FASHION_MODEL_1 },
            { name: "Tranquillin", role: "Elite Ambassador", img: IMAGES.FASHION_MODEL_2 },
            { name: "X-Time", role: "Elite Ambassador", img: IMAGES.FASHION_MODEL_3 },
            { name: "Amir", role: "Style Consultant", img: IMAGES.FASHION_MODEL_4 }
          ].map((member, i) => (
            <ScratchBrutal key={i} intensity="medium" index={i}>
              <div className="group">
                <div className="aspect-[3/4] overflow-hidden mb-4">
                  <GrayscaleImage src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-110" />
                </div>
                <h4 className="font-bold text-xl uppercase">{member.name}</h4>
                <p className="text-muted-foreground font-mono text-sm">{member.role}</p>
              </div>
            </ScratchBrutal>
          ))}
        </div>
      </section>

      {/* Footer Branding */}
      <section className="py-12 border-t border-border">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-muted-foreground font-mono text-sm uppercase">
            © 2026 MOMOZY SHOP. Designed for the Elite.
          </p>
          <div className="flex gap-8">
            <Link to={ROUTE_PATHS.HOME} className="hover:text-primary transition-colors uppercase font-bold text-sm">Accueil</Link>
            <Link to={ROUTE_PATHS.SHOP} className="hover:text-primary transition-colors uppercase font-bold text-sm">Boutique</Link>
            <Link to={ROUTE_PATHS.CONTACT} className="hover:text-primary transition-colors uppercase font-bold text-sm">Contact</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
