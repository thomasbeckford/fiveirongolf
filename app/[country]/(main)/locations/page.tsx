import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone } from 'lucide-react';
import { fetchLocations } from '@/server/locations/fetchAll';
import { HighImpactHero } from '@/components/heros/HighImpact';

export const metadata = {
  title: 'Five Iron Golf - Locations',
  description: 'Find locations of Five Iron Golf'
};

export default async function AllLocationsPage() {
  const locations = await fetchLocations();
  const allLocations = Object.values(locations || {}).flat();

  return (
    <div>
      <HighImpactHero>
        <>
          <h2 className="uppercase text-5xl font-semibold tracking-widest">Locations</h2>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            All our <span className="text-primary">locations</span>
          </h1>
          <p className="text-xl text-muted-foreground">{allLocations.length} locations around the world</p>
        </>
      </HighImpactHero>

      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {allLocations.map((location) => {
          const isClosed = location.name.includes('CLOSED');

          return (
            <Link
              key={location.id}
              href={isClosed ? '#' : `/locations/${location.slug}`}
              aria-disabled={isClosed}
              className={`h-full hover:shadow-lg transition-all cursor-pointer group `}
            >
              <Card
                className={`h-full hover:shadow-lg  transition-all cursor-pointer group ${
                  isClosed ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                }`}
              >
                <CardHeader>
                  <div className="space-y-3">
                    {isClosed && (
                      <Badge variant="destructive" className="w-fit">
                        Closed
                      </Badge>
                    )}

                    <CardTitle
                      className={
                        isClosed ? 'text-muted-foreground' : 'text-lg group-hover:text-primary transition-colors'
                      }
                    >
                      {location.name}
                    </CardTitle>

                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {location.timezone}
                    </CardDescription>

                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Phone className="w-3 h-3" />
                      {location.telephone}
                    </div>

                    <div className="flex gap-1 flex-wrap">
                      {location.experiences.map((service) => (
                        <Badge key={service} variant="outline" className="text-xs">
                          {service}
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
