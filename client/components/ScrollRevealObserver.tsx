import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const VIEW_MARGIN = "0px 0px -60px 0px"; // trigger when 60px from viewport bottom
const THRESHOLD = 0.05;

export function ScrollRevealObserver() {
  const location = useLocation();

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    const id = setTimeout(() => {
      const els = document.querySelectorAll(".scroll-reveal");
      if (els.length === 0) return;

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
            } else {
              entry.target.classList.remove("in-view");
            }
          });
        },
        { rootMargin: VIEW_MARGIN, threshold: THRESHOLD }
      );

      els.forEach((el) => observer!.observe(el));
    }, 100);
    return () => {
      clearTimeout(id);
      observer?.disconnect();
    };
  }, [location.pathname]);

  return null;
}
