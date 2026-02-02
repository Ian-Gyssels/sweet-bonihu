export interface BlogPost {
    id: string;
    slug: string;
    category: 'travel' | 'wellness' | 'news';
    date: string;
    image: string;
    title: string;
    excerpt: string;
    content: string;
}

export const blogPosts: BlogPost[] = [
    {
        id: '1',
        slug: 'verborgen-parels-brugge',
        category: 'travel',
        date: '2024-01-15',
        image: '/og-image.jpg',
        title: 'Verborgen Parels van Brugge',
        excerpt: 'Ontdek de minder bekende, maar even betoverende plekjes van deze historische stad. Van geheime tuinen tot authentieke lokale eetgelegenheden.',
        content: `
## De Magie Voorbij de Toeristische Routes

Brugge staat bekend om zijn iconische bezienswaardigheden: de Markt, het Belfort, en de romantische reien. Maar de échte magie van deze middeleeuwse stad ontvouwt zich vaak in de rustige steegjes en verborgen hoekjes die de meeste bezoekers missen.

### Geheime Tuinen

**Het Begijnhof** is wellicht het bekendste rustpunt, maar wist u dat er in de wijk rond de Sint-Annakerk verschillende verborgen kloostertuinen zijn die toegankelijk zijn voor het publiek? Vraag bij de lokale kerken naar de openingstijden.

**De Hof Sebrechts Park** is een kleine groene oase die perfect is voor een middagpauze met een goed boek. Gelegen net buiten het drukke centrum, biedt dit parkje een authentieke Brugse sfeer zonder de drukte.

### Culinaire Ontdekkingen

Vergeet de restaurants aan de Markt en waag u in de zijstraten. **'t Minnewater** nabij het gelijknamige meer serveert traditionele Vlaamse gerechten voor een fractie van de prijs elders. De mosselen hier zijn legendarisch onder de lokale bevolking.

Voor de beste koffie moet u naar **Café Vlissinghe**, het oudste café van Brugge (sinds 1515!). De sfeer hier is ongeëvenaard en het terras aan de achterzijde is een goed bewaard geheim.

### Wandeltips

Begin uw wandeling vroeg in de ochtend, wanneer de stad nog slaapt. Loop via de Sint-Jakobstraat naar de minder bekende Sint-Jakobskerk, waar u vaak alleen bent met de stilte en de prachtige glasramen.

De **Langerei** is misschien wel de mooiste wandelroute van Brugge. Deze kade langs de reien is vooral bij zonsondergang adembenemend mooi.

### Praktische Tips

- Huur een fiets voor een dag en verken de omgeving van Damme
- Bezoek de weekmarkt op woensdag voor lokale producten
- Vraag ons team om persoonlijke aanbevelingen tijdens uw verblijf

Bij Sweet Bonihu helpen we u graag om deze verborgen parels te ontdekken. Onze locatie biedt de perfecte uitvalsbasis voor uw verkenningen.
    `.trim(),
    },
    {
        id: '2',
        slug: 'kunst-van-ontspanning',
        category: 'wellness',
        date: '2024-01-08',
        image: '/og-image.jpg',
        title: 'De Kunst van Ontspanning',
        excerpt: 'Tips en inzichten over hoe u het meeste uit uw wellness-ervaring haalt. Van de voordelen van infrarood sauna tot de perfecte jacuzzi-routine.',
        content: `
## Waarom Wellness Essentieel Is

In onze hectische wereld is bewust ontspannen geen luxe, maar een noodzaak. Bij Sweet Bonihu geloven we dat echte ontspanning begint met de juiste omgeving en eindigt met een vernieuwd gevoel van welzijn.

### De Voordelen van Infrarood Sauna

Onze Loft suite beschikt over een hoogwaardige infrarood sauna, en de gezondheidsvoordelen zijn indrukwekkend:

**Diepere Ontspanning**: Anders dan traditionele sauna's, dringt infrarood warmte dieper door in de spieren, wat resulteert in een grondiger ontspanning van gespannen weefsel.

**Betere Bloedsomloop**: De zachte warmte stimuleert de bloedcirculatie, wat helpt bij herstel na lichamelijke inspanning en het verminderen van spierpijn.

**Huidverbetering**: Regelmatig gebruik kan bijdragen aan een stralendere huid door het openen van poriën en het stimuleren van de natuurlijke reinigingsprocessen.

**Stressverlichting**: De combinatie van warmte en rust helpt het stresshormoon cortisol te verlagen.

### De Perfecte Jacuzzi-Routine

Onze privé jacuzzi biedt het ultieme ontspanningsmoment. Hier zijn enkele tips voor de beste ervaring:

1. **Timing**: 20-30 minuten is ideaal. Langer kan uitdrogen werken.
2. **Temperatuur**: Wij houden het water op een comfortabele 37-38°C.
3. **Hydratatie**: Drink voldoende water voor én na uw sessie.
4. **Combineer**: Wissel af tussen jacuzzi en sauna voor het beste effect.

### Mindfulness in Uw Suite

Naast onze wellness-faciliteiten, raden we aan om enkele mindfulness-technieken te integreren:

- Begin uw ochtend met 5 minuten ademhalingsoefeningen bij het raam
- Geniet bewust van uw ontbijt, zonder telefoon
- Eindig uw dag met een korte meditatie voordat u de jacuzzi in gaat

### Het Ontspanningsritueel

Wij adviseren het volgende ritueel voor maximale ontspanning:

1. Aankomst: Neem een verfrissende douche
2. Sauna: 15-20 minuten in de infrarood sauna
3. Afkoeling: Korte rust met een glas water
4. Jacuzzi: 20-30 minuten bubbelbad
5. Rust: Ontspan op bed met een goed boek

Bij Sweet Bonihu staat uw welzijn centraal. Onze suites zijn ontworpen om dit ritueel perfect te faciliteren.
    `.trim(),
    },
    {
        id: '3',
        slug: 'nieuw-seizoen-sweet-bonihu',
        category: 'news',
        date: '2024-01-01',
        image: '/og-image.jpg',
        title: 'Nieuw Seizoen bij Sweet Bonihu',
        excerpt: 'Welkom in 2024! Ontdek onze vernieuwingen, speciale arrangementen en wat u dit jaar kunt verwachten bij uw verblijf.',
        content: `
## Welkom in een Nieuw Jaar van Verwennerij

Het team van Sweet Bonihu wenst u een prachtig 2024! Met het nieuwe jaar komen ook nieuwe mogelijkheden om u nog beter te verwennen tijdens uw verblijf in Brugge.

### Wat is er nieuw?

**Vernieuwd Ontbijt**: We hebben ons ontbijtaanbod uitgebreid met nog meer lokale en biologische producten. Geniet van vers gebakken croissants van de bakker om de hoek, huisgemaakte confituur en lokale kazen.

**Romantisch Pakket 2.0**: Ons populaire romantisch pakket is vernieuwd met extra verwennerijen. Naast champagne en bloemen, voegen we nu ook een selectie van Belgische pralines toe en bieden we de mogelijkheid voor een late check-out tot 14:00.

**Nieuwe Wellness Producten**: In De Loft vindt u nu een selectie van luxe badproducten van een lokale Brugse maker. Natuurlijk, duurzaam, en heerlijk geurend.

### Seizoensarrangementen

**Lente (maart - mei)**: Ideaal voor wandelingen en fietstochten. We bieden gratis fietsen aan voor onze gasten.

**Zomer (juni - augustus)**: Profiteer van de langere dagen met een late avondwandeling door de verlichte straten van Brugge.

**Herfst (september - november)**: De perfecte tijd voor cultuurliefhebbers. We helpen graag met tickets voor concerten en tentoonstellingen.

**Winter (december - februari)**: Kerstmarkten, warme chocolademelk, en eindeloos genieten van de jacuzzi.

### Reserveren

De beste manier om uw verblijf te boeken is via onze website. Voor speciale verzoeken of vragen over arrangementen, neem gerust contact met ons op via email of telefoon.

### Bedankt!

Wij danken al onze gasten van het afgelopen jaar voor hun vertrouwen en de mooie recensies. Het is dankzij u dat we blijven groeien en verbeteren.

Tot snel bij Sweet Bonihu!

*Het Sweet Bonihu Team*
    `.trim(),
    },
];

export const getCategoryLabel = (category: BlogPost['category']): string => {
    const labels: Record<BlogPost['category'], string> = {
        travel: 'Reizen',
        wellness: 'Wellness',
        news: 'Nieuws',
    };
    return labels[category];
};

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
    return blogPosts.find(post => post.slug === slug);
};