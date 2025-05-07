'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type Props = {
  starColor?: string;
  ringColor?: string;
};

export default function StarAndRadar({
  starColor = '#dddddd',
  ringColor = 'white',
}: Props) {
  const groupRef = useRef<THREE.Group>(null!);
  const starRef  = useRef<THREE.Mesh>(null!);
  const ringsRef = useRef<THREE.Group>(null!);

  const normalizedColor = useMemo(() => {
    try {
      return new THREE.Color(ringColor);
    } catch {
      console.warn('Invalid ringColor, falling back to white:', ringColor);
      return new THREE.Color('white');
    }
  }, [ringColor]);

  // Breathing + spins
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    groupRef.current.position.z = Math.sin(t * 0.3) * 0.3;
    groupRef.current.rotation.y = t * 0.2;
    starRef.current.rotation.z = t * 0.4;
    ringsRef.current.rotation.z = t * 0.6;
  });

  // 8‑point concave star shape
  const starShape = useMemo(() => {
    const outer  = 0.7;
    const diag   = 0.35;
    const valley = 0.2;
    const shape  = new THREE.Shape();
    const verts  = 16;
    const offset = Math.PI / 2;
    const step   = (2 * Math.PI) / verts;

    for (let i = 0; i < verts; i++) {
      const angle = offset - i * step;
      let radius: number;

      if (i % 4 === 0)       radius = outer;
      else if (i % 4 === 2)  radius = diag;
      else                   radius = valley;

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

  const radii = [1, 1.5, 2, 2.5] as const;

  const lineLength = 3;
  const linePoints = useMemo(
    () => [
      [ new THREE.Vector3(0, 0.7, 0),  new THREE.Vector3(0, lineLength, 0) ],
      [ new THREE.Vector3(0.7, 0, 0),  new THREE.Vector3(lineLength, 0, 0) ],
      [ new THREE.Vector3(0, -0.7, 0), new THREE.Vector3(0, -lineLength, 0) ],
      [ new THREE.Vector3(-0.7, 0, 0), new THREE.Vector3(-lineLength, 0, 0) ],
    ],
    []
  );

  return (
    <group ref={groupRef} scale={0.8}>
      <mesh ref={starRef}>
        <extrudeGeometry
          args={[starShape, { depth: 0.2, bevelEnabled: false }]}
        />
        <meshStandardMaterial
          color={starColor}
          metalness={0.5}
          roughness={0.4}
        />
      </mesh>

      <group ref={ringsRef}>
        {radii.map((r) => (
          <mesh key={r}>
            <torusGeometry args={[r, 0.02, 16, 100]} />
            <meshStandardMaterial color={ringColor} />
          </mesh>
        ))}
      </group>

      <group>
        {linePoints.map((pts, i) => (
          <line key={i}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[
                  new Float32Array(pts.flatMap(p => [p.x, p.y, p.z])),
                  3
                ]}
              />
            </bufferGeometry>
            <lineDashedMaterial
              color={normalizedColor}
              dashSize={1.5}
              gapSize={0.1}
              scale={1}
            />
          </line>
        ))}
      </group>
    </group>
  );
}
