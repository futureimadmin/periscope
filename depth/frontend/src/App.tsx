import { Routes, Route, NavLink } from 'react-router-dom'
import {
  Layers,
  Handshake,
  LayoutDashboard,
  Settings,
} from 'lucide-react'
import PeriscopeIcon from './components/PeriscopeIcon'
import Framework from './pages/Framework'
import Partnerships from './pages/Partnerships'
import Dashboard from './pages/Dashboard'
import Landing from './pages/Landing'

/** Depth Edition — submerged structure: Framework Builder and formal operating model */
const nav = [
  { to: '/app', label: 'Framework Builder', icon: Layers, end: true },
  { to: '/app/partnerships', label: 'Partnerships', icon: Handshake },
  { to: '/app/overview', label: 'Operating Overview', icon: LayoutDashboard },
]

function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-cream-100">
      <aside className="w-60 shrink-0 border-r border-charcoal-100 bg-white flex flex-col">
        <div className="flex items-center gap-3 px-5 h-16 border-b border-charcoal-100">
          <PeriscopeIcon className="h-9 w-9 shrink-0" />
          <div>
            <h1 className="font-display text-base font-bold text-charcoal-900 tracking-tight">
              Periscope
            </h1>
            <p className="text-[10px] uppercase tracking-wider text-charcoal-600 font-medium">
              Depth Edition
            </p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {nav.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `sidebar-link ${
                  isActive ? 'sidebar-link-active' : 'sidebar-link-inactive'
                }`
              }
            >
              <Icon className="h-4 w-4" strokeWidth={2} />
              {label}
            </NavLink>
          ))}

          <div className="mt-4 px-3 py-3 rounded-lg border border-dashed border-charcoal-200 bg-cream-50">
            <p className="text-[10px] uppercase tracking-wider font-semibold text-charcoal-500">
              Surface Edition
            </p>
            <p className="mt-1 text-xs text-charcoal-600 leading-snug">
              Looking from / Looking into and live visibility stay on the surface. Depth holds the submerged operating model.
            </p>
          </div>
        </nav>

        <div className="px-3 py-4 border-t border-charcoal-100">
          <NavLink to="/app/settings" className="sidebar-link sidebar-link-inactive">
            <Settings className="h-4 w-4" />
            Settings
          </NavLink>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-charcoal-100 bg-white/80 backdrop-blur sticky top-0 z-40 flex items-center justify-between px-6">
          <p className="text-sm text-charcoal-500">
            Depth Edition · Framework Builder · submerged partnership structure
          </p>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gold-100 flex items-center justify-center text-gold-800 font-semibold text-sm">
              AM
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
        path="/app/*"
        element={
          <AppShell>
            <Routes>
              <Route index element={<Framework />} />
              <Route path="partnerships" element={<Partnerships />} />
              <Route path="overview" element={<Dashboard />} />
              <Route path="settings" element={<Framework />} />
            </Routes>
          </AppShell>
        }
      />
    </Routes>
  )
}
