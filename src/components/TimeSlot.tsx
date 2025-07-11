import { TimeSlot as Slot } from "@/types/availability";

const TimeSlot = ({
  slot,
  onToggle,
}: {
  slot: Slot;
  onToggle: (slot: Slot) => void;
}) => {
  return (
    <div
      className={`h-12 border-b transition-colors duration-200 ${
        slot.available ? "bg-green-400 hover:bg-green-500" : "bg-gray-100"
      }`}
    >
      <button
        onClick={() => onToggle(slot)}
        className="w-full h-full text-center text-sm text-white bg-transparent"
      >
        {slot.available ? "Available" : "Unavailable"}
      </button>
    </div>
  );
};

export default TimeSlot;
