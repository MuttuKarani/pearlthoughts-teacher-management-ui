import {
  FaChalkboardTeacher,
  FaUsers,
  FaBook,
  FaClock,
  FaCog,
  FaStickyNote,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import Link from "next/link";

const teachers = [
  { id: "1", name: "Alynia Allan" },
  { id: "2", name: "Marcus Lee" },
];

function NavItem({
  icon,
  label,
  to,
}: {
  icon: React.ReactNode;
  label: string;
  to?: string;
}) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-700 cursor-pointer">
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </div>
  );
}

export default function SideBar({ isOpen }: { isOpen: boolean }) {
  return (
    <aside
      className={`bg-gray-800 text-white flex flex-col transition-all duration-300 ease-in-out min-h-screen ${
        isOpen ? "w-64" : "w-0 overflow-hidden"
      }`}
    >
      <div className="bg-red-600 h-12 flex items-center px-4 text-white font-semibold text-lg shadow-md">
        Teacher Management
      </div>

      <nav className="flex flex-col gap-2 text-sm px-2 py-4 overflow-y-auto">
        <Link href="/">
          <NavItem icon={<MdDashboard />} label="Dashboard" />
        </Link>

        {teachers.map((teacher) => (
          <Link key={teacher.id} href={`/teachers/${teacher.id}`}>
            <NavItem icon={<FaChalkboardTeacher />} label={teacher.name} />
          </Link>
        ))}

        <NavItem icon={<FaUsers />} label="Students" />
        <NavItem icon={<FaBook />} label="Courses" />
        <NavItem icon={<FaClock />} label="Schedules" />
        <NavItem icon={<FaCog />} label="Settings" />
        <NavItem icon={<FaStickyNote />} label="Release Notes" />
      </nav>
    </aside>
  );
}
