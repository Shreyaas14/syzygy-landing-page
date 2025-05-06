'use client';
import { useState, useEffect } from 'react';

export default function SineWaveSeparator() {
  const [t, setT] = useState(0);

  useEffect(() => {
    let id: number;
    const animate = () => {
      setT((prev) => prev + 0.05);
      id = requestAnimationFrame(animate);
    };
    id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, []);

  const count = 40;         // total plus signs
  const amplitude = 14;     // vertical wiggle in px
  const wavelength = 0.2;   // how stretched the wave is

  return (
    <div className="w-full h-12 overflow-hidden flex items-center justify-between">
      {Array.from({ length: count }).map((_, i) => {
        const y = Math.sin(i * wavelength + t) * amplitude;
        return (
          <span
            key={i}
            className="inline-block text-white"
            style={{ transform: `translateY(${y}px)` }}
          >
            +
          </span>
        );
      })}
    </div>
  );
}
