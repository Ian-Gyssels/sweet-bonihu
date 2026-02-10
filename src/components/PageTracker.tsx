import {useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import {logPageView} from '@/lib/firebase';
import {useConsent} from '@/contexts/ConsentContext';

const PageTracker = () => {
    const location = useLocation();
    const {consent} = useConsent();

    useEffect(() => {
        if (consent === 'granted') {
            // Delay slightly to ensure document.title is updated by react-helmet-async
            const timer = setTimeout(() => {
                logPageView(location.pathname + location.search);
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [location, consent]);

    return null;
};

export default PageTracker;
