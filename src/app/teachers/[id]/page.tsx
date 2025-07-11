"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { teachers } from "@/data/teachers";
import TeacherDashboard from "@/components/TeacherDashboard";
import { TeacherInfo } from "@/types/teacher";

export default function TeacherPage() {
  const params = useParams();
  const teacherId = params.id as string;

  const [teacher, setTeacher] = useState<TeacherInfo | null>(null);

  useEffect(() => {
    const found = teachers.find((t) => t.id === teacherId);
    setTeacher(found || null);
  }, [teacherId]);

  if (!teacher) {
    return <div className="p-4 text-red-500">Teacher not found.</div>;
  }

  return <TeacherDashboard teacher={teacher} />;
}
