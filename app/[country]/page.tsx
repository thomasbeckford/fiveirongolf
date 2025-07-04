import { CallToAction } from "@/components/call-to-action";
import { HighImpactHero } from "@/components/heros/HighImpact";
import Image from "next/image";
import { NeonButton } from "@/components/ui/neon-button";
import { SubscribeForm } from "@/components/subscribe-form";

export default async function Home() {
  const homepage = {
    title: "Five Iron Golf",
  };

  return (
    <div className="flex flex-col gap-20">
      <div className="bg-fiveiron-tangerine p-12">
        <HighImpactHero
          backgroundType="video"
          backgroundSrc="/videos/world.mp4"
          overlayOpacity={0.5}
        >
          <div className="flex flex-col items-center gap-4 ">
            <Image src="/5i.svg" alt="Logo" width={100} height={100} />
            <h2 className="uppercase text-5xl font-semibold tracking-widest">
              {homepage.title}
            </h2>
          </div>
        </HighImpactHero>
      </div>

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

      <section className="w-full flex justify-between max-w-7xl mx-auto items-center">
        <Image src="/itsallgood.svg" alt="Logo" width={480} height={220} />
        <p className="text-lg max-w-xl">
          We’re blurring the lines between indoor golf and entertainment.
          State-of-the-art simulators and world-class instruction meet premium
          events and amenities plus delectable food and cocktail menus. Five
          Iron is fostering a dynamic, engaging, and fun atmosphere for golf
          enthusiasts and party-goers alike.
        </p>
      </section>

      <SubscribeForm />
    </div>
  );
}
