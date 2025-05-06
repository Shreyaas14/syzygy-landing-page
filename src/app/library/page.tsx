'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ClientOnly from '../components/ClientOnly';
import LiquidStarAndRadar from '../components/LiquidStarAndRadar';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

type LibraryEntry = {
  title: string;
  author: string;
  year: number;
  type: 'markdown' | 'pdf';
  slug: string;
};

export default function LibraryPage() {
  const [entries, setEntries] = useState<LibraryEntry[]>([]);

  useEffect(() => {
    fetch('/content/library.json')
      .then((res) => res.json())
      .then(setEntries)
      .catch((err) => console.error('Failed to load library.json:', err));
  }, []);

  return (
    <main className="bg-white text-black flex flex-col">
      <header className="w-full border-b border-black/20 bg-white/80 backdrop-blur-sm sticky top-0 z-20">
        <nav className="max-w-4xl mx-auto flex justify-center space-x-8 p-4">
          <Link href="/"       className="nav-link">Home</Link>
          <Link href="/people" className="nav-link">The Collective</Link>
          <Link href="/warehouse" className="nav-link">The Warehouse</Link>
          <Link href="/recordroom" className="nav-link">The Studio</Link>
          <Link href="/museum" className="nav-link">The Museum</Link>
          <Link href="/meaning" className="nav-link">The Meaning</Link>
        </nav>
      </header>

      {/* Liquid Star Visual */}
      <section className="h-screen">
        <ClientOnly>
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} />
            <LiquidStarAndRadar
              starColor="#f40f0f"
              ringColor="#f40f0f"
              showDots={false}
            />
            <OrbitControls enablePan={false} enableZoom={false} />
          </Canvas>
        </ClientOnly>
      </section>

      {/* Timeline */}
      <section className="relative border-l border-black/20 max-w-2xl mx-auto pl-8">
        {entries.map((entry) => (
          <motion.div
            key={entry.slug}
            className="mb-64 ml-4 relative text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <div className="absolute -left-[18px] top-2 w-4 h-4 bg-black rounded-full" />
            <p className="text-xs font-mono text-gray-400 mb-2">{entry.year}</p>
            <Link href={`/library/${entry.slug}`}>
              <h3 className="text-4xl font-light hover:underline">{entry.title}</h3>
            </Link>
            <p className="text-sm italic text-gray-400 mt-2">{entry.author}</p>
          </motion.div>
        ))}
      </section>
    </main>
  );
}
