import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const RainEffect: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Check if container is available
    if (!containerRef.current) return;

    // Set up scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create raindrop geometry (simple line segments)
    const raindrops: THREE.Line[] = [];
    const numRaindrops = 500; // Number of raindrops

    for (let i = 0; i < numRaindrops; i++) {
      const geometry = new THREE.BufferGeometry();
      const material = new THREE.LineBasicMaterial({ color: 0x00aaff });

      const positions = new Float32Array(2 * 3); // 2 points per line (x, y, z for each)
      positions[0] = Math.random() * 2 - 1; // Random x
      positions[1] = Math.random() * 2 - 1; // Random y (falling from different points)
      positions[2] = 0; // z is zero to simulate 2D
      positions[3] = positions[0];
      positions[4] = Math.random() * 2 - 1; // Random y (different falling position)
      positions[5] = 0;

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const line = new THREE.Line(geometry, material);
      raindrops.push(line);
      scene.add(line);
    }

    // Camera position (moving upwards to simulate rain falling)
    camera.position.z = 1;

    // Animation loop for smooth continuous rain for 24 hours (or indefinitely)
    const animate = () => {
      raindrops.forEach((raindrop) => {
        // Move raindrops downwards smoothly
        raindrop.position.y -= 0.01; // Speed of rain fall

        // Reset raindrop position to top once it goes out of view
        if (raindrop.position.y < -1) {
          raindrop.position.y = 1; // Reset to top to continue falling
        }
      });

      // Render the scene
      renderer.render(scene, camera);

      // Continue the animation, ensuring no stop (essentially a 24-hour effect)
      requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize
    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', onResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />;
};

export default RainEffect;
