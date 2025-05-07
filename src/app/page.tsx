'use client';
import { useEffect, useState } from "react";
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Link from 'next/link';
import StarAndRings from './components/StarAndRadar';

export default function HomePage() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch('ontouchstart' in window);
  }, []);

  return (
    <main className="bg-black text-white">
      {/* HERO */}
      <section className="h-screen">
      <Canvas
          camera={{ position: [0, 0, 5] }}
          onCreated={({ gl }) => {
            gl.domElement.style.touchAction = 'pan-y';
          }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />
          <StarAndRings />

          {!isTouch && (
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              enableRotate={true}
            />
          )}
        </Canvas>
      </section>

      <section className="min-h-screen flex flex-col items-center justify-center">
        <nav className="flex flex-col items-center space-y-8">
          <Link href="/people" className="nav-link text-2xl">
            The Collective
          </Link>
          <Link href="/library" className="nav-link text-2xl">
            The Library
          </Link>
          <Link href="/warehouse" className="nav-link text-2xl">
            The Warehouse
          </Link>
          <Link href="/recordroom" className="nav-link text-2xl">
            The Studio
          </Link>
          <Link href="/museum" className="nav-link text-2xl">
            The Museum
          </Link>
          <Link href="/meaning" className="nav-link text-2xl">
            The Meaning
          </Link>
        </nav>
      </section>
    </main>
  );
}
