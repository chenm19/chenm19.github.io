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

const clusters: PatientClusterResult[] = (clustersData as PatientClusterResult[]).map((r) => ({
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
  return Math.sqrt(v) || 1;
}

function collapseStage3(stage5: Stage5): Stage3 {
  if (stage5 === "CN" || stage5 === "SMC") return "CN";
  if (stage5 === "AD") return "AD";
  return "MCI";
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
  let best = clusters[0];
  let bestD2 = Infinity;

  for (const c of clusters) {
    const d2 = l2Scaled(input.a, input.t, input.n, c.a, c.t, c.n);
    if (d2 < bestD2) {
      bestD2 = d2;
      best = c;
    }
  }

  const distance = Math.sqrt(bestD2);

  // Align prediction with the actual matched point
  const stage5Pred = best.stage5;
  const stage3Pred = best.stage3 ?? collapseStage3(best.stage5);
  const probsStage5 = best.posterior;

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
    model: {
      id: "gmm-nearest",
      label: "Nearest dataset point",
      version: "v1",
    },
  };
}
