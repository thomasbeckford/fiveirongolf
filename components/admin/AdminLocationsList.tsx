// components/admin/AdminLocationsList.tsx (Server Component)
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LocationActions } from './LocationActions';
import { ILocation } from '@/types/location';

interface AdminLocationsListProps {
  locations: ILocation[];
}

export function AdminLocationsList({ locations }: AdminLocationsListProps) {
  if (locations.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <div className="flex flex-col items-center space-y-4">
            <h3 className="text-lg font-semibold">No se encontraron locations</h3>
            <p className="text-muted-foreground">Intenta con otros términos de búsqueda</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6">
      {locations?.map((location) => (
        <Card key={location.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>
                  <span className="text-lg">{location.name}</span>
                  <span className="text-sm text-muted-foreground ml-2">/{location.slug}</span>
                  {location.sections?.length > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {location.sections.length} secciones
                    </Badge>
                  )}
                </CardTitle>
                <p className="text-muted-foreground text-sm">{location.seo?.title || 'Sin título SEO configurado'}</p>
              </div>
              <LocationActions location={location} />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Actualizado: {new Date(location.updatedAt).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
