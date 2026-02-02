import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import StructuredData from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLanguageSync } from "@/hooks/useLanguageSync";
import GoogleMap from "@/components/GoogleMap.tsx";

const Contact = () => {
  useLanguageSync();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background font-sans">
      <SEOHead 
        titleKey="meta.contact.title"
        descriptionKey="meta.contact.description"
        pageKey="contact"
      />
      <StructuredData type="contact" />
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="font-sans text-xs uppercase tracking-[0.3em] text-primary mb-4"
              >
                {t('contact.heroSubtitle')}
              </motion.p>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-serif text-4xl md:text-5xl font-light text-foreground mb-6 tracking-wide"
              >
                {t('contact.heroTitle')}
              </motion.h1>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="font-serif text-xl font-medium text-foreground mb-3">
                    {t('contact.location.label')}
                  </h3>
                  <p className="font-sans text-muted-foreground leading-relaxed">
                    {t('contact.location.value')}
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-medium text-foreground mb-3">
                    {t('contact.email.label')}
                  </h3>
                  <p className="font-sans text-muted-foreground leading-relaxed">
                    {t('contact.email.value')}
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-medium text-foreground mb-3">
                    {t('contact.checkIn.label')} / {t('contact.checkOut.label')}
                  </h3>
                  <p className="font-sans text-muted-foreground leading-relaxed">
                    {t('contact.checkIn.label')}: {t('contact.checkIn.value')}<br />
                    {t('contact.checkOut.label')}: {t('contact.checkOut.value')}
                  </p>
                </div>
                <div className="pt-4">
                  <Button size="lg" asChild>
                    <a href="https://www.wellnesssweetbonihu.com/boeken-wellness-brugge" target="_blank" rel="noopener noreferrer">
                      {t('contact.directReserve')}
                    </a>
                  </Button>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.form 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-cream p-8 rounded-sm space-y-6"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="font-sans text-sm font-medium text-foreground mb-2 block">
                      {t('contact.form.name')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 rounded-sm border border-border bg-background font-sans text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      placeholder={t('contact.form.name')}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="font-sans text-sm font-medium text-foreground mb-2 block">
                      {t('contact.form.email')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 rounded-sm border border-border bg-background font-sans text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      placeholder={t('contact.form.email')}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="dates" className="font-sans text-sm font-medium text-foreground mb-2 block">
                    {t('contact.form.subject')}
                  </label>
                  <input
                    type="text"
                    id="dates"
                    className="w-full px-4 py-3 rounded-sm border border-border bg-background font-sans text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder={t('contact.form.subject')}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="font-sans text-sm font-medium text-foreground mb-2 block">
                    {t('contact.form.message')}
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-sm border border-border bg-background font-sans text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                    placeholder={t('contact.form.messagePlaceholder')}
                  />
                </div>
                <Button type="submit" className="w-full">
                  {t('contact.form.submit')}
                </Button>
              </motion.form>
            </div>

              {/* Google Map */}
              <div className="mt-16">
                  <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      className="font-serif text-2xl font-light text-foreground mb-6 text-center"
                  >
                      {t('contact.findUs')}
                  </motion.h2>
                  <GoogleMap className="h-[400px] md:h-[450px]" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
