import { DayAvailability } from "@/types/availability";
import DayColumn from "./DayColumn";

const AvailabilityGrid = ({ data }: { data: DayAvailability[] }) => {
  return (
    <div className="overflow-x-auto w-full border rounded-lg shadow-sm bg-white">
      <div className="inline-grid min-w-[700px] grid-cols-[80px_repeat(7,_1fr)] text-xs">
        {/* Time Column */}
        <div className="sticky left-0 bg-white z-10 border-r">
          <div className="h-12 border-b"></div>
          {Array.from({ length: 20 }, (_, i) => {
            const hour = 7 + Math.floor(i / 2);
            const min = i % 2 === 0 ? "00" : "30";
            return (
              <div key={i} className="h-12 text-right pr-1 border-b">
                {hour}:{min}
              </div>
            );
          })}
        </div>

        {/* Days */}
        {data.map((day, idx) => (
          <DayColumn key={idx} day={day} />
        ))}
      </div>
    </div>
  );
};

export default AvailabilityGrid;
