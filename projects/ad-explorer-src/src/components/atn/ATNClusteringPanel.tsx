import clustersData from "../../data/atn_clusters.json";
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

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

const rawClusters = clustersData as PatientClusterResult[];

function makeNiceTicks(min: number, max: number, step: number): number[] {
  const ticks: number[] = [];
  const start = Math.floor(min / step) * step;
  const end = Math.ceil(max / step) * step;
  for (let v = start; v <= end + 1e-9; v += step) {
    ticks.push(Number(v.toFixed(2)));
  }
  return ticks;
}

const clusters: PatientClusterResult[] = rawClusters.map(r => ({
  ...r,
  a: Number(r.a),
  t: Number(r.t),
  n: Number(r.n),
}));

const stageColor: Record<Stage3, string> = {
  CN: "#22d3ee",
  MCI: "#a855f7",
  AD: "#f97316",
};

function renderNode(props: any) {
  const { cx, cy, payload } = props;
  const stage3 = (payload.stage3 as Stage3) ?? "CN";
  const fill = stageColor[stage3] ?? "#22d3ee";

  const baseRadius = 4;
  const adScale = 1.4;

  if (stage3 === "AD") {
    const size = baseRadius * 2 * adScale;
    const half = size / 2;

    return (
      <svg x={cx - half} y={cy - half} width={size} height={size}>
        <polygon
          points={`${half},0 ${size},${half} ${half},${size} 0,${half}`}
          fill={fill}
        />
      </svg>
    );
  }

  return (
    <circle
      cx={cx}
      cy={cy}
      r={baseRadius}
      fill={fill}
    />
  );
}


export default function ATNClusteringPanel() {
    const aValues = clusters.map(r => r.a);
    const tValues = clusters.map(r => r.t);

    const minA = Math.min(...aValues);
    const maxA = Math.max(...aValues);
    const minT = Math.min(...tValues);
    const maxT = Math.max(...tValues);

    const aTicks = makeNiceTicks(minA, maxA, 0.25);
    const tTicks = makeNiceTicks(minT, maxT, 0.25);

    const total = clusters.length;

    const stage3Counts: Record<Stage3, number> = { CN: 0, MCI: 0, AD: 0 };
    clusters.forEach(r => {
    stage3Counts[r.stage3] += 1;
});

return (
    <div className="mt-10 space-y-4">
        <div className="space-y-2">
            <h2 className="text-lg md:text-xl font-semibold">
            Unsupervised ATN Clustering (preview)
            </h2>
            <p className="text-slate-300 text-sm max-w-2xl">
            This section uses a Gaussian Mixture Model (GMM) fit on the ATN matrix to
            assign each ADNI participant to one of five latent clusters behind the
            scenes before collapsing them into three visible stages (CN / MCI / AD).
            </p>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-sm">
            <p className="text-slate-200">
            <span className="font-medium">Total participants:</span> {total}
            </p>
            <p className="text-slate-200 mt-1">
            <span className="font-medium">Collapsed stages:</span>{" "}
            CN = {stage3Counts.CN},{" "}
            MCI = {stage3Counts.MCI},{" "}
            AD = {stage3Counts.AD}
            </p>
            <p className="text-[11px] text-slate-400 mt-2">
            (WIP)
            </p>
        </div>

        <div className="h-72 md:h-80 bg-slate-900/80 border border-slate-800 rounded-xl p-3">
            <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis
                    type="number"
                    dataKey="a"
                    name="Amyloid (A)"
                    stroke="#9ca3af"
                    tickLine={false}
                    domain={[aTicks[0], aTicks[aTicks.length - 1]]}
                    ticks={aTicks}
                    tickFormatter={(v: number) => v.toFixed(2)}
                    label={{
                        value: "Amyloid (A)",
                        position: "insideBottom",
                        dy: 12,
                        fill: "#9ca3af",
                        fontSize: 11,
                }}
                />
                <YAxis
                    type="number"
                    dataKey="t"
                    name="Tau (T)"
                    stroke="#9ca3af"
                    tickLine={false}
                    domain={[tTicks[0], tTicks[tTicks.length - 1]]}
                    ticks={tTicks}
                    tickFormatter={(v: number) => v.toFixed(2)}
                    label={{
                        value: "Tau (T)",
                        angle: -90,
                        position: "insideLeft",
                        fill: "#9ca3af",
                        fontSize: 11,
                }}
                />
                <Tooltip
                    content={({ active, payload }) => {
                        if (!active || !payload || !payload.length) return null;

                        const p = payload[0].payload as PatientClusterResult;

                        return (
                        <div className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs shadow-lg">
                            <div className="font-semibold text-slate-100 mb-1">
                            {p.ptid}
                            </div>
                            <div className="text-slate-300">
                            Stage: {p.stage3} ({p.stage5})
                            </div>
                            <div className="text-slate-400 mt-1">
                            A: {p.a.toFixed(3)}<br />
                            T: {p.t.toFixed(3)}<br />
                            N: {p.n.toFixed(3)}
                            </div>
                        </div>
                        );
                    }}
                />
                <Scatter data={clusters} shape={renderNode} />
            </ScatterChart>
            </ResponsiveContainer>
    </div>

    <div className="flex flex-wrap gap-4 text-[11px] text-slate-300">
        <span className="inline-flex items-center gap-1">
            <span
            className="inline-block w-3 h-3 rounded-full"
            style={{ backgroundColor: stageColor.CN }}
            />
            CN
        </span>

        <span className="inline-flex items-center gap-1">
            <span
            className="inline-block w-3 h-3 rounded-full"
            style={{ backgroundColor: stageColor.MCI }}
            />
            MCI
        </span>

        <span className="inline-flex items-center gap-1">
            <span className="inline-flex items-center justify-center w-3 h-3">
            <svg width={14} height={14}>
                <polygon
                points="7,0 14,7 7,14 0,7"
                fill={stageColor.AD}
                />
            </svg>
            </span>
            AD
        </span>
        </div>
    </div>
  );
}
