import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cone, Sphere } from '@react-three/drei';
import * as THREE from 'three';

interface ButterfliesProps {
  count: number;
}

export const Butterflies: React.FC<ButterfliesProps> = ({ count }) => {
  const groupRef = useRef<THREE.Group>(null!);

  const butterflyPositions = Array.from({ length: count }).map(() => ({
    position: new THREE.Vector3(
      Math.random() * 20 - 10,
      Math.random() * 10 - 5,
      Math.random() * 20 - 10
    ),
    speed: Math.random() * 0.5 + 0.1,
  }));

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, index) => {
        const butterfly = child as THREE.Mesh;
        const data = butterflyPositions[index];
        butterfly.position.x += Math.sin(state.clock.elapsedTime * data.speed) * 0.02;
        butterfly.position.y += Math.cos(state.clock.elapsedTime * data.speed) * 0.02;
        butterfly.rotation.y = Math.sin(state.clock.elapsedTime * data.speed);
      });
    }
  });

  return (
    <group ref={groupRef}>
      {butterflyPositions.map((data, index) => (
        <group key={index} position={data.position}>
          {/* Butterfly Wings */}
          <Cone args={[0.3, 0.6, 16]} position={[-0.2, 0, 0]} rotation={[Math.PI / 2, 0, Math.PI / 4]}>
            <meshStandardMaterial color="#ff69b4" />
          </Cone>
          <Cone args={[0.3, 0.6, 16]} position={[0.2, 0, 0]} rotation={[Math.PI / 2, 0, -Math.PI / 4]}>
            <meshStandardMaterial color="#ff69b4" />
          </Cone>
          {/* Butterfly Body */}
          <Sphere args={[0.1, 16, 16]} position={[0, -0.2, 0]}>
            <meshStandardMaterial color="#000" />
          </Sphere>
        </group>
      ))}
    </group>
  );
};
