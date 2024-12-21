import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, useTexture } from '@react-three/drei'
import * as THREE from 'three'

interface ImageGallery3DProps {
    images: { src: string; alt: string }[]
}

export function ImageGallery3D({ images }: ImageGallery3DProps) {
    const groupRef = useRef<THREE.Group>(null!)
    const [loadedTextures, setLoadedTextures] = useState<THREE.Texture[]>([])

    // Load all textures
    const textures = useTexture(images.map(img => img.src))

    // Update state when textures are loaded
    React.useEffect(() => {
        if (Array.isArray(textures)) {
            setLoadedTextures(textures)
        } else {
            setLoadedTextures([textures])
        }
    }, [textures])

    useFrame((_, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.1
        }
    })

    return (
        <group ref={groupRef}>
            {loadedTextures.map((texture, index) => {
                const angle = (index / images.length) * Math.PI * 2
                const x = Math.cos(angle) * 3
                const z = Math.sin(angle) * 3

                return (
                    <Sphere key={index} args={[0.5, 32, 32]} position={[x, 0, z]}>
                        <meshStandardMaterial map={texture} />
                    </Sphere>
                )
            })}
        </group>
    )
}

