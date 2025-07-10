"use client";

import { useState, useEffect } from "react";
import TopBar from "@/components/TopBar";
import SideBar from "@/components/SideBar";

export default function LayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <div
        className={`fixed top-12 left-0 z-40 h-[calc(100vh-3rem)] transition-all duration-300 bg-gray-800 text-white ${
          showSidebar ? "w-64" : "w-0 overflow-hidden"
        } md:static md:w-64`}
      >
        <SideBar isOpen={showSidebar} />
      </div>

      <div className="flex flex-col flex-1 w-full">
        <TopBar onToggleSidebar={() => setShowSidebar((prev) => !prev)} />
        <main
          className={`flex-1 overflow-y-auto bg-gray-50 p-4 pt-16 ${
            isMobile && showSidebar ? "pointer-events-none opacity-30" : ""
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
