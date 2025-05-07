// components/MarkdownViewer.tsx
'use client';

import { useEffect, useState, ReactNode, HTMLAttributes, AnchorHTMLAttributes } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Link from 'next/link';

type LibraryEntry = {
  title: string;
  author: string;
  year: number;
  type: 'markdown' | 'pdf';
  slug: string;
  file: string;
};

export default function MarkdownViewer({ slug }: { slug: string }) {
  const [entry, setEntry] = useState<LibraryEntry | null>(null);
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    fetch('/content/library.json')
      .then(r => r.json())
      .then((entries: LibraryEntry[]) => {
        const match = entries.find(e => e.slug === slug);
        if (!match) return;
        setEntry(match);
        if (match.type === 'markdown') {
          fetch(match.file).then(r => r.text()).then(setMarkdown);
        }
      });
  }, [slug]);

  if (!entry) return <p className="p-8">Loading…</p>;
  if (entry.type === 'pdf') {
    return (
      <div className="flex h-screen items-center justify-center">
        <a
          href={entry.file}
          target="_blank"
          rel="noreferrer"
          className="underline text-lg text-blue-600"
        >
          View PDF: {entry.title}
        </a>
      </div>
    );
  }

  // Build as a Partial<Components>
  const components: Partial<Components> = {
    h1: ({ ...props }) => (
      <h1 className="text-4xl font-light mt-8 mb-4 leading-tight" {...props} />
    ),
    h2: ({ ...props }) => (
      <h2 className="text-3xl font-light mt-6 mb-3 leading-snug" {...props} />
    ),
    p: ({ ...props }) => (
      <p className="mb-4 leading-relaxed text-base" {...props} />
    ),
    blockquote: ({ ...props }) => (
      <blockquote
        className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-6"
        {...props}
      />
    ),
    ul: ({ ...props }) => (
      <ul className="list-disc list-inside mb-4 space-y-1" {...props} />
    ),
    ol: ({ ...props }) => (
      <ol className="list-decimal list-inside mb-4 space-y-1" {...props} />
    ),

    // @ts-expect-error
    a: ({
      href,
      children,
      ...props
    }: { href?: string; children: ReactNode } & AnchorHTMLAttributes<HTMLAnchorElement>) => {
      if (href && /^(https?:)?\/\//.test(href)) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            {...props}
          >
            {children}
          </a>
        );
      }
      return (
        <Link href={href || ''} {...props}>
          {children}
        </Link>
      );
    },

    // @ts-expect-error
    code: ({
      inline,
      className,
      children,
      ...props
    }: { inline?: boolean; className?: string; children: ReactNode } & HTMLAttributes<HTMLElement>) => {
      if (inline) {
        return (
          <code
            className="bg-gray-100 px-1 rounded text-sm font-mono"
            {...props}
          >
            {children}
          </code>
        );
      }
      return (
        <pre className="bg-gray-100 p-4 rounded mb-4 overflow-auto">
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
      );
    },
  };

  return (
    <div className="bg-white text-black w-full min-h-screen px-6 py-12">
      <div className="mb-8">
        <Link href="/library" className="text-sm text-gray-500 hover:underline">
          ← Back to Library
        </Link>
      </div>
      <article className="max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={components as Components}
        >
          {markdown}
        </ReactMarkdown>
      </article>
    </div>
  );
}
