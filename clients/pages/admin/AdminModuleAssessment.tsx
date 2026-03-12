import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Save, Loader2, Trash2, Plus, ArrowLeft } from "lucide-react";
import type { AssessmentDoc, QuizQuestion, LessonDoc } from "@shared/api";
import { getApiBase } from "@/lib/apiBase";

const getCourseContentApi = () => getApiBase() + "/api/course-content";

async function fetchAssessment(courseId: string, moduleId: string, assessmentId: string): Promise<AssessmentDoc | null> {
  const res = await fetch(`${getCourseContentApi()}/courses/${courseId}/modules/${moduleId}/assessments`);
  if (!res.ok) return null;
  const data = await res.json();
  const list = (data as { assessments: AssessmentDoc[] }).assessments ?? [];
  return list.find((a) => a.id === assessmentId) ?? null;
}

async function fetchLessons(courseId: string, moduleId: string): Promise<LessonDoc[]> {
  const res = await fetch(`${getCourseContentApi()}/courses/${courseId}/modules/${moduleId}/lessons`);
  if (!res.ok) return [];
  const data = await res.json();
  return (data as { lessons: LessonDoc[] }).lessons ?? [];
}

function emptyQuestion(): QuizQuestion {
  return {
    id: crypto.randomUUID(),
    text: "",
    options: ["", ""],
    correctIndex: 0,
  };
}

