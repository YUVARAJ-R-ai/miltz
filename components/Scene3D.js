'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { Suspense } from 'react';

function PopcornBucket() {
  return (
    <group>
      {/* Placeholder Bucket */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1, 0.8, 2.5, 32]} />
        <meshStandardMaterial color="#C62828" />
      </mesh>
      {/* Placeholder Popcorn */}
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[1.1, 32, 32]} />
        <meshStandardMaterial color="#FFC107" roughness={0.8} />
      </mesh>
    </group>
  );
}

export default function Scene3D() {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <Stage environment="city" intensity={0.6}>
            <PopcornBucket />
          </Stage>
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
        </Suspense>
      </Canvas>
    </div>
  );
}
