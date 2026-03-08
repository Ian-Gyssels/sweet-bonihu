import {useLocation} from 'react-router-dom';
import {routeMappings, getLanguageFromPath, LanguageCode} from '@/i18n/config';

/**
 * Hook to get localized paths for the current language
 */
export const useLocalizedPath = () => {
    const location = useLocation();
    const currentLang = getLanguageFromPath(location.pathname) as LanguageCode;

    /**
     * Get the localized path for a route key
     */
    const getPath = (routeKey: keyof typeof routeMappings.nl): string => {
        return routeMappings[currentLang][routeKey];
    };

    /**
     * Get all paths for navigation
     */
    const getPaths = () => ({
        home: routeMappings[currentLang].home,
        loft: routeMappings[currentLang].loft,
        midsomer: routeMappings[currentLang].midsomer,
        romantic: routeMappings[currentLang].romantic,
        breakfast: routeMappings[currentLang].breakfast,
        contact: routeMappings[currentLang].contact,
        blog: routeMappings[currentLang].blog,
        privacy: routeMappings[currentLang].privacy,
        booking: routeMappings[currentLang].booking,
        bookingLoft: routeMappings[currentLang].bookingLoft,
        bookingMidsomer: routeMappings[currentLang].bookingMidsomer,
        // Admin paths (not language-specific)
        adminLogin: '/admin/login',
        adminBlog: '/admin/blog',
        adminBlogNew: '/admin/blog/new',
        adminBlogEdit: '/admin/blog/edit',
    });

    return {
        currentLang,
        getPath,
        getPaths,
    };
};

export default useLocalizedPath;