// components/admin/AdminHeader.tsx (Server Component)
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export function AdminHeader() {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">Five Iron Golf - Admin</h1>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/admin/locations/new">
            <Plus className="w-4 h-4 mr-2" />
            Nueva Locación
          </Link>
        </Button>
      </div>
    </div>
  );
}
