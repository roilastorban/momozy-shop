import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Truck, MapPin, Clock, DollarSign, CheckCircle2, AlertCircle } from "lucide-react";
import { ScratchBrutal } from "@/components/ScratchBrutal";

/**
 * Delivery Page - Shipping Information & Delivery Options
 * Provides comprehensive information about delivery zones, costs, and timelines
 * Helps customers understand shipping options and track their orders
 */
export default function Delivery() {
  const deliveryZones = [
    {
      zone: "Cotonou & Calavi",
      cost: "Gratuit",
      time: "24-48h",
      description: "Livraison express dans la zone métropolitaine",
      icon: <Truck className="w-6 h-6" />,
    },
    {
      zone: "Autres villes (Bénin)",
      cost: "2,500 CFA",
      time: "3-5 jours",
      description: "Livraison standard dans tout le Bénin",
      icon: <Truck className="w-6 h-6" />,
    },
    {
      zone: "Région WAEMU",
      cost: "5,000 CFA",
      time: "7-10 jours",
      description: "Livraison internationale (Togo, Burkina, Mali, etc.)",
      icon: <Truck className="w-6 h-6" />,
    },
  ];

  const paymentMethods = [
    {
      name: "WhatsApp",
      description: "Commandez directement via WhatsApp et payez à la livraison",
      number: "+229 96 09 24 39",
      icon: "📱",
    },
    {
      name: "Virement Bancaire",
      description: "Paiement par virement bancaire (MTN Money, Moov Money)",
      details: "Détails fournis après confirmation de commande",
      icon: "🏦",
    },
    {
      name: "Paiement à la Livraison",
      description: "Payez directement au livreur à la réception",
      details: "Disponible pour Cotonou & Calavi",
      icon: "💵",
    },
  ];

  const faqItems = [
    {
      question: "Puis-je suivre ma commande?",
      answer: "Oui! Après confirmation de votre commande, vous recevrez un numéro de suivi via WhatsApp. Vous pourrez suivre votre colis en temps réel.",
    },
    {
      question: "Que se passe-t-il si je ne suis pas à la maison?",
      answer: "Notre équipe de livraison vous contactera avant l'arrivée. Vous pouvez convenir d'une heure de livraison qui vous convient.",
    },
    {
      question: "Y a-t-il des frais cachés?",
      answer: "Non! Le prix affiché est le prix final. Aucun frais supplémentaire ne sera ajouté à la livraison.",
    },
    {
      question: "Puis-je retourner un article?",
      answer: "Oui, vous avez 7 jours pour retourner un article non porté avec l'étiquette intacte. Contactez-nous via WhatsApp pour initier le retour.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pt-20 pb-20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-20">
        <div className="max-w-3xl">
          <ScratchBrutal intensity="brutal" index={0}>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 uppercase">
              LIVRAISON & TARIFS
            </h1>
          </ScratchBrutal>
          <ScratchBrutal intensity="medium" index={1}>
            <p className="text-lg text-muted-foreground mb-8 uppercase font-mono">
              Livraison rapide et sécurisée dans tout le Bénin et la région WAEMU. Suivi en temps réel de votre commande.
            </p>
          </ScratchBrutal>
        </div>
      </section>

      {/* Delivery Zones */}
      <section className="container mx-auto px-4 mb-20">
        <div className="mb-12">
          <h2 className="text-3xl font-black tracking-tighter mb-12">
            ZONES DE LIVRAISON
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {deliveryZones.map((zone, idx) => (
              <ScratchBrutal key={zone.zone} index={idx} intensity="medium">
              <Card
                className="h-full p-6 border border-border bg-card hover:border-primary transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-primary">{zone.icon}</div>
                  <div>
                    <h3 className="text-lg font-bold">{zone.zone}</h3>
                    <p className="text-sm text-muted-foreground">
                      {zone.description}
                    </p>
                  </div>
                </div>
                <div className="space-y-3 pt-4 border-t border-border/50">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Coût:</span>
                    <span className="font-bold text-primary">{zone.cost}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Délai:</span>
                    <span className="font-bold">{zone.time}</span>
                  </div>
                </div>
              </Card>
              </ScratchBrutal>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="container mx-auto px-4 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-black tracking-tighter mb-12">
            MODES DE PAIEMENT
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {paymentMethods.map((method, idx) => (
              <Card
                key={method.name}
                className="p-6 border border-border bg-card"
              >
                <div className="text-4xl mb-4">{method.icon}</div>
                <h3 className="text-lg font-bold mb-2">{method.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {method.description}
                </p>
                {method.number && (
                  <p className="text-sm font-mono font-bold text-primary">
                    {method.number}
                  </p>
                )}
                {method.details && (
                  <p className="text-xs text-muted-foreground mt-2">
                    {method.details}
                  </p>
                )}
              </Card>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Process Timeline */}
      <section className="container mx-auto px-4 mb-20">
        <div className="mb-12">
          <h2 className="text-3xl font-black tracking-tighter mb-12">
            PROCESSUS DE COMMANDE
          </h2>
          <div className="space-y-4">
            {[
              { step: 1, title: "Commande", description: "Sélectionnez vos articles et confirmez votre commande" },
              { step: 2, title: "Confirmation", description: "Vous recevez une confirmation et un numéro de suivi" },
              { step: 3, title: "Préparation", description: "Nous préparons votre colis avec soin" },
              { step: 4, title: "Livraison", description: "Votre colis est en route vers vous" },
              { step: 5, title: "Réception", description: "Vous recevez votre commande et payez si nécessaire" },
            ].map((item, idx) => (
              <ScratchBrutal
                key={item.step}
                index={idx}
                intensity="light"
                className="flex gap-4 items-start"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-background font-bold shrink-0">
                  {item.step}
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="font-bold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </ScratchBrutal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-black tracking-tighter mb-12">
            QUESTIONS FRÉQUENTES
          </h2>
          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <Card
                key={idx}
                className="p-6 border border-border bg-card"
              >
                <h3 className="font-bold mb-3 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  {item.question}
                </h3>
                <p className="text-sm text-muted-foreground ml-8">
                  {item.answer}
                </p>
              </Card>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact CTA */}
      <section className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="border border-border p-8 bg-card text-center"
        >
          <h2 className="text-2xl font-bold mb-4">BESOIN D'AIDE?</h2>
          <p className="text-muted-foreground mb-6">
            Contactez-nous via WhatsApp pour toute question sur la livraison
          </p>
          <a
            href="https://wa.me/22996092439"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary text-primary-foreground px-8 py-3 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
          >
            Discuter sur WhatsApp
          </a>
        </motion.div>
      </section>
    </div>
  );
}
