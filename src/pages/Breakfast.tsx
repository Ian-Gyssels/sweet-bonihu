import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import StructuredData from "@/components/StructuredData";
import BreakfastCollage from "@/components/BreakfastCollage";
import {motion} from "framer-motion";
import {useTranslation} from "react-i18next";
import {useLanguageSync} from "@/hooks/useLanguageSync";
import breakfastHero from "@/assets/breakfast-hero.jpg";
import breakfastPicnic from "@/assets/breakfast/breakfast-picnic.jpg";
import breakfastCoffee from "@/assets/breakfast/breakfast-coffee.jpg";
import {Check, CircleCheck} from "lucide-react";

const Breakfast = () => {
    useLanguageSync();
    const {t} = useTranslation();
    const includes = t('breakfast.includes', {returnObjects: true}) as string[];

    return (
        <div className="min-h-screen bg-background font-sans">
            <SEOHead
                titleKey="meta.breakfast.title"
                descriptionKey="meta.breakfast.description"
                pageKey="breakfast"
            />
            <StructuredData type="home"/>
            <Header/>
            <main className="pt-20">
                {/* Hero */}
                <section className="relative h-[70vh] overflow-hidden">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{backgroundImage: `url(${breakfastHero})`}}
                    >
                        <div className="absolute inset-0 bg-charcoal/45"/>
                    </div>
                    <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
                        <div>
                            <motion.p
                                initial={{opacity: 0, y: 20}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.6}}
                                className="font-sans text-xs uppercase tracking-[0.3em] text-champagne mb-4"
                            >
                                {t('breakfast.heroSubtitle')}
                            </motion.p>
                            <motion.h1
                                initial={{opacity: 0, y: 30}}
                                animate={{opacity: 1, y: 0}}
                                transition={{duration: 0.6, delay: 0.1}}
                                className="font-serif text-4xl md:text-6xl font-light text-cream tracking-wide"
                            >
                                {t('breakfast.heroTitle')}
                            </motion.h1>
                        </div>
                    </div>
                </section>

                {/* Intro section with image */}
                <section className="py-20 md:py-28">
                    <div className="container mx-auto px-6">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <motion.div
                                initial={{opacity: 0, x: -30}}
                                whileInView={{opacity: 1, x: 0}}
                                viewport={{once: true}}
                            >
                                <h2 className="font-serif text-3xl md:text-4xl font-light text-foreground mb-6 tracking-wide">
                                    {t('breakfast.contentTitle')}
                                </h2>
                                <p className="font-sans text-base text-muted-foreground leading-relaxed mb-6">
                                    {t('breakfast.contentDescription')}
                                </p>
                                <p className="font-sans text-base text-muted-foreground leading-relaxed">
                                    {t('breakfast.contentDescriptionSecond')}
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{opacity: 0, x: 30}}
                                whileInView={{opacity: 1, x: 0}}
                                viewport={{once: true}}
                                className="overflow-hidden rounded-sm"
                            >
                                <img
                                    src={breakfastPicnic}
                                    alt={t('breakfast.heroTitle')}
                                    className="w-full h-[400px] object-cover"
                                    loading="lazy"
                                />
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* What's included */}
                <section className="py-20 md:py-28 bg-cream">
                    <div className="container mx-auto px-6">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <motion.div
                                initial={{opacity: 0, x: -30}}
                                whileInView={{opacity: 1, x: 0}}
                                viewport={{once: true}}
                                className="order-2 lg:order-1 overflow-hidden rounded-sm"
                            >
                                <img
                                    src={breakfastCoffee}
                                    alt={t('breakfast.coffeeAlt')}
                                    className="w-full h-[400px] object-cover"
                                    loading="lazy"
                                />
                            </motion.div>

                            <motion.div
                                initial={{opacity: 0, x: 30}}
                                whileInView={{opacity: 1, x: 0}}
                                viewport={{once: true}}
                                className="order-1 lg:order-2"
                            >
                                <h3 className="font-serif text-2xl md:text-3xl font-light text-foreground mb-8 tracking-wide">
                                    {t('breakfast.includesTitle')}
                                </h3>
                                <ul className="space-y-4">
                                    {includes.map((item) => (
                                        <li key={item}
                                            className="flex items-center gap-3 font-sans text-base text-muted-foreground">
                                            <Check className="w-5 h-5 text-primary flex-shrink-0"/>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Guest Photos Collage */}
                <BreakfastCollage/>

                {/* Dietary info */}
                <section className="py-20 md:py-28">
                    <div className="container mx-auto px-6">
                        <div className="max-w-3xl mx-auto text-center">
                            <motion.h2
                                initial={{opacity: 0, y: 20}}
                                whileInView={{opacity: 1, y: 0}}
                                viewport={{once: true}}
                                className="font-serif text-3xl md:text-4xl font-light text-foreground mb-6 tracking-wide"
                            >
                                {t('breakfast.dietaryTitle')}
                            </motion.h2>
                            <motion.p
                                initial={{opacity: 0, y: 20}}
                                whileInView={{opacity: 1, y: 0}}
                                viewport={{once: true}}
                                transition={{delay: 0.1}}
                                className="font-sans text-base text-muted-foreground leading-relaxed mb-8"
                            >
                                {t('breakfast.dietaryDescription')}
                            </motion.p>
                            <motion.div
                                initial={{opacity: 0, y: 20}}
                                whileInView={{opacity: 1, y: 0}}
                                viewport={{once: true}}
                                transition={{delay: 0.2}}
                                className="bg-muted p-6 rounded-sm"
                            >
                                <p className="font-sans text-sm text-foreground">
                                    {t('breakfast.contactInfo')}
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer/>
        </div>
    );
};

export default Breakfast;