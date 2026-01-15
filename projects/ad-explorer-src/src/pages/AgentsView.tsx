export default function AgentsView() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-xl md:text-2xl font-semibold">Agent Orchestration</h1>
        <p className="text-slate-300 text-sm max-w-3xl leading-relaxed">
          This project is structured as a modular agentic system, with each component operating within a defined role via an individual input/output contract, and can be replaced without rewriting the entire site. The current MVP focuses on a real-time inference agent that accepts
          new AT(N) biomarker inputs and returns a probability distribution over five disease stage categories based on asserted data points provided. The broader orchestration plan endeavors to include more complex data curation, modeling, and real-time explanation.
        </p>
      </div>

      {/* Status banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 text-[12px]">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="text-slate-100 font-semibold">Current system status (MVP)</div>
            <p className="text-slate-300 mt-1 max-w-3xl">
              The site currently supports interactive visualization plus a working inference agent. Modeling results displayed elsewhere (unsupervised clustering and supervised baselines) are included as references and will progressively be unified behind an expansive inference interface.
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
            <div className="text-slate-400 mt-1">Reference outputs + baselines</div>
          </div>
          <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-3">
            <div className="font-semibold text-slate-100">Data/Explanation agents</div>
            <div className="text-slate-400 mt-1">Planned (not yet wired)</div>
          </div>
        </div>
      </div>

      {/* The simple orchestration diagram (text-based) */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
        <h2 className="text-sm font-semibold text-slate-100">How orchestration works right now</h2>
        <p className="text-slate-400 text-[11px] mt-1 max-w-3xl">
          The current orchestrator is designed to be lightweight: user input triggers simple inference, and the UI renders outputs immediately. This is designed to support future engines (e.g., a pretrained 1D transformer) that can be dropped in without changing the underlying agentic structure.
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
              A replaceable inference engine maps ATN inputs to a distribution over five stage categories (“stage5”).
            </p>
            <p className="text-slate-500">
              Today: a modular MVP engine. Later: a trained model (e.g., 1D transformer) evaluated on unseen test cases.
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
          inference is treated as a stable “service” with a typed input/output contract. This keeps the system modular even as modeling methods change.
        </div>
      </div>

      {/* Existing vs. planned */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2">
          <h2 className="text-sm font-semibold text-slate-100">What exists today</h2>
          <ul className="list-disc list-inside text-[12px] text-slate-300 space-y-1">
            <li>
              An interactive front-end inference agent that accepts ATN inputs and returns real-time stage probabilities.
            </li>
            <li>
              An unsupervised clustering view (GMM-derived structure) to show how participants distribute in AT space.
            </li>
            <li>
              Supervised baseline evaluation outputs (logistic regression + random forest metrics) for stage classification context.
            </li>
            <li>
              A visualization-first UI prioritizing interpretability through interactive exploration.
            </li>
          </ul>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2">
          <h2 className="text-sm font-semibold text-slate-100">What we’re building toward</h2>
          <ul className="list-disc list-inside text-[12px] text-slate-300 space-y-1">
            <li>
              A modeling agent that directly serves trained model inference.
            </li>
            <li>
              A data agent that supplies curated, privacy-aware cohort presets and consistent feature normalization for inference.
            </li>
            <li>
              An explanation agent that generates audience-adaptive interpretations of outputs
            </li>
            <li>
              A coordinator layer that orchestrates the above agents across routes and keeps the user’s context synchronized across views.
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
