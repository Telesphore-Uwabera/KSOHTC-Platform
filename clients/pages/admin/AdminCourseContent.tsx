import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { BookOpen, ChevronRight, FolderOpen } from "lucide-react";
import type { CourseDoc } from "@shared/api";
import { getApiBase } from "@/lib/apiBase";

async function fetchCourseContent(): Promise<CourseDoc[]> {
  const res = await fetch(getApiBase() + "/api/course-content/courses");
  if (!res.ok) throw new Error("Failed to load courses");
  const data = await res.json();
  return (data as { courses: CourseDoc[] }).courses ?? [];
}

export default function AdminCourseContent() {
  const { data: courses = [], isLoading } = useQuery({
    queryKey: ["course-content", "courses"],
    queryFn: fetchCourseContent,
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-[30px] shadow-sm border border-gray-200 p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-primary flex items-center gap-2 mb-2">
          <FolderOpen className="w-6 h-6" />
          Course content
        </h1>
        <p className="text-gray-600 text-sm mb-6">
          This is where you manage course structure: modules, lessons (PDFs, YouTube, text), and break quizzes. Once courses exist, you’ll see them below and can edit each one.
        </p>
        {isLoading ? (
          <p className="text-gray-500 text-sm">Loading…</p>
        ) : courses.length === 0 ? (
          <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-5 text-amber-900">
            <p className="font-medium mb-2">No courses yet</p>
            <p className="text-sm text-amber-800/90 mb-3">
              Courses are created by running the seed script once (from your machine or CI). It reads PDFs from{" "}
              <code className="bg-amber-100 px-1 rounded text-xs">public/courses</code> and creates construction, industrial-safety, mining, safety-management, and safety-for-all in Firestore.
            </p>
            <p className="text-sm">
              From the project root run:{" "}
              <code className="bg-amber-100 px-2 py-1 rounded font-mono text-xs">pnpm run seed:courses</code>
            </p>
            <p className="text-xs mt-3 text-amber-700">
              After that, this page will list all courses and you can edit modules, lessons, and add break quizzes here.
            </p>
          </div>
        ) : (
          <ul className="space-y-2">
            {courses.map((c) => (
              <li key={c.id}>
                <Link
                  to={`/admin/course-content/${c.id}`}
                  className="flex items-center justify-between gap-3 p-4 rounded-2xl border border-gray-200 hover:border-primary/40 hover:bg-gray-50/50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 group-hover:text-primary">{c.title}</p>
                      <p className="text-sm text-gray-500">{c.sector} · {c.duration}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
