import { TeacherInfo } from "@/types/teacher";

export const teachers: TeacherInfo[] = [
  {
    id: "1",
    name: "Alynia Allan",
    role: "Voice Coach",
    birthDate: "1990-05-15",
    email: "alynia@example.com",
    phone: "+1 123-456-7890",
    address: "123 Music Lane, NY",
    availability: [
      {
        day: "Monday",
        slots: [
          { time: "09:00 AM", available: true },
          { time: "10:00 AM", available: false },
        ],
      },
      {
        day: "Tuesday",
        slots: [
          { time: "11:00 AM", available: true },
          { time: "01:00 PM", available: true },
        ],
      },
      {
        day: "Wednesday",
        slots: [
          { time: "09:00 AM", available: false },
          { time: "10:00 AM", available: false },
        ],
      },
      {
        day: "Thursday",
        slots: [
          { time: "09:00 AM", available: false },
          { time: "10:00 AM", available: false },
        ],
      },
      {
        day: "Friday",
        slots: [
          { time: "09:00 AM", available: true },
          { time: "10:00 AM", available: true },
        ],
      },
      {
        day: "Saturday",
        slots: [
          { time: "11:00 AM", available: false },
          { time: "12:00 PM", available: false },
        ],
      },
      {
        day: "Sunday",
        slots: [
          { time: "01:00 PM", available: true },
          { time: "03:00 PM", available: true },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Marcus Lee",
    role: "Guitar Instructor",
    birthDate: "1985-07-22",
    email: "marcus@example.com",
    phone: "+1 234-567-8901",
    address: "456 Rock Blvd, LA",
    availability: [
      {
        day: "Monday",
        slots: [
          { time: "09:00 AM", available: false },
          { time: "10:00 AM", available: false },
        ],
      },
      {
        day: "Tuesday",
        slots: [
          { time: "11:00 AM", available: false },
          { time: "12:00 PM", available: false },
        ],
      },
      {
        day: "Wednesday",
        slots: [
          { time: "10:00 AM", available: true },
          { time: "12:00 PM", available: false },
        ],
      },
      {
        day: "Thursday",
        slots: [
          { time: "02:00 PM", available: true },
          { time: "04:00 PM", available: true },
        ],
      },
      {
        day: "Friday",
        slots: [
          { time: "10:00 AM", available: false },
          { time: "12:00 PM", available: false },
        ],
      },
      {
        day: "Saturday",
        slots: [
          { time: "09:00 AM", available: true },
          { time: "10:00 AM", available: false },
        ],
      },
      {
        day: "Sunday",
        slots: [
          { time: "01:00 PM", available: false },
          { time: "02:00 PM", available: false },
        ],
      },
    ],
  },
];
