// components/Identity.tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ParticleCluster from './ParticleCluster';

interface IdentityProps {
  name: string;
  description: string;
  color: string;
}

export default function Identity({
  name,
  description,
  contact_info,
  color,
}: IdentityProps) {
  return (
    <div className="w-full flex items-start space-x-8 py-18 px-8">
      {/* 1) Force this column to never shrink */}
      <div className="flex-shrink-0">
        <Canvas
          className="w-64 h-64"
          camera={{ position: [0, 0, 5], fov: 60 }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />

          <ParticleCluster count={400} radius={1.3} color={color} />

          <mesh>
            <boxGeometry args={[3, 3, 3]} />
            <meshBasicMaterial color="white" wireframe />
          </mesh>

          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      {/* 2) Allow this column to grow and always show text */}
      <div className="flex-1 max-w-1xl text-white">
        <h2 className="text-2xl font-bold">{name}</h2>
        <p className="mt-2 text-base">{description}</p>
        <p className="mt-2 text-base">{contact_info}</p>
      </div>
    </div>
  );
}
