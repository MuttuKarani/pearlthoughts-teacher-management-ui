import { TimeSlot as Slot } from "@/types/availability";

const TimeSlot = ({ slot }: { slot: Slot }) => {
  return (
    <div
      className={`h-12 border-b transition-colors duration-200 ${
        slot.available ? "bg-green-400 hover:bg-green-500" : "bg-gray-100"
      }`}
    ></div>
  );
};

export default TimeSlot;
