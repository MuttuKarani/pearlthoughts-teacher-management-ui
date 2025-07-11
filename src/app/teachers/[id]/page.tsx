"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { teachers } from "@/data/teachers";
import TeacherDashboard from "@/components/TeacherDashboard";
import { TeacherInfo } from "@/types/teacher";

export default function TeacherPage() {
  const { id } = useParams();
  const teacherId = id as string;

  const [teacher, setTeacher] = useState<TeacherInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const found = teachers.find((t) => t.id === teacherId);
    if (found) {
      setTeacher(found);
    } else {
      setTeacher(null);
    }
    setLoading(false);
  }, [teacherId]);

  if (loading) {
    return <div className="p-4 text-blue-500">Loading...</div>;
  }

  if (!teacher) {
    return <div className="p-4 text-red-500">Teacher not found.</div>;
  }

  return <TeacherDashboard teacher={teacher} />;
}
