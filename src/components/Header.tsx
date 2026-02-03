import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Logo from "@/assets/logo.png";


const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation();
    const { getPaths, currentLang } = useLocalizedPath();
    const paths = getPaths();

    const navLinks = [
        { name: t('nav.home'), path: paths.home },
        { name: t('nav.theLoft'), path: paths.loft },
        { name: t('nav.midsomer'), path: paths.midsomer },
        { name: t('nav.romanticPackage'), path: paths.romantic },
        { name: t('nav.blog'), path: paths.blog },
        { name: t('nav.contact'), path: paths.contact },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                <Link to={paths.home} className="font-serif text-xl md:text-2xl font-medium text-foreground tracking-wide flex items-center gap-3 font-serif text-xl font-medium">
                
           <img className="h-14 w-auto" src={Logo} alt="Logo" />
            Sweet Bonihu
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className="font-sans text-sm font-medium tracking-wide transition-colors text-muted-foreground hover:text-foreground"
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                <div className="hidden lg:flex items-center gap-4">
                    <LanguageSwitcher />
                    <Button asChild>
                        <a href="https://www.wellnesssweetbonihu.com/" target="_blank" rel="noopener noreferrer">
                            {t('nav.bookNow')}
                        </a>
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <div className="lg:hidden flex items-center gap-2">
                    <LanguageSwitcher />
                    <button
                        className="p-2 text-foreground"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-background border-b border-border overflow-hidden"
                    >
                        <nav className="container mx-auto px-6 py-4 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className="font-sans text-base font-medium tracking-wide transition-colors text-muted-foreground hover:text-foreground"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Button asChild className="mt-2 w-full">
                                <a href="https://www.wellnesssweetbonihu.com/" target="_blank" rel="noopener noreferrer">
                                    {t('nav.bookNow')}
                                </a>
                            </Button>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;