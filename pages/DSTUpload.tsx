import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Upload, FileCode2, X, Info, Layers, Zap, CheckCircle2, AlertTriangle, Download } from 'lucide-react';

// ────────────────────────────────────────────────────────────────────────────────
// DST Binary Parser
// Based on the Tajima DST specification (3-byte stitch records after 512-byte header)
// get_x / get_y logic sourced from grblHAL/Plugin_embroidery tajima.c
// ────────────────────────────────────────────────────────────────────────────────

type StitchType = 'STITCH' | 'JUMP' | 'COLOR_CHANGE' | 'END';

interface StitchRecord {
  x: number;
  y: number;
  type: StitchType;
}

interface DSTInfo {
  label: string;
  stitchCount: number;
  colorChanges: number;
  jumps: number;
  widthMm: number;
  heightMm: number;
  stitches: StitchRecord[];
  colors: string[];
}

function bit(n: number): number {
  return 1 << n;
}

function getX(b2: number, b1: number, b0: number): number {
  let x = 0;
  if (b2 & bit(2)) x += 81;
  if (b2 & bit(3)) x -= 81;
  if (b1 & bit(2)) x += 27;
  if (b1 & bit(3)) x -= 27;
  if (b0 & bit(2)) x += 9;
  if (b0 & bit(3)) x -= 9;
  if (b1 & bit(0)) x += 3;
  if (b1 & bit(1)) x -= 3;
  if (b0 & bit(0)) x += 1;
  if (b0 & bit(1)) x -= 1;
  return x;
}

function getY(b2: number, b1: number, b0: number): number {
  let y = 0;
  if (b2 & bit(5)) y += 81;
  if (b2 & bit(4)) y -= 81;
  if (b1 & bit(5)) y += 27;
  if (b1 & bit(4)) y -= 27;
  if (b0 & bit(5)) y += 9;
  if (b0 & bit(4)) y -= 9;
  if (b1 & bit(7)) y += 3;
  if (b1 & bit(6)) y -= 3;
  if (b0 & bit(7)) y += 1;
  if (b0 & bit(6)) y -= 1;
  return y;
}

// Palette of thread-like colours assigned per colour section
const THREAD_PALETTE = [
  '#e11d48', '#7c3aed', '#0ea5e9', '#16a34a',
  '#ea580c', '#db2777', '#65a30d', '#0891b2',
  '#c026d3', '#d97706', '#4f46e5', '#dc2626',
];

function parseDST(buffer: ArrayBuffer): DSTInfo {
  const bytes = new Uint8Array(buffer);

  // ── Header: first 512 bytes (ASCII) ──
  const headerBytes = bytes.slice(0, 512);
  const decoder = new TextDecoder('ascii', { fatal: false });
  const headerText = decoder.decode(headerBytes);

  // Extract label from header (starts with "LA:")
  let label = 'Untitled Design';
  const laMatch = headerText.match(/LA:(.+?)[\r\n\x00]/);
  if (laMatch) label = laMatch[1].trim();

  // ── Stitch data: bytes from 512 onwards, in 3-byte records ──
  const stitches: StitchRecord[] = [];
  let curX = 0;
  let curY = 0;
  let stitchCount = 0;
  let colorChanges = 0;
  let jumps = 0;
  let colorIndex = 0;
  const colors: string[] = [THREAD_PALETTE[0]];

  let minX = Infinity, maxX = -Infinity;
  let minY = Infinity, maxY = -Infinity;

  for (let i = 512; i + 2 < bytes.length; i += 3) {
    const b0 = bytes[i];
    const b1 = bytes[i + 1];
    const b2 = bytes[i + 2];

    // End-of-pattern check: 0x00 0x00 0xF3
    if ((b2 & 0b11110011) === 0b11110011) break;

    const dx = getX(b2, b1, b0);
    const dy = getY(b2, b1, b0);

    // Flags are in b2:
    //   bits 7,6 set  → color change / stop
    //   bits 3,2 set  → jump
    const isStop = (b2 & 0xC0) === 0xC0;   // bits 7 & 6
    const isJump = (b2 & 0x0C) === 0x0C;   // bits 3 & 2

    curX += dx;
    curY += dy; // DST y-axis is inverted relative to screen; we'll flip when drawing

    if (isStop) {
      colorIndex = (colorIndex + 1) % THREAD_PALETTE.length;
      colors.push(THREAD_PALETTE[colorIndex]);
      colorChanges++;
      stitches.push({ x: curX, y: curY, type: 'COLOR_CHANGE' });
    } else if (isJump) {
      jumps++;
      stitches.push({ x: curX, y: curY, type: 'JUMP' });
    } else {
      stitchCount++;
      stitches.push({ x: curX, y: curY, type: 'STITCH' });

      if (curX < minX) minX = curX;
      if (curX > maxX) maxX = curX;
      if (curY < minY) minY = curY;
      if (curY > maxY) maxY = curY;
    }
  }

  // DST uses 0.1 mm units
  const widthMm = minX === Infinity ? 0 : (maxX - minX) / 10;
  const heightMm = minY === Infinity ? 0 : (maxY - minY) / 10;

  return { label, stitchCount, colorChanges, jumps, widthMm, heightMm, stitches, colors };
}

