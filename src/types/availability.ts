export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface DayAvailability {
  day: string;
  slots: TimeSlot[];
}
