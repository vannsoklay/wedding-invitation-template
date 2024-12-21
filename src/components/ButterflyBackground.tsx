import React from 'react';

interface ButterflyProps {
  x: number;
  y: number;
  scale: number;
  rotation: number;
  color: string;
}

const Butterfly: React.FC<ButterflyProps> = ({ x, y, scale, rotation, color }) => (
  <g transform={`translate(${x}, ${y}) scale(${scale}) rotate(${rotation})`}>
    <path
      d="M0,0 C5,-5 10,-10 15,0 C20,-10 25,-5 30,0 C25,5 20,10 15,0 C10,10 5,5 0,0"
      fill={color}
    />
  </g>
);

export const ButterflyBackground: React.FC = () => {
  const butterflies = React.useMemo(() => {
    return Array.from({ length: 20 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: Math.random() * 0.5 + 0.5,
      rotation: Math.random() * 360,
      color: `hsl(${Math.random() * 60 + 300}, 100%, 75%)`,
    }));
  }, []);

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
      }}
    >
      <defs>
        <radialGradient id="bg-gradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#ffe6e6" />
          <stop offset="100%" stopColor="#ffcccc" />
        </radialGradient>
      </defs>
      <rect width="100" height="100" fill="url(#bg-gradient)" />
      {butterflies.map((butterfly, index) => (
        <Butterfly key={index} {...butterfly} />
      ))}
    </svg>
  );
};

