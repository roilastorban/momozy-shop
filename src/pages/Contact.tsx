import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { IMAGES } from "@/assets/images";
import { SiWhatsapp, SiInstagram } from "react-icons/si";
import { MapPin, Phone, Clock, Mail, Send, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScratchBrutal } from "@/components/ScratchBrutal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const contactFormSchema = z.object({
  name: z.string().min(2, "Le nom est requis"),
  whatsapp: z.string().min(8, "Numéro WhatsApp valide requis"),
  email: z.string().email("Email invalide").optional().or(z.literal("")),
  subject: z.string().min(5, "Sujet requis"),
  message: z.string().min(10, "Message trop court"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      whatsapp: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: ContactFormValues) {
    console.log(values);
    toast.success("Message envoyé ! Le Gang vous répondra sous peu.");
    form.reset();
  }

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      label: "Boutique Physique",
      value: "Carrefour Togoudo, avant la station AK Petrolenium, Abomey-Calavi",
      link: "https://maps.google.com",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: "WhatsApp / Appel",
      value: "+229 96 09 24 39",
      link: "https://wa.me/22996092439",
    },
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: "contact@momozyshop.com",
      link: "mailto:contact@momozyshop.com",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      label: "Horaires",
      value: "Lundi - Dimanche : 09h00 - 21h00",
    },
  ];

  const socialLinks = [
    {
      icon: <SiInstagram className="w-5 h-5" />,
      name: "Instagram",
      handle: "@momozyshop",
      link: "#",
    },
    {
      icon: <SiWhatsapp className="w-5 h-5" />,
      name: "WhatsApp",
      handle: "Le Gang Momozy",
      link: "https://wa.me/22996092439",
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      {/* Hero Header */}
      <section className="container mx-auto px-4 mb-16">
        <div className="border-b border-white/10 pb-12">
          <ScratchBrutal intensity="brutal" index={0}>
            <h1 className="font-heading text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none">
              Contactez <br />
              <span className="text-white/40">Le Gang.</span>
            </h1>
          </ScratchBrutal>
          <ScratchBrutal intensity="medium" index={1}>
            <p className="mt-8 text-xl text-muted-foreground max-w-2xl uppercase font-mono">
              L'épicentre du streetwear premium au Bénin. Une question sur un drop ? Un besoin de style ? On est là.
            </p>
          </ScratchBrutal>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/10 border border-white/10">
          {/* Left Column: Form */}
          <div className="bg-background p-8 md:p-12">
            <h2 className="font-heading text-3xl font-bold uppercase mb-8 border-l-4 border-primary pl-4">
              Envoyez un Signal
            </h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase font-mono text-xs text-muted-foreground">Nom Complet</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="JEAN KOFFI"
                            className="rounded-none border-white/10 bg-white/5 focus:border-white focus:ring-0 transition-colors py-6"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-destructive text-xs uppercase" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="whatsapp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase font-mono text-xs text-muted-foreground">WhatsApp</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="+229 XX XX XX XX"
                            className="rounded-none border-white/10 bg-white/5 focus:border-white focus:ring-0 transition-colors py-6"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-destructive text-xs uppercase" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase font-mono text-xs text-muted-foreground">Email (Optionnel)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="VOTRE@EMAIL.COM"
                          className="rounded-none border-white/10 bg-white/5 focus:border-white focus:ring-0 transition-colors py-6"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-destructive text-xs uppercase" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase font-mono text-xs text-muted-foreground">Sujet</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="DISPONIBILITÉ DROP / COMMANDE"
                          className="rounded-none border-white/10 bg-white/5 focus:border-white focus:ring-0 transition-colors py-6"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-destructive text-xs uppercase" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase font-mono text-xs text-muted-foreground">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="VOTRE MESSAGE ICI..."
                          className="rounded-none border-white/10 bg-white/5 focus:border-white focus:ring-0 transition-colors min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-destructive text-xs uppercase" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full rounded-none bg-white text-black hover:bg-white/90 font-bold py-8 text-lg uppercase tracking-widest group"
                >
                  Envoyer le message
                  <Send className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </form>
            </Form>
          </div>

          {/* Right Column: Info & Visual */}
          <div className="bg-background p-8 md:p-12 flex flex-col">
            <div className="mb-12">
              <h2 className="font-heading text-3xl font-bold uppercase mb-8 border-l-4 border-white/40 pl-4">
                QG MOMOZY
              </h2>
              <div className="space-y-8">
                {contactInfo.map((info, index) => (
                  <ScratchBrutal
                    key={index}
                    index={index}
                    intensity="light"
                  >
                    <div className="flex gap-6 items-start group">
                      <div className="bg-white/5 p-4 border border-white/10 transition-colors group-hover:bg-white group-hover:text-black">
                        {info.icon}
                      </div>
                      <div>
                        <p className="uppercase font-mono text-xs text-muted-foreground mb-1">{info.label}</p>
                        {info.link ? (
                          <a
                            href={info.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg font-bold hover:text-white/60 transition-colors flex items-center gap-2"
                          >
                            {info.value}
                            <ArrowRight className="w-4 h-4" />
                          </a>
                        ) : (
                          <p className="text-lg font-bold">{info.value}</p>
                        )}
                      </div>
                    </div>
                  </ScratchBrutal>
                ))}
              </div>
            </div>

            <div className="mt-auto">
              <h3 className="uppercase font-mono text-xs text-muted-foreground mb-4 tracking-widest">REJOIGNEZ LE GANG SUR LES RÉSEAUX</h3>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    className="flex items-center gap-3 p-4 border border-white/10 bg-white/5 hover:bg-white hover:text-black transition-all group"
                  >
                    {social.icon}
                    <div className="flex flex-col">
                      <span className="text-xs font-bold uppercase">{social.name}</span>
                      <span className="text-[10px] text-muted-foreground group-hover:text-black/60 uppercase">{social.handle}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Decorative Brutalist Element */}
            <div className="hidden md:block absolute bottom-0 right-0 w-32 h-32 opacity-10 pointer-events-none overflow-hidden">
               <img src={IMAGES.GEOMETRIC_BRUTALIST_1} alt="Geometric" className="w-full h-full object-cover grayscale" />
            </div>
          </div>
        </div>
      </section>

      {/* Large Visual Section */}
      <section className="container mx-auto px-4 mt-24">
        <div className="relative h-[400px] overflow-hidden group">
          <img 
            src={IMAGES.GEOMETRIC_BRUTALIST_4} 
            alt="Showroom"
            className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center">
            <h2 className="font-heading text-4xl md:text-6xl font-black uppercase mb-6">VIVEZ L'EXPÉRIENCE EN BOUTIQUE</h2>
            <p className="max-w-xl mb-8 uppercase font-mono text-sm">
              Plongez dans l'univers Momozy. Essayez nos dernières pièces exclusives et rejoignez l'élite du streetwear à Cotonou.
            </p>
            <Button 
              asChild
              className="rounded-none bg-white text-black hover:bg-white/90 py-6 px-10 text-sm font-black uppercase tracking-widest"
            >
              <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
                Ouvrir dans Google Maps
              </a>
            </Button>
          </div>
          {/* Brutalist Border Overlays */}
          <div className="absolute top-4 left-4 border-l-2 border-t-2 border-white w-12 h-12" />
          <div className="absolute bottom-4 right-4 border-r-2 border-b-2 border-white w-12 h-12" />
        </div>
      </section>
    </div>
  );
};

export default Contact;
