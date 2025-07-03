"use client";

import React from "react";
import { Menu, Instagram, Twitter, Youtube } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

const menuSections = {
  "VISIT US": [
    { name: "BOOK NOW", href: "/book" },
    { name: "LOCATIONS", href: "/locations" },
  ],
  PLAY: [
    { name: "SIMULATOR PLAY", href: "/play/simulator" },
    { name: "JOIN A LEAGUE", href: "/play/leagues" },
    { name: "WAYS TO PLAY", href: "/play/ways" },
  ],
  PROMOTIONS: [
    { name: "REWARDS", href: "/promotions/rewards" },
    { name: "HAPPY HOUR", href: "/promotions/happy-hour" },
    { name: "ALL PROMOS", href: "/promotions" },
  ],
  PARTY: [
    { name: "SMALL GROUPS (<12)", href: "/party/small-groups" },
    { name: "LARGE GROUPS & BUYOUTS", href: "/party/large-groups" },
    { name: "KIDS' PARTIES", href: "/party/kids" },
    { name: "MOBILE SIMULATORS", href: "/party/mobile" },
  ],
  PRACTICE: [
    { name: "MEMBERSHIP", href: "/practice/membership" },
    { name: "SWING EVALUATION", href: "/practice/swing-evaluation" },
    { name: "LESSONS", href: "/practice/lessons" },
    { name: "CALLAWAY TOUR FITTING", href: "/practice/tour-fitting" },
  ],
  "OUR PARTNERS": [{ name: "FANATICS", href: "/partners/fanatics" }],
  "ABOUT US": [
    { name: "BLOG", href: "/about/blog" },
    { name: "TECHNOLOGY", href: "/about/technology" },
    { name: "SHOP & GIFT CARDS", href: "/about/shop" },
    { name: "FRANCHISING", href: "/about/franchising" },
    { name: "CAREERS", href: "/about/careers" },
    { name: "FAQ", href: "/about/faq" },
    { name: "CONTACT US", href: "/about/contact" },
  ],
};

function FullScreenMenu() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <SheetTrigger className="p-2 text-white hover:text-primary transition-colors">
          <Menu className="w-6 h-6" />
          <span className="sr-only">Open menu</span>
        </SheetTrigger>
      </SheetTrigger>

      <SheetContent
        side="top"
        className="w-full h-screen bg-black border-none p-0 overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-xl">5I</span>
            </div>
            <SheetTitle className="text-white font-bold text-xl tracking-wider">
              FIVE IRON GOLF
            </SheetTitle>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-6 lg:p-12 min-h-[calc(100vh-120px)]">
          {/* Menu Sections */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(menuSections).map(([sectionTitle, items]) => (
              <div key={sectionTitle} className="space-y-4">
                <h3 className="text-primary font-bold text-sm tracking-wider">
                  {sectionTitle}
                </h3>
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="text-white hover:text-primary transition-colors text-sm font-medium block"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Right Side Image/Content */}
          <div className="lg:col-span-1 flex flex-col justify-between">
            {/* Golf Image Placeholder */}
            <div className="bg-gray-800 rounded-lg aspect-square mb-8 flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-primary to-gray-900 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-16 h-16 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold">⛳</span>
                  </div>
                  <p className="text-sm opacity-80">
                    Experience Golf
                    <br />
                    Like Never Before
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media & Footer */}
            <div className="space-y-6">
              <div>
                <h4 className="text-white font-medium text-sm mb-3">
                  FOLLOW US
                </h4>
                <div className="flex space-x-4">
                  <Link
                    href="#"
                    className="text-primary hover:text-white transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </Link>
                  <Link
                    href="#"
                    className="text-primary hover:text-white transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </Link>
                  <Link
                    href="#"
                    className="text-primary hover:text-white transition-colors"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-5 h-5" />
                  </Link>
                </div>
              </div>

              <div className="text-xs text-gray-400 space-y-1">
                <Link
                  href="/privacy"
                  className="block hover:text-white transition-colors"
                >
                  Privacy policy
                </Link>
                <Link
                  href="/terms"
                  className="block hover:text-white transition-colors"
                >
                  Terms and conditions
                </Link>
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
    <nav className="bg-background backdrop-blur-sm border-b border-gray-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Image src="/5i.svg" alt="FiveIron Golf" width={42} height={40} />

          <div className="hidden lg:flex items-center space-x-8">
            <Link
              href="/locations"
              className="text-white hover:text-primary transition-colors font-medium"
            >
              Locations
            </Link>
            <Link
              href="/play"
              className="text-white hover:text-primary transition-colors font-medium"
            >
              Play
            </Link>
            <Link
              href="/party"
              className="text-white hover:text-primary transition-colors font-medium"
            >
              Party
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/book">
              <Button>Book Now</Button>
            </Link>

            <FullScreenMenu />
          </div>
        </div>
      </div>
    </nav>
  );
}
