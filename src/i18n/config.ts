import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import nlTranslation from '@/locales/nl/translation.json';
import enTranslation from '@/locales/en/translation.json';
import frTranslation from '@/locales/fr/translation.json';

export const languages = [
    {code: 'nl', name: 'Nederlands', flag: '🇳🇱'},
    {code: 'en', name: 'English', flag: '🇬🇧'},
    {code: 'fr', name: 'Français', flag: '🇫🇷'},
] as const;

export type LanguageCode = typeof languages[number]['code'];

export const defaultLanguage: LanguageCode = 'nl';

// Route mappings for each language
export const routeMappings: Record<LanguageCode, Record<string, string>> = {
    nl: {
        home: '/',
        loft: '/de-loft',
        midsomer: '/midsomer',
        romantic: '/romantisch-pakket',
        contact: '/contact',
        blog: '/blog',
        privacy: '/privacy-policy',
    },
    en: {
        home: '/en',
        loft: '/en/the-loft',
        midsomer: '/en/midsomer',
        romantic: '/en/romantic-package',
        contact: '/en/contact',
        blog: '/en/blog',
        privacy: '/en/privacy-policy',
    },
    fr: {
        home: '/fr',
        loft: '/fr/le-loft',
        midsomer: '/fr/midsomer',
        romantic: '/fr/forfait-romantique',
        contact: '/fr/contact',
        blog: '/fr/blog',
        privacy: '/fr/politique-de-confidentialite',
    },
};

// Reverse mapping to get route key from path
export const getRouteKeyFromPath = (path: string): string => {
    for (const lang of Object.keys(routeMappings) as LanguageCode[]) {
        for (const [key, route] of Object.entries(routeMappings[lang])) {
            if (route === path) {
                return key;
            }
        }
    }
    return 'home';
};

// Get language from URL path
export const getLanguageFromPath = (path: string): LanguageCode => {
    if (path.startsWith('/en')) return 'en';
    if (path.startsWith('/fr')) return 'fr';
    return 'nl';
};

i18n.use(initReactI18next).init({
    resources: {
        nl: {translation: nlTranslation},
        en: {translation: enTranslation},
        fr: {translation: frTranslation},
    },
    lng: defaultLanguage,
    fallbackLng: defaultLanguage,
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;