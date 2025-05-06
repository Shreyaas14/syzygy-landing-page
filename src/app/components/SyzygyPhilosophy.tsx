'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

export default function SyzygyPhilosophy() {
  const [markdown, setMarkdown] = useState<string>('');

  useEffect(() => {
    fetch('/philosophy.md')
      .then((res) => res.text())
      .then((text) => setMarkdown(text));
  }, []);

  return (
    <motion.section
      className="max-w-3xl mx-auto px-8 py-16 text-black font-normal"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 50, damping: 20 }}
      viewport={{ once: true }}
    >
      <ReactMarkdown
        components={{
          h2: ({ node, ...props }) => <h2 className="text-3xl font-semibold mt-12 mb-4" {...props} />,
          p: ({ node, ...props }) => <p className="text-lg mb-4 leading-relaxed" {...props} />,
          ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4" {...props} />,
          li: ({ node, ...props }) => <li className="ml-4 mb-2" {...props} />,
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-gray-400 pl-4 italic my-4 text-gray-700" {...props} />
          ),
          code: ({ node, ...props }) => (
            <code className="bg-gray-200 rounded px-1 py-0.5 font-mono text-sm" {...props} />
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </motion.section>
  );
}
