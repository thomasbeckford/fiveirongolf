import { CallToAction } from "@/components/call-to-action";
import { HighImpactHero } from "@/components/heros/HighImpact";
import Image from "next/image";
import { NeonButton } from "@/components/ui/neon-button";

export default async function Home() {
  const homepage = {
    title: "Five Iron Golf hola",
  };

  return (
    <div>
      <HighImpactHero
        backgroundType="video"
        backgroundSrc="/videos/world.mp4"
        overlayOpacity={0.5}
      >
        <div className="flex flex-col items-center gap-4">
          <Image src="/5i.svg" alt="Logo" width={100} height={100} />
          <h2 className="uppercase text-5xl font-bold">{homepage.title}</h2>
        </div>
      </HighImpactHero>

      {/* CTA Section */}
      <section className="">
        <CallToAction />
      </section>

      {/* Neon buttons Section */}
      <section className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <NeonButton variant="pink">Book a Sim</NeonButton>
          <NeonButton variant="blue">Take a Lesson</NeonButton>
          <NeonButton variant="green">Plan a Party</NeonButton>
          <NeonButton variant="purple">Join a League</NeonButton>
          <NeonButton variant="blue">Membership</NeonButton>
          <NeonButton variant="green">Promotions</NeonButton>
        </div>
      </section>
    </div>
  );
}
