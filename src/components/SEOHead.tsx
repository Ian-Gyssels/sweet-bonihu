import {Helmet} from 'react-helmet-async';
import {useTranslation} from 'react-i18next';
import {useLocation} from 'react-router-dom';
import {routeMappings, languages, getLanguageFromPath, LanguageCode} from '@/i18n/config';

// OG images are served from public folder for absolute URL access

interface SEOHeadProps {
    titleKey?: string;
    descriptionKey?: string;
    title?: string;
    description?: string;
    pageKey: 'home' | 'loft' | 'midsomer' | 'romantic' | 'contact' | 'blog' | 'privacy';
}

// Map page keys to their respective OG images (using public path for absolute URLs)
const pageImages: Record<SEOHeadProps['pageKey'], string> = {
    home: '/og-image.jpg',
    loft: '/og-image.jpg',
    midsomer: '/og-image.jpg',
    romantic: '/og-image.jpg',
    contact: '/og-image.jpg',
    blog: '/og-image.jpg',
    privacy: '/og-image.jpg',
};

const SEOHead = ({titleKey, descriptionKey, title, description, pageKey}: SEOHeadProps) => {
    const {t} = useTranslation();
    const location = useLocation();
    const currentLang = getLanguageFromPath(location.pathname) as LanguageCode;

    const displayTitle = title || (titleKey ? t(titleKey) : '');
    const displayDescription = description || (descriptionKey ? t(descriptionKey) : '');

    // Base URL - update this when you have your production domain
    const baseUrl = 'https://sweetbonihu.be';

    // Get the route key for hreflang links
    const routeKey = pageKey === 'home' ? 'home'
        : pageKey === 'loft' ? 'loft'
            : pageKey === 'midsomer' ? 'midsomer'
                : pageKey === 'romantic' ? 'romantic'
                    : pageKey === 'privacy' ? 'privacy'
                        : 'contact';

    // Generate hreflang URLs
    const hreflangUrls = languages.map(lang => ({
        lang: lang.code,
        url: `${baseUrl}${routeMappings[lang.code][routeKey]}`,
    }));

    // Canonical URL (Dutch version is the x-default)
    const canonicalUrl = `${baseUrl}${routeMappings[currentLang][routeKey]}`;
    const defaultUrl = `${baseUrl}${routeMappings.nl[routeKey]}`;

    // Locale mappings for Open Graph
    const ogLocaleMap: Record<LanguageCode, string> = {
        nl: 'nl_BE',
        en: 'en_GB',
        fr: 'fr_FR',
    };

    // Get the OG image URL (use absolute URL for production, relative for dev)
    const ogImage = `${baseUrl}${pageImages[pageKey]}`;

    // Image dimensions (approximate for the wellness images)
    const imageWidth = '1200';
    const imageHeight = '630';

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <html lang={currentLang}/>
            <title>{displayTitle}</title>
            <meta name="description" content={displayDescription}/>

            {/* Canonical URL */}
            <link rel="canonical" href={canonicalUrl}/>

            {/* hreflang Tags for Language Alternatives */}
            {hreflangUrls.map(({lang, url}) => (
                <link key={lang} rel="alternate" hrefLang={lang} href={url}/>
            ))}
            <link rel="alternate" hrefLang="x-default" href={defaultUrl}/>

            {/* Open Graph Tags */}
            <meta property="og:title" content={displayTitle}/>
            <meta property="og:description" content={displayDescription}/>
            <meta property="og:type" content="website"/>
            <meta property="og:url" content={canonicalUrl}/>
            <meta property="og:image" content={ogImage}/>
            <meta property="og:image:width" content={imageWidth}/>
            <meta property="og:image:height" content={imageHeight}/>
            <meta property="og:image:alt" content={displayTitle}/>
            <meta property="og:locale" content={ogLocaleMap[currentLang]}/>
            <meta property="og:site_name" content={t('meta.siteName')}/>
            {languages
                .filter(lang => lang.code !== currentLang)
                .map(lang => (
                    <meta key={lang.code} property="og:locale:alternate" content={ogLocaleMap[lang.code]}/>
                ))}

            {/* Twitter Card Tags */}
            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:title" content={displayTitle}/>
            <meta name="twitter:description" content={displayDescription}/>
            <meta name="twitter:image" content={ogImage}/>
            <meta name="twitter:image:alt" content={displayTitle}/>

            {/* Additional SEO Meta Tags */}
            <meta name="robots" content="index, follow"/>
            <meta name="author" content={t('meta.siteName')}/>
        </Helmet>
    );
};

export default SEOHead;