import { motion } from "framer-motion";
import { Croissant, MapPin, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: (
        <Sparkles />
      ),
      title: t('about.features.wellness.title'),
      description: t('about.features.wellness.description')
    },
    {
      icon: (
        <Croissant />
      ),
      title: t('about.features.breakfast.title'),
      description: t('about.features.breakfast.description')
    },
    {
      icon: (
        <MapPin />
      ),
      title: t('about.features.location.title'),
      description: t('about.features.location.description')
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-sans text-xs uppercase tracking-[0.3em] text-primary mb-4"
          >
            {t('about.subtitle')}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-foreground mb-8 tracking-wide"
          >
            {t('about.title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-base md:text-lg text-muted-foreground leading-relaxed mb-8"
          >
            {t('about.description')}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-sans text-base md:text-lg text-muted-foreground leading-relaxed"
          >
            {t('about.descriptionSecond')}
          </motion.p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="text-center p-8"
            >
              <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-muted flex items-center justify-center text-primary">
                {feature.icon}
              </div>
              <h3 className="font-serif text-xl font-medium text-foreground mb-3">{feature.title}</h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
