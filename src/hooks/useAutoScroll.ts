import { RefObject, useCallback } from 'react';

interface UseAutoScrollProps {
  targetRef: RefObject<HTMLElement>;
  options?: ScrollIntoViewOptions;
}

export const useAutoScroll = ({ targetRef, options = { behavior: 'smooth', block: 'start' } }: UseAutoScrollProps) => {
  const scrollToTarget = useCallback(() => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView(options);
    }
  }, [targetRef, options]);

  return scrollToTarget;
};
