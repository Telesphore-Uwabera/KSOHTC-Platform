import { cn } from "@/lib/utils";

/** Thin top loading bar - show during route changes */
export function LoadingBar({ className }: { className?: string }) {
  return (
    <div
      role="progressbar"
      aria-valuetext="Loading"
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] h-1 bg-accent/90",
        "animate-loading-bar origin-left",
        className
      )}
    />
  );
}

/** Full-page fallback for Suspense (e.g. while lazy route loads) */
export function PageLoaderFallback({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-gray-50",
        className
      )}
    >
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
        <div
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin"
          style={{ animationDuration: "0.8s" }}
        />
      </div>
      <p className="text-sm font-medium text-gray-600">Loading...</p>
    </div>
  );
}
