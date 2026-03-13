import { Link } from "react-router-dom";
import { useMemo, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BookOpen,
  ArrowRight,
  HardHat,
  Building,
  Pickaxe,
  Shield,
  BarChart3,
  BookOpenCheck,
  Percent,
  ClipboardCheck,
  HelpCircle,
  Tag,
} from "lucide-react";
import { getStoredUser } from "../lib/auth";
import { getApiBase } from "@/lib/apiBase";
import type { CourseDoc, ProgressDoc } from "@shared/api";

const iconBySlug: Record<string, typeof HardHat> = {
  construction: HardHat,
  "industrial-safety": Building,
  mining: Pickaxe,
  "safety-management": Shield,
  "safety-for-all": Shield,
};

interface CourseStats {
  totalLessons: number;
  totalAssessments: number;
}

async function fetchCourses(): Promise<CourseDoc[]> {
  const res = await fetch(getApiBase() + "/api/course-content/courses");
  if (!res.ok) throw new Error("Failed to load courses");
  const data = await res.json();
  return (data.courses ?? []).filter((c: CourseDoc) => c.published !== false);
}

async function fetchAllProgress(userId: string): Promise<ProgressDoc[]> {
  const res = await fetch(getApiBase() + "/api/progress?userId=" + encodeURIComponent(userId));
  if (!res.ok) return [];
  const data = await res.json();
  const p = data.progress;
  return Array.isArray(p) ? p : [];
}

async function fetchCourseStats(courseId: string): Promise<CourseStats> {
  const res = await fetch(getApiBase() + "/api/course-content/courses/" + encodeURIComponent(courseId) + "/stats");
  if (!res.ok) return { totalLessons: 0, totalAssessments: 0 };
  return res.json();
}

function filterCoursesBySector(courses: CourseDoc[], sector: string | undefined): CourseDoc[] {
  if (!sector) return courses;
  return courses.filter((c) => c.id === "safety-management" || c.id === sector);
}

const SECTOR_LABELS: Record<string, string> = {
  construction: "Construction",
  "industrial-safety": "Industrial Safety",
  mining: "Mining",
  "safety-management": "General",
  "safety-for-all": "Safety for All",
};

