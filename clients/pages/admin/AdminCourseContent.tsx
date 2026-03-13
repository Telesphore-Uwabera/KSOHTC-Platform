import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { BookOpen, ChevronRight, FolderOpen, Loader2, Zap, FileX2 } from "lucide-react";
import type { CourseDoc } from "@shared/api";
import { getApiBase } from "@/lib/apiBase";

const SEED_SECRET_STORAGE_KEY = "admin_seed_secret";

function getStoredSeedSecret(): string {
  if (typeof localStorage === "undefined") return "";
  return localStorage.getItem(SEED_SECRET_STORAGE_KEY) ?? "";
}

async function fetchCourseContent(): Promise<CourseDoc[]> {
  const res = await fetch(getApiBase() + "/api/course-content/courses");
  if (!res.ok) throw new Error("Failed to load courses");
  const data = await res.json();
  return (data as { courses: CourseDoc[] }).courses ?? [];
}

interface CourseFromPublic {
  id: string;
  title: string;
  sector: string;
  duration: string;
  lessonCount?: number;
}

async function fetchCoursesFromPublic(): Promise<CourseFromPublic[]> {
  const res = await fetch(getApiBase() + "/api/course-content/courses-from-public");
  if (!res.ok) return [];
  const data = await res.json();
  return (data as { courses: CourseFromPublic[] }).courses ?? [];
}

