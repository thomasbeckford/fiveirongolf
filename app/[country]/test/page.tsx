import { getLocationBySlug } from '@/sanity/queries/getLocationBySlug';
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

export default async function TestPage() {
  const data = await getLocationBySlug('test');

  if (!data) {
    return <div>Five Iron Golf - Location not found</div>;
  }

  const heroContent = data?.HERO;
  const activityContent = data?.ACTIVITIES;
  const galleryContent = data?.GALLERY;
  const hoursContent = data?.HOURS;
  const membershipContent = data?.MEMBERSHIP;
  const instructorContent = data?.INSTRUCTORS;
  const multisportContent = data?.MULTISPORT;
  const duckpinContent = data?.DUCKPIN;
  const reviewContent = data?.REVIEWS;
  const featuresContent = data?.FEATURES;
  const footerContent = data?.FOOTER;

  console.log('data', data);

  return (
    <>
      <HeroSection content={heroContent} slug={'test'} />
      {activityContent && <ActivitySection content={activityContent} />}
      {galleryContent && <GallerySection content={galleryContent} />}
      {hoursContent && <HoursSection content={hoursContent} />}
      {membershipContent && <MembershipSection content={membershipContent} />}
      {instructorContent && <InstructorSection content={instructorContent} />}
      {multisportContent && <MultisportSection content={multisportContent} />}
      {duckpinContent && <DuckpinSection content={duckpinContent} />}
      {reviewContent && <ReviewSection content={reviewContent} />}
      {featuresContent && <FeaturesSection content={featuresContent} />}
      {footerContent && <FooterSection content={footerContent} />}
    </>
  );
}
