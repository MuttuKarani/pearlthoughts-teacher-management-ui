import { FaBars } from "react-icons/fa";
import { useState } from "react";

export default function TopBar({
  onToggleSidebar,
}: {
  onToggleSidebar: () => void;
}) {
  const [location, setLocation] = useState("Richmond Hill");

  return (
    <header className="bg-red-600 text-white flex items-center px-4 h-12 shadow-md">
      <button
        onClick={onToggleSidebar}
        className="text-white text-xl mr-3 focus:outline-none"
        title="Toggle Sidebar"
      >
        <FaBars />
      </button>
      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="bg-white text-red-600 rounded px-2 py-1 text-sm focus:outline-none"
      >
        <option value="Richmond Hill">Richmond Hill</option>
        <option value="Downtown">Downtown</option>
        <option value="Scarborough">Scarborough</option>
      </select>
    </header>
  );
}
