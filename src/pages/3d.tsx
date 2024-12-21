'use client'

import { Canvas } from '@react-three/fiber'
import { Environment, Stars, Text } from '@react-three/drei'
import { useRef } from 'react'
import { Vector3 } from 'three'

function Scene() {
  const textRef = useRef()

  return (
    <>
      <Environment preset="sunset" background blur={0.6} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <Text
        ref={textRef}
        position={new Vector3(0, 0, 0)}
        fontSize={1.5}
        color="#c4a747"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Geist-Bold.json"
        maxWidth={10}
        lineHeight={1.5}
      >
        Join Our Celebration
      </Text>
    </>
  )
}

export default function WeddingSection() {
  return (
    <div className="relative w-full h-screen">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <Scene />
      </Canvas>
      
      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white pointer-events-none">
        <div className="max-w-3xl px-6 py-12 text-center bg-black/30 backdrop-blur-sm rounded-xl">
          <h1 className="mb-6 text-5xl font-bold tracking-tight">
            Teddy & Olivia
          </h1>
          <p className="text-xl font-light">
            Together with their families invite you to their wedding celebration
          </p>
          <div className="mt-8 text-2xl font-medium">
            February 17, 2024 • 09:00 AM
          </div>
          <div className="mt-4 text-lg">
            123 Anywhere St., Any City, ST 12345
          </div>
        </div>
      </div>
    </div>
  )
}

