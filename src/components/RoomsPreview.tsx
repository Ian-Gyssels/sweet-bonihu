import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import roomLoft from "@/assets/hero-loft.jpg";
import roomMidsomer from "@/assets/hero-wellness.jpg";

const RoomsPreview = () => {
  const { t } = useTranslation();
  const { getPaths } = useLocalizedPath();
  const paths = getPaths();

  const rooms = [
    {
      name: t('rooms.loft.name'),
      subtitle: t('rooms.loft.subtitle'),
      description: t('rooms.loft.description'),
      image: roomLoft,
      link: paths.loft,
      features: t('rooms.loft.features', { returnObjects: true }) as string[]
    },
    {
      name: t('rooms.midsomer.name'),
      subtitle: t('rooms.midsomer.subtitle'),
      description: t('rooms.midsomer.description'),
      image: roomMidsomer,
      link: paths.midsomer,
      features: t('rooms.midsomer.features', { returnObjects: true }) as string[]
    }
  ];

  return (
    <section id="kamers" className="py-24 md:py-32 bg-cream">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-sans text-xs uppercase tracking-[0.3em] text-primary mb-4"
          >
            {t('rooms.subtitle')}
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-foreground tracking-wide"
          >
            {t('rooms.title')}
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {rooms.map((room, index) => (
            <motion.div 
              key={room.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 * index }}
              className="group"
            >
              <Link to={room.link} className="block">
                <div className="relative overflow-hidden rounded-sm aspect-[4/3] mb-6">
                  <img 
                    src={room.image} 
                    alt={room.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-charcoal/10 transition-colors duration-300" />
                </div>
              </Link>
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-primary mb-2">
                {room.subtitle}
              </p>
              <h3 className="font-serif text-2xl md:text-3xl font-light text-foreground mb-4 tracking-wide">
                {room.name}
              </h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed mb-4">
                {room.description}
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                {room.features.map((feature) => (
                  <span 
                    key={feature}
                    className="font-sans text-xs uppercase tracking-wider text-taupe px-3 py-1.5 bg-muted rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>
              <Button variant="outline" asChild>
                <Link to={room.link}>{t('rooms.moreInfo')}</Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoomsPreview;
