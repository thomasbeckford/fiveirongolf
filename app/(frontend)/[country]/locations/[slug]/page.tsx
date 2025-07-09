import { ActivitySection } from '@/sections/ActivitySection';
import { GallerySection } from '@/sections/GallerySection';
import { HoursSection } from '@/sections/HoursSection';
import { MembershipSection } from '@/sections/MembershipSection';
import { ReviewSection } from '@/sections/ReviewSection';
import { HeroSection } from '@/sections/HeroSection';
import { InstructorSection } from '@/sections/InstructorSection';
import { MultisportSection } from '@/sections/MultisportSection';
import { DuckpinSection } from '@/sections/DuckpinSection';
import { FeaturesSection } from '@/sections/FeaturesSection';
import { FooterSection } from '@/sections/FooterSection';

import { notFound } from 'next/navigation';
import { getLocationBySlug } from '@/server/api';

export default async function LocationsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const location = await getLocationBySlug(slug);

  if (!location) {
    return notFound();
  }

  console.log(location);

  return (
    <>
      <HeroSection location={location} />
      {location.ActivitySchema && <ActivitySection location={location} />}
      {location.GallerySchema && <GallerySection location={location} />}
      {location.HoursSchema && <HoursSection location={location} />}
      {location.MembershipSchema && <MembershipSection location={location} />}
      {location.InstructorSchema && <InstructorSection location={location} />}
      {location.MultisportSchema && <MultisportSection location={location} />}
      {location.DuckpinSchema && <DuckpinSection location={location} />}
      {location.ReviewSchema && <ReviewSection location={location} />}
      {location.FeaturesSchema && <FeaturesSection location={location} />}
      {location.FooterSchema && <FooterSection location={location} />}
    </>
  );
}
