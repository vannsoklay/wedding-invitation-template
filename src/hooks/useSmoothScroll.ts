import { useCallback, useState } from 'react';

interface UseSmoothScrollProps {
  duration?: number;
  easing?: (t: number) => number;
}

export const useSmoothScroll = ({ 
  duration = 1000,
  easing = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t 
}: UseSmoothScrollProps = {}) => {
  const [isScrolling, setIsScrolling] = useState(false);

  const scrollToElement = useCallback((element: HTMLElement) => {
    setIsScrolling(true);
    const start = window.pageYOffset;
    const target = element.getBoundingClientRect().top + start;
    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easing(progress);
      
      window.scrollTo({
        top: start + (target - start) * easedProgress,
      });

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setIsScrolling(false);
      }
    };

    requestAnimationFrame(step);
  }, [duration, easing]);

  return { scrollToElement, isScrolling };
};
