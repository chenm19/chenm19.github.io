import clustersData from "../../data/atn_clusters.json";
import type {
  ATNInput,
  InferenceResult,
  NearestNeighborMeta,
  RawDx,
  Stage3,
  Stage5,
} from "../types";

type PatientClusterResult = {
  ptid: string;
  a: number;
  t: number;
  n: number;
  stage5: Stage5;
  stage3: Stage3;
  posterior: Record<Stage5, number>;
  actualDx?: RawDx;
  actualStage3?: Stage3;
};

const clusters: PatientClusterResult[] = (clustersData as PatientClusterResult[]).map((r) => ({
  ...r,
  a: Number(r.a),
  t: Number(r.t),
  n: Number(r.n),
}));

const stage5Order: Stage5[] = ["CN", "SMC", "EMCI", "LEMCI", "AD"];

function mean(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((s, v) => s + v, 0) / values.length;
}

function std(values: number[]): number {
  if (values.length === 0) return 1;
  const m = mean(values);
  const v = values.reduce((s, x) => s + (x - m) * (x - m), 0) / values.length;
  return Math.sqrt(v) || 1;
}

function collapseStage3(stage5: Stage5): Stage3 {
  if (stage5 === "CN" || stage5 === "SMC") return "CN";
  if (stage5 === "AD") return "AD";
  return "MCI";
}

function normalizeDxToStage5(dx?: RawDx): Stage5 | undefined {
  if (!dx) return undefined;
  if (dx === "LMCI") return "LEMCI";
  if (dx === "CN" || dx === "SMC" || dx === "EMCI" || dx === "LEMCI" || dx === "AD") {
    return dx;
  }
  return undefined;
}

const aVals = clusters.map((c) => c.a);
const tVals = clusters.map((c) => c.t);
const nVals = clusters.map((c) => c.n);

const A_STD = std(aVals);
const T_STD = std(tVals);
const N_STD = std(nVals);

function l2Scaled(
  a1: number,
  t1: number,
  n1: number,
  a2: number,
  t2: number,
  n2: number
) {
  const da = (a1 - a2) / A_STD;
  const dt = (t1 - t2) / T_STD;
  const dn = (n1 - n2) / N_STD;
  return da * da + dt * dt + dn * dn;
}

export function inferGmmNearest(input: ATNInput): InferenceResult {
  const ranked = clusters
    .map((c) => {
      const d2 = l2Scaled(input.a, input.t, input.n, c.a, c.t, c.n);
      return {
        row: c,
        d2,
        distance: Math.sqrt(d2),
      };
    })
    .sort((a, b) => a.d2 - b.d2);

  const best = ranked[0].row;
  const nearestDistance = ranked[0].distance;

  const nearest: NearestNeighborMeta = {
    ptid: best.ptid,
    stage5Actual: normalizeDxToStage5(best.actualDx) ?? best.stage5,
    stage3Actual: best.actualStage3 ?? best.stage3,
    distance: nearestDistance,
  };

  const k = 11;
  const neighbors = ranked.slice(0, Math.min(k, ranked.length));

  const probsStage5: Record<Stage5, number> = {
    CN: 0,
    SMC: 0,
    EMCI: 0,
    LEMCI: 0,
    AD: 0,
  };

  let totalWeight = 0;

  // Gaussian kernel with bandwidth h=1 in normalized ATN space (one std dev per axis).
  // More principled than inverse-distance: gives a smooth, fast decay beyond 1–2 std devs.
  for (const item of neighbors) {
    const rawStage5 = normalizeDxToStage5(item.row.actualDx) ?? item.row.stage5;
    const weight = Math.exp(-item.d2 / 2);

    probsStage5[rawStage5] += weight;
    totalWeight += weight;
  }

  if (totalWeight > 0) {
    for (const key of stage5Order) {
      probsStage5[key] /= totalWeight;
    }
  }

  let stage5Pred: Stage5 = "CN";
  let bestProb = -1;

  for (const key of stage5Order) {
    if (probsStage5[key] > bestProb) {
      bestProb = probsStage5[key];
      stage5Pred = key;
    }
  }

  const stage3Pred = collapseStage3(stage5Pred);

  return {
    requestId:
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : String(Date.now()),
    input,
    probsStage5,
    stage5Pred,
    stage3Pred,
    nearest,
    model: {
      id: "gmm-nearest",
      label: "Gaussian kernel regression over 11 nearest neighbors",
      version: "v3",
    },
  };
}
