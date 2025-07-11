import { DayAvailability, TimeSlot } from "@/types/availability";
import { useState } from "react";

interface AvailabilityGridProps {
  data: DayAvailability[];
  onSlotToggle: (dayIndex: number, timeSlot: string) => void;
}

const AvailabilityGrid = ({ data, onSlotToggle }: AvailabilityGridProps) => {
  const allTimes = [
    "7:00 AM",
    "7:30 AM",
    "8:00 AM",
    "8:30 AM",
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
    "4:00 PM",
    "4:30 PM",
  ];

  return (
    <div className="overflow-x-auto w-full border rounded-lg shadow-sm bg-white">
      <div className="inline-grid grid-cols-[80px_repeat(7,_1fr)] sm:grid-cols-[80px_repeat(7,_1fr)] md:grid-cols-[100px_repeat(7,_1fr)] text-xs">
        {/* Time Column */}
        <div className="sticky left-0 bg-white z-10 border-r">
          <div className="h-12 border-b"></div>
          {allTimes.map((time, idx) => (
            <div key={idx} className="h-12 text-right pr-1 border-b">
              {time}
            </div>
          ))}
        </div>

        {/* Days Columns */}
        {data.map((day, dayIdx) => (
          <div key={dayIdx} className="border-l last:border-r">
            <div className="h-12 bg-gray-100 flex items-center justify-center text-xs font-semibold sm:w-20 md:w-32 lg:w-40">
              {day.day}
            </div>
            {allTimes.map((time, timeIdx) => {
              const isAvailable = day.slots.some(
                (slot) => slot.time === time && slot.available
              );

              return (
                <div
                  key={timeIdx}
                  className={`h-12 ${
                    isAvailable ? "bg-green-400" : "bg-gray-200"
                  }`}
                  onClick={() => onSlotToggle(dayIdx, time)}
                ></div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailabilityGrid;
