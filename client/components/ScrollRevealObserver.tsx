import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const VIEW_MARGIN = "0px 0px -60px 0px"; // trigger when 60px from viewport bottom
const THRESHOLD = 0.05;

function observeReveals() {
  const els = document.querySelectorAll(".scroll-reveal");
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

    // Run soon for fast-rendered content
    timeouts.push(setTimeout(run, 50));
    // Run again after lazy route/content has had time to mount so all .scroll-reveal are observed
    timeouts.push(setTimeout(run, 350));
    timeouts.push(setTimeout(run, 700));

    return () => {
      timeouts.forEach((id) => clearTimeout(id));
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, [location.pathname]);

  return null;
}
