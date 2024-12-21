import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cone, Sphere, MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

const NUM_PARTICLES = 50;

export function EnhancedBackground3D() {
  const particlesRef = useRef<THREE.Group>(null!);
  const butterflyRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    // Rotate the entire particle group
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.05;
      particlesRef.current.rotation.x += delta * 0.025;
    }

    // Butterfly movement logic
    if (butterflyRef.current) {
      butterflyRef.current.position.x = Math.sin(state.clock.elapsedTime) * 5;
      butterflyRef.current.position.y = Math.cos(state.clock.elapsedTime * 2) * 2;
      butterflyRef.current.rotation.y = state.clock.elapsedTime * 2;
    }
  });

  return (
    <group>
      {/* Rotating Flowers */}
      <group ref={particlesRef}>
        {Array.from({ length: NUM_PARTICLES }).map((_, index) => {
          const position = new THREE.Vector3(
            Math.random() * 20 - 10,
            Math.random() * 20 - 10,
            Math.random() * 20 - 10
          );
          const scale = Math.random() * 0.2 + 0.1;
          const speed = Math.random() * 0.02 + 0.01;

          return (
            <group key={index} position={position} scale={scale}>
              {/* Flower Petals */}
              <Cone args={[0.2, 0.5, 16]} rotation={[Math.PI, 0, 0]} position={[0, -0.25, 0]}>
                <meshStandardMaterial color="#ff69b4" />
              </Cone>
              <Cone args={[0.2, 0.5, 16]} rotation={[-Math.PI / 2, 0, 0]} position={[0.25, 0, 0]}>
                <meshStandardMaterial color="#ff69b4" />
              </Cone>
              <Cone args={[0.2, 0.5, 16]} rotation={[Math.PI / 2, 0, 0]} position={[-0.25, 0, 0]}>
                <meshStandardMaterial color="#ff69b4" />
              </Cone>
              <Cone args={[0.2, 0.5, 16]} rotation={[0, 0, 0]} position={[0, 0.25, 0]}>
                <meshStandardMaterial color="#ff69b4" />
              </Cone>
              {/* Flower Center */}
              <Sphere args={[0.15, 16, 16]}>
                <meshStandardMaterial color="#ffd700" />
              </Sphere>
              <AnimateParticle speed={speed} />
            </group>
          );
        })}
      </group>

      {/* Butterfly */}
      <mesh ref={butterflyRef} scale={[0.5, 0.5, 0.5]}>
        <Cone args={[0.2, 0.5, 16]} position={[-0.2, 0, 0]} rotation={[Math.PI / 2, 0, Math.PI / 4]}>
          <MeshWobbleMaterial color="#00bfff" factor={1} speed={5} />
        </Cone>
        <Cone args={[0.2, 0.5, 16]} position={[0.2, 0, 0]} rotation={[Math.PI / 2, 0, -Math.PI / 4]}>
          <MeshWobbleMaterial color="#00bfff" factor={1} speed={5} />
        </Cone>
        <Sphere args={[0.1, 16, 16]} position={[0, -0.2, 0]}>
          <meshStandardMaterial color="#000" />
        </Sphere>
      </mesh>
    </group>
  );
}

function AnimateParticle({ speed }: { speed: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * speed) * 2;
      meshRef.current.rotation.x += delta * speed;
      meshRef.current.rotation.z += delta * speed;
    }
  });

  return <mesh ref={meshRef} />;
}
