import React, { memo, useState, useCallback } from 'react';
import { Check, Copy } from 'lucide-react';
import type { LoaderProps } from 'react-loader-animate';

interface LoaderCardProps {
  title: string;
  componentName: string;
  children: React.ReactElement<LoaderProps>;
}

const VARIANTS: { key: LoaderProps['variant']; label: string }[] = [
  { key: 'primary', label: 'primary' },
  { key: 'accent',  label: 'accent'  },
  { key: 'success', label: 'success' },
  { key: 'warning', label: 'warning' },
];

const SIZES: { key: LoaderProps['size']; label: string; cellH: number }[] = [
  { key: 'sm', label: 'sm',  cellH: 56  },
  { key: 'md', label: 'md',  cellH: 76  },
  { key: 'lg', label: 'lg',  cellH: 100 },
];

function CopyInline({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(async () => {
    try { await navigator.clipboard.writeText(text); } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);
  return (
    <button
      onClick={copy}
      className="shrink-0 p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
      aria-label="Copy"
    >
      {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
    </button>
  );
}

export const LoaderCard = memo(({ title, componentName, children }: LoaderCardProps) => {
  const importCode = `import { ${componentName} } from 'react-loader-animate';`;
  const usageCode  = `<${componentName} size="md" variant="primary" />`;
  const customCode = `<${componentName} color="#6366f1" size="lg" animationDuration={0.8} />`;

  return (
    <div className="w-full bg-card border border-border rounded-2xl overflow-hidden hover:border-[hsl(var(--primary)/0.4)] hover:shadow-glow transition-all duration-200">

      {/* ── Header ───────────────────────────────────────────────── */}
      <div className="px-6 pt-5 pb-4 text-center border-b border-border/50">
        <h3 className="text-sm font-bold font-mono text-foreground">{componentName}</h3>
        <p className="text-xs text-muted-foreground mt-0.5">{title}</p>
      </div>

      {/* ── Sizes row (primary colour) ────────────────────────────── */}
      <div className="px-6 pt-5 pb-3">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3 text-center">Sizes</p>
        <div className="grid grid-cols-3 gap-3">
          {SIZES.map(({ key, label, cellH }) => (
            <div key={key} className="flex flex-col items-center gap-2">
              <div
                className="w-full flex items-center justify-center bg-muted/40 rounded-xl"
                style={{ height: cellH }}
              >
                {React.cloneElement(children, { variant: 'primary', size: key })}
              </div>
              <span className="text-[10px] font-mono text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Colour variants row (md size) ───────────────────────── */}
      <div className="px-6 pb-4 pt-2">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-3 text-center">Variants</p>
        <div className="grid grid-cols-4 gap-2">
          {VARIANTS.map(({ key, label }) => (
            <div key={key} className="flex flex-col items-center gap-2">
              <div className="w-full flex items-center justify-center bg-muted/40 rounded-xl" style={{ height: 56 }}>
                {React.cloneElement(children, { variant: key, size: 'md' })}
              </div>
              <span className="text-[10px] font-mono text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Code snippets ────────────────────────────────────────── */}
      <div className="px-6 pb-5 border-t border-border/50 pt-4 space-y-2">
        {[importCode, usageCode, customCode].map((code, i) => (
          <div key={i} className="group flex items-center gap-2 bg-[hsl(var(--code-bg))] border border-[hsl(var(--code-border))] rounded-lg px-3.5 py-2.5">
            <code className="text-xs font-mono text-[hsl(var(--code-text))] flex-1 truncate">{code}</code>
            <CopyInline text={code} />
          </div>
        ))}
      </div>
    </div>
  );
});
LoaderCard.displayName = 'LoaderCard';


