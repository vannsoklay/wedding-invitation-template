import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SurpriseFlowerProps {
  x: number;
  y: number;
}

const SurpriseFlower: React.FC<SurpriseFlowerProps> = ({ x, y }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, Math.random() * 5000 + 1000);

    return () => clearTimeout(timer);
  }, []);

  const petalVariants = {
    closed: { scale: 0, rotate: 0 },
    open: { scale: 1, rotate: 360, transition: { duration: 1 } },
  };

  const colors = ['#FFB3BA', '#BAFFC9', '#BAE1FF', '#FFFFBA'];

  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {colors.map((color, index) => (
        <motion.path
          key={index}
          d="M0,-15 C5,-5 15,-5 15,0 C15,5 5,15 0,15 C-5,15 -15,5 -15,0 C-15,-5 -5,-15 0,-15"
          fill={color}
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={petalVariants}
          style={{
            originX: '0px',
            originY: '0px',
            rotate: index * 90,
          }}
          transform={`translate(${x}, ${y})`}
        />
      ))}
      <motion.circle
        cx={x}
        cy={y}
        r={3}
        fill="#FFD700"
        initial={{ scale: 0 }}
        animate={{ scale: isOpen ? 1 : 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      />
    </motion.g>
  );
};

export const SurpriseFlowers: React.FC = () => {
  const flowers = React.useMemo(() => {
    return Array.from({ length: 10 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
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
        pointerEvents: 'none',
      }}
    >
      {flowers.map((flower, index) => (
        <SurpriseFlower key={index} {...flower} />
      ))}
    </svg>
  );
};