// ────────────────────────────────────────────────────────────────────────────────
// Canvas Renderer
// ────────────────────────────────────────────────────────────────────────────────

function renderToCanvas(canvas: HTMLCanvasElement, info: DSTInfo) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const { stitches } = info;
  if (stitches.length === 0) return;

  // Compute bounds from stitches
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (const s of stitches) {
    if (s.type === 'STITCH' || s.type === 'JUMP') {
      if (s.x < minX) minX = s.x;
      if (s.x > maxX) maxX = s.x;
      if (s.y < minY) minY = s.y;
      if (s.y > maxY) maxY = s.y;
    }
  }

  const w = canvas.width;
  const h = canvas.height;
  const padding = 20;

  const designW = maxX - minX || 1;
  const designH = maxY - minY || 1;
  const scale = Math.min((w - padding * 2) / designW, (h - padding * 2) / designH);

  const offsetX = padding + (w - padding * 2 - designW * scale) / 2;
  const offsetY = padding + (h - padding * 2 - designH * scale) / 2;

  const toCanvas = (x: number, y: number) => ({
    cx: offsetX + (x - minX) * scale,
    // flip Y: DST Y grows downward, canvas Y also grows downward, but design looks better flipped
    cy: h - offsetY - (y - minY) * scale,
  });

  // Clear
  ctx.clearRect(0, 0, w, h);

  // Draw background
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, w, h);

  let colorIndex = 0;
  let currentColor = info.colors[0] || '#e11d48';

  let prevX: number | null = null;
  let prevY: number | null = null;

  for (const stitch of stitches) {
    if (stitch.type === 'COLOR_CHANGE') {
      colorIndex++;
      currentColor = info.colors[colorIndex] || THREAD_PALETTE[colorIndex % THREAD_PALETTE.length];
      prevX = null;
      prevY = null;
      continue;
    }

    const { cx, cy } = toCanvas(stitch.x, stitch.y);

    if (stitch.type === 'JUMP') {
      prevX = cx;
      prevY = cy;
      continue;
    }

    // STITCH
    if (prevX !== null && prevY !== null) {
      ctx.beginPath();
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(cx, cy);
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.9;
      ctx.stroke();
    }

    prevX = cx;
    prevY = cy;
  }

  ctx.globalAlpha = 1;
}

// ────────────────────────────────────────────────────────────────────────────────
// Component
// ────────────────────────────────────────────────────────────────────────────────

