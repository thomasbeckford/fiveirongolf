"use client";

import { ICoachesSection } from "@/types/location";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import Image from "next/image";

export function CoachesSection({ data }: { data: ICoachesSection }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(data.coaches.length / 3));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.ceil(data.coaches.length / 3) - 1 : prev - 1
    );
  };

  const visibleCoaches = data.coaches.slice(
    currentIndex * 3,
    currentIndex * 3 + 3
  );

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Title with glow effect */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-wider text-center">
              <span
                className="text-transparent bg-clip-text"
                style={{
                  background:
                    "linear-gradient(45deg, var(--fiveiron-orange), var(--fiveiron-tangerine))",
                  WebkitBackgroundClip: "text",
                  textShadow: "0 0 30px rgba(255, 165, 0, 0.5)",
                }}
              >
                MEET THE COACHES
              </span>
            </h2>
          </div>

          {/* Coaches Carousel */}
          <div className="relative">
            {/* Navigation Arrows */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-background/80 hover:bg-background border border-border"
              onClick={prevSlide}
            >
              <ChevronLeft className="w-8 h-8 text-foreground" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-background/80 hover:bg-background border border-border"
              onClick={nextSlide}
            >
              <ChevronRight className="w-8 h-8 text-foreground" />
            </Button>

            {/* Coaches Grid */}
            <div className="grid md:grid-cols-3 gap-8 px-16">
              {visibleCoaches.map((coach) => (
                <Card
                  key={coach.id}
                  className="bg-card border-2 border-orange-500/50 hover:border-orange-500 transition-all duration-300 group"
                >
                  <CardContent className="p-6 text-center space-y-6">
                    {/* Coach Image or Logo */}
                    <div className="w-full aspect-square flex items-center justify-center">
                      {coach.image ? (
                        <div className="w-full h-full rounded-lg overflow-hidden">
                          <Image
                            src={coach.image}
                            alt={coach.name}
                            width={500}
                            height={500}
                            className="w-full h-full object-cover"
                            unoptimized
                          />
                        </div>
                      ) : (
                        // 5i Logo placeholder
                        <div className="w-48 h-48 bg-foreground rounded-full flex items-center justify-center">
                          <div className="text-background text-6xl font-black">
                            5i
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Coach Info */}
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold uppercase tracking-wide text-foreground">
                        {coach.name}
                      </h3>
                      <p className="text-muted-foreground text-lg">
                        {coach.title}
                      </p>

                      {coach.bio && (
                        <p className="text-sm text-muted-foreground leading-relaxed mt-4">
                          {coach.bio}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-16">
            <Button
              asChild
              className="bg-orange-500 hover:bg-orange-600 text-background font-bold px-8 py-4 text-lg h-auto"
            >
              <a href={data.bookLessonUrl}>BOOK A LESSON</a>
            </Button>

            <Button
              asChild
              variant="outline"
              className="border-2 border-foreground text-foreground hover:bg-foreground hover:text-background font-bold px-8 py-4 text-lg h-auto"
            >
              <a href={data.learnMoreUrl}>LEARN MORE</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
