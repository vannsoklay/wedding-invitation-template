import { RefObject, useEffect, useState } from 'react';

interface UseScrollSnapProps {
  sectionRefs: RefObject<HTMLElement>[];
  onSectionChange?: (index: number) => void;
}

export const useScrollSnap = ({ sectionRefs, onSectionChange }: UseScrollSnapProps) => {
  const [activeSection, setActiveSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.findIndex(ref => ref.current === entry.target);
            setActiveSection(index);
            onSectionChange?.(index);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '0px'
      }
    );

    sectionRefs.forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, [sectionRefs, onSectionChange]);

  const scrollToSection = (index: number) => {
    if (isScrolling || !sectionRefs[index]?.current) return;

    setIsScrolling(true);
    sectionRefs[index].current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    // Reset scrolling state after animation
    setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  };

  return {
    activeSection,
    isScrolling,
    scrollToSection
  };
};