"use client";

import { useState } from "react";
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

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("Availability");

  return (
    <div className="pb-12 space-y-8 px-2 sm:px-4">
      {/* Name */}
      <h2 className="text-sm text-gray-600 pt-4">
        <span className="text-blue-600">Teachers</span> / Alynia Allan 👤
      </h2>

      {/* Teacher Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <InfoCard title="Details" editable>
          <p>
            <strong>Name:</strong> Alynia Allan
          </p>
          <p>
            <strong>Role:</strong> Teacher
          </p>
          <p>
            <strong>Birth Date:</strong> Jan 10, 1980
          </p>
        </InfoCard>

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

        <InfoCard title="Group Qualifications" addable>
          <p className="text-sm text-gray-500">
            No group qualifications listed.
          </p>
        </InfoCard>
      </div>

      {/* Tab Bar */}
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

      {/* Tab Content */}
      <div>
        {activeTab === "Availability" && (
          <>
            <AvailabilityGrid data={mockAvailability} />
          </>
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
