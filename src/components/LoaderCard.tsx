import React, { memo } from 'react';
import { CodeBlock } from './CodeBlock';
import type { LoaderProps } from 'react-loader-animate';

interface LoaderCardProps {
  title: string;
  componentName: string;
  children: React.ReactElement<LoaderProps>;
}

const VARIANTS: LoaderProps['variant'][] = ['primary', 'accent', 'success', 'warning'];
const SIZES: LoaderProps['size'][] = ['sm', 'md', 'lg'];

export const LoaderCard = memo(({ title, componentName, children }: LoaderCardProps) => {
  const importCode = `import { ${componentName} } from 'react-loader-animate';`;
  const usageCode  = `<${componentName} size="md" variant="primary" />`;

  return (
    <div className="flex flex-col bg-card border border-border rounded-xl hover:shadow-glow transition-all duration-300 overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-5 pb-3">
        <h3 className="text-sm font-semibold text-foreground font-mono">{componentName}</h3>
        <p className="text-xs text-muted-foreground mt-0.5">{title}</p>
      </div>

      {/* Variants */}
      <div className="px-5 pb-4">
        <p className="text-xs text-muted-foreground mb-2">Variants</p>
        <div className="grid grid-cols-4 gap-2">
          {VARIANTS.map((variant) => (
            <div key={variant} className="flex flex-col items-center gap-1.5">
              <div className="h-12 flex items-center justify-center">
                {React.cloneElement(children, { variant, size: 'sm' })}
              </div>
              <span className="text-[10px] text-muted-foreground capitalize">{variant}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Sizes */}
      <div className="px-5 pb-4 border-t border-border/50 pt-3">
        <p className="text-xs text-muted-foreground mb-2">Sizes</p>
        <div className="grid grid-cols-3 gap-2">
          {SIZES.map((size) => (
            <div key={size} className="flex flex-col items-center gap-1.5">
              <div className="h-14 flex items-center justify-center">
                {React.cloneElement(children, { size })}
              </div>
              <span className="text-[10px] text-muted-foreground">{size}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Code snippets */}
      <div className="px-5 pb-5 border-t border-border/50 pt-3 mt-auto space-y-2">
        <CodeBlock code={importCode} />
        <CodeBlock code={usageCode} />
      </div>
    </div>
  );
});
LoaderCard.displayName = 'LoaderCard';
