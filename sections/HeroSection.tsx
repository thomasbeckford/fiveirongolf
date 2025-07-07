import { Calendar, FileText, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HeroContent } from '@/lib/schemas/sections';

type Props = {
  content: HeroContent;
  slug: string;
};

export async function HeroSection({ content, slug }: Props) {
  if (!content) return null;

  return (
    <section
      className="hero-section relative min-h-[60vh] sm:min-h-[25vh] lg:min-h-[45vh] bg-cover bg-center flex items-center"
      style={{
        backgroundImage: `url(${content.backgroundImage})`
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/50"></div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-8 lg:gap-12">
            {/* Header Content */}
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 lg:gap-8">
              <div className="flex flex-col">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl uppercase font-bold leading-tight">
                  {content.title}
                </h1>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl uppercase font-bold leading-tight">
                  {content.subtitle}
                </h2>
              </div>

              <div className="lg:max-w-md xl:max-w-2xl lg:flex lg:items-center">
                <p className="font-light text-base sm:text-lg leading-relaxed">{content.description}</p>
              </div>
            </div>

            {/* Contact Info Grid */}
            <div className="w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                {/* Address */}
                <div className="flex flex-col gap-2 p-4 bg-black/20 backdrop-blur-sm rounded-lg">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 stroke-primary flex-shrink-0" />
                    <span className="text-sm font-medium uppercase tracking-wide text-primary">Location</span>
                  </div>
                  <p className="text-sm sm:text-base">{content.contactInfo?.address}</p>
                </div>

                {/* Contact */}
                <div className="flex flex-col gap-3 p-4 bg-black/20 backdrop-blur-sm rounded-lg">
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5 stroke-primary flex-shrink-0" />
                    <span className="text-sm font-medium uppercase tracking-wide text-primary">Contact</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm sm:text-base">{content.contactInfo?.phone}</p>
                    <p className="text-sm sm:text-base">{content.contactInfo?.email}</p>
                  </div>
                </div>

                {/* Floorplan */}
                {content.floorplan?.available && (
                  <div className="flex flex-col gap-2 p-4 bg-black/20 backdrop-blur-sm rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 stroke-primary flex-shrink-0" />
                      <span className="text-sm font-medium uppercase tracking-wide text-primary">Floorplan</span>
                    </div>
                    <a
                      href={content.floorplan?.url}
                      className="text-sm sm:text-base hover:text-primary transition-colors underline underline-offset-2"
                    >
                      View Layout
                    </a>
                  </div>
                )}

                {/* CTA */}
                <div className="flex flex-col gap-2 p-4 bg-black/20 backdrop-blur-sm rounded-lg sm:col-span-2 lg:col-span-1">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 stroke-primary flex-shrink-0" />
                    <span className="text-sm font-medium uppercase tracking-wide text-primary">Book Now</span>
                  </div>

                  <Link href={`${content.cta?.url}${slug}`}>
                    <Button size="sm">{content.cta?.text}</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
