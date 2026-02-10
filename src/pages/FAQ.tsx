import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { ScratchBrutal } from "@/components/ScratchBrutal";

/**
 * FAQ Page - Frequently Asked Questions
 * Comprehensive Q&A section covering products, orders, shipping, and returns
 * Helps customers find answers to common questions
 */
export default function FAQ() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const faqCategories = [
    {
      category: "À Propos des Produits",
      questions: [
        {
          q: "Tous vos produits sont-ils authentiques?",
          a: "Oui, 100% authentiques. Nous travaillons directement avec les distributeurs officiels et les revendeurs autorisés. Chaque article est vérifié avant expédition.",
        },
        {
          q: "Quelle est la différence entre les tailles?",
          a: "Consultez notre Guide des Tailles pour des mesures précises. Chaque marque peut avoir des variations légères. Nous recommandons de vérifier les dimensions avant d'acheter.",
        },
        {
          q: "Avez-vous des articles en stock?",
          a: "Oui, tous les articles affichés sont en stock. Si un article est en rupture, il sera marqué comme 'Sold Out'. Nous mettons à jour notre inventaire en temps réel.",
        },
        {
          q: "Proposez-vous des articles de grandes tailles?",
          a: "Oui, nous proposons des tailles jusqu'à XXL pour la plupart des articles. Consultez la fiche produit pour voir les tailles disponibles.",
        },
      ],
    },
    {
      category: "Commandes & Paiement",
      questions: [
        {
          q: "Comment passer une commande?",
          a: "Sélectionnez les articles, choisissez votre taille, et cliquez sur 'Ajouter au panier'. Procédez au paiement via WhatsApp ou virement bancaire.",
        },
        {
          q: "Quels sont les modes de paiement acceptés?",
          a: "Nous acceptons: WhatsApp (paiement à la livraison), MTN Money, Moov Money, et virements bancaires. Aucune carte de crédit requise.",
        },
        {
          q: "Puis-je modifier ma commande après l'avoir passée?",
          a: "Oui, contactez-nous immédiatement via WhatsApp. Si votre commande n'a pas encore été préparée, nous pouvons la modifier.",
        },
        {
          q: "Recevrai-je une confirmation de commande?",
          a: "Oui, vous recevrez une confirmation par WhatsApp avec un numéro de suivi et les détails de votre commande.",
        },
      ],
    },
    {
      category: "Livraison & Suivi",
      questions: [
        {
          q: "Combien de temps prend la livraison?",
          a: "Cotonou & Calavi: 24-48h. Autres villes: 3-5 jours. Région WAEMU: 7-10 jours. Les délais commencent après confirmation du paiement.",
        },
        {
          q: "Puis-je suivre ma commande?",
          a: "Oui! Vous recevrez un numéro de suivi via WhatsApp. Vous pouvez nous contacter pour connaître l'état de votre livraison.",
        },
        {
          q: "Livrez-vous à l'étranger?",
          a: "Oui, nous livrons dans la région WAEMU (Togo, Burkina Faso, Mali, Niger, Côte d'Ivoire, Sénégal). Des frais supplémentaires s'appliquent.",
        },
        {
          q: "Que se passe-t-il si je ne suis pas à la maison?",
          a: "Notre livreur vous contactera avant l'arrivée. Vous pouvez convenir d'une heure qui vous convient ou demander une livraison ultérieure.",
        },
      ],
    },
    {
      category: "Retours & Remboursements",
      questions: [
        {
          q: "Quelle est votre politique de retour?",
          a: "Vous avez 7 jours pour retourner un article non porté avec l'étiquette intacte. Les frais de retour sont à votre charge.",
        },
        {
          q: "Comment initier un retour?",
          a: "Contactez-nous via WhatsApp avec votre numéro de commande et la raison du retour. Nous vous fournirons les instructions de retour.",
        },
        {
          q: "Combien de temps prend le remboursement?",
          a: "Une fois que nous recevons et inspectons votre retour, le remboursement est traité dans les 5-7 jours ouvrables.",
        },
        {
          q: "Puis-je échanger un article pour une autre taille?",
          a: "Oui! Les échanges sont gratuits pour les articles défectueux ou mal ajustés. Contactez-nous via WhatsApp pour organiser l'échange.",
        },
      ],
    },
    {
      category: "Compte & Sécurité",
      questions: [
        {
          q: "Dois-je créer un compte pour acheter?",
          a: "Non, vous pouvez acheter sans créer de compte. Cependant, créer un compte vous permet de suivre vos commandes plus facilement.",
        },
        {
          q: "Mes données personnelles sont-elles sécurisées?",
          a: "Oui, nous utilisons le chiffrement SSL et les meilleures pratiques de sécurité pour protéger vos données. Nous ne partageons jamais vos informations avec des tiers.",
        },
        {
          q: "Comment puis-je réinitialiser mon mot de passe?",
          a: "Cliquez sur 'Mot de passe oublié' sur la page de connexion. Vous recevrez un lien de réinitialisation par email.",
        },
      ],
    },
    {
      category: "Assistance & Support",
      questions: [
        {
          q: "Comment puis-je contacter le support client?",
          a: "Vous pouvez nous contacter via WhatsApp au +229 96 09 24 39, par email à contact@momozy.com, ou visiter notre boutique physique à Cotonou.",
        },
        {
          q: "Quels sont vos horaires de service?",
          a: "Nous sommes disponibles du lundi au dimanche, de 9h à 20h (heure locale). Les réponses WhatsApp sont généralement traitées dans les 2 heures.",
        },
        {
          q: "Proposez-vous une garantie sur les produits?",
          a: "Oui, tous les articles bénéficient d'une garantie de 30 jours contre les défauts de fabrication. Contactez-nous si vous découvrez un défaut.",
        },
        {
          q: "Puis-je obtenir une facture?",
          a: "Oui, nous fournissons une facture avec chaque commande. Vous pouvez la télécharger depuis votre compte ou la demander via WhatsApp.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pt-20 pb-20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-20">
        <div className="max-w-3xl">
          <ScratchBrutal intensity="brutal" index={0}>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 uppercase">
              QUESTIONS FRÉQUENTES
            </h1>
          </ScratchBrutal>
          <ScratchBrutal intensity="medium" index={1}>
            <p className="text-lg text-muted-foreground mb-8 uppercase font-mono">
              Trouvez les réponses à vos questions sur nos produits, commandes, livraison et bien plus.
            </p>
          </ScratchBrutal>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="container mx-auto px-4">
        <div className="space-y-12">
          {faqCategories.map((category, catIdx) => (
            <div key={category.category}>
              <ScratchBrutal intensity="light" index={catIdx}>
                <h2 className="text-2xl font-black mb-6 pb-4 border-b border-border uppercase tracking-tight">
                  {category.category}
                </h2>
              </ScratchBrutal>
              <div className="space-y-3">
                {category.questions.map((item, qIdx) => {
                  const itemIndex = catIdx * 100 + qIdx;
                  const isExpanded = expandedIndex === itemIndex;

                  return (
                    <ScratchBrutal
                      key={qIdx}
                      index={qIdx}
                      intensity="light"
                    >
                      <Card
                        className="border border-border bg-card overflow-hidden cursor-pointer hover:border-primary transition-colors"
                        onClick={() =>
                          setExpandedIndex(isExpanded ? null : itemIndex)
                        }
                      >
                        <div className="p-6 flex items-start justify-between gap-4">
                          <h3 className="font-bold text-base flex-1 text-left">
                            {item.q}
                          </h3>
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="shrink-0 mt-1"
                          >
                            <ChevronDown className="w-5 h-5 text-primary" />
                          </motion.div>
                        </div>

                        {/* Answer - Expandable */}
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{
                            height: isExpanded ? "auto" : 0,
                            opacity: isExpanded ? 1 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-0 border-t border-border/50 text-muted-foreground">
                            {item.a}
                          </div>
                        </motion.div>
                      </Card>
                    </ScratchBrutal>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="container mx-auto px-4 mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="border border-border p-8 bg-card text-center"
        >
          <h2 className="text-2xl font-bold mb-4">
            VOUS N'AVEZ PAS TROUVÉ LA RÉPONSE?
          </h2>
          <p className="text-muted-foreground mb-6">
            Contactez notre équipe support via WhatsApp. Nous répondons généralement dans les 2 heures.
          </p>
          <a
            href="https://wa.me/22996092439"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary text-primary-foreground px-8 py-3 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
          >
            Contacter le Support
          </a>
        </motion.div>
      </section>
    </div>
  );
}
