import { useState } from 'react'
import { Link } from 'react-router-dom'

type RegionId = 'frontal' | 'temporal' | 'parietal' | 'occipital' | 'hippocampus'
type StageId = 'preclinical' | 'mild' | 'moderate' | 'severe'

const brainRegions: {
  id: RegionId
  label: string
  role: string
  everydayImpact: string
  adLink: string
}[] = [
  {
    id: 'hippocampus',
    label: 'Hippocampus',
    role: 'Forms new memories and assists in navigating memory',
    everydayImpact:
      'Early damage here makes it hard to learn new information or remember recent events, even though older memories may still feel clear.',
    adLink:
      'In many people with Alzheimer’s, changes in the hippocampus are among the earliest brain changes seen on scans or atrophy measures.',
  },
  {
    id: 'frontal',
    label: 'Frontal lobe',
    role: 'Planning, decision-making, attention, behavior',
    everydayImpact:
      'When frontal areas are affected, people may struggle to plan, stay organized, or control impulses. They might seem more disorganized or have personality changes.',
    adLink:
      'As Alzheimer’s progresses, frontal involvement contributes to loss of independence in day-to-day activities and changes in mood or behavior.',
  },
  {
    id: 'temporal',
    label: 'Temporal lobe',
    role: 'Language, understanding speech, recognizing objects and faces',
    everydayImpact:
      'Damage here can lead to word-finding problems, difficulty following conversations, or trouble recognizing familiar people or objects.',
    adLink:
      'Temporal lobe changes are closely tied to language difficulties and are common in the mild and moderate stages of Alzheimer’s.',
  },
  {
    id: 'parietal',
    label: 'Parietal lobe',
    role: 'Spatial awareness and working with numbers and tools',
    everydayImpact:
      'Parietal problems can show up as trouble with dressing, driving, reading a clock, or handling steps in a multi-step task like cooking.',
    adLink:
      'Parietal changes help explain difficulties with complex everyday tasks, even when basic memory problems may not seem severe yet.',
  },
  {
    id: 'occipital',
    label: 'Occipital lobe',
    role: 'Processes visual information',
    everydayImpact:
      'These regions are often affected later. When involved, people may misinterpret what they see or have trouble making sense of visual scenes.',
    adLink:
      'In some atypical forms of Alzheimer’s, visual symptoms can be very prominent because occipital and nearby regions are affected earlier.',
  },
]

const stages: {
  id: StageId
  name: string
  label: string
  summary: string
  mainFeatures: string[]
  careFocus: string
}[] = [
  {
    id: 'preclinical',
    name: 'Preclinical Alzheimer’s',
    label: 'Changes in the brain, but no clear symptoms yet',
    summary:
      'Brain changes begin years before anyone notices memory problems. This stage can last a long time, and most people feel completely normal.',
    mainFeatures: [
      'No clear day-to-day memory or thinking problems',
      'Subtle changes might be seen only on brain scans or lab tests',
      'People are usually fully independent and working, studying, or retired as usual',
    ],
    careFocus:
      'Research in this stage focuses on early detection and prevention, not on day-to-day care needs, because symptoms are not yet obvious.',
  },
  {
    id: 'mild',
    name: 'Mild (early) stage',
    label: 'Noticeable memory and thinking changes',
    summary:
      'Mild forgetfulness becomes more than “normal aging.” People may lose track of recent conversations, misplace important objects, or need more reminders.',
    mainFeatures: [
      'Trouble remembering recent events or conversations',
      'May repeat questions or misplace valuables',
      'Difficulty organizing, planning, or managing money',
      'Often still independent, but tasks take more effort and support',
    ],
    careFocus:
      'The focus is on support with organization, building routines, and monitoring changes over time while encouraging independence as much as possible.',
  },
  {
    id: 'moderate',
    name: 'Moderate (middle) stage',
    label: 'Longest stage, growing support needs',
    summary:
      'This is often the longest stage. Memory and thinking problems clearly interfere with daily life, and behavior or mood changes can become more noticeable.',
    mainFeatures: [
      'Increasing trouble remembering events and learning new things',
      'Needs help with daily activities like dressing, grooming, or meal planning',
      'May become confused about time or place',
      'Personality or mood changes: withdrawal, agitation, suspicion, or hallucinations',
      'Wandering and sleep problems may occur',
    ],
    careFocus:
      'Care shifts toward safety, routines, and caregiver support. Planning for future care needs becomes essential.',
  },
  {
    id: 'severe',
    name: 'Severe (late) stage',
    label: 'High dependence and physical decline',
    summary:
      'In the most advanced stage, people rely on others for nearly all care. Communication is limited, and physical abilities such as walking and swallowing can decline.',
    mainFeatures: [
      'Needs help with all activities (eating, bathing, moving)',
      'Limited or no meaningful conversation',
      'Often unaware of recent events or surroundings',
      'Greater risk of infections such as pneumonia',
    ],
    careFocus:
      'Care focuses on comfort, dignity, and supporting caregivers. Medical teams help manage pain, infections, and quality-of-life decisions.',
  },
]