export default function AdminCourseContent() {
  const queryClient = useQueryClient();
  const [seedSecret, setSeedSecret] = useState(() => getStoredSeedSecret());
  const [seedError, setSeedError] = useState("");
  const [seedSuccess, setSeedSuccess] = useState("");

  const { data: courses = [], isLoading } = useQuery({
    queryKey: ["course-content", "courses"],
    queryFn: fetchCourseContent,
  });

  const { data: coursesFromPublic = [] } = useQuery({
    queryKey: ["course-content", "courses-from-public"],
    queryFn: fetchCoursesFromPublic,
  });

  const firestoreIds = new Set(courses.map((c) => c.id));
  const missingFromPublic = coursesFromPublic.filter((p) => !firestoreIds.has(p.id));

  const [seeding, setSeeding] = useState(false);
  const [cleaningPdfs, setCleaningPdfs] = useState(false);
  const [cleanPdfsResult, setCleanPdfsResult] = useState<{
    deleted: number;
    renamed: number;
    details: string[];
    numberRenamed?: number;
    numberDetails?: string[];
    dryRun: boolean;
  } | null>(null);
  const [cleanPdfsError, setCleanPdfsError] = useState("");

  async function runCleanPdfs(dryRun: boolean) {
    setCleanPdfsError("");
    setCleanPdfsResult(null);
    setCleaningPdfs(true);
    try {
      const res = await fetch(getApiBase() + "/api/admin/clean-course-pdfs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dryRun, seedSecret: seedSecret || undefined }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setCleanPdfsError((data as { error?: string }).error ?? "Clean failed.");
        return;
      }
      setCleanPdfsResult({
        deleted: (data as { deleted?: number }).deleted ?? 0,
        renamed: (data as { renamed?: number }).renamed ?? 0,
        details: (data as { details?: string[] }).details ?? [],
        numberRenamed: (data as { numberRenamed?: number }).numberRenamed,
        numberDetails: (data as { numberDetails?: string[] }).numberDetails,
        dryRun: (data as { dryRun?: boolean }).dryRun ?? false,
      });
      queryClient.invalidateQueries({ queryKey: ["course-content", "courses-from-public"] });
    } catch (e) {
      setCleanPdfsError(e instanceof Error ? e.message : "Clean failed.");
    } finally {
      setCleaningPdfs(false);
    }
  }

  async function runSeed() {
    setSeedError("");
    setSeedSuccess("");
    setSeeding(true);
    try {
      const res = await fetch(getApiBase() + "/api/admin/seed-courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ seedSecret: seedSecret || undefined }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setSeedError((data as { error?: string }).error ?? "Seed failed.");
        return;
      }
      const created = (data as { created?: string[] }).created ?? [];
      setSeedSuccess(created.length ? `Created ${created.length} course(s): ${created.join(", ")}. They appear below.` : "No new courses (all already exist).");
      if (seedSecret.trim()) {
        try {
          localStorage.setItem(SEED_SECRET_STORAGE_KEY, seedSecret.trim());
        } catch {
          // ignore quota or private mode
        }
      }
      queryClient.invalidateQueries({ queryKey: ["course-content", "courses"] });
      queryClient.invalidateQueries({ queryKey: ["course-content", "courses-from-public"] });
    } catch (e) {
      setSeedError(e instanceof Error ? e.message : "Seed failed.");
    } finally {
      setSeeding(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-[30px] shadow-sm border border-gray-200 p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-primary flex items-center gap-2 mb-2">
          <FolderOpen className="w-6 h-6" />
          Course content
        </h1>
        <p className="text-gray-600 text-sm mb-6">
          This is where you manage course structure: modules, lessons (PDFs, YouTube, text), and break quizzes. Once courses exist, you’ll see them below and can edit each one.
        </p>
        {isLoading ? (
          <p className="text-gray-500 text-sm">Loading…</p>
        ) : courses.length === 0 ? (
          <div className="space-y-4">
            <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-5 text-amber-900">
              <p className="font-medium mb-2">No courses yet</p>
              <p className="text-sm text-amber-800/90 mb-3">
                Courses are created from the PDFs in{" "}
                <code className="bg-amber-100 px-1 rounded text-xs">public/courses</code> (construction, industrial-safety, mining). The seed creates those courses plus safety-management and safety-for-all in Firestore so they appear on the Courses page.
              </p>
              <p className="text-xs text-amber-700">
                Run the seed once below, or from the project root:{" "}
                <code className="bg-amber-100 px-2 py-1 rounded font-mono text-xs">pnpm run seed:courses</code>
              </p>
            </div>
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-5">
              <p className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                Seed courses now
              </p>
              <p className="text-sm text-gray-600 mb-3">
                This will create courses in Firestore from your <code className="bg-white px-1 rounded text-xs">public/courses</code> PDFs. If you set <code className="bg-white px-1 rounded text-xs">ADMIN_SEED_SECRET</code> on the server, enter it below.
              </p>
              <input
                type="password"
                value={seedSecret}
                onChange={(e) => setSeedSecret(e.target.value)}
                placeholder="Seed secret (if required by server)"
                className="w-full max-w-xs px-3 py-2 rounded-lg border border-gray-200 mb-3"
              />
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={runSeed}
                  disabled={seeding}
                  className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-60"
                >
                  {seeding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                  {seeding ? "Seeding…" : "Run seed"}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Secret is saved in this browser after a successful run so you can just click Run next time.
              </p>
              {seedError && <p className="text-sm text-red-600 mt-2">{seedError}</p>}
              {seedSuccess && <p className="text-sm text-green-700 mt-2">{seedSuccess}</p>}
            </div>
          </div>
        ) : (
          <>
            <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-5 mb-6">
              <p className="font-medium text-gray-900 mb-1 flex items-center gap-2">
                <FileX2 className="w-4 h-4 text-primary" />
                Clean duplicate PDFs
              </p>
              <p className="text-sm text-gray-600 mb-3">
                Removes duplicate &quot;Copy&quot; PDFs in <code className="bg-white px-1 rounded text-xs">public/courses</code> and renames to clean filenames.
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => runCleanPdfs(true)}
                  disabled={cleaningPdfs}
                  className="inline-flex items-center gap-2 border border-primary text-primary px-4 py-2 rounded-lg font-semibold hover:bg-primary/5 disabled:opacity-60"
                >
                  {cleaningPdfs ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileX2 className="w-4 h-4" />}
                  Preview (dry run)
                </button>
                <button
                  type="button"
                  onClick={() => runCleanPdfs(false)}
                  disabled={cleaningPdfs}
                  className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-60"
                >
                  {cleaningPdfs ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileX2 className="w-4 h-4" />}
                  Clean duplicate PDFs
                </button>
              </div>
              {cleanPdfsError && <p className="text-sm text-red-600 mt-2">{cleanPdfsError}</p>}
              {cleanPdfsResult && (
                <div className="mt-3 text-sm text-gray-700">
                  <p className="font-medium">
                    {cleanPdfsResult.dryRun ? "Preview: " : ""}
                    Clean: Renamed {cleanPdfsResult.renamed}, Deleted {cleanPdfsResult.deleted}
                    {(cleanPdfsResult.numberRenamed ?? 0) > 0 && (
                      <> · Numbered: {cleanPdfsResult.numberRenamed} unnumbered PDFs (24, 25, …)</>
                    )}
                  </p>
                  {cleanPdfsResult.details.length > 0 && (
                    <ul className="mt-1 list-disc list-inside text-gray-600">
                      {cleanPdfsResult.details.slice(0, 20).map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                      {cleanPdfsResult.details.length > 20 && (
                        <li>… and {cleanPdfsResult.details.length - 20} more</li>
                      )}
                    </ul>
                  )}
                  {(cleanPdfsResult.numberDetails?.length ?? 0) > 0 && (
                    <ul className="mt-1 list-disc list-inside text-gray-600">
                      {cleanPdfsResult.numberDetails!.slice(0, 15).map((d, i) => (
                        <li key={`n-${i}`}>{d}</li>
                      ))}
                      {cleanPdfsResult.numberDetails!.length > 15 && (
                        <li>… and {cleanPdfsResult.numberDetails!.length - 15} more</li>
                      )}
                    </ul>
                  )}
                </div>
              )}
            </div>
            {missingFromPublic.length > 0 && (
              <div className="rounded-xl border border-primary/30 bg-primary/5 p-5 mb-6">
                <p className="font-medium text-gray-900 mb-1">
                  {missingFromPublic.length} more course{missingFromPublic.length !== 1 ? "s" : ""} available
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  From <code className="bg-white/80 px-1 rounded text-xs">public/courses</code>:{" "}
                  {missingFromPublic.map((c) => c.title).join(", ")}. Add them to Firestore so they appear here and on the Courses page.
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <input
                    type="password"
                    value={seedSecret}
                    onChange={(e) => setSeedSecret(e.target.value)}
                    placeholder="Seed secret (if required)"
                    className="w-full max-w-xs px-3 py-2 rounded-lg border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={runSeed}
                    disabled={seeding}
                    className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-60"
                  >
                    {seeding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                    {seeding ? "Adding…" : "Add missing courses"}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Secret is saved in this browser after a successful run so you can just click Run next time.
                </p>
                {seedError && <p className="text-sm text-red-600 mt-2">{seedError}</p>}
                {seedSuccess && <p className="text-sm text-green-700 mt-2">{seedSuccess}</p>}
              </div>
            )}
            <ul className="space-y-2">
            {courses.map((c) => (
              <li key={c.id}>
                <Link
                  to={`/admin/course-content/${c.id}`}
                  className="flex items-center justify-between gap-3 p-4 rounded-2xl border border-gray-200 hover:border-primary/40 hover:bg-gray-50/50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 group-hover:text-primary">{c.title}</p>
                      <p className="text-sm text-gray-500">{c.sector} · {c.duration}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary" />
                </Link>
              </li>
            ))}
          </ul>
          </>
        )}
      </div>
    </div>
  );
}
