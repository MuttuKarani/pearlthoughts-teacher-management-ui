"use client";

import { Check, X, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  type: string;
  label: string;
  value: string;
};

export default function ContactInfo({ type, label, value }: Props) {
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [originalValue, setOriginalValue] = useState(value);
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem(`${type}-${label}`);
    if (stored) setInputValue(stored);
  }, [type, label]);

  const validate = (val: string) => {
    if (type === "Email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(val) ? "" : "Invalid email format";
    }
    if (type === "Phone") {
      const phoneRegex = /^[0-9 ()+-]+$/;
      return phoneRegex.test(val) ? "" : "Invalid phone number";
    }
    return "";
  };

  const handleSave = () => {
    const err = validate(inputValue);
    if (err) {
      setError(err);
      return;
    }

    setError("");
    setOriginalValue(inputValue);
    localStorage.setItem(`${type}-${label}`, inputValue);
    toast.success(`${type} updated`);
    setEditMode(false);
  };

  const handleCancel = () => {
    setInputValue(originalValue);
    setError("");
    setEditMode(false);
  };

  return (
    <div className="bg-white shadow p-4">
      <div className="flex justify-between items-center border-b pb-1 mb-2">
        <h3 className="font-semibold text-md">{type}</h3>
        {!editMode ? (
          <Pencil
            className="w-4 h-4 text-gray-500 cursor-pointer"
            onClick={() => setEditMode(true)}
          />
        ) : (
          <div className="flex space-x-2">
            <Check
              className="w-4 h-4 text-green-600 cursor-pointer"
              onClick={handleSave}
            />
            <X
              className="w-4 h-4 text-red-500 cursor-pointer"
              onClick={handleCancel}
            />
          </div>
        )}
      </div>
      {!editMode ? (
        <p className="text-sm whitespace-pre-line">
          <strong>{label}:</strong> {inputValue}
        </p>
      ) : (
        <div className="text-sm">
          <label className="block font-semibold mb-1">{label}</label>
          <input
            className={`border p-1 rounded w-full text-sm ${
              error ? "border-red-500" : "border-gray-300"
            }`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
      )}
    </div>
  );
}
