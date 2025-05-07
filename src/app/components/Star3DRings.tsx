'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type Props = {
  starColor?: string;
  ringColor?: string;
  showTicks?: boolean;
  scale?: number;
};

export default function StarWith3DRings({
  starColor = '#dddddd',
  ringColor = 'white',
  showTicks = false,
  scale = 0.8,
}: Props) {
  const groupRef = useRef<THREE.Group>(null!);
  const starRef  = useRef<THREE.Mesh>(null!);
  const ringRefs = useRef<THREE.Mesh[]>([]);

  // Star shape
  const starShape = useMemo(() => {
    const shape  = new THREE.Shape();
    const outer  = 0.7, diag = 0.35, valley = 0.2;
    const verts  = 16;
    const offset = Math.PI / 2;
    const step   = (2 * Math.PI) / verts;

    for (let i = 0; i < verts; i++) {
      const angle = offset - i * step;
      const radius = i % 4 === 0
        ? outer
        : i % 4 === 2
          ? diag
          : valley;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      if (i === 0) {
        shape.moveTo(x, y);
      } else {
        shape.lineTo(x, y);
      }
    }

    shape.closePath();
    return shape;
  }, []);

  // Radii
  const radii = [1, 1.5, 2, 2.5] as const;

  // Speeds per ring
  const speeds = useMemo(() => {
    return radii.map((_, i) => ({
      x: 0.3 + i * 0.1,
      y: 0.5 + i * 0.05,
      z: 0.4 + i * 0.08,
    }));
  }, [radii]);

  // Animation
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // group breathing & rotation
    groupRef.current.position.z = Math.sin(t * 0.3) * 0.3;
    groupRef.current.rotation.y = t * 0.2;

    // star wobble
    starRef.current.rotation.z = t * 0.4;

    // rings individual spin
    ringRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const s = speeds[i];
      mesh.rotation.x = t * s.x;
      mesh.rotation.y = t * s.y;
      mesh.rotation.z = t * s.z;
    });
  });

  // Optional tick angles
  const tickAngles = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2] as const;

  return (
    <group ref={groupRef} scale={scale}>
      {/* Star */}
      <mesh ref={starRef}>
        <extrudeGeometry args={[starShape, { depth: 0.2, bevelEnabled: false }]} />
        <meshStandardMaterial color={starColor} metalness={0.5} roughness={0.4} />
      </mesh>

      {/* Rings */}
      {radii.map((r, idx) => (
        <mesh
          key={`ring-${r}`}
          ref={el => { ringRefs.current[idx] = el!; }}
        >
          <torusGeometry args={[r, 0.02, 16, 100]} />
          <meshStandardMaterial color={ringColor} />
        </mesh>
      ))}

      {/* Optional ticks */}
      {showTicks && (
        <group>
          {radii.map(r =>
            tickAngles.map((rot, i) => (
              <mesh
                key={`tick-${r}-${i}`}
                position={[
                  Math.cos(rot) * r,
                  Math.sin(rot) * r,
                  0,
                ]}
                rotation={[0, 0, rot]}
              >
                <boxGeometry args={[0.02, 0.1, 0.02]} />
                <meshBasicMaterial color={ringColor} />
              </mesh>
            ))
          )}
        </group>
      )}
    </group>
  );
}
