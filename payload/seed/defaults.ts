// payload/seed/defaults.ts
export const LOCATIONS_DEFAULT = {
  status: 'active',
  experiences: ['Golf'],
  duckpinBowling: false,

  // Basic Info group
  GeneralSchema: {
    address: '123 Main St, Unknown City, XX 00000',
    phone: '(555) 123-4567',
    email: 'info@fiveirongolf.com',
    coordinates: [-74.006, 40.7128], // [lng, lat] format for point field
    timezone: 'America/New_York'
  },

  // SEO defaults
  SeoSchema: {
    title: 'Indoor Golf Simulator Bar - Five Iron Golf',
    description: 'Experience Five Iron Golf. Premium golf simulators, lessons, and entertainment in a modern setting.'
  },

  // Hero defaults
  HeroSchema: {
    title: 'Five Iron Golf',
    subtitle: 'Premium Golf Experience',
    ctaButton: {
      text: 'Book Now',
      url: 'https://booking.fiveirongolf.com/select-experience',
      type: 'primary'
    }
  },

  // FIXED: ActivitySchema is a group containing services array (matches PayloadCMS schema)
  ActivitySchema: {
    services: [
      {
        title: 'PLAY &',
        subtitle: 'PRACTICE',
        description:
          'Outfit with state-of-the-art Trackman technology and high-speed cameras, call dibs on a simulator for you and up to 5 friends.',
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
        description: 'If your swing could use some help, call our on-site experts for golf lessons.',
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
      },
      {
        title: 'CUSTOM',
        subtitle: 'CLUB FITTING',
        description: 'Get fitted for the perfect clubs with our professional club fitting service.',
        pricing: [{ item: 'Starting at $150/session' }, { item: 'Equipment analysis included' }],
        pricingLabel: 'FITTING PRICING',
        highlights: [
          { label: 'Duration', text: '90 minutes' },
          { label: 'Technology', text: 'Advanced fitting tools' }
        ],
        primaryCta: {
          text: 'BOOK A FITTING',
          url: '#fitting'
        }
      },
      {
        title: 'PLAN',
        subtitle: 'AN EVENT',
        description: 'In search of an event venue? We make hosting your crew easy and fun.',
        pricing: [{ item: 'Starting at $500/event' }, { item: 'Custom packages available' }],
        pricingLabel: 'EVENT PRICING',
        highlights: [
          { label: 'Duration', text: '3+ hours' },
          { label: 'Capacity', text: 'Up to 20 people' }
        ],
        primaryCta: {
          text: 'HOST AN EVENT',
          url: '#events'
        }
      },
      {
        title: 'DUCKPIN',
        subtitle: 'BOWLING',
        description:
          'Get ready for a whole new bowling experience! Duckpin bowling features smaller pins and lighter balls.',
        pricing: [{ item: 'Starting at $40/hour' }, { item: 'No bowling shoes required' }],
        pricingLabel: 'BOWLING PRICING',
        highlights: [
          { label: 'Duration', text: '60 minutes' },
          { label: 'Capacity', text: 'Up to 6 people' }
        ],
        primaryCta: {
          text: 'BOOK A LANE',
          url: '#bowling'
        }
      }
    ]
  },

  // Hours defaults
  HoursSchema: {
    regularHours: [
      { days: 'Monday - Thursday', hours: '6AM - 11PM' },
      { days: 'Friday', hours: '6AM - 1AM' },
      { days: 'Saturday', hours: '8AM - 1AM' },
      { days: 'Sunday', hours: '8AM - 11PM' }
    ],
    specialHours: [
      { description: 'Member Benefits (M-F)', hours: '6AM - 4PM' },
      { description: 'Late Night (Sunday)', hours: '8PM - Close' }
    ]
  },

  // Membership defaults
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
      monthlyPrice: '$279/mo.',
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
  },

  ReviewSchema: {
    title: 'FIVE IRON GOLF REVIEWS',
    reviews: [
      {
        rating: 5,
        text: 'Amazing golf experience! Great simulators and friendly staff.',
        author: 'Happy Customer'
      }
    ],
    ctaText: 'BOOK NOW',
    ctaUrl: '#booking'
  },

  // Duckpin Schema
  DuckpinSchema: {
    icons: [{ url: '/icons/bowling-pin.svg', alt: 'Bowling Pin' }],
    preTitle: 'GET READY TO ROLL WITH',
    title: 'DUCKPIN BOWLING!',
    description:
      'This twist on standard bowling uses smaller pins and lighter balls, meaning tighter competition and more thrills.',
    callToAction: 'Strike up a great time with family and friends! Book your lane now!',
    buttonText: 'BOOK YOUR LANE',
    bookingUrl: '#book-duckpin',
    faqs: []
  },

  // Gallery Schema - REMOVED images array to avoid upload ObjectId issues
  GallerySchema: {
    // Remove images array temporarily to avoid ObjectId issues
    // images: []
  }
};
