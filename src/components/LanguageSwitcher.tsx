import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { 
  languages, 
  routeMappings, 
  getLanguageFromPath, 
  getRouteKeyFromPath,
  LanguageCode 
} from '@/i18n/config';

const LanguageSwitcher = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  
  const currentLang = getLanguageFromPath(location.pathname);
  const currentLanguage = languages.find(l => l.code === currentLang);
  
  const switchLanguage = (newLang: LanguageCode) => {
    if (newLang === currentLang) return;
    
    // Get the current route key
    const routeKey = getRouteKeyFromPath(location.pathname);
    
    // Get the new path for the selected language
    const newPath = routeMappings[newLang][routeKey] || routeMappings[newLang].home;
    
    // Change i18next language
    i18n.changeLanguage(newLang);
    
    // Navigate to the new path
    navigate(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLanguage?.flag} {currentLanguage?.code.toUpperCase()}</span>
          <span className="sm:hidden">{currentLanguage?.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => switchLanguage(lang.code)}
            className={currentLang === lang.code ? 'bg-muted' : ''}
          >
            <span className="mr-2">{lang.flag}</span>
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
