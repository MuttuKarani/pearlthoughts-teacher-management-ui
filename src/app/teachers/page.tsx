import Link from "next/link";
import { teachers } from "@/data/teachers";

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Teacher Dashboard</h1>
      <p>Select a teacher below to view their profile:</p>
      <ul>
        {teachers.map((teacher) => (
          <li key={teacher.id}>
            <Link href={`/teachers/${teacher.id}`}>{teacher.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
