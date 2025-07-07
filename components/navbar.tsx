'use client';

import React from 'react';
import { Menu, Instagram, Twitter, Youtube, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Link from 'next/link';
import { Button } from './ui/button';
import Image from 'next/image';
import { NearestLocations } from './nearest-locations';

const menuSections = {
  'VISIT US': [
    { name: 'BOOK NOW', href: '/book' },
    { name: 'LOCATIONS', href: '/locations' }
  ],
  PLAY: [
    { name: 'SIMULATOR PLAY', href: '/play/simulator' },
    { name: 'JOIN A LEAGUE', href: '/play/leagues' },
    { name: 'WAYS TO PLAY', href: '/play/ways' }
  ],
  PROMOTIONS: [
    { name: 'REWARDS', href: '/promotions/rewards' },
    { name: 'HAPPY HOUR', href: '/promotions/happy-hour' },
    { name: 'ALL PROMOS', href: '/promotions' }
  ],
  PARTY: [
    { name: 'SMALL GROUPS (<12)', href: '/party/small-groups' },
    { name: 'LARGE GROUPS & BUYOUTS', href: '/party/large-groups' },
    { name: "KIDS' PARTIES", href: '/party/kids' },
    { name: 'MOBILE SIMULATORS', href: '/party/mobile' }
  ],
  PRACTICE: [
    { name: 'MEMBERSHIP', href: '/practice/membership' },
    { name: 'SWING EVALUATION', href: '/practice/swing-evaluation' },
    { name: 'LESSONS', href: '/practice/lessons' },
    { name: 'CALLAWAY TOUR FITTING', href: '/practice/tour-fitting' }
  ],
  'OUR PARTNERS': [{ name: 'FANATICS', href: '/partners/fanatics' }],
  'ABOUT US': [
    { name: 'BLOG', href: '/about/blog' },
    { name: 'TECHNOLOGY', href: '/about/technology' },
    { name: 'SHOP & GIFT CARDS', href: '/about/shop' },
    { name: 'FRANCHISING', href: '/about/franchising' },
    { name: 'CAREERS', href: '/about/careers' },
    { name: 'FAQ', href: '/about/faq' },
    { name: 'CONTACT US', href: '/about/contact' }
  ]
};

function FullScreenMenu() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="p-2 text-white hover:text-fiveiron-lime transition-colors">
          <Menu className="w-6 h-6" />
          <span className="sr-only">Open menu</span>
        </button>
      </SheetTrigger>

      <SheetContent side="top" className="w-full h-screen bg-fiveiron-black border-none p-0 overflow-y-auto ">
        <div className="max-w-7xl mx-auto ">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4  ">
            <div className="flex items-center space-x-3 ">
              <div className="w-8 h-8 border border-white rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">5i</span>
              </div>
              <SheetTitle className="text-white font-bold text-lg tracking-wider">FIVE IRON GOLF</SheetTitle>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="flex items-center space-x-2 text-white hover:text-fiveiron-lime transition-colors"
            >
              <span className="text-sm font-medium tracking-wider">CLOSE</span>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)] ">
            {/* Menu Sections - Left Side */}
            <div className="flex-1 px-6 py-8 lg:px-12 lg:py-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 max-w-6xl">
                {Object.entries(menuSections).map(([sectionTitle, items]) => (
                  <div key={sectionTitle} className="space-y-4">
                    <h3 className="text-fiveiron-lime font-bold text-sm tracking-wider uppercase">{sectionTitle}</h3>
                    <ul className="space-y-3">
                      {items.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:text-fiveiron-lime transition-colors text-sm font-normal block tracking-wide"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Bottom Section - Social & Legal */}
              <div className="mt-12 lg:mt-16">
                <div className="flex flex-col space-y-6 lg:flex-row lg:justify-between lg:items-end">
                  <div>
                    <h4 className="text-white font-medium text-sm mb-3 tracking-wider">FOLLOW US</h4>
                    <div className="flex space-x-4">
                      <Link
                        href="#"
                        className="text-fiveiron-lime hover:text-white transition-colors"
                        aria-label="Instagram"
                      >
                        <Instagram className="w-5 h-5" />
                      </Link>
                      <Link
                        href="#"
                        className="text-fiveiron-lime hover:text-white transition-colors"
                        aria-label="Twitter"
                      >
                        <Twitter className="w-5 h-5" />
                      </Link>
                      <Link
                        href="#"
                        className="text-fiveiron-lime hover:text-white transition-colors"
                        aria-label="YouTube"
                      >
                        <Youtube className="w-5 h-5" />
                      </Link>
                    </div>
                  </div>

                  <div className="flex space-x-6 text-xs text-gray-400">
                    <Link href="/privacy" className="hover:text-white transition-colors tracking-wider">
                      Privacy policy
                    </Link>
                    <span>|</span>
                    <Link href="/terms" className="hover:text-white transition-colors tracking-wider">
                      Terms and conditions
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Image */}
            <div className="hidden lg:flex lg:w-80 xl:w-96 items-center justify-center p-8">
              <div className="relative">
                <Image
                  src="/image-menu-1.webp"
                  alt="Golf player"
                  width={300}
                  height={400}
                  className="object-cover rounded-lg"
                />
                {/* Yellow border accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-fiveiron-lime"></div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default function Navbar() {
  return (
    <nav className="bg-fiveiron-black backdrop-blur-sm border-b border-gray-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Image src="/5i.svg" alt="FiveIron Golf" width={42} height={40} />

          <NearestLocations variant="compact" />
          <div className="flex items-center space-x-4">
            <Link href="/book">
              <Button className="text-xl uppercase font-bold text-white hover:text-fiveiron-lime" variant="ghost">
                Book Now
              </Button>
            </Link>

            <FullScreenMenu />
          </div>
        </div>
      </div>
    </nav>
  );
}
