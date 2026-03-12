import { Link, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, ArrowRight, HardHat, Building, Pickaxe, Shield } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getStoredUser } from "../lib/auth";
import { getApiBase } from "@/lib/apiBase";
import type { CourseDoc } from "@shared/api";

const iconBySlug: Record<string, typeof HardHat> = {
  construction: HardHat,
  "industrial-safety": Building,
  mining: Pickaxe,
  "safety-management": Shield,
  "safety-for-all": Shield,
};

async function fetchCourses(): Promise<CourseDoc[]> {
  const res = await fetch(getApiBase() + "/api/course-content/courses");
  if (!res.ok) throw new Error("Failed to load courses");
  const data = await res.json();
  return (data.courses ?? []).filter((c: CourseDoc) => c.published !== false);
}

export default function Dashboard() {
  const user = getStoredUser();
  const canAccess = user?.approved ?? false;

  const { data: courses = [], isLoading, error } = useQuery({
    queryKey: ["course-content", "courses"],
    queryFn: fetchCourses,
  });

  if (!user) return <Navigate to="/register" replace />;
  if (!canAccess) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="h-28" />
        <div className="max-w-2xl mx-auto px-4 py-12">
          <p className="text-gray-600">Your account is pending approval. You will access your dashboard once an admin approves your registration.</p>
          <Link to="/courses" className="text-primary font-medium mt-2 inline-block">View courses</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <div className="h-28 sm:h-32" aria-hidden="true" />

      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <span className="inline-flex w-12 h-12 rounded-xl bg-primary/10 items-center justify-center text-primary">
              <BookOpen className="w-6 h-6" />
            </span>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-primary">My learning</h1>
              <p className="text-gray-600">Continue with your courses or start a new one.</p>
            </div>
          </div>

          {isLoading && <p className="text-gray-600">Loading courses…</p>}
          {error && <p className="text-red-600">Could not load courses.</p>}

          {!isLoading && !error && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Available courses</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {courses.map((course) => {
                  const Icon = iconBySlug[course.slug] ?? BookOpen;
                  return (
                    <Link
                      key={course.id}
                      to={`/courses/${course.id}`}
                      className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-primary/30 hover:shadow-md transition-all"
                    >
                      <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <Icon className="w-5 h-5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-gray-900 truncate">{course.title}</p>
                        <p className="text-sm text-gray-500">{course.sector} · {course.duration}</p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-primary flex-shrink-0" />
                    </Link>
                  );
                })}
              </div>
              {courses.length === 0 && (
                <p className="text-gray-600">No courses available yet. Check back later.</p>
              )}
            </div>
          )}

          <div className="mt-10">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-accent"
            >
              View all courses
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
