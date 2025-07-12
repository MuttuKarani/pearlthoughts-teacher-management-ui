import { TeacherInfo } from "@/types/teacher";

export const teachers: TeacherInfo[] = [
  {
    id: "1",
    name: "Alynia Allan",
    role: "Vocal Coach",
    birthDate: "1985-06-12",
    email: "alyniaallan@example.com",
    phone: "(416) 648-9057",
    address: "56 Odosardo Di Santo Cir\nNorth York, Ontario\nCanada",
    availability: [
      { day: "Monday", slots: [{ time: "10:00", available: true }] },
      { day: "Tuesday", slots: [] },
      { day: "Wednesday", slots: [] },
      { day: "Thursday", slots: [] },
      { day: "Friday", slots: [] },
    ],
  },
  {
    id: "2",
    name: "John Smith",
    role: "Guitar Instructor",
    birthDate: "1990-01-01",
    email: "john@example.com",
    phone: "(416) 000-1234",
    address: "123 Maple Street\nToronto, Ontario\nCanada",
    availability: [
      { day: "Monday", slots: [] },
      { day: "Tuesday", slots: [] },
      { day: "Wednesday", slots: [] },
      { day: "Thursday", slots: [] },
      { day: "Friday", slots: [] },
    ],
  },
];
