import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getAnalytics, setConsent, logEvent} from 'firebase/analytics';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export const updateAnalyticsConsent = (granted: boolean) => {
    if (analytics) {
        setConsent({
            analytics_storage: granted ? 'granted' : 'denied',
            ad_storage: granted ? 'granted' : 'denied',
            ad_user_data: granted ? 'granted' : 'denied',
            ad_personalization: granted ? 'granted' : 'denied',
        });
    }
};

export const logPageView = (page_path: string) => {
    if (analytics) {
        logEvent(analytics, 'page_view', {
            page_path,
            page_location: window.location.href,
            page_title: document.title,
        });
    }
};
