import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { ArrowLeft, FileText, ExternalLink, ClipboardList, Lock } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getStoredUser } from "../lib/auth";
import { getApiBase } from "@/lib/apiBase";
import type { CourseDoc, ModuleDoc, LessonDoc, AssessmentDoc, ProgressDoc } from "@shared/api";

const getCourseContentApi = () => getApiBase() + "/api/course-content";

async function ensureEnrolled(userId: string, courseId: string): Promise<void> {
  await fetch(`${getApiBase()}/api/enrollments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, courseId }),
  });
}

async function fetchCourse(courseId: string): Promise<CourseDoc | null> {
  const res = await fetch(`${getCourseContentApi()}/courses/${courseId}`);
  if (res.status === 404 || !res.ok) return null;
  return res.json();
}

async function fetchModules(courseId: string): Promise<ModuleDoc[]> {
  const res = await fetch(`${getCourseContentApi()}/courses/${courseId}/modules`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.modules ?? [];
}

type ModuleItem = { type: "lesson"; data: LessonDoc } | { type: "assessment"; data: AssessmentDoc };

async function fetchModuleItems(courseId: string, moduleId: string): Promise<ModuleItem[]> {
  const res = await fetch(`${getCourseContentApi()}/courses/${courseId}/modules/${moduleId}/items`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.items ?? [];
}

async function fetchProgress(userId: string, courseId: string): Promise<ProgressDoc | null> {
  const res = await fetch(`${getApiBase()}/api/progress?userId=${encodeURIComponent(userId)}&courseId=${encodeURIComponent(courseId)}`);
  if (!res.ok) return null;
  const data = await res.json();
  return data.progress ?? null;
}

async function markLessonComplete(userId: string, courseId: string, lessonId: string): Promise<void> {
  await fetch(`${getApiBase()}/api/progress`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, courseId, completedLessonId: lessonId }),
  });
}

function youtubeEmbedUrl(url: string): string {
  if (!url) return "";
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  return m ? `https://www.youtube.com/embed/${m[1]}` : url;
}

function ModuleBlock({
  courseId,
  module: mod,
  progress,
  userId,
  onProgressUpdate,
}: {
  courseId: string;
  module: ModuleDoc;
  progress: ProgressDoc | null;
  userId: string;
  onProgressUpdate: () => void;
}) {
  const { data: items = [] } = useQuery({
    queryKey: ["course-content", "items", courseId, mod.id],
    queryFn: () => fetchModuleItems(courseId, mod.id),
  });
  const completedLessons = new Set(progress?.completedLessonIds ?? []);
  const completedAssessments = new Set(progress?.completedAssessmentIds ?? []);

  const markCompleteMutation = useMutation({
    mutationFn: (lessonId: string) => markLessonComplete(userId, courseId, lessonId),
    onSuccess: () => onProgressUpdate(),
  });

  function isLessonUnlocked(itemIndex: number): boolean {
    for (let i = 0; i < itemIndex; i++) {
      const prev = items[i];
      if (prev.type === "assessment" && !completedAssessments.has(prev.data.id)) return false;
    }
    return true;
  }

  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
        <FileText className="w-5 h-5" />
        {mod.title}
      </h2>
      <ul className="space-y-4">
        {items.map((item, itemIndex) => {
          if (item.type === "lesson") {
            const lesson = item.data;
            const unlocked = isLessonUnlocked(itemIndex);

            return (
              <li key={`lesson-${lesson.id}`} className="flex flex-col gap-2">
                <span className="font-medium text-gray-900">{lesson.title}</span>
                {lesson.youtubeUrl && (
                  <div className="rounded-lg overflow-hidden bg-gray-100 aspect-video max-w-2xl">
                    <iframe
                      title={lesson.title}
                      src={youtubeEmbedUrl(lesson.youtubeUrl)}
                      className="w-full h-full"
                      allowFullScreen
                    />
                  </div>
                )}
                {lesson.pdfUrl && (
                  <>
                    {unlocked ? (
                      <a
                        href={lesson.pdfUrl.startsWith("http") ? lesson.pdfUrl : lesson.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          if (!completedLessons.has(lesson.id)) markCompleteMutation.mutate(lesson.id);
                        }}
                        className="inline-flex items-center gap-2 text-primary hover:text-accent font-medium underline underline-offset-2"
                      >
                        Open PDF
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    ) : (
                      <p className="inline-flex items-center gap-2 text-gray-500 text-sm">
                        <Lock className="w-4 h-4" />
                        Complete the break quiz above to unlock this PDF.
                      </p>
                    )}
                  </>
                )}
                {lesson.contentHtml && (
                  <div
                    className="prose prose-sm max-w-none text-gray-700"
                    dangerouslySetInnerHTML={{ __html: lesson.contentHtml }}
                  />
                )}
              </li>
            );
          }
          const assessment = item.data;
          const passed = completedAssessments.has(assessment.id);
          return (
            <li key={`assessment-${assessment.id}`} className="pt-2">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-primary/5 border border-primary/20">
                <ClipboardList className="w-5 h-5 text-primary" />
                <span className="font-medium text-gray-900">{assessment.title}</span>
                {passed && <span className="text-sm text-green-700">(passed)</span>}
                {!passed && (
                  <Link
                    to={`/courses/${courseId}/modules/${mod.id}/quiz/${assessment.id}`}
                    className="ml-auto inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 text-sm"
                  >
                    Take break quiz
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function CourseDetail() {
  const { courseId } = useParams<{ courseId: string }>();
  const user = getStoredUser();
  const canAccess = user?.approved ?? false;

  if (!user) return <Navigate to="/register" replace state={{ from: "course" }} />;

  const { data: course, isLoading: courseLoading } = useQuery({
    queryKey: ["course-content", "course", courseId],
    queryFn: () => fetchCourse(courseId!),
    enabled: !!courseId,
  });

  const { data: modules = [], isLoading: modulesLoading } = useQuery({
    queryKey: ["course-content", "modules", courseId],
    queryFn: () => fetchModules(courseId!),
    enabled: !!courseId && !!course,
  });

  const { data: progress, refetch: refetchProgress } = useQuery({
    queryKey: ["progress", user?.id, courseId],
    queryFn: () => fetchProgress(user!.id, courseId!),
    enabled: !!user?.id && !!courseId && canAccess,
  });

  const { data: legacyQuiz } = useQuery({
    queryKey: ["quiz", courseId],
    queryFn: () => fetchLegacyQuiz(courseId!),
    enabled: !!courseId && canAccess,
  });

  const enrollMutation = useMutation({
    mutationFn: () => ensureEnrolled(user!.id, courseId!),
  });

  useEffect(() => {
    if (canAccess && user?.id && courseId) enrollMutation.mutate();
  }, [canAccess, user?.id, courseId]);

  if (!courseId) return <Navigate to="/courses" replace />;
  if (courseLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="h-28 sm:h-32" />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <p className="text-gray-600">Loading course…</p>
        </div>
        <Footer />
      </div>
    );
  }
  if (!course) return <Navigate to="/courses" replace />;

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <div className="h-28 sm:h-32" aria-hidden="true" />

      <section className="relative text-white py-12 sm:py-16 min-h-[30vh] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/ksohtc-3.webp"
            alt=""
            className="w-full h-full object-cover hero-zoom bg-image-animate bg-image-move-endless"
            decoding="async"
            aria-hidden
          />
          <div className="absolute inset-0 bg-black/30" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-secondary/90" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white font-medium mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to courses
          </Link>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">{course.title}</h1>
          <p className="text-white/90 mt-1">{course.sector} · {course.duration}</p>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {!canAccess ? (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-amber-900">
              <p className="font-semibold">Access required</p>
              <p className="mt-2">
                Register and get approved by an admin to view course materials.
              </p>
              <div className="mt-4 flex gap-3">
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 bg-accent text-black font-bold py-2 px-4 rounded-lg"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center border-2 border-primary text-primary font-bold py-2 px-4 rounded-lg"
                >
                  Log in
                </Link>
              </div>
            </div>
          ) : (
            <>
              <p className="text-gray-600 mb-10">{course.description}</p>

              {modulesLoading ? (
                <p className="text-gray-600">Loading modules…</p>
              ) : (
                <div className="space-y-10">
                  {modules.map((mod) => (
                    <ModuleBlock
                      key={mod.id}
                      courseId={courseId!}
                      module={mod}
                      progress={progress ?? null}
                      userId={user!.id}
                      onProgressUpdate={() => refetchProgress()}
                    />
                  ))}

                  {legacyQuiz && (
                    <div>
                      <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                        <ClipboardList className="w-5 h-5" />
                        Course quiz
                      </h2>
                      <p className="text-gray-600 text-sm mb-3">
                        {legacyQuiz.description || "Test your knowledge after completing the materials."}
                      </p>
                      <Link
                        to={`/courses/${courseId}/quiz/take`}
                        className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-primary/90"
                      >
                        Take course quiz
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
