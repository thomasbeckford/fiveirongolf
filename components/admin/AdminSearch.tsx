// components/admin/AdminSearch.tsx (Client Component)
'use client';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

interface AdminSearchProps {
  defaultValue: string;
  totalCount: number;
  filteredCount: number;
}

export function AdminSearch({ defaultValue, totalCount, filteredCount }: AdminSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleSearch = (value: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set('search', value);
      } else {
        params.delete('search');
      }
      router.push(`/admin?${params.toString()}`);
    });
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  const clearSearch = () => handleSearch('');

  return (
    <div className="mb-6">
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Buscar locations..."
          defaultValue={defaultValue}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10 pr-10"
        />
        {defaultValue && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearSearch}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      <div className="mt-2 text-sm text-muted-foreground">
        {defaultValue ? (
          <>
            Mostrando {filteredCount} de {totalCount} locations
            {filteredCount === 0 && (
              <span className="text-orange-600 ml-2">No se encontraron resultados para {defaultValue}</span>
            )}
          </>
        ) : (
          `Total: ${totalCount} locations`
        )}
      </div>
    </div>
  );
}
