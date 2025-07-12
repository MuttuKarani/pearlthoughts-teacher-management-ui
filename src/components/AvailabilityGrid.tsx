import React from "react";
import clsx from "clsx";

interface AvailabilitySlot {
  time: string;
  available: boolean;
}

interface DayAvailability {
  day: string;
  slots: AvailabilitySlot[];
}

interface AvailabilityGridProps {
  data: DayAvailability[];
  onSlotToggle: (dayIndex: number, timeSlot: string) => void;
}

const times = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
];

const AvailabilityGrid: React.FC<AvailabilityGridProps> = ({
  data,
  onSlotToggle,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="p-2 text-left">Time</th>
            {data.map((day) => (
              <th key={day.day} className="p-2 text-left">
                <span className="font-semibold">{day.day}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {times.map((time) => (
            <tr key={time}>
              <td className="p-2 text-sm text-gray-600">{time}</td>
              {data.map((day, dayIndex) => {
                const slot = day.slots.find((slot) => slot.time === time);
                const isAvailable = slot ? slot.available : false;

                return (
                  <td key={day.day} className="p-1">
                    <button
                      onClick={() => onSlotToggle(dayIndex, time)}
                      className={clsx(
                        "w-full h-10 text-sm font-medium rounded-md transition-colors duration-200",
                        isAvailable
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : "bg-gray-300 text-gray-500 hover:bg-gray-400"
                      )}
                    >
                      {isAvailable ? "Available" : "Unavailable"}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default AvailabilityGrid;
