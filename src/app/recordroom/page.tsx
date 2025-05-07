'use client';
import Link from 'next/link';

export default function RecordRoomPage() {
  return (
    <main className="bg-white text-black flex flex-col min-h-screen">
      <section className="text-center py-24">
        <h1 className="text-5xl mb-4">The Record Room</h1>
        <p className="text-lg font-light">Music, audio experiments, and soundscapes.</p>
      </section>

      <section className="flex-1 flex items-center justify-center">
        <p className="text-gray-400 italic">Coming soon — audio contributions in one place.</p>
      </section>
    </main>
  );
}
