import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLanguageSync } from "@/hooks/useLanguageSync";
import { useLocalizedPath } from "@/hooks/useLocalizedPath";

const NotFound = () => {
  useLanguageSync();
  const location = useLocation();
  const { t } = useTranslation();
  const { getPath } = useLocalizedPath();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">{t('notFound.title')}</h1>
        <p className="mb-4 text-xl text-muted-foreground">{t('notFound.message')}</p>
        <Link to={getPath('home')} className="text-primary underline hover:text-primary/90">
          {t('notFound.backHome')}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
