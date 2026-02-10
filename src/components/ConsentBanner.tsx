import React from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {useConsent} from '@/contexts/ConsentContext';
import {Button} from '@/components/ui/button';
import {useTranslation} from 'react-i18next';
import {useLocalizedPath} from '@/hooks/useLocalizedPath';

const ConsentBanner = () => {
    const {consent, acceptConsent, declineConsent} = useConsent();
    const {t} = useTranslation();
    const {getPaths} = useLocalizedPath();
    const paths = getPaths();

    if (consent !== 'undetermined') return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{y: 100, opacity: 0}}
                animate={{y: 0, opacity: 1}}
                exit={{y: 100, opacity: 0}}
                className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-background border-t shadow-lg md:p-6"
            >
                <div
                    className="container max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-muted-foreground text-center md:text-left">
                        <p>
                            {t('cookies.description')}{' '}
                            <a href={paths.privacy} className="underline hover:text-primary transition-colors">
                                {t('cookies.learnMore')}
                            </a>
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="ghost" size="sm" onClick={declineConsent}>
                            {t('cookies.decline')}
                        </Button>
                        <Button size="sm" onClick={acceptConsent}
                                className="bg-primary text-primary-foreground hover:bg-primary/90">
                            {t('cookies.accept')}
                        </Button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ConsentBanner;
