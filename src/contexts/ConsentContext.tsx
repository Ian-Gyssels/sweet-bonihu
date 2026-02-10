import {createContext, type ReactNode, useContext, useEffect, useState} from 'react';
import {updateAnalyticsConsent} from '@/lib/firebase';
import {getCookie, setCookie} from '@/lib/cookies';

interface ConsentContextType {
    consent: 'granted' | 'denied' | 'undetermined';
    acceptConsent: () => void;
    declineConsent: () => void;
}

const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

export const ConsentProvider = ({children}: { children: ReactNode }) => {
    const [consent, setConsent] = useState<'granted' | 'denied' | 'undetermined'>('undetermined');

    useEffect(() => {
        // Migration: check localStorage first, then move to cookie and remove from localStorage
        const localStorageConsent = localStorage.getItem('cookie-consent');
        const cookieConsent = getCookie('cookie-consent');

        const storedConsent = cookieConsent || localStorageConsent;

        if (storedConsent === 'granted' || storedConsent === 'denied') {
            setConsent(storedConsent as 'granted' | 'denied');
            updateAnalyticsConsent(storedConsent === 'granted');

            // If it was in localStorage, move it to cookie and clean up
            if (localStorageConsent && !cookieConsent) {
                setCookie('cookie-consent', localStorageConsent);
            }
            if (localStorageConsent) {
                localStorage.removeItem('cookie-consent');
            }
        }
    }, []);

    const acceptConsent = () => {
        setConsent('granted');
        setCookie('cookie-consent', 'granted');
        updateAnalyticsConsent(true);
    };

    const declineConsent = () => {
        setConsent('denied');
        setCookie('cookie-consent', 'denied');
        updateAnalyticsConsent(false);
    };

    return (
        <ConsentContext.Provider value={{consent, acceptConsent, declineConsent}}>
            {children}
        </ConsentContext.Provider>
    );
};

export const useConsent = () => {
    const context = useContext(ConsentContext);
    if (context === undefined) {
        throw new Error('useConsent must be used within a ConsentProvider');
    }
    return context;
};
