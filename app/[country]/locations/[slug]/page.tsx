import { fetchLocation } from '@/server/locations/fetch';
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
import { PageSection, Section } from '@/lib/generated/prisma';
import {
  HeroContent,
  ActivityContent,
  GalleryContent,
  HoursContent,
  MembershipContent,
  InstructorContent,
  MultisportContent,
  DuckpinContent,
  ReviewContent,
  FeaturesContent,
  FooterContent
} from '@/lib/schemas/sections';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

export const generateStaticParams = async () => {
  const locations = await prisma.location.findMany();
  return locations.map((location) => ({ slug: location.slug }));
};

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const data = await fetchLocation(slug);

  if (!data) {
    return {
      title: 'Five Iron Golf - Location not found'
    };
  }

  return {
    title: data.seo?.title || `Five Iron Golf - ${data.name}`,
    description:
      data.seo?.description || `Visit Five Iron Golf ${data.name} for indoor golf simulators, lessons, and more.`
  };
};

const getSectionByPage = (sections: Section[], page: PageSection): Section | undefined => {
  return sections.find((section) => section.page === page && section.enabled);
};

export default async function LocationsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await fetchLocation(slug);

  if (!data) {
    return notFound();
  }

  const { sections } = data;

  const heroContent = getSectionByPage(sections, PageSection.HERO)?.content as HeroContent;
  const activityContent = getSectionByPage(sections, PageSection.ACTIVITIES)?.content as ActivityContent;
  const galleryContent = getSectionByPage(sections, PageSection.GALLERY)?.content as GalleryContent;
  const hoursContent = getSectionByPage(sections, PageSection.HOURS)?.content as HoursContent;
  const membershipContent = getSectionByPage(sections, PageSection.MEMBERSHIP)?.content as MembershipContent;
  const instructorContent = getSectionByPage(sections, PageSection.INSTRUCTORS)?.content as InstructorContent;
  const multisportContent = getSectionByPage(sections, PageSection.MULTISPORT)?.content as MultisportContent;
  const duckpinContent = getSectionByPage(sections, PageSection.DUCKPIN)?.content as DuckpinContent;
  const reviewContent = getSectionByPage(sections, PageSection.REVIEWS)?.content as ReviewContent;
  const featuresContent = getSectionByPage(sections, PageSection.FEATURES)?.content as FeaturesContent;
  const footerContent = getSectionByPage(sections, PageSection.FOOTER)?.content as FooterContent;

  return (
    <>
      <HeroSection content={heroContent} slug={slug} />
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
