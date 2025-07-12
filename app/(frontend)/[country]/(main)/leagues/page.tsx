import React from 'react';
import { MediumImpactHero } from '@/components/heros/MediumImpact';
import { Heading } from '@/components/ui/heading';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import ScrollMarquee from '@/components/scroll-marquee/index';
import { SplittingText } from '@/components/animate-ui/text/splitting';
import { RollingText } from '@/components/animate-ui/text/rolling';

export default function Leagues() {
  return (
    <div className="flex flex-col space-y-30">
      <MediumImpactHero bottomBar={false}>
        <div className="flex w-full items-center justify-center px-6">
          <div>
            <span className="text-5xl font-semibold tracking-widest uppercase">Five Iron Golf</span>
            <Heading variant="secondary" size="lg" className="flex flex-col items-end text-right">
              <RollingText text="Summer" />
              <SplittingText text="Series" />
            </Heading>
          </div>

          <div className="flex flex-col">
            <Image
              src="https://fiveirongolf.com/wp-content/uploads/2025/05/Bushmills_Logo_White_V2_IrishWhiskey-1-1024x546.png"
              alt="Logo"
              width={280}
              height={150}
              className="max-w-full h-auto"
            />
          </div>
        </div>
      </MediumImpactHero>

      <section id="leagues" className="max-w-screen-2xl mx-auto flex flex-col items-center gap-4">
        <div className="flex w-full mx-auto">
          <Image
            src="https://fiveirongolf.com/wp-content/uploads/2024/03/Hero-Summer-Leagues-scaled-1-1024x415.jpg"
            alt="Logo"
            width={1280}
            height={512}
            className="max-w-full h-auto "
            style={{
              maskImage: `
                linear-gradient(to left, black 20%, transparent),
                linear-gradient(to bottom, black 90%, transparent),
                linear-gradient(to top, black 90%, transparent)
              `,
              maskComposite: 'intersect'
            }}
          />

          <Image
            src="https://fiveirongolf.com/wp-content/uploads/2024/03/Play-Summer-Leagues-1024x399.jpg"
            alt="Logo"
            width={1280}
            height={512}
            className="max-w-full h-auto "
            style={{
              maskImage: `
                linear-gradient(to right, black 20%, transparent),
                linear-gradient(to bottom, black 90%, transparent),
                linear-gradient(to top, black 90%, transparent)
              `,
              maskComposite: 'intersect'
            }}
          />
        </div>

        <Button>Sign up today</Button>
      </section>

      <section id="leagues-info" className="max-w-screen-2xl mx-auto flex flex-col md:gap-4 gap-12">
        <Heading variant="white" size="lg" className="flex flex-col items-center text-center lowercase">
          <p>
            7 Rounds of Play, 4 Scores Count, 2-Person Teams,
            <span className="text-fiveiron-yellow">1 Golf Getaway</span> Up for Grabs!
          </p>
        </Heading>

        <p className="text-center text-white max-w-xl mx-auto">
          Two players compete weekly, but load your bench with as many subs as you think you need to win! The team’s 4
          best scores count so don’t sweat it in you miss a week. Free agents are welcome, we’ll pair you up!
        </p>
      </section>

      <section id="marquee" className="flex flex-col space-y-12">
        <ScrollMarquee className="bg-red-600 font-extrabold" />
      </section>

      <section id="leagues-prizes" className="max-w-screen-2xl mx-auto space-y-20">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <Image
            src="https://fiveirongolf.com/wp-content/uploads/2024/06/league-champions.jpg"
            alt="Logo"
            width={512}
            height={512}
            className="max-w-full h-auto"
          />

          <div className="flex flex-col  ">
            <Heading variant="white" size="lg" className="flex items-start space-x-1 flex-nowrap capitalize">
              <span className="text-fiveiron-yellow whitespace-nowrap">7 Rounds!</span>
              <span className="whitespace-nowrap">of Play</span>
            </Heading>

            <p className="text-white  max-w-sm">
              Summer Series: 6 weeks, 4 best scores count, 2-person teams, plus the use of handicaps to level the
              playing field! Compete for amazing Grand Prizes in both Gross and Net categories.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-12">
          <div className="flex flex-col">
            <Heading variant="white" size="lg" className="flex flex-row capitalize ">
              <span className="text-fiveiron-yellow">Grand Prize</span>
            </Heading>

            <p className="text-white  max-w-sm ">
              The team at the top of each leaderboard at series’ end will be heading to the Casa de Campo Resort in the
              Dominican Republic for a 4-night stay including 6 rounds of golf!
            </p>

            <Button variant="link">Price policy</Button>
          </div>
          <Image
            src="https://fiveirongolf.com/wp-content/uploads/2024/01/leagues-image-1.png"
            alt="Logo"
            width={512}
            height={512}
            className="max-w-full h-auto"
          />
        </div>
      </section>

      <section id="leagues-prizes" className="w-full  mx-auto">
        <div className="flex flex-col md:flex-row items-center ">
          <Image
            src="https://fiveirongolf.com/wp-content/uploads/2024/06/two-people-team.jpg"
            alt="Logo"
            width={1280}
            height={512}
            className="max-w-full h-auto w-1/2"
          />
          <div className="w-1/2 mx-auto flex flex-col gap-4 items-center">
            <Heading variant="white" size="lg" className="flex flex-row capitalize ">
              <span className="text-fiveiron-yellow">Summer Series Schedule</span>
            </Heading>
            <div className="flex flex-col gap-2">
              <p>July 7-13 Handicap Week</p>
              <p>July 14-20 Welcome Week</p>
              <p>July 21-27 The Open Week</p>
              <p>July 28 – August 3 Casa de Campo Week</p>
              <p>August 4-10 Play like a Pro Week</p>
              <p>August 11-17 Ryder Cup Week</p>
              <p>August 18-24 Greensomes Week</p>
              <p>August 25-31 Championship Week</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center ">
          <div className="w-1/2 mx-auto flex flex-col gap-4 items-center">
            <Heading variant="white" size="lg" className="flex flex-row capitalize w-1/2">
              <span className="text-fiveiron-yellow">Upcoming Seasons</span>
            </Heading>

            <div className="flex flex-col gap-2">
              <p>July 7-13 Handicap Week</p>
              <p>July 14-20 Welcome Week</p>
              <p>July 21-27 The Open Week</p>
              <p>July 28 – August 3 Casa de Campo Week</p>
              <p>August 4-10 Play like a Pro Week</p>
              <p>August 11-17 Ryder Cup Week</p>
              <p>August 18-24 Greensomes Week</p>
              <p>August 25-31 Championship Week</p>
            </div>
          </div>
          <Image
            src="https://fiveirongolf.com/wp-content/uploads/2024/05/summer-hero.jpg"
            alt="Logo"
            width={1280}
            height={512}
            className="max-w-full h-auto w-1/2"
          />
        </div>
      </section>
    </div>
  );
}
