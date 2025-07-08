'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import Image from 'next/image';
import NearestLocations from './nearest-locations';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const activeSection = pathname.split('/')[2];

  const links = [
    { name: 'Leagues', href: '/leagues' },
    { name: 'Book Now', href: '/book-now' },
    { name: 'Sim Rentals', href: '/sim-rentals' },
    { name: 'Instructors', href: '/instructors' }
  ];

  return (
    <nav className="bg-fiveiron-black backdrop-blur-sm border-b border-gray-800 sticky top-0 z-40">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex items-center justify-between h-22">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/5i.svg" alt="FiveIron Golf" width={42} height={40} />
            <span className=" text-white font-bold text-xl tracking-wider">FiveIron Golf</span>
          </Link>

          <div className="flex items-center space-x-4">
            <NearestLocations variant="compact" showLabel={false} />
            {links.map((link) => (
              <Link key={link.name} href={link.href}>
                <Button
                  variant="link"
                  className={`text-xl uppercase font-bold text-white hover:text-lime-200 transition-colors !no-underline ${
                    activeSection === link.name.toLowerCase() ? 'text-fiveiron-lime' : ''
                  }`}
                >
                  {link.name}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
