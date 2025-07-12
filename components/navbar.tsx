'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import Image from 'next/image';
import NearestLocations from './nearest-locations';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { DialogTitle } from './ui/dialog';

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { name: 'Leagues', href: '/leagues' },
    { name: 'Sim Rentals', href: '/sim-rentals' },
    { name: 'Instructors', href: '/instructors' },
    { name: 'Book Now', href: '/book-now' }
  ];

  return (
    <nav className="bg-fiveiron-black backdrop-blur-sm border-b border-gray-800 sticky top-0 z-40">
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="flex items-center justify-between h-22">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/5i.svg" alt="FiveIron Golf" width={42} height={40} priority />
            <span className="text-white font-bold text-xl tracking-wider">FiveIron Golf</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            <NearestLocations variant="compact" showLabel={false} />
            {links.map((link) => (
              <Link key={link.name} href={link.href} onClick={() => setOpen(false)}>
                <Button
                  variant="link"
                  className={`w-full justify-start text-lg uppercase font-bold transition-colors px-4 py-6 hover:no-underline ${
                    pathname.includes(link.href) ? 'text-fiveiron-lime' : 'text-white hover:text-fiveiron-lime'
                  }`}
                >
                  {link.name}
                </Button>
              </Link>
            ))}
          </div>

          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden text-white hover:text-fiveiron-lime">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-fiveiron-black border-l border-gray-800 w-80 p-4">
              <DialogTitle>FiveIron Golf</DialogTitle>
              <div className="flex flex-col space-y-6 mt-8">
                {/* NearestLocations in mobile */}
                <div className="mb-4">
                  <NearestLocations variant="compact" showLabel={true} />
                </div>

                {/* Mobile Navigation Links */}
                {links.map((link) => (
                  <Link key={link.name} href={link.href} onClick={() => setOpen(false)}>
                    <Button
                      variant="link"
                      className={`w-full justify-start text-lg uppercase font-bold transition-colors px-4 py-6 ${
                        pathname.includes(link.href)
                          ? 'text-fiveiron-lime border-l-4 border-fiveiron-lime'
                          : 'text-white hover:text-fiveiron-lime'
                      }`}
                    >
                      {link.name}
                    </Button>
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
