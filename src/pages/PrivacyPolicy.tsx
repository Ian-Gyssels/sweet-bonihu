import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import {useLanguageSync} from "@/hooks/useLanguageSync";
import {useTranslation} from "react-i18next";

const PrivacyPolicy = () => {
    useLanguageSync();
    const {t, i18n} = useTranslation();

    const isEn = i18n.language === 'en';
    const isFr = i18n.language === 'fr';

    return (
        <div className="min-h-screen bg-background font-sans">
            <SEOHead
                title={`${t('footer.privacy')} | Sweet Bonihu`}
                description={t('meta.home.description')}
                pageKey="privacy"
            />
            <Header/>
            <main className="container mx-auto px-6 py-24 max-w-4xl">
                <h1 className="font-serif text-4xl mb-8">{t('footer.privacy')}</h1>

                <div className="prose prose-slate max-w-none">
                    {isEn ? (
                        <section className="space-y-6">
                            <p><strong>Last updated: February 10, 2026</strong></p>

                            <h2 className="text-2xl font-serif">1. Introduction</h2>
                            <p>Sweet Bonihu (hereinafter: "we" or "us") attaches great importance to your privacy and
                                the protection of your personal data. In this privacy policy, we explain which personal
                                data we collect when you visit our website, why we do so, and what rights you have under
                                the General Data Protection Regulation (GDPR).</p>
                            <p>This privacy policy applies to all visitors to our website.</p>

                            <h2 className="text-2xl font-serif">2. Who is responsible for processing?</h2>
                            <p>Sweet Bonihu is the data controller within the meaning of the GDPR.</p>
                            <div className="bg-muted p-4 rounded-lg">
                                <p><strong>Contact details:</strong><br/>
                                    Name: Sweet Bonihu<br/>
                                    Email: info@sweetbonihu.be<br/>
                                    Country of establishment: Belgium</p>
                            </div>

                            <h2 className="text-2xl font-serif">3. Personal data we process</h2>
                            <p>We only process personal data that is necessary for the functioning and analysis of our
                                website.</p>
                            <p>Through our website, the following data may be processed:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>IP address (anonymized where possible)</li>
                                <li>Information about your device and browser (such as browser type and operating
                                    system)
                                </li>
                                <li>Pages visited and click behavior</li>
                                <li>Date and time of your visit</li>
                            </ul>
                            <p>We do not collect this data to identify individual visitors.</p>

                            <h2 className="text-2xl font-serif">4. Use of Google Analytics</h2>
                            <p>We use <strong>Google Analytics</strong> to gain insight into the use of our website and
                                to improve the user experience.</p>
                            <p>Google Analytics may process personal data such as your IP address. We have taken the
                                following measures:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>IP addresses are anonymized</li>
                                <li>A processing agreement has been concluded with Google</li>
                                <li>Data is not used for advertising purposes</li>
                            </ul>

                            <h2 className="text-2xl font-serif">5. Cookies</h2>
                            <p>Our website uses cookies.</p>
                            <p>A cookie is a small text file that is stored on your device when you first visit this
                                website.</p>

                            <h3 className="text-xl font-serif">5.1 Analytical cookies</h3>
                            <p>We only use <strong>analytical cookies</strong> via Google Analytics.</p>
                            <p>These cookies are <strong>only placed after you have given explicit consent</strong> via
                                our cookie banner.</p>
                            <p>We use <strong>Google Consent Mode v2</strong>. This means that:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Google Analytics does not place cookies without your consent</li>
                                <li>Upon refusal, no personal data is processed</li>
                            </ul>

                            <h2 className="text-2xl font-serif">6. Legal basis for processing</h2>
                            <p>We process your personal data based on the following legal basis:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Consent</strong> (Article 6(1)(a) GDPR)</li>
                            </ul>
                            <p>You can withdraw your consent at any time through your browser's cookie settings or by
                                deleting your cookies.</p>

                            <h2 className="text-2xl font-serif">7. Retention periods</h2>
                            <p>We do not store personal data longer than necessary for the purposes for which they are
                                processed.</p>
                            <p>Google Analytics data is stored for a maximum of <strong>14 months</strong> and then
                                automatically deleted.</p>

                            <h2 className="text-2xl font-serif">8. Transfer of data outside the EU</h2>
                            <p>Google Analytics may process personal data outside the European Economic Area (EEA),
                                particularly in the United States.</p>
                            <p>Google uses <strong>Standard Contractual Clauses (SCCs)</strong> approved by the European
                                Commission to ensure an appropriate level of protection.</p>

                            <h2 className="text-2xl font-serif">9. Your rights</h2>
                            <p>Under the GDPR, you have the following rights:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Right of access to your personal data</li>
                                <li>Right to rectification of incorrect data</li>
                                <li>Right to erasure of your data</li>
                                <li>Right to restriction of processing</li>
                                <li>Right to object to the processing</li>
                                <li>Right to data portability</li>
                            </ul>
                            <p>In addition, you have the right to lodge a complaint with the data protection supervisory
                                authority in your country.</p>
                            <p>Do you want to exercise your rights? Please contact us via the email address mentioned in
                                this privacy policy.</p>

                            <h2 className="text-2xl font-serif">10. Security of personal data</h2>
                            <p>We take appropriate technical and organizational measures to protect your personal data
                                against loss, misuse, and unauthorized access.</p>

                            <h2 className="text-2xl font-serif">11. Changes to this privacy policy</h2>
                            <p>We reserve the right to change this privacy policy. Changes will be published on this
                                page. We recommend that you consult this privacy policy regularly.</p>
                        </section>
                    ) : isFr ? (
                        <section className="space-y-6">
                            <p><strong>Dernière mise à jour : 10 février 2026</strong></p>

                            <h2 className="text-2xl font-serif">1. Introduction</h2>
                            <p>Sweet Bonihu (ci-après : "nous") accorde une grande importance à votre vie privée et à la
                                protection de vos données personnelles. Dans cette politique de confidentialité, nous
                                expliquons quelles données personnelles nous collectons lorsque vous visitez notre site
                                web, pourquoi nous le faisons et quels droits vous avez en vertu du Règlement Général
                                sur la Protection des Données (RGPD).</p>
                            <p>Cette politique de confidentialité s'applique à tous les visiteurs de notre site web.</p>

                            <h2 className="text-2xl font-serif">2. Qui est responsable du traitement ?</h2>
                            <p>Sweet Bonihu est le responsable du traitement au sens du RGPD.</p>
                            <div className="bg-muted p-4 rounded-lg">
                                <p><strong>Coordonnées :</strong><br/>
                                    Nom : Sweet Bonihu<br/>
                                    E-mail : info@sweetbonihu.be<br/>
                                    Pays d'établissement : Belgique</p>
                            </div>

                            <h2 className="text-2xl font-serif">3. Données personnelles que nous traitons</h2>
                            <p>Nous ne traitons que les données personnelles nécessaires au fonctionnement et à
                                l'analyse de notre site web.</p>
                            <p>Via notre site web, les données suivantes peuvent être traitées :</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Adresse IP (anonymisée dans la mesure du possible)</li>
                                <li>Informations sur votre appareil et votre navigateur (telles que le type de
                                    navigateur et le système d'exploitation)
                                </li>
                                <li>Pages visitées et comportement de clic</li>
                                <li>Date et heure de votre visite</li>
                            </ul>
                            <p>Nous ne collectons pas ces données pour identifier des visiteurs individuels.</p>

                            <h2 className="text-2xl font-serif">4. Utilisation de Google Analytics</h2>
                            <p>Nous utilisons <strong>Google Analytics</strong> pour mieux comprendre l'utilisation de
                                notre site web et pour améliorer l'expérience utilisateur.</p>
                            <p>Google Analytics peut traiter des données personnelles telles que votre adresse IP. Nous
                                avons pris les mesures suivantes :</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Les adresses IP sont anonymisées</li>
                                <li>Un accord de traitement a été conclu avec Google</li>
                                <li>Les données ne sont pas utilisées à des fins publicitaires</li>
                            </ul>

                            <h2 className="text-2xl font-serif">5. Cookies</h2>
                            <p>Notre site web utilise des cookies.</p>
                            <p>Un cookie est un petit fichier texte stocké sur votre appareil lors de votre première
                                visite sur ce site web.</p>

                            <h3 className="text-xl font-serif">5.1 Cookies analytiques</h3>
                            <p>Nous utilisons uniquement des <strong>cookies analytiques</strong> via Google
                                Analytics.</p>
                            <p>Ces cookies ne sont <strong>placés qu'après que vous ayez donné votre consentement
                                explicite</strong> via notre bannière de cookies.</p>
                            <p>Nous utilisons le <strong>Google Consent Mode v2</strong>. Cela signifie que :</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Google Analytics ne place pas de cookies sans votre consentement</li>
                                <li>En cas de refus, aucune donnée personnelle n'est traitée</li>
                            </ul>

                            <h2 className="text-2xl font-serif">6. Base juridique du traitement</h2>
                            <p>Nous traitons vos données personnelles sur la base de la base juridique suivante :</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Consentement</strong> (article 6, paragraphe 1, point a) du RGPD)</li>
                            </ul>
                            <p>Vous pouvez retirer votre consentement à tout moment via les paramètres de cookies de
                                votre navigateur ou en supprimant vos cookies.</p>

                            <h2 className="text-2xl font-serif">7. Délais de conservation</h2>
                            <p>Nous ne conservons pas les données personnelles plus longtemps que nécessaire aux fins
                                pour lesquelles elles sont traitées.</p>
                            <p>Les données de Google Analytics sont conservées pendant un maximum de <strong>14
                                mois</strong> puis automatiquement supprimées.</p>

                            <h2 className="text-2xl font-serif">8. Transfert de données hors de l'UE</h2>
                            <p>Google Analytics peut traiter des données personnelles en dehors de l'Espace Économique
                                Européen (EEE), notamment aux États-Unis.</p>
                            <p>Google utilise des <strong>Clauses Contractuelles Types (CCT)</strong> approuvées par la
                                Commission européenne pour garantir un niveau de protection approprié.</p>

                            <h2 className="text-2xl font-serif">9. Vos droits</h2>
                            <p>En vertu du RGPD, vous disposez des droits suivants :</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Droit d'accès à vos données personnelles</li>
                                <li>Droit de rectification des données inexactes</li>
                                <li>Droit à l'effacement de vos données</li>
                                <li>Droit à la limitation du traitement</li>
                                <li>Droit d'opposition au traitement</li>
                                <li>Droit à la portabilité des données</li>
                            </ul>
                            <p>De plus, vous avez le droit de déposer une plainte auprès de l'autorité de protection des
                                données de votre pays.</p>
                            <p>Vous souhaitez exercer vos droits ? Veuillez nous contacter via l'adresse e-mail
                                mentionnée dans cette politique de confidentialité.</p>

                            <h2 className="text-2xl font-serif">10. Sécurité des données personnelles</h2>
                            <p>Nous prenons les mesures techniques et organisationnelles appropriées pour protéger vos
                                données personnelles contre la perte, l'utilisation abusive et l'accès non autorisé.</p>

                            <h2 className="text-2xl font-serif">11. Modifications de cette politique de
                                confidentialité</h2>
                            <p>Nous nous réservons le droit de modifier cette politique de confidentialité. Les
                                modifications seront publiées sur cette page. Nous vous recommandons de consulter
                                régulièrement cette politique de confidentialité.</p>
                        </section>
                    ) : (
                        <section className="space-y-6">
                            <p><strong>Laatst bijgewerkt: 10 februari 2026</strong></p>

                            <h2 className="text-2xl font-serif">1. Inleiding</h2>
                            <p>Sweet Bonihu (hierna: "wij" of "ons") hecht veel waarde aan uw privacy en de bescherming
                                van uw persoonsgegevens. In dit privacybeleid leggen wij uit welke persoonsgegevens wij
                                verzamelen wanneer u onze website bezoekt, waarom wij dat doen en welke rechten u heeft
                                onder de Algemene Verordening Gegevensbescherming (AVG / GDPR).</p>
                            <p>Dit privacybeleid is van toepassing op alle bezoekers van onze website.</p>

                            <h2 className="text-2xl font-serif">2. Wie is verantwoordelijk voor de verwerking?</h2>
                            <p>Sweet Bonihu is de verwerkingsverantwoordelijke in de zin van de AVG.</p>
                            <div className="bg-muted p-4 rounded-lg">
                                <p><strong>Contactgegevens:</strong><br/>
                                    Naam: Sweet Bonihu<br/>
                                    E-mail: info@sweetbonihu.be<br/>
                                    Vestigingsland: België</p>
                            </div>

                            <h2 className="text-2xl font-serif">3. Persoonsgegevens die wij verwerken</h2>
                            <p>Wij verwerken uitsluitend persoonsgegevens die noodzakelijk zijn voor het functioneren en
                                analyseren van onze website.</p>
                            <p>Via onze website kunnen de volgende gegevens worden verwerkt:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>IP-adres (geanonimiseerd waar mogelijk)</li>
                                <li>Informatie over uw apparaat en browser (zoals type browser en besturingssysteem)
                                </li>
                                <li>Bezochte pagina’s en klikgedrag</li>
                                <li>Datum en tijd van uw bezoek</li>
                            </ul>
                            <p>Wij verzamelen deze gegevens niet om individuele bezoekers te identificeren.</p>

                            <h2 className="text-2xl font-serif">4. Gebruik van Google Analytics</h2>
                            <p>Wij maken gebruik van <strong>Google Analytics</strong> om inzicht te krijgen in het
                                gebruik van onze website en om de gebruikerservaring te verbeteren.</p>
                            <p>Google Analytics kan persoonsgegevens verwerken zoals uw IP-adres. Wij hebben de volgende
                                maatregelen genomen:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>IP-adressen worden geanonimiseerd</li>
                                <li>Er is een verwerkersovereenkomst met Google afgesloten</li>
                                <li>Gegevens worden niet gebruikt voor advertentiedoeleinden</li>
                            </ul>

                            <h2 className="text-2xl font-serif">5. Cookies</h2>
                            <p>Onze website maakt gebruik van cookies.</p>
                            <p>Een cookie is een klein tekstbestand dat bij het eerste bezoek aan deze website wordt
                                opgeslagen op uw apparaat.</p>

                            <h3 className="text-xl font-serif">5.1 Analytische cookies</h3>
                            <p>Wij gebruiken uitsluitend <strong>analytische cookies</strong> via Google Analytics.</p>
                            <p>Deze cookies worden <strong>alleen geplaatst nadat u hier expliciet toestemming voor
                                heeft
                                gegeven</strong> via onze cookiebanner.</p>
                            <p>Wij maken gebruik van <strong>Google Consent Mode v2</strong>. Dit betekent dat:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Google Analytics geen cookies plaatst zonder uw toestemming</li>
                                <li>Bij weigering worden geen persoonsgegevens verwerkt</li>
                            </ul>

                            <h2 className="text-2xl font-serif">6. Rechtsgrond van de verwerking</h2>
                            <p>Wij verwerken uw persoonsgegevens op basis van de volgende rechtsgrond:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Toestemming</strong> (artikel 6 lid 1 sub a AVG)</li>
                            </ul>
                            <p>U kunt uw toestemming op elk moment intrekken via de cookie-instellingen van uw browser
                                of door uw cookies te verwijderen.</p>

                            <h2 className="text-2xl font-serif">7. Bewaartermijnen</h2>
                            <p>Wij bewaren persoonsgegevens niet langer dan noodzakelijk voor de doeleinden waarvoor zij
                                worden verwerkt.</p>
                            <p>Google Analytics-gegevens worden maximaal <strong>14 maanden</strong> bewaard en daarna
                                automatisch verwijderd.</p>

                            <h2 className="text-2xl font-serif">8. Doorgifte van gegevens buiten de EU</h2>
                            <p>Google Analytics kan persoonsgegevens verwerken buiten de Europese Economische Ruimte
                                (EER), met name in de Verenigde Staten.</p>
                            <p>Google maakt hierbij gebruik van door de Europese Commissie
                                goedgekeurde <strong>Standard Contractual Clauses (SCC’s)</strong> om een passend
                                beschermingsniveau te waarborgen.</p>

                            <h2 className="text-2xl font-serif">9. Uw rechten</h2>
                            <p>U heeft onder de AVG de volgende rechten:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Recht op inzage van uw persoonsgegevens</li>
                                <li>Recht op rectificatie van onjuiste gegevens</li>
                                <li>Recht op verwijdering van uw gegevens</li>
                                <li>Recht op beperking van de verwerking</li>
                                <li>Recht op bezwaar tegen de verwerking</li>
                                <li>Recht op gegevensoverdraagbaarheid</li>
                            </ul>
                            <p>Daarnaast heeft u het recht om een klacht in te dienen bij de toezichthoudende autoriteit
                                voor gegevensbescherming in uw land.</p>
                            <p>Wilt u gebruikmaken van uw rechten? Neem dan contact met ons op via het e-mailadres
                                vermeld in dit privacybeleid.</p>

                            <h2 className="text-2xl font-serif">10. Beveiliging van persoonsgegevens</h2>
                            <p>Wij nemen passende technische en organisatorische maatregelen om uw persoonsgegevens te
                                beschermings tegen verlies, misbruik en onbevoegde toegang.</p>

                            <h2 className="text-2xl font-serif">11. Wijzigingen in dit privacybeleid</h2>
                            <p>Wij behouden ons het recht voor dit privacybeleid te wijzigen. Wijzigingen worden op deze
                                pagina gepubliceerd. Wij raden u aan dit privacybeleid regelmatig te raadplegen.</p>
                        </section>
                    )}
                </div>
            </main>
            <Footer/>
        </div>
    );
};

export default PrivacyPolicy;
