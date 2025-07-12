import React from "react";

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
  onSlotToggle: (dayIndex: number, time: string) => void;
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
      <table className="table-auto border-collapse w-full">
        <thead>
          <tr>
            <th className="p-2 text-left">Time</th>
            {data.map((day) => (
              <th key={day.day} className="p-2 text-left">
                {day.day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {times.map((time) => (
            <tr key={time}>
              <td className="p-2 text-sm text-gray-600">{time}</td>
              {data.map((day, dayIdx) => {
                const isAvailable =
                  day.slots.find((slot) => slot.time === time)?.available ??
                  false;
                return (
                  <td key={day.day} className="p-1">
                    <div
                      title={
                        isAvailable
                          ? "Double-click to mark unavailable"
                          : "Double-click to mark available"
                      }
                      onDoubleClick={() => onSlotToggle(dayIdx, time)}
                      className={`h-10 rounded cursor-pointer transition-colors duration-200 ${
                        isAvailable
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    />
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
