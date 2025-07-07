// app/admin/page.tsx (Server Component)
import { fetchLocations } from '@/server/locations/fetchAll';
import { AdminLocationsList } from '@/components/admin/AdminLocationsList';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { AdminSearch } from '@/components/admin/AdminSearch';

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ search?: string }> }) {
  const locations = await fetchLocations();
  const searchQuery = (await searchParams)?.search || '';

  if (!locations) return <div>No se encontraron locations</div>;

  // Filtrar en el servidor
  const filteredLocations = searchQuery
    ? locations.filter(
        (location) =>
          location.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          location.slug?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : locations;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <AdminHeader />
      <AdminSearch defaultValue={searchQuery} totalCount={locations.length} filteredCount={filteredLocations.length} />
      <AdminLocationsList locations={filteredLocations} />
    </div>
  );
}
