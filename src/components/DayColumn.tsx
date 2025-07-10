import { DayAvailability } from "@/types/availability";
import TimeSlot from "./TimeSlot";

const DayColumn = ({ day }: { day: DayAvailability }) => (
  <div className="flex flex-col border-l min-w-[100px]">
    <div className="h-12 flex items-center justify-center font-medium bg-gray-50 border-b">
      {day.day}
    </div>
    {day.slots.map((slot, i) => (
      <TimeSlot key={i} slot={slot} />
    ))}
  </div>
);

export default DayColumn;
