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
          Edit modules, lessons (YouTube + text), and assessments per subunit. Run{" "}
          <code className="bg-gray-100 px-1 rounded text-xs">pnpm run seed:courses</code> once to create courses from{" "}
          <code className="bg-gray-100 px-1 rounded text-xs">public/courses</code>.
        </p>
        {isLoading ? (
          <p className="text-gray-500 text-sm">Loading…</p>
        ) : courses.length === 0 ? (
          <p className="text-gray-500 text-sm">
            No courses in Firestore. Run <code className="bg-gray-100 px-1 rounded">pnpm run seed:courses</code> from the project root to seed from public/courses.
          </p>
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
