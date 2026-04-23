import React, { memo, useState, useCallback, useMemo, useRef } from 'react';
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
  // v4 Ring/Circle
  RippleLoader, DoubleRingLoader, ConcentricLoader, DashLoader, CircleChaseLoader, TrailSpinLoader,
  // v4 Dots/Particles
  BouncingDotsLoader, FlipDotsLoader, CircleDotsLoader, ChasingDotsLoader, GlowDotsLoader, ParticleLoader,
  // v4 Bars/Lines
  SoundBarsLoader, HorizontalBarsLoader, LineLoader, ZigzagBallLoader, ProgressBarLoader,
  // v4 Geometric
  CubeGridLoader, PacmanLoader, TargetLoader, WiFiLoader, MorphLoader, SquaresTrailLoader,
  // v4 Creative
  HeartLoader, FingerprintLoader, GalaxyLoader, BlobLoader, TunnelLoader, MatrixLoader, WindmillLoader,
  // v5 Circle
  SolarSystemLoader, CometLoader, GlowRingLoader, ChaseRingLoader, BreathingRingLoader,
  // v5 Grid
  GridWaveLoader, GridBounceLoader, GridRainLoader, GridPulseLoader, GridSnakeLoader,
  // v6 Spinners
  NeonSpinLoader, ArcSpinLoader, GyroscopeLoader, ElasticRingLoader, VortexLoader,
  HalfSpinLoader, PulsatingSquareLoader, SphereDotsLoader, OctaLoader, CylinderLoader,
  // v6 Dots/Bounce
  StepDotsLoader, NeonDotsLoader, QuadDotsLoader, OrbitalDotsLoader, MirrorDotsLoader,
  BubbleLoader, WaterDropLoader, SatelliteLoader, MoleculeLoader, OscillateLoader,
  // v6 Bars/Lines
  PianoKeysLoader, LevelMeterLoader, CountdownBarLoader, StaircaseLoader, FilmStripLoader,
  ScanLoader, BatteryLoader, DialLoader, CompassLoader, GlitchLoader,
  // v6 Geometric
  HexGridLoader, CrosshairLoader, TesseractLoader, KaleidoLoader, IsometricLoader,
  GearTrainLoader, CubeRotateLoader, SparkleLoader, EclipseLoader, CrystalLoader,
  // v6 Creative/Nature
  RocketLoader, SnowflakeLoader, FireLoader, LeafLoader, CircuitLoader,
  LiquidFillLoader, PlasmaLoader, NeoTrailLoader, ThunderLoader, BarrelLoader,
  // v7 — 20 new unique loaders
  HelixLoader, RippleSquareLoader, TypewriterLoader, SonarLoader, NewtonLoader,
  SignalLoader, CounterLoader, CubeUnfoldLoader, SineWaveLoader, ChaseLoader,
  SandTimer, ShimmerLoader, GradientArcLoader, TriangleRingLoader, DoubleHelixLoader,
  PulseRingLoader, BouncingLineLoader, OrbLoader, FoldingLoader, ConstellationLoader,
} from 'react-loader-animate';
import type { LoaderProps } from 'react-loader-animate';
import { CodeBlock } from '@/components/CodeBlock';
import { useTheme } from '@/hooks/useTheme';
import {
  Moon, Sun, Github, Package, Check, Copy, Search, X, Menu,
  ChevronDown, ChevronRight,
} from 'lucide-react';

const PKG_VERSION = '1.4.0'; // auto-updated by build script

// ─── Types ────────────────────────────────────────────────────────────────────

type LoaderCategory = 'basic' | 'split' | 'advanced';

interface LoaderEntry {
  title: string;
  componentName: string;
  Component: React.ComponentType<LoaderProps>;
  category: LoaderCategory;
  description: string;
  tags?: string[];
}

// ─── Loader Registry ─────────────────────────────────────────────────────────
// No pre-rendered JSX nodes — components are only instantiated when selected

