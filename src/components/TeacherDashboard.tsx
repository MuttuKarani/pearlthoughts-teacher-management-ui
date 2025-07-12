"use client";
import { useState, useEffect } from "react";
import { TeacherInfo } from "@/types/teacher";
import InfoCard from "./InfoCard";
import ContactInfo from "./ContactInfo";
import AvailabilityGrid from "./AvailabilityGrid";
import { FaUser } from "react-icons/fa";
import clsx from "clsx";

interface TeacherDashboardProps {
  teacher: TeacherInfo;
}

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

export default function TeacherDashboard({ teacher }: TeacherDashboardProps) {
  const [teacherData, setTeacherData] = useState(teacher);
  const [activeTab, setActiveTab] = useState("Availability");

  const [privateQualifications, setPrivateQualifications] = useState([
    ["Vocal Contemporary", "$28.00"],
    ["Vocal Core", "$28.00"],
    ["Vocal Hybrid", "$28.00"],
    ["Vocal Plus", "$28.00"],
    ["Instrument", "$28.00"],
  ]);

  const [groupQualifications, setGroupQualifications] = useState([
    "Group Singing 101",
    "Vocal Ensemble",
    "Musical Theatre Group",
  ]);

  const handleSlotToggle = (dayIndex: number, timeSlot: string) => {
    setTeacherData((prevTeacherData) => {
      const updatedAvailability = [...prevTeacherData.availability];
      const day = updatedAvailability[dayIndex];
      const slotIndex = day.slots.findIndex((slot) => slot.time === timeSlot);
      if (slotIndex !== -1) {
        day.slots[slotIndex].available = !day.slots[slotIndex].available;
      } else {
        day.slots.push({ time: timeSlot, available: true });
      }

      return { ...prevTeacherData, availability: updatedAvailability };
    });
  };

  useEffect(() => {
    const stored = localStorage.getItem("teacherDetails");
    if (stored) {
      setTeacherData(JSON.parse(stored));
    }
  }, []);

  const handleSaveDetails = (updated: Partial<TeacherInfo>) => {
    const updatedDetails = {
      ...teacherData,
      ...updated,
    };
    setTeacherData(updatedDetails);
    localStorage.setItem("teacherDetails", JSON.stringify(updatedDetails));
  };

  const handleAddPrivateQualification = (
    qualification: string,
    rate: string
  ) => {
    setPrivateQualifications((prev) => [...prev, [qualification, rate]]);
  };

  const handleAddGroupQualification = (qualification: string) => {
    setGroupQualifications((prev) => [...prev, qualification]);
  };

  return (
    <div className="pb-12 px-2 sm:px-4 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm text-gray-600 pt-4 flex items-center">
          <span className="text-blue-600">Teachers</span> /{" "}
          <span>{teacherData.name}</span>
          <FaUser className="ml-2 text-blue-600" />
        </h2>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <div className="space-y-4">
          <InfoCard
            title="Details"
            editable
            fields={[
              { label: "Name", key: "name", value: teacherData.name },
              { label: "Role", key: "role", value: teacherData.role },
              {
                label: "Birth Date",
                key: "birthDate",
                value: teacherData.birthDate,
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
                {privateQualifications.map(([name, rate]) => (
                  <tr key={name}>
                    <td>{name}</td>
                    <td>{rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4">
              <button
                onClick={() =>
                  handleAddPrivateQualification("New Qualification", "$30.00")
                }
                className="text-blue-500 hover:text-blue-700"
              >
                + Add Qualification
              </button>
            </div>
          </InfoCard>

          <InfoCard title="Group Qualifications" addable>
            <ul className="list-disc pl-4">
              {groupQualifications.map((qualification, index) => (
                <li key={index} className="text-sm text-gray-700">
                  {qualification}
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <button
                onClick={() =>
                  handleAddGroupQualification("New Group Qualification")
                }
                className="text-blue-500 hover:text-blue-700"
              >
                + Add Group Qualification
              </button>
            </div>
          </InfoCard>
        </div>

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
      </div>

      {/* Tabs */}
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
        {activeTab === "Availability" ? (
          <AvailabilityGrid
            data={teacherData.availability}
            onSlotToggle={handleSlotToggle}
          />
        ) : (
          <div className="text-gray-500 italic text-sm mt-4">
            {activeTab} content not implemented yet.
          </div>
        )}
      </div>
    </div>
  );
}
