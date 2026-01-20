import { NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const tabs = [
  { to: '/', label: 'Overview' },
  { to: '/playground', label: 'AI Predictor' },
  { to: '/agents', label: 'AI Agents' },
  { to: '/about', label: 'About / Methods' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={[
        'sticky top-0 z-40 border-b border-slate-800 bg-slate-950/80 backdrop-blur',
        isScrolled ? 'shadow-lg shadow-slate-950/60' : '',
      ].join(' ')}
    >
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-baseline gap-2">
          <span className="text-sm md:text-base font-semibold tracking-tight text-cyan-300">
            AD Explorer
          </span>
          <span className="hidden sm:inline text-[10px] uppercase tracking-[0.2em] text-slate-500">
            Chen Lab
          </span>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-1 text-xs md:text-sm">
          {tabs.map(tab => (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.to === '/'}
              className={({ isActive }) =>
                [
                  'px-3 py-1.5 rounded-full transition-colors whitespace-nowrap',
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/40'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white',
                ].join(' ')
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </nav>

        {/* Right-side navigation pill to Biomarker Playground */}
        <div className="hidden md:flex items-center gap-2 text-[11px]">
          <NavLink
            to="/playground"
            className="px-2 py-1 rounded-full border border-slate-700/80 bg-slate-900/60 text-slate-300 hover:text-white hover:bg-slate-800/80 transition"
          >
            Interactive demo
          </NavLink>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded-full border border-slate-700/70 px-2 py-1 text-slate-200 hover:bg-slate-800/80 active:scale-95 transition"
          onClick={() => setIsOpen(prev => !prev)}
          aria-label="Toggle navigation"
        >
          <div className="flex flex-col gap-[3px]">
            <span
              className={[
                'h-[2px] w-4 rounded-full bg-slate-200 transition-transform',
                isOpen ? 'translate-y-[3px] rotate-45' : '',
              ].join(' ')}
            />
            <span
              className={[
                'h-[2px] w-4 rounded-full bg-slate-200 transition-opacity',
                isOpen ? 'opacity-0' : 'opacity-100',
              ].join(' ')}
            />
            <span
              className={[
                'h-[2px] w-4 rounded-full bg-slate-200 transition-transform',
                isOpen ? '-translate-y-[3px] -rotate-45' : '',
              ].join(' ')}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-slate-800 bg-slate-950/95"
          >
            <div className="max-w-6xl mx-auto px-4 py-2 flex flex-col gap-1 text-sm">
              {tabs.map(tab => (
                <NavLink
                  key={tab.to}
                  to={tab.to}
                  end={tab.to === '/'}
                  className={({ isActive }) =>
                    [
                      'px-3 py-2 rounded-lg transition-colors',
                      isActive
                        ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/40'
                        : 'text-slate-200 hover:bg-slate-800/90',
                    ].join(' ')
                  }
                >
                  {tab.label}
                </NavLink>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
