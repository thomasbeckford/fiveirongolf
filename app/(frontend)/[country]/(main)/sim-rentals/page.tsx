import React from 'react';
import { MediumImpactHero } from '@/components/heros/MediumImpact';
import { Heading } from '@/components/ui/heading';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from '@/components/ui/select';
import { LocationSelect } from '@/components/location-select';

export default function Leagues() {
  return (
    <div className="flex flex-col gap-20">
      <MediumImpactHero bottomBar={false}>
        <div className="flex flex-col text-center  max-w-xl mx-auto">
          <span className="text-5xl font-semibold tracking-widest uppercase">Five Iron Golf</span>
          <Heading variant="secondary" size="lg" className="flex flex-col">
            <span>Simulator</span>
            <span>Rentals</span>
          </Heading>
        </div>
      </MediumImpactHero>

      <div className="max-w-screen-2xl mx-auto flex flex-col items-center gap-4">
        <div className="w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-1 lg:gap-2">
            {/* Play a round */}
            <div className="group">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <Image
                  src="https://fiveirongolf.com/wp-content/uploads/2023/12/buckbay-golfer.jpg"
                  alt="Golfer playing at Buck Bay course"
                  width={1280}
                  height={512}
                  className="w-full h-64 md:h-72 object-cover transition-transform duration-300 group-hover:scale-105"
                  style={{
                    maskImage: `
              linear-gradient(to left, black 90%, transparent),
              linear-gradient(to bottom, black 90%, transparent),
              linear-gradient(to top, black 90%, transparent),
              linear-gradient(to right, black 90%, transparent)
            `,
                    maskComposite: 'intersect'
                  }}
                />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold tracking-widest uppercase mb-3 text-white">
                Play a round
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Get 18 on one of over 200 famed courses like Pebble Beach or St. Andrews and choose from a variety of
                formats like stroke play, match play, alternate shot and scramble.
              </p>
            </div>

            {/* Perfect your swing */}
            <div className="group">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <Image
                  src="https://fiveirongolf.com/wp-content/uploads/2024/04/1-daily_sim_time-mobile.jpg"
                  alt="Golf swing practice and analysis"
                  width={1280}
                  height={512}
                  className="w-full h-64 md:h-72 object-cover transition-transform duration-300 group-hover:scale-105"
                  style={{
                    maskImage: `
              linear-gradient(to right, black 90%, transparent),
              linear-gradient(to bottom, black 90%, transparent),
              linear-gradient(to top, black 90%, transparent),
              linear-gradient(to left, black 90%, transparent)
            `,
                    maskComposite: 'intersect'
                  }}
                />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold tracking-widest uppercase mb-3 text-white">
                Perfect your swing
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Use shot analysis to dial in your distances, on course practice to pinpoint a specific pain point, or
                bang a bag of balls with target range practice.
              </p>
            </div>

            {/* Games for all ages */}
            <div className="group md:col-span-2 xl:col-span-1">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <Image
                  src="https://fiveirongolf.com/wp-content/uploads/2025/04/streets-of-neon-1024x683.jpg"
                  alt="Streets of Neon golf game"
                  width={1280}
                  height={512}
                  className="w-full h-64 md:h-72 object-cover transition-transform duration-300 group-hover:scale-105"
                  style={{
                    maskImage: `
              linear-gradient(to right, black 90%, transparent),
              linear-gradient(to bottom, black 90%, transparent),
              linear-gradient(to top, black 90%, transparent),
              linear-gradient(to left, black 90%, transparent)
            `,
                    maskComposite: 'intersect'
                  }}
                />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold tracking-widest uppercase mb-3 text-white">
                Games for all ages
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Beginners and scratch golfers alike can find fun with games for all skill levels from Bullseye and
                Capture-the-Flag to Streets of Neon and Magic Pond.
              </p>
            </div>
          </div>
        </div>

        <Button>Sign up today</Button>
      </div>

      <div className="max-w-screen-2xl mx-auto flex flex-col gap-12">
        <Heading variant="white" size="lg" className="flex flex-col items-center text-center capitalize">
          <span>Sim Rentals</span>
          <span className="text-fiveiron-yellow">Play or Practice</span>
        </Heading>

        <div className="max-w-screen-2xl mx-auto flex flex-col gap-12">
          <div className="flex lg:flex-row flex-col gap-4">
            <Image
              src="https://fiveirongolf.com/wp-content/uploads/2025/04/sim-remtal-bg.jpg"
              alt="Sim Rentals"
              width={212}
              height={212}
              className="w-full h-auto"
              style={{
                maskImage: `
                linear-gradient(to left, black 90%, transparent),
                linear-gradient(to bottom, black 90%, transparent),
                linear-gradient(to top, black 90%, transparent),
                linear-gradient(to right, black 90%, transparent)
              `,
                maskComposite: 'intersect'
              }}
            />

            <div className="flex flex-col gap-4">
              <p className="text-center text-white max-w-xl mx-auto">How it works</p>
              <p className="text-center text-white max-w-xl mx-auto">
                Book a bay by the hour; prices vary by day, time, and location so check your desired location’s schedule
                for particular pricing!
              </p>

              <LocationSelect experience="simulator" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