export default function Dashboard() {
  const user = getStoredUser();
  const canAccess = user?.approved ?? false;
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!canAccess || !user?.id) return;
    const onFocus = () => queryClient.invalidateQueries({ queryKey: ["progress", user.id] });
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [canAccess, user?.id, queryClient]);

  const { data: allCourses = [], isLoading, error } = useQuery({
    queryKey: ["course-content", "courses"],
    queryFn: fetchCourses,
  });

  const { data: allProgress = [] } = useQuery({
    queryKey: ["progress", user?.id],
    queryFn: () => fetchAllProgress(user!.id),
    enabled: !!user?.id && canAccess,
  });

  const courses = useMemo(() => filterCoursesBySector(allCourses, user?.sector), [allCourses, user?.sector]);
  const courseIds = useMemo(() => courses.map((c) => c.id), [courses]);

  const { data: statsByCourse = {}, isLoading: statsLoading } = useQuery({
    queryKey: ["course-stats", courseIds.join("|")],
    queryFn: async () => {
      const entries = await Promise.all(
        courseIds.map(async (id) => {
          const s = await fetchCourseStats(id);
          return [id, s] as const;
        })
      );
      return Object.fromEntries(entries);
    },
    enabled: courseIds.length > 0 && canAccess,
  });

  const progressByCourse = useMemo(
    () => Object.fromEntries((allProgress as ProgressDoc[]).map((p) => [p.courseId, p])),
    [allProgress]
  );

  const { kpis, rows } = useMemo(() => {
    let totalCompletedLessons = 0;
    let totalPassedQuizzes = 0;
    let totalLessons = 0;
    let totalAssessments = 0;
    const rows: Array<{
      course: CourseDoc;
      completedLessons: number;
      totalLessons: number;
      passedQuizzes: number;
      totalAssessments: number;
      completionPercent: number;
    }> = [];

    for (const course of courses) {
      const progress = progressByCourse[course.id];
      const stats = statsByCourse[course.id] ?? { totalLessons: 0, totalAssessments: 0 };
      const completedLessons = progress?.completedLessonIds?.length ?? 0;
      const passedQuizzes = progress?.completedAssessmentIds?.length ?? 0;
      const totalSteps = stats.totalLessons + stats.totalAssessments;
      const completedSteps = completedLessons + passedQuizzes;
      const completionPercent = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

      totalCompletedLessons += completedLessons;
      totalPassedQuizzes += passedQuizzes;
      totalLessons += stats.totalLessons;
      totalAssessments += stats.totalAssessments;
      rows.push({
        course,
        completedLessons,
        totalLessons: stats.totalLessons,
        passedQuizzes,
        totalAssessments: stats.totalAssessments,
        completionPercent,
      });
    }

    const totalSteps = totalLessons + totalAssessments;
    const totalCompleted = totalCompletedLessons + totalPassedQuizzes;
    const overallPercent = totalSteps > 0 ? Math.round((totalCompleted / totalSteps) * 100) : 0;

    return {
      kpis: {
        completedSections: totalCompletedLessons + totalPassedQuizzes,
        completedLessons: totalCompletedLessons,
        passedQuizzes: totalPassedQuizzes,
        overallPercent,
        totalSteps,
      },
      rows,
    };
  }, [courses, progressByCourse, statsByCourse]);

  if (!canAccess) {
    return (
      <div className="bg-white rounded-[30px] shadow-sm border border-gray-200 p-6 sm:p-8">
        <p className="text-gray-600">Your account is pending approval. You will access your dashboard once an admin approves your registration.</p>
        <Link to="/courses" className="text-primary font-medium mt-2 inline-block">View courses</Link>
      </div>
    );
  }

  const categoryLabel = user?.sector ? (SECTOR_LABELS[user.sector] ?? user.sector) : "All categories";

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Your category + course cards (4-2-1) */}
      <div className="bg-white rounded-[30px] shadow-sm border border-gray-200 p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 text-sm text-gray-600">
            <Tag className="w-4 h-4 text-primary" />
            Your category:
          </span>
          <span className="font-semibold text-primary">{categoryLabel}</span>
        </div>
        <p className="text-gray-600 text-sm mb-6">
          Courses below are for your category. Open a course to view materials and mark lessons as done; progress updates here when you return.
        </p>
        {!isLoading && !error && courses.length > 0 && (
          <div className="grid w-full min-w-0 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {courses.map((course) => {
              const Icon = iconBySlug[course.slug] ?? BookOpen;
              const progress = progressByCourse[course.id];
              const stats = statsByCourse[course.id] ?? { totalLessons: 0, totalAssessments: 0 };
              const completed = (progress?.completedLessonIds?.length ?? 0) + (progress?.completedAssessmentIds?.length ?? 0);
              const total = stats.totalLessons + stats.totalAssessments;
              const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
              return (
                <Link
                  key={course.id}
                  to={`/courses/${course.id}`}
                  className="flex flex-col gap-2 p-4 rounded-xl border border-gray-200 bg-gray-50 hover:border-primary/30 hover:shadow-md transition-all text-left"
                >
                  <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Icon className="w-5 h-5" />
                  </span>
                  <p className="font-semibold text-gray-900 truncate">{course.title}</p>
                  <p className="text-xs text-gray-500">{course.sector} · {course.duration}</p>
                  <p className="text-sm text-primary font-medium mt-auto">
                    {completed} / {total} complete ({pct}%)
                  </p>
                  <span className="inline-flex items-center gap-1 text-primary text-sm font-medium">
                    View materials & mark done
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Header card */}
      <div className="bg-white rounded-[30px] shadow-sm border border-gray-200 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-primary flex items-center gap-2">
              <BarChart3 className="w-6 h-6" />
              My learning
            </h1>
            <p className="text-gray-600 text-sm sm:text-base mt-1">
              Your progress across courses: completed sections, passed quizzes, and completion percentage.
            </p>
          </div>
        </div>

        {/* KPI row: 4-2-1 layout (1 col mobile, 2 col tablet, 4 col desktop) */}
        <div className="grid w-full min-w-0 grid-cols-1 gap-4 mt-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-[24px] border border-gray-200 bg-white p-5">
            <p className="text-xs text-gray-500">Completed sections</p>
            <p className="text-3xl font-extrabold text-gray-900 mt-1">
              {statsLoading ? "…" : kpis.completedSections}
            </p>
            <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
              <ClipboardCheck className="w-4 h-4 text-primary" />
              Lessons + quizzes completed
            </p>
          </div>
          <div className="rounded-[24px] border border-gray-200 bg-white p-5">
            <p className="text-xs text-gray-500">Lessons completed</p>
            <p className="text-3xl font-extrabold text-gray-900 mt-1">
              {statsLoading ? "…" : kpis.completedLessons}
            </p>
            <p className="text-sm text-gray-600 mt-1">Sections you’ve finished</p>
          </div>
          <div className="rounded-[24px] border border-gray-200 bg-white p-5">
            <p className="text-xs text-gray-500">Passed quizzes</p>
            <p className="text-3xl font-extrabold text-gray-900 mt-1">
              {statsLoading ? "…" : kpis.passedQuizzes}
            </p>
            <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
              <BookOpenCheck className="w-4 h-4 text-primary" />
              Assessments passed
            </p>
          </div>
          <div className="rounded-[24px] border border-gray-200 bg-white p-5">
            <p className="text-xs text-gray-500">Overall completion</p>
            <p className="text-3xl font-extrabold text-primary mt-1">
              {statsLoading ? "…" : `${kpis.overallPercent}%`}
            </p>
            <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
              <Percent className="w-4 h-4 text-primary" />
              Across all courses
            </p>
          </div>
        </div>

        {/* How we calculate */}
        <div className="mt-6 rounded-2xl border border-gray-100 bg-gray-50 p-4">
          <p className="font-semibold text-gray-900 flex items-center gap-2 mb-2">
            <HelpCircle className="w-4 h-4 text-primary" />
            How we calculate your progress
          </p>
          <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
            <li><strong>Completed sections</strong> = number of lessons you’ve completed plus quizzes you’ve passed.</li>
            <li><strong>Completion %</strong> = (lessons completed + quizzes passed) ÷ (total lessons + total quizzes in that course) × 100.</li>
            <li><strong>Overall completion</strong> = same formula across all your courses (total completed steps ÷ total steps).</li>
          </ul>
        </div>
      </div>

      {/* Course progress table (grid layout unchanged) */}
      <div className="bg-white rounded-[30px] shadow-sm border border-gray-200 p-5 sm:p-6">
        <h2 className="text-lg font-bold text-primary mb-1 flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          Course progress
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Per-course breakdown. Mark lessons as done from each course page; numbers here update when you return to the dashboard.
        </p>
        {isLoading || statsLoading ? (
          <p className="text-gray-500 text-sm">Loading…</p>
        ) : error ? (
          <p className="text-red-600 text-sm">Could not load courses.</p>
        ) : rows.length === 0 ? (
          <p className="text-gray-600">No courses available yet. Check back later.</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-left text-gray-600">
                    <th className="py-2 pr-4 font-semibold">Course</th>
                    <th className="py-2 pr-4 font-semibold">Lessons</th>
                    <th className="py-2 pr-4 font-semibold">Quizzes passed</th>
                    <th className="py-2 font-semibold flex items-center gap-1">
                      <Percent className="w-3.5 h-3.5" /> Completion
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.course.id} className="border-b border-gray-100 last:border-0">
                      <td className="py-3 pr-4">
                        <Link
                          to={`/courses/${row.course.id}`}
                          className="font-medium text-primary hover:text-secondary"
                        >
                          {row.course.title}
                        </Link>
                      </td>
                      <td className="py-3 pr-4 text-gray-900">
                        {row.completedLessons} / {row.totalLessons}
                      </td>
                      <td className="py-3 pr-4 text-gray-900">
                        {row.passedQuizzes} / {row.totalAssessments}
                      </td>
                      <td className="py-3 text-gray-900">{row.completionPercent}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              All course access is from this dashboard. Open a course above to view materials and track progress.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
