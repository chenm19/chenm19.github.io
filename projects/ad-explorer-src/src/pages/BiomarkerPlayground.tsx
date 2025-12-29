import { useMemo, useState } from 'react'
import ATNClusteringPanel from "../components/atn/ATNClusteringPanel";
import SupervisedResultsPanel from "../components/atn/SupervisedResultsPanel";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

type BiomarkerPoint = {
  t: number
  amyloid: number
  tau: number
  neuro: number
}

function logistic(t: number, k: number, t0: number) {
  return 1 / (1 + Math.exp(-k * (t - t0)))
}

export default function BiomarkerPlayground() {
  const [amyloidRate, setAmyloidRate] = useState(0.35)
  const [tauDelay, setTauDelay] = useState(3)
  const [neuroSensitivity, setNeuroSensitivity] = useState(1.2)

  const data: BiomarkerPoint[] = useMemo(() => {
    const points: BiomarkerPoint[] = []
    for (let t = 0; t <= 20; t++) {
      const a = logistic(t, amyloidRate, 6)
      const tauTrigger = logistic(t - tauDelay, 0.7, 8)
      const tau = Math.min(1, tauTrigger * 1.1)
      const neuro = Math.min(1, Math.pow(tau, neuroSensitivity))
      points.push({
        t,
        amyloid: Number(a.toFixed(3)),
        tau: Number(tau.toFixed(3)),
        neuro: Number(neuro.toFixed(3)),
      })
    }
    return points
  }, [amyloidRate, tauDelay, neuroSensitivity])

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl md:text-2xl font-semibold">Biomarker Playground</h1>
        <p className="text-slate-300 text-sm mt-2 max-w-2xl">
          Adjust the parameters to see how amyloid build-up, tau pathology, and
          neurodegeneration might evolve over time in a simplified AT(N) framework.
        </p>
      </div>

      {/* Controls */}
      <div className="grid md:grid-cols-3 gap-4 text-xs md:text-sm">
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
          <div className="flex justify-between mb-1">
            <span className="font-medium text-slate-100">Amyloid speed</span>
            <span className="text-slate-300">{amyloidRate.toFixed(2)}</span>
          </div>
          <p className="text-slate-400 text-[11px] mb-2">
            Higher values make amyloid positivity occur earlier and more steeply.
          </p>
          <input
            type="range"
            min={0.1}
            max={0.8}
            step={0.05}
            value={amyloidRate}
            onChange={e => setAmyloidRate(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
          <div className="flex justify-between mb-1">
            <span className="font-medium text-slate-100">Tau delay</span>
            <span className="text-slate-300">{tauDelay.toFixed(1)} years</span>
          </div>
          <p className="text-slate-400 text-[11px] mb-2">
            Controls how long after amyloid build-up tau begins to accelerate.
          </p>
          <input
            type="range"
            min={0}
            max={6}
            step={0.5}
            value={tauDelay}
            onChange={e => setTauDelay(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3">
          <div className="flex justify-between mb-1">
            <span className="font-medium text-slate-100">Neuro sensitivity</span>
            <span className="text-slate-300">{neuroSensitivity.toFixed(2)}</span>
          </div>
          <p className="text-slate-400 text-[11px] mb-2">
            Higher values make neurodegeneration respond more strongly to tau burden.
          </p>
          <input
            type="range"
            min={0.6}
            max={2}
            step={0.1}
            value={neuroSensitivity}
            onChange={e => setNeuroSensitivity(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      {/* Chart */}
      <div className="h-72 md:h-80 bg-slate-900/80 border border-slate-800 rounded-xl p-3">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis dataKey="t" stroke="#9ca3af" tickLine={false} />
            <YAxis domain={[0, 1]} stroke="#9ca3af" tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#020617',
                border: '1px solid #1f2937',
                borderRadius: 8,
                fontSize: 11,
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="amyloid" stroke="#22d3ee" dot={false} name="Amyloid (A)" />
            <Line type="monotone" dataKey="tau" stroke="#a855f7" dot={false} name="Tau (T)" />
            <Line type="monotone" dataKey="neuro" stroke="#f97316" dot={false} name="Neurodegeneration (N)" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <ATNClusteringPanel />
      <SupervisedResultsPanel />
    </div>
  )
}
