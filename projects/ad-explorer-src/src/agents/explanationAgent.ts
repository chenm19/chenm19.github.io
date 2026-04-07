import clustersData from "../data/atn_clusters.json";
import type { InferenceResult, Stage5 } from "../inference/types";

type RawCluster = { a: number; t: number; n: number };

function computeStats(values: number[]) {
  const mean = values.reduce((s, v) => s + v, 0) / values.length;
  const std =
    Math.sqrt(values.reduce((s, v) => s + (v - mean) ** 2, 0) / values.length) || 1;
  return { mean, std };
}

const data = clustersData as RawCluster[];
const aStats = computeStats(data.map((r) => r.a));
const tStats = computeStats(data.map((r) => r.t));
const nStats = computeStats(data.map((r) => r.n));

function biomarkerLevel(value: number, mean: number, std: number): string {
  const z = (value - mean) / std;
  if (z < -0.75) return "low";
  if (z < 0.25) return "near average";
  if (z < 0.75) return "above average";
  if (z < 1.25) return "elevated";
  return "markedly elevated";
}

const stageDescriptions: Record<Stage5, string> = {
  CN: "cognitively normal — biomarker levels consistent with healthy aging",
  SMC: "subjective memory concern — self-reported memory changes without measurable impairment",
  EMCI: "early mild cognitive impairment — early, detectable cognitive changes with intact daily function",
  LEMCI: "late mild cognitive impairment — more pronounced changes with higher risk of progression",
  AD: "Alzheimer's disease — significant cognitive decline meeting clinical criteria",
};

function confidenceSentence(probs: Record<Stage5, number>, pred: Stage5, distance: number): string {
  const top = probs[pred];
  const proximity = distance < 0.5 ? "closely matching nearby participants" : distance < 1.5 ? "drawing from participants across a moderate range" : "interpolating across a broader region of the dataset";
  if (top > 0.75) return `The model is confident in this result, ${proximity}.`;
  if (top > 0.50) return `The model favors this stage, though some uncertainty remains — ${proximity}.`;
  return `The profile sits near the boundary between stages, reflecting meaningful uncertainty — ${proximity}.`;
}

export function explainResult(result: InferenceResult): string {
  const { input, probsStage5, stage5Pred, nearest } = result;

  const aLevel = biomarkerLevel(input.a, aStats.mean, aStats.std);
  const tLevel = biomarkerLevel(input.t, tStats.mean, tStats.std);
  const nLevel = biomarkerLevel(input.n, nStats.mean, nStats.std);

  const biomarkerLine = `Amyloid burden is ${aLevel}, tau pathology is ${tLevel}, and neurodegeneration markers are ${nLevel} relative to this cohort.`;
  const stageLine = `The predicted stage is ${stage5Pred} — ${stageDescriptions[stage5Pred]}.`;
  const confidenceLine = confidenceSentence(probsStage5, stage5Pred, nearest?.distance ?? 2);

  return `${biomarkerLine} ${stageLine} ${confidenceLine}`;
}
