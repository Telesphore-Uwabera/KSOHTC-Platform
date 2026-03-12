import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Users, CheckCircle, Loader2, BookOpen, ChevronDown, ChevronRight } from "lucide-react";
import type { UserPublic, EnrollmentDoc, EnrollmentStatus, CourseDoc } from "@shared/api";
import { getApiBase } from "@/lib/apiBase";

type EnrollmentWithPercent = EnrollmentDoc & { completionPercent: number };

async function fetchLearnersSummary(): Promise<{
  users: UserPublic[];
  enrollmentsByUserId: Record<string, EnrollmentWithPercent[]>;
}> {
  const res = await fetch(getApiBase() + "/api/users/learners-summary");
  if (!res.ok) throw new Error("Failed to load learners");
  return res.json();
}

async function fetchCourses(): Promise<CourseDoc[]> {
  const res = await fetch(getApiBase() + "/api/course-content/courses");
  if (!res.ok) return [];
  const data = await res.json();
  return (data.courses ?? []).filter((c: CourseDoc) => c.published !== false);
}

async function approveUser(id: string): Promise<void> {
  const res = await fetch(getApiBase() + `/api/users/${id}/approve`, { method: "PATCH" });
  if (!res.ok) throw new Error("Failed to approve user");
}

async function updateEnrollmentStatus(enrollmentId: string, status: EnrollmentStatus): Promise<void> {
  const res = await fetch(getApiBase() + `/api/enrollments/${enrollmentId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Failed to update enrollment");
}

const statusLabel: Record<string, string> = {
  not_approved: "Not approved",
  active: "Active",
  completed: "Completed",
};

const statusClass: Record<string, string> = {
  not_approved: "bg-amber-100 text-amber-800",
  active: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
};

export default function AdminLearners() {
  const queryClient = useQueryClient();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["learners-summary"],
    queryFn: fetchLearnersSummary,
  });

  const { data: courses = [] } = useQuery({
    queryKey: ["course-content", "courses"],
    queryFn: fetchCourses,
  });

  const approveMutation = useMutation({
    mutationFn: approveUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["learners-summary"] }),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ enrollmentId, status }: { enrollmentId: string; status: EnrollmentStatus }) =>
      updateEnrollmentStatus(enrollmentId, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["learners-summary"] }),
  });

  const courseTitleById = Object.fromEntries(courses.map((c) => [c.id, c.title]));

  const users = data?.users ?? [];
  const enrollmentsByUserId = data?.enrollmentsByUserId ?? {};

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="bg-white rounded-[30px] shadow-sm border border-gray-200 p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary flex items-center gap-2 mb-2">
          <Users className="w-6 h-6" />
          Learners management
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Approve users so they can access courses. View enrollments, status, and completion per course.
        </p>

        {isLoading ? (
          <p className="text-gray-500 text-sm mt-6 flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading…
          </p>
        ) : users.length === 0 ? (
          <p className="text-gray-500 text-sm mt-6">No registered users yet.</p>
        ) : (
          <ul className="space-y-2 mt-6">
            {users.map((u) => {
              const enrollments = enrollmentsByUserId[u.id] ?? [];
              const isExpanded = expandedId === u.id;
              return (
                <li
                  key={u.id}
                  className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50/50"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 p-4">
                    <button
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? null : u.id)}
                      className="flex items-center gap-2 text-left min-w-0 flex-1"
                    >
                      {enrollments.length > 0 ? (
                        isExpanded ? (
                          <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-500 shrink-0" />
                        )
                      ) : (
                        <span className="w-4 shrink-0" />
                      )}
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900">{u.name}</p>
                        <p className="text-sm text-gray-600 truncate">
                          {u.email}
                          {u.organization ? ` · ${u.organization}` : ""}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {u.approved ? (
                            <span className="text-green-600">Approved</span>
                          ) : (
                            <span className="text-amber-600">Pending approval</span>
                          )}
                          {enrollments.length > 0 && (
                            <span className="ml-2">
                              · {enrollments.length} course{enrollments.length !== 1 ? "s" : ""}
                            </span>
                          )}
                        </p>
                      </div>
                    </button>
                    {!u.approved && (
                      <button
                        type="button"
                        onClick={() => approveMutation.mutate(u.id)}
                        disabled={approveMutation.isPending}
                        className="inline-flex items-center gap-1.5 bg-primary text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 disabled:opacity-60 shrink-0"
                      >
                        {approveMutation.isPending ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <>
                            <CheckCircle className="w-4 h-4" />
                            Approve
                          </>
                        )}
                      </button>
                    )}
                  </div>
                  {isExpanded && enrollments.length > 0 && (
                    <div className="border-t border-gray-200 bg-white px-4 py-3">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                        Enrollments
                      </p>
                      <ul className="space-y-2">
                        {enrollments.map((en) => (
                          <li
                            key={en.id}
                            className="flex flex-wrap items-center justify-between gap-2 py-2 px-3 rounded-lg bg-gray-50 border border-gray-100"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <BookOpen className="w-4 h-4 text-primary shrink-0" />
                              <span className="font-medium text-gray-900 truncate">
                                {courseTitleById[en.courseId] ?? en.courseId}
                              </span>
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${statusClass[en.status ?? "active"] ?? statusClass.active}`}
                              >
                                {statusLabel[en.status ?? "active"] ?? "Active"}
                              </span>
                              <span className="text-sm text-gray-600">
                                {en.completionPercent}% complete
                              </span>
                            </div>
                            <select
                              value={en.status ?? "active"}
                              onChange={(e) =>
                                updateStatusMutation.mutate({
                                  enrollmentId: en.id,
                                  status: e.target.value as EnrollmentStatus,
                                })
                              }
                              disabled={updateStatusMutation.isPending}
                              className="text-sm rounded-lg border border-gray-200 px-2 py-1.5 bg-white"
                            >
                              <option value="active">Active</option>
                              <option value="completed">Completed</option>
                              <option value="not_approved">Not approved</option>
                            </select>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

