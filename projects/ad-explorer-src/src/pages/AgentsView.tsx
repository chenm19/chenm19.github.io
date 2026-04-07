export default function AgentsView() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-xl md:text-2xl font-semibold">Agent Orchestration</h1>
        <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
          This project is structured as a modular agentic system, each component performing  a defined role via a typed input/output contract. This layout ensure components are replaceable without rewriting the broader site. The current build is centered upon a real-time inference agent that accepts AT(N) biomarker values and returns a probability distribution over five disease stage categories derived from anonymized participant data. The broader orchestration plan continues to expand toward richer data curation, modeling, and real-time explanation.
        </p>
      </div>

      {/* Status banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 text-[12px]">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="text-slate-100 font-semibold">Current system status (MVP)</div>
            <p className="text-slate-300 mt-1 max-w-3xl">
              Currently  supports live inference, interactive ATN-space clustering, and supervised baseline comparisons. Participant identifiers are derived from actual data, but anonymized (at the display layer). Modeling results will remain unified behind an increasingly expansive inference interface.
            </p>
          </div>
          <div className="px-2 py-1 rounded-full border border-cyan-500/40 bg-cyan-500/10 text-cyan-200 text-[11px] whitespace-nowrap">
            Live inference: enabled
          </div>
        </div>

        <div className="mt-3 grid sm:grid-cols-3 gap-2 text-[11px]">
          <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-3">
            <div className="font-semibold text-slate-100">Inference agent</div>
            <div className="text-slate-400 mt-1">Implemented (real-time UI)</div>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-3">
            <div className="font-semibold text-slate-100">Modeling agents</div>
            <div className="text-slate-400 mt-1">Live clustering + supervised baselines</div>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-3">
            <div className="font-semibold text-slate-100">Data/Explanation agents</div>
            <div className="text-slate-400 mt-1">Explanation live, anonymization live, deeper curation ongoing</div>
          </div>
        </div>
      </div>

      {/* The simple orchestration diagram (text-based) */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
        <h2 className="text-sm font-semibold text-slate-100">How orchestration works right now</h2>
        <p className="text-slate-400 text-[11px] mt-1 max-w-3xl">
          The current orchestrator is designed to be lightweight: user input triggers inference, with UI rendering outputs immediately. The engine is designed to be swappable &mdash; a more advanced model (e.g., a pretrained transformer) can be swapped in without alterations to the surrounding agentic structure.
        </p>

        <div className="mt-3 grid md:grid-cols-3 gap-3 text-[11px]">
          <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-3 space-y-1">
            <div className="text-slate-100 font-semibold">1) Input (ATN)</div>
            <p className="text-slate-300">
              A user provides amyloid (A), tau (T), and neurodegeneration (N) values.
            </p>
            <p className="text-slate-500">
              Audience note: This is meant to support learning and exploration, not clinical diagnosis.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-3 space-y-1">
            <div className="text-slate-100 font-semibold">2) Inference agent</div>
            <p className="text-slate-300">
              A replaceable inference engine maps ATN inputs to a probability distribution over five disease stage categories.
            </p>
            <p className="text-slate-500">
              Today: Gaussian distance-weighted nearest-neighbor across 11 closest participants. Later: a trained model evaluated on held-out test cases.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950/50 p-3 space-y-1">
            <div className="text-slate-100 font-semibold">3) Visualization</div>
            <p className="text-slate-300">
              The UI renders probabilities and context (charts, tooltips, panels) so users can interpret uncertainty and patterns interactively.
            </p>
            <p className="text-slate-500">
              Goal: keep the interpretation accessible for all users while still maintaining accuracy for more technical audiences.
            </p>
          </div>
        </div>

        <div className="mt-3 rounded-lg border border-slate-800 bg-slate-950/40 p-3 text-[11px] text-slate-300">
          <span className="font-semibold text-slate-100">Key design principle:</span>{" "}
          inference is treated as a stable &ldquo;service&rdquo; with a typed input/output contract. This keeps the system modular even as modeling methods change.
        </div>
      </div>

      {/* Existing vs. planned */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2">
          <h2 className="text-sm font-semibold text-slate-100">What exists today</h2>
          <ul className="list-disc list-inside text-[12px] text-slate-300 space-y-1">
            <li>
              An interactive inference interface accepting ATN inputs and providing real-time neighborhood-based stage probabilities derived from nearby participants in ATN space.
            </li>
            <li>
              An unsupervised ATN-space clustering view that shows how participants distribute across the biomarker landscape, with labeling + severity aligned to the original dataset diagnoses.
            </li>
            <li>
              Supervised baseline evaluation outputs (logistic regression + random forest metrics) for stage classification context.
            </li>
            <li>
              Anonymized participant identifiers at the display layer, with underlying data and clustering positions unchanged.
            </li>
            <li>
              A rule-based explanation agent that generates plain-language interpretations of each inference result, derived from biomarker levels and stage probabilities.
            </li>
            <li>
              A visualization-first UI prioritizing interpretability through interactive exploration.
            </li>
          </ul>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2">
          <h2 className="text-sm font-semibold text-slate-100">What we&apos;re building toward</h2>
          <ul className="list-disc list-inside text-[12px] text-slate-300 space-y-1">
            <li>
              A modeling agent that directly serves trained model inference.
            </li>
            <li>
              A data agent that supplies curated cohort presets and consistent feature normalization for inference (display-layer anonymization is live; deeper curation is ongoing).
            </li>
            <li>
              An audience-adaptive explanation agent with richer, context-sensitive interpretations as more modeling layers are added.
            </li>
            <li>
              A coordinator layer that orchestrates the above agents across routes and keeps the user&apos;s context synchronized across views.
            </li>
          </ul>
        </div>
      </div>

      {/* Responsible use */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-[11px] text-slate-400">
        <span className="font-semibold text-slate-200">Responsible use:</span>{" "}
        This tool is designed for education and research exploration. Outputs are intended to visualize model behavior and uncertainty in an AT(N) framework and should not be used as medical advice or a clinical diagnostic system.
      </div>
    </div>
  )
}
