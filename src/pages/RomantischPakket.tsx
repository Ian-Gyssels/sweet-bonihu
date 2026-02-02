import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import StructuredData from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLanguageSync } from "@/hooks/useLanguageSync";
import heroImage from "@/assets/hero-wellness.jpg";

const RomantischPakket = () => {
  useLanguageSync();
  const { t } = useTranslation();
  const includes = t('romantic.includes', { returnObjects: true }) as string[];

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEOHead 
        titleKey="meta.romantic.title"
        descriptionKey="meta.romantic.description"
        pageKey="romantic"
      />
      <StructuredData type="package" />
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative h-[70vh] overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="absolute inset-0 bg-charcoal/50" />
          </div>
          <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
            <div>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="font-sans text-xs uppercase tracking-[0.3em] text-champagne mb-4"
              >
                {t('romantic.heroSubtitle')}
              </motion.p>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-serif text-4xl md:text-6xl font-light text-cream tracking-wide"
              >
                {t('romantic.heroTitle')}
              </motion.h1>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-serif text-3xl md:text-4xl font-light text-foreground mb-6 tracking-wide"
              >
                {t('romantic.contentTitle')}
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-sans text-base text-muted-foreground leading-relaxed"
              >
                {t('romantic.contentDescription')}
              </motion.p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-cream p-10 rounded-sm"
              >
                <h3 className="font-serif text-2xl font-light text-foreground mb-8">
                  {t('romantic.includesTitle')}
                </h3>
                <ul className="space-y-4">
                  {includes.map((item) => (
                    <li key={item} className="flex items-center gap-3 font-sans text-base text-muted-foreground">
                      <svg className="w-5 h-5 text-primary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-center lg:text-left"
              >
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-primary mb-2">
                  {t('romantic.priceLabel')}
                </p>
                <p className="font-serif text-5xl font-light text-foreground mb-6">
                  {t('romantic.priceValue')}
                </p>
                <p className="font-sans text-base text-muted-foreground leading-relaxed mb-8">
                  {t('romantic.priceDescription')}
                </p>
                <Button size="lg" asChild>
                  <a href="https://www.wellnesssweetbonihu.com/" target="_blank" rel="noopener noreferrer">
                    {t('romantic.requestQuote')}
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default RomantischPakket;
