import type { ATNInput, InferenceResult } from "./types";
import { inferGmmNearest } from "./engines/gmmNearest";

export type EngineId = "gmm-nearest"; // later: "rf" "lr" "transformer"

export function infer(input: ATNInput, engine: EngineId): InferenceResult {
  switch (engine) {
    case "gmm-nearest":
    default:
      return inferGmmNearest(input);
  }
}
