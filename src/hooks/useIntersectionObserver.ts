// hooks/useIntersectionObserver.ts

import { RefObject, useEffect } from 'react';

interface UseIntersectionObserverProps {
  refs: RefObject<HTMLElement>[];
  onIntersect: (index: number) => void;
  threshold?: number;
}

export const useIntersectionObserver = ({
  refs,
  onIntersect,
  threshold = 0.5
}: UseIntersectionObserverProps): void => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = refs.findIndex(ref => ref.current === entry.target);
            onIntersect(index);
          }
        });
      },
      { threshold }
    );

    refs.forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, [refs, onIntersect, threshold]);
};
