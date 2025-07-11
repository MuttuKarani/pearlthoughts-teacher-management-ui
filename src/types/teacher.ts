import { DayAvailability } from "./availability";

export interface TeacherInfo {
  id: string;
  name: string;
  role: string;
  birthDate: string;
  email: string;
  phone: string;
  address: string;
  availability: DayAvailability[];
}
