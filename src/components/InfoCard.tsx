import { Pencil, Plus } from "lucide-react";

type Props = {
  title: string;
  editable?: boolean;
  addable?: boolean;
  children: React.ReactNode;
};

export default function InfoCard({
  title,
  editable,
  addable,
  children,
}: Props) {
  return (
    <div className="bg-white shadow p-4">
      <div className="flex justify-between items-center border-b pb-1 mb-2">
        <h3 className="font-semibold text-md">{title}</h3>
        {editable && (
          <Pencil className="w-4 h-4 text-gray-500 cursor-pointer" />
        )}
        {addable && <Plus className="w-4 h-4 text-gray-500 cursor-pointer" />}
      </div>
      <div className="text-sm">{children}</div>
    </div>
  );
}
