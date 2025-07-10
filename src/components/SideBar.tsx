import {
  FaChalkboardTeacher,
  FaUsers,
  FaBook,
  FaClock,
  FaCog,
  FaStickyNote,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

function NavItem({ icon, label }: { icon: React.ReactNode; label: string }) {
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
      className={`bg-gray-800 text-white h-full flex flex-col transition-all duration-300 ${
        isOpen ? "w-64" : "w-0 overflow-hidden"
      }`}
    >
      <div className="bg-red-600 h-12 flex items-center px-4 text-white font-semibold text-lg shadow-md">
        Teacher Management
      </div>

      <nav className="flex flex-col gap-2 text-sm px-2 py-4">
        <NavItem icon={<MdDashboard />} label="Dashboard" />
        <NavItem icon={<FaChalkboardTeacher />} label="Teachers" />
        <NavItem icon={<FaUsers />} label="Students" />
        <NavItem icon={<FaBook />} label="Courses" />
        <NavItem icon={<FaClock />} label="Schedules" />
        <NavItem icon={<FaCog />} label="Settings" />
        <NavItem icon={<FaStickyNote />} label="Release Notes" />
      </nav>
    </aside>
  );
}