const LOADER_REGISTRY: LoaderEntry[] = [
  // ── Basic ─────────────────────────────────────────────────────────────────
  { title: 'Spin Loader',      componentName: 'SpinLoader',       Component: SpinLoader,       category: 'basic',    description: 'Classic spinning ring animation',          tags: ['spin', 'ring'] },
  { title: 'Dots Loader',      componentName: 'DotsLoader',       Component: DotsLoader,       category: 'basic',    description: 'Three bouncing dots',                      tags: ['dots', 'bounce'] },
  { title: 'Pulse Loader',     componentName: 'PulseLoader',      Component: PulseLoader,      category: 'basic',    description: 'Pulsing circle animation',                 tags: ['pulse', 'circle'] },
  { title: 'Wave Loader',      componentName: 'WaveLoader',       Component: WaveLoader,       category: 'basic',    description: 'Wave-like bars animation',                 tags: ['wave', 'bars'] },
  { title: 'Square Morph',     componentName: 'SquareLoader',     Component: SquareLoader,     category: 'basic',    description: 'Morphing square shape',                    tags: ['square', 'morph'] },
  { title: 'Flip Loader',      componentName: 'FlipLoader',       Component: FlipLoader,       category: 'basic',    description: 'Flipping square in 3D',                    tags: ['flip', '3d'] },
  { title: 'Gradient Spinner', componentName: 'GradientSpinner',  Component: GradientSpinner,  category: 'basic',    description: 'Spinner with conic gradient effect',       tags: ['gradient', 'spinner'] },
  { title: 'Orbit Loader',     componentName: 'OrbitLoader',      Component: OrbitLoader,      category: 'basic',    description: 'Orbiting dots around a center point',     tags: ['orbit', 'dots'] },
  { title: 'Triangle Loader',  componentName: 'TriangleLoader',   Component: TriangleLoader,   category: 'basic',    description: 'Rotating triangle shape',                  tags: ['triangle', 'rotate'] },
  { title: 'Diamond Loader',   componentName: 'DiamondLoader',    Component: DiamondLoader,    category: 'basic',    description: 'Spinning diamond / rhombus',               tags: ['diamond'] },
  { title: 'Cross Loader',     componentName: 'CrossLoader',      Component: CrossLoader,      category: 'basic',    description: 'Rotating cross / plus sign',               tags: ['cross', 'plus'] },
  { title: 'Butterfly Loader', componentName: 'ButterflyLoader',  Component: ButterflyLoader,  category: 'basic',    description: 'Butterfly wing animation',                 tags: ['butterfly'] },
  { title: 'Hexagon Loader',   componentName: 'HexagonLoader',    Component: HexagonLoader,    category: 'basic',    description: 'Spinning hexagon shape',                   tags: ['hexagon'] },
  { title: 'Segment Loader',   componentName: 'SegmentLoader',    Component: SegmentLoader,    category: 'basic',    description: 'Segmented ring with staggered dash',       tags: ['segment', 'ring'] },
  { title: 'Arrow Loader',     componentName: 'ArrowLoader',      Component: ArrowLoader,      category: 'basic',    description: 'Rotating arrow indicator',                 tags: ['arrow'] },
  { title: 'Grid Loader',      componentName: 'GridLoader',       Component: GridLoader,       category: 'basic',    description: '2×2 grid pulse animation',                 tags: ['grid'] },
  { title: 'Star Loader',      componentName: 'StarLoader',       Component: StarLoader,       category: 'basic',    description: 'Twinkling star animation',                 tags: ['star'] },
  { title: 'Pentagon Loader',  componentName: 'PentagonLoader',   Component: PentagonLoader,   category: 'basic',    description: 'Spinning pentagon shape',                  tags: ['pentagon'] },
  { title: 'Chevron Loader',   componentName: 'ChevronLoader',    Component: ChevronLoader,    category: 'basic',    description: 'Cascading chevron arrows',                 tags: ['chevron', 'arrow'] },
  { title: 'Spiral Loader',    componentName: 'SpiralLoader',     Component: SpiralLoader,     category: 'basic',    description: 'Unwinding spiral animation',               tags: ['spiral'] },
  { title: 'Ring Loader',      componentName: 'RingLoader',       Component: RingLoader,       category: 'basic',    description: 'Multiple concentric rings',                tags: ['ring'] },
  { title: 'Clock Loader',     componentName: 'ClockLoader',      Component: ClockLoader,      category: 'basic',    description: 'Clock-hand sweep animation',               tags: ['clock', 'time'] },
  { title: 'Bar Loader',       componentName: 'BarLoader',        Component: BarLoader,        category: 'basic',    description: 'Progress bar style loader',                tags: ['bar', 'progress'] },
  { title: 'Bounce Ball',      componentName: 'BounceBallLoader', Component: BounceBallLoader, category: 'basic',    description: 'Bouncing ball animation',                  tags: ['bounce', 'ball'] },
  { title: 'DNA Loader',       componentName: 'DNALoader',        Component: DNALoader,        category: 'basic',    description: 'Double helix DNA strand',                  tags: ['dna', 'helix'] },
  { title: 'Heartbeat',        componentName: 'HeartbeatLoader',  Component: HeartbeatLoader,  category: 'basic',    description: 'Heart pulse wave',                         tags: ['heart', 'pulse'] },
  { title: 'Cube Loader',      componentName: 'CubeLoader',       Component: CubeLoader,       category: 'basic',    description: 'Rotating 3D cube',                         tags: ['cube', '3d'] },
  { title: 'Infinity Loader',  componentName: 'InfinityLoader',   Component: InfinityLoader,   category: 'basic',    description: 'Infinite loop symbol animation',           tags: ['infinity', 'loop'] },
  { title: 'Gear Loader',      componentName: 'GearLoader',       Component: GearLoader,       category: 'basic',    description: 'Spinning gear / cog wheel',                tags: ['gear', 'cog'] },
  { title: 'Pyramid Loader',   componentName: 'PyramidLoader',    Component: PyramidLoader,    category: 'basic',    description: 'Layered pyramid animation',                tags: ['pyramid'] },
  { title: 'Hourglass',        componentName: 'HourglassLoader',  Component: HourglassLoader,  category: 'basic',    description: 'Flipping hourglass timer',                 tags: ['hourglass', 'timer'] },
  { title: 'Radar',            componentName: 'RadarLoader',      Component: RadarLoader,      category: 'basic',    description: 'Radar sweep scan effect',                  tags: ['radar', 'scan'] },
  { title: 'Typing Dots',      componentName: 'TypingDotsLoader', Component: TypingDotsLoader, category: 'basic',    description: 'Chat typing indicator dots',               tags: ['typing', 'chat', 'dots'] },
  { title: 'Pendulum',         componentName: 'PendulumLoader',   Component: PendulumLoader,   category: 'basic',    description: 'Swinging pendulum motion',                 tags: ['pendulum', 'swing'] },
  { title: 'Atom',             componentName: 'AtomLoader',       Component: AtomLoader,       category: 'basic',    description: 'Orbiting electrons around a nucleus',      tags: ['atom', 'orbit'] },
  // ── Split & Transform ─────────────────────────────────────────────────────
  { title: 'Corner Squares',   componentName: 'CornerSquaresLoader',  Component: CornerSquaresLoader,  category: 'split', description: 'Four corner squares rotating',          tags: ['corner', 'squares'] },
  { title: 'Square Split',     componentName: 'SquareSplitLoader',    Component: SquareSplitLoader,    category: 'split', description: 'Square splitting apart',                tags: ['square', 'split'] },
  { title: 'Triangle Split',   componentName: 'TriangleSplitLoader',  Component: TriangleSplitLoader,  category: 'split', description: 'Triangle splitting animation',          tags: ['triangle', 'split'] },
  { title: 'Circle Split',     componentName: 'CircleSplitLoader',    Component: CircleSplitLoader,    category: 'split', description: 'Circle splitting into arcs',            tags: ['circle', 'split'] },
  { title: 'Diamond Split',    componentName: 'DiamondSplitLoader',   Component: DiamondSplitLoader,   category: 'split', description: 'Diamond splitting into pieces',         tags: ['diamond', 'split'] },
  { title: 'Hexagon Split',    componentName: 'HexagonSplitLoader',   Component: HexagonSplitLoader,   category: 'split', description: 'Hexagon splitting animation',           tags: ['hexagon', 'split'] },
  // ── Advanced / Custom Colour ──────────────────────────────────────────────
  { title: 'Color Ring',        componentName: 'ColorRingLoader',        Component: ColorRingLoader,        category: 'advanced', description: 'Multi-color segmented ring',                    tags: ['ring', 'color', 'multi'] },
  { title: 'Circular Progress', componentName: 'CircularProgressLoader', Component: CircularProgressLoader, category: 'advanced', description: 'Circular progress indicator with stroke',       tags: ['progress', 'circle'] },
  { title: 'Tail Spin',         componentName: 'TailSpinLoader',         Component: TailSpinLoader,         category: 'advanced', description: 'SVG tail-spin ring loader',                     tags: ['tailspin', 'svg'] },
  { title: 'Ball Triangle',     componentName: 'BallTriangleLoader',     Component: BallTriangleLoader,     category: 'advanced', description: 'Three balls forming a triangle',                tags: ['ball', 'triangle'] },
  { title: 'Hash Loader',       componentName: 'HashLoader',             Component: HashLoader,             category: 'advanced', description: 'Rotating hash / grid pattern',                  tags: ['hash', 'grid'] },
  { title: 'Sync Loader',       componentName: 'SyncLoader',             Component: SyncLoader,             category: 'advanced', description: 'Syncing bars with stagger delay',               tags: ['sync', 'bars'] },
  { title: 'Mutating Dots',     componentName: 'MutatingDotsLoader',     Component: MutatingDotsLoader,     category: 'advanced', description: 'Morphing cluster of dots',                      tags: ['dots', 'morph'] },
  { title: 'Three Dots Fade',   componentName: 'ThreeDotsFadeLoader',    Component: ThreeDotsFadeLoader,    category: 'advanced', description: 'Three dots with fade-in sequence',              tags: ['dots', 'fade'] },
  { title: 'Grid 3×3',          componentName: 'Grid3x3Loader',          Component: Grid3x3Loader,          category: 'advanced', description: '3×3 grid wave animation',                       tags: ['grid', 'wave'] },
  { title: 'Bars',              componentName: 'BarsLoader',             Component: BarsLoader,             category: 'advanced', description: 'Vertical bars scaling animation',               tags: ['bars', 'scale'] },
  { title: 'Rotating',          componentName: 'RotatingLoader',         Component: RotatingLoader,         category: 'advanced', description: 'Dual counter-rotating rings',                   tags: ['rotating', 'rings', 'dual'] },
  // ── v4 Ring/Circle ────────────────────────────────────────────────────────
  { title: 'Ripple',            componentName: 'RippleLoader',           Component: RippleLoader,           category: 'advanced', description: 'Expanding ripple ring waves',                   tags: ['ripple', 'ring', 'wave'] },
  { title: 'Double Ring',       componentName: 'DoubleRingLoader',       Component: DoubleRingLoader,       category: 'advanced', description: 'Two rings spinning in opposite directions',      tags: ['ring', 'double', 'counter'] },
  { title: 'Concentric',        componentName: 'ConcentricLoader',       Component: ConcentricLoader,       category: 'advanced', description: 'Concentric rings pulsing with delay',           tags: ['ring', 'concentric', 'pulse'] },
  { title: 'Dash',              componentName: 'DashLoader',             Component: DashLoader,             category: 'advanced', description: 'Elastic dash arc on a circle track',           tags: ['dash', 'arc', 'elastic'] },
  { title: 'Circle Chase',      componentName: 'CircleChaseLoader',      Component: CircleChaseLoader,      category: 'advanced', description: 'Trailing dots orbiting with opacity fade',      tags: ['chase', 'orbit', 'trail'] },
  { title: 'Trail Spin',        componentName: 'TrailSpinLoader',        Component: TrailSpinLoader,        category: 'advanced', description: 'Gradient trail spinner with leading dot',       tags: ['trail', 'gradient', 'spin'] },
  // ── v4 Dots/Particles ─────────────────────────────────────────────────────
  { title: 'Bouncing Dots',     componentName: 'BouncingDotsLoader',     Component: BouncingDotsLoader,     category: 'basic',    description: 'Three dots scale-bouncing in sequence',         tags: ['dots', 'bounce', 'scale'] },
  { title: 'Flip Dots',         componentName: 'FlipDotsLoader',         Component: FlipDotsLoader,         category: 'advanced', description: '3×3 grid of squares flipping on X axis',        tags: ['flip', 'grid', '3d'] },
  { title: 'Circle Dots',       componentName: 'CircleDotsLoader',       Component: CircleDotsLoader,       category: 'advanced', description: 'Dots arranged in circle pulsing sequentially',  tags: ['dots', 'circle', 'pulse'] },
  { title: 'Chasing Dots',      componentName: 'ChasingDotsLoader',      Component: ChasingDotsLoader,      category: 'advanced', description: 'Trailing dots chasing around a ring',          tags: ['dots', 'chase', 'orbit'] },
  { title: 'Glow Dots',         componentName: 'GlowDotsLoader',         Component: GlowDotsLoader,         category: 'advanced', description: 'Three dots with glowing pulse effect',          tags: ['dots', 'glow', 'pulse'] },
  { title: 'Particle',          componentName: 'ParticleLoader',         Component: ParticleLoader,         category: 'advanced', description: 'Particles bursting from center repeatedly',     tags: ['particle', 'burst', 'scatter'] },
  // ── v4 Bars/Lines ─────────────────────────────────────────────────────────
  { title: 'Sound Bars',        componentName: 'SoundBarsLoader',        Component: SoundBarsLoader,        category: 'basic',    description: 'Audio equalizer bar animation',                 tags: ['sound', 'equalizer', 'bars'] },
  { title: 'Horizontal Bars',   componentName: 'HorizontalBarsLoader',   Component: HorizontalBarsLoader,   category: 'basic',    description: 'Stacked horizontal bars growing/shrinking',     tags: ['bars', 'horizontal', 'progress'] },
  { title: 'Line',              componentName: 'LineLoader',             Component: LineLoader,             category: 'basic',    description: 'Indeterminate line sliding across a track',     tags: ['line', 'progress', 'slide'] },
  { title: 'Zigzag Ball',       componentName: 'ZigzagBallLoader',       Component: ZigzagBallLoader,       category: 'basic',    description: 'Ball bouncing along a zigzag path',             tags: ['zigzag', 'ball', 'bounce'] },
  { title: 'Progress Bar',      componentName: 'ProgressBarLoader',      Component: ProgressBarLoader,      category: 'basic',    description: 'Animated indeterminate progress bar',           tags: ['progress', 'bar', 'linear'] },
  // ── v4 Geometric ──────────────────────────────────────────────────────────
  { title: 'Cube Grid',         componentName: 'CubeGridLoader',         Component: CubeGridLoader,         category: 'advanced', description: '3×3 cube grid with wave scale animation',       tags: ['cube', 'grid', '3d', 'wave'] },
  { title: 'Pacman',            componentName: 'PacmanLoader',           Component: PacmanLoader,           category: 'advanced', description: 'Pacman-inspired jaw animation with dots',       tags: ['pacman', 'game', 'dots'] },
  { title: 'Target',            componentName: 'TargetLoader',           Component: TargetLoader,           category: 'advanced', description: 'Bullseye target with pulsing rings',            tags: ['target', 'bullseye', 'rings'] },
  { title: 'WiFi',              componentName: 'WiFiLoader',             Component: WiFiLoader,             category: 'basic',    description: 'WiFi signal arcs appearing sequentially',       tags: ['wifi', 'signal', 'arcs'] },
  { title: 'Morph',             componentName: 'MorphLoader',            Component: MorphLoader,            category: 'advanced', description: 'Shape morphing between circle and square',      tags: ['morph', 'shape', 'transform'] },
  { title: 'Squares Trail',     componentName: 'SquaresTrailLoader',     Component: SquaresTrailLoader,     category: 'advanced', description: 'Trailing squares fading like a comet tail',     tags: ['squares', 'trail', 'comet'] },
  // ── v4 Creative ───────────────────────────────────────────────────────────
  { title: 'Heart',             componentName: 'HeartLoader',            Component: HeartLoader,            category: 'advanced', description: 'Beating heart with pulse animation',            tags: ['heart', 'beat', 'pulse'] },
  { title: 'Fingerprint',       componentName: 'FingerprintLoader',      Component: FingerprintLoader,      category: 'advanced', description: 'Spiral fingerprint rings animating in',         tags: ['fingerprint', 'spiral', 'rings'] },
  { title: 'Galaxy',            componentName: 'GalaxyLoader',           Component: GalaxyLoader,           category: 'advanced', description: 'Spiral galaxy of stars rotating',              tags: ['galaxy', 'spiral', 'stars'] },
  { title: 'Blob',              componentName: 'BlobLoader',             Component: BlobLoader,             category: 'advanced', description: 'Organic morphing blob animation',              tags: ['blob', 'morph', 'organic'] },
  { title: 'Tunnel',            componentName: 'TunnelLoader',           Component: TunnelLoader,           category: 'advanced', description: 'Nested rectangles giving a tunnel effect',      tags: ['tunnel', 'rect', 'depth'] },
  { title: 'Matrix',            componentName: 'MatrixLoader',           Component: MatrixLoader,           category: 'advanced', description: 'Matrix-style falling block columns',           tags: ['matrix', 'columns', 'fall'] },
  { title: 'Windmill',          componentName: 'WindmillLoader',         Component: WindmillLoader,         category: 'advanced', description: 'Spinning windmill blades with opacity trail',   tags: ['windmill', 'spin', 'blades'] },
  // v5 Circle
  { title: 'Solar System',      componentName: 'SolarSystemLoader',      Component: SolarSystemLoader,      category: 'advanced', description: 'Nucleus with 3 orbiting planets at different speeds', tags: ['solar', 'orbit', 'planet', 'circle'] },
  { title: 'Comet',             componentName: 'CometLoader',            Component: CometLoader,            category: 'advanced', description: 'Rotating comet arc with bright leading dot',    tags: ['comet', 'arc', 'circle', 'spin'] },
  { title: 'Glow Ring',         componentName: 'GlowRingLoader',         Component: GlowRingLoader,         category: 'advanced', description: 'Pulsing ring with neon glow and spinning arc',   tags: ['glow', 'ring', 'neon', 'pulse'] },
  { title: 'Chase Ring',        componentName: 'ChaseRingLoader',        Component: ChaseRingLoader,        category: 'advanced', description: 'Two dots chasing each other around a ring',      tags: ['chase', 'ring', 'circle', 'dots'] },
  { title: 'Breathing Ring',    componentName: 'BreathingRingLoader',    Component: BreathingRingLoader,    category: 'advanced', description: 'Concentric rings expanding and fading like breath', tags: ['breathing', 'ring', 'pulse', 'circle'] },
  // v5 Grid
  { title: 'Grid Wave',         componentName: 'GridWaveLoader',         Component: GridWaveLoader,         category: 'basic',    description: '4×4 squares scaling in a diagonal wave pattern', tags: ['grid', 'wave', 'scale', 'diagonal'] },
  { title: 'Grid Bounce',       componentName: 'GridBounceLoader',       Component: GridBounceLoader,       category: 'basic',    description: '3×3 dots bouncing outward from the center',      tags: ['grid', 'bounce', 'dots', 'center'] },
  { title: 'Grid Rain',         componentName: 'GridRainLoader',         Component: GridRainLoader,         category: 'basic',    description: 'Dots falling column by column like raindrops',   tags: ['grid', 'rain', 'fall', 'dots'] },
  { title: 'Grid Pulse',        componentName: 'GridPulseLoader',        Component: GridPulseLoader,        category: 'basic',    description: '3×3 grid pulsing outward from the center cell',  tags: ['grid', 'pulse', 'center', 'wave'] },
  { title: 'Grid Snake',        componentName: 'GridSnakeLoader',        Component: GridSnakeLoader,        category: 'advanced', description: 'A lit dot traversing a 3×3 grid in snake order', tags: ['grid', 'snake', 'trail', 'sequential'] },

  // v6 Spinners
  { title: 'Neon Spin',         componentName: 'NeonSpinLoader',         Component: NeonSpinLoader,         category: 'advanced', description: 'Glowing neon arc rotating with tail fade',          tags: ['neon', 'spin', 'glow', 'arc'] },
  { title: 'Arc Spin',          componentName: 'ArcSpinLoader',          Component: ArcSpinLoader,          category: 'basic',    description: 'Dual arcs counter-rotating in opposite directions', tags: ['arc', 'spin', 'dual', 'ring'] },
  { title: 'Gyroscope',         componentName: 'GyroscopeLoader',        Component: GyroscopeLoader,        category: 'advanced', description: 'Three rings rotating on different axes like a gyroscope', tags: ['gyroscope', 'ring', '3d', 'rotation'] },
  { title: 'Elastic Ring',      componentName: 'ElasticRingLoader',      Component: ElasticRingLoader,      category: 'advanced', description: 'A ring that stretches and contracts elastically',    tags: ['elastic', 'ring', 'stretch', 'morph'] },
  { title: 'Vortex',            componentName: 'VortexLoader',           Component: VortexLoader,           category: 'advanced', description: 'Particles spiraling inward into a vortex',           tags: ['vortex', 'spiral', 'particles', 'spin'] },
  { title: 'Half Spin',         componentName: 'HalfSpinLoader',         Component: HalfSpinLoader,         category: 'basic',    description: 'Two semicircles alternating spin directions',        tags: ['spin', 'half', 'semicircle', 'alternating'] },
  { title: 'Pulsating Square',  componentName: 'PulsatingSquareLoader',  Component: PulsatingSquareLoader,  category: 'basic',    description: 'Nested squares scaling in concentric pulse',         tags: ['square', 'pulse', 'nested', 'scale'] },
  { title: 'Sphere Dots',       componentName: 'SphereDotsLoader',       Component: SphereDotsLoader,       category: 'advanced', description: 'Dots orbiting on a 3D sphere surface',              tags: ['sphere', 'dots', '3d', 'orbit'] },
  { title: 'Octa',              componentName: 'OctaLoader',             Component: OctaLoader,             category: 'basic',    description: 'Octagon shape morphing and rotating',               tags: ['octagon', 'morph', 'rotate', 'geometric'] },
  { title: 'Cylinder',          componentName: 'CylinderLoader',         Component: CylinderLoader,         category: 'advanced', description: '3D cylinder rotating and perspective-shifting',      tags: ['cylinder', '3d', 'rotate', 'perspective'] },

  // v6 Dots/Bounce
  { title: 'Step Dots',         componentName: 'StepDotsLoader',         Component: StepDotsLoader,         category: 'basic',    description: 'Dots stepping up and down in a staircase pattern',  tags: ['dots', 'step', 'bounce', 'sequential'] },
  { title: 'Neon Dots',         componentName: 'NeonDotsLoader',         Component: NeonDotsLoader,         category: 'advanced', description: 'Glowing neon dots pulsing with color shifts',        tags: ['neon', 'dots', 'glow', 'pulse'] },
  { title: 'Quad Dots',         componentName: 'QuadDotsLoader',         Component: QuadDotsLoader,         category: 'basic',    description: 'Four dots rotating in a square formation',           tags: ['quad', 'dots', 'rotate', 'square'] },
  { title: 'Orbital Dots',      componentName: 'OrbitalDotsLoader',      Component: OrbitalDotsLoader,      category: 'advanced', description: 'Multiple dots orbiting at different radii',          tags: ['orbital', 'dots', 'orbit', 'radii'] },
  { title: 'Mirror Dots',       componentName: 'MirrorDotsLoader',       Component: MirrorDotsLoader,       category: 'basic',    description: 'Mirrored dots bouncing toward and away from center', tags: ['mirror', 'dots', 'bounce', 'symmetric'] },
  { title: 'Bubble',            componentName: 'BubbleLoader',           Component: BubbleLoader,           category: 'basic',    description: 'Floating bubbles rising with random drift',          tags: ['bubble', 'float', 'rise', 'random'] },
  { title: 'Water Drop',        componentName: 'WaterDropLoader',        Component: WaterDropLoader,        category: 'advanced', description: 'Water droplet falling and creating ripple impact',   tags: ['water', 'drop', 'ripple', 'impact'] },
  { title: 'Satellite',         componentName: 'SatelliteLoader',        Component: SatelliteLoader,        category: 'advanced', description: 'Small dot orbiting a central planet-like sphere',    tags: ['satellite', 'orbit', 'planet', 'space'] },
  { title: 'Molecule',          componentName: 'MoleculeLoader',         Component: MoleculeLoader,         category: 'advanced', description: 'Atoms connected by bonds rotating like a molecule',  tags: ['molecule', 'atom', 'bond', 'rotate'] },
  { title: 'Oscillate',         componentName: 'OscillateLoader',        Component: OscillateLoader,        category: 'basic',    description: 'Dots oscillating with phase-shifted sine wave motion', tags: ['oscillate', 'sine', 'wave', 'phase'] },

  // v6 Bars/Lines
  { title: 'Piano Keys',        componentName: 'PianoKeysLoader',        Component: PianoKeysLoader,        category: 'basic',    description: 'Vertical bars animated like pressing piano keys',    tags: ['piano', 'keys', 'bars', 'music'] },
  { title: 'Level Meter',       componentName: 'LevelMeterLoader',       Component: LevelMeterLoader,       category: 'basic',    description: 'Audio level meter bars fluctuating dynamically',     tags: ['level', 'meter', 'audio', 'bars'] },
  { title: 'Countdown Bar',     componentName: 'CountdownBarLoader',     Component: CountdownBarLoader,     category: 'basic',    description: 'Progress bar depleting from full to empty in loop',  tags: ['countdown', 'bar', 'progress', 'deplete'] },
  { title: 'Staircase',         componentName: 'StaircaseLoader',        Component: StaircaseLoader,        category: 'basic',    description: 'Bars growing in staircase ascending/descending pattern', tags: ['staircase', 'bars', 'ascending', 'steps'] },
  { title: 'Film Strip',        componentName: 'FilmStripLoader',        Component: FilmStripLoader,        category: 'advanced', description: 'Film strip frames scrolling horizontally',            tags: ['film', 'strip', 'scroll', 'frames'] },
  { title: 'Scan',              componentName: 'ScanLoader',             Component: ScanLoader,             category: 'basic',    description: 'Horizontal scan beam sweeping top to bottom',        tags: ['scan', 'beam', 'sweep', 'horizontal'] },
  { title: 'Battery',           componentName: 'BatteryLoader',          Component: BatteryLoader,          category: 'advanced', description: 'Battery icon filling up repeatedly to simulate charging', tags: ['battery', 'charge', 'fill', 'progress'] },
  { title: 'Dial',              componentName: 'DialLoader',             Component: DialLoader,             category: 'advanced', description: 'Rotating dial pointer sweeping around a circle',     tags: ['dial', 'pointer', 'sweep', 'rotate'] },
  { title: 'Compass',           componentName: 'CompassLoader',          Component: CompassLoader,          category: 'advanced', description: 'Compass needle spinning and settling',               tags: ['compass', 'needle', 'spin', 'settle'] },
  { title: 'Glitch',            componentName: 'GlitchLoader',           Component: GlitchLoader,           category: 'advanced', description: 'Glitching rectangle with offset color channels',     tags: ['glitch', 'offset', 'channels', 'rgb'] },

  // v6 Geometric
  { title: 'Hex Grid',          componentName: 'HexGridLoader',          Component: HexGridLoader,          category: 'advanced', description: 'Hexagonal grid cells lighting up in sequence',       tags: ['hex', 'grid', 'hexagon', 'sequential'] },
  { title: 'Crosshair',         componentName: 'CrosshairLoader',        Component: CrosshairLoader,        category: 'basic',    description: 'Crosshair lines sweeping and pulsing',               tags: ['crosshair', 'lines', 'sweep', 'pulse'] },
  { title: 'Tesseract',         componentName: 'TesseractLoader',        Component: TesseractLoader,        category: 'advanced', description: '4D hypercube (tesseract) wireframe rotating',        tags: ['tesseract', 'hypercube', '4d', 'wireframe'] },
  { title: 'Kaleido',           componentName: 'KaleidoLoader',          Component: KaleidoLoader,          category: 'advanced', description: 'Kaleidoscope pattern rotating with color shifts',    tags: ['kaleido', 'kaleidoscope', 'pattern', 'rotate'] },
  { title: 'Isometric',         componentName: 'IsometricLoader',        Component: IsometricLoader,        category: 'advanced', description: '3D isometric cube rendered with SVG polygons',       tags: ['isometric', '3d', 'cube', 'polygon'] },
  { title: 'Gear Train',        componentName: 'GearTrainLoader',        Component: GearTrainLoader,        category: 'advanced', description: 'Two interlocked gears counter-rotating in mesh',     tags: ['gear', 'train', 'mesh', 'counter-rotate'] },
  { title: 'Cube Rotate',       componentName: 'CubeRotateLoader',       Component: CubeRotateLoader,       category: 'advanced', description: 'CSS 3D perspective cube rotating on all axes',       tags: ['cube', '3d', 'perspective', 'rotate'] },
  { title: 'Sparkle',           componentName: 'SparkleLoader',          Component: SparkleLoader,          category: 'advanced', description: 'Star sparkles appearing and fading around a center', tags: ['sparkle', 'star', 'fade', 'twinkle'] },
  { title: 'Eclipse',           componentName: 'EclipseLoader',          Component: EclipseLoader,          category: 'advanced', description: 'Two circles creating an eclipse effect as they overlap', tags: ['eclipse', 'circles', 'overlap', 'shadow'] },
  { title: 'Crystal',           componentName: 'CrystalLoader',          Component: CrystalLoader,          category: 'advanced', description: 'Multi-faceted crystal gem rotating and refracting',  tags: ['crystal', 'gem', 'refract', 'rotate'] },

  // v6 Creative/Nature
  { title: 'Rocket',            componentName: 'RocketLoader',           Component: RocketLoader,           category: 'advanced', description: 'SVG rocket with animated exhaust flame bobbing',     tags: ['rocket', 'space', 'flame', 'svg'] },
  { title: 'Snowflake',         componentName: 'SnowflakeLoader',        Component: SnowflakeLoader,        category: 'advanced', description: 'Six-arm snowflake rotating with crystalline arms',   tags: ['snowflake', 'snow', 'crystal', 'rotate'] },
  { title: 'Fire',              componentName: 'FireLoader',             Component: FireLoader,             category: 'advanced', description: 'Flickering flame with layered orange/yellow colors', tags: ['fire', 'flame', 'flicker', 'orange'] },
  { title: 'Leaf',              componentName: 'LeafLoader',             Component: LeafLoader,             category: 'advanced', description: 'Leaf swaying in the breeze with organic motion',     tags: ['leaf', 'nature', 'sway', 'organic'] },
  { title: 'Circuit',           componentName: 'CircuitLoader',          Component: CircuitLoader,          category: 'advanced', description: 'Circuit board trace animating along PCB paths',       tags: ['circuit', 'pcb', 'trace', 'tech'] },
  { title: 'Liquid Fill',       componentName: 'LiquidFillLoader',       Component: LiquidFillLoader,       category: 'advanced', description: 'Circular container filling with liquid wave effect',  tags: ['liquid', 'fill', 'wave', 'circle'] },
  { title: 'Plasma',            componentName: 'PlasmaLoader',           Component: PlasmaLoader,           category: 'advanced', description: 'Morphing plasma blob with layered glow effect',      tags: ['plasma', 'blob', 'morph', 'glow'] },
  { title: 'Neo Trail',         componentName: 'NeoTrailLoader',         Component: NeoTrailLoader,         category: 'advanced', description: 'Neon gradient arc spinning with glowing lead dot',   tags: ['neon', 'trail', 'glow', 'gradient'] },
  { title: 'Thunder',           componentName: 'ThunderLoader',          Component: ThunderLoader,          category: 'advanced', description: 'Lightning bolt flashing with electric glow effect',  tags: ['thunder', 'lightning', 'flash', 'electric'] },
  { title: 'Barrel',            componentName: 'BarrelLoader',           Component: BarrelLoader,           category: 'basic',    description: 'Rolling barrel traveling across the container',      tags: ['barrel', 'roll', 'travel', 'retro'] },

  // ── v7 — 20 new unique loaders ────────────────────────────────────────────────
  { title: 'Helix',             componentName: 'HelixLoader',            Component: HelixLoader,            category: 'advanced', description: 'Double-strand helix with animated strand flow',       tags: ['helix', 'dna', 'strand', 'wave'] },
  { title: 'Ripple Square',     componentName: 'RippleSquareLoader',     Component: RippleSquareLoader,     category: 'basic',    description: 'Concentric square rings expanding outward',           tags: ['ripple', 'square', 'expand', 'rings'] },
  { title: 'Typewriter',        componentName: 'TypewriterLoader',       Component: TypewriterLoader,       category: 'basic',    description: 'Three dots appearing in typewriter-style sequence',   tags: ['typewriter', 'dots', 'typing', 'sequence'] },
  { title: 'Sonar',             componentName: 'SonarLoader',            Component: SonarLoader,            category: 'basic',    description: 'Sonar ping rings expanding from center point',        tags: ['sonar', 'ping', 'rings', 'expand'] },
  { title: "Newton's Cradle",   componentName: 'NewtonLoader',           Component: NewtonLoader,           category: 'advanced', description: "Newton's cradle pendulum swinging left and right",    tags: ['newton', 'cradle', 'pendulum', 'physics'] },
  { title: 'Signal Bars',       componentName: 'SignalLoader',           Component: SignalLoader,           category: 'basic',    description: 'Mobile signal strength bars lighting up in sequence',  tags: ['signal', 'bars', 'mobile', 'strength'] },
  { title: 'Counter',           componentName: 'CounterLoader',          Component: CounterLoader,          category: 'advanced', description: 'Circular arc with live percentage counter inside',     tags: ['counter', 'percentage', 'arc', 'progress'] },
  { title: 'Cube Unfold',       componentName: 'CubeUnfoldLoader',       Component: CubeUnfoldLoader,       category: 'advanced', description: '3D cube rotating through X and Y axes continuously',  tags: ['cube', '3d', 'unfold', 'rotate'] },
  { title: 'Sine Wave',         componentName: 'SineWaveLoader',         Component: SineWaveLoader,         category: 'basic',    description: 'Row of dots flowing in a smooth sine wave pattern',   tags: ['sine', 'wave', 'dots', 'flow'] },
  { title: 'Chase',             componentName: 'ChaseLoader',            Component: ChaseLoader,            category: 'basic',    description: 'Chomper chasing dots across a horizontal track',      tags: ['chase', 'chomper', 'dots', 'humor'] },
  { title: 'Sand Timer',        componentName: 'SandTimer',              Component: SandTimer,              category: 'advanced', description: 'Hourglass flipping with sand-fall animation inside',   tags: ['sand', 'timer', 'hourglass', 'flip'] },
  { title: 'Shimmer',           componentName: 'ShimmerLoader',          Component: ShimmerLoader,          category: 'basic',    description: 'Skeleton-style shimmer bars for content placeholders', tags: ['shimmer', 'skeleton', 'placeholder', 'bars'] },
  { title: 'Gradient Arc',      componentName: 'GradientArcLoader',      Component: GradientArcLoader,      category: 'basic',    description: 'Spinner arc with a gradient fade from transparent',   tags: ['gradient', 'arc', 'spin', 'fade'] },
  { title: 'Triangle Ring',     componentName: 'TriangleRingLoader',     Component: TriangleRingLoader,     category: 'advanced', description: 'Two triangle outlines counter-rotating around center', tags: ['triangle', 'ring', 'counter-rotate', 'geometric'] },
  { title: 'Double Helix',      componentName: 'DoubleHelixLoader',      Component: DoubleHelixLoader,      category: 'advanced', description: 'DNA double helix dots orbiting on crossing paths',    tags: ['double', 'helix', 'dna', 'orbit'] },
  { title: 'Pulse Ring',        componentName: 'PulseRingLoader',        Component: PulseRingLoader,        category: 'basic',    description: 'Multiple ring pulses expanding from a center dot',    tags: ['pulse', 'ring', 'expand', 'minimal'] },
  { title: 'Bouncing Line',     componentName: 'BouncingLineLoader',     Component: BouncingLineLoader,     category: 'basic',    description: 'A curved SVG path bouncing up and down fluidly',      tags: ['line', 'bounce', 'svg', 'wave'] },
  { title: 'Orb',               componentName: 'OrbLoader',              Component: OrbLoader,              category: 'advanced', description: 'Glowing gradient orb with pulsing ring halos',        tags: ['orb', 'glow', 'gradient', 'pulse'] },
  { title: 'Folding Squares',   componentName: 'FoldingLoader',          Component: FoldingLoader,          category: 'advanced', description: 'Four squares folding in 3D perspective sequence',      tags: ['folding', 'squares', '3d', 'perspective'] },
  { title: 'Constellation',     componentName: 'ConstellationLoader',    Component: ConstellationLoader,    category: 'advanced', description: 'Star points twinkling and connected by constellation lines', tags: ['constellation', 'stars', 'twinkle', 'space'] },
];

