// 3 Ejemplos Mejorados con Datos Reales de Five Iron Golf
export const LOCATIONS_CONTENT = [
  // 1. CHICAGO RIVER NORTH - Con datos reales scrapeados
  {
    id: "chicago-river-north",
    name: "Chicago River North",
    slug: "chicago-river-north",
    status: "active",
    seo: {
      title:
        "Indoor Golf Simulator Bar Chicago River North, Virtual Driving Range & Parties at Five Iron Golf",
      description:
        "Situated in Chicago's lively River North neighborhood near popular spots like the Magnificent Mile and the Chicago Riverwalk, Five Iron Golf offers a high-tech golf experience in the heart of the city.",
    },
    sections: {
      hero: {
        title: "Chicago",
        subtitle: "River North",
        backgroundImage:
          "https://fiveirongolf.com/wp-content/uploads/2024/08/RN_3.jpg",
        description:
          "Situated in Chicago's lively River North neighborhood near popular spots like the Magnificent Mile and the Chicago Riverwalk, Five Iron Golf offers a high-tech golf experience in the heart of the city. Golfers of all levels can enjoy top-tier simulators, lessons, and a full-service bar. 5i River North also features duckpin bowling lanes, a fun twist on the original that's perfect for all ages!",
        contactInfo: {
          address: "609 N Dearborn St, Chicago, IL 60654",
          phone: "(315) 613-4653",
          email: "rivernorth@fiveirongolf.com",
        },
        floorplan: {
          available: true,
          url: "/floorplans/chicago-river-north.pdf",
        },
        cta: {
          text: "Book Now",
          url: "https://booking.fiveirongolf.com/select-experience?location=chicago-river-north",
        },
      },
      playAndPractice: {
        services: [
          {
            title: "PLAY &",
            subtitle: "PRACTICE",
            description:
              "Outfit with state-of-the-art Trackman technology and high-speed cameras, call dibs on a simulator for you and up to 5 friends where you can choose your own adventure. Sweat it out with a serious practice sesh, tee it up at PGA Tour venues like Pebble Beach, or challenge each other in one of the games, your choice. There's something for every level of golfer!",
            primaryCta: { text: "BOOK A SIM", url: "#booking" },
            secondaryCta: { text: "WAYS TO PLAY", url: "#info" },
          },
          {
            title: "DUCKPIN",
            subtitle: "BOWLING",
            description:
              "Get ready for a whole new bowling experience! Duckpin bowling features smaller pins and lighter balls, offering fast-paced, exciting competition. Plus, no bowling shoes are required! Strike up a great time with family and friends, and give duckpin bowling in Chicago a try!",
            primaryCta: { text: "BOOK A LANE", url: "#bowling" },
          },
        ],
      },
      hours: {
        backgroundImage:
          "https://fiveirongolf.com/wp-content/uploads/2024/08/RN_3.jpg",
        address: {
          street: "609 N Dearborn St",
          city: "Chicago",
          state: "IL",
          zip: "60654",
        },
        regularHours: [
          { days: "Monday - Thursday", hours: "6AM - 11PM" },
          { days: "Friday", hours: "6AM - 1AM" },
          { days: "Saturday", hours: "8AM - 1AM" },
          { days: "Sunday", hours: "8AM - 11PM" },
        ],
        specialHours: [
          { description: "Member Benefits (M-F)", hours: "6AM - 4PM" },
        ],
      },
      reviews: {
        title: "FIVE IRON GOLF RIVER NORTH REVIEWS",
        reviews: [
          {
            rating: 5,
            text: "This place is AWESOME! It has everything that you need from golf to lessons, food and a full bar. Please come check it out!",
            author: "Eric S.",
          },
          {
            rating: 5,
            text: "Five Iron is a wonderful full-service experience from check-in, to the golf lesson, and the bar. Great way to spend a few hours, excited to go back!",
            author: "Madison K.",
          },
        ],
        ctaText: "BOOK NOW",
        ctaUrl: "#booking",
      },
      duckpin: {
        backgroundImage:
          "https://fiveirongolf.com/wp-content/uploads/2024/08/RN_3.jpg",
        preTitle: "GET READY TO ROLL WITH",
        title: "DUCKPIN BOWLING!",
        description:
          "This twist on standard bowling uses smaller pins and lighter balls, meaning tighter competition and more thrills.",
        callToAction:
          "Strike up a great time with family and friends! Book your lane now!",
        buttonText: "BOOK YOUR LANE",
        bookingUrl: "#book-duckpin",
        faqs: [
          {
            id: "what-is-duckpin",
            question: "WHAT IS DUCKPIN BOWLING?",
            answer:
              "Duckpin is a variation of bowling that uses smaller, lighter balls that don't have finger holes. The pins for duckpin are also smaller and shorter than standard pins. You also don't need special bowling shoes to play duckpin!",
          },
          {
            id: "how-many-people",
            question: "HOW MANY PEOPLE CAN PLAY DUCKPIN?",
            answer:
              "Each of our duckpin lanes can accommodate up to 6 players at one time, making it perfect for families and small groups.",
          },
        ],
      },
    },
  },

  // 2. NYC FLATIRON - Original location con datos reales
  {
    id: "nyc-flatiron",
    name: "New York Flatiron",
    slug: "nyc-flatiron",
    status: "active",
    seo: {
      title:
        "Virtual Golf Simulators in Flatiron, NYC, Indoor Driving Range & Parties at Five Iron Golf",
      description:
        "Located in New York's Flatiron District near Union Square and Madison Square Park, Five Iron Golf Flatiron brings a high-tech golf experience to one of the city's most dynamic neighborhoods.",
    },
    sections: {
      hero: {
        title: "New York",
        subtitle: "Flatiron",
        backgroundImage:
          "https://fiveirongolf.com/wp-content/uploads/2024/08/RN_3.jpg",
        description:
          "Located in New York's Flatiron District near Union Square and Madison Square Park, Five Iron Golf Flatiron brings a high-tech golf experience to one of the city's most dynamic neighborhoods. Golfers of all levels can enjoy top-tier simulators, lessons, and a full-service bar. We have 10 Trackman simulators and other games like shuffleboard and ping pong.",
        contactInfo: {
          address: "21 E 15th St, New York, NY 10003",
          phone: "(646) 964-4653",
          email: "flatiron@fiveirongolf.com",
        },
        cta: {
          text: "Book Now",
          url: "https://booking.fiveirongolf.com/select-experience?location=nyc-flatiron",
        },
      },
      playAndPractice: {
        services: [
          {
            title: "PLAY &",
            subtitle: "PRACTICE",
            description:
              "Outfit with state-of-the-art Trackman technology and high-speed cameras, call dibs on a simulator for you and up to 5 friends. We have 10 Trackman simulators ready for your group!",
            highlights: [
              { label: "Simulators", text: "10 Trackman units available" },
              { label: "Capacity", text: "Up to 6 friends per simulator" },
              { label: "Games", text: "Shuffleboard and ping pong available" },
            ],
            primaryCta: { text: "BOOK A SIM", url: "#booking" },
          },
          {
            title: "GOLF",
            subtitle: "INSTRUCTION",
            description:
              "If your swing could use some help, call our on-site experts for golf lessons in New York City. Whether you're looking to break par or just make consistent contact, our highly-trained coaches recommend starting with a Swing Evaluation.",
            primaryCta: { text: "BOOK A LESSON", url: "#lessons" },
          },
        ],
      },
      reviews: {
        title: "FIVE IRON GOLF FLATIRON REVIEWS",
        reviews: [
          {
            rating: 5,
            text: "The food was great! My son and family had a wonderful time at the Flatiron location.",
            author: "Robert K.",
          },
          {
            rating: 5,
            text: "Excellent venue and pricing! Hosted a family/student function of 30 people and the process to secure was great, the on-site staff was excellent as well. This is our 3rd year and will return!",
            author: "Maria S.",
          },
        ],
        ctaText: "BOOK NOW",
        ctaUrl: "#booking",
      },
    },
  },

  // 3. BOSTON SEAPORT - Datos básicos pero completos
  {
    id: "boston-seaport",
    name: "Boston Seaport",
    slug: "boston-seaport",
    status: "active",
    seo: {
      title:
        "Indoor Golf Simulators in Boston Seaport, Virtual Driving Range & Bar",
      description:
        "Five Iron Golf in Boston Seaport offers an urban indoor golf experience with golf simulators, lessons, swing evaluations, a sports bar, and more.",
    },
    sections: {
      hero: {
        title: "Boston",
        subtitle: "Seaport",
        backgroundImage:
          "https://fiveirongolf.com/wp-content/uploads/2024/08/RN_3.jpg",
        description:
          "Located in Boston's vibrant Seaport District, Five Iron Golf offers a high-tech golf experience with harbor views. Golfers of all levels can enjoy top-tier simulators, lessons, and a full-service bar.",
        contactInfo: {
          address: "399 Congress St, Boston, MA 02210",
          phone: "(617) 453-4653",
          email: "seaport@fiveirongolf.com",
        },
        cta: {
          text: "Book Now",
          url: "https://booking.fiveirongolf.com/select-experience?location=boston-seaport",
        },
      },
      playAndPractice: {
        services: [
          {
            title: "PLAY &",
            subtitle: "PRACTICE",
            description:
              "Outfit with state-of-the-art Trackman technology and high-speed cameras in Boston's most dynamic waterfront district. Perfect for serious practice or casual fun with harbor views.",
            highlights: [
              { label: "Location", text: "Seaport District with harbor views" },
              {
                label: "Technology",
                text: "Trackman simulators with high-speed cameras",
              },
            ],
            primaryCta: { text: "BOOK A SIM", url: "#booking" },
          },
          {
            title: "GOLF",
            subtitle: "INSTRUCTION",
            description:
              "If your swing could use some help, call our on-site experts for golf lessons in Boston. Whether you're looking to break par or just make consistent contact, our highly-trained coaches are here to help.",
            primaryCta: { text: "BOOK A LESSON", url: "#lessons" },
          },
        ],
      },
      hours: {
        backgroundImage:
          "https://fiveirongolf.com/wp-content/uploads/2024/08/RN_3.jpg",
        address: {
          street: "399 Congress St",
          city: "Boston",
          state: "MA",
          zip: "02210",
        },
        regularHours: [
          { days: "Monday - Thursday", hours: "10AM - 11PM" },
          { days: "Friday", hours: "10AM - 12AM" },
          { days: "Saturday", hours: "9AM - 12AM" },
          { days: "Sunday", hours: "9AM - 10PM" },
        ],
      },
    },
  },
];
