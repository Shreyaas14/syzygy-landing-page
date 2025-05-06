'use client';
import Link from 'next/link';

export default function MuseumPage() {
  return (
    <main className="bg-white text-black flex flex-col min-h-screen">
      <nav className="flex justify-center space-x-8 py-6">
        <Link href="/people" className="nav-link">The Collective</Link>
        <Link href="/library" className="nav-link">The Library</Link>
        <Link href="/warehouse" className="nav-link">The Warehouse</Link>
        <Link href="/recordroom" className="nav-link">The Studio</Link>
        <Link href="/meaning" className="nav-link">The Meaning</Link>
      </nav>

      <section className="text-center py-24">
        <h1 className="text-5xl font-serif mb-4">The Museum</h1>
        <p className="text-lg font-light">Designs, visual art, and creative works.</p>
      </section>

      <section className="flex-1 flex items-center justify-center">
        <p className="text-gray-400 italic">Artwork and design exhibits arriving soon.</p>
      </section>
    </main>
  );
}
