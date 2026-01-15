import { useEffect, useMemo, useState } from "react";
import type { ATNInput } from "../../inference/types";
import type { EngineId } from "../../inference/infer";

type Props = {
  initial?: ATNInput;
  engine: EngineId;
  onChange: (input: ATNInput) => void; // real-time
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

// reduce jitters
function useDebouncedValue<T>(value: T, delayMs: number) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = window.setTimeout(() => setDebounced(value), delayMs);
    return () => window.clearTimeout(id);
  }, [value, delayMs]);

  return debounced;
}

export default function InferenceInputCard({ initial, engine, onChange }: Props) {
  const [a, setA] = useState(initial?.a ?? 0.5);
  const [t, setT] = useState(initial?.t ?? 0.5);
  const [n, setN] = useState(initial?.n ?? 0.5);

  const input = useMemo(
    () => ({ a: clamp(a, 0, 1), t: clamp(t, 0, 1), n: clamp(n, 0, 1) }),
    [a, t, n]
  );

  // debounce for smoothness
  const debouncedInput = useDebouncedValue(input, 120);

  useEffect(() => {
    onChange(debouncedInput);
  }, [debouncedInput, onChange]);

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 space-y-3">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base md:text-lg font-semibold text-slate-100">
            Real-time ATN Input
          </h3>
          <p className="text-slate-300 text-sm max-w-xl mt-1">
            Adjust biomarkers and view updated stage probabilities instantly. This panel will remain stable even if the underlying model changes.
          </p>
        </div>

        <div className="text-[11px] text-slate-400 text-right">
          <div className="font-medium text-slate-300">Engine</div>
          <div>{engine}</div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-3 text-xs md:text-sm">
        {/* Amyloid */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3">
          <div className="flex justify-between mb-1">
            <span className="font-medium text-slate-100">Amyloid (A)</span>
            <span className="text-slate-300">{input.a.toFixed(3)}</span>
          </div>
          <p className="text-slate-400 text-[11px] mb-2">
            Normalized amyloid burden (0–1).
          </p>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={a}
            onChange={e => setA(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Tau */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3">
          <div className="flex justify-between mb-1">
            <span className="font-medium text-slate-100">Tau (T)</span>
            <span className="text-slate-300">{input.t.toFixed(3)}</span>
          </div>
          <p className="text-slate-400 text-[11px] mb-2">
            Normalized tau pathology (0–1).
          </p>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={t}
            onChange={e => setT(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Neuro */}
        <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-3">
          <div className="flex justify-between mb-1">
            <span className="font-medium text-slate-100">Neuro (N)</span>
            <span className="text-slate-300">{input.n.toFixed(3)}</span>
          </div>
          <p className="text-slate-400 text-[11px] mb-2">
            Normalized neurodegeneration (0–1).
          </p>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={n}
            onChange={e => setN(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      <p className="text-[11px] text-slate-500">
        This can be easily swapped to a transformer-backed engine without changing the UI.
      </p>
    </div>
  );
}