export default function AdminModuleAssessment() {
  const { courseId, moduleId, assessmentId } = useParams<{ courseId: string; moduleId: string; assessmentId: string }>();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("Assessment");
  const [description, setDescription] = useState("");
  const [passThreshold, setPassThreshold] = useState(70);
  const [order, setOrder] = useState(0);
  const [afterLessonId, setAfterLessonId] = useState<string>("");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  const { data: lessons = [] } = useQuery({
    queryKey: ["course-content", "lessons", courseId, moduleId],
    queryFn: () => fetchLessons(courseId!, moduleId!),
    enabled: !!(courseId && moduleId),
  });

  const { data: assessment, isLoading } = useQuery({
    queryKey: ["course-content", "assessments", courseId, moduleId],
    queryFn: () => fetchAssessment(courseId!, moduleId!, assessmentId!),
    enabled: !!(courseId && moduleId && assessmentId),
  });

  useEffect(() => {
    if (assessment) {
      setTitle(assessment.title);
      setDescription(assessment.description ?? "");
      setPassThreshold(assessment.passThreshold);
      setOrder(assessment.order ?? 0);
      setAfterLessonId(assessment.afterLessonId ?? "");
      setQuestions(
        assessment.questions?.length
          ? assessment.questions.map((q) => ({ ...q, id: q.id || crypto.randomUUID() }))
          : [emptyQuestion()]
      );
    } else if (!isLoading && assessmentId) {
      setQuestions([emptyQuestion()]);
    }
  }, [assessment, isLoading, assessmentId]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${getCourseContentApi()}/courses/${courseId}/modules/${moduleId}/assessments/${assessmentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description: description || undefined,
          passThreshold,
          questions,
          order,
          afterLessonId: afterLessonId || undefined,
        }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as { error?: string }).error ?? "Failed to save");
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["course-content", "assessments", courseId, moduleId] });
    },
  });

  const addQuestion = () => setQuestions((q) => [...q, emptyQuestion()]);
  const removeQuestion = (index: number) => setQuestions((q) => q.filter((_, i) => i !== index));
  const setQuestion = (index: number, patch: Partial<QuizQuestion>) => {
    setQuestions((q) => q.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  };
  const setOption = (qIndex: number, oIndex: number, value: string) => {
    setQuestions((q) =>
      q.map((item, i) => {
        if (i !== qIndex) return item;
        const opts = [...item.options];
        opts[oIndex] = value;
        return { ...item, options: opts };
      })
    );
  };
  const addOption = (qIndex: number) => {
    setQuestions((q) =>
      q.map((item, i) => (i === qIndex ? { ...item, options: [...item.options, ""] } : item))
    );
  };
  const removeOption = (qIndex: number, oIndex: number) => {
    setQuestions((q) =>
      q.map((item, i) => {
        if (i !== qIndex) return item;
        const opts = item.options.filter((_, j) => j !== oIndex);
        const correctIndex = Math.min(item.correctIndex, Math.max(0, opts.length - 1));
        return { ...item, options: opts, correctIndex };
      })
    );
  };

  if (!courseId || !moduleId || !assessmentId) {
    return (
      <div className="p-6">
        <p className="text-gray-500">Missing course or module or assessment.</p>
        <Link to="/admin/course-content" className="mt-2 inline-block text-primary font-medium">Back to course content</Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="p-6">
        <p className="text-gray-500">Assessment not found.</p>
        <Link to={`/admin/course-content/${courseId}`} className="mt-2 inline-block text-primary font-medium">Back to course</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link to={`/admin/course-content/${courseId}`} className="inline-flex items-center gap-2 text-gray-600 hover:text-primary font-medium">
        <ArrowLeft className="w-4 h-4" /> Back to course
      </Link>

      <div className="bg-white rounded-[30px] shadow-sm border border-gray-200 p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-primary mb-6">Edit assessment</h1>

        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description (optional)</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pass threshold (%)</label>
            <input
              type="number"
              min={0}
              max={100}
              value={passThreshold}
              onChange={(e) => setPassThreshold(Number(e.target.value))}
              className="w-24 px-4 py-2 rounded-lg border border-gray-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Break placement – show quiz after which lesson?</label>
            <p className="text-xs text-gray-500 mb-1">Learners must pass this quiz before opening the next lesson.</p>
            <select
              value={afterLessonId}
              onChange={(e) => setAfterLessonId(e.target.value)}
              className="w-full max-w-md px-4 py-2 rounded-lg border border-gray-200 bg-white"
            >
              <option value="">End of module (no break)</option>
              {lessons.map((l) => (
                <option key={l.id} value={l.id}>
                  After: {l.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Order (number for sorting)</label>
            <input
              type="number"
              min={0}
              value={order}
              onChange={(e) => setOrder(Number(e.target.value))}
              className="w-24 px-4 py-2 rounded-lg border border-gray-200"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Questions</h2>
            <button type="button" onClick={addQuestion} className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
              <Plus className="w-4 h-4" /> Add question
            </button>
          </div>
          {questions.map((q, qIndex) => (
            <div key={q.id} className="p-4 rounded-2xl border border-gray-200 bg-gray-50/50 space-y-3">
              <div className="flex justify-between items-start gap-2">
                <span className="text-sm font-medium text-gray-500">Question {qIndex + 1}</span>
                <button type="button" onClick={() => removeQuestion(qIndex)} className="text-red-600 hover:text-red-700 p-1">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <input
                type="text"
                value={q.text}
                onChange={(e) => setQuestion(qIndex, { text: e.target.value })}
                placeholder="Question text"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white"
              />
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">Options (select correct)</p>
                {q.options.map((opt, oIndex) => (
                  <div key={oIndex} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`correct-${qIndex}`}
                      checked={q.correctIndex === oIndex}
                      onChange={() => setQuestion(qIndex, { correctIndex: oIndex })}
                      className="text-primary"
                    />
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) => setOption(qIndex, oIndex, e.target.value)}
                      placeholder={`Option ${oIndex + 1}`}
                      className="flex-1 px-3 py-2 rounded-lg border border-gray-200 bg-white"
                    />
                    {q.options.length > 2 && (
                      <button type="button" onClick={() => removeOption(qIndex, oIndex)} className="text-red-600 p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={() => addOption(qIndex)} className="text-sm text-primary font-medium hover:underline">
                  + Add option
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex gap-3">
          <button
            type="button"
            onClick={() => saveMutation.mutate()}
            disabled={saveMutation.isPending}
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50"
          >
            {saveMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save assessment
          </button>
        </div>
      </div>
    </div>
  );
}
