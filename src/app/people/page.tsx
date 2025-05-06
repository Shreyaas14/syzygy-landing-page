'use client';
import Link from 'next/link';
import ClientOnly from '@/app/components/ClientOnly';
import SineWaveSeparator from '@/app/components/SineWaveSeparator';
import ParticleCluster from '@/app/components/ParticleCluster';
import StarOnly from '@/app/components/StarOnly';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import {useEffect, useState } from 'react';

const staff = ['49f74','1f606','d954e'];

const questions = [
  '1. What is the greatest contribution to art you have ever seen? Pick one medium, and pick one contribution in that medium, and explain why.',
  '2. What is the single most impactful research paper since the year 2000?',
  '3. Paleontology or Astronomy, and why?',
  '4. Pick one historical civilization you’d want to live in and explain why.',
  '5. Best conversation you’ve ever had, and why?',
  '6. Describe yourself in 5 words.',
];

export default function PeoplePage() {
    const [qaData, setQaData] = useState<{
        questions: string[];
        answers: Record<string, string[]>;
      } | null>(null);
    
      useEffect(() => {
        fetch('/content/answers_to_q.json')
          .then((res) => res.json())
          .then((data) => setQaData(data));
      }, []);
    
      if (!qaData) {
        return <p className="p-8 text-white">Loading answers…</p>;
      }

    const fieldColors: Record<string,string> = {
        coder:   '#ffe1c7',
        med:     '#c7ffdc',
        product: '#ffcff8',
        };
        
    const staff = [
        { id: '49f74', field: 'coder' },
        { id: '1f606', field: 'product' },
        { id: 'd954e', field: 'product' },
        { id: '0d2d7', field: 'med' },
        { id: 'aa15a', field: 'coder' }
    ];
        
    const colors = staff.map((p) => fieldColors[p.field] || '#ffffff');

  return (
    <main className="bg-black text-white min-h-screen">
      <header className="w-full border-b border-white/20 bg-black/80 backdrop-blur-sm sticky top-0 z-20">
        <nav className="max-w-4xl mx-auto flex justify-center space-x-8 p-4">
          <Link href="/"       className="nav-link">Home</Link>
          <Link href="/library" className="nav-link">The Library</Link>
          <Link href="/warehouse" className="nav-link">The Warehouse</Link>
          <Link href="/recordroom" className="nav-link">The Studio</Link>
          <Link href="/museum" className="nav-link">The Museum</Link>
          <Link href="/meaning" className="nav-link">The Meaning</Link>
        </nav>
      </header>

      <section className="py-8">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4">
          {staff.map((person) => (
            <span key={person.id} className="font-mono text-lg">
                {person.id}
             </span>
          ))}
        </div>
      </section>

      <section className="flex-1 h-screen">
        <ClientOnly>
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} />

            <StarOnly
              starColor="#ffffff"
            />

            <ParticleCluster
              count={staff.length}
              radius={2.3}
              colors={colors} 
            />

            <OrbitControls enablePan={false} enableZoom={false} />
          </Canvas>
        </ClientOnly>
      </section>

      <section className="bg-black">
        {qaData.questions.map((q, i) => (
          <div key={i}>
            <article className="prose prose-xl text-white max-w-2xl mx-auto px-8 py-16">
              <h2>{q}</h2>
              <ul className="mt-4 space-y-4">
                {staff.map((person) => (
                  <li key={person.id} className="flex space-x-2 font-normal">
                    <span>
                      {qaData.answers[person.id]?.[i] ?? '— no answer'}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
            {i < qaData.questions.length - 1 && <SineWaveSeparator />}
          </div>
        ))}
      </section>
    </main>
  );
}
