'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NotFound() {
  const pathname = usePathname();
  const slug = pathname.split('/')[2];

  return (
    <div>
      <h2>{slug} Not Found</h2>
      <p>Could not find requested location</p>
      <Link href="/locations">Return to Locations</Link>
    </div>
  );
}
