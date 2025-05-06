'use client';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';
import { Environment } from '@react-three/drei';

function StarAndRadar({ starColor = '#dddddd', ringColor = 'white', showDots = false }) {
  const groupRef = useRef<THREE.Group>(null!);
  const starRef = useRef<THREE.Mesh>(null!);
  const ringsRef = useRef<THREE.Group>(null!);

  const normalizedColor = useMemo(() => {
    try {
      return new THREE.Color(ringColor || 'white');
    } catch (e) {
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
      i === 0 ? shape.moveTo(x, y) : shape.lineTo(x, y);
    }
    shape.closePath();
    return shape;
  }, []);

  const radii = [1, 1.5, 2, 2.5] as const;

  // Define points for dotted lines (North, East, South, West)
  const lineLength = 3; // Extend lines to radius 3
  const linePoints = useMemo(
    () => [
      // North: from (0, 0.7, 0) to (0, 3, 0)
      [new THREE.Vector3(0, 0.7, 0), new THREE.Vector3(0, lineLength, 0)],
      // East: from (0.7, 0, 0) to (3, 0, 0)
      [new THREE.Vector3(0.7, 0, 0), new THREE.Vector3(lineLength, 0, 0)],
      // South: from (0, -0.7, 0) to (0, -3, 0)
      [new THREE.Vector3(0, -0.7, 0), new THREE.Vector3(0, -lineLength, 0)],
      // West: from (-0.7, 0, 0) to (-3, 0, 0)
      [new THREE.Vector3(-0.7, 0, 0), new THREE.Vector3(-lineLength, 0, 0)],
    ],
    []
  );

  return (
    <group ref={groupRef} scale={0.8}>
      <mesh ref={starRef}>
        <extrudeGeometry args={[starShape, { depth: 0.2, bevelEnabled: false }]} />
        <meshStandardMaterial color={starColor} metalness={0.5} roughness={0.4}/>
      </mesh>

      <group ref={ringsRef}>
        {radii.map((r) => (
          <group key={r}>
            <mesh>
              <torusGeometry args={[r, 0.02, 16, 100]} />
              <meshStandardMaterial color={ringColor} />
            </mesh>
            {[
              { pos: [0, r, 0], rot: Math.PI / 2 }, // North
              { pos: [r, 0, 0], rot: 0 }, // East
              { pos: [0, -r, 0], rot: Math.PI / 2 }, // South
              { pos: [-r, 0, 0], rot: 0 }, // West
            ].map(({ pos, rot }, i) => (
              <mesh
                key={`tick-${r}-${i}`}
                position={pos as [number, number, number]}
                rotation={[0, 0, rot]}
              >
                <boxGeometry args={[0.02, 0.1, 0.02]} />
                <meshBasicMaterial color={ringColor} />
              </mesh>
            ))}
          </group>
        ))}
      </group>

      <group>
        {linePoints.map((points, i) => (
          <line key={`line-${i}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                array={new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]))}
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
    </group>
  );
}

export default StarAndRadar;