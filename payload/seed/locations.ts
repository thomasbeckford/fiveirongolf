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
    },

    // FIXED: ActivitySchema is a group containing services array
    ActivitySchema: {
      services: [
        {
          title: 'PLAY &',
          subtitle: 'PRACTICE',
          description:
            "Outfit with state-of-the-art Trackman technology and high-speed cameras in Chicago's most dynamic River North district.",
          pricing: [{ item: 'Starting at $65/hour' }, { item: 'Group rates available' }],
          pricingLabel: 'SIM RENTAL PRICING',
          highlights: [
            { label: 'Duration', text: '60 minutes' },
            { label: 'Capacity', text: 'Up to 6 people' }
          ],
          primaryCta: {
            text: 'BOOK A SIM',
            url: '#booking'
          },
          secondaryCta: {
            text: 'WAYS TO PLAY',
            url: '#info'
          }
        },
        {
          title: 'GOLF',
          subtitle: 'INSTRUCTION',
          description: 'If your swing could use some help, call our on-site experts for golf lessons in Chicago.',
          pricing: [{ item: 'Starting at $120/hour' }, { item: 'Private sessions available' }],
          pricingLabel: 'LESSON PRICING',
          highlights: [
            { label: 'Duration', text: '60 minutes' },
            { label: 'Capacity', text: 'Up to 2 people' }
          ],
          primaryCta: {
            text: 'BOOK A LESSON',
            url: '#lessons'
          }
        }
      ]
    },

    MembershipSchema: {
      giftCard: {
        title: 'A 5i GIFT CARD MAKES THE PERFECT GIFT',
        buttonText: 'BUY GIFT CARD',
        url: '#gift-card'
      },
      title: 'BECOME A MEMBER',
      subtitle: 'ENJOY PERKS THAT BREAK PAR!',
      description: 'Members can walk in any day, any time and play for free!...',
      pricing: {
        monthlyPrice: '$299/mo.',
        terms: 'No initiation fees. Cancel any time.'
      },
      benefits: [
        { title: 'Free Golf', description: '90 mins. daily plus anytime walk-in privileges' },
        { title: 'Exclusive Discounts', description: '20% off all instruction, league entry, food & more' },
        { title: 'Facility Amenities', description: 'Club storage, shower access, etc.' }
      ],
      form: {
        privacyText: 'You consent to receive emails, calls, and texts...',
        submitText: 'SUBMIT'
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
    },

    // FIXED: ActivitySchema is a group containing services array
    ActivitySchema: {
      services: [
        {
          title: 'SIMULATORS',
          subtitle: '',
          description: 'Experience golf like never before with our state-of-the-art simulators in the heart of NYC.',
          pricing: [{ item: 'Starting at $75/hour' }, { item: 'Group rates available' }],
          pricingLabel: 'SIM RENTAL PRICING',
          highlights: [
            { label: 'Duration', text: '60 minutes' },
            { label: 'Capacity', text: 'Up to 6 people' }
          ],
          primaryCta: {
            text: 'BOOK A SIM',
            url: '#booking'
          },
          secondaryCta: {
            text: 'LEARN MORE',
            url: '#info'
          }
        }
      ]
    },

    MembershipSchema: {
      giftCard: {
        title: 'A 5i GIFT CARD MAKES THE PERFECT GIFT',
        buttonText: 'BUY GIFT CARD',
        url: '#gift-card'
      },
      title: 'BECOME A MEMBER',
      subtitle: 'ENJOY PERKS THAT BREAK PAR!',
      description: 'Members can walk in any day, any time and play for free!...',
      pricing: {
        monthlyPrice: '$399/mo.',
        terms: 'No initiation fees. Cancel any time.'
      },
      benefits: [
        { title: 'Free Golf', description: '90 mins. daily plus anytime walk-in privileges' },
        { title: 'Exclusive Discounts', description: '20% off all instruction, league entry, food & more' },
        { title: 'Facility Amenities', description: 'Club storage, shower access, etc.' }
      ],
      form: {
        privacyText: 'You consent to receive emails, calls, and texts...',
        submitText: 'SUBMIT'
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
    },

    // Coming soon location - empty services array to use defaults
    ActivitySchema: {
      services: []
    },
    MembershipSchema: []
  }
];
