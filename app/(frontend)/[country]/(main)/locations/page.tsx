import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone } from 'lucide-react';
import { HighImpactHero } from '@/components/heros/HighImpact';
import { getLocations } from '@/server/actions';
import LocationBadge from '@/components/location-badge';
import { getImageUrl } from '@/lib/getImageUrl';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import { MediumImpactHero } from '@/components/heros/MediumImpact';

export const metadata = {
  title: 'Five Iron Golf - Locations',
  description: 'Find locations of Five Iron Golf'
};

export default async function AllLocationsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { page } = await searchParams;
  const currentPage = parseInt(page || '1', 10);
  const { docs, hasNextPage, hasPrevPage, totalPages, totalDocs } = await getLocations(currentPage);
  const totalLocations = totalDocs;

  return (
    <div>
      <MediumImpactHero bottomBar={false}>
        <div className="flex flex-col items-center justify-center h-full text-center max-w-7xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            All our <span className="text-primary">locations</span>
          </h1>
          <p className="text-xl text-muted-foreground">{totalLocations} locations around the world</p>
        </div>
      </MediumImpactHero>

      <div className="flex flex-wrap gap-6 mx-auto justify-center max-w-screen-2xl">
        {docs.map((location) => {
          const isClosed = location.name.includes('CLOSED');

          return (
            <Link
              key={location.id}
              href={isClosed ? '#' : `/locations/${location.slug}`}
              aria-disabled={isClosed}
              className={`h-full  hover:shadow-lg transition-all cursor-pointer group min-w-[400px]`}
            >
              <Card
                className={`p-0 h-full hover:shadow-lg transition-all cursor-pointer group ${
                  isClosed ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                }`}
                style={{
                  backgroundImage: `url(${getImageUrl(location.HeroSchema?.backgroundImage)})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                <div className="bg-black/70  h-full p-4 rounded-lg">
                  <CardHeader>
                    <div className="relative z-10 space-y-3">
                      <div className="space-y-3 ">
                        <CardTitle
                          className={
                            isClosed ? 'text-muted-foreground' : 'text-lg group-hover:text-primary transition-colors'
                          }
                        >
                          <div className="flex justify-between gap-2 w-full">
                            <div className="flex flex-col">
                              <span>{location.city}</span>
                              <span>{location.name}</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <LocationBadge status={location.status} />
                            </div>
                          </div>
                        </CardTitle>

                        <CardDescription className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {location.timezone}
                        </CardDescription>

                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Phone className="w-3 h-3" />
                          {location.phone}
                        </div>

                        <div className="flex gap-1 flex-wrap">
                          {location.ActivitySchema?.services?.map((service) => (
                            <Badge key={service.id} variant="outline" className="text-xs">
                              {service.title}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="mt-8">
        <Pagination>
          <PaginationContent>
            {hasPrevPage && (
              <PaginationItem>
                <PaginationLink href={`?page=${currentPage - 1}`} aria-label="Previous">
                  ←
                </PaginationLink>
              </PaginationItem>
            )}

            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink href={`?page=${pageNum}`} isActive={pageNum === currentPage}>
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            {hasNextPage && (
              <PaginationItem>
                <PaginationLink href={`?page=${currentPage + 1}`} aria-label="Next">
                  →
                </PaginationLink>
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