const CATEGORY_META: Record<LoaderCategory, { label: string; color: string }> = {
  basic:    { label: 'Basic Loaders',       color: 'hsl(var(--primary))' },
  split:    { label: 'Split & Transform',   color: 'hsl(38 92% 50%)' },
  advanced: { label: 'Advanced',            color: 'hsl(142 71% 45%)' },
};

// ─── Shared utils ─────────────────────────────────────────────────────────────

const CopyBtn = memo(({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(async () => {
    try { await navigator.clipboard.writeText(text); } catch {
      const el = document.createElement('textarea'); el.value = text;
      document.body.appendChild(el); el.select(); document.execCommand('copy'); document.body.removeChild(el);
    }
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  }, [text]);
  return (
    <button onClick={copy} className="shrink-0 p-1.5 rounded-md transition-all text-muted-foreground hover:text-foreground hover:bg-muted" aria-label="Copy">
      {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
});
CopyBtn.displayName = 'CopyBtn';

const CodeRow = memo(({ code }: { code: string }) => (
  <div className="flex items-center gap-2 bg-[hsl(var(--code-bg))] border border-[hsl(var(--code-border))] rounded-lg px-3.5 py-2.5 group">
    <code className="text-xs font-mono text-[hsl(var(--code-text))] flex-1 min-w-0 truncate">{code}</code>
    <CopyBtn text={code} />
  </div>
));
CodeRow.displayName = 'CodeRow';

// ─── Top Header ───────────────────────────────────────────────────────────────

interface HeaderProps { toggle: () => void; isDark: boolean; onMenuClick: () => void; }

const TopHeader = memo(({ toggle, isDark, onMenuClick }: HeaderProps) => (
  <header className="fixed top-0 left-0 right-0 z-40 h-14 border-b border-border bg-background/95 backdrop-blur-sm flex items-center px-4 gap-3">
    <button onClick={onMenuClick} className="md:hidden p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" aria-label="Toggle menu">
      <Menu className="w-5 h-5" />
    </button>
    <div className="flex items-center gap-2.5 flex-1 min-w-0">
      <div className="w-6 h-6 shrink-0 rounded-full bg-[hsl(var(--primary)/0.15)] border border-[hsl(var(--primary)/0.3)] flex items-center justify-center">
        <span className="w-2.5 h-2.5 rounded-full bg-[hsl(var(--primary))] animate-pulse" />
      </div>
      <span className="font-bold font-mono text-sm text-foreground truncate">react-loader-animate</span>
      <span className="hidden sm:inline-block shrink-0 text-xs font-mono bg-[hsl(var(--primary)/0.12)] text-[hsl(var(--primary))] border border-[hsl(var(--primary)/0.2)] px-2 py-0.5 rounded-full">
        v{PKG_VERSION}
      </span>
    </div>
    <nav className="flex items-center gap-1">
      <a href="https://www.npmjs.com/package/react-loader-animate" target="_blank" rel="noopener noreferrer"
         className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1.5 rounded-md hover:bg-muted">
        <Package className="w-3.5 h-3.5" /> npm
      </a>
      <a href="https://github.com/danhnhdeveloper308/react-loader-animate" target="_blank" rel="noopener noreferrer"
         className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1.5 rounded-md hover:bg-muted">
        <Github className="w-3.5 h-3.5" /> GitHub
      </a>
      <button onClick={toggle} className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" aria-label="Toggle theme">
        {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </button>
    </nav>
  </header>
));
TopHeader.displayName = 'TopHeader';

// ─── Sidebar ─────────────────────────────────────────────────────────────────

const DOCS_NAV = [
  { id: 'intro',    label: 'Introduction' },
  { id: 'install',  label: 'Installation' },
  { id: 'usage',    label: 'Usage' },
  { id: 'props',    label: 'Props Reference' },
  { id: 'tailwind', label: 'Tailwind Setup' },
];

interface SidebarProps {
  open: boolean;
  search: string;
  onSearch: (v: string) => void;
  selected: string | null;
  activeSection: string;
  onSelectLoader: (name: string) => void;
  onSelectSection: (id: string) => void;
}

const Sidebar = memo(({ open, search, onSearch, selected, activeSection, onSelectLoader, onSelectSection }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const toggle = useCallback((key: string) => setCollapsed(p => ({ ...p, [key]: !p[key] })), []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return null;
    return LOADER_REGISTRY.filter(l =>
      l.componentName.toLowerCase().includes(q) ||
      l.title.toLowerCase().includes(q) ||
      l.tags?.some(t => t.includes(q))
    );
  }, [search]);

  const categories: LoaderCategory[] = ['basic', 'split', 'advanced'];

  return (
    <aside className={`
      fixed md:sticky top-14 left-0 z-30
      flex flex-col w-64 shrink-0
      h-[calc(100vh-3.5rem)]
      bg-background border-r border-border
      transition-transform duration-200 ease-in-out
      ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
    `}>
      {/* Search */}
      <div className="p-3 border-b border-border shrink-0">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
          <input
            value={search}
            onChange={e => onSearch(e.target.value)}
            placeholder="Search loaders…"
            className="w-full pl-8 pr-7 py-1.5 rounded-md border border-border bg-muted/40 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))] transition-all"
          />
          {search && (
            <button onClick={() => onSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {filtered ? (
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-2 mb-2">
              {filtered.length} result{filtered.length !== 1 ? 's' : ''}
            </p>
            {filtered.map(entry => (
              <button key={entry.componentName} onClick={() => onSelectLoader(entry.componentName)}
                className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors block ${
                  selected === entry.componentName
                    ? 'bg-[hsl(var(--primary)/0.12)] text-[hsl(var(--primary))] font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {entry.componentName}
              </button>
            ))}
          </div>
        ) : (
          <>
            {/* Getting Started */}
            <div className="mb-3">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground px-2 pb-1.5">
                Getting Started
              </p>
              {DOCS_NAV.map(sec => (
                <button key={sec.id} onClick={() => onSelectSection(sec.id)}
                  className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors block ${
                    activeSection === sec.id && !selected
                      ? 'bg-[hsl(var(--primary)/0.12)] text-[hsl(var(--primary))] font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {sec.label}
                </button>
              ))}
            </div>

            {/* Component groups */}
            {categories.map(cat => {
              const items = LOADER_REGISTRY.filter(l => l.category === cat);
              const isCollapsed = collapsed[cat];
              const meta = CATEGORY_META[cat];
              return (
                <div key={cat} className="mb-2">
                  <button
                    onClick={() => toggle(cat)}
                    className="w-full flex items-center justify-between px-2 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted/50"
                  >
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: meta.color }} />
                      {meta.label}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="text-[9px] bg-muted px-1.5 py-0.5 rounded-full">{items.length}</span>
                      {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </span>
                  </button>
                  {!isCollapsed && items.map(entry => (
                    <button key={entry.componentName} onClick={() => onSelectLoader(entry.componentName)}
                      className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors block ${
                        selected === entry.componentName
                          ? 'bg-[hsl(var(--primary)/0.12)] text-[hsl(var(--primary))] font-medium'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      {entry.componentName}
                    </button>
                  ))}
                </div>
              );
            })}
          </>
        )}
      </nav>

      {/* Footer */}
      <div className="px-4 py-2.5 border-t border-border flex items-center gap-2 text-xs text-muted-foreground shrink-0">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
        <span>162+ components · MIT</span>
      </div>
    </aside>
  );
});
Sidebar.displayName = 'Sidebar';

// ─── Loader Detail View ───────────────────────────────────────────────────────

const PREVIEW_SIZES: Array<{ key: LoaderProps['size']; label: string }> = [
  { key: 'sm', label: 'sm' },
  { key: 'md', label: 'md' },
  { key: 'lg', label: 'lg' },
];

const PREVIEW_VARIANTS: Array<{ key: LoaderProps['variant']; label: string }> = [
  { key: 'primary', label: 'primary' },
  { key: 'accent',  label: 'accent'  },
  { key: 'success', label: 'success' },
  { key: 'warning', label: 'warning' },
];

const COMMON_PROPS = [
  { prop: 'size',              type: '"sm" | "md" | "lg"',                                  def: '"md"',     desc: 'Controls the display size' },
  { prop: 'variant',           type: '"primary" | "accent" | "success" | "warning"',         def: '"primary"', desc: 'Theme colour variant' },
  { prop: 'color',             type: 'string',                                              def: '—',        desc: 'CSS colour overrides variant' },
  { prop: 'animationDuration', type: 'number',                                              def: '1',        desc: 'Duration in seconds' },
  { prop: 'visible',           type: 'boolean',                                             def: 'true',     desc: 'Show/hide without unmounting' },
  { prop: 'ariaLabel',         type: 'string',                                              def: '"loading"', desc: 'Accessible label' },
  { prop: 'wrapperClass',      type: 'string',                                              def: '—',        desc: 'Extra class on wrapper div' },
  { prop: 'wrapperStyle',      type: 'React.CSSProperties',                                def: '—',        desc: 'Inline style on wrapper div' },
];

const LoaderDetail = memo(({ entry }: { entry: LoaderEntry }) => {
  const { Component, componentName, title, description, category } = entry;
  const [activeVariant, setActiveVariant] = useState<LoaderProps['variant']>('primary');
  const meta = CATEGORY_META[category];

  const importCode = `import { ${componentName} } from 'react-loader-animate';`;
  const basicCode  = `<${componentName} size="md" variant="primary" />`;
  const customCode = `<${componentName} color="#6366f1" size="lg" animationDuration={0.8} />`;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-xs text-muted-foreground mb-6 flex items-center gap-1.5 flex-wrap">
        <span>Components</span>
        <ChevronRight className="w-3 h-3" />
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: meta.color }} />
          {meta.label}
        </span>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground font-medium">{componentName}</span>
      </nav>

      {/* Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-1">{title}</h1>
        <p className="text-muted-foreground mb-3">{description}</p>
        <code className="inline-block text-xs font-mono bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] border border-[hsl(var(--primary)/0.2)] px-2.5 py-1 rounded-full">
          {componentName}
        </code>
      </div>

      {/* Live Preview */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Live Preview</h2>

        {/* Variant tabs */}
        <div className="flex flex-wrap gap-2 mb-5">
          {PREVIEW_VARIANTS.map(v => (
            <button key={v.key} onClick={() => setActiveVariant(v.key)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                activeVariant === v.key
                  ? 'border-[hsl(var(--primary)/0.5)] bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))]'
                  : 'border-border text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>

        {/* Sizes — CSS-variable override keeps loaders from re-rendering/restarting */}
        <div
          className="grid grid-cols-3 gap-4"
          style={activeVariant !== 'primary'
            ? ({ '--primary': `var(--${activeVariant})` } as React.CSSProperties)
            : undefined
          }
        >
          {PREVIEW_SIZES.map(({ key, label }) => (
            <div key={key} className="flex flex-col items-center gap-3">
              <div className="w-full h-28 flex items-center justify-center bg-muted/40 rounded-xl border border-border/50">
                <Component size={key} variant="primary" />
              </div>
              <span className="text-xs font-mono text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Code Snippets */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Code</h2>
        <div className="space-y-2">
          <div>
            <p className="text-[11px] text-muted-foreground mb-1.5 pl-1">Import</p>
            <CodeRow code={importCode} />
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground mb-1.5 pl-1">Basic usage</p>
            <CodeRow code={basicCode} />
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground mb-1.5 pl-1">Custom colour</p>
            <CodeRow code={customCode} />
          </div>
        </div>
      </section>

      {/* Props */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Props</h2>
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[600px]">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="text-left px-4 py-2.5 font-semibold text-foreground text-xs">Prop</th>
                  <th className="text-left px-4 py-2.5 font-semibold text-foreground text-xs">Type</th>
                  <th className="text-left px-4 py-2.5 font-semibold text-foreground text-xs">Default</th>
                  <th className="text-left px-4 py-2.5 font-semibold text-foreground text-xs">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {COMMON_PROPS.map(row => (
                  <tr key={row.prop} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-2.5 font-mono text-xs text-[hsl(var(--primary))]">{row.prop}</td>
                    <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{row.type}</td>
                    <td className="px-4 py-2.5 font-mono text-xs text-muted-foreground">{row.def}</td>
                    <td className="px-4 py-2.5 text-xs text-muted-foreground">{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
});
LoaderDetail.displayName = 'LoaderDetail';

// ─── Docs Content Sections ────────────────────────────────────────────────────

const IntroSection = memo(() => (
  <div className="max-w-3xl mx-auto px-6 py-10">
    <div className="mb-8">
      <div className="inline-flex items-center gap-2 text-xs font-mono bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] border border-[hsl(var(--primary)/0.2)] px-3 py-1.5 rounded-full mb-5">
        <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--primary))] animate-pulse" />
        v{PKG_VERSION} — 162+ components
      </div>
      <h1 className="text-4xl font-bold text-foreground mb-3 leading-tight">react-loader-animate</h1>
      <p className="text-lg text-muted-foreground leading-relaxed mb-6 max-w-xl">
        A comprehensive collection of 162+ beautiful, performance-optimized React loading animation components.
        TypeScript-first, Tailwind CSS powered, zero runtime dependencies.
      </p>
      <div className="flex flex-wrap gap-3">
        <a href="https://www.npmjs.com/package/react-loader-animate" target="_blank" rel="noopener noreferrer"
           className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] text-sm font-medium hover:opacity-90 transition-opacity">
          <Package className="w-4 h-4" /> npm package
        </a>
        <a href="https://github.com/danhnhdeveloper308/react-loader-animate" target="_blank" rel="noopener noreferrer"
           className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card text-foreground text-sm font-medium hover:bg-muted transition-colors">
          <Github className="w-4 h-4" /> GitHub
        </a>
      </div>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
      {[
        { label: '162+ Components', desc: 'Ready to use' },
        { label: 'TypeScript',     desc: 'Full type safety' },
        { label: 'Tree-shakeable', desc: 'Import only what you need' },
        { label: 'Zero deps',      desc: 'No runtime bloat' },
      ].map(f => (
        <div key={f.label} className="rounded-xl border border-border bg-card p-4 text-center">
          <p className="font-semibold text-foreground text-sm">{f.label}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{f.desc}</p>
        </div>
      ))}
    </div>

    <h2 className="text-base font-bold text-foreground mb-4">Quick Start</h2>
    <div className="space-y-2">
      <CodeRow code="npm install react-loader-animate" />
      <CodeRow code={`import { SpinLoader } from 'react-loader-animate';`} />
      <CodeRow code={`<SpinLoader size="md" variant="primary" />`} />
    </div>

    <div className="mt-8 p-4 rounded-xl bg-[hsl(var(--primary)/0.06)] border border-[hsl(var(--primary)/0.15)]">
      <p className="text-sm font-semibold text-foreground mb-1">👈 Browse components in the sidebar</p>
      <p className="text-xs text-muted-foreground">
        Click any loader name to see a live preview across all sizes and variants, plus ready-to-copy code snippets.
      </p>
    </div>
  </div>
));
IntroSection.displayName = 'IntroSection';

const InstallSection = memo(() => (
  <div className="max-w-3xl mx-auto px-6 py-10">
    <h1 className="text-3xl font-bold text-foreground mb-2">Installation</h1>
    <p className="text-muted-foreground mb-8">Install with your preferred package manager.</p>
    <div className="space-y-5">
      {[
        { label: 'npm',  code: 'npm install react-loader-animate' },
        { label: 'pnpm', code: 'pnpm add react-loader-animate' },
        { label: 'yarn', code: 'yarn add react-loader-animate' },
        { label: 'bun',  code: 'bun add react-loader-animate' },
      ].map(({ label, code }) => (
        <div key={label}>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">{label}</p>
          <CodeRow code={code} />
        </div>
      ))}
      <div className="mt-4 p-4 rounded-xl bg-[hsl(var(--primary)/0.06)] border border-[hsl(var(--primary)/0.15)]">
        <p className="text-sm font-semibold text-foreground mb-1">Peer Dependencies</p>
        <p className="text-xs text-muted-foreground">
          Requires <code className="font-mono">react ≥ 17</code> and <code className="font-mono">react-dom ≥ 17</code>
        </p>
      </div>
    </div>
  </div>
));
InstallSection.displayName = 'InstallSection';

const UsageSection = memo(() => (
  <div className="max-w-3xl mx-auto px-6 py-10">
    <h1 className="text-3xl font-bold text-foreground mb-2">Usage</h1>
    <p className="text-muted-foreground mb-8">Import and use any loader with a single line.</p>
    <div className="space-y-8">
      <div>
        <h2 className="text-base font-semibold text-foreground mb-3">Basic</h2>
        <CodeBlock code={`import { SpinLoader } from 'react-loader-animate';

export default function App() {
  return <SpinLoader size="md" variant="primary" />;
}`} />
      </div>
      <div>
        <h2 className="text-base font-semibold text-foreground mb-3">Custom Colour</h2>
        <div className="space-y-2">
          <CodeRow code={`<SpinLoader color="#6366f1" size="lg" />`} />
          <CodeRow code={`<DotsLoader color="rgb(99,102,241)" animationDuration={0.8} />`} />
        </div>
      </div>
      <div>
        <h2 className="text-base font-semibold text-foreground mb-3">Conditional Visibility</h2>
        <CodeRow code={`<SpinLoader visible={isLoading} />`} />
        <p className="text-xs text-muted-foreground mt-2">
          The <code className="font-mono">visible</code> prop hides the loader without unmounting — preventing layout shifts.
        </p>
      </div>
      <div>
        <h2 className="text-base font-semibold text-foreground mb-3">Import Multiple</h2>
        <CodeBlock code={`import {
  SpinLoader, DotsLoader, PulseLoader,
  WaveLoader, RingLoader, BarLoader,
} from 'react-loader-animate';`} />
      </div>
    </div>
  </div>
));
UsageSection.displayName = 'UsageSection';

const PropsSection = memo(() => (
  <div className="max-w-3xl mx-auto px-6 py-10">
    <h1 className="text-3xl font-bold text-foreground mb-2">Props Reference</h1>
    <p className="text-muted-foreground mb-8">All components share a consistent set of props.</p>
    <div className="rounded-xl border border-border overflow-hidden mb-6">
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[600px]">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th className="text-left px-4 py-3 font-semibold text-foreground text-xs">Prop</th>
              <th className="text-left px-4 py-3 font-semibold text-foreground text-xs">Type</th>
              <th className="text-left px-4 py-3 font-semibold text-foreground text-xs">Default</th>
              <th className="text-left px-4 py-3 font-semibold text-foreground text-xs">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {[
              { prop: 'size',              type: '"sm" | "md" | "lg"',                             def: '"md"',      desc: 'Controls the display size' },
              { prop: 'variant',           type: '"primary" | "accent" | "success" | "warning"',   def: '"primary"', desc: 'Theme colour variant' },
              { prop: 'color',             type: 'string',                                         def: '—',         desc: 'CSS colour, overrides variant' },
              { prop: 'animationDuration', type: 'number',                                         def: '1',         desc: 'Duration in seconds' },
              { prop: 'visible',           type: 'boolean',                                        def: 'true',      desc: 'Show/hide without unmounting' },
              { prop: 'ariaLabel',         type: 'string',                                         def: '"loading"', desc: 'Accessible label' },
              { prop: 'wrapperClass',      type: 'string',                                         def: '—',         desc: 'Extra class on wrapper' },
              { prop: 'wrapperStyle',      type: 'React.CSSProperties',                            def: '—',         desc: 'Inline style on wrapper' },
            ].map(row => (
              <tr key={row.prop} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-[hsl(var(--primary))]">{row.prop}</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{row.type}</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{row.def}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{row.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <div className="p-4 rounded-xl bg-[hsl(var(--primary)/0.06)] border border-[hsl(var(--primary)/0.15)]">
      <p className="text-sm font-semibold text-foreground mb-1">Advanced Props</p>
      <p className="text-xs text-muted-foreground">
        Some loaders (e.g. <code className="font-mono">ColorRingLoader</code>, <code className="font-mono">Grid3x3Loader</code>)
        also accept <code className="font-mono">colors: string[]</code>, <code className="font-mono">strokeWidth: number</code>, and other component-specific props.
      </p>
    </div>
  </div>
));
PropsSection.displayName = 'PropsSection';

const TailwindSection = memo(() => (
  <div className="max-w-3xl mx-auto px-6 py-10">
    <h1 className="text-3xl font-bold text-foreground mb-2">Tailwind Setup</h1>
    <p className="text-muted-foreground mb-8">
      The library ships a Tailwind CSS preset with all required keyframes and utilities.
    </p>
    <div className="space-y-8">
      <div>
        <h2 className="text-base font-semibold text-foreground mb-3">1. Add the preset</h2>
        <CodeBlock code={`// tailwind.config.js
const { rlaPreset } = require('react-loader-animate/preset');

module.exports = {
  presets: [rlaPreset],
  // ...rest of your config
};`} />
      </div>
      <div>
        <h2 className="text-base font-semibold text-foreground mb-3">2. Import CSS (alternative)</h2>
        <p className="text-xs text-muted-foreground mb-2">If you are not using Tailwind, import the bundled CSS:</p>
        <CodeRow code={`import 'react-loader-animate/dist/index.css';`} />
      </div>
      <div>
        <h2 className="text-base font-semibold text-foreground mb-3">3. Define CSS variables</h2>
        <p className="text-xs text-muted-foreground mb-2">Add these to your base styles for theme colours to work:</p>
        <CodeBlock code={`:root {
  --primary: 260 84% 55%;
  --accent:  12 76% 61%;
  --success: 142 71% 45%;
  --warning: 38 92% 50%;
}`} />
      </div>
      <div className="p-4 rounded-xl bg-[hsl(var(--warning)/0.08)] border border-[hsl(var(--warning)/0.2)]">
        <p className="text-sm font-semibold text-foreground mb-1">⚠️ Note</p>
        <p className="text-xs text-muted-foreground">
          CSS variable values are HSL channels without the <code className="font-mono">hsl()</code> wrapper,
          used as <code className="font-mono">hsl(var(--primary))</code> in components.
        </p>
      </div>
    </div>
  </div>
));
TailwindSection.displayName = 'TailwindSection';

const DocsSection = memo(({ id }: { id: string }) => {
  switch (id) {
    case 'install':  return <InstallSection />;
    case 'usage':    return <UsageSection />;
    case 'props':    return <PropsSection />;
    case 'tailwind': return <TailwindSection />;
    default:         return <IntroSection />;
  }
});
DocsSection.displayName = 'DocsSection';

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DocsPage() {
  const { toggle, isDark } = useTheme();
  const [selected, setSelected] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('intro');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState('');
  const mainRef = useRef<HTMLDivElement>(null);

  const selectedEntry = useMemo(
    () => (selected ? LOADER_REGISTRY.find(l => l.componentName === selected) ?? null : null),
    [selected]
  );

  const handleSelectLoader = useCallback((name: string) => {
    setSelected(name);
    setActiveSection('');
    setSidebarOpen(false);
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSelectSection = useCallback((id: string) => {
    setActiveSection(id);
    setSelected(null);
    setSidebarOpen(false);
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="h-screen overflow-hidden bg-background">
      <TopHeader toggle={toggle} isDark={isDark} onMenuClick={() => setSidebarOpen(o => !o)} />

      <div className="flex h-full pt-14">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/50 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <Sidebar
          open={sidebarOpen}
          search={search}
          onSearch={setSearch}
          selected={selected}
          activeSection={activeSection}
          onSelectLoader={handleSelectLoader}
          onSelectSection={handleSelectSection}
        />

        {/* Main content */}
        <main ref={mainRef} className="flex-1 overflow-y-auto">
          {selectedEntry ? (
            <LoaderDetail entry={selectedEntry} />
          ) : (
            <DocsSection id={activeSection} />
          )}
        </main>
      </div>
    </div>
  );
}
