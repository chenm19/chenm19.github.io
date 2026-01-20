import type { ATNInput, InferenceResult } from "./types";
import { inferGmmNearest } from "./engines/gmmNearest";

export type EngineId = "gmm-nearest";

export function infer(input: ATNInput, engine: EngineId): InferenceResult {
  if (engine === "gmm-nearest") {
    return inferGmmNearest(input);
  }
  // fallback (future engines)
  return inferGmmNearest(input);
}
