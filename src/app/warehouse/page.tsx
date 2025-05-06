'use client';
import Link from 'next/link';

export default function WarehousePage() {
  return (
    <main className="bg-white text-black flex flex-col min-h-screen">
      {/* Nav */}
      <nav className="flex justify-center space-x-8 py-6">
        <Link href="/people" className="nav-link">The Collective</Link>
        <Link href="/library" className="nav-link">The Library</Link>
        <Link href="/recordroom" className="nav-link">The Studio</Link>
        <Link href="/museum" className="nav-link">The Museum</Link>
        <Link href="/meaning" className="nav-link">The Meaning</Link>
      </nav>

      {/* Hero */}
      <section className="text-center py-24">
        <h1 className="text-5xl mb-4">The Warehouse</h1>
        <p className="text-lg font-light">Projects and tools you can pick up and run today.</p>
      </section>

      {/* Placeholder for future gallery */}
      <section className="flex-1 flex items-center justify-center">
        <p className="text-gray-400 italic">Under construction — project gallery coming soon.</p>
      </section>
    </main>
  );
}
