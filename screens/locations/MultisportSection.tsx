'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Location } from '@/payload/generated-types';
import { getImageUrl } from '@/lib/getImageUrl';

export function MultisportSection({ location }: { location: Location }) {
  const { MultisportSchema } = location;
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % (MultisportSchema?.slides?.length || 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? (MultisportSchema?.slides?.length || 1) - 1 : prev - 1));
  };

  const slideImage = getImageUrl(MultisportSchema?.slides?.[currentSlide]?.image) || null;

  return (
    <section className="bg-background">
      {/* Top Banner */}
      <div className="bg-card py-6">
        <div className="container mx-auto py-4 bg-white uppercase">
          <h2 className="text-2xl lg:text-3xl font-bold text-center uppercase tracking-wider">
            <span className="text-red-500 ">{MultisportSchema?.topBanner || ''}</span>
          </h2>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Side - Image Carousel */}
              <div className="relative">
                <div className="aspect-video rounded-2xl overflow-hidden">
                  {slideImage && (
                    <Image
                      src={slideImage}
                      alt="multisport"
                      className="w-full h-full object-cover"
                      width={1000}
                      height={1000}
                      priority
                    />
                  )}
                </div>

                {/* Navigation Arrows */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/80 hover:bg-background border border-border"
                  onClick={prevSlide}
                >
                  <ChevronLeft className="w-8 h-8 text-foreground" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/80 hover:bg-background border border-border"
                  onClick={nextSlide}
                >
                  <ChevronRight className="w-8 h-8 text-foreground" />
                </Button>
              </div>

              {/* Right Side - Content */}
              <div className="space-y-8 text-foreground">
                <div className="space-y-6">
                  <h3 className="text-5xl lg:text-7xl font-black uppercase leading-tight">{MultisportSchema?.title}</h3>

                  <h4 className="text-2xl lg:text-3xl font-bold uppercase text-foreground tracking-wide">
                    {MultisportSchema?.subtitle}
                  </h4>
                </div>

                <div className="space-y-6">
                  <p className="text-lg leading-relaxed text-muted-foreground">{MultisportSchema?.description}</p>
                </div>

                <Button asChild className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 text-lg h-auto">
                  <Link href={MultisportSchema?.ctaUrl || ''}>{MultisportSchema?.ctaText || ''}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sports Menu */}
      <div className="bg-card py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {MultisportSchema?.sports?.map((sport, index) => (
                <button
                  key={sport.id}
                  onClick={() => setCurrentSlide(index)}
                  className={`
                    p-4 text-center border-l-4 transition-all duration-300 hover:bg-accent
                    ${index === currentSlide ? 'border-red-500 bg-accent' : 'border-border'}
                  `}
                >
                  <div className="text-sm font-bold uppercase tracking-wider text-foreground">{sport.name}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
