'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Link from 'next/link';
import StarAndRings from './components/StarAndRadar';

export default function HomePage() {
  return (
    <main className="bg-black text-white">
      {/* HERO */}
      <section className="h-screen">
        <Canvas 
        camera={{ position: [0, 0, 5] }} 
        onCreated={({ gl }) => {gl.domElement.style.touchAction = 'pan-x';}}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />
          <StarAndRings />
          <OrbitControls enablePan={false} enableZoom={false} />
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
