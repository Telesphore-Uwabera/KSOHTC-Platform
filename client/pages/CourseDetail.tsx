import { Link, useParams, Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, FileText, ExternalLink, ClipboardList } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getStoredUser } from "../lib/auth";
import {
  COURSES,
  SAFETY_MANAGEMENT_FILES,
  courseFileUrl,
  type CourseId,
} from "../data/courses";
import { cn } from "@/lib/utils";

async function fetchQuiz(courseId: string) {
  const res = await fetch(`/api/courses/${courseId}/quiz`);
  if (!res.ok) return null;
  return res.json();
}

export default function CourseDetail() {
  const { courseId } = useParams<{ courseId: string }>();
  const user = getStoredUser();
  const canAccess = user?.approved ?? false;
  const course = COURSES.find((c) => c.id === (courseId as CourseId));
  const { data: quiz } = useQuery({
    queryKey: ["quiz", courseId],
    queryFn: () => fetchQuiz(courseId!),
    enabled: !!courseId && canAccess,
  });

  if (!course) {
    return <Navigate to="/courses" replace />;
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <div className="h-28 sm:h-32" aria-hidden="true" />

      <section className="relative text-white py-12 sm:py-16 min-h-[30vh] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/ksohtc-3.jpeg"
            alt=""
            className="w-full h-full object-cover hero-zoom"
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
              <p className="text-gray-600 mb-10">{course.desc}</p>

              <div className="space-y-10">
                <div>
                  <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Module 1: Safety Management
                  </h2>
                  <p className="text-gray-600 text-sm mb-3">
                    Core module included in every course.
                  </p>
                  <ul className="space-y-2">
                    {SAFETY_MANAGEMENT_FILES.map((name) => (
                      <li key={name}>
                        <a
                          href={courseFileUrl("safety-management", name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            "inline-flex items-center gap-2 text-primary hover:text-accent font-medium",
                            "underline underline-offset-2"
                          )}
                        >
                          {name.replace(/\.pdf$/i, "")}
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Module 2: {course.sector} materials
                  </h2>
                  <ul className="space-y-2">
                    {course.sectorModuleFiles.map((name) => (
                      <li key={name}>
                        <a
                          href={courseFileUrl(course.id, name)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={cn(
                            "inline-flex items-center gap-2 text-primary hover:text-accent font-medium",
                            "underline underline-offset-2"
                          )}
                        >
                          {name.replace(/\.(pdf|pptx)$/i, "")}
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {quiz && (
                  <div>
                    <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                      <ClipboardList className="w-5 h-5" />
                      Quiz & assessment
                    </h2>
                    <p className="text-gray-600 text-sm mb-3">
                      {quiz.description || "Test your knowledge after completing the materials."}
                    </p>
                    <Link
                      to={`/courses/${courseId}/quiz/take`}
                      className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-primary/90"
                    >
                      Take quiz
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
