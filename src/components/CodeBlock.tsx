import { memo, useState, useCallback } from 'react';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  className?: string;
  lang?: string;
}

export const CodeBlock = memo(({ code, className = '' }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      const el = document.createElement('textarea');
      el.value = code;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <div className={`relative group ${className}`}>
      <pre
        className="rounded-lg px-4 py-3 pr-12 text-sm font-mono overflow-x-auto leading-relaxed
          bg-[hsl(var(--code-bg))] border border-[hsl(var(--code-border))] text-[hsl(var(--code-text))]"
      >
        <code>{code}</code>
      </pre>
      <button
        onClick={handleCopy}
        aria-label={copied ? 'Copied!' : 'Copy code'}
        className="absolute top-2.5 right-2.5 p-1.5 rounded-md transition-all duration-150
          text-muted-foreground hover:text-foreground hover:bg-muted
          opacity-0 group-hover:opacity-100 focus:opacity-100"
      >
        {copied
          ? <Check className="w-4 h-4 text-green-500" />
          : <Copy className="w-4 h-4" />
        }
      </button>
    </div>
  );
});
CodeBlock.displayName = 'CodeBlock';
