'use client';

import React from 'react';
import { HighImpactHero } from './heros/HighImpact';
import Image from 'next/image';
import { SplittingText } from './animate-ui/text/splitting';
import { motion } from 'motion/react';

export default function LandingHero() {
  const homepage = {
    title: 'Five Iron Golf'
  };
  return (
    <HighImpactHero backgroundType="video" backgroundSrc="/videos/homepage.mp4" overlayOpacity={0.7}>
      <div className="flex flex-col items-center gap-4">
        <motion.div
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
            duration: 0.8
          }}
        >
          <Image src="/5i.svg" alt="Logo" width={140} height={140} />
        </motion.div>

        <h1 className="uppercase text-6xl font-semibold tracking-widest">
          <SplittingText type="chars" text={homepage.title} />
        </h1>
      </div>
    </HighImpactHero>
  );
}
