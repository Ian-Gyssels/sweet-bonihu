import {Button} from "@/components/ui/button";
import {motion} from "framer-motion";
import {useTranslation} from "react-i18next";
import heroImage from "@/assets/hero-wellness.jpg";

const Hero = () => {
    const {t} = useTranslation();

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{backgroundImage: `url(${heroImage})`}}
            >
                <div className="absolute inset-0 bg-charcoal/50"/>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                <motion.p
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.8, delay: 0.2}}
                    className="font-sans text-xs md:text-sm uppercase tracking-[0.4em] text-cream/90 mb-6"
                >
                    {t('hero.subtitle')}
                </motion.p>
                <motion.h1
                    initial={{opacity: 0, y: 30}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.8, delay: 0.4}}
                    className="font-serif text-4xl md:text-6xl lg:text-7xl font-light text-cream mb-6 leading-tight tracking-wide"
                >
                    {t('hero.title')}
                </motion.h1>
                <motion.p
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.8, delay: 0.6}}
                    className="font-sans text-base md:text-lg text-cream/85 mb-10 max-w-2xl mx-auto font-light leading-relaxed"
                >
                    {t('hero.description')}
                </motion.p>
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 0.8, delay: 0.8}}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Button size="lg" variant="hero" asChild>
                        <a href="https://www.wellnesssweetbonihu.com/" target="_blank" rel="noopener noreferrer">
                            {t('hero.cta')}
                        </a>
                    </Button>
                    <Button size="lg" variant="heroOutline" asChild>
                        <a href="#kamers">{t('hero.viewRooms')}</a>
                    </Button>
                </motion.div>
            </div>

            {/* Rating Badge */}
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 1, delay: 1.2}}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-cream/10 backdrop-blur-sm px-6 py-3 rounded-full border border-cream/20"
            >
                <span className="font-serif text-2xl text-champagne font-semibold">9.3</span>
                <span className="font-sans text-xs text-cream/80 uppercase tracking-wider">{t('hero.rating')}</span>
            </motion.div>
        </section>
    );
};

export default Hero;
