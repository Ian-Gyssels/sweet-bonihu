import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { getLanguageFromPath, LanguageCode } from '@/i18n/config';

interface StructuredDataProps {
  type: 'home' | 'room' | 'package' | 'contact';
  roomName?: string;
}

const StructuredData = ({ type, roomName }: StructuredDataProps) => {
  const { t } = useTranslation();
  const location = useLocation();
  const currentLang = getLanguageFromPath(location.pathname) as LanguageCode;
  
  const baseUrl = 'https://sweetbonihu.be';

  // Base organization/business data
  const businessData = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    '@id': `${baseUrl}/#business`,
    name: 'Sweet Bonihu',
    description: t('meta.home.description'),
    url: baseUrl,
    telephone: '+32 50 XX XX XX',
    email: 'info@sweetbonihu.be',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Brugge',
      addressRegion: 'West-Vlaanderen',
      addressCountry: 'BE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 51.2093,
      longitude: 3.2247,
    },
    image: `${baseUrl}/hero-wellness.jpg`,
    priceRange: '€€€',
    starRating: {
      '@type': 'Rating',
      ratingValue: '4',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '9.3',
      bestRating: '10',
      worstRating: '1',
      ratingCount: '150',
    },
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Private Jacuzzi', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Infrared Sauna', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Free WiFi', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Breakfast Included', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Air Conditioning', value: true },
    ],
    availableLanguage: ['Dutch', 'English', 'French'],
    checkinTime: '15:00',
    checkoutTime: '11:00',
  };

  // Room data for De Loft
  const loftRoomData = {
    '@context': 'https://schema.org',
    '@type': 'HotelRoom',
    name: t('rooms.loft.name'),
    description: t('rooms.loft.description'),
    occupancy: {
      '@type': 'QuantitativeValue',
      minValue: 1,
      maxValue: 2,
    },
    bed: {
      '@type': 'BedDetails',
      typeOfBed: 'King',
      numberOfBeds: 1,
    },
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Private Jacuzzi', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Infrared Sauna', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'King-size Bed', value: true },
    ],
    containedInPlace: {
      '@type': 'LodgingBusiness',
      name: 'Sweet Bonihu',
      url: baseUrl,
    },
  };

  // Room data for Midsomer
  const midsomerRoomData = {
    '@context': 'https://schema.org',
    '@type': 'HotelRoom',
    name: t('rooms.midsomer.name'),
    description: t('rooms.midsomer.description'),
    occupancy: {
      '@type': 'QuantitativeValue',
      minValue: 1,
      maxValue: 2,
    },
    bed: {
      '@type': 'BedDetails',
      typeOfBed: 'Double',
      numberOfBeds: 1,
    },
    petsAllowed: true,
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Garden View', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Pet Friendly', value: true },
    ],
    containedInPlace: {
      '@type': 'LodgingBusiness',
      name: 'Sweet Bonihu',
      url: baseUrl,
    },
  };

  // Package/Offer data
  const packageData = {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: t('romantic.heroTitle'),
    description: t('romantic.contentDescription'),
    seller: {
      '@type': 'LodgingBusiness',
      name: 'Sweet Bonihu',
      url: baseUrl,
    },
    itemOffered: {
      '@type': 'LodgingReservation',
      reservationFor: {
        '@type': 'LodgingBusiness',
        name: 'Sweet Bonihu',
      },
    },
  };

  // Contact page data
  const contactData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: t('contact.heroTitle'),
    description: t('meta.contact.description'),
    mainEntity: {
      '@type': 'LodgingBusiness',
      name: 'Sweet Bonihu',
      email: 'info@sweetbonihu.be',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Brugge',
        addressCountry: 'BE',
      },
    },
  };

  // Breadcrumb data
  const getBreadcrumbData = () => {
    const items = [
      { name: t('nav.home'), url: baseUrl },
    ];

    if (type === 'room' && roomName === 'loft') {
      items.push({ name: t('rooms.loft.name'), url: `${baseUrl}/de-loft` });
    } else if (type === 'room' && roomName === 'midsomer') {
      items.push({ name: t('rooms.midsomer.name'), url: `${baseUrl}/midsomer` });
    } else if (type === 'package') {
      items.push({ name: t('romantic.heroTitle'), url: `${baseUrl}/romantisch-pakket` });
    } else if (type === 'contact') {
      items.push({ name: t('contact.heroTitle'), url: `${baseUrl}/contact` });
    }

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    };
  };

  // Select appropriate structured data based on page type
  const getStructuredData = (): object[] => {
    const data: object[] = [getBreadcrumbData()];

    switch (type) {
      case 'home':
        data.push(businessData);
        break;
      case 'room':
        if (roomName === 'loft') {
          data.push(loftRoomData);
        } else if (roomName === 'midsomer') {
          data.push(midsomerRoomData);
        }
        break;
      case 'package':
        data.push(packageData);
        break;
      case 'contact':
        data.push(contactData);
        break;
    }

    return data;
  };

  return (
    <Helmet>
      {getStructuredData().map((data, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
};

export default StructuredData;
