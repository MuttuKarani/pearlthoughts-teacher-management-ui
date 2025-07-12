"use client";
import { FC } from "react";
import { useState, useEffect } from "react";
import { TeacherInfo } from "@/types/teacher";
import { FaUser, FaCheckCircle, FaTrashAlt } from "react-icons/fa";
import clsx from "clsx";
import { toast } from "sonner";
import InfoCard from "./InfoCard";
import ContactInfo from "./ContactInfo";
import AvailabilityGrid from "./AvailabilityGrid";

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

const TeacherDashboard: FC<TeacherDashboardProps> = ({ teacher }) => {
  const [activeTab, setActiveTab] = useState("Availability");

  const [privateQualifications, setPrivateQualifications] = useState<
    [string, string][]
  >(() => {
    const savedQualifications = localStorage.getItem("privateQualifications");
    try {
      const parsed = savedQualifications ? JSON.parse(savedQualifications) : [];
      return Array.isArray(parsed) &&
        parsed.every((item) => Array.isArray(item) && item.length === 2)
        ? parsed
        : [
            ["Vocal Contemporary", "$28.00"],
            ["Vocal Core", "$28.00"],
            ["Vocal Hybrid", "$28.00"],
            ["Vocal Plus", "$28.00"],
            ["Instrument", "$28.00"],
          ];
    } catch (e) {
      return [
        ["Vocal Contemporary", "$28.00"],
        ["Vocal Core", "$28.00"],
        ["Vocal Hybrid", "$28.00"],
        ["Vocal Plus", "$28.00"],
        ["Instrument", "$28.00"],
      ];
    }
  });

  const [groupQualifications, setGroupQualifications] = useState<string[]>(
    () => {
      const savedGroupQualifications = localStorage.getItem(
        "groupQualifications"
      );
      return savedGroupQualifications
        ? JSON.parse(savedGroupQualifications)
        : ["Group Singing 101", "Vocal Ensemble", "Musical Theatre Group"];
    }
  );

  useEffect(() => {
    localStorage.setItem(
      "privateQualifications",
      JSON.stringify(privateQualifications)
    );
  }, [privateQualifications]);

  useEffect(() => {
    localStorage.setItem(
      "groupQualifications",
      JSON.stringify(groupQualifications)
    );
  }, [groupQualifications]);

  const handleSaveQualification = (index: number) => {
    const updated = [...privateQualifications];
    setPrivateQualifications(updated);
    toast.success("Qualification saved!");
  };

  const handleAddNewQualification = (name: string, rate: string) => {
    setPrivateQualifications((prev) => [...prev, [name, rate]]);
  };

  const handleDeletePrivateQualification = (index: number) => {
    const updated = [...privateQualifications];
    updated.splice(index, 1);
    setPrivateQualifications(updated);
    toast.success("Qualification deleted!");
  };

  const handleAddGroupQualification = (qualification: string) => {
    setGroupQualifications((prev) => [...prev, qualification]);
  };

  const handleSaveGroupQualification = (index: number) => {
    const updated = [...groupQualifications];
    setGroupQualifications(updated);
    toast.success("Group qualification saved!");
  };

  const handleDeleteGroupQualification = (index: number) => {
    const updated = [...groupQualifications];
    updated.splice(index, 1);
    setGroupQualifications(updated);
    toast.success("Group qualification deleted!");
  };

  const handleSlotToggle = (dayIndex: number, timeSlot: string) => {
    const updatedAvailability = [...teacher.availability];
    const day = updatedAvailability[dayIndex];
    const slotIndex = day.slots.findIndex((slot) => slot.time === timeSlot);

    if (slotIndex !== -1) {
      day.slots[slotIndex].available = !day.slots[slotIndex].available;
    } else {
      day.slots.push({ time: timeSlot, available: true });
    }

    teacher.availability = updatedAvailability;
  };

  const handleSaveDetails = (updated: Partial<TeacherInfo>) => {
    Object.assign(teacher, updated);
  };

  return (
    <div className="pb-12 px-2 sm:px-4 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm text-gray-600 pt-4 flex items-center">
          <button
            className="text-blue-600 hover:underline mr-2"
            onClick={() => setActiveTab("Availability")}
          >
            Back to Teachers
          </button>
          / <span className="ml-2">{teacher.name}</span>
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
              { label: "Name", key: "name", value: teacher.name },
              { label: "Role", key: "role", value: teacher.role },
              {
                label: "Birth Date",
                key: "birthDate",
                value: teacher.birthDate,
              },
            ]}
            onSave={handleSaveDetails}
          />

          {/* Private Qualifications Section */}
          <InfoCard title="Private Qualifications" addable>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th>Name</th>
                  <th>Rate ($/hr)</th>
                  <th className="w-24">Actions</th>
                </tr>
              </thead>
              <tbody>
                {privateQualifications.map(([name, rate], index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                          const updated = [...privateQualifications];
                          updated[index][0] = e.target.value;
                          setPrivateQualifications(updated);
                        }}
                        className="border p-1 w-full text-sm"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={rate}
                        onChange={(e) => {
                          const updated = [...privateQualifications];
                          updated[index][1] = e.target.value;
                          setPrivateQualifications(updated);
                        }}
                        className="border p-1 w-full text-sm"
                      />
                    </td>
                    <td className="flex items-center space-x-2">
                      <button
                        onClick={() => handleSaveQualification(index)}
                        className="text-green-500 hover:text-green-700 text-xs"
                      >
                        <FaCheckCircle className="text-green-500" />
                      </button>

                      <button
                        onClick={() => handleDeletePrivateQualification(index)}
                        className="text-red-500 hover:text-red-700 text-xs"
                      >
                        <FaTrashAlt className="text-red-500" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4">
              <button
                onClick={() =>
                  handleAddNewQualification("New Qualification", "$30.00")
                }
                className="text-blue-500 hover:text-blue-700"
              >
                + Add Qualification
              </button>
            </div>
          </InfoCard>

          {/* Group Qualifications Section */}
          <InfoCard title="Group Qualifications" addable>
            <ul className="space-y-2">
              {groupQualifications.map((qualification, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={qualification}
                    onChange={(e) => {
                      const updated = [...groupQualifications];
                      updated[index] = e.target.value;
                      setGroupQualifications(updated);
                    }}
                    className="border p-1 w-full text-sm"
                  />
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleSaveGroupQualification(index)}
                      className="text-green-500 hover:text-green-700 text-xs"
                    >
                      <FaCheckCircle className="text-green-500" />
                    </button>

                    <button
                      onClick={() => handleDeleteGroupQualification(index)}
                      className="text-red-500 hover:text-red-700 text-xs"
                    >
                      <FaTrashAlt className="text-red-500" />
                    </button>
                  </div>
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
                + Add Qualification
              </button>
            </div>
          </InfoCard>
        </div>

        <div className="space-y-4">
          <ContactInfo type="Email" label="Work" value={teacher.email} />
          <ContactInfo type="Phone" label="Home" value={teacher.phone} />
          <ContactInfo type="Addresses" label="Home" value={teacher.address} />
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
            data={teacher.availability}
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
};

export default TeacherDashboard;
