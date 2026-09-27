import { useLayoutEffect, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useLayoutEffect(() => {
    // Disable smooth scroll temporarily so browser doesn't animate from previous page bottom to top
    const htmlEl = document.documentElement;
    const originalScrollBehavior = htmlEl.style.scrollBehavior;
    htmlEl.style.scrollBehavior = 'auto';

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    htmlEl.scrollTop = 0;
    document.body.scrollTop = 0;

    const rafId = requestAnimationFrame(() => {
      htmlEl.style.scrollBehavior = originalScrollBehavior;
    });

    return () => cancelAnimationFrame(rafId);
  }, [pathname, search]);

  return null;
};

