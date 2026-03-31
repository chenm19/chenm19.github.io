import { useState } from 'react'
import { Link } from 'react-router-dom'

// Abstracted Brain Lobe Component
import { BrainLobesOverlay } from '../components/BrainLobesOverlay'

// Gifs
import amyloidGif from '../assets/biomarkers/amyloid.gif'
import tauGif from '../assets/biomarkers/tau.gif'
import neuroGif from '../assets/biomarkers/neurodegeneration.gif'

// Brain Stages - CN (A+T-N-)
import cnAImg from '../assets/brain_stages/CNA.png'
import cnTImg from '../assets/brain_stages/CNT.png'
import cnNImg from '../assets/brain_stages/CNN.png'
// Brain Stages - AD (A+T+N+)
import adAImg from '../assets/brain_stages/ADA.png'
import adTImg from '../assets/brain_stages/ADT.png'
import adNImg from '../assets/brain_stages/ADN.png'

type RegionId = 'frontal' | 'temporal' | 'parietal' | 'occipital' | 'hippocampus'
type StageId = 'cn' | 'mci' | 'ad'

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
      "In many people with Alzheimer's, changes in the hippocampus are among the earliest brain changes seen on scans or atrophy measures.",
  },
  {
    id: 'frontal',
    label: 'Frontal lobe',
    role: 'Planning, decision-making, attention, behavior',
    everydayImpact:
      'When frontal areas are affected, people may struggle to plan, stay organized, or control impulses. They might seem more disorganized or have personality changes.',
    adLink:
      "As Alzheimer's progresses, frontal involvement contributes to loss of independence in day-to-day activities and changes in mood or behavior.",
  },
  {
    id: 'temporal',
    label: 'Temporal lobe',
    role: 'Language, understanding speech, recognizing objects and faces',
    everydayImpact:
      'Damage here can lead to word-finding problems, difficulty following conversations, or trouble recognizing familiar people or objects.',
    adLink:
      "Temporal lobe changes are closely tied to language difficulties and are common in the mild and moderate stages of Alzheimer's.",
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
      "In some atypical forms of Alzheimer's, visual symptoms can be very prominent because occipital and nearby regions are affected earlier.",
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
    id: 'cn',
    name: 'Cognitively Normal (CN)',
    label: 'Amyloid-positive biology may be present without clear symptoms',
    summary:
      "In the NIA-AA biological framework, Alzheimer's pathology can be present before symptoms. A common early biological profile is amyloid-positive (A+) with no clear tau spread (T-) and no measurable neurodegeneration (N-). Many individuals remain fully independent and feel normal.",
    mainFeatures: [
      'Often no noticeable day-to-day cognitive symptoms',
      'Amyloid abnormality may be detectable on amyloid PET or fluid biomarkers',
      'Brain structure typically appears preserved',
    ],
    careFocus:
      'Focus is on early detection and risk monitoring in research contexts, rather than symptom-driven care.',
  },
  {
    id: 'mci',
    name: 'Mild Cognitive Impairment (MCI)',
    label: 'A biological transition zone: tau spreads and early neurodegeneration may begin',
    summary:
      'MCI is commonly where symptoms begin to emerge, but it is not defined by a single "canonical" scan. Biologically, it often corresponds to a transition from A+T+(N)- toward early (N)+ as tau pathology spreads and downstream damage begins.',
    mainFeatures: [
      'Noticeable cognitive change, but not dementia-level functional loss',
      'Tau abnormality (T+) is typically present in AD-continuum cases',
      'Early or subtle neurodegeneration may begin (N- to early N+)',
    ],
    careFocus:
      'Focus is on monitoring, support strategies, and planning, while maintaining independence as much as possible.',
  },
  {
    id: 'ad',
    name: "Alzheimer's Disease Dementia (AD)",
    label: 'Advanced AD biology with measurable neurodegeneration',
    summary:
      "In later clinical stages, Alzheimer's biology is typically amyloid-positive and tau-positive, with clear neurodegeneration (A+T+(N)+). Structural MRI may show hippocampal atrophy and enlarged ventricles, reflecting downstream tissue loss.",
    mainFeatures: [
      'Clear cognitive impairment with functional decline consistent with dementia',
      'Tau pathology is typically widespread (T+)',
      'Neurodegeneration is measurable (N+), including atrophy on MRI',
    ],
    careFocus:
      'Focus is on safety, support with daily living, caregiver support, and quality-of-life decisions.',
  },
]

