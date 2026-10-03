import { useLayoutEffect, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useLayoutEffect(() => {
    // If navigating to an in-page anchor hash, smoothly scroll to that specific element
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }

    // Instantly reset scroll to top without any animation or bottom flashing
    const instantScrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
      }
      if (document.body) {
        document.body.scrollTop = 0;
      }
    };

    // 1. Synchronous instant reset before paint
    instantScrollToTop();

    // 2. Microtask / frame reset for React rendering lifecycle
    const rafId = requestAnimationFrame(instantScrollToTop);

    // 3. Staggered zero-delay backup for async lazy Suspense components
    const t1 = setTimeout(instantScrollToTop, 10);
    const t2 = setTimeout(instantScrollToTop, 50);
    const t3 = setTimeout(instantScrollToTop, 150);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [pathname, search, hash]);

  return null;
};

