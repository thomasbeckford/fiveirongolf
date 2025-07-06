import { CallToAction } from "@/components/call-to-action";
import { HighImpactHero } from "@/components/heros/HighImpact";
import Image from "next/image";
import { NeonButton } from "@/components/ui/neon-button";
import { SubscribeForm } from "@/components/subscribe-form";
import AutoMarquee from "@/components/AutoMarquee";

export default async function Home() {
  const homepage = {
    title: "Five Iron Golf",
  };

  const neonButtons = [
    { variant: "pink", label: "Book a Sim" },
    { variant: "blue", label: "Take a Lesson" },
    { variant: "primary", label: "Plan a Party" },
    { variant: "blue", label: "Join a League" },
    { variant: "primary", label: "Membership" },
    { variant: "pink", label: "Promotions" },
  ] as const;

  return (
    <div className="flex flex-col gap-16">
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

      <section className="w-full px-4 md:px-12 ">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {neonButtons.map((button) => (
            <NeonButton key={button.label} variant={button.variant}>
              {button.label}
            </NeonButton>
          ))}
        </div>
      </section>

      <section className="w-full flex flex-col md:flex-row gap-4 md:gap-0 px-4 md:px-12 text-center md:text-left justify-between max-w-7xl mx-auto items-center">
        <Image src="/itsallgood.svg" alt="Logo" width={480} height={220} />
        <p className="text-lg max-w-xl">
          We’re blurring the lines between indoor golf and entertainment.
          State-of-the-art simulators and world-class instruction meet premium
          events and amenities plus delectable food and cocktail menus. Five
          Iron is fostering a dynamic, engaging, and fun atmosphere for golf
          enthusiasts and party-goers alike.
        </p>
      </section>

      <section className="w-full flex justify-center">
        <AutoMarquee />
      </section>

      <SubscribeForm />
    </div>
  );
}
