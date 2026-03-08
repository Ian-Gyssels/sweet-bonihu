import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import {useLanguageSync} from "@/hooks/useLanguageSync";
import {useLocalizedPath} from "@/hooks/useLocalizedPath";
import {useEffect} from "react";
import {useTranslation} from "react-i18next";

const bookingUrls = {
    general: {
        nl: 'https://bookingengine.mylighthouse.com/sweet-bonihu-brugge?Language=nl-NL',
        en: 'https://bookingengine.mylighthouse.com/sweet-bonihu-brugge?Language=en-GB',
        fr: 'https://bookingengine.mylighthouse.com/sweet-bonihu-brugge?Language=fr-FR',
    },
    loft: {
        nl: 'https://bookingengine.mylighthouse.com/sweet-bonihu-brugge?Language=nl-NL&Room=44943',
        en: 'https://bookingengine.mylighthouse.com/sweet-bonihu-brugge?Language=en-GB&Room=44943',
        fr: 'https://bookingengine.mylighthouse.com/sweet-bonihu-brugge?Language=fr-FR&Room=44943',
    },
    midsomer: {
        nl: 'https://bookingengine.mylighthouse.com/sweet-bonihu-brugge?Language=nl-NL&Room=44942',
        en: 'https://bookingengine.mylighthouse.com/sweet-bonihu-brugge?Language=en-GB&Room=44942',
        fr: 'https://bookingengine.mylighthouse.com/sweet-bonihu-brugge?Language=fr-FR&Room=44942',
    },
};

interface BookingProps {
    room?: 'loft' | 'midsomer';
}

const Booking = ({room}: BookingProps) => {
    useLanguageSync();
    const {currentLang} = useLocalizedPath();
    const {t} = useTranslation();

    const key = room || 'general';
    const url = bookingUrls[key][currentLang];

    useEffect(() => {
        window.location.replace(url);
    }, [url]);

    return (
        <div className="bg-background font-sans">
            <SEOHead
                titleKey={`meta.booking${room ? `.${room}` : ''}.title`}
                descriptionKey={`meta.booking${room ? `.${room}` : ''}.description`}
                pageKey="home"
            />
            <Header/>
            <main className="pt-20 flex items-center justify-center min-h-screen">
                <p className="text-muted-foreground">{t('booking.redirect')}</p>
            </main>
            <Footer/>
        </div>
    );
};

export default Booking;