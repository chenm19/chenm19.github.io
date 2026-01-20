import { useEffect, useMemo, useRef, useState } from "react";
import clustersData from "../../data/atn_clusters.json";

type Stage5 = "CN" | "SMC" | "EMCI" | "LEMCI" | "AD";
type Stage3 = "CN" | "MCI" | "AD";

interface PatientClusterResult {
  ptid: string;
  a: number;
  t: number;
  n: number;
  stage5: Stage5;
  stage3: Stage3;
  posterior: Record<Stage5, number>;
}

type Props = {
  highlightPtid?: string;
};

const rawClusters = clustersData as PatientClusterResult[];

const clusters: PatientClusterResult[] = rawClusters.map(r => ({
  ...r,
  a: Number(r.a),
  t: Number(r.t),
  n: Number(r.n),
}));

const stage5Order: Stage5[] = ["CN", "SMC", "EMCI", "LEMCI", "AD"];

function clamp01(x: number) {
  return Math.max(0, Math.min(1, x));
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  const v = parseInt(h.length === 3 ? h.split("").map(c => c + c).join("") : h, 16);
  return { r: (v >> 16) & 255, g: (v >> 8) & 255, b: v & 255 };
}

function rgbToCss(r: number, g: number, b: number, a = 1) {
  return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${a})`;
}

/**
 * Continuous severity in [0,1] from posterior:
 * expected stage index / 4.
 */
function severityFromPosterior(posterior: Record<Stage5, number>): number {
  let expected = 0;
  for (let i = 0; i < stage5Order.length; i += 1) {
    const k = stage5Order[i];
    expected += (posterior[k] ?? 0) * i;
  }
  return clamp01(expected / 4);
}

type Bounds = {
  minA: number;
  maxA: number;
  minT: number;
  maxT: number;
  minN: number;
  maxN: number;
};

function percentile(values: number[], p: number) {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const idx = (sorted.length - 1) * p;
  const lo = Math.floor(idx);
  const hi = Math.ceil(idx);
  if (lo === hi) return sorted[lo];
  const t = idx - lo;
  return sorted[lo] * (1 - t) + sorted[hi] * t;
}

function computeBounds(points: PatientClusterResult[]): Bounds {
  const a = points.map(p => p.a);
  const t = points.map(p => p.t);
  const n = points.map(p => p.n);

  // Robust bounds: ignore extreme outliers for visualization scaling
  const pLo = 0.05;
  const pHi = 0.95;

  return {
    minA: percentile(a, pLo),
    maxA: percentile(a, pHi),
    minT: percentile(t, pLo),
    maxT: percentile(t, pHi),
    minN: percentile(n, pLo),
    maxN: percentile(n, pHi),
  };
}

function normalize(v: number, min: number, max: number) {
  if (max - min < 1e-9) return 0;
  const vv = clamp(v, min, max);
  // map to [-1, 1]
  return ((vv - min) / (max - min)) * 2 - 1;
}

type ProjectedPoint = {
  ptid: string;
  x: number;
  y: number;
  z: number;
  px: number;
  py: number;
  depth: number;
  severity: number;
  stage3: Stage3;
  stage5: Stage5;
  a: number;
  t: number;
  n: number;
};

function rotateY(x: number, z: number, angle: number) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return { x: x * c + z * s, z: -x * s + z * c };
}

function rotateX(y: number, z: number, angle: number) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return { y: y * c - z * s, z: y * s + z * c };
}

export default function ATNClusteringPanel({ highlightPtid }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const bounds = useMemo(() => computeBounds(clusters), []);
  const total = clusters.length;

  const stage3Counts: Record<Stage3, number> = useMemo(() => {
    const counts: Record<Stage3, number> = { CN: 0, MCI: 0, AD: 0 };
    clusters.forEach(r => {
      counts[r.stage3] += 1;
    });
    return counts;
  }, []);

  // zoom + pan for dense clusters
  const [zoom, setZoom] = useState(1.0);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const isPanningRef = useRef(false);
  const lastMouseRef = useRef<{ x: number; y: number } | null>(null);

  const [hovered, setHovered] = useState<ProjectedPoint | null>(null);
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number } | null>(null);

  const projected = useMemo(() => {
    // fixed angles (stable + reproducible)
    const angleY = -0.7;
    const angleX = 0.45;

    return clusters.map(p => {
      const nx = normalize(p.a, bounds.minA, bounds.maxA);
      const ny = normalize(p.t, bounds.minT, bounds.maxT);
      const nz = normalize(p.n, bounds.minN, bounds.maxN);

      // rotate in 3D
      const ry = rotateY(nx, nz, angleY);
      const rx = rotateX(ny, ry.z, angleX);

      return {
        ptid: p.ptid,
        x: ry.x,
        y: rx.y,
        z: rx.z,
        px: 0,
        py: 0,
        depth: 0,
        severity: severityFromPosterior(p.posterior),
        stage3: p.stage3,
        stage5: p.stage5,
        a: p.a,
        t: p.t,
        n: p.n,
      } satisfies ProjectedPoint;
    });
  }, [bounds]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const blue = hexToRgb("#2563eb");
    const red = hexToRgb("#ef4444");

    // projection settings (tune more to reduce center pile-up and use card space)
    const depth = 3.6;   // weaker perspective and less center pile-up
    const push = 1.55;   // stronger radial spread

    const computePts = (w: number, h: number): ProjectedPoint[] => {
      const scale = Math.min(w, h) * 0.58; // fill more space
      const cx = w / 2;
      const cy = h / 2;

      const pts: ProjectedPoint[] = projected.map(p => {
        const persp = 1 / (depth - p.z * 0.7);

        const px0 = cx + p.x * scale * persp;
        const py0 = cy - p.y * scale * persp;

        // radial push from center
        const rx = px0 - cx;
        const ry = py0 - cy;

        // apply zoom + pan in screen space
        const px = cx + rx * push * zoom + pan.x;
        const py = cy + ry * push * zoom + pan.y;

        return { ...p, px, py, depth: persp };
      });

      // back-to-front for cleaner overlap
      pts.sort((a, b) => a.depth - b.depth);
      return pts;
    };

    const draw = (w: number, h: number) => {
      ctx.clearRect(0, 0, w, h);

      // card provides background
      ctx.save();
      ctx.globalAlpha = 1;
      ctx.fillStyle = "rgba(2, 6, 23, 0)";
      ctx.fillRect(0, 0, w, h);
      ctx.restore();

      const pts = computePts(w, h);

      // draw points
      for (const p of pts) {
        const sev = clamp01(p.severity);
        const r = lerp(blue.r, red.r, sev);
        const g = lerp(blue.g, red.g, sev);
        const b = lerp(blue.b, red.b, sev);

        const alpha = lerp(0.20, 0.85, sev);
        const radius = lerp(2.8, 5.2, p.depth) * lerp(0.9, 1.2, sev);

        ctx.beginPath();
        ctx.fillStyle = rgbToCss(r, g, b, alpha);
        ctx.arc(p.px, p.py, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // highlight model-selected nearest point (cyan ring)
      if (highlightPtid) {
        const chosen = pts.find(p => p.ptid === highlightPtid);
        if (chosen) {
          ctx.beginPath();
          ctx.strokeStyle = "rgba(34, 211, 238, 0.95)";
          ctx.lineWidth = 2.5;
          ctx.arc(chosen.px, chosen.py, 11, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // hovered ring wins on top
      if (hovered) {
        const match = pts.find(p => p.ptid === hovered.ptid);
        if (match) {
          ctx.beginPath();
          ctx.strokeStyle = "rgba(226, 232, 240, 0.95)";
          ctx.lineWidth = 2;
          ctx.arc(match.px, match.py, 8, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = parent.clientWidth;
      const h = parent.clientHeight;

      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(w, h);
    };

    const redraw = () => {
      const p = canvas.parentElement;
      if (!p) return;
      draw(p.clientWidth, p.clientHeight);
    };

    const handleMove = (e: MouseEvent) => {
      if (isPanningRef.current && lastMouseRef.current) return;

      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      const w = rect.width;
      const h = rect.height;

      const pts = computePts(w, h);

      let best: ProjectedPoint | null = null;
      let bestD2 = Infinity;

      for (const p of pts) {
        const dx = mx - p.px;
        const dy = my - p.py;
        const d2 = dx * dx + dy * dy;

        if (d2 < bestD2) {
          bestD2 = d2;
          best = p;
        }
      }

      // hover threshold (screen space)
      if (best && bestD2 < 120) {
        setHovered(best);
        setHoverPos({ x: mx + 12, y: my + 12 });
      } else {
        setHovered(null);
        setHoverPos(null);
      }

      redraw();
    };

    const handleLeave = () => {
      setHovered(null);
      setHoverPos(null);
      redraw();
    };

    // wheel zoom (centered around current view; simplest + stable)
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const next = clamp(zoom * (e.deltaY > 0 ? 0.92 : 1.08), 0.6, 6);
      setZoom(next);
    };

    // drag pan
    const handleDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      isPanningRef.current = true;
      lastMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleUp = () => {
      isPanningRef.current = false;
      lastMouseRef.current = null;
    };

    const handlePanMove = (e: MouseEvent) => {
      if (!isPanningRef.current || !lastMouseRef.current) return;

      const dx = e.clientX - lastMouseRef.current.x;
      const dy = e.clientY - lastMouseRef.current.y;

      lastMouseRef.current = { x: e.clientX, y: e.clientY };
      setPan(prev => ({ x: prev.x + dx, y: prev.y + dy }));
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseleave", handleLeave);

    canvas.addEventListener("wheel", handleWheel, { passive: false });
    canvas.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("mousemove", handlePanMove);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseleave", handleLeave);

      canvas.removeEventListener("wheel", handleWheel);
      canvas.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("mousemove", handlePanMove);
    };
  }, [projected, hovered, highlightPtid, zoom, pan]);

  const resetView = () => {
    setZoom(1.0);
    setPan({ x: 0, y: 0 });
  };

  return (
    <div className="mt-10 space-y-4">
      <div className="space-y-2">
        <h2 className="text-lg md:text-xl font-semibold">Unsupervised ATN Clustering (preview)</h2>
        <p className="text-slate-300 text-sm max-w-2xl">
          This section uses a Gaussian Mixture Model (GMM) fit on the ATN matrix to assign each ADNI participant to one of five latent clusters behind the scenes before collapsing them into three visible stages (CN / MCI / AD).
        </p>
        <p className="text-[11px] text-slate-500">
          Tip: scroll, zoom, and pan to navigate. This visualization has robust scaling to avoid outlier compression.
        </p>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-sm">
        <p className="text-slate-200">
          <span className="font-medium">Total participants:</span> {total}
        </p>
        <p className="text-slate-200 mt-1">
          <span className="font-medium">Collapsed stages:</span>{" "}
          CN = {stage3Counts.CN}, MCI = {stage3Counts.MCI}, AD = {stage3Counts.AD}
        </p>
      </div>

      <div className="relative h-72 md:h-80 bg-slate-900/80 border border-slate-800 rounded-xl p-3 overflow-hidden">
        <canvas ref={canvasRef} className="block w-full h-full" />

        {hovered && hoverPos && (
          <div
            className="pointer-events-none absolute z-10 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs shadow-lg"
            style={{ left: hoverPos.x, top: hoverPos.y }}
          >
            <div className="font-semibold text-slate-100 mb-1">Participant: {hovered.ptid}</div>
            <div className="text-slate-300">
              Stage: {hovered.stage3} ({hovered.stage5})
            </div>
            <div className="text-slate-400 mt-1">
              A: {hovered.a.toFixed(3)}
              <br />
              T: {hovered.t.toFixed(3)}
              <br />
              N: {hovered.n.toFixed(3)}
            </div>
          </div>
        )}

        <div className="absolute right-3 top-3 text-[11px] text-slate-300 bg-slate-950/60 border border-slate-800 rounded-lg px-2 py-1">
          Blue → Red severity (continuous)
        </div>

        <button
          type="button"
          onClick={resetView}
          className="absolute left-3 top-3 text-[11px] text-slate-300 bg-slate-950/60 border border-slate-800 rounded-lg px-2 py-1 hover:bg-slate-950/80"
        >
          Reset view
        </button>
      </div>
    </div>
  );
}
