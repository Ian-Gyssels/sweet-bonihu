import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import StructuredData from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLanguageSync } from "@/hooks/useLanguageSync";
import roomMidsomer from "@/assets/bed_Recht.jpg";

const Midsomer = () => {
  useLanguageSync();
  const { t } = useTranslation();
  const amenities = t('rooms.midsomer.amenities', { returnObjects: true }) as string[];

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEOHead 
        titleKey="meta.midsomer.title"
        descriptionKey="meta.midsomer.description"
        pageKey="midsomer"
      />
      <StructuredData type="room" roomName="midsomer" />
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative h-[70vh] overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${roomMidsomer})` }}
          >
            <div className="absolute inset-0 bg-charcoal/40" />
          </div>
          <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
            <div>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="font-sans text-xs uppercase tracking-[0.3em] text-champagne mb-4"
              >
                {t('rooms.midsomer.heroSubtitle')}
              </motion.p>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-serif text-4xl md:text-6xl font-light text-cream tracking-wide"
              >
                {t('rooms.midsomer.heroTitle')}
              </motion.h1>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="font-serif text-3xl md:text-4xl font-light text-foreground mb-6 tracking-wide"
                >
                  {t('rooms.midsomer.contentTitle')}
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="font-sans text-base text-muted-foreground leading-relaxed mb-6"
                >
                  {t('rooms.midsomer.contentDescription')}
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="font-sans text-base text-muted-foreground leading-relaxed mb-6"
                >
                  {t('rooms.midsomer.contentDescriptionSecond')}
                </motion.p>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="bg-muted p-4 rounded-sm mb-8"
                >
                  <p className="font-sans text-sm text-foreground flex items-center gap-2">
                    <span className="text-lg">🐕</span>
                    {t('rooms.midsomer.petsWelcome')} — {t('rooms.midsomer.petsDescription')}
                  </p>
                </motion.div>
                <Button size="lg" asChild>
                  <a href="https://www.wellnesssweetbonihu.com/" target="_blank" rel="noopener noreferrer">
                    {t('rooms.midsomer.reserveButton')}
                  </a>
                </Button>
              </div>

              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-cream p-8 rounded-sm"
              >
                <h3 className="font-serif text-xl font-medium text-foreground mb-6">
                  {t('rooms.midsomer.amenitiesTitle')}
                </h3>
                <ul className="space-y-3">
                  {amenities.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 font-sans text-sm text-muted-foreground">
                      <svg className="w-4 h-4 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Midsomer;
