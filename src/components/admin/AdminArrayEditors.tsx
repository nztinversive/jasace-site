"use client";

import { AdminButton, AdminField, AdminInput } from "@/components/admin/AdminPrimitives";
import { ImageUpload } from "@/components/admin/ImageUpload";

type StringListEditorProps = {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  placeholder: string;
  hint?: string;
};

export function StringListEditor({
  label,
  items,
  onChange,
  placeholder,
  hint,
}: StringListEditorProps) {
  const updateItem = (index: number, value: string) => {
    onChange(items.map((item, itemIndex) => (itemIndex === index ? value : item)));
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, itemIndex) => itemIndex !== index));
  };

  return (
    <div className="space-y-3">
      <AdminField label={label} hint={hint}>
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={`${label}-${index}`} className="flex gap-3">
              <AdminInput
                value={item}
                placeholder={placeholder}
                onChange={(event) => updateItem(index, event.target.value)}
              />
              <AdminButton type="button" tone="secondary" onClick={() => removeItem(index)}>
                Remove
              </AdminButton>
            </div>
          ))}
          <AdminButton type="button" tone="secondary" onClick={() => onChange([...items, ""])}>
            Add Item
          </AdminButton>
        </div>
      </AdminField>
    </div>
  );
}

type ObjectListEditorProps<T extends Record<string, string>> = {
  label: string;
  items: T[];
  onChange: (items: T[]) => void;
  emptyItem: T;
  fields: Array<{ key: keyof T; label: string; placeholder?: string }>;
};

export function ObjectListEditor<T extends Record<string, string>>({
  label,
  items,
  onChange,
  emptyItem,
  fields,
}: ObjectListEditorProps<T>) {
  const updateItem = <K extends keyof T>(index: number, key: K, value: string) => {
    onChange(
      items.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [key]: value } : item
      )
    );
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, itemIndex) => itemIndex !== index));
  };

  return (
    <div className="space-y-3">
      <div className="text-sm font-medium text-stone-200">{label}</div>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={`${label}-${index}`} className="rounded-2xl border border-stone-800 bg-stone-950/60 p-4">
            <div className="grid gap-3 md:grid-cols-2">
              {fields.map((field) => (
                <AdminField key={`${label}-${String(field.key)}-${index}`} label={field.label}>
                  <AdminInput
                    value={item[field.key] ?? ""}
                    placeholder={field.placeholder}
                    onChange={(event) => updateItem(index, field.key, event.target.value)}
                  />
                </AdminField>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <AdminButton type="button" tone="secondary" onClick={() => removeItem(index)}>
                Remove
              </AdminButton>
            </div>
          </div>
        ))}
        <AdminButton
          type="button"
          tone="secondary"
          onClick={() => onChange([...items, { ...emptyItem }])}
        >
          Add Item
        </AdminButton>
      </div>
    </div>
  );
}

type ImageListEditorProps = {
  label: string;
  items: string[];
  onChange: (items: string[]) => void;
  hint?: string;
  addLabel?: string;
};

export function ImageListEditor({
  label,
  items,
  onChange,
  hint,
  addLabel = "Add Image",
}: ImageListEditorProps) {
  const updateItem = (index: number, value: string) => {
    onChange(items.map((item, itemIndex) => (itemIndex === index ? value : item)));
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, itemIndex) => itemIndex !== index));
  };

  return (
    <AdminField label={label} hint={hint}>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={`${label}-${index}`}
            className="rounded-2xl border border-stone-800 bg-stone-950/60 p-4"
          >
            <ImageUpload
              value={item}
              onChange={(value) => updateItem(index, value)}
              previewLabel={`Gallery image ${index + 1}`}
            />
            <div className="mt-4 flex justify-end">
              <AdminButton type="button" tone="secondary" onClick={() => removeItem(index)}>
                Remove
              </AdminButton>
            </div>
          </div>
        ))}
        <AdminButton type="button" tone="secondary" onClick={() => onChange([...items, ""])}>
          {addLabel}
        </AdminButton>
      </div>
    </AdminField>
  );
}
