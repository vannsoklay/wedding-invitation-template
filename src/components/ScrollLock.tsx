import { useEffect } from 'react';

interface ScrollLockProps {
  isLocked: boolean;
}

export const ScrollLock: React.FC<ScrollLockProps> = ({ isLocked }) => {
  useEffect(() => {
    if (isLocked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLocked]);

  return null;
}
