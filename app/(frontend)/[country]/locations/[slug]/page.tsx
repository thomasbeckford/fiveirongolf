import { ActivitySection } from '@/screens/locations/ActivitySection';
import { DuckpinSection } from '@/screens/locations/DuckpinSection';
import { FeaturesSection } from '@/screens/locations/FeaturesSection';
import { FooterSection } from '@/screens/locations/FooterSection';
import { GallerySection } from '@/screens/locations/GallerySection';
import { HeroSection } from '@/screens/locations/HeroSection';
import { HoursSection } from '@/screens/locations/HoursSection';
import { InstructorSection } from '@/screens/locations/InstructorSection';
import { MembershipSection } from '@/screens/locations/MembershipSection';
import { MultisportSection } from '@/screens/locations/MultisportSection';
import { ReviewSection } from '@/screens/locations/ReviewSection';
import { getLocationBySlug } from '@/server/actions';
import { notFound } from 'next/navigation';

export default async function LocationsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const location = await getLocationBySlug(slug);
  if (!location) return notFound();

  console.log('Location', location);

  return (
    <div className="animate-in fade-in duration-1200">
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
