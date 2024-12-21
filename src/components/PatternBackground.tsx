import { Canvas } from '@react-three/fiber';
// import bghero from '../assets/bg-02.svg';
import { Suspense } from 'react';
import { OrbitControls } from '@react-three/drei';
import { EnhancedBackground3D } from './EnhancedBackground3D';
import { Butterflies } from './Butterflies';

interface PatternBackgroundProps {
    opacity?: number;
    color?: string;
}

export const PatternBackground: React.FC<PatternBackgroundProps> = ({
    opacity = 0.7
}) => (
    <div className={`absolute inset-0`} style={{ opacity: opacity }}>
        <div
            className="absolute inset-0"
        //   style={{
        //     backgroundImage: `url(${bghero})`,
        //     backgroundSize: 'cover',
        //     backgroundRepeat: 'no-repeat',
        //     backgroundPosition: 'center',
        //     backgroundColor: color,
        //   }}
        >
            <Canvas className="absolute inset-0">
                <Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} />
                    <EnhancedBackground3D />
                    <Butterflies count={20} />
                    <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
                </Suspense>
            </Canvas>
        </div>
    </div>
);