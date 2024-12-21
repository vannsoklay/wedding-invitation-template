import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Stars } from '@react-three/drei'
import * as THREE from 'three'

export function WeddingBackground3D() {
  const sphereRef = useRef<THREE.Mesh>(null!)

  useFrame((_, delta) => {
    sphereRef.current.rotation.y += delta * 0.1
  })

  return (
    <>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Sphere ref={sphereRef} args={[1, 32, 32]} scale={[20, 20, 20]}>
        <meshBasicMaterial color="#ffcccb" wireframe />
      </Sphere>
    </>
  )
}

