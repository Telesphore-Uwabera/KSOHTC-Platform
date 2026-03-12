import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getStoredUser } from "../lib/auth";
import { getApiBase } from "@/lib/apiBase";
import type { AssessmentDoc, CourseDoc } from "@shared/api";

const getCourseContentApi = () => getApiBase() + "/api/course-content";

async function fetchCourse(courseId: string): Promise<CourseDoc | null> {
  const res = await fetch(`${getCourseContentApi()}/courses/${courseId}`);
  if (!res.ok) return null;
  return res.json();
}

async function fetchAssessment(
  courseId: string,
  moduleId: string,
  assessmentId: string
): Promise<AssessmentDoc | null> {
  const res = await fetch(
    `${getCourseContentApi()}/courses/${courseId}/modules/${moduleId}/assessments/${assessmentId}`
  );
  if (!res.ok) return null;
  return res.json();
}

export default function TakeModuleQuiz() {
  const { courseId, moduleId, assessmentId } = useParams<{
    courseId: string;
    moduleId: string;
    assessmentId: string;
  }>();
  const user = getStoredUser();
  const canAccess = user?.approved ?? false;
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const { data: course } = useQuery({
    queryKey: ["course-content", "course", courseId],
    queryFn: () => fetchCourse(courseId!),
    enabled: !!courseId,
  });

  const { data: assessment, isLoading } = useQuery({
    queryKey: ["course-content", "assessment", courseId, moduleId, assessmentId],
    queryFn: () => fetchAssessment(courseId!, moduleId!, assessmentId!),
    enabled: !!courseId && !!moduleId && !!assessmentId && canAccess,
  });

  const setAnswer = (questionId: string, optionIndex: number) => {
    if (submitted) return;
    setAnswers((a) => ({ ...a, [questionId]: optionIndex }));
  };

  const handleSubmit = () => {
    if (!assessment || submitted) return;
    const correct = assessment.questions.filter(
      (q) => answers[q.id] === q.correctIndex
    ).length;
    const pct = assessment.questions.length
      ? Math.round((correct / assessment.questions.length) * 100)
      : 0;
    setScore(pct);
    setSubmitted(true);
  };

  if (!courseId || !moduleId || !assessmentId) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="h-28" />
        <div className="max-w-2xl mx-auto px-4 py-12">
          <p className="text-gray-600">Invalid link.</p>
          <Link to="/courses" className="text-primary font-medium mt-2 inline-block">
            Back to courses
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  if (!canAccess) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="h-28" />
        <div className="max-w-2xl mx-auto px-4 py-12">
          <p className="text-gray-600">You need to be logged in and approved to take this quiz.</p>
          <Link to="/courses" className="text-primary font-medium mt-2 inline-block">
            Back to courses
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  if (isLoading || !assessment) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="h-28" />
        <div className="max-w-2xl mx-auto px-4 py-12">
          {isLoading ? (
            <p className="text-gray-600">Loading quiz…</p>
          ) : (
            <p className="text-gray-600">Quiz not found.</p>
          )}
          <Link
            to={`/courses/${courseId}`}
            className="text-primary font-medium mt-2 inline-block"
          >
            Back to course
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const passed = score !== null && score >= assessment.passThreshold;
  const courseTitle = course?.title ?? "Course";

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <div className="h-28 sm:h-32" aria-hidden="true" />

      <section className="py-8 sm:py-12 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to={`/courses/${courseId}`}
            className="inline-flex items-center gap-2 text-primary hover:text-secondary font-medium mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to {courseTitle}
          </Link>

          <h1 className="text-2xl font-bold text-primary mb-2">{assessment.title}</h1>
          {assessment.description && (
            <p className="text-gray-600 text-sm mb-6">{assessment.description}</p>
          )}

          {!submitted ? (
            <>
              <ul className="space-y-6">
                {assessment.questions.map((q, idx) => (
                  <li key={q.id} className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
                    <p className="font-medium text-gray-900 mb-3">
                      {idx + 1}. {q.text}
                    </p>
                    <ul className="space-y-2">
                      {q.options.map((opt, oIdx) => (
                        <li key={oIdx}>
                          <label className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50">
                            <input
                              type="radio"
                              name={q.id}
                              checked={answers[q.id] === oIdx}
                              onChange={() => setAnswer(q.id, oIdx)}
                              className="w-4 h-4 text-primary"
                            />
                            <span className="text-gray-700">{opt}</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={
                    Object.keys(answers).length < assessment.questions.length
                  }
                  className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  Submit answers
                </button>
                <p className="text-sm text-gray-500 mt-2">
                  You have selected answers for {Object.keys(answers).length} of{" "}
                  {assessment.questions.length} questions.
                </p>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
              <div
                className={`flex items-center gap-3 mb-4 ${
                  passed ? "text-green-700" : "text-amber-700"
                }`}
              >
                {passed ? (
                  <CheckCircle className="w-10 h-10" />
                ) : (
                  <XCircle className="w-10 h-10" />
                )}
                <div>
                  <p className="text-xl font-bold">
                    {passed ? "Passed" : "Not passed"}
                  </p>
                  <p className="text-lg">
                    Score: {score}% (required: {assessment.passThreshold}%)
                  </p>
                </div>
              </div>
              <Link
                to={`/courses/${courseId}`}
                className="text-primary font-medium hover:underline"
              >
                Back to course materials
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
