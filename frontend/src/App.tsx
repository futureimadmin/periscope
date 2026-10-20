import { Routes, Route, NavLink } from 'react-router-dom'
import { Binoculars, LayoutDashboard, Handshake, Eye, Sparkles } from 'lucide-react'
import Dashboard from './pages/Dashboard'
import Partnerships from './pages/Partnerships'
import PeriscopeView from './pages/PeriscopeView'
import Framework from './pages/Framework'

const nav = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/partnerships', label: 'Partnerships', icon: Handshake },
  { to: '/periscope', label: 'Periscope', icon: Eye },
  { to: '/framework', label: 'Framework', icon: Sparkles },
]

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-charcoal-700 bg-charcoal-900/90 backdrop-blur sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-400 text-charcoal-900">
                <Binoculars className="h-5 w-5" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="font-display text-lg font-bold tracking-tight text-gold-400">
                  Periscope
                </h1>
                <p className="text-[10px] uppercase tracking-widest text-charcoal-300">
                  See what others can't
                </p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-1">
              {nav.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                      isActive
                        ? 'bg-gold-400/10 text-gold-400'
                        : 'text-charcoal-300 hover:bg-charcoal-800 hover:text-charcoal-50'
                    }`
                  }
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/partnerships" element={<Partnerships />} />
            <Route path="/periscope" element={<PeriscopeView />} />
            <Route path="/framework" element={<Framework />} />
          </Routes>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-charcoal-800 py-6 text-center text-xs text-charcoal-400">
        Periscope · intelligentmachines · Powered by Gemini
      </footer>
    </div>
  )
}
