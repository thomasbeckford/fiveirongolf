'use client';

import React from 'react';
import { Instagram, Twitter, Youtube, Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';

const Footer = () => {
  return (
    <footer className="bg-fiveiron-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col items-start">
          <Image src="/5i.svg" alt="Logo" width={50} height={50} />

          <h2 className="text-2xl md:text-4xl font-bold tracking-widest mb-4">FIVE IRON GOLF</h2>
          <p className="text-gray-300 text-base md:text-lg mb-8">Its all good form at Five Iron!</p>
        </div>

        <div className="flex justify-start space-x-8 mb-12">
          <Link href="#" className="text-white hover:text-fiveiron-lime transition-colors">
            <Instagram size={32} />
          </Link>
          <Link href="#" className="text-white hover:text-fiveiron-lime transition-colors">
            <Twitter size={32} />
          </Link>
          <Link href="#" className="text-white hover:text-fiveiron-lime transition-colors">
            <Youtube size={32} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-12">
          <div className="space-y-6">
            <Link
              href="#"
              className="block text-white hover:text-fiveiron-lime transition-colors text-lg font-medium tracking-wider"
            >
              CONTACT US
            </Link>
            <Link
              href="#"
              className="block text-white hover:text-fiveiron-lime transition-colors text-lg font-medium tracking-wider"
            >
              BOOK NOW
            </Link>
            <Link
              href="#"
              className="block text-white hover:text-fiveiron-lime transition-colors text-lg font-medium tracking-wider"
            >
              MEMBERSHIP
            </Link>
            <Link
              href="#"
              className="block text-white hover:text-fiveiron-lime transition-colors text-lg font-medium tracking-wider"
            >
              LOCATIONS
            </Link>
          </div>

          <div className="space-y-6">
            <Link
              href="#"
              className="block text-white hover:text-fiveiron-lime transition-colors text-lg font-medium tracking-wider"
            >
              PRIVACY POLICY
            </Link>
            <Link
              href="#"
              className="block text-white hover:text-fiveiron-lime transition-colors text-lg font-medium tracking-wider"
            >
              TERMS AND CONDITIONS
            </Link>
            <Link
              href="#"
              className="block text-white hover:text-fiveiron-lime transition-colors text-lg font-medium tracking-wider"
            >
              FRANCHISING
            </Link>
            <Link
              href="#"
              className="block text-white hover:text-fiveiron-lime transition-colors text-lg font-medium tracking-wider"
            >
              CAREERS
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          <h3 className="text-2xl md:text-3xl font-bold mb-8 tracking-widest">HIT US UP</h3>

          <div className="flex flex-col sm:flex-row gap-6">
            <Button variant="outline">
              <Mail size={24} className="text-fiveiron-sky" />
              <span className="font-bold text-lg tracking-wider">EMAIL</span>
            </Button>

            <Button variant="outline">
              <Phone size={24} className="text-fiveiron-sky" />
              <span className="font-bold text-lg tracking-wider">CALL</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="w-full bg-primary text-primary-foreground text-lg text-center py-3">
        <p className="text-sm">Five Iron Golf 2025 ® All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
