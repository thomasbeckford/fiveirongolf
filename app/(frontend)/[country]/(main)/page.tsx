import { CallToAction } from '@/components/call-to-action';
import Image from 'next/image';
import { NeonButton } from '@/components/ui/neon-button';
import { SubscribeForm } from '@/components/subscribe-form';
import AutoMarquee from '@/components/auto-marquee';
import LandingHero from '@/components/landing-hero';

const homepage = {
  title: 'Five Iron Golf',
  buttons: [
    { variant: 'pink', label: 'Book a Sim' },
    { variant: 'blue', label: 'Take a Lesson' },
    { variant: 'primary', label: 'Plan a Party' },
    { variant: 'blue', label: 'Join a League' },
    { variant: 'primary', label: 'Membership' },
    { variant: 'pink', label: 'Promotions' }
  ] as const,
  about: {
    description: `We’re blurring the lines between indoor golf and entertainment. State-of-the-art simulators and world-class instruction meet premium events and amenities plus delectable food and cocktail menus. Five Iron is fostering a dynamic, engaging, and fun atmosphere for golf enthusiasts and party-goers alike.`
  }
};

export default async function Home() {
  return (
    <>
      <div className="flex flex-col gap-16 ">
        <section id="hero">
          <LandingHero />
        </section>

        <section id="cta">
          <CallToAction />
        </section>

        <section id="buttons" className="w-full px-4 md:px-12 ">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {homepage.buttons.map((button) => (
              <NeonButton key={button.label} variant={button.variant}>
                {button.label}
              </NeonButton>
            ))}
          </div>
        </section>

        <section
          id="about"
          className="w-full flex flex-col md:flex-row gap-4 md:gap-0 md:px-12 text-center md:text-left justify-between max-w-7xl mx-auto items-center "
        >
          <Image src="/itsallgood.svg" alt="Logo" width={480} height={220} />
          <p className="text-lg max-w-xl">{homepage.about.description}</p>
        </section>

        <section id="marquee" className="w-full flex justify-center">
          <AutoMarquee />
        </section>

        <section id="subscribe">
          <SubscribeForm />
        </section>
      </div>
    </>
  );
}
