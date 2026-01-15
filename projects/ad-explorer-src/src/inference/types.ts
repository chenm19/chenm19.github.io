export type Stage5 = "CN" | "SMC" | "EMCI" | "LEMCI" | "AD";
export type Stage3 = "CN" | "MCI" | "AD";

export type ATNInput = {
  a: number;
  t: number;
  n: number;
};

export type InferenceResult = {
  requestId: string;
  input: ATNInput;
  probsStage5: Record<Stage5, number>;
  stage5Pred: Stage5;
  stage3Pred: Stage3;
  model: {
    id: string;      // "gmm-nearest" "rf" "transformer"
    label: string;   // readable
    version?: string;
  }
}
