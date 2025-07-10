// TeacherDashboard.tsx
"use client";

import { useEffect, useState } from "react";
import InfoCard from "./InfoCard";
import ContactInfo from "./ContactInfo";
import AvailabilityGrid from "./AvailabilityGrid";
import { DayAvailability } from "@/types/availability";
import clsx from "clsx";

const tabs = [
  "Availability",
  "Unavailabilities",
  "Students",
  "Schedule",
  "Invoiced Lessons",
  "Unscheduled Lessons",
  "Time Voucher",
  "Comments",
  "History",
];

const defaultDetails = {
  name: "Alynia Allan",
  role: "Teacher",
  birthDate: "Jan 10, 1980",
};

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("Availability");
  const [details, setDetails] = useState(defaultDetails);

  useEffect(() => {
    const stored = localStorage.getItem("teacherDetails");
    if (stored) {
      setDetails(JSON.parse(stored));
    }
  }, []);

  const handleSaveDetails = (updated: typeof defaultDetails) => {
    setDetails(updated);
    localStorage.setItem("teacherDetails", JSON.stringify(updated));
  };

  const mockAvailability: DayAvailability[] = [
    { day: "Monday", slots: Array(20).fill({ time: "", available: false }) },
    {
      day: "Tuesday",
      slots: Array(20)
        .fill({ time: "", available: false })
        .map((_, i) => ({ time: "", available: i === 13 })),
    },
    { day: "Wednesday", slots: Array(20).fill({ time: "", available: false }) },
    {
      day: "Thursday",
      slots: Array(20)
        .fill({ time: "", available: false })
        .map((_, i) => ({ time: "", available: i === 15 })),
    },
    { day: "Friday", slots: Array(20).fill({ time: "", available: false }) },
    { day: "Saturday", slots: Array(20).fill({ time: "", available: false }) },
    { day: "Sunday", slots: Array(20).fill({ time: "", available: false }) },
  ];

  return (
    <div className="pb-12 space-y-8 px-2 sm:px-4">
      <h2 className="text-sm text-gray-600 pt-4">
        <span className="text-blue-600">Teachers</span> / {details.name} 👤
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column */}
        <div className="space-y-4">
          <InfoCard
            title="Details"
            editable
            fields={[
              { label: "Name", key: "name", value: details.name },
              { label: "Role", key: "role", value: details.role },
              {
                label: "Birth Date",
                key: "birthDate",
                value: details.birthDate,
              },
            ]}
            onSave={handleSaveDetails}
          />

          <InfoCard title="Private Qualifications" addable>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th>Name</th>
                  <th>Rate ($/hr)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Vocal Contemporary", "$28.00"],
                  ["Vocal Core", "$28.00"],
                  ["Vocal Hybrid", "$28.00"],
                  ["Vocal Plus", "$28.00"],
                  ["Instrument", "$28.00"],
                ].map(([name, rate]) => (
                  <tr key={name}>
                    <td>{name}</td>
                    <td>{rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </InfoCard>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <ContactInfo
            type="Email"
            label="Work"
            value="alyniaallan@example.com"
          />
          <ContactInfo type="Phone" label="Home" value="(416) 648-9057" />
          <ContactInfo
            type="Addresses"
            label="Home"
            value={`56 Odosardo Di Santo Cir\nNorth York, Ontario\nCanada`}
          />
        </div>

        <div className="md:col-span-1 max-w-[30rem]">
          <InfoCard title="Group Qualifications" addable>
            <p className="text-sm text-gray-500">
              No group qualifications listed.
            </p>
          </InfoCard>
        </div>
      </div>

      <div className="w-full overflow-x-auto border-b bg-white shadow-sm">
        <div className="flex whitespace-nowrap px-2 sm:px-0 space-x-4 text-sm font-medium">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={clsx(
                "py-3 px-2 border-b-2 transition-colors duration-200",
                activeTab === tab
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-blue-500"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div>
        {activeTab === "Availability" && (
          <AvailabilityGrid data={mockAvailability} />
        )}
        {activeTab !== "Availability" && (
          <div className="text-gray-500 italic text-sm mt-4">
            {activeTab} content not implemented yet.
          </div>
        )}
      </div>
    </div>
  );
}
