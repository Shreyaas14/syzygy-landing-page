// components/Header.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  href: string;
  label: string;
}

const navItems: NavItem[] = [
  { href: '/',           label: 'Home'         },
  { href: '/people',     label: 'The Collective' },
  { href: '/library',    label: 'The Library'    },
  { href: '/warehouse',  label: 'The Warehouse'  },
  { href: '/recordroom', label: 'The Studio'     },
  { href: '/museum',     label: 'The Museum'     },
  { href: '/meaning',    label: 'The Meaning'    },
];

const themeByPath: Record<string, { bg: string; border: string }> = {
  '/meaning':    { bg: 'bg-[#cac5bf]/80',    border: 'border-[#95918c]'    },
  '/people':     { bg: 'bg-black/80',        border: 'border-white/20'      },
  '/library':    { bg: 'bg-white/80',        border: 'border-black/20'      },
  '/warehouse':  { bg: 'bg-white/80',        border: 'border-black/20'      },
  '/recordroom': { bg: 'bg-white/80',        border: 'border-black/20'      },
  '/museum':     { bg: 'bg-white/80',        border: 'border-black/20'      },
};

export default function Header() {
  const path = usePathname() || '/';
  const [menuOpen, setMenuOpen] = useState(false);

  const isDetail = navItems.some(item => path.startsWith(item.href + '/'));
  if (isDetail) return null;

  const { bg, border } =
    themeByPath[path] ?? { bg: 'bg-black/80', border: 'border-white/20' };

  const visibleNav = navItems.filter(item => item.href !== path);

  return (
    <header
      className={`
        w-full sticky top-0 z-20
        ${bg} ${border} border-b
        backdrop-blur-sm transition-colors duration-300
      `}
    >
      <div className="max-w-4xl mx-auto p-4 flex flex-col items-center">
        <button
          className="sm:hidden mb-2 text-white text-2xl"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <nav className="hidden sm:flex flex-wrap justify-center gap-6 w-full">
          {visibleNav.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="nav-link text-white"
            >
              {label}
            </Link>
          ))}
        </nav>

        {menuOpen && (
          <nav className="sm:hidden flex flex-col items-center space-y-4 w-full">
            {visibleNav.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="nav-link text-white text-lg"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
