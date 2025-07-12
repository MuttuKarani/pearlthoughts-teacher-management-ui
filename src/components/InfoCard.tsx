"use client";

import { Pencil, Plus, X, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { TeacherInfo } from "@/types/teacher";

type Props = {
  title: string;
  editable?: boolean;
  addable?: boolean;
  children?: React.ReactNode;
  fields?: {
    label: string;
    key: string;
    type?: "text" | "email" | "tel";
    value: string;
  }[];
  onSave?: (updated: Partial<TeacherInfo>) => void;
};

export default function InfoCard({
  title,
  editable,
  addable,
  children,
  fields,
  onSave,
}: Props) {
  const [editing, setEditing] = useState(false);
  const [localData, setLocalData] = useState<Record<string, string>>(() => {
    return fields?.reduce((acc, f) => ({ ...acc, [f.key]: f.value }), {}) || {};
  });

  const handleChange = (key: string, value: string) => {
    setLocalData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    for (const field of fields || []) {
      if (!localData[field.key]) {
        toast.error(`${field.label} is required`);
        return;
      }
      if (
        field.type === "email" &&
        !/^\S+@\S+\.\S+$/.test(localData[field.key])
      ) {
        toast.error("Invalid email format");
        return;
      }
      if (
        field.type === "tel" &&
        !/^[0-9()\-\s]+$/.test(localData[field.key])
      ) {
        toast.error("Invalid phone format");
        return;
      }
    }

    onSave?.(localData);
    toast.success("Saved!");
    setEditing(false);
  };

  return (
    <div className="bg-white shadow p-4">
      <div className="flex justify-between items-center border-b pb-1 mb-2">
        <h3 className="font-semibold text-md">{title}</h3>
        <div className="flex items-center gap-2">
          {editing ? (
            <>
              <Check
                className="w-4 h-4 text-green-600 cursor-pointer"
                onClick={handleSave}
              />
              <X
                className="w-4 h-4 text-red-500 cursor-pointer"
                onClick={() => setEditing(false)}
              />
            </>
          ) : (
            <>
              {editable && (
                <Pencil
                  className="w-4 h-4 text-gray-500 cursor-pointer"
                  onClick={() => setEditing(true)}
                />
              )}
              {addable && (
                <Plus className="w-4 h-4 text-gray-500 cursor-pointer" />
              )}
            </>
          )}
        </div>
      </div>

      {fields ? (
        <div className="space-y-1 text-sm">
          {fields.map((field) => (
            <div key={field.key}>
              <strong>{field.label}:</strong>{" "}
              {editing ? (
                <input
                  className="border rounded px-2 py-1 text-sm w-full mt-1"
                  type={field.type || "text"}
                  value={localData[field.key]}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                />
              ) : (
                <span>{localData[field.key]}</span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-sm">{children}</div>
      )}
    </div>
  );
}
