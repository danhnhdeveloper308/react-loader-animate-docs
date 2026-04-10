import React, { memo, useState, useCallback, useEffect, useRef } from 'react';
import {
  SpinLoader, DotsLoader, PulseLoader, WaveLoader, SquareLoader,
  FlipLoader, GradientSpinner, OrbitLoader, TriangleLoader, DiamondLoader,
  CrossLoader, ButterflyLoader, HexagonLoader, SegmentLoader, ArrowLoader,
  GridLoader, StarLoader, PentagonLoader, ChevronLoader, SpiralLoader,
  RingLoader, ClockLoader, BarLoader, BounceBallLoader, DNALoader,
  HeartbeatLoader, CubeLoader, InfinityLoader, GearLoader, PyramidLoader,
  HourglassLoader, RadarLoader, TypingDotsLoader, PendulumLoader, AtomLoader,
  CornerSquaresLoader, SquareSplitLoader, TriangleSplitLoader,
  CircleSplitLoader, DiamondSplitLoader, HexagonSplitLoader,
  ColorRingLoader, CircularProgressLoader, TailSpinLoader,
  BallTriangleLoader, HashLoader, SyncLoader, MutatingDotsLoader, ThreeDotsFadeLoader,
  Grid3x3Loader, BarsLoader, RotatingLoader,
} from 'react-loader-animate';
import { LoaderCard } from '@/components/LoaderCard';
import { CodeBlock } from '@/components/CodeBlock';
import { LazySection } from '@/components/LazySection';
import { useTheme } from '@/hooks/useTheme';
import { Moon, Sun, Github, Package, Check, Copy, Search, X } from 'lucide-react';

// ─── Version ─────────────────────────────────────────────────────────────────
const PKG_VERSION = '1.0.3';

// ─── Shared helpers ───────────────────────────────────────────────────────────

interface SectionHeaderProps {
  badge: string;
  title: string;
  description: string;
}
const SectionHeader = memo(({ badge, title, description }: SectionHeaderProps) => (
  <div className="mb-10 max-w-4xl mx-auto">
    <div className="flex items-center gap-3 mb-2">
      <span className="inline-flex items-center justify-center w-7 h-7 text-xs font-bold font-mono rounded-lg bg-[hsl(var(--primary)/0.12)] text-[hsl(var(--primary))] border border-[hsl(var(--primary)/0.2)]">
        {badge}
      </span>
      <h2 className="text-2xl font-bold text-foreground tracking-tight">{title}</h2>
    </div>
    <p className="text-muted-foreground pl-10 leading-relaxed">{description}</p>
  </div>
));
SectionHeader.displayName = 'SectionHeader';

// ─── Inline copy button ───────────────────────────────────────────────────────

