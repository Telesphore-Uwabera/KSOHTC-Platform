import { Link, useParams, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, FileText, ExternalLink, ClipboardList } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getStoredUser } from "../lib/auth";
import { getApiBase } from "@/lib/apiBase";
import type { CourseDoc, ModuleDoc, LessonDoc, AssessmentDoc } from "@shared/api";

const getCourseContentApi = () => getApiBase() + "/api/course-content";

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

async function fetchLessons(courseId: string, moduleId: string): Promise<LessonDoc[]> {
  const res = await fetch(`${getCourseContentApi()}/courses/${courseId}/modules/${moduleId}/lessons`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.lessons ?? [];
}

async function fetchAssessments(courseId: string, moduleId: string): Promise<AssessmentDoc[]> {
  const res = await fetch(`${getCourseContentApi()}/courses/${courseId}/modules/${moduleId}/assessments`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.assessments ?? [];
}

async function fetchLegacyQuiz(courseId: string): Promise<{ title?: string; description?: string } | null> {
  const res = await fetch(getApiBase() + `/api/courses/${courseId}/quiz`);
  if (!res.ok) return null;
  return res.json();
}

function youtubeEmbedUrl(url: string): string {
  if (!url) return "";
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  return m ? `https://www.youtube.com/embed/${m[1]}` : url;
}

function ModuleBlock({
  courseId,
  module: mod,
}: {
  courseId: string;
  module: ModuleDoc;
}) {
  const { data: lessons = [] } = useQuery({
    queryKey: ["course-content", "lessons", courseId, mod.id],
    queryFn: () => fetchLessons(courseId, mod.id),
  });
  const { data: assessments = [] } = useQuery({
    queryKey: ["course-content", "assessments", courseId, mod.id],
    queryFn: () => fetchAssessments(courseId, mod.id),
  });
  const firstAssessment = assessments[0];

  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
        <FileText className="w-5 h-5" />
        {mod.title}
      </h2>
      <ul className="space-y-3 mb-4">
        {lessons.map((lesson) => (
          <li key={lesson.id} className="flex flex-col gap-2">
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
              <a
                href={lesson.pdfUrl.startsWith("http") ? lesson.pdfUrl : lesson.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-accent font-medium underline underline-offset-2"
              >
                Open PDF
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {lesson.contentHtml && (
              <div
                className="prose prose-sm max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: lesson.contentHtml }}
              />
            )}
          </li>
        ))}
      </ul>
      {firstAssessment && (
        <Link
          to={`/courses/${courseId}/modules/${mod.id}/quiz/${firstAssessment.id}`}
          className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-lg font-semibold hover:bg-primary/20"
        >
          <ClipboardList className="w-4 h-4" />
          Take module quiz
        </Link>
      )}
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

  const { data: legacyQuiz } = useQuery({
    queryKey: ["quiz", courseId],
    queryFn: () => fetchLegacyQuiz(courseId!),
    enabled: !!courseId && canAccess,
  });

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
            className="w-full h-full object-cover hero-zoom bg-image-animate bg-image-pan"
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
                    <ModuleBlock key={mod.id} courseId={courseId!} module={mod} />
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
