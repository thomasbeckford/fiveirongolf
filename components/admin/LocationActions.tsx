'use client';

import { Button } from '@/components/ui/button';
import { Edit, Trash2, Eye } from 'lucide-react';
import { deleteLocation } from '@/server/locations/delete';
import { Location } from '@/lib/generated/prisma';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface LocationActionsProps extends React.PropsWithChildren {
  location: Location;
}

export function LocationActions({ location }: LocationActionsProps) {
  const router = useRouter();
  const handleDelete = async () => {
    console.log('Delete location', location.slug);
    if (confirm('¿Estás seguro de que quieres eliminar esta locación?')) {
      await deleteLocation(location.slug);
      router.refresh();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Link href={`/locations/${location.slug}`}>
        <Button size="sm" variant="outline">
          <Eye className="w-4 h-4" />
        </Button>
      </Link>

      <Link href={`/admin/locations/${location.slug}`}>
        <Button size="sm" variant="outline">
          <Edit className="w-4 h-4" />
        </Button>
      </Link>
      <Button size="sm" variant="destructive" onClick={handleDelete}>
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}