const CopyButton = memo(({ text, className = '' }: { text: string; className?: string }) => {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(async () => {
    try { await navigator.clipboard.writeText(text); }
    catch { const el = document.createElement('textarea'); el.value = text; document.body.appendChild(el); el.select(); document.execCommand('copy'); document.body.removeChild(el); }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);
  return (
    <button onClick={copy} className={`p-1.5 rounded-md transition-all text-muted-foreground hover:text-foreground hover:bg-muted ${className}`} aria-label="Copy">
      {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
});
CopyButton.displayName = 'CopyButton';

// ─── Top navigation ───────────────────────────────────────────────────────────

interface TopNavProps { toggle: () => void; isDark: boolean; }

const NAV_LINKS = [
  { href: '#install', label: 'Install' },
  { href: '#usage',   label: 'Usage' },
  { href: '#props',   label: 'Props' },
  { href: '#tailwind',label: 'Tailwind' },
  { href: '#components', label: 'Components' },
];

const TopNav = memo(({ toggle, isDark }: TopNavProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map(l => document.getElementById(l.href.slice(1))).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(`#${e.target.id}`); });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className={`sticky top-0 z-50 border-b transition-all duration-200 ${scrolled ? 'border-border bg-background/90 backdrop-blur-xl shadow-sm' : 'border-transparent bg-background/60 backdrop-blur-md'}`}>
      <div className="container mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 shrink-0">
          <AtomLoader size="sm" />
          <span className="font-bold text-foreground font-mono text-sm hidden sm:block">react-loader-animate</span>
          <span className="font-bold text-foreground font-mono text-sm sm:hidden">rla</span>
          <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-[hsl(var(--primary)/0.12)] text-[hsl(var(--primary))] border border-[hsl(var(--primary)/0.25)]">
            v{PKG_VERSION}
          </span>
        </a>

        {/* Nav links */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-150 ${
                activeSection === href
                  ? 'text-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.1)] font-medium'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/danhnhdeveloper308/react-loader-animate"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground border border-border hover:border-[hsl(var(--primary)/0.5)] hover:text-foreground transition-all"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
          <a
            href="https://www.npmjs.com/package/react-loader-animate"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground border border-border hover:border-[hsl(var(--primary)/0.5)] hover:text-foreground transition-all"
          >
            <Package className="w-3.5 h-3.5" />
            <span>npm</span>
          </a>
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all border border-border"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
});
TopNav.displayName = 'TopNav';

// ─── Hero ─────────────────────────────────────────────────────────────────────

const HERO_DEMOS = [
  { node: <SpinLoader size="lg" variant="primary" />,     name: 'SpinLoader' },
  { node: <GradientSpinner size="lg" variant="accent" />, name: 'GradientSpinner' },
  { node: <OrbitLoader size="lg" variant="success" />,    name: 'OrbitLoader' },
  { node: <AtomLoader size="lg" variant="warning" />,     name: 'AtomLoader' },
  { node: <InfinityLoader size="lg" variant="primary" />, name: 'InfinityLoader' },
];

const STATS = [
  { value: '41+', label: 'Components' },
  { value: 'TS',  label: 'TypeScript' },
  { value: '0',   label: 'Runtime deps' },
  { value: 'MIT', label: 'License' },
];

const INSTALL_CMD = 'npm install react-loader-animate';

const HeroSection = memo(() => {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(async () => {
    try { await navigator.clipboard.writeText(INSTALL_CMD); } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Gradient blobs */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[hsl(var(--primary)/0.08)] blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-[hsl(260_84%_60%/0.06)] blur-3xl pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-20 pb-16 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--primary)/0.08)] text-[hsl(var(--primary))] text-xs font-medium mb-6 select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--primary))] animate-pulse" />
          41+ animation components · TypeScript · Zero deps
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-foreground mb-4 tracking-tight leading-none">
          react-loader-animate
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
          Beautiful, performant React loading animations built with Tailwind CSS.
          Tree-shakeable, TypeScript-first, zero runtime dependencies.
        </p>

        {/* Install command */}
        <div className="inline-flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-card max-w-sm mx-auto mb-12 w-full sm:w-auto">
          <code className="text-sm font-mono text-foreground flex-1 text-left">{INSTALL_CMD}</code>
          <button onClick={copy} aria-label="Copy install command" className="shrink-0 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        {/* Loader showcase */}
        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 mb-14">
          {HERO_DEMOS.map(({ node, name }) => (
            <div key={name} className="flex flex-col items-center gap-3 group">
              <div className="p-4 rounded-2xl bg-card border border-border group-hover:border-[hsl(var(--primary)/0.4)] group-hover:shadow-glow transition-all duration-300">
                {node}
              </div>
              <span className="text-[10px] text-muted-foreground font-mono hidden sm:block">{name}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="inline-grid grid-cols-4 gap-px rounded-2xl border border-border bg-border overflow-hidden">
          {STATS.map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center px-5 py-4 bg-card">
              <span className="text-xl font-bold text-foreground font-mono">{value}</span>
              <span className="text-xs text-muted-foreground mt-0.5 whitespace-nowrap">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
});
HeroSection.displayName = 'HeroSection';

// ─── Install ──────────────────────────────────────────────────────────────────

type PM = 'npm' | 'yarn' | 'pnpm' | 'bun';
const PM_COMMANDS: Record<PM, string> = {
  npm:  'npm install react-loader-animate',
  yarn: 'yarn add react-loader-animate',
  pnpm: 'pnpm add react-loader-animate',
  bun:  'bun add react-loader-animate',
};

const InstallSection = memo(() => {
  const [pm, setPm] = useState<PM>('npm');
  return (
    <section id="install" className="container mx-auto px-4 sm:px-6 py-20">
      <SectionHeader badge="01" title="Installation" description="Add the package with your preferred package manager." />
      <div className="max-w-4xl mx-auto">
        {/* PM tabs */}
        <div className="flex gap-1 p-1 rounded-xl border border-border bg-muted/40 mb-4 w-fit">
          {(Object.keys(PM_COMMANDS) as PM[]).map(p => (
            <button
              key={p}
              onClick={() => setPm(p)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium font-mono transition-all duration-150 ${
                pm === p ? 'bg-card text-foreground shadow-sm border border-border' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
        <CodeBlock code={PM_COMMANDS[pm]} />
        <p className="text-sm text-muted-foreground mt-4">
          Requires <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">react ≥ 17</code> and{' '}
          <code className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">tailwindcss ≥ 3</code> as peer dependencies.
        </p>
      </div>
    </section>
  );
});
InstallSection.displayName = 'InstallSection';

// ─── Usage ────────────────────────────────────────────────────────────────────

const USAGE_STEPS = [
  {
    step: '1',
    title: 'Import the CSS (or use the Tailwind preset)',
    code: `import 'react-loader-animate/dist/index.css';`,
  },
  {
    step: '2',
    title: 'Import a component',
    code: `import { SpinLoader } from 'react-loader-animate';`,
  },
  {
    step: '3',
    title: 'Use it in your component',
    code: `export default function App() {
  return (
    <div>
      <SpinLoader />
      <SpinLoader size="lg" variant="accent" />
    </div>
  );
}`,
  },
];

const UsageSection = memo(() => (
  <section id="usage" className="container mx-auto px-4 sm:px-6 py-20 border-t border-border">
    <SectionHeader badge="02" title="Quick Start" description="Up and running in under a minute." />
    <div className="max-w-4xl mx-auto space-y-6">
      {USAGE_STEPS.map(({ step, title, code }) => (
        <div key={step} className="flex gap-4">
          <div className="shrink-0 w-7 h-7 rounded-full border-2 border-[hsl(var(--primary)/0.4)] bg-[hsl(var(--primary)/0.08)] flex items-center justify-center mt-0.5">
            <span className="text-xs font-bold text-[hsl(var(--primary))]">{step}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground mb-2">{title}</p>
            <CodeBlock code={code} />
          </div>
        </div>
      ))}
    </div>
  </section>
));
UsageSection.displayName = 'UsageSection';

// ─── Props ────────────────────────────────────────────────────────────────────

const PROPS_INTERFACE = `interface LoaderProps {
  /** Visual size of the loader.  Default: 'md' */
  size?:    'sm' | 'md' | 'lg';

  /** Colour variant.  Default: 'primary' */
  variant?: 'primary' | 'accent' | 'success' | 'warning';
}`;

const PROP_ROWS = [
  { prop: 'size',    type: 'string', def: "'md'",      opts: "'sm' | 'md' | 'lg'" },
  { prop: 'variant', type: 'string', def: "'primary'", opts: "'primary' | 'accent' | 'success' | 'warning'" },
];

const VARIANT_COLORS: Record<string, string> = {
  primary: 'text-[hsl(var(--primary))]',
  accent:  'text-orange-500',
  success: 'text-green-600 dark:text-green-400',
  warning: 'text-yellow-600 dark:text-yellow-400',
};

const PropsSection = memo(() => (
  <section id="props" className="container mx-auto px-4 sm:px-6 py-20 border-t border-border">
    <SectionHeader badge="03" title="Props Reference" description="Every loader accepts the same two optional props." />
    <div className="max-w-4xl mx-auto space-y-6">
      <CodeBlock code={PROPS_INTERFACE} />
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              {['Prop', 'Type', 'Default', 'Options'].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PROP_ROWS.map((row, i) => (
              <tr key={row.prop} className={i % 2 !== 0 ? 'bg-muted/20' : 'bg-card'}>
                <td className="px-4 py-3 font-mono text-[hsl(var(--primary))] font-medium">{row.prop}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.type}</td>
                <td className="px-4 py-3 font-mono text-orange-500 dark:text-orange-400">{row.def}</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{row.opts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Variant showcase */}
      <div className="rounded-xl border border-border bg-card p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Variant preview</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {(['primary', 'accent', 'success', 'warning'] as const).map(v => (
            <div key={v} className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/30">
              <SpinLoader size="md" variant={v} />
              <span className={`text-xs font-mono font-medium ${VARIANT_COLORS[v]}`}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
));
PropsSection.displayName = 'PropsSection';

// ─── Tailwind ─────────────────────────────────────────────────────────────────

const TAILWIND_CONFIG = `// tailwind.config.ts
import loaderPreset from 'react-loader-animate/tailwind.preset';
import type { Config } from 'tailwindcss';

export default {
  presets: [loaderPreset],
  content: [
    './src/**/*.{ts,tsx}',
    // Required so Tailwind sees all classes used inside the library
    'node_modules/react-loader-animate/dist/**/*.{js,cjs}',
  ],
} satisfies Config;`;

const TOKEN_OVERRIDE = `/* Override any token in your own :root */
:root {
  --primary: 220 100% 55%; /* blue */
  --accent:  160 84% 39%;  /* teal */
}`;

const TailwindSection = memo(() => (
  <section id="tailwind" className="container mx-auto px-4 sm:px-6 py-20 border-t border-border">
    <SectionHeader badge="04" title="Tailwind CSS Preset" description="Skip the CSS import — use the preset for full tree-shaking support." />
    <div className="max-w-4xl mx-auto space-y-5">
      <CodeBlock code={TAILWIND_CONFIG} />
      <div className="rounded-xl border border-border bg-[hsl(var(--primary)/0.05)] p-5 space-y-3">
        <p className="text-sm font-semibold text-foreground">Customising colours</p>
        <p className="text-sm text-muted-foreground">
          The preset registers four CSS tokens. Override any of them in your own{' '}
          <code className="font-mono text-xs bg-muted px-1 rounded">:root</code> to customise the palette:
        </p>
        <CodeBlock code={TOKEN_OVERRIDE} />
        <div className="flex flex-wrap gap-2 pt-1">
          {['--primary', '--accent', '--success', '--warning'].map(t => (
            <code key={t} className="font-mono text-xs bg-muted border border-border px-2 py-1 rounded-lg text-muted-foreground">{t}</code>
          ))}
        </div>
      </div>
    </div>
  </section>
));
TailwindSection.displayName = 'TailwindSection';

// ─── All loaders data ─────────────────────────────────────────────────────────

const ALL_LOADERS = [
  { title: 'Spin Loader',      componentName: 'SpinLoader',        node: <SpinLoader /> },
  { title: 'Dots Loader',      componentName: 'DotsLoader',        node: <DotsLoader /> },
  { title: 'Pulse Loader',     componentName: 'PulseLoader',       node: <PulseLoader /> },
  { title: 'Wave Loader',      componentName: 'WaveLoader',        node: <WaveLoader /> },
  { title: 'Square Morph',     componentName: 'SquareLoader',      node: <SquareLoader /> },
  { title: 'Flip Loader',      componentName: 'FlipLoader',        node: <FlipLoader /> },
  { title: 'Gradient Spinner', componentName: 'GradientSpinner',   node: <GradientSpinner /> },
  { title: 'Orbit Loader',     componentName: 'OrbitLoader',       node: <OrbitLoader /> },
  { title: 'Triangle Loader',  componentName: 'TriangleLoader',    node: <TriangleLoader /> },
  { title: 'Diamond Loader',   componentName: 'DiamondLoader',     node: <DiamondLoader /> },
  { title: 'Cross Loader',     componentName: 'CrossLoader',       node: <CrossLoader /> },
  { title: 'Butterfly Loader', componentName: 'ButterflyLoader',   node: <ButterflyLoader /> },
  { title: 'Hexagon Loader',   componentName: 'HexagonLoader',     node: <HexagonLoader /> },
  { title: 'Segment Loader',   componentName: 'SegmentLoader',     node: <SegmentLoader /> },
  { title: 'Arrow Loader',     componentName: 'ArrowLoader',       node: <ArrowLoader /> },
  { title: 'Grid Loader',      componentName: 'GridLoader',        node: <GridLoader /> },
  { title: 'Star Loader',      componentName: 'StarLoader',        node: <StarLoader /> },
  { title: 'Pentagon Loader',  componentName: 'PentagonLoader',    node: <PentagonLoader /> },
  { title: 'Chevron Loader',   componentName: 'ChevronLoader',     node: <ChevronLoader /> },
  { title: 'Spiral Loader',    componentName: 'SpiralLoader',      node: <SpiralLoader /> },
  { title: 'Ring Loader',      componentName: 'RingLoader',        node: <RingLoader /> },
  { title: 'Clock Loader',     componentName: 'ClockLoader',       node: <ClockLoader /> },
  { title: 'Bar Loader',       componentName: 'BarLoader',         node: <BarLoader /> },
  { title: 'Bounce Ball',      componentName: 'BounceBallLoader',  node: <BounceBallLoader /> },
  { title: 'DNA Loader',       componentName: 'DNALoader',         node: <DNALoader /> },
  { title: 'Heartbeat',        componentName: 'HeartbeatLoader',   node: <HeartbeatLoader /> },
  { title: 'Cube Loader',      componentName: 'CubeLoader',        node: <CubeLoader /> },
  { title: 'Infinity Loader',  componentName: 'InfinityLoader',    node: <InfinityLoader /> },
  { title: 'Gear Loader',      componentName: 'GearLoader',        node: <GearLoader /> },
  { title: 'Pyramid Loader',   componentName: 'PyramidLoader',     node: <PyramidLoader /> },
  { title: 'Hourglass',        componentName: 'HourglassLoader',   node: <HourglassLoader /> },
  { title: 'Radar',            componentName: 'RadarLoader',       node: <RadarLoader /> },
  { title: 'Typing Dots',      componentName: 'TypingDotsLoader',  node: <TypingDotsLoader /> },
  { title: 'Pendulum',         componentName: 'PendulumLoader',    node: <PendulumLoader /> },
  { title: 'Atom',             componentName: 'AtomLoader',        node: <AtomLoader /> },
];

const SPLIT_LOADERS = [
  { title: 'Corner Squares', componentName: 'CornerSquaresLoader', node: <CornerSquaresLoader /> },
  { title: 'Square Split',   componentName: 'SquareSplitLoader',   node: <SquareSplitLoader /> },
  { title: 'Triangle Split', componentName: 'TriangleSplitLoader', node: <TriangleSplitLoader /> },
  { title: 'Circle Split',   componentName: 'CircleSplitLoader',   node: <CircleSplitLoader /> },
  { title: 'Diamond Split',  componentName: 'DiamondSplitLoader',  node: <DiamondSplitLoader /> },
  { title: 'Hexagon Split',  componentName: 'HexagonSplitLoader',  node: <HexagonSplitLoader /> },
];

const NEW_LOADERS = [
  { title: 'Color Ring',          componentName: 'ColorRingLoader',         node: <ColorRingLoader /> },
  { title: 'Circular Progress',   componentName: 'CircularProgressLoader',  node: <CircularProgressLoader /> },
  { title: 'Tail Spin',           componentName: 'TailSpinLoader',          node: <TailSpinLoader /> },
  { title: 'Ball Triangle',       componentName: 'BallTriangleLoader',      node: <BallTriangleLoader /> },
  { title: 'Hash Loader',         componentName: 'HashLoader',              node: <HashLoader /> },
  { title: 'Sync Loader',         componentName: 'SyncLoader',              node: <SyncLoader /> },
  { title: 'Mutating Dots',       componentName: 'MutatingDotsLoader',      node: <MutatingDotsLoader /> },
  { title: 'Three Dots Fade',     componentName: 'ThreeDotsFadeLoader',     node: <ThreeDotsFadeLoader /> },
  { title: 'Grid 3×3',            componentName: 'Grid3x3Loader',           node: <Grid3x3Loader /> },
  { title: 'Bars',                componentName: 'BarsLoader',              node: <BarsLoader /> },
  { title: 'Rotating',            componentName: 'RotatingLoader',          node: <RotatingLoader /> },
];

const BULK_IMPORT = `import {
  // Basic
  SpinLoader, DotsLoader, PulseLoader, WaveLoader, GradientSpinner,
  RingLoader, BarLoader, TypingDotsLoader, SyncLoader,
  // Shapes
  SquareLoader, TriangleLoader, DiamondLoader, CrossLoader,
  HexagonLoader, PentagonLoader, StarLoader, ArrowLoader,
  ChevronLoader, PyramidLoader, CubeLoader,
  // Motion
  FlipLoader, OrbitLoader, ButterflyLoader, SegmentLoader,
  SpiralLoader, GridLoader, BounceBallLoader, ClockLoader,
  DNALoader, HeartbeatLoader, InfinityLoader, GearLoader,
  HourglassLoader, RadarLoader, PendulumLoader, AtomLoader,
  // Advanced / Custom colour
  ColorRingLoader, CircularProgressLoader, TailSpinLoader,
  BallTriangleLoader, HashLoader, MutatingDotsLoader, ThreeDotsFadeLoader,
  Grid3x3Loader, BarsLoader, RotatingLoader,
  CornerSquaresLoader,
  // Split & Transform
  SquareSplitLoader, TriangleSplitLoader, CircleSplitLoader,
  DiamondSplitLoader, HexagonSplitLoader,
} from 'react-loader-animate';`;

const ALL = [...ALL_LOADERS, ...SPLIT_LOADERS, ...NEW_LOADERS];

const ComponentsSection = memo(() => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query.trim()
    ? ALL.filter(l =>
        l.componentName.toLowerCase().includes(query.toLowerCase()) ||
        l.title.toLowerCase().includes(query.toLowerCase())
      )
    : null;

  return (
    <section id="components" className="container mx-auto px-4 sm:px-6 py-20 border-t border-border">
      <SectionHeader
        badge="05"
        title="All Components"
        description={`41+ loaders — hover any card to copy the import and usage snippet.`}
      />

      {/* Search */}
      <div className="relative max-w-sm mx-auto mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <input
          ref={inputRef}
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search components…"
          className="w-full pl-9 pr-9 py-2 rounded-lg border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] focus:border-[hsl(var(--primary)/0.5)] transition-all"
        />
        {query && (
          <button onClick={() => setQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded text-muted-foreground hover:text-foreground">
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {filtered ? (
        /* Search results */
        filtered.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            No components matching <strong className="text-foreground">"{query}"</strong>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filtered.map(({ title, componentName, node }) => (
              <LoaderCard key={componentName} title={title} componentName={componentName}>
                {node as React.ReactElement}
              </LoaderCard>
            ))}
          </div>
        )
      ) : (
        /* Default view */
        <>
          <div className="max-w-4xl mx-auto mb-10">
            <p className="text-sm font-semibold text-foreground mb-2">Import everything at once</p>
            <CodeBlock code={BULK_IMPORT} />
          </div>

          <h3 className="text-base font-semibold text-foreground mb-5 flex items-center gap-2">
            <span className="w-1.5 h-4 rounded-full bg-[hsl(var(--primary))]" />
            Basic &amp; Shape Loaders
            <span className="text-xs font-normal text-muted-foreground">({ALL_LOADERS.length})</span>
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {ALL_LOADERS.map(({ title, componentName, node }) => (
              <LoaderCard key={componentName} title={title} componentName={componentName}>
                {node as React.ReactElement}
              </LoaderCard>
            ))}
          </div>

          <LazySection className="mt-12">
            <h3 className="text-base font-semibold text-foreground mb-5 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full bg-orange-500" />
              Split &amp; Transform Loaders
              <span className="text-xs font-normal text-muted-foreground">({SPLIT_LOADERS.length})</span>
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {SPLIT_LOADERS.map(({ title, componentName, node }) => (
                <LoaderCard key={componentName} title={title} componentName={componentName}>
                  {node as React.ReactElement}
                </LoaderCard>
              ))}
            </div>
          </LazySection>

          <LazySection className="mt-12">
            <h3 className="text-base font-semibold text-foreground mb-2 flex items-center gap-2">
              <span className="w-1.5 h-4 rounded-full bg-green-500" />
              New — Advanced &amp; Custom Colour
              <span className="text-xs font-normal text-muted-foreground">({NEW_LOADERS.length})</span>
            </h3>
            <p className="text-sm text-muted-foreground mb-5 pl-3.5">
              Support <code className="font-mono text-xs bg-muted px-1 rounded">color</code>,{' '}
              <code className="font-mono text-xs bg-muted px-1 rounded">colors[]</code>,{' '}
              <code className="font-mono text-xs bg-muted px-1 rounded">strokeWidth</code>,{' '}
              <code className="font-mono text-xs bg-muted px-1 rounded">animationDuration</code>,{' '}
              <code className="font-mono text-xs bg-muted px-1 rounded">visible</code>, and more.
            </p>
            <div className="grid grid-cols-1 gap-4">
              {NEW_LOADERS.map(({ title, componentName, node }) => (
                <LoaderCard key={componentName} title={title} componentName={componentName}>
                  {node as React.ReactElement}
                </LoaderCard>
              ))}
            </div>
          </LazySection>
        </>
      )}
    </section>
  );
});
ComponentsSection.displayName = 'ComponentsSection';

// ─── Footer ───────────────────────────────────────────────────────────────────

const Footer = memo(() => (
  <footer className="border-t border-border mt-8">
    <div className="container mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
        <AtomLoader size="sm" />
        <span className="font-mono font-semibold text-foreground">react-loader-animate</span>
        <span className="text-border">·</span>
        <span>MIT License</span>
        <span className="text-border">·</span>
        <span>v{PKG_VERSION}</span>
      </div>
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <a href="https://www.npmjs.com/package/react-loader-animate" target="_blank" rel="noopener noreferrer"
           className="flex items-center gap-1.5 hover:text-foreground transition-colors">
          <Package className="w-3.5 h-3.5" /> npm ↗
        </a>
        <a href="https://github.com/danhnhdeveloper308/react-loader-animate" target="_blank" rel="noopener noreferrer"
           className="flex items-center gap-1.5 hover:text-foreground transition-colors">
          <Github className="w-3.5 h-3.5" /> GitHub ↗
        </a>
      </div>
    </div>
  </footer>
));
Footer.displayName = 'Footer';

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DocsPage() {
  const { toggle, isDark } = useTheme();
  return (
    <div className="min-h-screen bg-background">
      <TopNav toggle={toggle} isDark={isDark} />
      <HeroSection />
      <LazySection><InstallSection /></LazySection>
      <LazySection><UsageSection /></LazySection>
      <LazySection><PropsSection /></LazySection>
      <LazySection><TailwindSection /></LazySection>
      <LazySection><ComponentsSection /></LazySection>
      <Footer />
    </div>
  );
}
