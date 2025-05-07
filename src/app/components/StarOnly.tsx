'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function StarAndRadar({ starColor = '#dddddd' }) {
  const groupRef = useRef<THREE.Group>(null!);
  const starRef = useRef<THREE.Mesh>(null!);

  // Breathing + spins
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    groupRef.current.position.z = Math.sin(t * 0.3) * 0.3;
    groupRef.current.rotation.y = t * 0.2;
    starRef.current.rotation.z = t * 0.4;
  });

  // Your 8-point concave star shape
  const starShape = useMemo(() => {
    const outer = 0.7,
      diag = 0.35,
      valley = 0.2;
    const shape = new THREE.Shape();
    const verts = 16;
    const offset = Math.PI / 2;
    const step = (2 * Math.PI) / verts;
    for (let i = 0; i < verts; i++) {
      const angle = offset - i * step;
      const radius =
        i % 4 === 0 ? outer :
        i % 4 === 2 ? diag :
        valley;
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

  return (
    <group ref={groupRef} scale={2}>
      <mesh ref={starRef}>
        <extrudeGeometry args={[starShape, { depth: 0.2, bevelEnabled: false }]} />
        <meshStandardMaterial color={starColor} metalness={0.5} roughness={0.4}/>
      </mesh>
    </group>
  );
}

export default StarAndRadar;