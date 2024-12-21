// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';

// interface RomanticFlowerProps {
//   x: number;
//   y: number;
// }

// const RomanticFlower: React.FC<RomanticFlowerProps> = ({ x, y }) => {
//   const [isOpen, setIsOpen] = useState(true);

//   const petalVariants = {
//     closed: { scale: 0, rotate: 0 },
//     open: { scale: 1, rotate: 360, transition: { duration: 0.2 } },
//   };

//   const colors = ['#FFB3BA', '#BAFFC9', '#BAE1FF', '#FFFFBA'];

//   return (
//     <motion.g
//       initial={{ opacity: 0, y: -30 }}  // Start from above the screen
//       animate={{
//         opacity: 1,
//         y: 100, // Fall down to 100px
//         scale: 1,
//         transition: { duration: 2, ease: 'easeInOut' }
//       }}
//     >
//       {colors.map((color, index) => (
//         <motion.path
//           key={index}
//           d="M0,-15 C5,-5 15,-5 15,0 C15,5 5,15 0,15 C-5,15 -15,5 -15,0 C-15,-5 -5,-15 0,-15"
//           fill={color}
//           initial="closed"
//           animate={isOpen ? 'open' : 'closed'}
//           variants={petalVariants}
//           style={{
//             originX: '0px',
//             originY: '0px',
//             rotate: index * 10,
//           }}
//           transform={`translate(${x}, ${y})`}
//         />
//       ))}
//       <motion.circle
//         cx={x}
//         cy={y}
//         r={3}
//         fill="#FFD700"
//         initial={{ scale: 0 }}
//         animate={{ scale: isOpen ? 1 : 0 }}
//         transition={{ delay: 0.5, duration: 0.5 }}
//       />
//     </motion.g>
//   );
// };

// export const RomanticFlowerRainBackground: React.FC = () => {
//   const flowers = React.useMemo(() => {
//     return Array.from({ length: 20 }, () => ({
//       x: Math.random() * 100,  // Random horizontal position
//       y: Math.random() * -50,  // Start above the screen (randomly)
//     }));
//   }, []);

//   return (
//     <svg
//       width="100%"
//       height="100%"
//       viewBox="0 0 100 100"
//       preserveAspectRatio="xMidYMid slice"
//       style={{
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         width: '100%',
//         height: '100%',
//         zIndex: -1,
//         pointerEvents: 'none',
//         background: 'linear-gradient(45deg, #f3e5f5, #ffebf1)', // Soft romantic background
//       }}
//     >
//       {flowers.map((flower, index) => (
//         <motion.g
//           key={index}
//           initial={{ y: flower.y, opacity: 0 }}
//           animate={{
//             y: flower.y + 30,  // Drop down to a certain point
//             opacity: 1,
//             transition: {
//               duration: 2,
//               ease: 'easeInOut',
//               delay: Math.random() * 2, // Random delay for each flower to start
//             }
//           }}
//         >
//           <motion.g
//             initial={{ x: flower.x, y: flower.y, scale: 0.8 }}
//             animate={{
//               x: flower.x + (Math.random() * 30 - 15), // Spread out randomly in X
//               y: flower.y + 50, // Drop further down for separation effect
//               scale: 1.2, // Slightly increase scale
//               opacity: 1,
//               transition: {
//                 delay: 2,
//                 duration: 2,
//                 ease: 'easeInOut',
//               }
//             }}
//           >
//             <RomanticFlower x={flower.x} y={flower.y} />
//           </motion.g>
//         </motion.g>
//       ))}
//     </svg>
//   );
// };


import React, { useEffect, useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Vector3, Group } from 'three';
// import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

// Type definitions
interface ButterflyModelProps {
  initialPosition: Vector3;
}

interface Butterfly {
  position: Vector3;
  id: number;
}

// Type for GLTF result
// interface GLTFResult extends GLTF {
//   nodes: {
//     [key: string]: Object3D;
//   };
//   materials: {
//     [key: string]: Material;
//   };
// }

const ButterflyModel: React.FC<ButterflyModelProps> = ({ initialPosition }) => {
  const { scene } = useGLTF('/models/animated_butterfly.glb') as any;
  const butterflyRef = useRef<Group>();
  const time = useRef<number>(Math.random() * 100);
  const initialX = initialPosition.x;
  
  useFrame((_, delta) => {
    if (!butterflyRef.current) return;
    
    time.current += delta;
    
    // Fluttering wing animation
    const wingFlutter = Math.sin(time.current * 15) * 0.2;
    butterflyRef.current.rotation.z = wingFlutter;
    
    // Sinusoidal floating movement
    const floatY = Math.sin(time.current * 2) * 0.5;
    const floatX = Math.sin(time.current) * 2;
    
    // Update position with floating effect
    butterflyRef.current.position.y += 0.02;
    butterflyRef.current.position.x = initialX + floatX;
    butterflyRef.current.position.y += floatY * delta;
    
    // Reset position when butterfly goes too high
    if (butterflyRef.current.position.y > 15) {
      butterflyRef.current.position.y = -15;
    }
  });

  return (
    <primitive 
      ref={butterflyRef}
      object={scene.clone()} 
      scale={0.5}
      position={initialPosition}
    />
  );
};

const ButterflyRainEffect: React.FC = () => {
  const [butterflies, setButterflies] = useState<Butterfly[]>([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setButterflies(prev => {
        if (prev.length > 50) return prev;
        return [...prev, {
          position: new Vector3(
            Math.random() * 30 - 15,
            -15,
            Math.random() * 30 - 15
          ),
          id: Date.now()
        }];
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-full">
      <Canvas 
        camera={{ position: [0, 0, 30], fov: 60 }}
        className="bg-gradient-to-b from-blue-200 to-pink-200"
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <directionalLight position={[-5, 5, 5]} intensity={0.5} />
        
        {butterflies.map(butterfly => (
          <ButterflyModel 
            key={butterfly.id}
            initialPosition={butterfly.position}
          />
        ))}
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
};

// Preload the model
useGLTF.preload('/models/animated_butterfly.glb');

export default ButterflyRainEffect;