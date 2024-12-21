import { Section } from "../types";

// components/NavigationDots.tsx
interface NavigationDotsProps {
  sections: Section[];
  currentSection: number;
  onNavigate: (index: number) => void;
}

export const NavigationDots: React.FC<NavigationDotsProps> = ({
  sections,
  currentSection,
  onNavigate
}) => (
  <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 space-y-4">
    {sections.map((section, index) => (
      <button
        key={section.id}
        onClick={() => onNavigate(index)}
        className={`rounded-full transition-all duration-300 ${
          currentSection === index ? 'bg-red-600 scale-125' : 'bg-gray-300 hover:bg-red-400'
        }`}
        aria-label={section.title}
      />
    ))}
  </div>
);
