import clustersData from "../../data/atn_clusters.json";
import type {
  ATNInput,
  InferenceResult,
  Stage3,
  Stage5,
  NearestNeighborMeta,
} from "../types";

type PatientClusterResult = {
  ptid: string;
  a: number;
  t: number;
  n: number;
  stage5: Stage5;
  stage3: Stage3;
  posterior: Record<Stage5, number>;
};

const clusters: PatientClusterResult[] = (clustersData as PatientClusterResult[]).map(r => ({
  ...r,
  a: Number(r.a),
  t: Number(r.t),
  n: Number(r.n),
}));

function l2(x1: number, y1: number, z1: number, x2: number, y2: number, z2: number) {
  const dx = x1 - x2;
  const dy = y1 - y2;
  const dz = z1 - z2;
  return dx * dx + dy * dy + dz * dz;
}

function mean(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((s, v) => s + v, 0) / values.length;
}

function std(values: number[]): number {
  if (values.length === 0) return 1;
  const m = mean(values);
  const v = values.reduce((s, x) => s + (x - m) * (x - m), 0) / values.length;
  // guard against zero variance to never divide by 0
  return Math.sqrt(v) || 1;
}

function argmaxStage5(probs: Record<Stage5, number>): Stage5 {
  const keys = Object.keys(probs) as Stage5[];
  let best: Stage5 = keys[0] ?? "CN";
  for (const k of keys) {
    if (probs[k] > probs[best]) best = k;
  }
  return best;
}

function collapseStage3(stage5: Stage5): Stage3 {
  if (stage5 === "CN") return "CN";
  if (stage5 === "AD") return "AD";
  return "MCI";
}

function percentile(values: number[], p: number): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const idx = (sorted.length - 1) * p;
  const lo = Math.floor(idx);
  const hi = Math.ceil(idx);
  if (lo === hi) return sorted[lo];
  const t = idx - lo;
  return sorted[lo] * (1 - t) + sorted[hi] * t;
}

// dataset scale stats
const aVals = clusters.map(c => c.a);
const tVals = clusters.map(c => c.t);
const nVals = clusters.map(c => c.n);

const A_MEAN = mean(aVals);
const T_MEAN = mean(tVals);
const N_MEAN = mean(nVals);

const A_STD = std(aVals);
const T_STD = std(tVals);
const N_STD = std(nVals);

/**
 * squared Euclidean distance in standardized (z-score) space to make distances comparable across dimensions and consistent with OOD thresholding
 */
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

/**
 * estimate "typical" local spacing in standardized space, for for each point, compute distance to its nearest other point.
 */
function computeNearestNeighborDistancesScaled(points: PatientClusterResult[]): number[] {
  const nearestDists: number[] = [];

  for (let i = 0; i < points.length; i += 1) {
    let bestD2 = Infinity;
    const p = points[i];

    for (let j = 0; j < points.length; j += 1) {
      if (i === j) continue;
      const q = points[j];

      const d2 = l2Scaled(p.a, p.t, p.n, q.a, q.t, q.n);
      if (d2 < bestD2) bestD2 = d2;
    }

    nearestDists.push(Math.sqrt(bestD2));
  }

  return nearestDists;
}

const NN_DISTS_SCALED = computeNearestNeighborDistancesScaled(clusters);

// “Far” = farther than 98% of points are from their nearest neighbor (in standardized space)
// for fewer warnings, bump to 0.99–0.995. For more warnings, drop to 0.95 
const OOD_THRESHOLD = percentile(NN_DISTS_SCALED, 0.98);

export function inferGmmNearest(input: ATNInput): InferenceResult {
  let best = clusters[0];
  let bestD2 = Infinity;

  for (const c of clusters) {
    // nearest neighbor is chosen using the same scaled metric used for OOD
    // avoids “always OOD” when raw A/T/N are tightly clustered
    const d2 = l2Scaled(input.a, input.t, input.n, c.a, c.t, c.n);

    if (d2 < bestD2) {
      bestD2 = d2;
      best = c;
    }
  }

  // distance is in standardized units (interpretable / stable)
  const distance = Math.sqrt(bestD2);

  const probsStage5 = best.posterior;
  const stage5Pred = argmaxStage5(probsStage5);
  const stage3Pred = collapseStage3(stage5Pred);

  const nearest: NearestNeighborMeta = {
    ptid: best.ptid,
    stage5Actual: best.stage5,
    stage3Actual: best.stage3,
    distance,
  };

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
    model: { id: "gmm-nearest", label: "GMM posterior (nearest neighbor)", version: "v0" },
  };
}
