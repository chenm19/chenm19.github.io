import type { InferenceResult } from "../../inference/types";
import { explainResult } from "../../agents/explanationAgent";

type Props = {
  result: InferenceResult | null;
};

export default function ExplanationCard({ result }: Props) {
  if (!result) {
    return (
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
        <div className="text-slate-300 text-sm">Interpretation</div>
        <div className="text-slate-500 text-[11px] mt-1">(Adjust inputs to generate an explanation)</div>
      </div>
    );
  }

  const explanation = explainResult(result);

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 space-y-2">
      <div className="text-slate-100 font-medium text-sm">Interpretation</div>
      <p className="text-slate-300 text-[13px] leading-relaxed">{explanation}</p>
      <div className="text-[11px] text-slate-500">
        Generated from biomarker levels and stage probabilities - not medical advice.
      </div>
    </div>
  );
}
