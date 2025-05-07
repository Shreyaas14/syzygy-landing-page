'use client';

export default function MuseumPage() {
  return (
    <main className="bg-white text-black flex flex-col min-h-screen">
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
