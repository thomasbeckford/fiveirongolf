export const LOCATIONS_DEFAULT = {
  status: 'active',
  experiences: ['Golf'],
  hasDuckpin: false,
  slug: 'default',
  name: 'Default Location',
  city: 'Unknown City',
  address: '123 Main St, Unknown City, XX 00000',
  phone: '(555) 123-4567',
  email: 'info@fiveirongolf.com',
  coordinates: [-74.006, 40.7128],
  timezone: 'America/New_York',

  SeoSchema: {
    title: 'Indoor Golf Simulator Bar - Five Iron Golf',
    description: 'Experience Five Iron Golf. Premium golf simulators, lessons, and entertainment in a modern setting.'
  },

  HeroSchema: {
    title: 'Five Iron Golf',
    subtitle: 'Premium Golf Experience',
    ctaButton: {
      text: 'Book Now',
      url: 'https://booking.fiveirongolf.com/select-experience',
      type: 'primary'
    }
  },

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
        },
        secondaryCta: {
          text: 'get a swing evaluation',
          url: '#info'
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
        },
        secondaryCta: {
          text: 'more info',
          url: '#info'
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
        },
        secondaryCta: {
          text: 'more info',
          url: '#info'
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
        icons: [
          {
            url: '/icons/bowling-pin.svg',
            alt: 'Bowling Pin'
          }
        ],
        primaryCta: {
          text: 'BOOK A LANE',
          url: '#bowling'
        },
        secondaryCta: {
          text: 'host a duckpin event',
          url: '#info'
        }
      }
    ]
  },

  GallerySchema: {},

  HoursSchema: {
    simRentalPricing: {
      title: 'SIM RENTAL PRICING',
      url: '#info'
    },
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
      privacyText:
        'You consent to receive emails, calls, and texts from Five Iron Golf and accept our Privacy Policy. Opt out from email at any time via the unsubscribe option in footer or reply "STOP" to opt out from text.',
      submitText: 'SUBMIT'
    }
  },

  InstructorSchema: {
    coaches: [
      {
        id: 'kyle-hlywa',
        name: 'Kyle Hlywa',
        title: 'Senior Golf Coach',
        bio: 'Kyle joins the Professional Staff at 5 Iron Golf as a former country club Assistant Professional serving & coaching memberships of private facilities such as Monroe Golf Club in Rochester, NY, Dedham Country & Polo Club in Boston, MA, Mountain Lake in Lake Wales, FL, Lost Tree Club, in West Palm Beach, FL and Essex County Club in Boston, MA. He is a PGA Associate, and a certified PGA Coach under the American Development Model. His background includes the ability to instruct players of all ages and skill levels, with a passion for growing the game of golf and making you a better player!'
      },
      {
        id: 'cole-langley',
        name: 'Cole Langley',
        title: 'Senior Golf Coach',
        bio: 'More info coming soon!'
      },
      {
        id: 'tyler-buckingham',
        name: 'Tyler Buckingham',
        title: 'Senior Golf Coach',
        bio: 'A former D1 golfer at Murray State University in Kentucky, Tyler moved to Miami, FL began his golf instruction journey with an apprenticeship under world-renowned teacher, Jim McLean and where Buckingham became a certified instructor at both Trump National Doral and Miami Beach Golf Club. While in Florida, he was also able learn from Sean Foley, Mariano Bartolome, and Dr. Rob Neil with Golf BioDynamics. In addition, his instruction career has taken him to The Golf Club of Tennessee in Nashville and Big Spring Country Club in Louisville, KY as well. Regardless of playing ability, Tyler enjoys helping golfers at all levels improve.”'
      },
      {
        id: 'sean-bready',
        name: 'Sean Bready',
        title: 'Senior Golf Coach',
        bio: 'With over 20 years of playing experience, Bready has risen through the golf ranks from junior golfer to PGA Associate & Professional. His journey began at Idlewild Country Club in Flossmoor, Illinois, where he spent 12 seasons as a caddy, gaining insights into the nuances of the golf swing for different player types. After caddying, Bready taught over 3,000 lessons in 2 years, honing his ability to address swing challenges across all skill levels. Combining with his golf expertise, a background in Mechanical Engineering and Applied Physics and Mathematics, make him a perfect fit for simplifying the complexities of the golf swing to enhance students’ improvement journey.'
      }
    ]
  },

  MultisportSchema: {
    topBanner: "'Games that go beyond the greens!'",
    title: 'Multisport',
    subtitle: 'An Electrifying Blend of Simulator Sports!',
    description: `Take the fun to the next level when you book a party or event. Multisport sims bring 6 unique sports into the mix like Hockey, Soccer, and Bowling so the vibes stay high all day and night!
Bring the whole gang together with customizable difficulty and boost settings so you can tailor the challenge or heat up the competition.`,

    ctaText: 'Book a Multisport event',
    ctaUrl: '#booking',
    sports: [
      {
        id: '1',
        name: 'Slapshot hockey'
      },
      {
        id: '2',
        name: 'Breakaway soccer'
      },
      {
        id: '3',
        name: 'Foot Golf'
      },
      {
        id: '4',
        name: 'Bowl-a-Rama'
      },
      {
        id: '5',
        name: 'Disc-Go Golf'
      },
      {
        id: '6',
        name: 'Zombie Dodgeball'
      }
    ]
  },

  DuckpinSchema: {
    preTitle: 'GET READY TO ROLL WITH',
    title: 'DUCKPIN BOWLING!',
    description:
      'This twist on standard bowling uses smaller pins and lighter balls, meaning tighter competition and more thrills.',
    callToAction: 'Strike up a great time with family and friends! Book your lane now!',
    buttonText: 'BOOK YOUR LANE',
    bookingUrl: '#book-duckpin',
    faqs: [
      {
        id: 1,
        question: 'What is duckpin bowling?',
        answer:
          'Duckpin is a variation of bowling that uses smaller, lighter balls that don’t have finger holes. The pins for duckpin are also smaller and shorter than standard pins. You also don’t need special bowling shoes to play duckpin!'
      },
      {
        id: 2,
        question: 'How many people can play duckping',
        answer: 'Each of the 2 lanes can accommodate up to 6 bowlers at one time.'
      },
      {
        id: 3,
        question: 'Can kids play duckpin?',
        answer: 'Absolutely! Duckpin bowling is great for all ages of players.'
      },
      {
        id: 4,
        question: 'Can the duckpin bowling lanes be rented for parties or events?',
        answer: 'They sure can! Inquire about an event that includes, duckpin, the golf sims, or both here.'
      }
    ]
  },

  ReviewSchema: {
    title: 'Five Iron Golf Reviews',
    reviews: [
      {
        rating: 5,
        text: 'This place is AWESOME! It has everything that you need from golf to lessons, food and a full bar. Please come check it out!',
        author: 'Eric S.'
      },
      {
        rating: 5,
        text: 'Five Iron is a wonderful full-service experience from check-in, to the golf lesson, and the bar. Great way to spend a few hours, excited to go back!',
        author: 'Madison K.'
      },
      {
        rating: 5,
        text: 'Five Iron Golf was so fun to play with me and my daughter. It’s a great way to stay in shape with golf during the winter! Turn on screen reader support',
        author: 'Jerald K.'
      }
    ],
    ctaText: 'BOOK NOW',
    ctaUrl: '#booking'
  },

  FeaturesSchema: {
    features: [
      {
        id: '1',
        title: 'restaurant & bar',
        description:
          'Serving up carefully-selected, casual fare complemented by signature cocktails, local brews on tap and canned classics for some swing juice.',
        neonColor: '#39ff14',
        ctaText: 'read menu',
        ctaUrl: '#menu'
      },
      {
        id: '2',
        title: 'join a league',
        description:
          'Compete on different courses with various formats for a chance to win a tropical golf getaway! Weekly drink specials, closest-to-the-pin contests, and so much more!',
        neonColor: '#ff0000',
        ctaText: 'learn about leagues',
        ctaUrl: '#league'
      },
      {
        id: '3',
        title: 'The pro in Promos',
        description: 'Who doesn’t love a good deal?! Check out what promotions are currently running.',
        neonColor: '#0000ff',
        ctaText: 'see promos',
        ctaUrl: '#promos'
      }
    ]
  },

  FooterSchema: {
    newsletter: {
      title: 'Subscribe to our newsletter',
      locations: [
        {
          label: 'Location 1',
          value: 'location-1'
        },
        {
          label: 'Location 2',
          value: 'location-2'
        }
      ],
      disclaimer:
        'By submitting this form, you agree to receive emails, calls, and texts from Five Iron Golf and accept our Privacy Policy. Opt out from email at any time via the unsubscribe option in footer or reply "STOP" to opt out from text.'
    },
    brand: {
      tagline: 'Five Iron Golf'
    },
    quickLinks: [
      {
        label: 'Home',
        url: '#home'
      },
      {
        label: 'About',
        url: '#about'
      },
      {
        label: 'Contact',
        url: '#contact'
      },
      {
        label: 'Locations',
        url: '#locations'
      },
      {
        label: 'Membership',
        url: '#membership'
      },
      {
        label: 'Events',
        url: '#events'
      }
    ],
    moreLinks: [
      {
        label: 'Privacy Policy',
        url: '#privacy-policy'
      },
      {
        label: 'Terms of Use',
        url: '#terms-of-use'
      }
    ],
    contact: {
      email: 'contact@fiveirongolf.com',
      phone: '(617) 453-4653'
    }
  }
};
