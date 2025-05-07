'use client';
import Link from 'next/link';
import { useState, useEffect } from "react";
import StarWith3DRings from '../components/Star3DRings';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import SyzygyPhilosophy from '../components/SyzygyPhilosophy';


export default function MeaningPage() {
  const [isTouch, setIsTouch] = useState(false);
  
    useEffect(() => {
      setIsTouch('ontouchstart' in window);
    }, []);

  return (
    <main className="bg-[#d1cdc7] text-black min-h-screen">
      <section className="h-screen">
        <Canvas camera={{ position: [0, 0, 5] }} onCreated={({ gl }) => {gl.domElement.style.touchAction = 'pan-y';}}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />
          <StarWith3DRings starColor="#95918c" ringColor="#a8a29e" />
          {!isTouch && (
                <OrbitControls
                enablePan={false}
                enableZoom={false}
                enableRotate={true}
                />
            )}
        </Canvas>
      </section>
 
      <section className="h-[40vh]" /> 
      <SyzygyPhilosophy />
      <section className="h-[40vh]" /> 
    </main>
  );
}
