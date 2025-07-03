// app/admin/page.tsx
"use client";
import { useState } from "react";
import { useLocationsContent } from "@/hooks/useLocationsContent";
import { JsonEditor } from "@/components/json-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { LOCATIONS_CONTENT } from "@/data/locations-content";

export default function AdminPage() {
  const { locations, loading, createLocation, updateLocation, deleteLocation } =
    useLocationsContent();
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<any>({});

  const handleCreateNew = () => {
    setSelectedLocation(null);
    setEditData({
      name: "",
      slug: "",
      status: "active",
      seo: {},
      sections: {},
    });
    setIsEditing(true);
  };

  const handleEdit = (location: any) => {
    setSelectedLocation(location);
    setEditData({
      name: location.name,
      slug: location.slug,
      status: location.status,
      seo: location.seo || {},
      sections: location.sections,
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (selectedLocation) {
      await updateLocation(selectedLocation.id, editData);
    } else {
      await createLocation(editData);
    }
    setIsEditing(false);
    setSelectedLocation(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta locación?")) {
      await deleteLocation(id);
    }
  };

  const importSampleData = async () => {
    for (const location of LOCATIONS_CONTENT) {
      await createLocation({
        name: location.name,
        slug: location.slug,
        status: location.status || "active",
        seo: location.seo || {},
        // @ts-expect-error
        sections: location.sections,
      });
    }
  };

  if (loading) {
    return <div className="p-8">Cargando...</div>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Five Iron Golf - Admin</h1>
        <div className="flex gap-4">
          {locations.length === 0 && (
            <Button onClick={importSampleData} variant="outline">
              Importar Datos de Ejemplo
            </Button>
          )}
          <Button onClick={handleCreateNew}>
            <Plus className="w-4 h-4 mr-2" />
            Nueva Locación
          </Button>
        </div>
      </div>

      {/* Lista de Locaciones */}
      <div className="grid gap-6">
        {locations.map((location) => (
          <Card key={location.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{location.name}</CardTitle>
                  <p className="text-muted-foreground">/{location.slug}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      location.status === "active" ? "default" : "secondary"
                    }
                  >
                    {location.status}
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      window.open(`/locations/${location.slug}`, "_blank")
                    }
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(location)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(location.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Secciones: {Object.keys(location.sections).join(", ")}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Actualizado: {new Date(location.updatedAt).toLocaleString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog de Edición */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedLocation ? "Editar Locación" : "Nueva Locación"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Nombre</label>
                <Input
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-medium">Slug</label>
                <Input
                  value={editData.slug}
                  onChange={(e) =>
                    setEditData({ ...editData, slug: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">SEO</label>
              <Card>
                <CardContent className="pt-6">
                  <JsonEditor
                    data={editData.seo}
                    onChange={(newSeo) =>
                      setEditData({ ...editData, seo: newSeo })
                    }
                  />
                </CardContent>
              </Card>
            </div>

            <div>
              <label className="text-sm font-medium">Secciones</label>
              <Card>
                <CardContent className="pt-6">
                  <JsonEditor
                    data={editData.sections}
                    onChange={(newSections) =>
                      setEditData({ ...editData, sections: newSections })
                    }
                  />
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSave}>Guardar</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
