import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/* Trigger when element is within ~100px of viewport (animations run as you scroll up or down) */
const VIEW_MARGIN = "0px 0px 100px 0px";
const THRESHOLD = 0.05;

function observeReveals() {
  const els = document.querySelectorAll(".scroll-reveal, .section-reveal");
  if (els.length === 0) return null;

  const observer = new IntersectionObserver(
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

  els.forEach((el) => observer.observe(el));
  return observer;
}

export function ScrollRevealObserver() {
  const location = useLocation();
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const run = () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
      observerRef.current = observeReveals();
    };

    run();
    timeouts.push(setTimeout(run, 100));
    timeouts.push(setTimeout(run, 400));
    timeouts.push(setTimeout(run, 900));

    const onResize = () => run();
    window.addEventListener("resize", onResize);

    return () => {
      timeouts.forEach((id) => clearTimeout(id));
      window.removeEventListener("resize", onResize);
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, [location.pathname]);

  return null;
}
