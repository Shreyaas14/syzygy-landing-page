'use client';
import Link from 'next/link';
import StarWith3DRings from '../components/Star3DRings';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import SyzygyPhilosophy from '../components/SyzygyPhilosophy';


export default function MeaningPage() {
  return (
    <main className="bg-[#d1cdc7] text-black min-h-screen">
      <header className="w-full border-b border-[#95918c] bg-[#cac5bf]/80 backdrop-blur-sm sticky top-0 z-20">
        <nav className="max-w-4xl mx-auto flex justify-center space-x-8 p-4">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/people" className="nav-link">The Collective</Link>
          <Link href="/library" className="nav-link">The Library</Link>
          <Link href="/warehouse" className="nav-link">The Warehouse</Link>
          <Link href="/recordroom" className="nav-link">The Studio</Link>
          <Link href="/museum" className="nav-link">The Museum</Link>
        </nav>
      </header>

      <section className="h-screen">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />
          <StarWith3DRings starColor="#95918c" ringColor="#a8a29e" />
          <OrbitControls enablePan={false} enableZoom={false} />
        </Canvas>
      </section>
 
      <section className="h-[40vh]" /> 
      <SyzygyPhilosophy />
      <section className="h-[40vh]" /> 
    </main>
  );
}
