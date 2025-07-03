import { getLocationSection } from "@/server/getLocationInfo";
import { PlayAndPracticeSection } from "@/sections/PlayAndPractice";
import { GallerySection } from "@/sections/GallerySection";

import { HoursSection } from "@/sections/HoursSection";
import { MembershipSection } from "@/sections/MembershipSection";

import { ReviewsSection } from "@/sections/ReviewsSection";

import { HeroSection } from "@/sections/HeroSection";
import { CoachesSection } from "@/sections/MeetTheCoaches";
import { MultisportSection } from "@/sections/MultisportSection";
import { DuckpinSection } from "@/sections/DuckpinSection";
import { FeaturesSection } from "@/sections/FeaturesSection";
import { FooterSection } from "@/sections/FooterSection";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const data = await getLocationSection({ slug });

  if (!data) {
    return {
      title: "Five Iron Golf - Location not found",
    };
  }

  return {
    title: data.seo.title,
    description: data.seo.description,
  };
};

export default async function LocationsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getLocationSection({ slug });

  if (!data) {
    return <div>Five Iron Golf - Location not found</div>;
  }

  const { sections } = data;

  return (
    <div className="location-page">
      {!sections.hero.hidden && <HeroSection data={data} />}
      {!sections.playAndPractice.hidden && (
        <PlayAndPracticeSection data={sections.playAndPractice} />
      )}
      {!sections.gallery.hidden && <GallerySection data={sections.gallery} />}

      {!sections.hours.hidden && (
        <HoursSection
          data={sections.hours}
          address={data.sections.hero.contactInfo.address}
        />
      )}
      {!sections.membership.hidden && (
        <MembershipSection data={sections.membership} />
      )}
      {!sections.coaches.hidden && <CoachesSection data={sections.coaches} />}
      {!sections.multisport.hidden && (
        <MultisportSection data={sections.multisport} />
      )}
      {!sections.duckpin.hidden && <DuckpinSection data={sections.duckpin} />}

      {!sections.reviews.hidden && <ReviewsSection data={sections.reviews} />}
      {!sections.features.hidden && (
        <FeaturesSection data={sections.features} />
      )}
      {!sections.footer.hidden && <FooterSection data={sections.footer} />}
    </div>
  );
}