export const DSTUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [dstInfo, setDstInfo] = useState<DSTInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [fileName, setFileName] = useState<string>('');
  const [fileSize, setFileSize] = useState<number>(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (dstInfo && canvasRef.current) {
      renderToCanvas(canvasRef.current, dstInfo);
    }
  }, [dstInfo]);

  const processFile = useCallback(async (file: File) => {
    if (!file.name.toLowerCase().endsWith('.dst')) {
      setError('Please upload a valid .dst embroidery file.');
      return;
    }

    setIsProcessing(true);
    setError(null);
    setDstInfo(null);
    setFileName(file.name);
    setFileSize(file.size);

    try {
      const buffer = await file.arrayBuffer();
      const info = parseDST(buffer);
      setDstInfo(info);
    } catch (e) {
      setError('Failed to parse DST file. The file may be corrupt or in an unsupported variant.');
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, [processFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const clearFile = () => {
    setDstInfo(null);
    setError(null);
    setFileName('');
    setFileSize(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    return `${(bytes / 1024).toFixed(1)} KB`;
  };

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-200 overflow-hidden">

      {/* Animated gradient background */}
      <div
        className="absolute inset-0 opacity-25 dark:opacity-15 animate-gradient-wave"
        style={{
          background: 'linear-gradient(135deg, #fda4af 0%, #c084fc 25%, #5eead4 50%, #fb923c 75%, #fda4af 100%)',
          backgroundSize: '400% 400%',
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-0 dark:opacity-10 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: 'linear-gradient(rgba(251,113,133,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(251,113,133,0.3) 1px,transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-rose-400/40 to-violet-400/40 dark:from-rose-400/20 dark:to-violet-400/20 animate-float-up"
            style={{
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              left: `${Math.random() * 100}%`,
              bottom: '-20px',
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${Math.random() * 4 + 6}s`,
            }}
          />
        ))}
      </div>

      {/* Glow pulses */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-radial from-violet-400/20 to-transparent blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-gradient-radial from-rose-400/20 to-transparent blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 text-rose-500 font-bold tracking-widest uppercase text-xs bg-rose-50 dark:bg-rose-900/20 px-4 py-2 rounded-full mb-4">
            <FileCode2 className="w-3.5 h-3.5" />
            Embroidery Machine Code
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
            DST File <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-violet-600">Uploader</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Upload your Tajima DST embroidery machine file to preview the stitch pattern,
            analyse design statistics, and prepare it for production.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">

          {/* Left: Upload + Info */}
          <div className="space-y-6">

            {/* Upload Zone */}
            {!dstInfo && (
              <div
                id="dst-upload-zone"
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`
                  relative cursor-pointer group rounded-3xl border-2 border-dashed p-12 text-center
                  transition-all duration-300 overflow-hidden
                  ${isDragging
                    ? 'border-rose-400 bg-rose-50 dark:bg-rose-900/20 scale-[1.01]'
                    : 'border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/70 hover:border-rose-400 hover:bg-rose-50/30 dark:hover:bg-rose-900/10'
                  }
                  backdrop-blur-xl shadow-xl
                `}
              >
                {/* Animated glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-violet-500/5 rounded-3xl" />
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".dst"
                  onChange={handleFileChange}
                  className="hidden"
                  id="dst-file-input"
                />

                <div className={`mx-auto w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
                  isDragging
                    ? 'bg-rose-100 dark:bg-rose-900/40 scale-110'
                    : 'bg-gradient-to-br from-rose-100 to-violet-100 dark:from-rose-900/30 dark:to-violet-900/30 group-hover:scale-110'
                }`}>
                  {isProcessing ? (
                    <div className="w-8 h-8 border-4 border-rose-400 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Upload className={`w-10 h-10 transition-colors ${isDragging ? 'text-rose-500' : 'text-rose-400 group-hover:text-rose-500'}`} />
                  )}
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {isProcessing ? 'Parsing DST file…' : 'Drop your DST file here'}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
                  or click to browse — <span className="font-semibold text-rose-500">.dst</span> files only
                </p>

                {/* Machine format info pills */}
                <div className="flex flex-wrap justify-center gap-2">
                  {['Tajima', 'Machine Code', 'Binary Format', 'v1.0'].map((tag) => (
                    <span key={tag} className="text-xs font-medium px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 animate-fade-in">
                <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-red-700 dark:text-red-400">Parse Error</p>
                  <p className="text-sm text-red-600 dark:text-red-500 mt-0.5">{error}</p>
                </div>
                <button onClick={() => setError(null)} className="ml-auto text-red-400 hover:text-red-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* File Info Card */}
            {dstInfo && (
              <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden animate-fade-in">

                {/* Card header */}
                <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-rose-50/50 to-violet-50/50 dark:from-rose-900/10 dark:to-violet-900/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-violet-600 flex items-center justify-center shadow-lg shadow-rose-500/20">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-rose-500 uppercase tracking-wider">DST Parsed</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-[200px]">{fileName}</p>
                    </div>
                  </div>
                  <button
                    onClick={clearFile}
                    className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                    title="Remove file"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Design name */}
                <div className="px-5 pt-5 pb-3">
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider mb-1">Design Label</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{dstInfo.label}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{formatSize(fileSize)}</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 px-5 pb-5">
                  {[
                    {
                      icon: <Layers className="w-4 h-4" />,
                      label: 'Stitches',
                      value: dstInfo.stitchCount.toLocaleString(),
                      color: 'rose',
                    },
                    {
                      icon: <Zap className="w-4 h-4" />,
                      label: 'Color Changes',
                      value: dstInfo.colorChanges.toString(),
                      color: 'violet',
                    },
                    {
                      icon: <Info className="w-4 h-4" />,
                      label: 'Width',
                      value: `${dstInfo.widthMm.toFixed(1)} mm`,
                      color: 'teal',
                    },
                    {
                      icon: <Info className="w-4 h-4" />,
                      label: 'Height',
                      value: `${dstInfo.heightMm.toFixed(1)} mm`,
                      color: 'orange',
                    },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className={`p-4 rounded-2xl bg-${stat.color}-50 dark:bg-${stat.color}-900/20 border border-${stat.color}-100 dark:border-${stat.color}-800/40`}
                    >
                      <div className={`text-${stat.color}-500 mb-1`}>{stat.icon}</div>
                      <p className={`text-2xl font-extrabold text-${stat.color}-600 dark:text-${stat.color}-400`}>{stat.value}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Thread Colors */}
                {dstInfo.colors.length > 0 && (
                  <div className="px-5 pb-5">
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                      Thread Colour Sequence ({dstInfo.colors.length})
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {dstInfo.colors.map((color, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                        >
                          <span
                            className="w-3 h-3 rounded-full shadow-sm"
                            style={{ backgroundColor: color }}
                          />
                          <span className="text-xs font-mono text-slate-600 dark:text-slate-300">{color}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Upload Another */}
                <div className="px-5 pb-5">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-500 to-violet-600 text-white font-bold text-sm hover:from-rose-600 hover:to-violet-700 transition-all shadow-lg shadow-rose-500/20 active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Upload Another DST File
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".dst"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>
            )}

            {/* Info Card when no file */}
            {!dstInfo && (
              <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-3xl border border-slate-100 dark:border-slate-800 p-6 shadow-lg">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <Info className="w-4 h-4 text-rose-500" />
                  What is a DST file?
                </h3>
                <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                  {[
                    'The Tajima DST (Data Stitch Tajima) format is the industry-standard machine code for embroidery machines.',
                    'Files contain a 512-byte header with metadata and binary stitch records (3 bytes each).',
                    'Each record encodes relative X/Y needle movement and flags for stitches, jumps, and colour changes.',
                    'DST does not store actual thread colours; the colour sequence shown is a default palette.',
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right: Canvas Preview */}
          <div className="space-y-4">
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden">
              <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Stitch Preview</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                    {dstInfo ? dstInfo.label : 'Upload a DST file to preview'}
                  </p>
                </div>
                {dstInfo && (
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live Preview
                  </span>
                )}
              </div>

              <div className="relative">
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={500}
                  className="w-full rounded-b-3xl"
                  style={{ background: '#0f172a' }}
                />

                {/* Empty state overlay */}
                {!dstInfo && !isProcessing && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <div className="w-20 h-20 rounded-2xl bg-slate-800/60 flex items-center justify-center mb-4">
                      <FileCode2 className="w-10 h-10 text-slate-600" />
                    </div>
                    <p className="text-slate-500 text-sm font-medium">Stitch pattern will appear here</p>
                  </div>
                )}

                {/* Processing overlay */}
                {isProcessing && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-sm">
                    <div className="w-12 h-12 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mb-4" />
                    <p className="text-white text-sm font-medium">Parsing binary stitch data…</p>
                  </div>
                )}
              </div>
            </div>

            {/* Legend */}
            {dstInfo && (
              <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-100 dark:border-slate-800 p-4 shadow-lg animate-fade-in">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Legend</p>
                <div className="flex flex-wrap gap-4">
                  {[
                    { color: '#e11d48', label: 'Normal Stitches' },
                    { color: '#6366f1', label: 'Jump Moves (not shown)' },
                    { color: '#f59e0b', label: 'Colour Sections' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                      <span className="w-4 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-xs text-slate-600 dark:text-slate-400">{item.label}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-400 mt-3">
                  Zoom: {((Math.max(dstInfo.widthMm, dstInfo.heightMm) / 100) || 1).toFixed(2)}× scale — coordinates in 0.1mm units
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
