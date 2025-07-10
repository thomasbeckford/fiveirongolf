'use client';

import { motion, useScroll, useTransform, MotionValue } from 'motion/react';

const ScrollMarquee = ({
  wordsLine1 = ['SUMMER SERIES 2025', 'PLAY THE WAY YOU WANT', 'SUMMER SERIES 2025', 'PLAY THE WAY YOU WANT'],
  wordsLine2 = ['SUMMER SERIES 2025', 'PLAY THE WAY YOU WANT', 'SUMMER SERIES 2025', 'PLAY THE WAY YOU WANT'],

  className
}: {
  wordsLine1?: string[];
  wordsLine2?: string[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const x1 = useTransform(scrollYProgress, [0, 1], ['0%', '-100%']);
  const x2 = useTransform(scrollYProgress, [0, 1], ['-100%', '0%']);

  const renderLine = (words: string[], x: MotionValue<string>) => {
    let realWordCount = 0;

    return (
      <motion.div className="flex whitespace-nowrap text-4xl font-medium will-change-transform" style={{ x }}>
        {/* repeat words 5 times */}
        {[...words, ...words, ...words, ...words, ...words].map((word, i) => {
          const isSymbol = word === '·';
          const colorClass = isSymbol
            ? 'text-muted-foreground'
            : realWordCount++ % 2 === 0
            ? 'text-white'
            : 'text-secondary';

          return (
            <span key={i} className={`mx-4 ${colorClass} `}>
              {word}
            </span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={`overflow-hidden bg-black py-4 mx-auto max-w-full ${className}`}>
      {renderLine(wordsLine1, x1)}
      {renderLine(wordsLine2, x2)}
    </div>
  );
};

export default ScrollMarquee;
