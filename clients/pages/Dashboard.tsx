import { Link } from "react-router-dom";
import {
  BookOpen,
  ArrowRight,
  HardHat,
  Building,
  Pickaxe,
  Shield,
  BarChart3,
  Tag,
  BookOpenCheck,
  ClipboardCheck,
} from "lucide-react";
import { useDashboardData, SECTOR_LABELS } from "./dashboardData";

const iconBySlug: Record<string, typeof HardHat> = {
  construction: HardHat,
  "industrial-safety": Building,
  mining: Pickaxe,
  "safety-management": Shield,
  "safety-for-all": Shield,
};

export default function Dashboard() {
  const {
    user,
    canAccess,
    courses,
    progressByCourse,
    statsByCourse,
    kpis,
    isLoading,
    statsLoading,
    error,
  } = useDashboardData();

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
      <div className="bg-white rounded-[30px] shadow-sm border border-gray-200 p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary flex items-center gap-2">
          <BarChart3 className="w-6 h-6" />
          Overview
        </h1>
        <div className="flex flex-wrap items-center gap-2 mt-3 mb-4">
          <span className="inline-flex items-center gap-1.5 text-sm text-gray-600">
            <Tag className="w-4 h-4 text-primary" />
            Your category:
          </span>
          <span className="font-semibold text-primary">{categoryLabel}</span>
        </div>
        <p className="text-gray-600 text-sm mb-6">
          {user?.sector
            ? "You see only courses for your sector (and General). Open a course in My courses to view materials and mark lessons as done."
            : "Open a course in My courses to view materials and track progress."}
        </p>

        {!isLoading && !error && courses.length > 0 && (
          <div className="grid w-full min-w-0 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
            {courses.slice(0, 4).map((course) => {
              const Icon = iconBySlug[course.slug ?? course.id] ?? BookOpen;
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
                    {completed} / {total} ({pct}%)
                  </p>
                </Link>
              );
            })}
          </div>
        )}

        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 mb-6">
          <p className="text-sm font-semibold text-gray-900 mb-2">Quick stats</p>
          <p className="text-sm text-gray-600 flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="inline-flex items-center gap-1.5">
              <ClipboardCheck className="w-4 h-4 text-primary" />
              {statsLoading ? "…" : kpis.completedSections} sections completed
            </span>
            <span className="inline-flex items-center gap-1.5">
              <BookOpenCheck className="w-4 h-4 text-primary" />
              {statsLoading ? "…" : kpis.passedQuizzes} quizzes passed
            </span>
            <span className="font-semibold text-primary">
              {statsLoading ? "…" : `${kpis.overallPercent}%`} overall
            </span>
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/dashboard/courses"
            className="inline-flex items-center gap-2 bg-primary text-white font-semibold py-2.5 px-5 rounded-xl hover:bg-primary/90 transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            My courses
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/dashboard/progress"
            className="inline-flex items-center gap-2 border-2 border-primary text-primary font-semibold py-2.5 px-5 rounded-xl hover:bg-primary/5 transition-colors"
          >
            <BarChart3 className="w-4 h-4" />
            View progress
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
