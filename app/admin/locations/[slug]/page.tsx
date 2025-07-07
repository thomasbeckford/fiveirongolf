import { fetchLocation } from '@/server/locations/fetch';
import { LocationEditor } from '@/components/admin/LocationEditor';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default async function EditLocationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const location = await fetchLocation(slug);

  if (!location) {
    return <div>No se encontró la locación</div>;
  }

  return (
    <div className="min-h-screen bg-accent">
      {/* Header */}
      <div className="bg-fiveiron-black border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver al Admin
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold ">Editar Locación</h1>
                <p className="text-sm text-white">
                  {location.name} • /{location.slug}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" asChild>
                <Link href={`/locations/${location.slug}`} target="_blank">
                  Ver Página
                </Link>
              </Button>
              <div className="text-sm text-white">Actualizado: {new Date(location.updatedAt).toLocaleDateString()}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <LocationEditor location={location} />
      </div>
    </div>
  );
}
