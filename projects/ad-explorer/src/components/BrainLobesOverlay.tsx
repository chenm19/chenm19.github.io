import brainLobesImg from '../assets/brain/brain-lobes.png'

type RegionId = 'frontal' | 'temporal' | 'parietal' | 'occipital' | 'hippocampus'

interface BrainLobesOverlayProps {
  activeRegion: RegionId
  setActiveRegion: (region: RegionId) => void
}

export function BrainLobesOverlay({ activeRegion, setActiveRegion }: BrainLobesOverlayProps) {
  const baseBtn =
  'absolute -translate-x-1/2 -translate-y-1/2 w-9 h-9 md:w-10 md:h-10 rounded-full border backdrop-blur-sm transition';

  const getClasses = (region: RegionId, activeClasses: string, idleClasses: string) =>
    [
      baseBtn,
      activeRegion === region ? activeClasses : idleClasses,
    ].join(' ')

  return (
    <div className="relative w-full max-w-xs drop-shadow-[0_0_40px_rgba(8,47,73,0.7)]">
      <img
        src={brainLobesImg}
        alt="Stylized brain with lobes"
        className="w-full h-auto select-none pointer-events-none rounded-xl border border-slate-800/80"
      />

      {/* Frontal - front/left */}
      <button
        type="button"
        aria-label="Frontal lobe"
        onMouseEnter={() => setActiveRegion('frontal')}
        onClick={() => setActiveRegion('frontal')}
        className={getClasses(
            'frontal',
            'bg-cyan-500/40 border-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.9)]',
            'bg-cyan-500/20 border-cyan-400/40 hover:bg-cyan-500/30'
        )}
        style={{ left: '24%', top: '40%' }}
      />

      {/* Parietal - top/mid-back */}
      <button
        type="button"
        aria-label="Parietal lobe"
        onMouseEnter={() => setActiveRegion('parietal')}
        onClick={() => setActiveRegion('parietal')}
        className={getClasses(
            'parietal',
            'bg-orange-500/40 border-orange-300 shadow-[0_0_20px_rgba(249,115,22,0.9)]',
            'bg-orange-500/20 border-orange-400/40 hover:bg-orange-500/30'
        )}
        style={{ left: '50%', top: '34%' }}
      />

      {/* Occipital - back/right */}
      <button
        type="button"
        aria-label="Occipital lobe"
        onMouseEnter={() => setActiveRegion('occipital')}
        onClick={() => setActiveRegion('occipital')}
        className={getClasses(
            'occipital',
            'bg-emerald-500/40 border-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.9)]',
            'bg-emerald-500/20 border-emerald-400/40 hover:bg-emerald-500/30'
        )}
        style={{ left: '78%', top: '48%' }}
      />

      {/* Temporal - lower side */}
      <button
        type="button"
        aria-label="Temporal lobe"
        onMouseEnter={() => setActiveRegion('temporal')}
        onClick={() => setActiveRegion('temporal')}
        className={getClasses(
            'temporal',
            'bg-purple-500/40 border-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.9)]',
            'bg-purple-500/20 border-purple-400/40 hover:bg-purple-500/30'
         )}
        style={{ left: '48%', top: '60%' }}
      />

      {/* Hippocampus – deep within temporal */}
      <button
        type="button"
        aria-label="Hippocampus"
        onMouseEnter={() => setActiveRegion('hippocampus')}
        onClick={() => setActiveRegion('hippocampus')}
        className={getClasses(
            'hippocampus',
            'bg-amber-400/70 border-amber-200 shadow-[0_0_18px_rgba(250,204,21,0.9)]',
            'bg-amber-400/40 border-amber-300/70 hover:bg-amber-400/55'
        )}
        style={{ left: '60%', top: '63%', width: '1.9rem', height: '1.9rem' }}
      />
    </div>
  )
}
