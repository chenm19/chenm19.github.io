export type Stage5 = "CN" | "SMC" | "EMCI" | "LEMCI" | "AD";
export type Stage3 = "CN" | "MCI" | "AD";

export type ATNInput = {
  a: number;
  t: number;
  n: number;
};

export type NearestNeighborMeta = {
  ptid: string;
  stage5Actual: Stage5;
  stage3Actual: Stage3;
  /** distance between the user input and the nearest ADNI participant (same units as engine metric) */
  distance: number;
};

export type InferenceResult = {
  requestId: string;
  input: ATNInput;
  probsStage5: Record<Stage5, number>;
  stage5Pred: Stage5;
  stage3Pred: Stage3;

  /** optional metadata for UI; safe for existing callers */
  nearest?: NearestNeighborMeta;

  model: {
    id: string;
    label: string;
    version?: string;
  };
};
