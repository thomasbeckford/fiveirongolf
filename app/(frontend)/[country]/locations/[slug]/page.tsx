import { ActivitySection } from '@/screens/locations/ActivitySection';
import { GallerySection } from '@/screens/locations/GallerySection';
import { HoursSection } from '@/screens/locations/HoursSection';
import { MembershipSection } from '@/screens/locations/MembershipSection';
import { ReviewSection } from '@/screens/locations/ReviewSection';
import { HeroSection } from '@/screens/locations/HeroSection';
import { InstructorSection } from '@/screens/locations/InstructorSection';
import { MultisportSection } from '@/screens/locations/MultisportSection';
import { DuckpinSection } from '@/screens/locations/DuckpinSection';
import { FeaturesSection } from '@/screens/locations/FeaturesSection';
import { FooterSection } from '@/screens/locations/FooterSection';
import { notFound } from 'next/navigation';
import { getLocationBySlug } from '@/server/actions';

export default async function LocationsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const location = await getLocationBySlug(slug);
  if (!location) return notFound();

  console.log('Location', location);

  return (
    <div className="animate-in fade-in duration-300">
      {location.HeroSchema && <HeroSection location={location} />}
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
    </div>
  );
}
