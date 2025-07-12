import { DayAvailability } from "@/types/availability";

interface DayColumnProps {
  day: DayAvailability;
  dayIndex: number;
  onSlotToggle: (dayIndex: number, slotIndex: number) => void;
  onTimeEdit: (dayIndex: number, slotIndex: number, newTime: string) => void;
}

const DayColumn = ({ day, dayIndex, onSlotToggle }: DayColumnProps) => {
  // const handleTimeChange = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  //   slotIndex: number
  // ) => {
  //   onTimeEdit(dayIndex, slotIndex, e.target.value);
  // };

  return (
    <div className="border-l last:border-r">
      <div className="h-12 bg-gray-100 flex items-center justify-center text-xs font-semibold">
        {day.day}
      </div>
      {day.slots.map((slot, slotIndex) => {
        return (
          <div key={slotIndex} className="flex items-center h-12 border-b">
            {/* Time */}
            <div className="w-20 text-right pr-2">{slot.time || "-"}</div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={slot.available}
                onChange={() => onSlotToggle(dayIndex, slotIndex)}
                className="form-checkbox h-4 w-4 text-green-600"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DayColumn;
