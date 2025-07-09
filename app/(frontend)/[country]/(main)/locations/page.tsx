import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone } from 'lucide-react';
import { HighImpactHero } from '@/components/heros/HighImpact';
import { getLocations } from '@/server/actions';
import LocationBadge from '@/components/location-badge';

export const metadata = {
  title: 'Five Iron Golf - Locations',
  description: 'Find locations of Five Iron Golf'
};

export default async function AllLocationsPage() {
  const locations = await getLocations();
  const allLocations = Object.values(locations || {}).flat();

  return (
    <div>
      <HighImpactHero>
        <>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            All our <span className="text-primary">locations</span>
          </h1>
          <p className="text-xl text-muted-foreground">{allLocations.length} locations around the world</p>
        </>
      </HighImpactHero>

      <div className="flex flex-wrap gap-6 mx-auto justify-center ">
        {allLocations.map((location) => {
          const isClosed = location.name.includes('CLOSED');

          return (
            <Link
              key={location.id}
              href={isClosed ? '#' : `/locations/${location.slug}`}
              aria-disabled={isClosed}
              className={`h-full hover:shadow-lg transition-all cursor-pointer group min-w-[400px]`}
            >
              <Card
                className={`h-full hover:shadow-lg  transition-all cursor-pointer group ${
                  isClosed ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                }`}
              >
                <CardHeader>
                  <div className="space-y-3 ">
                    <CardTitle
                      className={
                        isClosed ? 'text-muted-foreground' : 'text-lg group-hover:text-primary transition-colors'
                      }
                    >
                      <div className="flex justify-between gap-2 w-full">
                        {location.name}

                        <LocationBadge status={location.status} />
                      </div>
                    </CardTitle>

                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {location.GeneralSchema?.timezone}
                    </CardDescription>

                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Phone className="w-3 h-3" />
                      {location.GeneralSchema?.phone}
                    </div>

                    <div className="flex gap-1 flex-wrap">
                      {location.ActivitySchema?.services?.map((service) => (
                        <Badge key={service.id} variant="outline" className="text-xs">
                          {service.title}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
