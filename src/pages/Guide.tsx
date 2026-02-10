import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ChevronRight, Ruler, Shirt, Zap } from "lucide-react";
import { ScratchBrutal } from "@/components/ScratchBrutal";

/**
 * Guide Page - Size Guide & Product Information
 * Provides comprehensive sizing information and product care instructions
 * Helps customers make informed purchasing decisions
 */
export default function Guide() {
  const sizeGuides = [
    {
      category: "Hauts (T-Shirts, Hoodies)",
      sizes: [
        { size: "XS", chest: "32-34\"", length: "26\"" },
        { size: "S", chest: "34-36\"", length: "27\"" },
        { size: "M", chest: "38-40\"", length: "28\"" },
        { size: "L", chest: "42-44\"", length: "29\"" },
        { size: "XL", chest: "46-48\"", length: "30\"" },
        { size: "XXL", chest: "50-52\"", length: "31\"" },
      ],
    },
    {
      category: "Bas (Pantalons, Shorts)",
      sizes: [
        { size: "XS", waist: "28\"", inseam: "28\"" },
        { size: "S", waist: "30\"", inseam: "29\"" },
        { size: "M", waist: "32\"", inseam: "30\"" },
        { size: "L", waist: "34\"", inseam: "31\"" },
        { size: "XL", waist: "36\"", inseam: "32\"" },
      ],
    },
    {
      category: "Sneakers",
      sizes: [
        { size: "40", eu: "40", us: "7" },
        { size: "41", eu: "41", us: "8" },
        { size: "42", eu: "42", us: "9" },
        { size: "43", eu: "43", us: "10" },
        { size: "44", eu: "44", us: "11" },
        { size: "45", eu: "45", us: "12" },
      ],
    },
  ];

  const careInstructions = [
    {
      title: "Lavage",
      description: "Lavez à l'eau froide (max 30°C) avec des couleurs similaires. Utilisez un détergent doux.",
      icon: <Zap className="w-6 h-6" />,
    },
    {
      title: "Séchage",
      description: "Séchez à l'air libre. Évitez le sèche-linge pour préserver la qualité du tissu.",
      icon: <Zap className="w-6 h-6" />,
    },
    {
      title: "Repassage",
      description: "Repassez à basse température si nécessaire. Évitez les impressions directes.",
      icon: <Zap className="w-6 h-6" />,
    },
    {
      title: "Stockage",
      description: "Rangez dans un endroit sec et frais. Utilisez des cintres pour les vêtements délicats.",
      icon: <Zap className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pt-20 pb-20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-20">
        <div className="max-w-3xl">
          <ScratchBrutal intensity="brutal" index={0}>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 uppercase">
              GUIDE DES TAILLES
            </h1>
          </ScratchBrutal>
          <ScratchBrutal intensity="medium" index={1}>
            <p className="text-lg text-muted-foreground mb-8 uppercase font-mono">
              Trouvez votre taille parfaite avec nos guides détaillés. Tous nos produits sont conçus pour l'élite du streetwear.
            </p>
          </ScratchBrutal>
        </div>
      </section>

      {/* Size Guides */}
      <section className="container mx-auto px-4 mb-20">
        <div className="space-y-12">
          {sizeGuides.map((guide, idx) => (
            <div key={guide.category}>
              <ScratchBrutal intensity="light" index={idx}>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Ruler className="w-6 h-6 text-primary" />
                {guide.category}
              </h2>
              <div className="overflow-x-auto border border-border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-card">
                      {Object.keys(guide.sizes[0]).map((key) => (
                        <th
                          key={key}
                          className="px-6 py-4 text-left text-xs font-mono font-bold uppercase tracking-widest text-primary"
                        >
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {guide.sizes.map((row, rowIdx) => (
                      <tr
                        key={rowIdx}
                        className="border-b border-border/50 hover:bg-card/50 transition-colors"
                      >
                        {Object.values(row).map((value, colIdx) => (
                          <td
                            key={colIdx}
                            className="px-6 py-4 text-sm font-mono"
                          >
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              </ScratchBrutal>
            </div>
          ))}
        </div>
      </section>

      {/* Care Instructions */}
      <section className="container mx-auto px-4 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-black tracking-tighter mb-12">
            ENTRETIEN DES VÊTEMENTS
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {careInstructions.map((instruction, idx) => (
              <Card
                key={instruction.title}
                className="p-6 border border-border bg-card hover:border-primary transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="text-primary mt-1">{instruction.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">
                      {instruction.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {instruction.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Tips Section */}
      <section className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="border border-border p-8 bg-card"
        >
          <h2 className="text-2xl font-bold mb-6">CONSEILS SUPPLÉMENTAIRES</h2>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <ChevronRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span className="text-muted-foreground">
                Consultez toujours l'étiquette de composition avant le lavage
              </span>
            </li>
            <li className="flex gap-3">
              <ChevronRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span className="text-muted-foreground">
                Les articles premium peuvent rétrécir légèrement au premier lavage
              </span>
            </li>
            <li className="flex gap-3">
              <ChevronRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span className="text-muted-foreground">
                Utilisez un filet de lavage pour les articles délicats
              </span>
            </li>
            <li className="flex gap-3">
              <ChevronRight className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span className="text-muted-foreground">
                Évitez l'eau de Javel et les produits chimiques agressifs
              </span>
            </li>
          </ul>
        </motion.div>
      </section>
    </div>
  );
}
