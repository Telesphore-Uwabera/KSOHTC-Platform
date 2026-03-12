import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Users, CheckCircle, Loader2 } from "lucide-react";
import type { UserPublic } from "@shared/api";

async function fetchUsers(): Promise<UserPublic[]> {
  const res = await fetch("/api/users");
  if (!res.ok) throw new Error("Failed to load users");
  const data = await res.json();
  return (data as { users: UserPublic[] }).users ?? [];
}

async function approveUser(id: string): Promise<void> {
  const res = await fetch(`/api/users/${id}/approve`, { method: "PATCH" });
  if (!res.ok) throw new Error("Failed to approve user");
}

export default function AdminLearners() {
  const queryClient = useQueryClient();
  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });
  const approveMutation = useMutation({
    mutationFn: approveUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["users"] }),
  });

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="bg-white rounded-[30px] shadow-sm border border-gray-200 p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary flex items-center gap-2 mb-2">
          <Users className="w-6 h-6" />
          Learners management
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Approve users so they can access courses. Only approved users can enroll.
        </p>

        {usersLoading ? (
          <p className="text-gray-500 text-sm mt-6">Loading…</p>
        ) : users.length === 0 ? (
          <p className="text-gray-500 text-sm mt-6">No registered users yet.</p>
        ) : (
          <ul className="space-y-3 mt-6">
            {users.map((u) => (
              <li
                key={u.id}
                className="flex flex-wrap items-center justify-between gap-2 py-3 border-b border-gray-100 last:border-0"
              >
                <div className="min-w-0">
                  <p className="font-medium text-gray-900">{u.name}</p>
                  <p className="text-sm text-gray-600">
                    {u.email}
                    {u.organization ? ` · ${u.organization}` : ""}
                  </p>
                  <p className="text-xs text-gray-500">
                    {u.approved ? (
                      <span className="text-green-600">Approved</span>
                    ) : (
                      <span className="text-amber-600">Pending approval</span>
                    )}
                  </p>
                </div>
                {!u.approved && (
                  <button
                    type="button"
                    onClick={() => approveMutation.mutate(u.id)}
                    disabled={approveMutation.isPending}
                    className="inline-flex items-center gap-1.5 bg-primary text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 disabled:opacity-60"
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
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
