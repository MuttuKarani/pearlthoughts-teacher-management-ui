import { Plus } from "lucide-react";

type Props = {
  type: string;
  label: string;
  value: string;
};

export default function ContactInfo({ type, label, value }: Props) {
  return (
    <div className="bg-white shadow p-4">
      <div className="flex justify-between items-center border-b pb-1 mb-2">
        <h3 className="font-semibold text-md">{type}</h3>
        <Plus className="w-4 h-4 text-gray-500 cursor-pointer" />
      </div>
      <p className="text-sm whitespace-pre-line">
        <strong>{label}:</strong> {value}
      </p>
    </div>
  );
}