type ScanEntry = { src: string; label: string; alt: string }

const cnScans: ScanEntry[] = [
  { src: cnAImg, label: 'A (Amyloid)',           alt: 'Amyloid PET showing early cortical amyloid deposition in a cognitively normal individual' },
  { src: cnTImg, label: 'T (Tau)',               alt: 'Tau PET showing minimal tau signal in a cognitively normal individual' },
  { src: cnNImg, label: 'N (Neurodegeneration)', alt: 'Structural MRI showing preserved brain structure in a cognitively normal individual' },
]

const adScans: ScanEntry[] = [
  { src: adAImg, label: 'A (Amyloid)',           alt: 'Amyloid PET showing widespread cortical amyloid in Alzheimer disease dementia' },
  { src: adTImg, label: 'T (Tau)',               alt: 'Tau PET showing widespread tau pathology in Alzheimer disease dementia' },
  { src: adNImg, label: 'N (Neurodegeneration)', alt: 'Structural MRI showing hippocampal atrophy and enlarged ventricles in Alzheimer disease dementia' },
]

export default function Intro() {
  const [activeRegion, setActiveRegion] = useState<RegionId>('hippocampus')
  const [activeStageId, setActiveStageId] = useState<StageId>('cn')

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
              This site is an interactive companion to ongoing research in Professor Chen&apos;s
              modeling lab, implementing{' '}
              <span className="text-cyan-300 font-medium">agentic AI for Alzheimer&apos;s disease</span>.
              This site is designed for individuals of all backgrounds: open to students learning about Alzheimer&apos;s for the first time, to clinicians and researchers who want to navigate the complex relationships affecting brain changes, symptoms, and biomarkers in an intuitive manner.
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
            <div className="font-semibold text-slate-100 mb-1">
              What is Alzheimer&apos;s Disease?
            </div>
            <p>
              Alzheimer&apos;s disease is the most common cause of dementia, a general term for memory
              loss and other cognitive abilities serious enough to interfere with daily life.
              Based on recent studies, Alzheimer&apos;s disease accounts for 60-80% of dementia cases.
            </p>
          </div>
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3">
            <div className="font-semibold text-slate-100 mb-1">How common is it?</div>
            <p>
              According to the Alzheimer&apos;s Association, over 7 million Americans are
              currently living with Alzheimer&apos;s, affecting approximately 1 in 9
              people age 65 and older. By 2050, this number is projected to rise to nearly 13
              million.
            </p>
          </div>
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-3">
            <div className="font-semibold text-slate-100 mb-1">Can it be cured?</div>
            <p>
              Unfortunately, no comprehensive cure exists. However, certain treatments have been found to slow
              Alzheimer&apos;s progression in some people, helping them to manage symptoms and supporting quality of
              life for both the person and their caregivers.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Interactive brain map */}
      <section className="space-y-3">
        <div className="grid md:grid-cols-2 gap-5 items-start">
          {/* Generated brain graphic */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
            <h2 className="text-sm font-semibold text-slate-100 mb-2">
              Explore the key brain regions affected in Alzheimer&apos;s
            </h2>
            <p className="text-[11px] text-slate-400 mb-3">
              Hover or tap to highlight the different regions of the brain. The panel on the right explains
              each area&apos;s function and how changes there can show up in everyday life.
            </p>
            <div className="flex justify-center">
              <BrainLobesOverlay
                activeRegion={activeRegion}
                setActiveRegion={setActiveRegion}
              />
            </div>
          </div>

          {/* Region explanations */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2 h-full">
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
        </div>

        {/* Region chips */}
        <div className="flex flex-wrap gap-2">
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
      </section>

      {/* 3. Molecular view */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-slate-100">
          From molecules to damage: amyloid, tau, and neurodegeneration
        </h2>
        <p className="text-[11px] text-slate-400 max-w-3xl">
          Alzheimer&apos;s disease is often described using three major biomarker families:{' '}
          <span className="text-slate-100 font-medium">amyloid (A)</span>,{' '}
          <span className="text-slate-100 font-medium">tau (T)</span>, and{' '}
          <span className="text-slate-100 font-medium">neurodegeneration (N)</span>. These
          animations give a qualitative sense of what each process looks like, from abnormal
          protein build-up to damage in brain cells.
        </p>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Amyloid */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden flex flex-col shadow-sm">
            <div className="relative aspect-[9/5] overflow-hidden bg-slate-950">
              <img
                src={amyloidGif}
                alt="Animation of amyloid precursor protein and amyloid plaques"
                className="w-full h-full object-cover transition-transform duration-200 ease-out hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
            <div className="p-3 space-y-1">
              <h3 className="text-xs font-semibold text-slate-100">Amyloid (A)</h3>
              <p className="text-[11px] text-slate-200">
                <span className="font-semibold">For everyone:</span> Amyloid comes from a
                normal protein that is cut in a way that lets pieces clump together outside of
                brain cells, forming plaques.
              </p>
              <p className="text-[11px] text-slate-400">
                <span className="font-semibold">For researchers:</span> This corresponds to
                amyloid precursor protein processing and A&beta; aggregation, captured in biomarkers
                such as amyloid PET or CSF A&beta;42/40.
              </p>
            </div>
          </div>

          {/* Tau */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden flex flex-col shadow-sm">
            <div className="relative aspect-[9/5] overflow-hidden bg-slate-950">
              <img
                src={tauGif}
                alt="Animation of tau tangles forming inside neurons"
                className="w-full h-full object-cover transition-transform duration-200 ease-out hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
            <div className="p-3 space-y-1">
              <h3 className="text-xs font-semibold text-slate-100">Tau (T)</h3>
              <p className="text-[11px] text-slate-200">
                <span className="font-semibold">For everyone:</span> Inside the cell, tau
                proteins can twist into &quot;tangles&quot; that disrupt how neurons work and
                eventually survive.
              </p>
              <p className="text-[11px] text-slate-400">
                <span className="font-semibold">For researchers:</span> Abnormal
                hyperphosphorylated tau accumulates in a stereotyped pattern, measured with tau
                PET or CSF p-tau, and is tightly linked to symptom severity.
              </p>
            </div>
          </div>

          {/* Neurodegeneration */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden flex flex-col shadow-sm">
            <div className="relative aspect-[9/5] overflow-hidden bg-slate-950">
              <img
                src={neuroGif}
                alt="Animation of neuronal degeneration in the brain"
                className="w-full h-full object-cover transition-transform duration-200 ease-out hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
            <div className="p-3 space-y-1">
              <h3 className="text-xs font-semibold text-slate-100">Neurodegeneration (N)</h3>
              <p className="text-[11px] text-slate-200">
                <span className="font-semibold">For everyone:</span> Over time, damage from abnormal proteins causes brain cells and their connections to break down, leading to shrinkage (atrophy) of affected brain regions.
              </p>
              <p className="text-[11px] text-slate-400">
                <span className="font-semibold">For researchers:</span> Neurodegeneration is typically indexed with structural MRI (cortical thickness, volume loss), FDG-PET, or fluid markers of neuronal injury. In AT(N) frameworks, it reflects downstream tissue loss that often tracks with clinical decline.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-2 text-[10px] text-slate-500 max-w-3xl">
          Animations adapted from:{' '}
          <span className="italic">
            Uncovering the Heterogeneity of Neurodegeneration Trajectories in Alzheimer&apos;s Disease
          </span>
          , Minghan Chen, Computer Science Department, Math Bio Seminar, Penn State, 11/27/2022.
        </div>
      </section>

      {/* 4. Stage overview */}
      <section className="space-y-3">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-slate-100">
              Clinical stages aligned with AT(N) biomarkers
            </h2>
            <p className="text-[11px] text-slate-400 max-w-2xl">
              Modern frameworks separate Alzheimer&apos;s biology (ATN) from symptoms. Below is a CN &rarr; MCI &rarr; AD clinical view that is aligned with the biological continuum: amyloid tends to appear first, followed by tau spread, and measurable neurodegeneration becomes clearer later.
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
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-2 text-[12px] flex flex-col items-center text-center">
          <h3 className="font-semibold text-slate-100">{activeStage.name}</h3>
          <p className="text-slate-200">{activeStage.summary}</p>

          {activeStageId === 'cn' && (
            <div className="grid grid-cols-3 gap-3 w-full max-w-lg mx-auto">
              {cnScans.map(({ src, label, alt }) => (
                <div key={label} className="flex flex-col items-center gap-1">
                  <div className="w-full aspect-square overflow-hidden rounded-lg border border-white/10 bg-slate-950">
                    <img
                      src={src}
                      alt={alt}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-[10px] text-cyan-300 font-medium">{label}</span>
                </div>
              ))}
            </div>
          )}

          {activeStageId === 'mci' && (
            <div className="w-full max-w-lg mx-auto rounded-xl border border-dashed border-white/20 bg-white/5 p-4 space-y-2">
              <p className="text-[11px] text-slate-300 font-medium">
                Transition zone &mdash; no single canonical scan
              </p>
              <p className="text-[11px] text-slate-400">
                MCI sits biologically between CN and Alzheimer&apos;s dementia: tau (T) is typically positive and spreading, while neurodegeneration (N) is only beginning. Because the degree of tau spread and early neurodegeneration varies widely across individuals, there is no single representative MCI scan &mdash; scans at this stage can look anywhere from nearly CN-like to nearly AD-like depending on where a person falls along the continuum.
              </p>
              <div className="flex items-center gap-2 text-[10px] text-slate-400">
                <span>CN</span>
                <div className="flex-1 h-[2px] bg-white/20" />
                <span className="text-amber-300 font-medium">MCI</span>
                <div className="flex-1 h-[2px] bg-white/20" />
                <span>AD</span>
              </div>
            </div>
          )}

          {activeStageId === 'ad' && (
            <div className="grid grid-cols-3 gap-3 w-full max-w-lg mx-auto">
              {adScans.map(({ src, label, alt }) => (
                <div key={label} className="flex flex-col items-center gap-1">
                  <div className="w-full aspect-square overflow-hidden rounded-lg border border-white/10 bg-slate-950">
                    <img
                      src={src}
                      alt={alt}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <span className="text-[10px] text-cyan-300 font-medium">{label}</span>
                </div>
              ))}
            </div>
          )}

          <div className="mt-1 w-full max-w-3xl text-left">
            <div className="font-semibold text-slate-100 mb-1">Common features:</div>
            <ul className="list-disc list-inside space-y-0.5 text-slate-300">
              {activeStage.mainFeatures.map(feature => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
          <p className="mt-2 text-slate-400 w-full max-w-3xl text-left">
            <span className="font-semibold text-slate-200">Care focus: </span>
            {activeStage.careFocus}
          </p>
        </div>
        <div className="mt-2 text-[10px] text-slate-500 max-w-3xl">
          Brain stage images adapted from:{' '}
          <span className="italic">
            NIA-AA Research Framework: Toward a biological definition of Alzheimer&apos;s disease
          </span>
          , Clifford R. Jack Jr. et al., <span className="italic">Alzheimer&apos;s &amp; Dementia</span>, 2018. DOI: 10.1016/j.jalz.2018.02.018.
        </div>
      </section>

      {/* 5. Agents to plug in */}
      <section className="space-y-3">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-slate-100">
              MVP system layout
            </h2>
            <p className="text-[11px] text-slate-400 max-w-3xl mt-1">
              The current MVP is intentionally modular: a modeling layer produces stage signals, an inference layer returns real-time probabilities for new inputs, and a visualization layer renders outputs in an interactive, audience-friendly format. As the thesis evolves, any single layer can be swapped (e.g., alternative clustering methods, or a future 1D transformer) without rewriting the UI.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-3 text-[11px]">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 space-y-1">
            <h3 className="font-semibold text-slate-100">Modeling layer</h3>
            <p className="text-slate-300">
              Encapsulates the underlying methods used to characterize AT(N) structure and stage patterns (e.g., unsupervised clustering and supervised classifiers).
            </p>
            <p className="text-slate-500">
              In the MVP, this includes the GMM-derived cluster structure and supervised baselines shown in the Playground panels.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 space-y-1">
            <h3 className="font-semibold text-slate-100">Visualization layer</h3>
            <p className="text-slate-300">
              Renders model outputs and uncertainty in an accessible form&mdash;interactive plots, hover tooltips, and probability summaries that update immediately.
            </p>
            <p className="text-slate-500">
              The goal is to make both structure (clusters) and uncertainty (probabilities) visible with minimal ML background knowledge.
            </p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 space-y-1">
            <h3 className="font-semibold text-slate-100">(Optional) Coordination layer</h3>
            <p className="text-slate-300">
              A lightweight controller that keeps the UI consistent as the user explores&mdash;syncing selected inputs, charts, and displayed explanations across pages.
            </p>
            <p className="text-slate-500">
              This is handled implicitly by React state and routing; to be further formalized to handle multi-step workflows and automated narratives as they are added.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
