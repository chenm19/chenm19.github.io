import clustersData from "../../data/atn_clusters.json";
import type { ATNInput, InferenceResult, Stage3, Stage5 } from "../types";

type PatientClusterResult = {
  ptid: string;
  a: number;
  t: number;
  n: number;
  stage5: Stage5;
  stage3: Stage3;
  posterior: Record<Stage5, number>;
};

const clusters = (clustersData as PatientClusterResult[]).map(r => ({
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

export function inferGmmNearest(input: ATNInput): InferenceResult {
  let best = clusters[0];
  let bestD = Infinity;

  for (const c of clusters) {
    const d = l2(input.a, input.t, input.n, c.a, c.t, c.n);
    if (d < bestD) {
      bestD = d;
      best = c;
    }
  }

  const probsStage5 = best.posterior;
  const stage5Pred = argmaxStage5(probsStage5);
  const stage3Pred = collapseStage3(stage5Pred);

  return {
    requestId: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    input,
    probsStage5,
    stage5Pred,
    stage3Pred,
    model: { id: "gmm-nearest", label: "GMM posterior (nearest neighbor)", version: "v0" },
  }
}
