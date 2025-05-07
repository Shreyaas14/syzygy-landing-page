// app/layout.tsx
'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/app/components/Header';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  
  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty(
        '--vh',
        `${window.innerHeight * 0.01}px`
      );
    };
    setVh();
    window.addEventListener('resize', setVh);
    return () => window.removeEventListener('resize', setVh);
  }, []);
  return (
    <html lang="en">
      <body className="bg-black text-white overflow-x-hidden">
        {path !== '/' && <Header />}
        {children}
      </body>
    </html>
  );
}
