import type { InferenceResult, Stage5 } from "../../inference/types";

const order: Stage5[] = ["CN", "SMC", "EMCI", "LEMCI", "AD"];

type Props = {
  result: InferenceResult | null;
};

export default function Stage5ProbsCard({ result }: Props) {
  if (!result) {
    return (
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
        <div className="text-slate-300 text-sm">Stage probabilities</div>
        <div className="text-slate-500 text-[11px] mt-1">(Please adjust inputs to begin)</div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 space-y-2">
      <div className="flex items-baseline justify-between">
        <div className="text-slate-100 font-medium">Stage5 probabilities</div>
        <div className="text-xs text-slate-400">
          Pred: {result.stage5Pred} → {result.stage3Pred}
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2 text-[11px]">
        {order.map(k => {
          const v = result.probsStage5[k] ?? 0;
          return (
            <div
              key={k}
              className="bg-slate-950/60 border border-slate-800 rounded-lg px-2 py-2"
            >
              <div className="text-slate-400 uppercase tracking-wide">{k}</div>
              <div className="text-slate-100 mt-1">{v.toFixed(3)}</div>
              <div className="mt-2 h-1.5 rounded bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-slate-300"
                  style={{ width: `${Math.round(v * 100)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-[11px] text-slate-500">
        {result.model.label}
      </div>
    </div>
  );
}
