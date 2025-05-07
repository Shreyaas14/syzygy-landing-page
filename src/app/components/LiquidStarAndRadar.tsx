'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MeshDistortMaterial } from '@react-three/drei';

type Props = {
  starColor?: string;
  ringColor?: string;
  showDots?: boolean;
};

export default function LiquidStarAndRadar({
  starColor = '#dddddd',
  ringColor = 'white',
  showDots = false,            // we’ll actually use this now
}: Props) {
  const groupRef = useRef<THREE.Group>(null!);
  const starRef = useRef<THREE.Mesh>(null!);
  const ringsRef = useRef<THREE.Group>(null!);

  const normalizedColor = useMemo(() => {
    try {
      return new THREE.Color(ringColor);
    } catch {
      console.warn('Invalid ringColor, falling back to white:', ringColor);
      return new THREE.Color('white');
    }
  }, [ringColor]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    ringsRef.current.scale.setScalar(1 + Math.sin(t * 1.5) * 0.02);
    groupRef.current.position.z = Math.sin(t * 0.3) * 0.3;
    groupRef.current.rotation.y = t * 0.2;

    // Liquid wobble
    const scaleX = 1 + Math.sin(t * 1.2) * 0.03;
    const scaleY = 1 + Math.cos(t * 1.5) * 0.03;
    starRef.current.scale.set(scaleX, scaleY, 1);

    starRef.current.rotation.z = t * 0.4;
    ringsRef.current.rotation.z = t * 0.6;
  });

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
      const radius = i % 4 === 0 ? outer : i % 4 === 2 ? diag : valley;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    shape.closePath();
    return shape;
  }, []);

  const radii = [1, 1.5, 2, 2.5] as const;

  const lineLength = 3;
  const linePoints = useMemo(() => [
    [new THREE.Vector3(0, 0.7, 0), new THREE.Vector3(0, lineLength, 0)],
    [new THREE.Vector3(0.7, 0, 0), new THREE.Vector3(lineLength, 0, 0)],
    [new THREE.Vector3(0, -0.7, 0), new THREE.Vector3(0, -lineLength, 0)],
    [new THREE.Vector3(-0.7, 0, 0), new THREE.Vector3(-lineLength, 0, 0)],
  ], []);

  return (
    <group ref={groupRef} scale={0.8}>
      {/* Star */}
      <mesh ref={starRef}>
        <extrudeGeometry args={[starShape, { depth: 0.2, bevelEnabled: false }]} />
        <MeshDistortMaterial
          distort={0.4}
          speed={1}
          color={starColor}
          metalness={0.5}
          roughness={0.4}
        />
      </mesh>

      {/* Rings */}
      <group ref={ringsRef}>
        {radii.map(r => (
          <mesh key={r}>
            <torusGeometry args={[r, 0.02, 16, 100]} />
            <MeshDistortMaterial distort={0.69} speed={0.2} color={ringColor} />
          </mesh>
        ))}
      </group>

      {/* Dotted Lines (optional) */}
      {showDots && (
        <group>
          {linePoints.map((points, i) => (
            <line key={i}>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  array={new Float32Array(
                    points.flatMap(p => [p.x, p.y, p.z])
                  )}
                  count={2}
                  itemSize={3}
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
      )}
    </group>
  );
}
