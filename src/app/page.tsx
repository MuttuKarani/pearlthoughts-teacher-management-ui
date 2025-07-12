import { teachers } from "@/data/teachers";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex w-full min-h-screen">
      {" "}
      <div className="p-8 flex-grow w-full">
        {" "}
        <h1 className="text-3xl font-bold">Teacher Management Dashboard</h1>
        <p className="mt-4 text-lg">Click a teacher to view their details.</p>
        <ul className="mt-8 space-y-2">
          {teachers.map((teacher) => (
            <li key={teacher.id}>
              <Link
                href={`/teachers/${teacher.id}`}
                className="text-blue-600 hover:underline"
              >
                {teacher.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
