import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Testimonials = () => {
  const { t } = useTranslation();
  const testimonials = t('testimonials.items', { returnObjects: true }) as Array<{
    text: string;
    author: string;
    location: string;
    rating: string;
  }>;

  return (
    <section className="py-24 md:py-32 bg-charcoal">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-sans text-xs uppercase tracking-[0.3em] text-champagne mb-4"
          >
            {t('testimonials.subtitle')}
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-light text-cream tracking-wide"
          >
            {t('testimonials.title')}
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="bg-cream/5 backdrop-blur-sm p-8 rounded-sm border border-cream/10"
            >
              <p className="font-sans text-xs uppercase tracking-wider text-champagne mb-4">
                {testimonial.rating}
              </p>
              <p className="font-serif text-lg text-cream/90 leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-2">
                <span className="font-sans text-sm text-cream/80">{testimonial.author}</span>
                <span className="text-cream/40">•</span>
                <span className="font-sans text-sm text-cream/60">{testimonial.location}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
