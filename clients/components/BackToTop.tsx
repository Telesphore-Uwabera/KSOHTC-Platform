import { ChevronUp } from "lucide-react";

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function BackToTop() {
  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="fixed bottom-8 right-6 sm:right-8 z-50 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
      aria-label="Back to top"
    >
      <ChevronUp className="w-8 h-8 sm:w-10 sm:h-10 animate-bounce-subtle" />
    </button>
  );
}
