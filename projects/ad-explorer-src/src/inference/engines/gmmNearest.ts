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

// dataset scale stats
const aVals = clusters.map(c => c.a);
const tVals = clusters.map(c => c.t);
const nVals = clusters.map(c => c.n);

const A_STD = std(aVals);
const T_STD = std(tVals);
const N_STD = std(nVals);

/**
 * squared Euclidean distance in standardized (z-score) space.
 * standardizing makes the A/T/N axes comparable so one dimension doesn't dominate distance.
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

export function inferGmmNearest(input: ATNInput): InferenceResult {
  let best = clusters[0];
  let bestD2 = Infinity;

  for (const c of clusters) {
    // nearest neighbor is chosen in standardized space so A/T/N contribute comparably
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
