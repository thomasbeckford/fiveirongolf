// payload/seed/locations.ts
export const LOCATIONS_SPECIFIC_DATA = [
  {
    name: 'Chicago River North',
    slug: 'chicago-river-north',
    experiences: ['Golf', 'Bowling'],

    GeneralSchema: {
      address: '609 N Dearborn St, Chicago, IL 60654',
      phone: '(312) 613-4653',
      email: 'rivernorth@fiveirongolf.com',
      coordinates: [-87.631005, 41.890251], // [lng, lat]
      timezone: 'America/Chicago'
    },

    SeoSchema: {
      title: 'Golf Simulators Chicago River North - Five Iron Golf',
      description:
        "High-tech golf experience in Chicago's River North near Magnificent Mile. Simulators, lessons, and full bar."
    },

    HeroSchema: {
      title: 'Chicago',
      subtitle: 'River North',
      ctaButton: {
        text: 'Book Now',
        url: 'https://booking.fiveirongolf.com/select-experience?location=chicago-river-north',
        type: 'primary'
      }
    }
  },

  {
    name: 'New York Flatiron',
    slug: 'nyc-flatiron',
    experiences: ['Golf'],

    GeneralSchema: {
      address: '21 E 15th St, New York, NY 10003',
      phone: '(646) 964-4653',
      email: 'flatiron@fiveirongolf.com',
      coordinates: [-73.9905516, 40.7356566], // [lng, lat]
      timezone: 'America/New_York'
    },

    SeoSchema: {
      title: 'Golf Simulators NYC Flatiron - Five Iron Golf',
      description:
        "Golf simulators in NYC's Flatiron District near Union Square. High-tech experience in dynamic neighborhood."
    },

    HeroSchema: {
      title: 'New York',
      subtitle: 'Flatiron',
      ctaButton: {
        text: 'Book Now',
        url: 'https://booking.fiveirongolf.com/select-experience?location=nyc-flatiron',
        type: 'primary'
      }
    }
  },

  {
    name: 'Boston Seaport',
    slug: 'boston-seaport',
    status: 'coming-soon',
    experiences: ['Golf'],

    GeneralSchema: {
      address: '399 Congress St, Boston, MA 02210',
      phone: '(617) 453-4653',
      email: 'seaport@fiveirongolf.com',
      coordinates: [-71.05782455092772, 42.35995794379754], // [lng, lat]
      timezone: 'America/New_York'
    },

    SeoSchema: {
      title: 'Golf Simulators Boston Seaport - Five Iron Golf',
      description:
        'Urban indoor golf experience in Boston Seaport. Golf simulators, lessons, and sports bar coming soon.'
    },

    HeroSchema: {
      title: 'Boston',
      subtitle: 'Seaport',
      ctaButton: {
        text: 'Coming Soon',
        url: 'https://booking.fiveirongolf.com/select-experience',
        type: 'secondary'
      }
    }
  }
];
