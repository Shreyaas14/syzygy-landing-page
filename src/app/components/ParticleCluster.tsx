// components/ParticleCluster.tsx
'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleClusterProps {
  count?: number;
  radius?: number;
  colors?: string[];       
  defaultColor?: string;
}

export default function ParticleCluster({
  count = 300,
  radius = 1.5,
  colors,
  defaultColor = 'white',
}: ParticleClusterProps) {
  const groupRef = useRef<THREE.Group>(null!);

  // 1) Positions as before
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const u     = Math.random();
      const v     = Math.random();
      const theta = 2 * Math.PI * u;
      const phi   = Math.acos(2 * v - 1);
      const r     = radius * Math.cbrt(Math.random());
      arr[3 * i]     = r * Math.sin(phi) * Math.cos(theta);
      arr[3 * i + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[3 * i + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count, radius]);

  // 2) Colors buffer
  const colorArray = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const hex = (colors && colors[i]) || defaultColor;
      const col = new THREE.Color(hex);
      arr[3 * i]     = col.r;
      arr[3 * i + 1] = col.g;
      arr[3 * i + 2] = col.b;
    }
    return arr;
  }, [count, colors, defaultColor]);

  // Spin the whole cluster
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.1;
    groupRef.current.rotation.x = t * 0.05;
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={positions}
            count={count}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            array={colorArray}
            count={count}
            itemSize={3}
          />
        </bufferGeometry>

        {/* vertexColors tells Three.js to read from the "color" attribute */}
        <pointsMaterial
          vertexColors
          size={0.05}
          sizeAttenuation
          transparent
          opacity={0.8}
        />
      </points>
    </group>
  );
}
