import { PageSection } from '@/lib/generated/prisma';

export const LOCATIONS_DEFAULT = {
  seo: {
    title: 'Indoor Golf Simulator Bar - Five Iron Golf',
    description: 'Experience Five Iron Golf. Premium golf simulators, lessons, and entertainment in a modern setting.'
  },
  sections: {
    [PageSection.GENERAL]: {},
    [PageSection.HERO]: {
      backgroundImage: 'https://fiveirongolf.com/wp-content/uploads/2024/08/RN_3.jpg',
      description:
        "Situated in Chicago's lively River North neighborhood near popular spots like the Magnificent Mile and the Chicago Riverwalk, Five Iron Golf offers a high-tech golf experience in the heart of the city. Golfers of all levels can enjoy top-tier simulators, lessons, and a full-service bar.",
      contactInfo: {
        address: '609 N Dearborn St.Chicago, IL 60654',
        phone: '(312) 555-0123',
        email: 'rivernorth@fiveirongolf.com'
      },
      floorplan: {
        available: true,
        url: '/floorplans/chicago-river-north.pdf'
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
            'Outfit with state-of-the-art Trackman technology and high-speed cameras, call dibs on a simulator for you and up to 5 friends where you can choose your own adventure. Sweat it out with a serious practice sesh, tee it up at PGA Tour venues like Pebble Beach, or challenge each other in one of the games, your choice. There’s something for every level of golfer!',
          pricing: ['Starting at $45/hour', 'Group rates available'],
          pricingLabel: 'SIM RENTAL PRICING',
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
          subtitle: 'INSTRUCTIONS',

          description:
            'If your swing could use some help, call our on-site experts for golf lessons in Chicago at River North. Whether you’re looking to break par or just make consistent contact, our highly-trained coaches recommend starting with a Swing Evaluation before getting into a rhythm with our 1-on-1 or small-group golf lessons.',
          primaryCta: {
            text: 'Book a Lesson',
            url: '#lessons'
          }
        },
        {
          title: 'custom',
          subtitle: 'CLUB FITTING',
          description:
            "Get fitted for the perfect clubs with our professional club fitting service. Using advanced technology, we'll help you find equipment that matches your swing and improves your game.",
          primaryCta: {
            text: 'Book a Fitting',
            url: '#fitting'
          }
        },
        {
          title: 'PLAN',
          subtitle: 'AN EVENT',
          description:
            'In search of an event venue in the Chicago River North area?! We make hosting your crew easy and fun. Whether it’s a birthday, bachelor(ette) party, or business meeting, come play, practice, and party with us. With a full (and delicious) food menu and drink packages available, we have you covered, so you can actually enjoy your event.',
          primaryCta: {
            text: 'Host an Event',
            url: '#events'
          }
        },
        {
          title: 'DUCKPIN',
          subtitle: 'BOWLING',
          description:
            'Get ready for a whole new bowling experience! Duckpin bowling features smaller pins and lighter balls, offering fast-paced, exciting competition. Plus, no bowling shoes are required! Strike up a great time with family and friends, and give duckpin bowling in Chicago a try! Book your lane today.',
          primaryCta: {
            text: 'Book a Lane',
            url: '#bowling'
          }
        }
      ]
    },
    [PageSection.GALLERY]: {
      images: [
        {
          url: 'https://fiveirongolf.com/wp-content/uploads/2024/08/RN_3.jpg',
          alt: 'Golf simulator bay',
          caption: 'State-of-the-art golf simulators'
        },
        {
          url: 'https://fiveirongolf.com/wp-content/uploads/2024/08/RN_3.jpg',
          alt: 'Bar area',
          caption: 'Full-service bar'
        },
        {
          url: 'https://fiveirongolf.com/wp-content/uploads/2024/08/RN_3.jpg',
          alt: 'Duckpin bowling',
          caption: 'Duckpin bowling lanes'
        }
      ]
    },
    [PageSection.HOURS]: {
      backgroundImage: 'https://fiveirongolf.com/wp-content/uploads/2024/08/RN_3.jpg',

      regularHours: [
        {
          days: 'Monday - Thursday',
          hours: '6AM - 11PM'
        },
        {
          days: 'Friday',
          hours: '6AM - 1AM'
        },
        {
          days: 'Saturday',
          hours: '8AM - 1AM'
        },
        {
          days: 'Sunday',
          hours: '8AM - 11PM'
        }
      ],
      specialHours: [
        {
          description: 'Member Benefits (M-F)',
          hours: '6AM - 4PM'
        },
        {
          description: 'Late Night (Sunday)',
          hours: '8PM - Close'
        }
      ]
    },
    [PageSection.MEMBERSHIP]: {
      giftCard: {
        title: 'A 5i GIFT CARD MAKES THE PERFECT GIFT',
        buttonText: 'BUY GIFT CARD',
        url: '#gift-card'
      },
      backgroundImage: 'https://fiveirongolf.com/wp-content/uploads/2024/08/RN_3.jpg',
      title: 'BECOME A MEMBER',
      subtitle: 'ENJOY PERKS THAT BREAK PAR!',
      description:
        'Members can walk in any day, any time and play for free! Plus, book ahead during Member Benefit Hours, also free! And save big on food and beverages, standard simulator reservations, instruction, league entries and event hosting.',
      pricing: {
        monthlyPrice: '$279/mo.',
        terms: 'No initiation fees. Cancel any time.'
      },
      benefits: [
        {
          title: 'Free Golf',
          description: '90 mins. daily plus anytime walk-in privileges'
        },
        {
          title: 'Exclusive Discounts',
          description: '20% off all instruction, league entry, food & more'
        },
        {
          title: 'Facility Amenities',
          description: 'Club storage, shower access, etc.'
        }
      ],
      form: {
        privacyText:
          "You consent to receive emails, calls, and texts from Five Iron Golf and accept our Privacy Policy. Opt out from email at any time via the unsubscribe option in footer or reply 'STOP' to opt out from text.",
        submitText: 'SUBMIT'
      }
    },
    [PageSection.MULTISPORT]: {
      topBanner: 'GAMES THAT GO BEYOND THE GREENS!',
      slides: [
        {
          id: 'multisport',
          title: 'MULTISPORT',
          subtitle: 'AN ELECTRIFYING BLEND OF SIMULATOR SPORTS!',
          description:
            'Take the fun to the next level when you book a party or event. Multisport sims bring 6 unique sports into the mix like Hockey, Soccer, and Bowling so the vibes stay high all day and night!',
          features:
            'Bring the whole gang together with customizable difficulty and boost settings so you can tailor the challenge or heat up the competition.',
          image: 'https://fiveirongolf.com/wp-content/uploads/2024/08/RN_3.jpg',
          ctaText: 'BOOK A MULTISPORT EVENT',
          ctaUrl: '#book-multisport'
        }
      ],
      sports: [
        { id: 'slapshot-hockey', name: 'SLAPSHOT HOCKEY' },
        { id: 'breakaway-soccer', name: 'BREAKAWAY SOCCER' },
        { id: 'foot-golf', name: 'FOOT GOLF' },
        { id: 'bowl-a-rama', name: 'BOWL-A-RAMA' },
        { id: 'disc-go-golf', name: 'DISC-GO GOLF' },
        { id: 'zombie-dodgeball', name: 'ZOMBIE DODGEBALL' }
      ]
    },
    [PageSection.INSTRUCTORS]: {
      coaches: [
        {
          id: 'cole-langley',
          name: 'COLE LANGLEY',
          title: 'Senior Golf Coach',
          bio: 'PGA Professional with 10+ years experience helping golfers of all skill levels improve their game.',
          image: 'https://fiveirongolf.com/wp-content/uploads/2024/08/RN_3.jpg'
        },
        {
          id: 'tyler-buckingham',
          name: 'TYLER BUCKINGHAM',
          title: 'Golf Coach',
          image: 'https://fiveirongolf.com/wp-content/uploads/2024/08/RN_3.jpg',
          bio: 'Specializes in beginner instruction and swing fundamentals with a patient, encouraging approach.'
        },
        {
          id: 'sean-bready',
          name: 'SEAN BREADY',
          title: 'Golf Coach',
          image: 'https://fiveirongolf.com/wp-content/uploads/2024/08/RN_3.jpg',
          bio: 'Former college player focused on advanced techniques and competitive golf strategies.'
        }
      ],
      bookLessonUrl: '#book-lesson',
      learnMoreUrl: '#coaches-info'
    },
    [PageSection.DUCKPIN]: {
      backgroundImage: '/images/duckpin-bowling-bg.jpg',
      icons: [
        { url: '/icons/bowling-pin.svg', alt: 'Bowling Pin' },
        { url: '/icons/bowling-ball.svg', alt: 'Bowling Ball' },
        { url: '/icons/5i-logo.svg', alt: '5i Logo' },
        { url: '/icons/trophy.svg', alt: 'Trophy' },
        { url: '/icons/target.svg', alt: 'Target' }
      ],
      preTitle: 'GET READY TO ROLL WITH',
      title: 'DUCKPIN BOWLING!',
      description:
        'This twist on standard bowling uses smaller pins and lighter balls, meaning tighter competition and more thrills.',
      callToAction: 'Strike up a great time with family and friends! Book your lane now!',
      buttonText: 'BOOK YOUR LANE',
      bookingUrl: '#book-duckpin',
      faqs: [
        {
          id: 'what-is-duckpin',
          question: 'WHAT IS DUCKPIN BOWLING?',
          answer:
            "Duckpin is a variation of bowling that uses smaller, lighter balls that don't have finger holes. The pins for duckpin are also smaller and shorter than standard pins. You also don't need special bowling shoes to play duckpin!"
        },
        {
          id: 'how-many-people',
          question: 'HOW MANY PEOPLE CAN PLAY DUCKPIN?',
          answer:
            'Each of our duckpin lanes can accommodate up to 6 players at one time, making it perfect for families and small groups.'
        },
        {
          id: 'can-kids-play',
          question: 'CAN KIDS PLAY DUCKPIN?',
          answer:
            'Absolutely! Duckpin bowling is great for all ages. The lighter balls and smaller pins make it easier and more fun for children to play.'
        },
        {
          id: 'party-rentals',
          question: 'CAN THE DUCKPIN BOWLING LANES BE RENTED FOR PARTIES OR EVENTS?',
          answer:
            'Yes! Our duckpin bowling lanes are perfect for private parties and events. Contact us to learn more about our party packages and availability.'
        }
      ]
    },
    [PageSection.REVIEWS]: {
      title: 'FIVE IRON GOLF RIVER NORTH REVIEWS',
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
          rating: 4,
          text: "Five Iron Golf was so fun to play with me and my daughter. It's a great way to stay in shape with golf during the winter! Turn on screen reader support",
          author: 'Jerald K.'
        }
      ],
      ctaText: 'BOOK NOW',
      ctaUrl: '#booking'
    },
    [PageSection.FEATURES]: {
      features: [
        {
          id: 'restaurant-bar',
          title: 'RESTAURANT & BAR',
          description:
            'Serving up carefully-selected, casual fare complemented by signature cocktails, local brews on tap and canned classics for some swing juice.',
          neonColor: '#39ff14', // Verde neón
          ctaText: 'READ MENU',
          ctaUrl: '#menu'
        },
        {
          id: 'join-league',
          title: 'JOIN A LEAGUE',
          description:
            'Compete on different courses with various formats for a chance to win a tropical golf getaway! Weekly drink specials, closest-to-the-pin contests, and so much more!',
          neonColor: '#00f5ff', // Cyan neón
          ctaText: 'LEARN ABOUT LEAGUE',
          ctaUrl: '#league'
        },
        {
          id: 'promos',
          title: 'THE PRO IN PROMOS',
          description: "Who doesn't love a good deal?! Check out what promotions are currently running.",
          neonColor: '#ff1493', // Rosa neón
          ctaText: 'SEE PROMOS',
          ctaUrl: '#promotions'
        }
      ]
    },
    [PageSection.FOOTER]: {
      newsletter: {
        title: 'SUBSCRIBE TO STAY IN THE 5i LOOP',
        locations: [
          { label: 'Chicago River North', value: 'chicago-river-north' },
          { label: 'Chicago Wicker Park', value: 'chicago-wicker-park' },
          { label: 'New York SoHo', value: 'new-york-soho' }
        ],
        disclaimer:
          'I consent to receive email communication from Five Iron Golf and agree to the terms of their privacy policy. You can opt out at any time by clicking the unsubscribe link in the email footer. By signing up via text, you agree to receive recurring automated promotional and personalized marketing text messages (e.g. cart reminders) from Five Iron Golf at the cell number provided. Consent is not a condition of any purchase. Reply HELP for help and STOP to cancel. Msg frequency varies. Msg & data rates may apply. SMS Terms and Privacy'
      },
      brand: {
        tagline: "It's all good form at Five Iron!",
        socialMedia: [
          {
            platform: 'instagram',
            url: 'https://instagram.com/fiveirongolf'
          },
          { platform: 'twitter', url: 'https://twitter.com/fiveirongolf' },
          { platform: 'youtube', url: 'https://youtube.com/fiveirongolf' }
        ]
      },
      quickLinks: [
        { label: 'BOOK NOW', url: '#booking' },
        { label: 'DOWNLOAD THE APP', url: '#app' },
        { label: 'LOCATIONS', url: '/locations' },
        { label: 'CONTACT US', url: '#contact' }
      ],
      moreLinks: [
        { label: 'FRANCHISING', url: '#franchising' },
        { label: 'CAREERS', url: '#careers' },
        { label: 'PRIVACY POLICY', url: '#privacy' },
        { label: 'TERMS AND CONDITIONS', url: '#terms' }
      ],
      contact: {
        email: 'info@fiveirongolf.com',
        phone: '+1-800-GOLF-5i'
      },
      copyright: 'Five Iron Golf 2025 © All Rights Reserved'
    }
  }
};
