import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useLocalizedPath} from "@/hooks/useLocalizedPath";
import {SiFacebook, SiInstagram} from "@icons-pack/react-simple-icons";

const Footer = () => {
    const {t} = useTranslation();
    const {getPaths} = useLocalizedPath();
    const paths = getPaths();

    return (
        <footer className="py-16 bg-foreground text-background">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-12 mb-12">
                    <div>
                        <h3 className="font-serif text-2xl font-light mb-4 tracking-wide">Sweet Bonihu</h3>
                        <p className="font-sans text-sm text-background/70 leading-relaxed">
                            {t('footer.description')}
                        </p>
                    </div>
                    <div>
                        <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-champagne mb-4">
                            {t('footer.navigation')}
                        </h4>
                        <nav className="flex flex-col gap-2">
                            <Link to={paths.home}
                                  className="font-sans text-sm text-background/70 hover:text-background transition-colors">
                                {t('nav.home')}
                            </Link>
                            <Link to={paths.loft}
                                  className="font-sans text-sm text-background/70 hover:text-background transition-colors">
                                {t('nav.theLoft')}
                            </Link>
                            <Link to={paths.midsomer}
                                  className="font-sans text-sm text-background/70 hover:text-background transition-colors">
                                {t('nav.midsomer')}
                            </Link>
                            <Link to={paths.romantic}
                                  className="font-sans text-sm text-background/70 hover:text-background transition-colors">
                                {t('nav.romanticPackage')}
                            </Link>
                            <Link to={paths.blog}
                                  className="font-sans text-sm text-background/70 hover:text-background transition-colors">
                                {t('nav.blog')}
                            </Link>
                            <Link to={paths.contact}
                                  className="font-sans text-sm text-background/70 hover:text-background transition-colors">
                                {t('nav.contact')}
                            </Link>
                            <Link to={paths.privacy}
                                  className="font-sans text-sm text-background/70 hover:text-background transition-colors">
                                {t('footer.privacy')}
                            </Link>
                        </nav>
                    </div>
                    <div>
                        <h4 className="font-sans text-xs uppercase tracking-[0.2em] text-champagne mb-4">
                            {t('footer.contactTitle')}
                        </h4>
                        <div className="font-sans text-sm text-background/70 space-y-2">
                            <p>{t('footer.location')}</p>
                            <p>info@sweetbonihu.be</p>
                        </div>
                        <div className="flex gap-4 mt-6">
                            <a
                                href="https://www.facebook.com/sweetbonihu"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-background/50 hover:text-champagne transition-colors"
                                aria-label="Facebook"
                            >
                                <SiFacebook/>
                            </a>
                            <a
                                href="https://www.instagram.com/wellnesssweetbonihu"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-background/50 hover:text-champagne transition-colors"
                                aria-label="Instagram"
                            >
                                <SiInstagram/>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="pt-8 border-t border-background/10 text-center">
                    <p className="font-sans text-xs text-background/50">
                        © {new Date().getFullYear()} {t('footer.copyright')}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
