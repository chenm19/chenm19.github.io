import { useEffect, useMemo, useState } from "react";
import clustersData from "../../data/atn_clusters.json";
import type { ATNInput } from "../../inference/types";
import type { EngineId } from "../../inference/infer";

type Props = {
  initial?: ATNInput;
  engine: EngineId;
  onChange: (input: ATNInput) => void;
};

type ClusterRow = { a: number; t: number; n: number };

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function minOf(values: number[]) {
  return values.reduce((m, v) => Math.min(m, v), Number.POSITIVE_INFINITY);
}

function maxOf(values: number[]) {
  return values.reduce((m, v) => Math.max(m, v), Number.NEGATIVE_INFINITY);
}

function useDebouncedValue<T>(value: T, delayMs: number) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), delayMs);
    return () => window.clearTimeout(id);
  }, [value, delayMs]);

  return debounced;
}

export default function InferenceInputCard({ initial, engine, onChange }: Props) {
  const bounds = useMemo(() => {
    const rows = clustersData as ClusterRow[];

    const aVals = rows.map((r) => Number(r.a)).filter((v) => Number.isFinite(v));
    const tVals = rows.map((r) => Number(r.t)).filter((v) => Number.isFinite(v));
    const nVals = rows.map((r) => Number(r.n)).filter((v) => Number.isFinite(v));

    const safe = (
      min: number,
      max: number,
      fallbackMin: number,
      fallbackMax: number
    ) => {
      if (!Number.isFinite(min) || !Number.isFinite(max) || Math.abs(max - min) < 1e-9) {
        return { min: fallbackMin, max: fallbackMax };
      }
      return { min, max };
    };

    return {
      a: safe(minOf(aVals), maxOf(aVals), 0, 1),
      t: safe(minOf(tVals), maxOf(tVals), 0, 1),
      n: safe(minOf(nVals), maxOf(nVals), 0, 1),
    };
  }, []);

  const defaultA = initial?.a ?? (bounds.a.min + bounds.a.max) / 2;
  const defaultT = initial?.t ?? (bounds.t.min + bounds.t.max) / 2;
  const defaultN = initial?.n ?? (bounds.n.min + bounds.n.max) / 2;

  const [a, setA] = useState(defaultA);
  const [t, setT] = useState(defaultT);
  const [n, setN] = useState(defaultN);

  const input = useMemo(
    () => ({
      a: clamp(a, bounds.a.min, bounds.a.max),
      t: clamp(t, bounds.t.min, bounds.t.max),
      n: clamp(n, bounds.n.min, bounds.n.max),
    }),
    [a, t, n, bounds]
  );

  const debouncedInput = useDebouncedValue(input, 120);

  useEffect(() => {
    onChange(debouncedInput);
  }, [debouncedInput, onChange]);

  const stepA = (bounds.a.max - bounds.a.min) / 300;
  const stepT = (bounds.t.max - bounds.t.min) / 300;
  const stepN = (bounds.n.max - bounds.n.min) / 300;

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex flex-col gap-3 h-full">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base md:text-lg font-semibold text-slate-100">
            Real-time ATN Input
          </h3>
          <p className="text-slate-300 text-sm max-w-xl mt-1">
            Sliders use the full raw range of the ATN dataset so nearest-point matching stays aligned with the data.
          </p>
        </div>

        <div className="text-[11px] text-slate-400 text-right">
          <div className="font-medium text-slate-300">Engine</div>
          <div>{engine}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 text-xs md:text-sm">
        <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3">
          <div className="flex justify-between mb-1">
            <span className="font-medium text-slate-100">Amyloid (A)</span>
            <span className="text-slate-300">{input.a.toFixed(3)}</span>
          </div>
          <p className="text-slate-400 text-[11px] mb-2">
            Dataset range: {bounds.a.min.toFixed(2)} – {bounds.a.max.toFixed(2)}
          </p>
          <input
            type="range"
            min={bounds.a.min}
            max={bounds.a.max}
            step={Number.isFinite(stepA) && stepA > 0 ? stepA : 0.001}
            value={a}
            onChange={(e) => setA(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3">
          <div className="flex justify-between mb-1">
            <span className="font-medium text-slate-100">Tau (T)</span>
            <span className="text-slate-300">{input.t.toFixed(3)}</span>
          </div>
          <p className="text-slate-400 text-[11px] mb-2">
            Dataset range: {bounds.t.min.toFixed(2)} – {bounds.t.max.toFixed(2)}
          </p>
          <input
            type="range"
            min={bounds.t.min}
            max={bounds.t.max}
            step={Number.isFinite(stepT) && stepT > 0 ? stepT : 0.001}
            value={t}
            onChange={(e) => setT(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3">
          <div className="flex justify-between mb-1">
            <span className="font-medium text-slate-100">Neuro (N)</span>
            <span className="text-slate-300">{input.n.toFixed(3)}</span>
          </div>
          <p className="text-slate-400 text-[11px] mb-2">
            Dataset range: {bounds.n.min.toFixed(2)} – {bounds.n.max.toFixed(2)}
          </p>
          <input
            type="range"
            min={bounds.n.min}
            max={bounds.n.max}
            step={Number.isFinite(stepN) && stepN > 0 ? stepN : 0.001}
            value={n}
            onChange={(e) => setN(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <p className="text-[11px] text-slate-500">
        Bounds now reflect the full dataset rather than trimmed percentile ranges.
      </p>
    </div>
  );
}
