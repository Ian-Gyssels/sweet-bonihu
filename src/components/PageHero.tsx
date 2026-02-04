import {motion} from "framer-motion";
import {useTranslation} from "react-i18next";
import useLanguageSync from "@/hooks/useLanguageSync.ts";

type PageHeroProps = {
    image: string
    title: string
    subtitle: string
}

const PageHero = ({image, title, subtitle}: PageHeroProps) => {
    useLanguageSync();
    const {t} = useTranslation();
    return (
        <section className="relative h-[70vh] overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{backgroundImage: `url(${image})`}}
            >
                <div className="absolute inset-0 bg-charcoal/40"/>
            </div>
            <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
                <div>
                    <motion.p
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.6}}
                        className="font-sans text-xs uppercase tracking-[0.3em] text-champagne mb-4"
                    >
                        {t(subtitle)}
                    </motion.p>
                    <motion.h1
                        initial={{opacity: 0, y: 30}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.6, delay: 0.1}}
                        className="font-serif text-4xl md:text-6xl font-light text-cream tracking-wide"
                    >
                        {t(title)}
                    </motion.h1>
                </div>
            </div>
        </section>
    )
};

export default PageHero;