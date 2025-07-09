import { MapPin, Clock } from 'lucide-react';
import { Location } from '@/payload/generated-types';
import { getImageUrl } from '@/lib/getImageUrl';

export function HoursSection({ location }: { location: Location }) {
  const { GeneralSchema, HoursSchema } = location;
  const address = GeneralSchema?.address;

  return (
    <section
      className="py-16 relative bg-cover bg-center"
      style={{
        backgroundImage: `url(${getImageUrl(HoursSchema?.backgroundImage)})`
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 max-w-6xl mx-auto">
          {/* Left Side - Location & Address */}
          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="w-1 h-24 bg-primary flex-shrink-0"></div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-primary" />
                  <div className="text-white">
                    <div className="text-2xl font-bold uppercase">{address}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Hours */}
          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="w-1 h-24 bg-primary flex-shrink-0"></div>

              <div className="space-y-6 text-white w-full">
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-primary" />
                  <div className="text-2xl font-bold uppercase">HOURS</div>
                </div>

                {/* Regular Hours */}
                <div className="space-y-3">
                  {location.HoursSchema?.regularHours?.map((hour, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="font-medium uppercase text-sm tracking-wide">{hour.days}</span>
                      <span className="font-bold text-lg">{hour.hours}</span>
                    </div>
                  ))}
                </div>

                {/* Special Hours */}
                {HoursSchema?.specialHours && HoursSchema?.specialHours.length > 0 && (
                  <div className="pt-6 border-t border-gray-600">
                    <div className="text-primary text-lg font-bold uppercase mb-4">MEMBERSHIP BENEFIT HOURS</div>
                    <div className="space-y-2">
                      {HoursSchema?.specialHours.map((hour, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span className="font-medium uppercase tracking-wide">{hour.description}</span>
                          <span className="font-bold">{hour.hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
