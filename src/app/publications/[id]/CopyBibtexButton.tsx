'use client';

import { useState } from 'react';

export default function CopyBibtexButton({ bibtex }: { bibtex: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(bibtex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={copy}
      className="text-xs px-3 py-1 rounded-md transition-colors"
      style={{
        background: 'var(--badge-bg)',
        color: 'var(--badge-text)',
      }}
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}
