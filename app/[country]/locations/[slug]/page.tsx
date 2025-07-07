import { fetchLocation } from '@/server/locations/fetch';
import { ActivitySection } from '@/sections/ActivitySection';
import { GallerySection } from '@/sections/GallerySection';
import { HoursSection } from '@/sections/HoursSection';
import { MembershipSection } from '@/sections/MembershipSection';
import { ReviewsSection } from '@/sections/ReviewsSection';
import { HeroSection } from '@/sections/HeroSection';
import { InstructorsSection } from '@/sections/InstructorsSection';
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
  InstructorsContent,
  MultisportContent,
  DuckpinContent,
  ReviewsContent,
  FeaturesContent,
  FooterContent
} from '@/lib/schemas/sections';

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const data = await fetchLocation(slug);

  console.log('A0', data);

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

// Función helper con nombre más consistente
const getSectionByPage = (sections: Section[], page: PageSection): Section | undefined => {
  return sections.find((section) => section.page === page);
};

export default async function LocationsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await fetchLocation(slug);

  if (!data) {
    return <div>Five Iron Golf - Location not found</div>;
  }

  const { sections } = data;

  // Obtener contenido de todas las secciones
  const heroContent = getSectionByPage(sections, PageSection.HERO)?.content as HeroContent;
  const activityContent = getSectionByPage(sections, PageSection.ACTIVITIES)?.content as ActivityContent;
  const galleryContent = getSectionByPage(sections, PageSection.GALLERY)?.content as GalleryContent;
  const hoursContent = getSectionByPage(sections, PageSection.HOURS)?.content as HoursContent;
  const membershipContent = getSectionByPage(sections, PageSection.MEMBERSHIP)?.content as MembershipContent;
  const instructorsContent = getSectionByPage(sections, PageSection.INSTRUCTORS)?.content as InstructorsContent;
  const multisportContent = getSectionByPage(sections, PageSection.MULTISPORT)?.content as MultisportContent;
  const duckpinContent = getSectionByPage(sections, PageSection.DUCKPIN)?.content as DuckpinContent;
  const reviewsContent = getSectionByPage(sections, PageSection.REVIEWS)?.content as ReviewsContent;
  const featuresContent = getSectionByPage(sections, PageSection.FEATURES)?.content as FeaturesContent;
  const footerContent = getSectionByPage(sections, PageSection.FOOTER)?.content as FooterContent;

  if (!heroContent) {
    return <div>Five Iron Golf - Location not found</div>;
  }

  return (
    <div className="location-page">
      <HeroSection content={heroContent} slug={slug} />
      {activityContent && <ActivitySection content={activityContent} />}
      {galleryContent && <GallerySection content={galleryContent} />}
      {hoursContent && <HoursSection content={hoursContent} />}
      {membershipContent && <MembershipSection content={membershipContent} />}
      {instructorsContent && <InstructorsSection content={instructorsContent} />}
      {multisportContent && <MultisportSection content={multisportContent} />}
      {duckpinContent && <DuckpinSection content={duckpinContent} />}
      {reviewsContent && <ReviewsSection content={reviewsContent} />}
      {featuresContent && <FeaturesSection content={featuresContent} />}
      {footerContent && <FooterSection content={footerContent} />}
    </div>
  );
}
