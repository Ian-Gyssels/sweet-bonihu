import {motion} from "framer-motion";
import {useTranslation} from "react-i18next";
import breakfastBasket from "@/assets/breakfast/breakfast-basket.jpg";
import breakfastSpread from "@/assets/breakfast/breakfast-spread.jpg";
import breakfastTray from "@/assets/breakfast/breakfast-tray.jpg";
import breakfastContinental from "@/assets/breakfast/breakfast-continental.jpg";
import breakfastBrandedBasket from "@/assets/breakfast/breakfast-branded-basket.jpg";

interface CollageItem {
    src: string;
    alt: string;
    titleKey: string;
    descKey: string;
}

const BreakfastCollage = () => {
    const {t} = useTranslation();

    const items: CollageItem[] = [
        {
            src: breakfastBasket,
            alt: "Picknick mand",
            titleKey: "breakfast.collage.basket.title",
            descKey: "breakfast.collage.basket.desc"
        },
        {
            src: breakfastSpread,
            alt: "Ontbijt spread",
            titleKey: "breakfast.collage.spread.title",
            descKey: "breakfast.collage.spread.desc"
        },
        {
            src: breakfastTray,
            alt: "Ontbijt plateau",
            titleKey: "breakfast.collage.tray.title",
            descKey: "breakfast.collage.tray.desc"
        },
        {
            src: breakfastContinental,
            alt: "Continentaal ontbijt",
            titleKey: "breakfast.collage.continental.title",
            descKey: "breakfast.collage.continental.desc"
        },
        {
            src: breakfastBrandedBasket,
            alt: "Sweet Bonihu mand",
            titleKey: "breakfast.collage.branded.title",
            descKey: "breakfast.collage.branded.desc"
        },
    ];

    return (
        <section className="py-20 md:py-28">
            <div className="container mx-auto px-6">
                <motion.h2
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    className="font-serif text-3xl md:text-4xl font-light text-foreground mb-12 tracking-wide text-center"
                >
                    {t('breakfast.collageTitle')}
                </motion.h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[200px] md:auto-rows-[250px]">
                    {/* Top-left */}
                    <CollageCard item={items[0]} className="row-span-1 md:row-span-1" index={0}/>
                    {/* Center - large, spans 2 cols and 2 rows */}
                    <CollageCard item={items[1]} className="col-span-2 row-span-2" index={1}/>
                    {/* Top-right */}
                    <CollageCard item={items[2]} className="row-span-1 md:row-span-1" index={2}/>
                    {/* Bottom-left */}
                    <CollageCard item={items[3]} className="row-span-1 md:row-span-1" index={3}/>
                    {/* Bottom-right */}
                    <CollageCard item={items[4]} className="row-span-1 md:row-span-1" index={4}/>
                </div>
            </div>
        </section>
    );
};

const CollageCard = ({item, className, index}: { item: CollageItem; className?: string; index: number }) => {
    const {t} = useTranslation();

    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{delay: index * 0.1}}
            className={`group relative overflow-hidden rounded-sm cursor-pointer ${className}`}
        >
            <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
            />
            {/* Hover overlay */}
            <div
                className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/60 transition-all duration-400 flex items-center justify-center text-center p-4 md:p-6">
                <div
                    className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                    <h3 className="font-serif text-lg md:text-xl font-light text-cream tracking-wide mb-1">
                        {t(item.titleKey)}
                    </h3>
                    <p className="font-sans text-xs md:text-sm text-cream/80">
                        {t(item.descKey)}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default BreakfastCollage;