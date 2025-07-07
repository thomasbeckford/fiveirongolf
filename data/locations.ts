import { PageSection } from '@/lib/generated/prisma';

const sectionExample = {
  [PageSection.HERO]: {
    title: 'Boston',
    subtitle: 'Seaport',
    backgroundImage: 'https://fiveirongolf.com/wp-content/uploads/2024/08/RN_3.jpg',
    description:
      "Located in Boston's vibrant Seaport District, Five Iron Golf offers a high-tech golf experience with harbor views. Golfers of all levels can enjoy top-tier simulators, lessons, and a full-service bar.",
    contactInfo: {
      address: '399 Congress St, Boston, MA 02210',
      phone: '(617) 453-4653',
      email: 'seaport@fiveirongolf.com'
    },
    cta: {
      text: 'Book Now',
      url: 'https://booking.fiveirongolf.com/select-experience?location='
    }
  },
  [PageSection.ACTIVITIES]: {
    services: [
      {
        title: 'PLAY &',
        subtitle: 'PRACTICE',
        description:
          "Outfit with state-of-the-art Trackman technology and high-speed cameras in Boston's most dynamic waterfront district. Perfect for serious practice or casual fun with harbor views.",
        highlights: [
          {
            label: 'Location',
            text: 'Seaport District with harbor views'
          },
          {
            label: 'Technology',
            text: 'Trackman simulators with high-speed cameras'
          }
        ],
        primaryCta: { text: 'BOOK A SIM', url: '#booking' }
      },
      {
        title: 'GOLF',
        subtitle: 'INSTRUCTION',
        description:
          "If your swing could use some help, call our on-site experts for golf lessons in Boston. Whether you're looking to break par or just make consistent contact, our highly-trained coaches are here to help.",
        primaryCta: { text: 'BOOK A LESSON', url: '#lessons' }
      }
    ]
  },
  [PageSection.HOURS]: {
    backgroundImage: 'https://fiveirongolf.com/wp-content/uploads/2024/08/RN_3.jpg',
    address: {
      street: '399 Congress St',
      city: 'Boston',
      state: 'MA',
      zip: '02210'
    },
    regularHours: [
      { days: 'Monday - Thursday', hours: '10AM - 11PM' },
      { days: 'Friday', hours: '10AM - 12AM' },
      { days: 'Saturday', hours: '9AM - 12AM' },
      { days: 'Sunday', hours: '9AM - 10PM' }
    ]
  },
  [PageSection.REVIEWS]: {},
  [PageSection.GALLERY]: {},
  [PageSection.DUCKPIN]: {},
  [PageSection.MEMBERSHIP]: {},
  [PageSection.INSTRUCTORS]: {},
  [PageSection.MULTISPORT]: {},
  [PageSection.FEATURES]: {},
  [PageSection.FOOTER]: {},
  [PageSection.GENERAL]: {}
};

export const LOCATIONS = [
  // 1. CHICAGO RIVER NORTH - Con datos reales scrapeados
  {
    id: 'chicago-river-north',
    name: 'Chicago River North',
    slug: 'chicago-river-north',
    enabled: true,
    address: '425 Urban Plz., Suite 200, Kirkland, WA 98033',
    phone: '(315) 613-4653',
    email: 'rivernorth@fiveirongolf.com',
    latitude: '47.67789959999999',
    longitude: '-122.1988798',
    experiences: ['Bowling', 'Golf'],
    duckpinBowling: false,
    timezone: 'America/Chicago',

    content: {
      seo: {
        title: 'Indoor Golf Simulator Bar Chicago River North, Virtual Driving Range & Parties at Five Iron Golf',
        description:
          "Situated in Chicago's lively River North neighborhood near popular spots like the Magnificent Mile and the Chicago Riverwalk, Five Iron Golf offers a high-tech golf experience in the heart of the city."
      },
      sections: sectionExample
    }
  },

  // 2. NYC FLATIRON - Original location con datos reales
  {
    id: 'nyc-flatiron',
    name: 'New York Flatiron',
    slug: 'nyc-flatiron',
    enabled: true,
    address: '21 E 15th St, New York, NY 10003',
    phone: '(646) 964-4653',
    email: 'flatiron@fiveirongolf.com',
    latitude: '40.7356566',
    longitude: '-73.9905516',
    experiences: ['Golf'],
    duckpinBowling: false,
    timezone: 'America/New_York',
    content: {
      seo: {
        title: 'Virtual Golf Simulators in Flatiron, NYC, Indoor Driving Range & Parties at Five Iron Golf',
        description:
          "Located in New York's Flatiron District near Union Square and Madison Square Park, Five Iron Golf Flatiron brings a high-tech golf experience to one of the city's most dynamic neighborhoods."
      },
      sections: sectionExample
    }
  },

  // 3. BOSTON SEAPORT - Datos básicos pero completos
  {
    id: 'boston-seaport',
    name: 'Boston Seaport',
    slug: 'boston-seaport',
    enabled: true,
    address: '1 Washington St., Boston, MA 02108',
    phone: '(617) 555-0123',
    email: 'seaport@fiveirongolf.com',
    latitude: '42.35995794379754',
    longitude: '-71.05782455092772',
    experiences: ['Golf'],
    duckpinBowling: false,
    timezone: 'America/New_York',
    content: {
      seo: {
        title: 'Indoor Golf Simulators in Boston Seaport, Virtual Driving Range & Bar',
        description:
          'Five Iron Golf in Boston Seaport offers an urban indoor golf experience with golf simulators, lessons, swing evaluations, a sports bar, and more.'
      },
      sections: sectionExample
    }
  }
];
