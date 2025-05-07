'use client';
import Link from 'next/link';
import ClientOnly from '@/app/components/ClientOnly';
import SineWaveSeparator from '@/app/components/SineWaveSeparator';
import ParticleCluster from '@/app/components/ParticleCluster';
import StarOnly from '@/app/components/StarOnly';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import {useEffect, useState } from 'react';

export default function PeoplePage() {
    const [isTouch, setIsTouch] = useState(false);

    useEffect(() => {
        setIsTouch('ontouchstart' in window);
    }, []);
    
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
        { id: 'aa15a', field: 'coder' },
        { id: '32d8b', field: 'med' },
    ];
        
    const colors = staff.map((p) => fieldColors[p.field] || '#ffffff');

  return (
    <main className="bg-black text-white min-h-screen">
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
          <Canvas camera={{ position: [0, 0, 5] }} 
          onCreated={({ gl }) => {
            gl.domElement.style.touchAction = 'pan-y';
          }}>
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

            {!isTouch && (
                <OrbitControls
                enablePan={false}
                enableZoom={false}
                enableRotate={true}
                />
            )}
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
