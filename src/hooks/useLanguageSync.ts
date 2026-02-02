import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getLanguageFromPath } from '@/i18n/config';

/**
 * Hook to sync i18next language with URL path
 */
export const useLanguageSync = () => {
  const location = useLocation();
  const { i18n } = useTranslation();
  
  useEffect(() => {
    const langFromPath = getLanguageFromPath(location.pathname);
    if (i18n.language !== langFromPath) {
      i18n.changeLanguage(langFromPath);
    }
  }, [location.pathname, i18n]);
};

export default useLanguageSync;
