// components/JsonEditor.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus, Edit } from "lucide-react";

interface JsonEditorProps {
  data: any;
  onChange: (newData: any) => void;
  path?: string[];
}

export function JsonEditor({ data, onChange, path = [] }: JsonEditorProps) {
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  const updateValue = (key: string, value: any) => {
    const newData = { ...data };
    newData[key] = value;
    onChange(newData);
  };

  const deleteKey = (key: string) => {
    const newData = { ...data };
    delete newData[key];
    onChange(newData);
  };

  const addNewField = () => {
    if (newKey && newValue) {
      let processedValue: any = newValue;
      try {
        processedValue = JSON.parse(newValue);
      } catch {
        // Si no es JSON válido, mantener como string
      }

      updateValue(newKey, processedValue);
      setNewKey("");
      setNewValue("");
    }
  };

  const renderValue = (key: string, value: any) => {
    if (typeof value === "object" && value !== null) {
      if (Array.isArray(value)) {
        return (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">{key} (Array)</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => updateValue(key, [...value, ""])}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            {value.map((item, index) => (
              <div key={index} className="ml-4 flex items-center gap-2">
                <span className="text-sm text-muted-foreground">[{index}]</span>
                {typeof item === "object" ? (
                  <JsonEditor
                    data={item}
                    onChange={(newItem) => {
                      const newArray = [...value];
                      newArray[index] = newItem;
                      updateValue(key, newArray);
                    }}
                    path={[...path, key, index.toString()]}
                  />
                ) : (
                  <Input
                    value={item}
                    onChange={(e) => {
                      const newArray = [...value];
                      newArray[index] = e.target.value;
                      updateValue(key, newArray);
                    }}
                    className="flex-1"
                  />
                )}
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    const newArray = value.filter((_, i) => i !== index);
                    updateValue(key, newArray);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        );
      } else {
        return (
          <Card className="ml-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center justify-between">
                {key}
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deleteKey(key)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <JsonEditor
                data={value}
                onChange={(newValue) => updateValue(key, newValue)}
                path={[...path, key]}
              />
            </CardContent>
          </Card>
        );
      }
    }

    return (
      <div className="flex items-center gap-2">
        <span className="font-medium min-w-32">{key}:</span>
        {typeof value === "string" && value.length > 100 ? (
          <Textarea
            value={value}
            onChange={(e) => updateValue(key, e.target.value)}
            className="flex-1"
            rows={3}
          />
        ) : (
          <Input
            value={value?.toString() || ""}
            onChange={(e) => {
              let newValue: any = e.target.value;
              if (typeof value === "number") {
                newValue = parseFloat(e.target.value) || 0;
              } else if (typeof value === "boolean") {
                newValue = e.target.value === "true";
              }
              updateValue(key, newValue);
            }}
            className="flex-1"
          />
        )}
        <Button size="sm" variant="destructive" onClick={() => deleteKey(key)}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {Object.entries(data || {}).map(([key, value]) => (
        <div key={key}>{renderValue(key, value)}</div>
      ))}

      {/* Add new field */}
      <div className="flex gap-2 pt-4 border-t">
        <Input
          placeholder="Field name"
          value={newKey}
          onChange={(e) => setNewKey(e.target.value)}
        />
        <Input
          placeholder="Field value (JSON or string)"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
        />
        <Button onClick={addNewField}>
          <Plus className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
