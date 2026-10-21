import { Routes, Route, NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Eye,
  MessageSquare,
  Handshake,
  Layers,
  Sparkles,
  Settings,
} from 'lucide-react'
import PeriscopeIcon from './components/PeriscopeIcon'
import Dashboard from './pages/Dashboard'
import PeriscopeView from './pages/PeriscopeView'
import Collaboration from './pages/Collaboration'
import Partnerships from './pages/Partnerships'
import Framework from './pages/Framework'
import Insights from './pages/Insights'
import Landing from './pages/Landing'

const nav = [
  { to: '/app', label: 'Command Centre', icon: LayoutDashboard, end: true },
  { to: '/app/periscope', label: 'Periscope View', icon: Eye },
  { to: '/app/collaboration', label: 'Collaboration Spaces', icon: MessageSquare },
  { to: '/app/partnerships', label: 'Partnerships', icon: Handshake },
  { to: '/app/framework', label: 'Framework', icon: Layers },
  { to: '/app/insights', label: 'Insights', icon: Sparkles },
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
            <p className="text-[10px] uppercase tracking-wider text-gold-700 font-medium">
              Surface Edition
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
          <div className="relative">
            <input
              type="search"
              placeholder="Search partnerships, teams, opportunities..."
              className="w-80 rounded-lg border border-charcoal-200 bg-cream-50 pl-10 pr-4 py-2 text-sm focus:border-gold-400 focus:outline-none focus:ring-1 focus:ring-gold-400"
            />
            <svg
              className="absolute left-3 top-2.5 h-4 w-4 text-charcoal-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gold-100 flex items-center justify-center text-gold-800 font-semibold text-sm">
                AM
              </div>
              <div className="hidden sm:block text-sm">
                <p className="font-medium text-charcoal-800">Alex Morgan</p>
                <p className="text-xs text-charcoal-500">Growth Lead</p>
              </div>
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
              <Route index element={<Dashboard />} />
              <Route path="periscope" element={<PeriscopeView />} />
              <Route path="collaboration" element={<Collaboration />} />
              <Route path="partnerships" element={<Partnerships />} />
              <Route path="framework" element={<Framework />} />
              <Route path="insights" element={<Insights />} />
              <Route path="settings" element={<Dashboard />} />
            </Routes>
          </AppShell>
        }
      />
    </Routes>
  )
}