export default function Intro() {
  const [activeRegion, setActiveRegion] = useState<RegionId>('hippocampus')
  const [activeStageId, setActiveStageId] = useState<StageId>('preclinical')

  const activeRegionData = brainRegions.find(r => r.id === activeRegion)!
  const activeStage = stages.find(s => s.id === activeStageId)!

  return (
    <div className="space-y-8">
      {/* 1. Hero / purpose */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Alzheimer&apos;s Biomarker Explorer
            </h1>
            <p className="text-slate-300 text-sm md:text-base max-w-2xl">
              This site is an interactive companion to ongoing research in Professor Chen&apos;s modeling lab, implementing{' '}
              <span className="text-cyan-300 font-medium">agentic AI for Alzheimer&apos;s disease</span>.
              This site is designed for a broad audience: open to students learning about Alzheimer&apos;s for the first
              time, clinicians, and researchers who want navigate the complex relationships affecting brain changes, symptoms,
              and biomarkers in an intuitive manner.
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 text-xs">
            <Link
              to="/playground"
              className="px-4 py-2 rounded-full bg-cyan-500 text-slate-950 font-semibold hover:bg-cyan-400 transition shadow-md shadow-cyan-500/40"
            >
              Visit the Biomarker Playground
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-3 text-[11px] md:text-xs text-slate-300">
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3">
            <div className="font-semibold text-slate-100 mb-1">What is Alzheimer&apos;s disease?</div>
            <p>
              Alzheimer's is the most common cause of dementia, a general term for memory loss and other cognitive abilities serious enough to interfere with daily life. Alzheimer's disease accounts for 60-80% of dementia cases.
            </p>
          </div>
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3">
            <div className="font-semibold text-slate-100 mb-1">How common is it?</div>
            <p>
              Alzheimer&apos;s mainly affects people over 65, but a small number of people have{' '}
              <span className="text-slate-100 font-medium">early-onset</span> disease in their 30s or 40s.
              People often live many years with the condition, and the speed of progression varies widely.
            </p>
          </div>
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3">
            <div className="font-semibold text-slate-100 mb-1">Can it be cured?</div>
            <p>
              Unfortunately, no cure exists. However, certain treatments have been found to slow progression for some people, helping them manage
              symptoms, and supporting quality of life for both the person and their caregivers.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Interactive brain map */}
      <section className="grid md:grid-cols-2 gap-5 items-start">
        {/* Brain graphic */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
          <h2 className="text-sm font-semibold text-slate-100 mb-2">
            Explore the key brain regions affected in Alzheimer&apos;s
          </h2>
          <p className="text-[11px] text-slate-400 mb-3">
            Hover or tap to highlight regions the brain. The panel on the right explains each area&apos;s function and how changes there can show up in everyday life.
          </p>
          <div className="flex justify-center">
            <svg
                viewBox="0 0 260 200"
                className="w-full max-w-xs drop-shadow-[0_0_40px_rgba(8,47,73,0.7)]"
                >
                <defs>
                    {/* Soft background gradient for the brain */}
                    <linearGradient id="brainGradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#020617" />
                    <stop offset="40%" stopColor="#020617" />
                    <stop offset="100%" stopColor="#020617" />
                    </linearGradient>
                </defs>

                {/* Filled brain silhouette */}
                <path
                    d="M50 60 C 40 40, 55 20, 85 20 C 100 5, 130 5, 150 20 C 180 10, 210 25, 210 55 C 235 75, 230 115, 210 130 C 210 155, 185 180, 150 175 C 135 190, 105 190, 90 175 C 65 185, 35 165, 40 135 C 20 115, 20 80, 50 60 Z"
                    fill="url(#brainGradient)"
                    stroke="#020617"
                    strokeWidth={4}
                />

                {/* Frontal lobe */}
                <path
                    d="M60 70 C 50 55, 60 35, 90 30 C 105 28, 120 35, 125 50 C 110 60, 90 70, 60 70 Z"
                    fill={activeRegion === 'frontal' ? '#22d3ee' : 'rgba(34,211,238,0.25)'}
                    stroke={activeRegion === 'frontal' ? '#22d3ee' : 'rgba(148,163,184,0.7)'}
                    strokeWidth={activeRegion === 'frontal' ? 2.5 : 1.5}
                    onMouseEnter={() => setActiveRegion('frontal')}
                    onClick={() => setActiveRegion('frontal')}
                    style={{ cursor: 'pointer', transition: 'all 0.15s ease-out' }}
                />

                {/* Temporal lobe */}
                <path
                    d="M80 95 C 65 95, 55 105, 55 120 C 58 135, 70 145, 90 145 C 105 143, 120 135, 125 120 C 120 105, 105 95, 80 95 Z"
                    fill={activeRegion === 'temporal' ? '#a855f7' : 'rgba(168,85,247,0.25)'}
                    stroke={activeRegion === 'temporal' ? '#a855f7' : 'rgba(148,163,184,0.7)'}
                    strokeWidth={activeRegion === 'temporal' ? 2.5 : 1.5}
                    onMouseEnter={() => setActiveRegion('temporal')}
                    onClick={() => setActiveRegion('temporal')}
                    style={{ cursor: 'pointer', transition: 'all 0.15s ease-out' }}
                />

                {/* Parietal lobe */}
                <path
                    d="M115 55 C 125 40, 145 35, 165 40 C 180 45, 190 60, 190 75 C 175 82, 160 90, 140 92 C 130 90, 120 82, 115 70 Z"
                    fill={activeRegion === 'parietal' ? '#f97316' : 'rgba(249,115,22,0.25)'}
                    stroke={activeRegion === 'parietal' ? '#f97316' : 'rgba(148,163,184,0.7)'}
                    strokeWidth={activeRegion === 'parietal' ? 2.5 : 1.5}
                    onMouseEnter={() => setActiveRegion('parietal')}
                    onClick={() => setActiveRegion('parietal')}
                    style={{ cursor: 'pointer', transition: 'all 0.15s ease-out' }}
                />

                {/* Occipital lobe */}
                <path
                    d="M165 85 C 185 82, 205 90, 210 105 C 212 120, 205 135, 190 140 C 175 142, 160 135, 155 122 C 158 110, 160 95, 165 85 Z"
                    fill={activeRegion === 'occipital' ? '#4ade80' : 'rgba(74,222,128,0.25)'}
                    stroke={activeRegion === 'occipital' ? '#4ade80' : 'rgba(148,163,184,0.7)'}
                    strokeWidth={activeRegion === 'occipital' ? 2.5 : 1.5}
                    onMouseEnter={() => setActiveRegion('occipital')}
                    onClick={() => setActiveRegion('occipital')}
                    style={{ cursor: 'pointer', transition: 'all 0.15s ease-out' }}
                />

                {/* Hippocampus */}
                <ellipse
                    cx={120}
                    cy={110}
                    rx={22}
                    ry={16}
                    fill={activeRegion === 'hippocampus' ? '#eab308' : 'rgba(234,179,8,0.3)'}
                    stroke={activeRegion === 'hippocampus' ? '#eab308' : 'rgba(148,163,184,0.8)'}
                    strokeWidth={activeRegion === 'hippocampus' ? 2.5 : 1.5}
                    onMouseEnter={() => setActiveRegion('hippocampus')}
                    onClick={() => setActiveRegion('hippocampus')}
                    style={{ cursor: 'pointer', transition: 'all 0.15s ease-out' }}
                />
                </svg>
          </div>

          {/* Region chips */}
          <div className="mt-3 flex flex-wrap gap-2">
            {brainRegions.map(region => (
              <button
                key={region.id}
                onClick={() => setActiveRegion(region.id)}
                className={[
                  'px-2.5 py-1 rounded-full text-[11px] border transition-colors',
                  activeRegion === region.id
                    ? 'border-cyan-400 bg-cyan-500/20 text-cyan-200'
                    : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500',
                ].join(' ')}
              >
                {region.label}
              </button>
            ))}
          </div>
        </div>

        {/* Region explanation */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2">
          <h2 className="text-sm font-semibold text-slate-100">
            {activeRegionData.label}
          </h2>
          <p className="text-[12px] text-cyan-300">
            Role: {activeRegionData.role}
          </p>
          <p className="text-[12px] text-slate-200">
            <span className="font-semibold text-slate-100">Everyday impact: </span>
            {activeRegionData.everydayImpact}
          </p>
          <p className="text-[12px] text-slate-400">
            <span className="font-semibold text-slate-200">In Alzheimer&apos;s: </span>
            {activeRegionData.adLink}
          </p>
        </div>
      </section>

      {/* 3. Stage overview */}
      <section className="space-y-3">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-slate-100">
              Stages of Alzheimer&apos;s disease
            </h2>
            <p className="text-[11px] text-slate-400 max-w-2xl">
              Alzheimer&apos;s usually follows a progressive pattern. Not everyone fits neatly into
              a single stage, but this 4-stage view—preclinical, mild (early), moderate (middle),
              and severe (late)—helps organize what&apos;s happening in the brain and in daily life.
            </p>
          </div>
        </div>

        {/* Stage chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 text-[11px]">
          {stages.map(stage => (
            <button
              key={stage.id}
              onClick={() => setActiveStageId(stage.id)}
              className={[
                'min-w-[170px] px-3 py-2 rounded-lg border text-left transition-colors',
                activeStageId === stage.id
                  ? 'border-cyan-400 bg-cyan-500/15 text-cyan-100'
                  : 'border-slate-700 bg-slate-900 text-slate-200 hover:border-slate-500',
              ].join(' ')}
            >
              <div className="font-semibold">{stage.name}</div>
              <div className="text-[10px] text-slate-400">{stage.label}</div>
            </button>
          ))}
        </div>

        {/* Active stage detail */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2 text-[12px]">
          <h3 className="font-semibold text-slate-100">{activeStage.name}</h3>
          <p className="text-slate-200">{activeStage.summary}</p>
          <div className="mt-1">
            <div className="font-semibold text-slate-100 mb-1">Common features:</div>
            <ul className="list-disc list-inside space-y-0.5 text-slate-300">
              {activeStage.mainFeatures.map(feature => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
          <p className="mt-2 text-slate-400">
            <span className="font-semibold text-slate-200">Care focus: </span>
            {activeStage.careFocus}
          </p>
        </div>
      </section>

      {/* 4. Where we will plug in agents */}
      <section className="space-y-3">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-slate-100">
              How this connects to the agentic AI system
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-3 text-[11px]">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 space-y-1">
            <h3 className="font-semibold text-slate-100">Data agent</h3>
            <p className="text-slate-300">
              Gathers and harmonizes imaging, omics, and clinical data into a unified format,
              handling quality checks and privacy-aware summaries.
            </p>
            <p className="text-slate-500">
              In this UI, it will eventually supply real cohort presets to the Biomarker Playground.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 space-y-1">
            <h3 className="font-semibold text-slate-100">Modeling agent</h3>
            <p className="text-slate-300">
              Wraps machine-learning models that estimate risk, trajectories, or stage
              probabilities from multi-modal input.
            </p>
            <p className="text-slate-500">
              Its outputs will replace the hand-crafted curves with model-driven AT(N)
              trajectories in the Playground.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 space-y-1">
            <h3 className="font-semibold text-slate-100">Explanation agent</h3>
            <p className="text-slate-300">
              Turns model outputs into human-readable explanations, tuned for different audiences
              (family member vs. clinician vs. researcher).
            </p>
            <p className="text-slate-500">
              It will dynamically generate text like the stage summaries and region descriptions
              you see on this page.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 space-y-1">
            <h3 className="font-semibold text-slate-100">Coordinator agent</h3>
            <p className="text-slate-300">
              Orchestrates the other agents, responds to user actions, and keeps views
              synchronized across stages, brain regions, and biomarker curves.
            </p>
            <p className="text-slate-500">
              In practice, it will sit behind the routes and components of this site, deciding
              when to refresh data and when to explain changes.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
