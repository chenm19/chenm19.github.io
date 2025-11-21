import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Intro from './pages/Intro'
import BiomarkerPlayground from './pages/BiomarkerPlayground'
import AgentsView from './pages/AgentsView'
import About from './pages/About'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50">
      <Navbar />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 pb-10 pt-4">
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 md:p-6 shadow-xl shadow-slate-950/40">
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/playground" element={<BiomarkerPlayground />} />
            <Route path="/agents" element={<AgentsView />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
      <footer className="border-t border-slate-800 py-3 text-xs text-slate-400 text-center">
        Alzheimer's Biomarker Explorer · Wake Forest University · {new Date().getFullYear()}
      </footer>
    </div>
  )
}